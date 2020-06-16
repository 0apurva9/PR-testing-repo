import React from "react";
import styles from "./ExpiringCard.css";
import Button from "../../general/components/Button";
import { RUPEE_SYMBOL } from "../../lib/constants";
import PropTypes from "prop-types";

export default class ExpiringCard extends React.Component {
  render() {
    return (
      <div className={styles.container}>
        {this.props.loading ? (
          <div className={styles.skelton}>
            <div className={[styles.whiteBox_new, styles.skeltonBox].join(" ")}>
              <div className={styles.skltnLineFrme60}>
                <div className={styles.skltnLine}>
                  <div className={styles.skltnBox} />
                </div>
              </div>
              <div className={[styles.flexRow12, styles.mrBt20].join(" ")}>
                <div className={styles.flexRow12Col}>
                  <div className={styles.skltnLine}>
                    <div className={styles.skltnBox} />
                  </div>
                </div>
              </div>
              <div className={styles.flexRow12}>
                <div className={styles.flexRow12Col}>
                  <div
                    className={[styles.skltnLine, styles.sklHgt38].join(" ")}
                  >
                    <div className={styles.skltnBox} />
                  </div>
                </div>
                <div className={styles.flexRow12Col}>
                  <div
                    className={[styles.skltnLine, styles.sklHgt38].join(" ")}
                  >
                    <div className={styles.skltnBox} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.giftCardBox}>
            <div className={styles.giftCardHeading}>
              Gift Card{" "}
              <span className={styles.giftCadrNumber}>
                {" "}
                {this.props.cardNumber ? `(${this.props.cardNumber})` : null}
              </span>
            </div>
            <div className={styles.giftCardExpDate}>
              {this.props.expiryDate}
            </div>
            <div className={styles.giftCardBalanceContainer}>
              <div className={styles.giftCardBalance}>
                <div className={styles.giftCardTotal}>Total Gift Balance</div>
                <div className={styles.giftCardTotalBalance}>
                  <span className={styles.rupeeSymbol}>{RUPEE_SYMBOL}</span>
                  {this.props.originalValue ? this.props.originalValue : "0"}
                  <span className={styles.zero}>.00</span>
                </div>
              </div>
              <div className={styles.giftCardAddCardButton}>
                <div className={styles.btnCenter}>
                  <Button
                    margin="auto"
                    height={30}
                    width={117}
                    borderRadius={15}
                    label="Add Card"
                    color="#fff"
                    backgroundColor="#da1c5c"
                    textStyle={{ color: "#fff", fontSize: 12 }}
                    onClick={() => this.props.openPopUp()}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

ExpiringCard.propTypes = {
  loading: PropTypes.bool,
  cardNumber: PropTypes.string,
  originalValue: PropTypes.number,
  expiryDate: PropTypes.string,
  openPopUp: PropTypes.func
};
