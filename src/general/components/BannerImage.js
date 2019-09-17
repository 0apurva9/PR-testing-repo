import React from "react";
import styles from "./BannerImage.css";
import Button from "./Button";
import ImageFlexible from "../../general/components/ImageFlexible";
import MediaQuery from "react-responsive";
import PropTypes from "prop-types";
import { TATA_CLIQ_ROOT } from "../../lib/apiRequest.js";
export default class Banner extends React.Component {
  onClick(event) {
    event.preventDefault();
    if (this.props.url) {
      const urlSuffix = this.props.url.replace(TATA_CLIQ_ROOT, "$1");
      const urlPath = new URL(this.props.url).pathname;
      if (urlPath.indexOf("/que") > -1) {
        window.open(urlSuffix, "_blank");
        window.focus();
      } else {
        this.props.history.push(urlSuffix);
      }
    }
    if (this.props.setClickedElementId) {
      this.props.setClickedElementId();
    }
  }
  render() {
    const urlSuffix = this.props.url.replace(TATA_CLIQ_ROOT, "$1");
    return (
      <React.Fragment>
        <MediaQuery query="(min-device-width: 1025px)">
          <a href={urlSuffix} target="_blank">
            <div className={styles.base} onClick={event => this.onClick(event)}>
              <div className={styles.flexImageHolder}>
                <ImageFlexible image={this.props.image} />
              </div>
              <div className={styles.content}>
                <div className={styles.logoAndText}>
                  <div
                    className={styles.logo}
                    style={{ backgroundImage: `url(${this.props.logo})` }}
                  />
                  {this.props.title && (
                    <div className={styles.title}>{this.props.title}</div>
                  )}
                  {this.props.subTitle && (
                    <div className={styles.subTitle}>{this.props.subTitle}</div>
                  )}

                  {this.props.showButton &&
                    this.props.buttonLabel && (
                      <div className={styles.button}>
                        <Button
                          width={195}
                          height={46}
                          label={this.props.buttonLabel}
                          type={"primary"}
                        />
                      </div>
                    )}
                </div>
              </div>
            </div>
          </a>
          {(this.props.isFollow || this.props.newProducts) && (
            <div className={styles.followButtonWithText}>
              {this.props.isFollow && (
                <div className={styles.followButton}>
                  <Button
                    width={80}
                    height={30}
                    color={"#fff"}
                    label={"Follow"}
                    type={"hollow"}
                  />
                </div>
              )}
              {this.props.newProducts && (
                <div className={styles.followText}>24 new products</div>
              )}
            </div>
          )}
        </MediaQuery>
        <MediaQuery query="(max-device-width: 1024px)">
          <div className={styles.base} onClick={this.onClick}>
            <div
              className={styles.imageHolder}
              style={{ backgroundImage: `url(${this.props.image})` }}
            />
            <div className={styles.content}>
              <div className={styles.logoAndText}>
                <div
                  className={styles.logo}
                  style={{ backgroundImage: `url(${this.props.logo})` }}
                />
                {this.props.title && (
                  <div className={styles.title}>{this.props.title}</div>
                )}
                {this.props.subTitle && (
                  <div className={styles.subTitle}>{this.props.subTitle}</div>
                )}
              </div>
            </div>
          </div>
        </MediaQuery>
      </React.Fragment>
    );
  }
}
Banner.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string,
  logo: PropTypes.string,
  buttonLabel: PropTypes.string
};
Banner.defaultProps = {
  image: "",
  title: "",
  logo: "",
  showButton: true,
  isFollow: false,
  newProducts: false
};
