import React from "react";
import DumbCarousel from "./DumbCarousel";
import DesktopOnly from "./DesktopOnly";
import styles from "./CarouselWithControls.css";

export default class CarouselWithControls extends React.Component {
  constructor(props) {
    super(props);
    this.state = { position: 0 };
  }
  forward = () => {
    if (
      this.props.children.length -
        Math.floor(100 / this.props.elementWidthDesktop) >
      this.state.position
    ) {
      this.setState({ position: this.state.position + 1 });
    }
  };
  back = () => {
    if (this.state.position > 0) {
      this.setState({ position: this.state.position - 1 });
    }
  };
  render() {
    return (
      <div className={styles.base}>
        <DesktopOnly>
          <div className={styles.buttons}>
            <div className={styles.backButton} onClick={this.back} />
            <div className={styles.forwardButton} onClick={this.forward} />
          </div>
        </DesktopOnly>
        <DumbCarousel
          position={this.state.position}
          elementWidthDesktop={this.props.elementWidthDesktop}
          elementWidth={this.props.elementWidth}
        >
          {this.props.children}
        </DumbCarousel>
      </div>
    );
  }
}
