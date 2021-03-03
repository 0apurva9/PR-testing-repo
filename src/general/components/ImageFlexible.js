import React from "react";
import PropTypes from "prop-types";
import styles from "./ImageFlexible.css";
import VisibilityChild from "../../home/components/VisibilityChild";

const LOADING = "loading";
const LOADED = "loaded";
const ERROR = "error";
export default class ImageFlexible extends React.Component {
  constructor(props) {
    super(props);
    this.state = { imageStatus: LOADING };
  }

  handleImageLoaded() {
    this.setState({ imageStatus: LOADED });
  }

  handleImageErrored() {
    this.setState({ imageStatus: ERROR });
  }

  renderImage = () => {
    const img = (
      <img
        className={
          this.state.imageStatus === LOADED ? styles.loaded : styles.actual
        }
        alt={this.props.alt}
        src={this.props.image}
        onLoad={() => this.handleImageLoaded()}
        onError={() => this.handleImageErrored()}
      />
    );
    if (this.props.lazyLoad) {
      return <VisibilityChild> {img} </VisibilityChild>;
    }
    return img;
  };

  render() {
    return <div className={styles.base}>{this.renderImage()}</div>;
  }
}
ImageFlexible.propTypes = {
  image: PropTypes.string.isRequired,
  alt: PropTypes.string,
  lazyLoad: PropTypes.bool
};

ImageFlexible.defaultProps = {
  alt: "No Image",
  lazyLoad: false
};
