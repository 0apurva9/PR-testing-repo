import React from "react";
import styles from "./GalleryImagesComponent.css";

export default class GalleryImagesComponent extends React.Component {
  render() {
    // console.log("inside-gallery-image-comp", this.props);
    return (
      <div class="imageGalleryComponent">
        <div class="imageGalleryBlock">
          <ul class={styles.imageGalleryList}>
            <li class={styles.imageGalleryListBlock}>
              <a href="#" class={styles.imageGalleryListBlockLink}>
                <img
                  src="https://via.placeholder.com/342x460"
                  alt="Image Gallery"
                />
              </a>
            </li>
            <li class="imageGalleryListBlock">
              <a href="#" class={styles.imageGalleryListBlockLink}>
                <img
                  src="https://via.placeholder.com/342x460"
                  alt="Image Gallery"
                />
              </a>
            </li>
            <li class="imageGalleryListBlock">
              <a href="#" class={styles.imageGalleryListBlockLink}>
                <img
                  src="https://via.placeholder.com/342x460"
                  alt="Image Gallery"
                />
              </a>
            </li>
            <li class="imageGalleryListBlock">
              <a href="#" class={styles.imageGalleryListBlockLink}>
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
