import React from "react";
import styled from "styled-components";
import { graphql, Link } from "gatsby";
import {
  mapEdgesToNodes,
  filterOutDocsWithoutSlugs,
  filterOutDocsPublishedInTheFuture,
  buildImageObj,
} from "../lib/helpers";
import { imageUrlFor } from "../lib/image-url";
import Container from "../components/container";
import GraphQLErrorList from "../components/graphql-error-list";
import SEO from "../components/seo";
import Layout from "../containers/layout";

export const query = graphql`
  query IndexPageQuery {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      title
      description
      keywords
    }
    categories: allSanityCategory(sort: { order: ASC, fields: orderRank }) {
      edges {
        node {
          id
          order
          buttonImage {
            crop {
              _key
              _type
              top
              bottom
              left
              right
            }
            hotspot {
              _key
              _type
              x
              y
              height
              width
            }
            asset {
              _id
            }
            alt
            caption
          }
          buttonBackgroundColor {
            hex
          }
          title
          slug {
            current
          }
        }
      }
    }
    projects: allSanitySampleProject(
      limit: 6
      sort: { fields: [publishedAt], order: DESC }
      filter: { slug: { current: { ne: null } }, publishedAt: { ne: null } }
    ) {
      edges {
        node {
          id
          mainImage {
            crop {
              _key
              _type
              top
              bottom
              left
              right
            }
            hotspot {
              _key
              _type
              x
              y
              height
              width
            }
            asset {
              _id
            }
            alt
          }
          title
          _rawExcerpt
          slug {
            current
          }
        }
      }
    }
  }
`;

const HomeStyled = styled.div`
  h1 {
    display: block;
    margin-left: 0px;
    margin-right: auto;
    width: 50%;
  }
  .navImagesGrid {
    display: grid;
    max-width: 1200px;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 10px;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }
`;

const HomeNavLinkStyled = styled.div`
  div.buttonCaption {
    color: white;
    font: arial;
    font-size: 32px;
    font-weight: bold;
    top: 300px;
    left: 20px;
    position: absolute;
    @media (pointer: fine) {
      display: none;
    }
  }
  .bullshit {
    background-color: ${(props) => props.bgcolor};
    float: left;
  }
  .buttonImage {
    display: block;
  }
  .hoverButton {
    position: relative;
  }
  .buttonImage:hover {
    @media (pointer: fine) {
      //     filter: saturate(100%) brightness(60%);
      opacity: 0;
    }
  }
  .buttonImage:hover ~ .buttonCaption {
    @media (pointer: fine) {
      display: block;
    }
  }
`;

const IndexPage = (props) => {
  const { data, errors } = props;

  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    );
  }

  const site = (data || {}).site;
  const projectNodes = (data || {}).projects
    ? mapEdgesToNodes(data.projects)
        .filter(filterOutDocsWithoutSlugs)
        .filter(filterOutDocsPublishedInTheFuture)
    : [];

  if (!site) {
    throw new Error(
      'Missing "Site settings". Open the studio at http://localhost:3333 and add some content to "Site settings" and restart the development server.'
    );
  }
  const catArray = data.categories.edges;
  // console.log(catArray);
  // console.log(catArray[0].node.id);
  // console.log(catArray[0].node.buttonImage);
  // console.log(catArray[0].node.slug.current);
  return (
    <Layout>
      <SEO title={site.title} description={site.description} keywords={site.keywords} />
      <Container>
        <HomeStyled>
          <h1>{site.title}</h1>
          <div className="navImagesGrid">
            {catArray &&
              catArray.map((cat) => (
                <HomeNavLinkStyled bgcolor={cat.node.buttonBackgroundColor.hex}>
                  <Link key={cat.node.id} to={cat.node.slug.current}>
                    <div className="hoverButton">
                      <div className="bullshit">
                        <img
                          className="buttonImage"
                          src={imageUrlFor(buildImageObj(cat.node.buttonImage))
                            .width(270)
                            .height(400)
                            .url()}
                          alt={cat.node.buttonImage.alt}
                        />
                        <div className="buttonCaption">{cat.node.title}</div>
                      </div>
                    </div>
                  </Link>
                </HomeNavLinkStyled>
              ))}
          </div>
        </HomeStyled>
      </Container>
    </Layout>
  );
};

export default IndexPage;

// To do:
// - sort order in CMS and here
// - images in the buttons from CMS
