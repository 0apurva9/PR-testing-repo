import React from "react";
import styles from "./EmiDisplay.css";
import Image from "../../xelpmoc-core/Image";
import UnderLinedButton from "../../general/components/UnderLinedButton";
import image from "../../general/components/img/check.svg";
import PropTypes from "prop-types";
import MobileOnly from "../../general/components/MobileOnly";
import DesktopOnly from "../../general/components/DesktopOnly";
import Button from "../../general/components/Button.js";
export default class EmiDisplay extends React.Component {
  handleClick() {
    if (this.props.changePlan) {
      this.props.changePlan();
    }
  }
  render() {
    let emiRate =
      this.props.emiRate === "No Cost"
        ? this.props.emiRate
        : `${this.props.emiRate}% p.a`;
    return (
      <div className={styles.base}>
        <div className={styles.header}>
          {this.props.bankName}
          <MobileOnly>
            <div className={styles.button}>
              <UnderLinedButton
                label="Change plan"
                onClick={() => {
                  this.handleClick();
                }}
              />
            </div>
          </MobileOnly>
        </div>
        <div className={styles.emiText}>
          {this.props.term} EMI @ {emiRate}
          <span className={styles.price}>Rs. {this.props.price}</span>/Month
        </div>
        <DesktopOnly>
          <div className={styles.buttonHolder}>
            <Button
              borderRadius={18}
              borderColor="#d2d2d2"
              backgroundColor="#f9f9f9"
              height={36}
              label={"Change plan"}
              width={147}
              textStyle={{ color: "#d2d2d2", fontSize: 14 }}
              onClick={() => this.handleClick()}
            />
          </div>
        </DesktopOnly>
        <MobileOnly>
          <div className={styles.checkBoxHolder}>
            <Image image={image} />
          </div>
        </MobileOnly>
      </div>
    );
  }
}
EmiDisplay.propTypes = {
  term: PropTypes.string,
  emiRate: PropTypes.string,
  price: PropTypes.string
};
