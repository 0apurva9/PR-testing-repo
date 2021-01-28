import React from "react";
import MediaQuery from "react-responsive";
import { default as styles } from "./Carousel.css";
import Button from "./Button";
import VisibilityChild from "../../home/components/VisibilityChild.js";
import PropTypes from "prop-types";
export default class Carousel extends React.Component {
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

  componentWillReceiveProps(props) {
    if (props.children && props.children.length !== this.props.children) {
      this.setState({ juke: props.children.length });
    }
  }

  slideBack() {
    const childCount = React.Children.count(this.props.children);
    if (Math.abs(this.state.position) === Math.abs(this.state.juke)) {
      this.setState(
        {
          juke: this.state.juke + childCount
        },
        () => {
          const position = this.state.position - 1;
          this.setState({ position });
        }
      );
    } else {
      const position = this.state.position - 1;
      this.setState({ position });
    }
  }

  checkUserAgentIsMobile() {
    return /iPhone|iPad|iPod|Android|BlackBerry|Opera Mini|IEMobile/i.test(
      navigator.userAgent
    );
  }

  slideForward() {
    const visibleChildren = Math.floor(100 / this.props.elementWidthDesktop);
    const childCount = React.Children.count(this.props.children);
    if (
      (Math.abs(this.state.position) + visibleChildren) % childCount ===
      Math.abs(this.state.juke % childCount)
    ) {
      this.setState(
        {
          juke: this.state.juke - childCount
        },
        () => {
          const position = this.state.position + 1;
          this.setState({ position });
        }
      );
    } else {
      const position = this.state.position + 1;
      this.setState({ position });
    }
  }

