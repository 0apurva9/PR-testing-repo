import React from "react";
import PropTypes from "prop-types";
import styles from "./BannerDesktop.css";
export default class BannerDesktop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      juke:
        this.props.children && this.props.children.length
          ? this.props.children.length
          : 0,
      position: 0
    };
  }
  changePosition(i) {
    if (i !== undefined) {
      this.setState({ juke: this.props.children.length }, () => {
        this.setState({ position: i });
      });
    }
  }
  autoRun = () => {
    setTimeout(() => {
      this.goForward();
      this.autoRun();
    }, this.props.interval * 1000);
  };
  componentDidMount() {
    if (this.props.interval) {
      this.autoRun();
    }
  }
  goForward = () => {
    const childCount = React.Children.count(this.props.children);
    if ((Math.abs(this.state.position) + 1) % childCount === 0) {
      this.setState(
        {
          juke: this.state.juke - this.props.children.length
        },
        () => {
          this.setState({ position: this.state.position + 1 });
        }
      );
    } else {
      this.setState({ position: this.state.position + 1 });
    }
  };
  goBack = () => {
    const childCount = React.Children.count(this.props.children);
    if (Math.abs(this.state.position) === Math.abs(this.state.juke)) {
      this.setState(
        {
          juke: this.state.juke + childCount
        },
        () => {
          this.setState({ position: this.state.position - 1 });
        }
      );
    } else {
      this.setState({ position: this.state.position - 1 });
    }
  };
  render() {
    const translationAmount = -(100 * this.state.position);
    const transform = `translateX(${translationAmount}%)`;
    const style = {
      transform: transform
    };
    const jukeTranslationAmount = -(100 * this.state.juke);
    const jukeTransform = `translateX(${jukeTranslationAmount}%)`;
    const jukeStyle = {
      transform: jukeTransform
    };
    return (
      <div className={styles.base}>
        <div className={styles.rightArrow} onClick={() => this.goForward()} />
        <div className={styles.leftArrow} onClick={() => this.goBack()} />
        <div className={styles.slider} style={jukeStyle}>
          <div style={style} className={styles.imageHolder}>
            {this.props.children.map((child, i) => {
              return (
                <div className={styles.item} key={i}>
                  {child}
                </div>
              );
            })}
            {this.props.children.map((child, i) => {
              return (
                <div className={styles.item} key={i}>
                  {child}
                </div>
              );
            })}
          </div>
        </div>
        <div className={styles.maxWidth}>
          <div className={styles.nav}>
            {this.props.children.map((val, i) => {
              return (
                <div
                  className={
                    (this.state.position + this.state.juke) %
                      this.props.children.length ===
                    i
                      ? styles.active
                      : styles.navButton
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
      </div>
    );
  }
}

BannerDesktop.propTypes = {
  interval: PropTypes.number
};
BannerDesktop.defaultProps = {
  interval: 9
};
