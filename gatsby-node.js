const path = require('path');

export default function createPages({ boundActionCreators, graphql }) {
  const { createPage } = boundActionCreators;
  // const createPages = boundActionCreators.createPages;
  const postTemplate = path.resolve('src/templates/post.js');
  return graphql(
    `\n    {\n      allMarkdownRemark {\n        edges {\n          node {\n            html\n            id\n            frontmatter {\n              path\n              title\n            }\n          }\n        }\n      }\n    }\n  `
  ).then((res) => {
    if (res.errors) {
      return Promise.reject(res.errors);
    }
    res.data.allMarkdownRemark.edges.forEach(({ node }) => {
      createPage({
        path: node.frontmatter.path,
        component: postTemplate,
      });
    });
  });
}
