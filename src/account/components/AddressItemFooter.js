import React from "react";
import styles from "./AddressItemFooter.css";
import UnderLinedButton from "../../general/components/UnderLinedButton";
import ColourButton from "../../general/components/ColourButton";
import PropTypes from "prop-types";
import DesktopOnly from "../../general/components/DesktopOnly";
import MobileOnly from "../../general/components/MobileOnly";
import Button from "../../general/components/Button";
export default class AddressItemFooter extends React.Component {
  editAddress() {
    if (this.props.editAddress) {
      this.props.editAddress();
    }
  }
  removeAddress() {
    if (this.props.removeAddress) {
      this.props.removeAddress();
    }
  }
  render() {
    return (
      <div className={styles.base}>
        <div className={styles.replaceHolder}>
          <div className={styles.replace}>
            <ColourButton
              label={this.props.buttonLabel}
              onClick={() => this.removeAddress()}
            />
          </div>
        </div>
        {this.props.isEditable && (
          <div className={styles.reviewHolder}>
            <MobileOnly>
              <div className={styles.review} onClick={() => this.editAddress()}>
                <UnderLinedButton
                  label={this.props.underlineButtonLabel}
                  color={this.props.underlineButtonColour}
                />
              </div>
            </MobileOnly>
            <DesktopOnly>
              <div className={styles.updateButtonHolder}>
                <div className={styles.updateButton}>
                  <Button
                    type="hollow"
                    color="#000"
                    label={"Edit"}
                    width={150}
                    onClick={() => this.editAddress()}
                  />
                </div>
              </div>
            </DesktopOnly>
          </div>
        )}
      </div>
    );
  }
}
AddressItemFooter.propTypes = {
  underlineButtonColour: PropTypes.string,
  underlineButtonLabel: PropTypes.string,
  buttonLabel: PropTypes.string,
  replaceItem: PropTypes.func,
  writeReview: PropTypes.func,
  isEditable: PropTypes.bool
};
AddressItemFooter.defaultProps = {
  underlineButtonLabel: "Delete",
  buttonLabel: "Edit",
  underlineButtonColour: "#ff1744",
  isEditable: false
};
