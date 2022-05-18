import React from "react";
import Header from "./header";

import "../styles/layout.css";
import * as styles from "./layout.module.css";

const Layout = ({ children, onHideNav, onShowNav, showNav, siteTitle }) => {
  console.log("Site title in layout:", siteTitle);
  return (
    <>
      <Header siteTitle={siteTitle} onHideNav={onHideNav} onShowNav={onShowNav} showNav={showNav} />
      <div className={styles.content}>{children}</div>
      <footer className={styles.footer}>
        <div className={styles.footerWrapper}>
          <div className={styles.siteInfo}>
            © {new Date().getFullYear()} Jennie Summerall. Built by All-Porpoise Technologies 🐬.
          </div>
        </div>
      </footer>
    </>
  );
};

export default Layout;
