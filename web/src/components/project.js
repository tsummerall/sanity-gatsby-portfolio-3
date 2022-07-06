import { format, formatDistance, differenceInDays } from "date-fns";
import React from "react";
import { Link } from "gatsby";
import { buildImageObj } from "../lib/helpers";
import { imageUrlFor } from "../lib/image-url";
import BlockContent from "./block-content";
import Container from "./container";
import RoleList from "./role-list";

import * as styles from "./project.module.css";

function Project(props) {
  const { _rawBody, title, categories, mainImage, members, publishedAt, relatedProjects } = props;
  console.log(_rawBody);
  return (
    <article className={styles.root}>
      <h1>{title}</h1>
      <h2>{mainImage.caption}</h2>
      <h3>{_rawBody ? _rawBody[0].children[0].text : ""}</h3>
      {props.mainImage && mainImage.asset && (
        <div className={styles.mainImage}>
          <img
            src={imageUrlFor(buildImageObj(mainImage))
              .width(500)
              .fit("crop")
              .url()}
            alt={mainImage.alt}
          />
        </div>
      )}
    </article>
  );
}

export default Project;