  render() {
    const childrenCount = React.Children.count(this.props.children);
    const visibleChildren = Math.floor(100 / this.props.elementWidthDesktop);
    const translationAmount = -(
      this.props.elementWidthDesktop * this.state.position
    );

    const jukeTranslationAmount = -(
      this.props.elementWidthDesktop * this.state.juke
    );
    const transform = `translateX(${translationAmount}%)`;
    const jukeTransform = `translateX(${jukeTranslationAmount}%)`;

    const style = {
      transform: transform
    };
    const jukeStyle = {
      transform: jukeTransform
    };
    let baseClass = styles.base;
    let headerClass = styles.header;
    let leftButtonClass = styles.back;
    let rightButtonClass = styles.forward;
    let buttonClass = styles.button;
    let buttonColor = "#212121";
    let buttonSpace = 10;

    if (this.props.isWhite) {
      headerClass = styles.headerWhite;
      buttonClass = styles.buttonWhite;
      buttonColor = "#fff";
    }
    if (this.props.buttonColor) {
      leftButtonClass = styles.leftButton;
      rightButtonClass = styles.rightButton;
    }
    if (this.props.isPaddingTop) {
      headerClass = styles.headerpaddingTop21;
    }
    if (this.props.seeAll && !this.props.withFooter) {
      buttonSpace = 110;
    }
    if (this.props.showBottomNav) {
      baseClass = styles.bottomNavBase;
      headerClass = styles.bottomNavHeader;
    }
    return (
      <div className={baseClass} styles={{ color: this.props.color }}>
        <MediaQuery query="(min-device-width: 1025px)">
          <div className={headerClass}>
            {this.props.header && (
              <div>
                <h2>{this.props.header}</h2>
                {this.props.subheader && (
                  <div className={styles.subheader}>{this.props.subheader}</div>
                )}
              </div>
            )}
            {this.props.headerComponent &&
              !this.props.header &&
              this.props.headerComponent}
            <div className={styles.nav}>
              {this.props.buttonText && (
                <div
                  className={buttonClass}
                  onClick={() => {
                    this.props.seeAll();
                  }}
                >
                  {this.props.buttonText}
                </div>
              )}
              {childrenCount > visibleChildren && (
                <React.Fragment>
                  <div
                    className={leftButtonClass}
                    onClick={() => {
                      this.slideBack();
                    }}
                  />
                  <div
                    className={rightButtonClass}
                    onClick={() => {
                      this.slideForward();
                    }}
                  />
                </React.Fragment>
              )}
            </div>
          </div>
        </MediaQuery>
        <MediaQuery query="(max-device-width: 1024px)">
          {this.props.header && !this.props.headerComponent && (
            <div className={headerClass} style={{ paddingRight: buttonSpace }}>
              <div>{this.props.header}</div>
              {this.props.subheader && (
                <div className={styles.subheader}>{this.props.subheader}</div>
              )}
              {this.props.buttonText && !this.props.withFooter && (
                <div className={styles.mobileButton}>
                  <Button
                    label={this.props.buttonText}
                    type="hollow"
                    color={buttonColor}
                    width={100}
                    onClick={() => {
                      this.props.seeAll();
                    }}
                  />
                </div>
              )}
            </div>
          )}
          {this.props.headerComponent && this.props.headerComponent}
        </MediaQuery>
        <div className={styles.content}>
          <MediaQuery query="(min-device-width: 1025px)">
            {this.props.banner && (
              <div
                className={styles.banner}
                style={{ width: this.props.bannerWidth }}
              >
                {this.props.banner}
              </div>
            )}
          </MediaQuery>
          <MediaQuery query="(min-device-width: 1025px)">
            <div
              className={
                this.props.sliderWidthFull
                  ? styles.fullSliderHolder
                  : styles.sliderHolder
              }
              style={{
                paddingLeft: `${this.props.offsetDesktop}px`
              }}
            >
              <div className={styles.sliderJuke} style={jukeStyle}>
                <div className={styles.slider} style={style}>
                  {this.props.children &&
                    this.props.children.map((child, i) => {
                      return (
                        <React.Fragment key={i}>
                          <div
                            className={styles.element}
                            style={{
                              width: `${this.props.elementWidthDesktop}%`
                            }}
                          >
                            <VisibilityChild>{child}</VisibilityChild>
                          </div>
                        </React.Fragment>
                      );
                    })}
                  {this.props.children &&
                    this.props.children.map((child, i) => {
                      return (
                        <React.Fragment key={i}>
                          <div
                            className={styles.element}
                            style={{
                              width: `${this.props.elementWidthDesktop}%`
                            }}
                          >
                            <VisibilityChild>{child}</VisibilityChild>
                          </div>
                        </React.Fragment>
                      );
                    })}
                </div>
              </div>
            </div>
          </MediaQuery>
          <MediaQuery query="(max-device-width: 1024px)">
            <div
              className={styles.sliderHolder}
              style={{
                paddingLeft: `${this.props.offsetMobile}px`
              }}
            >
              <div className={styles.slider} style={style}>
                {this.props.children &&
                  this.props.children.map((child, i) => {
                    return (
                      <React.Fragment key={i}>
                        <div
                          className={styles.element}
                          style={{
                            width: `${this.props.elementWidthMobile}%`
                          }}
                        >
                          <VisibilityChild>{child}</VisibilityChild>
                        </div>
                      </React.Fragment>
                    );
                  })}
              </div>
            </div>
          </MediaQuery>
        </div>
        <MediaQuery query="(max-device-width: 1024px)">
          {this.props.seeAll && this.props.withFooter && this.props.buttonText && (
            <div className={styles.footer}>
              <Button
                label={this.props.buttonText}
                type="hollow"
                color={buttonColor}
                width={120}
                onClick={() => {
                  this.props.seeAll();
                }}
              />
            </div>
          )}
        </MediaQuery>
      </div>
    );
  }
}

Carousel.propTypes = {
  elementWidthDesktop: PropTypes.number,
  elementWidthMobile: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  buttonText: PropTypes.string,
  offSet: PropTypes.number,
  header: PropTypes.string,
  isWhite: PropTypes.bool,
  seeAll: PropTypes.func,
  withFooter: PropTypes.bool,
  headerComponent: PropTypes.element,
  padding: PropTypes.string,
  showBottomNav: PropTypes.bool,
  children: PropTypes.arrayOf(PropTypes.node),
  buttonColor: PropTypes.string,
  isPaddingTop: PropTypes.bool,
  color: PropTypes.string,
  subheader: PropTypes.string,
  banner: PropTypes.string,
  bannerWidth: PropTypes.string,
  sliderWidthFull: PropTypes.string,
  offsetDesktop: PropTypes.string,
  offsetMobile: PropTypes.string
};

Carousel.defaultProps = {
  elementWidthDesktop: 25,
  elementWidthMobile: 45,
  buttonText: null,
  color: "#181818",
  withFooter: true,
  padding: "0px 10px",
  showBottomNav: false
};
