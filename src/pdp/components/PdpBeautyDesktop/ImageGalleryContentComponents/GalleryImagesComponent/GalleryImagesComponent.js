import React from "react";

import styles from "./GalleryImagesComponent.css";
import Image from "../../../.../../../../xelpmoc-core/Image";
const IMAGE = "Image";
export default class GalleryImagesComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      position: 0
    };
    this.type = null;
  }

  zoomIn(event) {
    this.props.setZindex();
    let pre = document.getElementById("preview");
    pre.style.visibility = "visible";
    pre.style.backgroundImage = "url(" + event.target.dataset.src + ")";
    let posX = event.clientX;
    let posY = event.clientY;
    pre.style.backgroundPosition = -posX + "px " + -posY + "px";
  }

  zoomOut() {
    this.props.resetZindex();
    let pre = document.getElementById("preview");
    pre.style.visibility = "hidden";
  }

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
    console.log("productimages", productImages);
    const zoomImages = images
      .map(galleryImageList => {
        if (galleryImageList.mediaType === IMAGE) {
          return galleryImageList.galleryImages.filter(galleryImages => {
            if (galleryImages.key === "superZoom") {
              return galleryImages.key === "superZoom";
            } else {
              return galleryImages.key === "zoom";
            }
          });
        } else if (galleryImageList.mediaType === "Video") {
          return galleryImageList.galleryImages.filter(galleryImages => {
            return galleryImages.key === "thumbnail";
          });
        }
      })
      .map(image => {
        if (image[0] && image[0].value) {
          return image[0].value;
        }
      });
    console.log("zoomimages", zoomImages);
    return (
      <div className={styles["image-gallery-Block"]}>
        <ul className={styles["image-gallery-list"]} id={styles.samples}>
          {productImages.map((image, i) => {
            if (i === this.state.position) {
              this.type = image.type;
            }
            return (
              <li
                key={i}
                className={styles["image-gallery-list-block"]}
                id={`zoom${i}`}
              >
                <img
                  src={`https:${image.value}`}
                  data-src={zoomImages[i]}
                  alt="image-gallery"
                  className={styles["image-gallery-img"]}
                  onMouseMove={event => this.zoomIn(event)}
                  onMouseOut={() => this.zoomOut()}
                />
              </li>
            );
          })}
        </ul>
        <div
          id="preview"
          className={styles.preview}
          onmousemove={event => this.zoomIn(event)}
        />
      </div>
    );
  }
}
