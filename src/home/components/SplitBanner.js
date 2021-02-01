import React from "react";
import styles from "./SplitBanner.css";
import ImageFlexible from "../../general/components/ImageFlexible";
import Button from "../../general/components/Button";
import PropTypes from "prop-types";
export default class SplitBanner extends React.Component {
  render() {
    return (
      <div className={styles.base}>
        <div className={styles.imageHolder}>
          <ImageFlexible image={this.props.image} lazyLoad={true} />
        </div>
        <div className={styles.textLine}>
          <div className={styles.headingHolder}>
            {this.props.logo && (
              <div
                className={styles.logoHolder}
                style={{ backgroundImage: `url(${this.props.image})` }}
              />
            )}
            <div className={styles.heading}>{this.props.header}</div>
          </div>
          <div className={styles.title}>{this.props.title}</div>
          <div className={styles.subTitle}>{this.props.subTitle}</div>
          {this.props.btnText && (
            <div className={styles.buttonHolder}>
              <Button
                borderRadius={22.5}
                type="hollow"
                color="#fff"
                label={this.props.btnText}
                width={180}
                textStyle={{
                  fontSize: 14
                }}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}
SplitBanner.propTypes = {
  onClick: PropTypes.func,
  title: PropTypes.string,
  btnText: PropTypes.string,
  backgroundColor: PropTypes.string,
  logo: PropTypes.string,
  image: PropTypes.string,
  header: PropTypes.string,
  color: PropTypes.string,
  subTitle: PropTypes.string
};
SplitBanner.defaultProps = {
  color: "#fff",
  backgroundColor: "#ff1744"
};
