import React from "react";
import styles from "./SplitBanner.css";
import Image from "../../xelpmoc-core/Image";
import Icon from "../../xelpmoc-core/Icon";
import Button from "../../general/components/Button";
import PropTypes from "prop-types";
export default class SplitBanner extends React.Component {
  handleClick = () => {
    if (this.props.onClick) {
      this.props.onClick();
    }
  };
  render() {
    return (
      <div className={styles.base}>
        <div className={styles.imageHolder}>
          <Image image={this.props.image} lazyLoad={true} />
        </div>
        <div className={styles.textLine}>
          <div className={styles.headingHolder}>
            {this.props.logo && (
              <div className={styles.logoHolder}>
                <Icon image={this.props.logo} size={60} />
              </div>
            )}
            <div className={styles.heading}>{this.props.header}</div>
          </div>
          <div className={styles.title}>{this.props.title}</div>
          <div className={styles.subTitle}>{this.props.subTitle}</div>
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
              onClick={() => this.handleClick()}
            />
          </div>
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
  color: PropTypes.string
};
SplitBanner.defaultProps = {
  color: "#fff",
  backgroundColor: "#ff1744"
};
