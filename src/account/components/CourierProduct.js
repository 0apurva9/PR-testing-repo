import React from "react";
import styles from "./CourierProduct.css";
import PropTypes from "prop-types";
import UnderLinedButton from "../../general/components/UnderLinedButton";
import CheckOutHeader from "../../cart/components/CheckOutHeader.js";
import DesktopOnly from "../../general/components/DesktopOnly";
import MobileOnly from "../../general/components/MobileOnly";
export default class CourierProduct extends React.Component {
  downloadForm() {
    if (this.props.selfCourierDocumentLink) {
      window.open(this.props.selfCourierDocumentLink);
    }
  }
  render() {
    return (
      <div
        className={styles.base}
        style={{
          backgroundColor: this.props.backgroundColor,
          padding: this.props.padding
        }}
      >
        {this.props.header && (
          <div className={styles.header}>
            <MobileOnly>
              <CheckOutHeader
                confirmTitle={this.props.header}
                indexNumber={this.props.indexNumber}
              />
            </MobileOnly>
            <DesktopOnly>
              <CheckOutHeader
                confirmTitle={this.props.header}
                indexNumber={"0"}
              />
              {this.props.selfCourierDocumentLink &&
                this.props.underlineButtonLabel && (
                  <div className={styles.formHolder}>
                    <div
                      className={styles.form}
                      onClick={() => this.downloadForm()}
                    >
                      <UnderLinedButton
                        label={this.props.underlineButtonLabel}
                        color={"#000"}
                      />
                    </div>
                  </div>
                )}
            </DesktopOnly>
          </div>
        )}
        {this.props.text && (
          <div className={styles.text}>{this.props.text}</div>
        )}
        {this.props.subText && (
          <div className={styles.subText}>{this.props.subText}</div>
        )}
        <MobileOnly>
          {this.props.selfCourierDocumentLink &&
            this.props.underlineButtonLabel && (
              <div className={styles.formHolder}>
                <div
                  className={styles.form}
                  onClick={() => this.downloadForm()}
                >
                  <UnderLinedButton
                    label={this.props.underlineButtonLabel}
                    color={this.props.underlineButtonColour}
                  />
                </div>
              </div>
            )}
        </MobileOnly>
        {this.props.children}
      </div>
    );
  }
}
CourierProduct.propTypes = {
  underlineButtonLabel: PropTypes.string,
  underlineButtonColour: PropTypes.string,
  text: PropTypes.string,
  indexNumber: PropTypes.string,
  header: PropTypes.string,
  subText: PropTypes.string,
  onClick: PropTypes.func
};
CourierProduct.defaultProps = {
  backgroundColor: "#fff",
  padding: "0px"
};
