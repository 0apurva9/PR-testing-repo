import React from "react";

import styles from "./GalleryImagesComponent.css";

export default class GalleryImagesComponent extends React.Component {
  render() {
    return (
      <div>
        <div>
          <ul class={styles["image-gallery-list"]}>
            <li class={styles["image-gallery-list-block"]}>
              <a href="#" class={styles["image-gallery-list-block-link"]}>
                <img
                  src="https://via.placeholder.com/338x460"
                  alt="Image Gallery"
                  class={styles["image-gallery-img"]}
                />
              </a>
            </li>
            <li class={styles["image-gallery-list-block"]}>
              <a href="#" class={styles["image-gallery-list-block-link"]}>
                <img
                  src="https://via.placeholder.com/338x460"
                  alt="Image Gallery"
                  class={styles["image-gallery-img"]}
                />
              </a>
            </li>
            <li class={styles["image-gallery-list-block"]}>
              <a href="#" class={styles["image-gallery-list-block-link"]}>
                <img
                  src="https://via.placeholder.com/338x460"
                  alt="Image Gallery"
                  class={styles["image-gallery-img"]}
                />
              </a>
            </li>
            <li class={styles["image-gallery-list-block"]}>
              <a href="#" class={styles["image-gallery-list-block-link"]}>
                <img
                  src="https://via.placeholder.com/338x460"
                  alt="Image Gallery"
                  class={styles["image-gallery-img"]}
                />
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
