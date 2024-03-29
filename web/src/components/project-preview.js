import { Link } from "gatsby";
import React from "react";
import { cn, buildImageObj } from "../lib/helpers";
import { imageUrlFor } from "../lib/image-url";
import BlockContent from "./block-content";

import * as styles from "./project-preview.module.css";
import { responsiveTitle3 } from "./typography.module.css";

function ProjectPreview(props) {
  return (
    <Link className={styles.root} to={`/project/${props.slug.current}`}>
      <div className={styles.leadMediaThumb}>
        {props.mainImage && props.mainImage.asset && (
          <img
            src={imageUrlFor(buildImageObj(props.mainImage)).width(500).height(700).url()}
            alt={props.mainImage.alt}
          />
        )}
      </div>
      {/* The below line puts titles under the gallery preview image */}
      {/*<h4 className={cn(responsiveTitle3, styles.title)}>{props.title}</h4>*/}
      {/* {props._rawExcerpt && (
        <div className={styles.excerpt}>
          <BlockContent blocks={props._rawExcerpt} />
        </div>
      )} */}
    </Link>
  );
}

export default ProjectPreview;
