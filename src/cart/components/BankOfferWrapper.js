import React from "react";
import ReactDOM from "react-dom";
import BankOffer from "./BankOffer.js";
import GridSelect from "../../general/components/GridSelect";
import { BANK_COUPON_COOKIE } from "../../lib/constants";
import styles from "./BankOfferWrapper.css";
import DesktopOnly from "../../general/components/DesktopOnly";
import MobileOnly from "../../general/components/MobileOnly";
const SEE_ALL_BANK_OFFERS = "See All Bank Offers";
export default class BankOfferWrapper extends React.Component {
    handleSelect(val) {
        if (this.props.applyBankCoupons) {
            this.props.applyBankCoupons(val);
        }
    }

    openBankOffers() {
        if (this.props.openBankOffers) {
            this.props.openBankOffers();
        }
    }

    openBankOfferTncModal() {
        if (this.props.openBankOfferTncModal) {
            this.props.openBankOfferTncModal();
        }
    }

    componentDidMount() {
        // eslint-disable-next-line react/no-find-dom-node , react/no-string-refs
        const bankOfferRef = ReactDOM.findDOMNode(this.refs.bankOfferRef);
        setTimeout(() => {
            window.scrollTo(0, bankOfferRef.offsetTop);
        }, 0);
    }

    render() {
        let offerDescription, offerTitle, offerCode;
        let offerDescription1, offerTitle1, offerCode1;
        if (
            this.props.cart.paymentModes &&
            this.props.cart.paymentModes.paymentOffers &&
            this.props.cart.paymentModes.paymentOffers.coupons
        ) {
            const selectedCoupon = this.props.cart.paymentModes.paymentOffers.coupons.find(coupon => {
                return coupon.offerCode === localStorage.getItem(BANK_COUPON_COOKIE);
            });
            if (selectedCoupon) {
                offerDescription = selectedCoupon.offerDescription
                    ? selectedCoupon.offerDescription
                    : selectedCoupon.offerDescription1;
                offerTitle = selectedCoupon.offerTitle ? selectedCoupon.offerTitle : selectedCoupon.offerTitle;
                offerCode = selectedCoupon.offerCode ? selectedCoupon.offerCode : selectedCoupon.offerCode;
            } else if (localStorage.getItem(BANK_COUPON_COOKIE)) {
                offerCode = localStorage.getItem(BANK_COUPON_COOKIE);
                offerDescription = "";
                offerTitle = "";
            } else {
                offerDescription =
                    this.props.cart &&
                    this.props.cart.paymentModes &&
                    this.props.cart.paymentModes.paymentOffers &&
                    this.props.cart.paymentModes.paymentOffers.coupons &&
                    this.props.cart.paymentModes.paymentOffers.coupons[0] &&
                    this.props.cart.paymentModes.paymentOffers.coupons[0].offerDescription;
                offerTitle =
                    this.props.cart &&
                    this.props.cart.paymentModes &&
                    this.props.cart.paymentModes.paymentOffers &&
                    this.props.cart.paymentModes.paymentOffers.coupons &&
                    this.props.cart.paymentModes.paymentOffers.coupons[0] &&
                    this.props.cart.paymentModes.paymentOffers.coupons[0].offerTitle;
                offerCode =
                    this.props.cart &&
                    this.props.cart.paymentModes &&
                    this.props.cart.paymentModes.paymentOffers &&
                    this.props.cart.paymentModes.paymentOffers.coupons &&
                    this.props.cart.paymentModes.paymentOffers.coupons[0] &&
                    this.props.cart.paymentModes.paymentOffers.coupons[0].offerCode;
            }
            offerDescription1 =
                this.props.cart &&
                this.props.cart.paymentModes &&
                this.props.cart.paymentModes.paymentOffers &&
                this.props.cart.paymentModes.paymentOffers.coupons &&
                this.props.cart.paymentModes.paymentOffers.coupons[1] &&
                this.props.cart.paymentModes.paymentOffers.coupons[1].offerDescription;
            offerTitle1 =
                this.props.cart &&
                this.props.cart.paymentModes &&
                this.props.cart.paymentModes.paymentOffers &&
                this.props.cart.paymentModes.paymentOffers.coupons &&
                this.props.cart.paymentModes.paymentOffers.coupons[1] &&
                this.props.cart.paymentModes.paymentOffers.coupons[1].offerTitle;
            offerCode1 =
                this.props.cart &&
                this.props.cart.paymentModes &&
                this.props.cart.paymentModes.paymentOffers &&
                this.props.cart.paymentModes.paymentOffers.coupons &&
                this.props.cart.paymentModes.paymentOffers.coupons[1] &&
                this.props.cart.paymentModes.paymentOffers.coupons[1].offerCode;
        }
        return (
            // eslint-disable-next-line react/no-string-refs
            <div className={styles.base} ref="bankOfferRef">
                <MobileOnly>
                    <GridSelect
                        elementWidthMobile={100}
                        elementWidthDesktop={100}
                        offset={0}
                        limit={1}
                        onSelect={val => this.handleSelect(val)}
                        selected={[localStorage.getItem(BANK_COUPON_COOKIE)]}
                    >
                        <BankOffer
                            bankName={offerTitle}
                            offerText={offerDescription}
                            label={SEE_ALL_BANK_OFFERS}
                            applyBankOffers={() => this.openBankOffers()}
                            openBankOfferTncModal={() => this.openBankOfferTncModal()}
                            value={offerCode}
                        />
                    </GridSelect>
                </MobileOnly>
                <DesktopOnly>
                    <React.Fragment>
                        <GridSelect
                            elementWidthMobile={100}
                            elementWidthDesktop={100}
                            offset={0}
                            limit={1}
                            onSelect={val => this.handleSelect(val)}
                            selected={[localStorage.getItem(BANK_COUPON_COOKIE)]}
                        >
                            <BankOffer
                                bankName={
                                    offerCode === offerCode1
                                        ? this.props.cart.paymentModes.paymentOffers.coupons[0].offerTitle
                                        : offerTitle
                                }
                                offerText={
                                    offerCode === offerCode1
                                        ? this.props.cart.paymentModes.paymentOffers.coupons[0].offerDescription
                                        : offerDescription
                                }
                                label={SEE_ALL_BANK_OFFERS}
                                applyBankOffers={() => this.openBankOffers()}
                                openBankOfferTncModal={() => this.openBankOfferTncModal()}
                                value={
                                    offerCode === offerCode1
                                        ? this.props.cart.paymentModes.paymentOffers.coupons[0].offerCode
                                        : offerCode
                                }
                                border={offerTitle1 || offerDescription1 ? true : false}
                                padding={offerTitle1 || offerDescription1 ? true : false}
                                margin={false}
                            />
                        </GridSelect>
                        {(offerTitle1 || offerDescription1 || offerCode1) && (
                            <GridSelect
                                elementWidthMobile={100}
                                elementWidthDesktop={100}
                                offset={0}
                                limit={1}
                                onSelect={val => this.handleSelect(val)}
                                selected={[localStorage.getItem(BANK_COUPON_COOKIE)]}
                            >
                                <BankOffer
                                    bankName={offerTitle1}
                                    offerText={offerDescription1}
                                    applyBankOffers={() => this.openBankOffers()}
                                    openBankOfferTncModal={() => this.openBankOfferTncModal()}
                                    value={offerCode1}
                                    showTermAndCondition={false}
                                    border={false}
                                    padding={false}
                                    margin={false}
                                    paddingTop={false}
                                />
                            </GridSelect>
                        )}
                    </React.Fragment>
                </DesktopOnly>
            </div>
        );
    }
}
