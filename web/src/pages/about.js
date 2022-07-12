import React from "react";
import { graphql } from "gatsby";
import {
  mapEdgesToNodes,
  filterOutDocsWithoutSlugs,
  filterOutDocsPublishedInTheFuture
} from "../lib/helpers";
import Container from "../components/container";
import GraphQLErrorList from "../components/graphql-error-list";
import styled from "styled-components";
import { navigate } from "gatsby-link";
import SEO from "../components/seo";
import Layout from "../containers/layout";

export const query = graphql`
  query AboutPageQuery {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      title
      description
      keywords
      news
    }
  }
`;

export default function contactForm(props) {
  const { data, errors } = props;
  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    );
  }

  const site = (data || {}).site;
  //console.log("site:", site);
  if (!site) {
    throw new Error(
      'Missing "Site settings". Open the studio at http://localhost:3333 and add some content to "Site settings" and restart the development server.'
    );
  }

  return (
    <Layout>
      <SEO title={site.title} description={site.description} keywords={site.keywords} />
      <Container>
        <div id="address">
          <strong>Summerall Gallery</strong>
          <p>
            <a href="https://www.google.com/maps/place/13+Main+St,+Deer+Isle,+ME+04627/@44.2243846,-68.6811116,17z/data=!3m1!4b1!4m5!3m4!1s0x4cae8305221f1d4d:0xd7b3329326ad0f04!8m2!3d44.2243846!4d-68.6789229">
              13 Main Street, Deer Isle, Maine
            </a>
          </p>
          <p>Open 12-5 most days or by appointment.</p>
          <p>617-484-5262</p>
        </div>
        <div id="statement">
          <p>
            I’ve been creating collage images of animals for years now, with the goal of trying to
            capture what one viewer called the “sweetness and dignity” of the marvelous creatures
            who share the planet with us. My latest subjects include the Octopus, an astonishing
            animal whose abilities are only now beginning to be understood. And the Bowerbirds of
            the Pacific, whose mating activites involve the artful construction of “bowers” and
            collections of intriguing objects. As the years have passed I’ve struggled to absorb the
            profoundly sad truth that mankind is rapidly destroying the world as we - and the
            animals - have known it.
          </p>
          <p>
            Other recents works are from a new series called “Où sont les neiges?” This phrase is
            drawn from a very old poem which asks “Where are the snows of yesteryear?” I’ve depicted
            versions of arctic animals which turn white in wintertime for camouflage, now confounded
            by a warming climate which fails to produce the snow and ice on which they depend.
            Meanwhile the billionaires are busy playing with their rockets.
          </p>
          <p>
            My hope is that in spite of my bitter and helpless feelings about all of this I’ve
            managed to convey some sense of beauty and appreciation for the natural world. And I’m
            grateful for the human ingenuity shown in the array of handmade papers I’ve collected
            over the years. The red paper for the Octopus, for instance, is spotted with a wax
            resist method. The deep blue of the Satin Bowerbird is a hand-burnished paper I found in
            London. Hunting for these papers has been a fun and ongoing part of my creative process.
          </p>
          <p>
            As E.O. Wilson said, we are “biophiles,” lovers of life and living things. He says of
            this propensity: “our spirits are woven from it, and hope rises on its currents.”{" "}
          </p>
        </div>
      </Container>
    </Layout>
  );
}
