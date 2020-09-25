import React from "react";

import styles from "./GalleryImagesComponent.css";
import Image from "../../../.../../../../xelpmoc-core/Image";
const IMAGE = "Image";
export default class GalleryImagesComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      position: 0,
      zoomX: 0,
      zoomY: 0
    };
    this.zoomPositionX = null;
    this.zoomPositionY = null;
    this.zoomHeight = null;
    this.zoomWidth = null;
    this.type = null;
  }

  getPosition(element) {
    let xPosition = 0;
    let yPosition = 0;

    while (element) {
      xPosition += element.offsetLeft - element.scrollLeft + element.clientLeft;
      yPosition += element.offsetTop - element.scrollTop + element.clientTop;
      element = element.offsetParent;
    }

    this.zoomPositionX = xPosition;
    this.zoomPositionY = yPosition;
  }
  getDimensions(element) {
    this.zoomHeight = element.offsetHeight;
    this.zoomWidth = element.offsetWidth;
  }

  handleZoomMove(evt) {
    const scrollTop =
      (window.pageYOffset || this.refs.zoom.scrollTop) -
      (this.refs.zoom.clientTop || 0);
    const zoomX =
      ((evt.clientX - this.zoomPositionX) / this.zoomWidth) * -100 + 25;
    const zoomY =
      ((evt.clientY - this.zoomPositionY + scrollTop) / this.zoomHeight) *
        -100 +
      25;
    setTimeout(() => {
      if (zoomX <= 0 && zoomX >= -51) {
        this.setState({ zoomX });
      }

      if (zoomY <= 0 && zoomY >= -63) {
        this.setState({ zoomY });
      }
    }, 0);
  }

  handleMouseEnter() {
    this.setState({ isZoom: true });
  }
  handleMouseLeave() {
    this.setState({ isZoom: false });
  }

  componentDidMount() {
    if (this.type === "image") {
      this.getPosition(this.refs.zoom);
      this.getDimensions(this.refs.zoom);
    }
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

    let loopedImageIndex = -1;

    return (
      <div className={styles["image-gallery-Block"]}>
        <ul className={styles["image-gallery-list"]}>
          {productImages.map((image, i) => {
            loopedImageIndex = i;
            if (i === this.state.position) {
              this.type = image.type;
            }
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
          {this.type === "image" && (
            <div
              className={styles.image}
              ref="zoom"
              onMouseMove={evt => this.handleZoomMove(evt)}
              onMouseEnter={evt => this.handleMouseEnter(evt)}
              onMouseLeave={evt => this.handleMouseLeave(evt)}
            >
              <div
                className={
                  this.state.isZoom ? styles.zoomArea : styles.hideZoomArea
                }
                style={{
                  left: `${-this.state.zoomX}%`,
                  top: `${-this.state.zoomY}%`
                }}
              />
            </div>
          )}
        </ul>
        <div className={this.state.isZoom ? styles.zoomVisible : styles.zoom}>
          <div
            className={styles.zoomer}
            style={{
              transform: `translateX(${this.state.zoomX}%) translateY(${this.state.zoomY}%)`
            }}
          >
            <Image
              image={zoomImages[loopedImageIndex]}
              fit="contain"
              alt={this.props.alt}
            />
          </div>
        </div>
      </div>
    );
  }
}
