import { Link } from "gatsby";
import React from "react";
import ProjectPreview from "./project-preview";
import * as styles from "./project-preview-grid.module.css";

function ProjectPreviewGrid(props) {
  return (
    <div>
      <h1 id="fubar">{props.title}</h1>
      <div className={styles.root}>
        {/* {props.title && <h2 className={styles.headline}>{props.title}</h2>} */}
        <ul className={styles.grid}>
          {props.nodes &&
            props.nodes.map((node) => (
              <li key={node.id}>
                <ProjectPreview {...node} />
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

ProjectPreviewGrid.defaultProps = {
  title: "",
  nodes: [],
  browseMoreHref: "",
};

export default ProjectPreviewGrid;
