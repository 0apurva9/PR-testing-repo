import React from "react";

import styles from "./GalleryImagesComponent.css";
const IMAGE = "Image";
export default class GalleryImagesComponent extends React.Component {
  render() {
    const galleryImages = this.props && this.props.productDetails;
    const images = galleryImages.galleryImagesList
      ? galleryImages.galleryImagesList.filter(val => {
          return val.mediaType === IMAGE;
        })
      : [];
    const productImages = images
      .map(galleryImageList => {
        if (galleryImageList.mediaType === IMAGE) {
          return galleryImageList.galleryImages.filter(galleryImages => {
            return {
              product: galleryImages.key === "product",
              type: "image"
            };
          });
        }
      })
      .map(image => {
        if (image[0].value) {
          return {
            value: image[0].value,
            type: image[0].key === "product" ? "image" : ""
          };
        } else {
          return image;
        }
      });
    return (
      <div className={styles["image-gallery-Block"]}>
        <ul className={styles["image-gallery-list"]}>
          {productImages.map((image, i) => {
            return (
              <li key={i} className={styles["image-gallery-list-block"]}>
                <a className={styles["image-gallery-list-block-link"]}>
                  <img
                    src={`https:${image.value}`}
                    alt="image-gallery"
                    className={styles["image-gallery-img"]}
                  />
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
