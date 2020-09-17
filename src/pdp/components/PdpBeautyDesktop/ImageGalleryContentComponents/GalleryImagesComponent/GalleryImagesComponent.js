import React from "react";

import styles from "./GalleryImagesComponent.css";

export default class GalleryImagesComponent extends React.Component {
  render() {
    return (
      <div className={styles["image-gallery-Block"]}>
        <ul className={styles["image-gallery-list"]}>
          <li className={styles["image-gallery-list-block"]}>
            <a href="#" className={styles["image-gallery-list-block-link"]}>
              <img
                src="https://via.placeholder.com/338x460"
                alt="Image Gallery"
                className={styles["image-gallery-img"]}
              />
            </a>
          </li>
          <li className={styles["image-gallery-list-block"]}>
            <a href="#" className={styles["image-gallery-list-block-link"]}>
              <img
                src="https://via.placeholder.com/338x460"
                alt="Image Gallery"
                className={styles["image-gallery-img"]}
              />
            </a>
          </li>
          <li className={styles["image-gallery-list-block"]}>
            <a href="#" className={styles["image-gallery-list-block-link"]}>
              <img
                src="https://via.placeholder.com/338x460"
                alt="Image Gallery"
                className={styles["image-gallery-img"]}
              />
            </a>
          </li>
          <li className={styles["image-gallery-list-block"]}>
            <a href="#" className={styles["image-gallery-list-block-link"]}>
              <img
                src="https://via.placeholder.com/338x460"
                alt="Image Gallery"
                className={styles["image-gallery-img"]}
              />
            </a>
          </li>
        </ul>
      </div>
    );
  }
}
