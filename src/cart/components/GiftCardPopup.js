import React from "react";
import styles from "./GiftCardPopup.css";
import PropTypes from "prop-types";
import Icon from "../../xelpmoc-core/Icon";
import Button from "../../general/components/Button.js";
import Input2 from "../../general/components/Input2.js";
import giftImageURL from "../../general/components/img/Gift.svg";
import MDSpinner from "../../general/components/Loader";
import * as UserAgent from "../../lib/UserAgent.js";
export default class GiftCardPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cardNumber: this.props.voucherNumber ? this.props.voucherNumber : "",
      pinNumber: this.props.voucherPin ? this.props.voucherPin : "",
      isEnable: UserAgent.checkUserAgentIsMobile() ? true : false
    };
  }
  addGiftCard() {
    if (this.props.addGiftCard) {
      this.props.addGiftCard(this.state);
    }
    this.setState({
      cardNumber: "",
      pinNumber: ""
    });
  }
  onVoucher(val) {
    this.setState({ cardNumber: val });
    if (!UserAgent.checkUserAgentIsMobile()) {
      if (val.length > 0) {
        this.setState({
          isEnable: true
        });
      } else {
        this.setState({
          isEnable: false
        });
      }
    }
  }
  render() {
    if (this.props.loading) {
      return <MDSpinner />;
    }
    return (
      <div className={styles.base}>
        {this.props.isGiftCardHeader && (
          <div className={styles.giftCardHeading}>
            <div className={styles.iconHolder}>
              <Icon image={giftImageURL} size={30} />
            </div>
            {this.props.heading}
          </div>
        )}

        <div className={styles.content}>
          <div className={styles.inputHolder}>
            <Input2
              boxy={true}
              placeholder="Voucher number"
              value={
                this.props.voucherNumber
                  ? this.props.voucherNumber
                  : this.state.cardNumber
              }
              onChange={val => this.onVoucher(val)}
              textStyle={{ fontSize: 14 }}
              height={33}
            />
          </div>

          <div className={styles.inputHolder}>
            <Input2
              boxy={true}
              placeholder="Voucher pin"
              value={
                this.props.voucherPin
                  ? this.props.voucherPin
                  : this.state.pinNumber
              }
              onChange={pinNumber => this.setState({ pinNumber })}
              textStyle={{ fontSize: 14 }}
              height={33}
            />
          </div>
          <div className={styles.termsAndConditionCheck}>
            Please read the Terms & Conditions before making your purchase
          </div>
          {this.state.isEnable && (
            <div className={styles.buttonHolder}>
              <div className={styles.button}>
                <Button
                  type="primary"
                  backgroundColor="#ff1744"
                  height={36}
                  label="Add Gift Card"
                  width={211}
                  textStyle={{ color: "#FFF", fontSize: 14 }}
                  onClick={() => this.addGiftCard()}
                />
              </div>
            </div>
          )}
          {!this.state.isEnable && (
            <div className={styles.buttonHolder}>
              <div className={styles.button}>
                <Button
                  type="tertiary"
                  height={36}
                  label="Add Gift Card"
                  width={211}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}
GiftCardPopup.propTypes = {
  voucherNumber: PropTypes.string,
  voucherPin: PropTypes.string,
  addGiftCard: PropTypes.func,
  heading: PropTypes.string,
  isGiftCardHeader: PropTypes.bool,
  isAfterEnter: PropTypes.bool,
  isBefaureEnter: PropTypes.bool
};
GiftCardPopup.defaultProps = {
  heading: "Gift Card Details",
  isGiftCardHeader: true
};
