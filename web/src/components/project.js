import { format, formatDistance, differenceInDays } from "date-fns";
import React from "react";
import { Link } from "gatsby";
import { buildImageObj } from "../lib/helpers";
import { imageUrlFor } from "../lib/image-url";
import BlockContent from "./block-content";
import Container from "./container";
import RoleList from "./role-list";

import * as styles from "./project.module.css";
import styled from "styled-components";

const ArtAndInfoStyled = styled.div`
  margin: auto;
  width: 700px; /* if you change this, change it below */
  h2 {
    font-size: 1em;
  }
`;

function Project(props) {
  const { _rawBody, title, categories, mainImage, members, publishedAt, relatedProjects } = props;
  //console.log(_rawBody);
  return (
    <article className={styles.root}>
      <ArtAndInfoStyled>
        <h1>{title}</h1>
        <h2>{mainImage.caption}</h2>
        <h3>{_rawBody ? _rawBody[0].children[0].text : ""}</h3>
        {props.mainImage && mainImage.asset && (
          <div className={styles.mainImage}>
            <img
              src={imageUrlFor(buildImageObj(mainImage)).width(1500).fit("crop").url()}
              alt={mainImage.alt}
              style={{ width: "700px" }}
            />
          </div>
        )}
      </ArtAndInfoStyled>
    </article>
  );
}

export default Project;
