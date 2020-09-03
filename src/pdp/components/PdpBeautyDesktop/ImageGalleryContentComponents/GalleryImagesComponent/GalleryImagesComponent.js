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
                  src="https://via.placeholder.com/342x460"
                  alt="Image Gallery"
                />
              </a>
            </li>
            <li class={styles["image-gallery-list-block"]}>
              <a href="#" class={styles["image-gallery-list-block-link"]}>
                <img
                  src="https://via.placeholder.com/342x460"
                  alt="Image Gallery"
                />
              </a>
            </li>
            <li class={styles["image-gallery-list-block"]}>
              <a href="#" class={styles["image-gallery-list-block-link"]}>
                <img
                  src="https://via.placeholder.com/342x460"
                  alt="Image Gallery"
                />
              </a>
            </li>
            <li class={styles["image-gallery-list-block"]}>
              <a href="#" class={styles["image-gallery-list-block-link"]}>
                <img
                  src="https://via.placeholder.com/342x460"
                  alt="Image Gallery"
                />
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
