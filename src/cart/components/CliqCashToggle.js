import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import Toggle from "../../general/components/Toggle";
import MediaQuery from "react-responsive";
import styles from "./CliqCashToggle.css";
import UnderLinedButton from "../../general/components/UnderLinedButton";
import { RUPEE_SYMBOL } from "../../lib/constants.js";
import DesktopOnly from "../../general/components/DesktopOnly";
import Button from "../../general/components/Button";
export default class CliqCashToggle extends React.Component {
  onToggle(val) {
    if (this.props.onToggle) {
      this.props.onToggle(val);
    }
  }
  onClick() {
    if (this.props.addGiftCard) {
      this.props.addGiftCard();
    }
  }
  componentDidMount() {
    const clikCashRefNode = ReactDOM.findDOMNode(this.refs.clikCashRef);
    setTimeout(() => {
      window.scrollTo(0, clikCashRefNode.offsetTop - 100);
    }, 0);
  }
  render() {
    let toggleDisable = this.props.value === 0 ? true : false;

    return (
      <div className={styles.base} ref="clikCashRef">
        <div className={styles.cashBalanceTextHolder}>
          <div className={styles.casBalanceText}>{this.props.cashText}</div>
          <div className={styles.cashRupyText}>{`${RUPEE_SYMBOL}${
            this.props.price
          } available`}</div>
        </div>
        <div className={styles.toggleButtonHolder}>
          <div className={styles.toggleButton}>
            <Toggle
              active={this.props.isCliqCashApplied}
              onToggle={val => this.onToggle(val)}
              disabled={toggleDisable}
            />
          </div>
        </div>
        <MediaQuery query="(max-device-width: 1024px)">
          {!this.props.isFromGiftCard && (
            <div className={styles.actionButtonHolder}>
              <div className={styles.actionButton}>
                <UnderLinedButton
                  color="#000"
                  size="14px"
                  label="Add a Gift Card"
                  onClick={() => this.onClick()}
                />
              </div>
            </div>
          )}
        </MediaQuery>
        <DesktopOnly>
          {!this.props.isRemainingBalance && (
            <div className={styles.buttonHolder}>
              <Button
                type="primary"
                backgroundColor="#ff1744"
                height={40}
                label="Pay now"
                width={150}
                textStyle={{
                  color: "#FFF",
                  fontSize: 14
                }}
                onClick={this.handleClick}
              />
            </div>
          )}
        </DesktopOnly>
      </div>
    );
  }
}
CliqCashToggle.propTypes = {
  onToggle: PropTypes.func,
  cashText: PropTypes.string,
  price: PropTypes.string,
  active: PropTypes.bool
};
CliqCashToggle.defaultProps = {
  active: false
};
