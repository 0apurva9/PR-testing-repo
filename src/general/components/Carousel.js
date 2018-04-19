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
      position: 0
    };
  }
  slideBack() {
    if (this.state.position > 0) {
      const position = this.state.position - 1;
      this.setState({ position });
    }
  }
  slideForward() {
    const visibleChildren = Math.floor(100 / this.props.elementWidthDesktop);
    if (
      this.state.position <
      React.Children.count(this.props.children) - visibleChildren
    ) {
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
    const transform = `translateX(${translationAmount}%)`;
    const style = {
      transform: transform
    };
    let headerClass = styles.header;
    let buttonClass = styles.button;
    let buttonColor = "#212121";
    let buttonSpace = 10;
    if (this.props.isWhite) {
      headerClass = styles.headerWhite;
      buttonClass = styles.buttonWhite;
      buttonColor = "#fff";
    }
    if (this.props.seeAll && !this.props.withFooter) {
      buttonSpace = 110;
    }

    return (
      <div className={styles.base} styles={{ color: this.props.color }}>
        <MediaQuery query="(min-device-width: 1025px)">
          <div className={headerClass}>
            {this.props.header && (
              <div>
                <div>{this.props.header}</div>
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
                    className={styles.back}
                    onClick={() => {
                      this.slideBack();
                    }}
                  />
                  <div
                    className={styles.forward}
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
          {this.props.header &&
            !this.props.headerComponent && (
              <div
                className={headerClass}
                style={{ paddingRight: buttonSpace }}
              >
                <div>{this.props.header}</div>
                {this.props.subheader && (
                  <div className={styles.subheader}>{this.props.subheader}</div>
                )}
                {this.props.buttonText &&
                  !this.props.withFooter && (
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
          <div className={styles.sliderHolder}>
            <div className={styles.slider} style={style}>
              {this.props.children &&
                this.props.children.map((child, i) => {
                  return (
                    <React.Fragment key={i}>
                      <MediaQuery query="(min-device-width: 1025px)">
                        <div
                          className={styles.element}
                          style={{
                            width: `${this.props.elementWidthDesktop}%`
                          }}
                        >
                          <VisibilityChild>{child}</VisibilityChild>
                        </div>
                      </MediaQuery>
                      <MediaQuery query="(max-device-width: 1024px)">
                        <div
                          className={styles.element}
                          style={{
                            width:
                              this.props.elementWidthMobile === "auto"
                                ? "auto"
                                : `${this.props.elementWidthMobile}%`
                          }}
                        >
                          <VisibilityChild>{child}</VisibilityChild>{" "}
                        </div>
                      </MediaQuery>
                    </React.Fragment>
                  );
                })}
            </div>
          </div>
        </div>
        <MediaQuery query="(max-device-width: 1024px)">
          {this.props.seeAll &&
            this.props.withFooter && (
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
  header: PropTypes.string,
  isWhite: PropTypes.bool,
  seeAll: PropTypes.func,
  withFooter: PropTypes.bool,
  headerComponent: PropTypes.element
};

Carousel.defaultProps = {
  elementWidthDesktop: 25,
  elementWidthMobile: 45,
  buttonText: null,
  color: "#181818",
  withFooter: true
};
