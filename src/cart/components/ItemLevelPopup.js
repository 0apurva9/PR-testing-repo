import React from "react";
import styles from "./ItemLevelPopup.css";
import LevelBreakupCard from "./LevelBreakupCard.js";
import PropTypes from "prop-types";
import SlideModal from "../../general/components/SlideModal";
const isStickyHeader = !(
  navigator.userAgent && navigator.userAgent.match(/SamsungBrowser/i)
);
export default class ItemLevelPopup extends React.Component {
  render() {
    let emiItemDetails = this.props.emiItemDetails;
    let noCostEMIProduct = 0,
      nonNoCostEMIProduct = 0;
    const noCostEMIApplicableProduct =
      emiItemDetails.itemBreakUpDetailList &&
      emiItemDetails.itemBreakUpDetailList.filter(product => {
        return (
          product &&
          product.lineValue &&
          product.lineValue.value > 1 &&
          product.isNoCostEMIEligible
        );
      });
    const nonNoCostEMIApplicableProduct =
      emiItemDetails.itemBreakUpDetailList &&
      emiItemDetails.itemBreakUpDetailList.filter(product => {
        return (
          product &&
          product.lineValue &&
          product.lineValue.value > 1 &&
          !product.isNoCostEMIEligible
        );
      });
    if (noCostEMIApplicableProduct) {
      noCostEMIProduct = noCostEMIApplicableProduct.length;
    }
    if (nonNoCostEMIApplicableProduct) {
      nonNoCostEMIProduct = nonNoCostEMIApplicableProduct.length;
    }

    return (
      <SlideModal closeModal={this.props.closeModal} isCancelWhite={true}>
        <div className={styles.base}>
          <div className={isStickyHeader ? styles.stickyHeader : styles.header}>
            Item Level Breakup
          </div>
          <div className={styles.cardOfferDisplay}>
            <div className={styles.cardName}>{`${emiItemDetails.bankName} for ${
              emiItemDetails.tenure
            } months`}</div>

            {noCostEMIProduct > 0 &&
              nonNoCostEMIProduct > 0 && (
                <div>
                  <div
                    className={styles.offerText}
                  >{` No Cost EMI available only on ${noCostEMIProduct} product(s). Standard EMI will apply to products, if any, bought along with it.`}</div>
                  <div className={styles.offerText}>
                    Note: To avoid paying interest charges on Standard EMI items
                    in your bag, please bill items eligible for Standard EMI
                    separately.
                  </div>
                </div>
              )}
          </div>
          <div className={styles.levelBreakupHolder}>
            {emiItemDetails &&
              emiItemDetails.itemBreakUpDetailList &&
              emiItemDetails.itemBreakUpDetailList.map((val, i) => {
                return (
                  <LevelBreakupCard
                    key={i}
                    productName={val.productTitle}
                    emiApplication={val.isNoCostEMIEligible}
                    quantity={val.quantity}
                    itemValue={val.lineValue.value}
                    Interest={val.lineBankInterst.value}
                    discount={val.noCostEMILineDiscount.value}
                    totalAmount={val.lineTotalValue.value}
                    emiAmount={val.perMonthEMILineValue.value}
                  />
                );
              })}
          </div>
          <div className={styles.emiInformationHolder}>
            <div className={styles.emiInfoHeader}>Your EMI Information</div>
            <div className={styles.emiPlanTextHolder} />
            <div>
              {`\n\u2022  ${this.props.emiItemDetails &&
                this.props.emiItemDetails.noCostEMIDiscountValue &&
                this.props.emiItemDetails.noCostEMIDiscountValue
                  .formattedValue} has been given as No Cost EMI  discount (Interest applicable on ${noCostEMIProduct} product in your cart)`}
            </div>
            <div>{`\n\u2022  ${this.props.emiItemDetails &&
              this.props.emiItemDetails.cardBlockingAmount &&
              this.props.emiItemDetails.cardBlockingAmount
                .formattedValue} will be blocked on your card now. It will be converted into EMI in 3-4 working days`}</div>
            <div>
              {` \n\u2022  You will pay ${this.props.emiItemDetails &&
                this.props.emiItemDetails.noCostEMIPerMonthPayable &&
                this.props.emiItemDetails.noCostEMIPerMonthPayable
                  .formattedValue}  per month for ${
                emiItemDetails.tenure
              } months. Total amount paid to bank will be equal ro the value of products on offer.`}
            </div>
            {this.props.emiItemDetails &&
              this.props.emiItemDetails.emiInfo && (
                <div>
                  {`\n\u2022  ${this.props.emiItemDetails &&
                    this.props.emiItemDetails.emiInfo}`}
                </div>
              )}
          </div>
        </div>
      </SlideModal>
    );
  }
}
ItemLevelPopup.propTypes = {
  cardName: PropTypes.string,
  timeLimit: PropTypes.string,
  cardData: PropTypes.arrayOf(
    PropTypes.shape({
      productName: PropTypes.string,
      emiApplication: PropTypes.string,
      quantity: PropTypes.number,
      itemValue: PropTypes.string,
      Interest: PropTypes.string,
      discount: PropTypes.string,
      totalAmount: PropTypes.string,
      emiAmount: PropTypes.string
    })
  )
};
