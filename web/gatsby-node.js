const { isFuture, parseISO } = require("date-fns");
/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

async function createGalleryPages(graphql, actions) {
  const { createPage } = actions;
  const galleryTemplate = require.resolve("./src/templates/Gallery.js");
  const result = await graphql(`
    {
      allSanityCategory {
        nodes {
          title
          slug {
            current
          }
        }
      }
    }
  `);
  result.data.allSanityCategory.nodes.forEach(category => {
    actions.createPage({
      path: `${category.slug.current}`,
      component: galleryTemplate,
      context: {
        categoryTitle: category.title
      }
    });
  });
}

async function createProjectPages(graphql, actions) {
  const { createPage } = actions;
  const result = await graphql(`
    {
      allSanitySampleProject(
        filter: { slug: { current: { ne: null } }, publishedAt: { ne: null } }
      ) {
        edges {
          node {
            id
            publishedAt
            slug {
              current
            }
          }
        }
      }
    }
  `);

  if (result.errors) throw result.errors;

  const projectEdges = (result.data.allSanitySampleProject || {}).edges || [];

  projectEdges
    .filter(edge => !isFuture(parseISO(edge.node.publishedAt)))
    .forEach(edge => {
      const id = edge.node.id;
      const slug = edge.node.slug.current;
      const path = `/project/${slug}/`;

      createPage({
        path,
        component: require.resolve("./src/templates/project.js"),
        context: { id }
      });
    });
}

exports.createPages = async ({ graphql, actions }) => {
  await createProjectPages(graphql, actions);
  await createGalleryPages(graphql, actions);
};
