import React, { Component } from "react";
import styles from "./BeautyPdpImageZoomIn.css";
import PropTypes from "prop-types";

export default class BeautyPdpImageZoomIn extends Component {
  state = {
    position: 0,
    previousPage: null,
    nextPage: null
  };

  swapViews(prev, next) {
    if (
      prev > -1 &&
      next > -1 &&
      next < this.props.zoomImgList.length &&
      prev !== next
    ) {
      this.setState({
        previousPage: prev,
        nextPage: next,
        position: next
      });
    }
  }

  autoMouseScroll(event) {
    const ele = document.getElementById("autoScroll");
    ele.style.backgroundPositionX = "-50px";
    ele.style.backgroundPositionY = -event.clientY - 50 + "px";
  }

  render() {
    return (
      <div className={styles.base}>
        <div
          id="autoScroll"
          className={styles["desktop-image-zoom-image-container"]}
          onMouseMove={event => this.autoMouseScroll(event)}
          style={{
            backgroundImage: `url(${
              this.props.zoomImgList[this.state.position]
            })`
          }}
        />
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
      </div>
    );
  }
}

BeautyPdpImageZoomIn.propTypes = {
  zoomImgList: PropTypes.arrayOf(PropTypes.string)
};
