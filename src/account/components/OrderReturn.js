import React from "react";
import styles from "./OrderReturn.css";
import UnderLinedButton from "../../general/components/UnderLinedButton";
import ColourButton from "../../general/components/ColourButton";
import MediaQuery from "react-responsive";
import Button from "../../xelpmoc-core/Button";
import PropTypes from "prop-types";
export default class OrderReturn extends React.Component {
  replaceItem() {
    if (this.props.replaceItem) {
      this.props.replaceItem();
    }
  }
  writeReview() {
    if (this.props.writeReview) {
      this.props.writeReview();
    }
  }
  render() {
    return (
      <React.Fragment>
        <MediaQuery query="(max-device-width: 1024px)">
          <div className={styles.base}>
            <div className={styles.replaceHolder}>
              <div className={styles.replace}>
                <ColourButton
                  label={this.props.buttonLabel}
                  onClick={() => this.replaceItem()}
                />
              </div>
            </div>
            {this.props.isEditable && (
              <div className={styles.reviewHolder}>
                <div
                  className={
                    this.props.outOfStock ? styles.reviewDesible : styles.review
                  }
                  onClick={() => this.writeReview()}
                >
                  <UnderLinedButton
                    label={this.props.underlineButtonLabel}
                    color={this.props.underlineButtonColour}
                  />
                </div>
              </div>
            )}
          </div>
        </MediaQuery>
        <MediaQuery query="(min-device-width: 1025px)">
          <div className={styles.base}>
            <div
              className={
                this.props.outOfStock
                  ? styles.disableAddToBag
                  : styles.buttonAddToBag
              }
            >
              <Button
                label={this.props.underlineButtonLabel}
                onClick={() => this.writeReview()}
                backgroundColor="transparent"
                borderColor={"#000000"}
                width={145}
                height={35}
                borderRadius={20}
                textStyle={{
                  color: "#000000",
                  fontSize: 14,
                  fontFamily: "regular"
                }}
              />
            </div>
            <div className={styles.removeButton}>
              <ColourButton
                label={this.props.buttonLabel}
                onClick={() => this.replaceItem()}
              />
            </div>
          </div>
        </MediaQuery>
      </React.Fragment>
    );
  }
}
OrderReturn.propTypes = {
  underlineButtonColour: PropTypes.string,
  underlineButtonLabel: PropTypes.string,
  buttonLabel: PropTypes.string,
  replaceItem: PropTypes.func,
  writeReview: PropTypes.func,
  isEditable: PropTypes.bool,
  outOfStock: PropTypes.bool
};
OrderReturn.defaultProps = {
  underlineButtonLabel: "Write a review",
  buttonLabel: "Return",
  underlineButtonColour: "#ff1744",
  isEditable: false,
  outOfStock: false
};
