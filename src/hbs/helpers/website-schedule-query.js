const gql = require('graphql-tag');

const buildQuery = () => gql`
  query WebsiteScheduledContent($input: WebsiteScheduledContentQueryInput!) {
    websiteScheduledContent(input: $input) {
      edges {
        node {
          id
          type
          shortName
          teaser
          published
          canonicalPath
          primarySection {
            id
            name
            alias
          }
          primaryImage {
            id
            src
            alt
          }
          company {
            id
            name
            canonicalPath
          }
        }
      }
    }
  }
`;

module.exports = ({ data, hash, fn }, cb) => {
  const { apollo } = data.root;
  const {
    after,
    excludeContentIds,
    excludeContentTypes,
    limit,
    includeContentTypes,
    requiresImage,
    sectionBubbling,
    sectionId,
    optionId,
  } = hash;

  const pagination = { limit, after };
  const input = {
    pagination,
    excludeContentIds,
    excludeContentTypes,
    includeContentTypes,
    requiresImage,
    sectionBubbling,
    sectionId,
    optionId,
  };
  const variables = { input };

  apollo.query({ query: buildQuery(), variables }).then(({ data: res }) => {
    let items = [];
    if (res && res.websiteScheduledContent) {
      items = res.websiteScheduledContent.edges
        .map(edge => (edge && edge.node ? edge.node : null))
        .filter(c => c);
    }
    // console.info(items);
    cb(fn(this, { data, blockParams: [items] }));
  }).catch(cb);
};
