import React from "react";
import styles from "./DiscoverMoreL1ForDesktop.css";
import CircleProductImage from "../../general/components/CircleProductImage";
import { TATA_CLIQ_ROOT } from "../../lib/apiRequest.js";
import Button from "../../general/components/Button.js";
import PropTypes from "prop-types";
import move from "lodash-move";
export default class DiscoverMoreL1ForDesktop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items:
        this.props.items && this.props.items !== "undefined"
          ? this.props.items
          : ""
    };
  }
  slideBack() {
    if (this.state.items.length > 0) {
      let backWardArray = move(
        this.state.items,
        0,
        this.state.items.length - 1
      );
      this.setState({ items: backWardArray });
    }
  }
  onClick = webURL => {
    if (webURL) {
      const urlSuffix = webURL.replace(TATA_CLIQ_ROOT, "$1");
      this.props.history.push(urlSuffix);
    }
  };
  slideForward() {
    if (this.state.items && this.props.items.length > 0) {
      let forwardArray = move(this.state.items, this.state.items.length - 1, 0);
      this.setState({ items: forwardArray });
    }
  }
  render() {
    return (
      <div className={styles.base}>
        <div className={styles.header}>
          <div className={styles.showHeaderText}>{this.props.header}</div>
          <div className={styles.nav}>
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
          </div>
        </div>
        <div className={styles.sliderHolder}>
          <div className={styles.slider}>
            {this.state.items &&
              this.state.items.map((val, i) => {
                if (i < 3) {
                  return (
                    <React.Fragment key={i}>
                      <div
                        className={styles.element}
                        style={{
                          width: "33.33%"
                        }}
                      >
                        <div className={styles.circleBrandesHolder}>
                          <CircleProductImage
                            label={val.title}
                            image={val.imageURL}
                            key={i}
                            value={val.webURL}
                            onClick={() => this.onClick(val.webURL)}
                          />
                        </div>
                      </div>
                    </React.Fragment>
                  );
                }
              })}
          </div>
          <div className={styles.descriptionHolder}>
            <div className={styles.heading}>{this.props.title}</div>
            {this.state.items && (
              <div className={styles.listHolder}>
                {this.state.items &&
                  this.state.items.map((val, i) => {
                    if (i > 2 && i < 7) {
                      return (
                        <div
                          className={styles.listLink}
                          onClick={() => this.onClick(val.webURL)}
                        >
                          {val.title}
                        </div>
                      );
                    }
                  })}
              </div>
            )}
            {this.props.btnText &&
              this.props.specificWebUrl && (
                <div className={styles.buttonHolder}>
                  <div className={styles.button}>
                    <Button
                      type="hollow"
                      color="#000"
                      label={this.props.btnText}
                      width={130}
                      onClick={() => this.onClick(this.props.specificWebUrl)}
                    />
                  </div>
                </div>
              )}
          </div>
        </div>
      </div>
    );
  }
}
DiscoverMoreL1ForDesktop.propTypes = {
  title: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      brands: PropTypes.arrayOf(
        PropTypes.shape({
          imageURL: PropTypes.string,
          webURL: PropTypes.string
        })
      )
    })
  )
};
