import React from "react";
import { RUPEE_SYMBOL, DEFAULT_PIN_CODE_LOCAL_STORAGE, AC_CART_EXCHANGE_DETAILS } from "../../lib/constants.js";
import PropTypes from "prop-types";
import Button from "../../general/components/Button.js";
import styles from "./DesktopCheckout.css";
import shippingTruck from "../components/img/shipping-truck.svg";
import { SUCCESS, FAILURE_LOWERCASE } from "../../lib/constants";
export default class DesktopCheckout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isToggelAdditionDiscount: false,
        };
    }

    handleClick() {
        if (window && window.digitalData) {
            Object.assign(window.digitalData, {
                ...window.digitalData.page,
                page: {
                    pageInfo: {
                        pageName: "Cart Page",
                        pageType: "Cart",
                        numberOfGstProduct: this.props.gstProductCount,
                    },
                },
            });
        }
        if (this.props.onCheckout) {
            this.props.onCheckout();
        }
        this.validateLocalStorageProducts();
    }

    handleFocusOnPinCode() {
        this.props.changePinCode();
    }

    addDecimalNumberInPrice = price => {
        return price === parseInt(price, 10) ? `${price}.00` : price;
    };

    additionDiscountToggleView = () => {
        this.setState({
            isToggelAdditionDiscount: !this.state.isToggelAdditionDiscount,
        });
    };

    renderCheckout = () => {
        let disableButton = false;

        let cartExchangeDetails = localStorage.getItem(AC_CART_EXCHANGE_DETAILS);
        let parsedExchangeDetails = cartExchangeDetails && JSON.parse(cartExchangeDetails);
        let isPickupAvailableForApplianceDetails = [];
        if (
            parsedExchangeDetails &&
            parsedExchangeDetails.length > 0 &&
            this.props.appliancesExchangePincodeData &&
            this.props.appliancesExchangePincodeData.status
        ) {
            if (this.props.appliancesExchangePincodeData.status.toLowerCase() === SUCCESS) {
                this.props.appliancesExchangePincodeData.listOfDataList &&
                    this.props.appliancesExchangePincodeData.listOfDataList.map(vendordata => {
                        if (
                            vendordata.value &&
                            Object.keys(vendordata.value).length !== 0 &&
                            vendordata.value.vendorDetails &&
                            vendordata.value.vendorDetails[0]
                        ) {
                            isPickupAvailableForApplianceDetails.push(
                                vendordata.value.vendorDetails[0].isPickupAvailableForAppliance
                            );
                        } else {
                            isPickupAvailableForApplianceDetails.push(false);
                        }
                    });
            }
            if (this.props.appliancesExchangePincodeData.status.toLowerCase() === FAILURE_LOWERCASE) {
                isPickupAvailableForApplianceDetails.push(false);
            }
        }

        if (
            (this.props.productExchangeServiceable &&
                this.props.productExchangeServiceable.length > 0 &&
                this.props.productExchangeServiceable.includes(false)) ||
            (this.props.isQuoteExpired &&
                this.props.isQuoteExpired.length > 0 &&
                this.props.isQuoteExpired.includes(true)) ||
            this.props.disabled ||
            (isPickupAvailableForApplianceDetails &&
                isPickupAvailableForApplianceDetails.length > 0 &&
                isPickupAvailableForApplianceDetails.includes(false))
        ) {
            disableButton = true;
        }
        const { cartAmount } = this.props;
        let bagSubTotal;
        if (cartAmount && cartAmount.bagTotal) {
            bagSubTotal = cartAmount.bagTotal.value + (cartAmount.shippingCharge ? cartAmount.shippingCharge.value : 0);
            bagSubTotal = this.addDecimalNumberInPrice(bagSubTotal);
        }
        const defaultPinCode =
            localStorage.getItem(DEFAULT_PIN_CODE_LOCAL_STORAGE) &&
            localStorage.getItem(DEFAULT_PIN_CODE_LOCAL_STORAGE) !== "undefined"
                ? localStorage.getItem(DEFAULT_PIN_CODE_LOCAL_STORAGE)
                : null;
        if (cartAmount) {
            return (
                <div className={styles.base}>
                    {this.props.shippingPromoMessage &&
                        this.props.shippingPromoMessage !== "" &&
                        this.props.showShippingMsg && (
                            <div className={styles.shippingChargeMessage}>
                                <div className={styles.innerShippingMsgDiv}>
                                    <div className={styles.shippingChargeMsgIcon}>
                                        <img src={shippingTruck} alt="shippingTruck" />
                                    </div>
                                    <div
                                        className={styles.shippingChargeMsgText}
                                        dangerouslySetInnerHTML={{
                                            __html: this.props.shippingPromoMessage,
                                        }}
                                    />
                                </div>
                            </div>
                        )}
                    <div className={styles.section}>
                        {cartAmount.bagTotal && (
                            <div className={styles.row}>
                                <div className={styles.label}>Bag Total</div>
                                <div className={styles.info}>{cartAmount.bagTotal.formattedValue}</div>
                            </div>
                        )}
                        {cartAmount.shippingCharge && cartAmount.shippingCharge.value !== 0 ? (
                            <div className={styles.row}>
                                <div className={styles.label}>Shipping Charge</div>
                                <div className={styles.info}>{cartAmount.shippingCharge.formattedValue}</div>
                            </div>
                        ) : (
                            <div className={styles.row}>
                                <div className={styles.label}>Shipping Charge</div>
                                {this.props.isShippingObjAvailable ? (
                                    <div className={styles.freeInfo}>FREE</div>
                                ) : (
                                    <div className={styles.info}>{RUPEE_SYMBOL}0.00</div>
                                )}
                            </div>
                        )}
                        {bagSubTotal && (
                            <div className={styles.row}>
                                <div className={styles.label}>Bag Subtotal</div>
                                <div className={styles.info}>
                                    {RUPEE_SYMBOL}
                                    {bagSubTotal}
                                </div>
                            </div>
                        )}
                        {cartAmount.totalDiscountAmount && cartAmount.totalDiscountAmount.value !== 0 && (
                            <div className={styles.row}>
                                <div className={styles.label}>Product Discount(s)</div>
                                <div className={styles.info}>-{cartAmount.totalDiscountAmount.formattedValue}</div>
                            </div>
                        )}
                        {cartAmount.bagDiscount && cartAmount.bagDiscount.value !== 0 && (
                            <div className={styles.row}>
                                <div className={styles.label}>Bag Discount</div>
                                <div className={styles.info}>-{cartAmount.bagDiscount.formattedValue}</div>
                            </div>
                        )}
                        {cartAmount.couponDiscountAmount && cartAmount.couponDiscountAmount.value !== 0 && (
                            <div className={styles.row}>
                                <div className={styles.label}>Coupon Discount</div>
                                <div className={styles.info}>-{cartAmount.couponDiscountAmount.formattedValue}</div>
                            </div>
                        )}
                        {(cartAmount.cartDiscount || cartAmount.noCostEMIDiscountValue) &&
                            this.props.isCliqCashApplied && (
                                <div className={styles.row}>
                                    <div className={styles.label}>CLiQ Cash Applied</div>
                                    <div className={styles.info}>
                                        -{RUPEE_SYMBOL}
                                        {this.addDecimalNumberInPrice(this.props.cliqCashPaidAmount)}
                                    </div>
                                </div>
                            )}

                        {cartAmount.cartDiscount || cartAmount.noCostEMIDiscountValue ? (
                            this.props.loyaltyPointsApplied ? (
                                <div className={styles.row}>
                                    <div className={styles.label}>Loyalty Applied</div>
                                    <div className={styles.info}>
                                        -{RUPEE_SYMBOL}
                                        {this.addDecimalNumberInPrice(this.props.loyaltyPaidAmount)}
                                    </div>
                                </div>
                            ) : null
                        ) : null}
                        {cartAmount.cartDiscount && cartAmount.cartDiscount.value !== 0 && (
                            <div className={styles.row}>
                                <div className={styles.label}>Bank Offer Discount</div>
                                <div className={styles.info}>-{cartAmount.cartDiscount.formattedValue}</div>
                            </div>
                        )}
                        {cartAmount.noCostEMIDiscountValue &&
                            !this.props.noCostEmiEligibility &&
                            cartAmount.noCostEMIDiscountValue.value !== 0 && (
                                <div className={styles.row}>
                                    <div className={styles.label}>No Cost EMI Discount</div>
                                    <div className={styles.info}>
                                        -{cartAmount.noCostEMIDiscountValue.formattedValue}
                                    </div>
                                </div>
                            )}
                        {/* payment retry page - NCE issue - TQTM-1319 */}
                        {!this.props.noCostEMIDiscountValue &&
                            this.props.noCostEmiEligibility &&
                            this.props.noCostEmiEligibility.noCostEMIDiscountValue &&
                            this.props.noCostEmiEligibility.noCostEMIDiscountValue.value &&
                            this.props.noCostEmiEligibility.noCostEMIDiscountValue.value !== 0 && (
                                <div className={styles.row}>
                                    <div className={styles.label}>No Cost EMI Discount</div>
                                    <div className={styles.info}>
                                        -{this.props.noCostEmiEligibility.noCostEMIDiscountValue.formattedValue}
                                    </div>
                                </div>
                            )}
                        {cartAmount.additionalDiscount && (
                            <div className={styles.additionalDiscount}>
                                <div className={styles.row} onClick={() => this.additionDiscountToggleView()}>
                                    <div className={styles.labelForAdditionalDiscount}>
                                        <span>Additional Discount(s)</span>
                                        {!this.state.isToggelAdditionDiscount && <span className={styles.toggleIcon} />}
                                        {this.state.isToggelAdditionDiscount && (
                                            <span className={styles.onToggleActive} />
                                        )}
                                    </div>
                                    <div className={styles.infoForAdditionalDiscount}>
                                        -
                                        {cartAmount.additionalDiscount.totalAdditionalDiscount &&
                                            cartAmount.additionalDiscount.totalAdditionalDiscount.formattedValue}
                                    </div>
                                </div>
                                {this.state.isToggelAdditionDiscount && (
                                    <div className={styles.informationAdditionalDiscountHolder}>
                                        <div className={styles.informationQuestionHolder}>Shipping Charge Discount</div>
                                        <div className={styles.informationAnswerHolder}>
                                            -
                                            {cartAmount.additionalDiscount.shippingDiscount &&
                                                cartAmount.additionalDiscount.shippingDiscount.formattedValue}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                        {!(cartAmount.cartDiscount || cartAmount.noCostEMIDiscountValue)
                            ? this.props.isCliqCashApplied && (
                                  <div className={styles.row}>
                                      <div className={styles.label}>CLiQ Cash Applied</div>
                                      <div className={styles.info}>
                                          -{RUPEE_SYMBOL}
                                          {this.addDecimalNumberInPrice(this.props.cliqCashPaidAmount)}
                                      </div>
                                  </div>
                              )
                            : null}

                        {!(cartAmount.cartDiscount || cartAmount.noCostEMIDiscountValue) ? (
                            this.props.loyaltyPointsApplied ? (
                                <div className={styles.row}>
                                    <div className={styles.label}>Loyalty Applied</div>
                                    <div className={styles.info}>
                                        -{RUPEE_SYMBOL}
                                        {this.addDecimalNumberInPrice(this.props.loyaltyPaidAmount)}
                                    </div>
                                </div>
                            ) : null
                        ) : null}
                        {cartAmount.comboDiscountAmount && cartAmount.comboDiscountAmount.value !== 0 && (
                            <div className={styles.row}>
                                <div className={styles.label}>Combo Discount</div>
                                <div className={styles.info}>- {cartAmount.comboDiscountAmount.formattedValue}</div>
                            </div>
                        )}
                        {!(
                            !cartAmount.totalDiscountAmount &&
                            !cartAmount.bagDiscount &&
                            !cartAmount.couponDiscountAmount &&
                            !cartAmount.cartDiscount &&
                            !cartAmount.noCostEMIDiscountValue &&
                            !cartAmount.additionalDiscount
                        ) && (
                            <div className={styles.informationTotalSavingHolder}>
                                <div className={styles.informationTotalSavingTextHolder}>
                                    {cartAmount.totalDiscountAmount.value !== 0 && (
                                        <React.Fragment>
                                            You will save {RUPEE_SYMBOL}
                                            {this.addDecimalNumberInPrice(
                                                Math.floor(
                                                    ((cartAmount.totalDiscountAmount
                                                        ? cartAmount.totalDiscountAmount.value
                                                        : 0) +
                                                        (cartAmount.bagDiscount ? cartAmount.bagDiscount.value : 0) +
                                                        (cartAmount.couponDiscountAmount
                                                            ? cartAmount.couponDiscountAmount.value
                                                            : 0) +
                                                        (cartAmount.cartDiscount ? cartAmount.cartDiscount.value : 0) +
                                                        (cartAmount.noCostEMIDiscountValue
                                                            ? cartAmount.noCostEMIDiscountValue.value
                                                            : 0) +
                                                        (cartAmount.additionalDiscount &&
                                                        cartAmount.additionalDiscount.totalAdditionalDiscount
                                                            ? cartAmount.additionalDiscount.totalAdditionalDiscount
                                                                  .value
                                                            : 0) +
                                                        (cartAmount.comboDiscountAmount &&
                                                        cartAmount.comboDiscountAmount
                                                            ? cartAmount.comboDiscountAmount.value
                                                            : 0)) *
                                                        100
                                                ) / 100
                                            )}
                                        </React.Fragment>
                                    )}{" "}
                                    {/* cart page */}
                                    {this.props.isOnCartPage &&
                                        this.props.totalExchangeAmount &&
                                        this.props.productExchangeServiceable.length > 0 &&
                                        !this.props.productExchangeServiceable.includes(false) &&
                                        this.props.isQuoteExpired.length > 0 &&
                                        !this.props.isQuoteExpired.includes(true) && (
                                            <span>
                                                {" "}
                                                {cartAmount.totalDiscountAmount.value === 0 ? (
                                                    <React.Fragment>Get </React.Fragment>
                                                ) : (
                                                    <React.Fragment>and get </React.Fragment>
                                                )}
                                                {this.props.totalExchangeAmount.formattedValue} Exchange Cashback{" "}
                                                {cartAmount.totalDiscountAmount.value === 0 && (
                                                    <React.Fragment>on this order</React.Fragment>
                                                )}
                                            </span>
                                        )}
                                    {/* checkout page */}
                                    {!this.props.isOnCartPage &&
                                        this.props.totalExchangeAmount &&
                                        this.props.isExchangeServiceableArray.length > 0 &&
                                        !this.props.isExchangeServiceableArray.includes(false) &&
                                        this.props.isQuoteExpiredCheckout.length > 0 &&
                                        !this.props.isQuoteExpiredCheckout.includes(true) && (
                                            <span>
                                                {" "}
                                                {cartAmount.totalDiscountAmount.value === 0 ? (
                                                    <React.Fragment>Get </React.Fragment>
                                                ) : (
                                                    <React.Fragment>and get </React.Fragment>
                                                )}
                                                {this.props.totalExchangeAmount.formattedValue} Exchange Cashback{" "}
                                                {cartAmount.totalDiscountAmount.value === 0 && (
                                                    <React.Fragment>on this order</React.Fragment>
                                                )}
                                            </span>
                                        )}
                                    {cartAmount.totalDiscountAmount.value !== 0 && (
                                        <React.Fragment>on this order</React.Fragment>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                    <div className={this.props.onContinue ? styles.bottomSection : styles.bottomSectionCheckout}>
                        <div className={styles.priceHeader}>{this.props.onContinue ? "Total" : "Total Payable"}</div>
                        {!this.props.isFromRetryUrl &&
                            this.props.payable &&
                            this.props.payable.paybleAmount &&
                            this.props.payable.paybleAmount.formattedValue && (
                                <div className={this.props.onContinue ? styles.price : styles.checkoutPrice}>
                                    {this.props.payable.paybleAmount.formattedValue}
                                </div>
                            )}
                        {this.props.payableForCartPage && (
                            <div className={this.props.onContinue ? styles.price : styles.checkoutPrice}>
                                {`₹ ${this.props.payableForCartPage}`}
                            </div>
                        )}
                        {this.props.isFromRetryUrl && (
                            <div className={this.props.onContinue ? styles.price : styles.checkoutPrice}>
                                {this.props.payable &&
                                this.props.payable.paybleAmount &&
                                this.props.payable.paybleAmount.formattedValue
                                    ? this.props.payable.paybleAmount.formattedValue
                                    : `₹ ${this.props.amount}`}
                            </div>
                        )}
                        {this.props.onContinue && (
                            <React.Fragment>
                                {!this.props.isOnCartPage && (
                                    <div
                                        className={[styles.button, this.props.disabled ? "" : styles.shadowBtn].join(
                                            " "
                                        )}
                                    >
                                        <Button
                                            disabled={this.props.disabled}
                                            disabledBgGrey={true}
                                            type="primary"
                                            backgroundColor="#ff1744"
                                            height={40}
                                            label={this.props.label}
                                            width={150}
                                            textStyle={{
                                                color: "#FFF",
                                                fontSize: 14,
                                            }}
                                            onClick={() => this.handleClick()}
                                        />
                                    </div>
                                )}

                                {this.props.isOnCartPage && defaultPinCode && (
                                    <div className={[styles.button, disableButton ? "" : styles.shadowBtn].join(" ")}>
                                        <Button
                                            disabled={disableButton}
                                            disabledBgGrey={true}
                                            type="primary"
                                            backgroundColor="#ff1744"
                                            height={40}
                                            label={this.props.label}
                                            width={150}
                                            textStyle={{
                                                color: "#FFF",
                                                fontSize: 14,
                                            }}
                                            onClick={() => this.handleClick()}
                                        />
                                    </div>
                                )}
                                {this.props.isOnCartPage && !defaultPinCode && (
                                    <div className={[styles.button, disableButton ? "" : styles.shadowBtn].join(" ")}>
                                        <Button
                                            disabled={disableButton}
                                            disabledBgGrey={true}
                                            type="primary"
                                            backgroundColor="#ff1744"
                                            height={40}
                                            label={this.props.label}
                                            width={150}
                                            textStyle={{
                                                color: "#FFF",
                                                fontSize: 14,
                                            }}
                                            onClick={() => this.handleFocusOnPinCode()}
                                        />
                                    </div>
                                )}
                            </React.Fragment>
                        )}
                    </div>
                </div>
            );
        } else {
            if (this.props.isGiftCard) {
                return (
                    <div className={styles.base}>
                        <div className={styles.section}>
                            <div className={styles.priceHeader}>{"Final Amount"}</div>
                            <div className={styles.checkoutPrice}>{`${RUPEE_SYMBOL} ${this.props.amount}`}</div>
                        </div>
                    </div>
                );
            } else {
                return null;
            }
        }
    };

    // check if local storage products are same as current products in cart or not
    // remove the products from local storage which are not in cart
    validateLocalStorageProducts() {
        let cartProducts = this.props.cartProducts;
        let cartProductsUssids =
            cartProducts &&
            cartProducts.map(product => {
                return product.USSID;
            });
        let cartExchangeDetails = localStorage.getItem(AC_CART_EXCHANGE_DETAILS);
        let parsedExchangeDetails = cartExchangeDetails && JSON.parse(cartExchangeDetails);
        if (parsedExchangeDetails && parsedExchangeDetails.length > 0) {
            let productToBeRemovedIndex = [];
            parsedExchangeDetails.map((product, index) => {
                if (cartProductsUssids && !cartProductsUssids.includes(product.ussid)) {
                    productToBeRemovedIndex.push(index);
                }
            });
            if (productToBeRemovedIndex) {
                for (var i = productToBeRemovedIndex.length - 1; i >= 0; i--) {
                    parsedExchangeDetails.splice(productToBeRemovedIndex[i], 1);
                }
            }
            localStorage.setItem(AC_CART_EXCHANGE_DETAILS, JSON.stringify(parsedExchangeDetails));
        }
    }

    render() {
        return <div>{this.renderCheckout()}</div>;
    }
}

DesktopCheckout.propTypes = {
    gstProductCount: PropTypes.number,
    onContinue: PropTypes.bool,
    isShippingObjAvailable: PropTypes.bool,
    onCheckout: PropTypes.func,
    changePinCode: PropTypes.func,
    appliancesExchangePincodeData: PropTypes.object,
    productExchangeServiceable: PropTypes.string,
    isQuoteExpired: PropTypes.string,
    disabled: PropTypes.bool,
    cartAmount: PropTypes.object,
    shippingPromoMessage: PropTypes.string,
    noCostEMIDiscountValue: PropTypes.object,
    noCostEmiEligibility: PropTypes.object,
    isOnCartPage: PropTypes.bool,
    totalExchangeAmount: PropTypes.string,
    payable: PropTypes.object,
    isFromRetryUrl: PropTypes.bool,
    amount: PropTypes.string,
    cartProducts: PropTypes.object,
    showShippingMsg: PropTypes.bool,
    isCliqCashApplied: PropTypes.bool,
    cliqCashPaidAmount: PropTypes.string,
    isExchangeServiceableArray: PropTypes.array,
    isQuoteExpiredCheckout: PropTypes.array,
    label: PropTypes.string,
    isGiftCard: PropTypes.bool,
    payableForCartPage: PropTypes.string,
    loyaltyPaidAmount: PropTypes.number,
    loyaltyPointsApplied: PropTypes.bool,
};

DesktopCheckout.defaultProps = {
    onContinue: true,
    isShippingObjAvailable: false,
};
