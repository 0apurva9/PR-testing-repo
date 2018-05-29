import React from "react";
import styles from "./BankOfferTNCModal.css";
import SlideModal from "../../general/components/SlideModal";
import TermsAndConditionQuestion from "./TermsAndConditionQuestion";
export default class BankOfferTNCModal extends React.Component {
  componentDidMount() {
    this.props.getTNCForBankOffer();
  }
  render() {
    return (
      <SlideModal closeModal={this.props.closeModal}>
        <div className={styles.base}>
          <div className={styles.header}>Terms & Condition</div>
          <div className={styles.content}>
            {this.props.bankOfferTncDetails &&
              this.props.bankOfferTncDetails.coupons &&
              this.props.bankOfferTncDetails.coupons.map((val, i) => {
                return (
                  <div className={styles.dataHolder}>
                    <TermsAndConditionQuestion
                      offerTitle={val.offerTitle}
                      offerDescription={val.offerDescription}
                    >
                      <div
                        className={styles.answer}
                        dangerouslySetInnerHTML={{
                          __html: val.offerTermsConditions
                        }}
                      />
                    </TermsAndConditionQuestion>
                  </div>
                );
              })}
          </div>
        </div>
      </SlideModal>
    );
  }
}
