import React from "react";
import PropTypes from "prop-types";
import styles from "./CliqCashKnowMoreSlider.css";
export default class CliqCashKnowMoreSlider extends React.Component {
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

  autoRun = () => {
    this.timer = setTimeout(() => {
      this.goForward();
      this.autoRun();
    }, this.props.interval * 1000);
  };

  componentDidMount() {
    if (this.props.interval) {
      this.autoRun();
    }
  }

  showCliqCashModule = () => {
    if (this.props.showCliqCashModule) {
      this.props.showCliqCashModule(this.props);
    }
  };

  showKycVerification = () => {
    if (this.props.showKycVerification) {
      this.props.showKycVerification(this.props);
    }
  };

  goForward = () => {
    if (this.state.position < 7) {
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
      clearInterval(this.timer);
    }
  };

  goBack = () => {
    if (this.state.position > 0) {
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
    }
    clearInterval(this.timer);
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
        <div className={styles.stepInfoWrapper}>
          <div className={styles.stepInfoHeader}>
            STEP{" "}
            {this.props &&
              this.props.stepsInfo &&
              this.props.stepsInfo[this.state.position].stepNumber}{" "}
            :{" "}
            {this.props &&
              this.props.stepsInfo &&
              this.props.stepsInfo[this.state.position].stepHeader}
          </div>
          <div className={styles.stepInfoDetail}>
            {this.props &&
              this.props.stepsInfo &&
              this.props.stepsInfo[this.state.position].stepDescription}
          </div>
        </div>
        <div className={styles.rightArrow} onClick={() => this.goForward()} />
        <div className={styles.leftArrow} onClick={() => this.goBack()} />
        <div className={styles.sliderWrapper}>
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
        </div>
        <div className={styles.navHolder}>
          {this.props.stepsInfo &&
            this.props.stepsInfo
              .map(val => {
                return val.stepNumber;
              })
              .filter((value, i) => {
                return (
                  this.props.stepsInfo
                    .map(val => {
                      return val.stepNumber;
                    })
                    .indexOf(value) === i
                );
              })
              .map((val, i) => {
                const active =
                  val ===
                  (this.props &&
                    this.props.stepsInfo &&
                    this.props.stepsInfo[this.state.position].stepNumber);
                return (
                  <div
                    className={active ? styles.navActive : styles.navButton}
                    key={i}
                  />
                );
              })}
        </div>

        <div
          className={
            this.props &&
              this.props.stepsInfo &&
              this.props.stepsInfo[this.state.position].stepNumber === 5
              ? styles.buttonHolder
              : styles.hideButtonHolder
          }
          onClick={() =>
            this.props &&
              this.props.cliqCashUserDetails &&
              (!this.props.cliqCashUserDetails.isWalletCreated ||
                !this.props.cliqCashUserDetails.isWalletOtpVerified)
              ? this.showKycVerification()
              : this.showCliqCashModule()
          }
        >
          <div className={styles.button}>
            <div className={styles.buttonText}>ADD GIFT CARD NOW</div>
          </div>
        </div>
      </div>
    );
  }
}

CliqCashKnowMoreSlider.propTypes = {
  interval: PropTypes.number,
  children: PropTypes.node,
  showCliqCashModule: PropTypes.func,
  showKycVerification: PropTypes.func,
  cliqCashUserDetails: PropTypes.shape({
    isWalletCreated: PropTypes.bool,
    isWalletOtpVerified: PropTypes.bool
  }),
  stepsInfo: PropTypes.arrayOf(
    PropTypes.shape({
      stepNumber: PropTypes.number
    })
  )
};
CliqCashKnowMoreSlider.defaultProps = {
  interval: 2
};
