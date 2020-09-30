import React from "react";

import styles from "./GalleryImagesComponent.css";
import Image from "../../../.../../../../xelpmoc-core/Image";
const IMAGE = "Image";
export default class GalleryImagesComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      position: 0,
      opacity: true
    };
    this.type = null;
  }

  onZoomInClick(zoomImgList, position) {
    let zoomComponent = { zoomImgList, position };
    this.props.showBeautyImageZoomIn(zoomComponent);
  }

  zoomIn(event) {
    this.props.setZindex();
    this.setState({ opacity: false });
    let pre = document.getElementById("preview");
    pre.style.visibility = "visible";
    pre.style.backgroundImage = "url(" + event.target.dataset.src + ")";
    let posX = event.clientX;
    let posY = event.clientY;
    pre.style.backgroundPosition = -posX + "px " + -posY + "px";
  }

  zoomOut() {
    this.setState({ opacity: true });
    this.props.resetZindex();
    let pre = document.getElementById("preview");
    pre.style.visibility = "hidden";
  }

  render() {
    const galleryImages = this.props && this.props.productDetails;
    const images =
      galleryImages && galleryImages.galleryImagesList
        ? galleryImages.galleryImagesList.filter(val => {
            return val.mediaType === IMAGE;
          })
        : [];
    const productImages =
      images &&
      images
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

    const zoomImages =
      images &&
      images
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
    return (
      <div className={styles["image-gallery-Block"]}>
        <ul className={styles["image-gallery-list"]} id={styles.samples}>
          {productImages &&
            productImages.map((image, i) => {
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
                    onClick={() => this.onZoomInClick(zoomImages, i)}
                  />
                </li>
              );
            })}
        </ul>
        <div
          id="preview"
          className={
            this.state.opacity
              ? [styles.preview, styles.opacity].join(" ")
              : styles.preview
          }
          onmousemove={event => this.zoomIn(event)}
        />
      </div>
    );
  }
}
