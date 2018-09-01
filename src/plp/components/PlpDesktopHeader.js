import React from "react";
import styles from "./PlpDesktopHeader.css";

export default class PlpDesktopHeader extends React.Component {
  render() {
    let headingText;

    if (this.props.productListings !== null) {
      if (
        this.props.productListings.seo &&
        this.props.productListings.seo.breadcrumbs &&
        this.props.productListings.seo.breadcrumbs[0] &&
        this.props.productListings.seo.breadcrumbs[0].name
      )
        headingText = `${this.props.productListings.seo.breadcrumbs[0].name}`;
      else {
        const slug = this.props.match.params.slug;
        let splitSlug = "Tata Cliq";
        if (slug) {
          splitSlug = this.props.match.params.slug.replace(/-/g, " ");
          splitSlug = splitSlug.replace(/\b\w/g, l => l.toUpperCase());
          headingText = `${splitSlug}`;
        } else {
          headingText = `Search results`;
        }
      }
    } else {
      headingText = "";
    }
    return <div className={styles.base}>{headingText}</div>;
  }
}
