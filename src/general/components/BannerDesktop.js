import React from "react";
import styles from "./BannerDesktop.css";
export default class BannerDesktop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      position: 0
    };
  }
  changePosition(i) {
    if (i !== undefined) {
      this.setState({ position: i });
    }
  }
  autoRun = () => {
    setTimeout(() => {
      const i = (this.state.position + 1) % 3;
      this.changePosition(i);
      this.autoRun();
    }, this.props.interval);
  };
  componentDidMount() {
    if (this.props.interval) {
      this.autoRun();
    }
  }
  goForward = () => {
    if (
      this.props.children &&
      this.props.children.length - 1 > this.state.position
    ) {
      const position = this.state.position + 1;
      this.setState({ position });
    }
  };
  goBack = () => {
    if (this.state.position > 0) {
      const position = this.state.position - 1;
      this.setState({ position });
    }
  };
  render() {
    return (
      <div className={styles.base}>
        <div className={styles.rightArrow} onClick={() => this.goForward()} />
        <div className={styles.leftArrow} onClick={() => this.goBack()} />
        {this.props.children.map((child, i) => {
          if (this.state.position === i) {
            return (
              <div className={styles.item} key={i}>
                {child}
              </div>
            );
          }
        })}
        <div className={styles.nav}>
          {this.props.children.map((val, i) => {
            return (
              <div
                className={
                  this.state.position === i ? styles.active : styles.navButton
                }
                key={i}
                onClick={() => {
                  this.changePosition(i);
                }}
              />
            );
          })}
        </div>
      </div>
    );
  }
}
