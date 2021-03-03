import React from "react";
import PropTypes from "prop-types";
import styles from "./TermsNConditionsModal.css";
import ArrowBack from "../../general/components/img/TNCArrow.svg";
export default class TermsNCondtionsModal extends React.Component {
  getDateInFormat(date) {
    var newDate = new Date(date).toString();
    newDate = newDate.split("GMT");
    newDate = newDate[0];
    return newDate;
  }

  // componentDidMount() {
  //   const myDomNode = ReactDOM.findDOMNode(this.refs[this.props.selectedOffer]);
  //   myDomNode.scrollIntoView();
  // }
  closeModal() {
    this.props.closeModal({
      showVoucherModal: this.props.showVoucherModal,
      showDetails: this.props.showDetails,
      offers: this.props.offers,
      potentialPromotions: this.props.potentialPromotions,
      productListings: this.props.productDetails
    });
  }

  createMarkup = input => {
    return { __html: input };
  };

  render() {
    let offer = this.props.selectedOffer;
    return (
      <div className={styles.base}>
        <div className={styles.header}>
          {" "}
          <img
            src={ArrowBack}
            alt=""
            width={10}
            onClick={() => this.closeModal()}
            className={styles.backArrowTNC}
          />{" "}
          T&C
        </div>

        {this.props.selectedOffer && (
          <div className={styles.content} ref={offer.name}>
            <div
              className={styles.headingText}
              dangerouslySetInnerHTML={this.createMarkup(offer.name)}
            />
            <div className={styles.section}>
              <div className={styles.timeSection}>
                <div className={styles.subHeader}>Valid From</div>
                {offer.startDateAndTime}
              </div>
              <div className={styles.timeSection}>
                <div className={styles.subHeader}>Valid Till</div>
                {offer.endDateAndTime}
              </div>
            </div>
            <div className={styles.section}>
              <div
                className={styles.description}
                dangerouslySetInnerHTML={{
                  __html: offer.promotionDisplayText
                }}
              />
            </div>

            {offer.termsAndConditions && (
              <div className={styles.section}>
                <div
                  className={styles.description}
                  dangerouslySetInnerHTML={{
                    __html: offer.termsAndConditions
                  }}
                />
              </div>
            )}

            {/* </div> */}
          </div>
        )}
      </div>
    );
  }
}
TermsNCondtionsModal.propTypes = {
  potentialPromotions: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    endDate: PropTypes.string,
    startDate: PropTypes.string
  }),
  secondaryPromotions: PropTypes.shape({
    messageId: PropTypes.string,
    messageDetails: PropTypes.string,
    endDate: PropTypes.string,
    startDate: PropTypes.string
  }),
  closeModal: PropTypes.func,
  selectedOffer: PropTypes.object,
  showVoucherModal: PropTypes.bool,
  offers: PropTypes.bool,
  productDetails: PropTypes.bool,
  showDetails: PropTypes.object,
};
