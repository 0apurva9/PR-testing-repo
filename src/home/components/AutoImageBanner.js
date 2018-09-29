import React from "react";
import VisibilityChild from "./VisibilityChild";
import styles from "./AutoImageBanner.css";
const LOADED = "loaded";
const ERROR = "error";
export default class AutoImageBanner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageStatus: ERROR
    };
  }
  handleClick = () => {
    if (this.props.onClick) {
      this.props.onClick();
    }
  };
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
          this.state.imageStatus === ERROR ? styles.image : styles.imageLoaded
        }
        alt="No Image"
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
    return (
      <div
        className={styles.base}
        onClick={() => {
          this.handleClick();
        }}
      >
        {this.renderImage()}
      </div>
    );
  }
}
