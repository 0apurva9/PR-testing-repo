import React from "react";
import styles from "./ProductImageHeaderDesktop.css";
import Logo from "../../general/components/Logo";
import PropTypes from "prop-types";
export default class ProductImageHeaderDesktop extends React.Component {
  render() {
    const { backgroundColor, backgroundImage } = this.props;
    return (
      <div
        className={styles.base}
        style={{
          backgroundColor: backgroundColor,
          backgroundImage: `url(${backgroundImage})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover"
        }}
      >
        <div className={styles.overlay}>
          <div className={styles.logoHolder}>
            <div className={styles.logo}>
              <Logo image={this.props.brandLogo} />
            </div>
          </div>
          <div className={styles.title}>{this.props.title}</div>
        </div>
      </div>
    );
  }
}
ProductImageHeaderDesktop.propTypes = {
  backgroundColor: PropTypes.string,
  backgroundImage: PropTypes.string,
  brandLogo: PropTypes.string,
  title: PropTypes.string
};
ProductImageHeaderDesktop.defaultProps = {
  title: "Enjoy Colorful dewali with creacking deals"
};
