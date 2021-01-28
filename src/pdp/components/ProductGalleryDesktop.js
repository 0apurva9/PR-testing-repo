import React from "react";
import Image from "../../xelpmoc-core/Image";
import PropTypes from "prop-types";
import styles from "./ProductGalleryDesktop.css";
import Icon from "../../xelpmoc-core/Icon";
import similarIcon from "../../general/components/img/similarIcon.svg";
import {
  setDataLayer,
  ADOBE_SIMILAR_PRODUCTS_PDP
} from "../../lib/adobeUtils";
import Video from "../../general/components/Video";
const MODEL_FIT = "Model fit";
const FABRIC = "Fabric";
const WASH = "Wash";
export default class ProductGalleryDesktop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      position: 0,
      previousPage: null,
      nextPage: null,
      zoomX: 0,
      zoomY: 0
    };
    this.zoomPositionX = null;
    this.zoomPositionY = null;
    this.zoomHeight = null;
    this.zoomWidth = null;
    this.type = null;
    this.zoom = React.createRef();
  }

  swapViews(prev, next) {
    if (
      prev > -1 &&
      next > -1 &&
      next < this.props.productImages.length &&
      prev !== next
    ) {
      this.setState({
        previousPage: prev,
        nextPage: next,
        position: next
      });
    }
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

  showSimilarProducts() {
    this.props.showSimilarProducts();
    setDataLayer(ADOBE_SIMILAR_PRODUCTS_PDP, this.props.productData);
  }

  componentDidMount() {
    if (this.type === "image") {
      this.getPosition(this.zoom);
      this.getDimensions(this.zoom);
    }
  }

  handleZoomMove(evt) {
    const scrollTop =
      (window.pageYOffset || this.zoom.scrollTop) -
      (this.zoom.clientTop || 0);
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

  getKeyValue = key => {
    let details = this.props.details;

    return (
      details &&
      details.map(detail => {
        if (detail["key"] !== key) {
          return null;
        } else {
          let detailedValue = detail["value"].split("|");
          return <span>{detailedValue[0]}</span>;
        }
      })
    );
  };

  render() {
    return (
      <div className={styles.base}>
        <div className={styles.content}>
          {this.props.productImages.map((val, i) => {
            let imageClass = styles.image;
            if (i === this.state.position) {
              this.type = val.type;
            }
            if (
              this.state.position === i ||
              this.state.previousPage === i ||
              this.state.nextPage === i
            ) {
              if (this.state.previousPage === i) {
                if (this.state.previousPage < this.state.nextPage) {
                  imageClass = styles.slideOutLeft;
                } else {
                  imageClass = styles.slideOutRight;
                }
              } else if (this.state.nextPage === i) {
                if (this.state.previousPage < this.state.nextPage) {
                  imageClass = styles.slideInRight;
                } else {
                  imageClass = styles.slideInLeft;
                }
              }

              return (
                <div className={imageClass} id="APIM">
                  {val.type === "image" && (
                    <Image
                      image={val.value}
                      fit="contain"
                      alt={this.props.alt}
                    />
                  )}
                  {val.type === "video" && (
                    <Video url={val.value} controls={true} />
                  )}
                  <div
                    className={styles.similarIcon}
                    onClick={() => this.showSimilarProducts()}
                  >
                    <Icon
                      image={similarIcon}
                      size={38}
                      backgroundSize="auto 22px"
                    />
                  </div>
                </div>
              );
            } else {
              return null;
            }
          })}
          {this.type === "image" && (
            <div
              className={styles.image}
              ref={this.zoom}
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
        </div>
        <div className={styles.nav}>
          {this.props.thumbNailImages.map((val, i) => {
            const position = this.state.position;
            return (
              <div
                className={position === i ? styles.navActive : styles.navImage}
                onClick={() => {
                  this.swapViews(position, i);
                }}
              key = {i}>
                {this.props.productImages[i].type === "image" && (
                  <div className={styles.image}>
                    <Image image={val} fit="contain" alt={this.props.alt} />
                  </div>
                )}

                {this.props.productImages[i].type === "video" && (
                  <div className={styles.videoImage} />
                )}
              </div>
            );
          })}
          <div className={styles.product_desc_desktop}>
            {this.props.category === "Clothing" && (
              <React.Fragment>
                <div className={styles.marginTop10}>
                  <div className={styles.description}>
                    {this.getKeyValue(MODEL_FIT)}
                  </div>
                </div>
                <div className={styles.marginTop10}>
                  <div className={styles.fabtype}>
                    {this.getKeyValue(FABRIC)}
                    {this.getKeyValue(WASH) !== undefined &&
                      this.getKeyValue(WASH) !== null && <span>, </span>}
                    {this.getKeyValue(WASH)}
                  </div>
                </div>
              </React.Fragment>
            )}
          </div>
        </div>
        <div
          className={styles.navArrow}
          onClick={() => {
            this.swapViews(this.state.position, this.state.position + 1);
          }}
        />
        <div
          className={styles.navArrowBack}
          onClick={() => {
            this.swapViews(this.state.position, this.state.position - 1);
          }}
        />
        <div className={this.state.isZoom ? styles.zoomVisible : styles.zoom}>
          <div
            className={styles.zoomer}
            style={{
              transform: `translateX(${this.state.zoomX}%) translateY(${this.state.zoomY}%)`
            }}
          >
            <Image
              image={this.props.zoomImages[this.state.position]}
              fit="contain"
              alt={this.props.alt}
            />
          </div>
        </div>
      </div>
    );
  }
}

ProductGalleryDesktop.propTypes = {
  productImages: PropTypes.arrayOf(PropTypes.string),
  thumbNailImages: PropTypes.arrayOf(PropTypes.string),
  zoomImages: PropTypes.arrayOf(PropTypes.string),
  showSimilarProducts: PropTypes.func,
  details: PropTypes.object,
  alt: PropTypes.string,
  category: PropTypes.string,
  productData: PropTypes.object
};
