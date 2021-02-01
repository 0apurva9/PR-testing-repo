import React from "react";
import Image from "../../xelpmoc-core/Image";
import PropTypes from "prop-types";
import MediaQuery from "react-responsive";
import styles from "./ProductImageHeader.css";
export default class ProductImageHeader extends React.Component {
  onClick = () => {
    if (this.props.onClick) {
      this.props.onClick();
    }
  };

  render() {
    let className = styles.base;
    if (this.props.description) {
      className = styles.hasDescription;
    }
    let classNameForBanner;
    if (this.props.height) {
      classNameForBanner = styles.contentBanner;
    } else {
      classNameForBanner = styles.content;
    }
    return (
      <div className={className} onClick={this.onClick}>
        <div className={classNameForBanner}>
          <Image image={this.props.image} />
          <MediaQuery query="(max-device-width:1024px)">
            {this.props.logo && (
              <div className={styles.logo}>{this.props.logo}</div>
            )}
          </MediaQuery>
          <div>
            {this.props.name && (
              <div className={styles.name}>{this.props.name}</div>
            )}
            {this.props.label && (
              <div className={styles.label}>{this.props.label}</div>
            )}
            {this.props.description && (
              <div className={styles.description}>
                <MediaQuery query="(min-device-width:1025px)">
                  {this.props.logo && (
                    <div className={styles.logo}>{this.props.logo}</div>
                  )}
                </MediaQuery>
                <span> {this.props.description}</span>
                {this.props.bottomContent}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

ProductImageHeader.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  logo: PropTypes.element,
  bottomContent: PropTypes.element,
  onClick: PropTypes.func,
  height: PropTypes.number,
};
