import React, { Component } from "react";
import BankCoupons from "./BankCoupons.js";
import SlideModal from "../../general/components/SlideModal";
import styles from "./BankOffersDetails.css";
import GridSelect from "../../general/components/GridSelect";
import { SUCCESS, ERROR } from "../../lib/constants";
const COUPON_HEADER = "Bank Offers";

class BankOffersDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      previousSelectedCouponCode: props.selectedBankOfferCode,
      selectedBankOfferCode: props.selectedBankOfferCode
    };
  }
  async applyUserCoupon() {
    if (this.state.selectedBankOfferCode) {
      if (
        this.state.selectedBankOfferCode !==
        this.state.previousSelectedCouponCode
      ) {
        if (this.state.previousSelectedCouponCode) {
          this.setState({
            previousSelectedCouponCode: this.state.selectedBankOfferCode
          });

          this.props.selecteBankOffer(this.state.selectedBankOfferCode);
          const applyNewBankOfferStatus = await this.props.releaseBankOffer(
            this.state.previousSelectedCouponCode,
            this.state.selectedBankOfferCode
          );

          if (applyNewBankOfferStatus.status === SUCCESS) {
            this.props.selecteBankOffer(this.state.selectedBankOfferCode);
            this.props.closeModal();
          } else {
            if (applyNewBankOfferStatus.status === ERROR) {
              this.props.displayToast(applyNewBankOfferStatus.error);
            }
            // if (
            //   applyNewBankOfferStatus.status === ERROR &&
            //   applyNewBankOfferStatus.type === RELEASE_BANK_OFFER_FAILURE
            // ) {
            //   this.setState({
            //     selectedBankOfferCode: this.state.previousSelectedCouponCode
            //   });
            // } else if (
            //   applyNewBankOfferStatus.status === ERROR &&
            //   applyNewBankOfferStatus.type === APPLY_BANK_OFFER_FAILURE
            // ) {
            //   this.props.selecteBankOffer("");
            //   this.setState({
            //     previousSelectedCouponCode: "",
            //     selectedBankOfferCode: ""
            //   });
            // }
          }
        } else {
          const applyNewCouponCode = await this.props.applyBankOffer(
            this.state.selectedBankOfferCode
          );

          if (applyNewCouponCode.status === SUCCESS) {
            if (this.props.selecteBankOffer) {
              this.props.selecteBankOffer(this.state.selectedBankOfferCode);
            }
            this.props.closeModal();
          } else {
            if (applyNewCouponCode.status === ERROR) {
              this.props.displayToast(applyNewCouponCode.error);
            }

            // this.setState({
            //   previousSelectedCouponCode: "",
            //   selectedBankOfferCode: ""
            // });
          }
        }
      } else {
        const releaseBankOfferReq = await this.props.releaseBankOffer(
          this.state.selectedBankOfferCode
        );
        if (releaseBankOfferReq.status === SUCCESS) {
          this.props.selecteBankOffer("");
          this.setState({
            previousSelectedCouponCode: "",
            selectedBankOfferCode: ""
          });
        }
      }
    }
  }

  async onSelectCouponCode(val) {
    if (val[0]) {
      this.setState({ selectedBankOfferCode: val[0] }, function() {
        this.applyUserCoupon();
      });
    } else {
      const releaseBankOfferResponse = await this.props.releaseBankOffer(
        this.state.selectedBankOfferCode
      );
      if (releaseBankOfferResponse.status === SUCCESS) {
        this.props.selecteBankOffer("");
        this.setState({
          previousSelectedCouponCode: "",
          selectedBankOfferCode: ""
        });
      }
    }
  }
  render() {
    return (
      <SlideModal {...this.props}>
        <div className={styles.dataHolder}>
          <div className={styles.fixedContent}>
            <div className={styles.couponHeader}>{COUPON_HEADER}</div>
            <GridSelect
              elementWidthMobile={100}
              offset={0}
              limit={1}
              onSelect={val => this.onSelectCouponCode(val)}
              selected={[this.state.selectedBankOfferCode]}
              elementWidthDesktop={100}
            >
              {this.props.coupons &&
                this.props.coupons.coupons.map((value, i) => {
                  return (
                    <BankCoupons
                      offerDescription={value.offerDescription}
                      offerCode={value.offerCode}
                      offerMinCartValue={value.offerMinCartValue}
                      offerMaxDiscount={value.offerMaxDiscount}
                      offerTitle={value.offerTitle}
                      key={i}
                      value={value.offerCode}
                    />
                  );
                })}
            </GridSelect>
          </div>
        </div>
      </SlideModal>
    );
  }
}

export default BankOffersDetails;
