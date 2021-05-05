import React, { Component } from "react";
import CuponDetails from "./CuponDetails.js";
import SlideModal from "../../general/components/SlideModal";
import arrowIcon from "../../general/components/img/down-arrow.svg";
import Icon from "../../xelpmoc-core/Icon";
import SearchCupon from "./SearchCupon.js";
import PropTypes from "prop-types";
import GridSelect from "../../general/components/GridSelect";
import StaticDarkHeader from "../../general/components/StaticDarkHeader";
import styles from "./ProductCouponDetails.css";
import * as Cookie from "../../lib/Cookie.js";
import { COUPON_COOKIE, SUCCESS, ERROR } from "../../lib/constants.js";
import { APPLY_USER_COUPON_FAILURE, RELEASE_USER_COUPON_FAILURE } from "../../cart/actions/cart.actions";
import { LOGGED_IN_USER_DETAILS } from "../../lib/constants";
import MobileOnly from "../../general/components/MobileOnly";
import DesktopOnly from "../../general/components/DesktopOnly";
import ibutton from "../components/img/info.svg";
// import applied from "../components/img/applied.svg";
import OtherCuponDetails from "./OtherCuponDetails.js";
import AccordionWithTooltip from "../../general/components/AccordionWithTooltip.js";
const REMOVE = "Remove";
const APPLY = "Apply";
const OTHER_OFFERS = "other";
const BANK_OFFERS = "bank";
const USER_COUPON_NOTE = "Note: Additional Bank offers, if applicable, can be applied during payment";
const USER_COUPON_NOTE_DESKTOP = "Availablity of the coupon in the list depends on the items added on the cart. ";
const USER_COUPON_OTHER_NOTE_DESKTOP = "Availablity of the coupon in the list depends on the items added on the cart.";
const isStickyHeader = !(navigator.userAgent && navigator.userAgent.match(/SamsungBrowser/i));
class ProductCouponDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            previousSelectedCouponCode: Cookie.getCookie(COUPON_COOKIE) ? Cookie.getCookie(COUPON_COOKIE) : "",
            selectedCouponCode: Cookie.getCookie(COUPON_COOKIE) ? Cookie.getCookie(COUPON_COOKIE) : "",
            isOpen: true,
            coupon: true,
        };
    }

    onChangeCouponType(couponType) {
        if (couponType === OTHER_OFFERS && !this.state.coupon) {
            return;
        } else if (couponType === BANK_OFFERS && this.state.coupon) {
            return;
        } else {
            this.setState({ coupon: !this.state.coupon });
        }
    }

    async applyUserCoupon() {
        if (this.state.selectedCouponCode) {
            if (this.state.selectedCouponCode !== this.state.previousSelectedCouponCode) {
                if (this.state.previousSelectedCouponCode) {
                    const applyNewBankOfferStatus = await this.props.releaseUserCoupon(
                        this.state.previousSelectedCouponCode,
                        this.state.selectedCouponCode
                    );
                    if (applyNewBankOfferStatus.status === SUCCESS) {
                        localStorage.setItem(COUPON_COOKIE, this.state.selectedCouponCode);
                        this.props.closeModal();
                    } else {
                        if (
                            applyNewBankOfferStatus.status === ERROR &&
                            applyNewBankOfferStatus.type === RELEASE_USER_COUPON_FAILURE
                        ) {
                            this.setState({
                                selectedCouponCode: this.state.previousSelectedCouponCode,
                            });
                        } else if (
                            applyNewBankOfferStatus.status === ERROR &&
                            applyNewBankOfferStatus.type === APPLY_USER_COUPON_FAILURE
                        ) {
                            localStorage.removeItem(COUPON_COOKIE);
                            this.setState({
                                previousSelectedCouponCode: "",
                                selectedCouponCode: "",
                            });
                        }
                    }
                } else {
                    const applyNewCouponCode = await this.props.applyUserCoupon(this.state.selectedCouponCode);

                    if (applyNewCouponCode.status === SUCCESS) {
                        localStorage.setItem(COUPON_COOKIE, this.state.selectedCouponCode);
                        this.props.closeModal();
                    } else {
                        this.setState({
                            previousSelectedCouponCode: "",
                            selectedCouponCode: "",
                        });
                    }
                }
            } else {
                const releaseBankOfferReq = await this.props.releaseUserCoupon(this.state.selectedCouponCode);
                if (releaseBankOfferReq.status === SUCCESS) {
                    localStorage.removeItem(COUPON_COOKIE);
                    this.setState({
                        previousSelectedCouponCode: "",
                        selectedCouponCode: "",
                    });
                }
            }
        }
    }

    async onSelectCouponCode(val) {
        if (val[0]) {
            this.setState({ selectedCouponCode: val[0] }, function() {
                this.applyUserCoupon();
            });
        } else {
            const releaseBankOfferResponse = await this.props.releaseUserCoupon(this.state.selectedCouponCode);
            if (releaseBankOfferResponse.status === SUCCESS) {
                localStorage.removeItem(COUPON_COOKIE);
                this.setState({
                    previousSelectedCouponCode: "",
                    selectedCouponCode: "",
                });
            }
        }
    }

    navigateToLogin() {
        if (this.props.navigateToLogin) {
            this.props.navigateToLogin(this.props.history.location.pathname);
        }
    }

    render() {
        const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
        let coupons,
            otherCoupons,
            bankCoupons,
            displayCoupons = [];
        let showLogOutUserCoupon = userDetails ? true : false;
        let clsNce = this.state.coupon
            ? [styles.isSelectedTab, styles.tabNceStandard].join(" ")
            : styles.tabNceStandard;
        let clsStandard = !this.state.coupon
            ? [styles.isSelectedTab, styles.tabNceStandard].join(" ")
            : styles.tabNceStandard;
        if (
            (this.props.opencouponsList && this.props.opencouponsList.length > 0) ||
            (this.props.closedcouponsList && this.props.closedcouponsList.length > 0)
        ) {
            if (userDetails && this.props.closedcouponsList && this.props.closedcouponsList.length > 0) {
                coupons = this.props.closedcouponsList.concat(this.props.opencouponsList);
            } else {
                if (this.props.opencouponsList) {
                    coupons = this.props.opencouponsList;
                }
            }
        } else {
            coupons = this.props.activeEligibleCouponList;
            otherCoupons = this.props.activeNonEligibleCouponList;
            bankCoupons = this.props.activeEligibleBankCouponList ? this.props.activeEligibleBankCouponList : [];
        }
        displayCoupons = this.state.coupon ? bankCoupons : coupons;

        return (
            <SlideModal {...this.props}>
                <div className={styles.base}>
                    <div className={isStickyHeader ? styles.stickyHeader : styles.header}>
                        <MobileOnly>
                            <StaticDarkHeader text="All Coupons" />
                        </MobileOnly>
                        <DesktopOnly>
                            <div className={styles.heading}>Offers</div>
                        </DesktopOnly>
                    </div>
                    <div className={isStickyHeader ? styles.stickyPortion : styles.normalSection}>
                        <div className={styles.searchHolder}>
                            <SearchCupon
                                label={
                                    this.state.previousSelectedCouponCode &&
                                    this.state.previousSelectedCouponCode === this.state.selectedCouponCode
                                        ? REMOVE
                                        : APPLY
                                }
                                disableManualType={false}
                                placeholder="Enter Coupon Code"
                                couponCode={this.state.selectedCouponCode}
                                getValue={selectedCouponCode => this.setState({ selectedCouponCode })}
                                applyUserCoupon={() => this.applyUserCoupon()}
                            />
                        </div>
                        <MobileOnly>
                            <div className={styles.disclaimer}>{USER_COUPON_NOTE}</div>
                        </MobileOnly>
                    </div>
                    <hr className={styles.horizontalLine} />
                    {!showLogOutUserCoupon && (
                        <div className={styles.link} onClick={() => this.navigateToLogin()}>
                            <div className={styles.linkArrow}>
                                <Icon image={arrowIcon} size={10} />
                            </div>
                            Login to view personal coupons
                        </div>
                    )}
                    {this.props.activeEligibleCouponList && this.props.activeEligibleCouponList.length > 0 && (
                        <DesktopOnly>
                            <div className={styles.disclaimer_desktop} data-test="eligible-coupon-note">
                                {USER_COUPON_NOTE_DESKTOP}
                            </div>
                        </DesktopOnly>
                    )}

                    <div className={styles.eligibleCouponsDesign}>
                        {/* {this.props.activeEligibleCouponList && this.props.activeEligibleCouponList.length > 0 && (
                            <React.Fragment>
                                <span className={styles.eligibleCoupon} data-test="eligible-coupon-text">
                                    Eligible Coupons
                                </span>
                                <span className={styles.tooltip} data-test="eligible-tool-tip">
                                    {" "}
                                    <img src={ibutton} className={styles.arrow} />
                                    <span className={styles.tooltiptext}>
                                        Coupons shown are based on products added in your cart
                                    </span>
                                </span>
                            </React.Fragment>
                        )} */}

                        <div className={styles.tabHeader}>
                            <div onClick={() => this.onChangeCouponType(BANK_OFFERS)} className={clsNce}>
                                Bank Coupons
                            </div>
                            <div onClick={() => this.onChangeCouponType(OTHER_OFFERS)} className={clsStandard}>
                                Coupons
                            </div>
                        </div>
                        {displayCoupons && displayCoupons.length > 0 && (
                            <GridSelect
                                elementWidthMobile={100}
                                elementWidthDesktop={100}
                                offset={0}
                                offsetDesktop="0px 22px 20px 22px"
                                limit={1}
                                onSelect={val => this.onSelectCouponCode(val)}
                                selected={[this.state.selectedCouponCode]}
                            >
                                {displayCoupons &&
                                    displayCoupons.length > 0 &&
                                    displayCoupons.map((value, i) => {
                                        let couponName = value.couponName ? value.couponName : value.couponCode;
                                        return (
                                            <CuponDetails
                                                promotionTitle={couponName}
                                                promotionDetail={value.description}
                                                tnc={value.tnc}
                                                dateTime={value.couponExpiryDate}
                                                amount={value.maxDiscount}
                                                key={i}
                                                couponType={value.couponType}
                                                value={value.couponCode}
                                            />
                                        );
                                    })}
                            </GridSelect>
                        )}
                        {displayCoupons && displayCoupons.length === 0 && (
                            <GridSelect
                                elementWidthMobile={100}
                                elementWidthDesktop={100}
                                offset={0}
                                offsetDesktop="0px 22px 20px 22px"
                                limit={1}
                                onSelect={val => this.onSelectCouponCode(val)}
                                selected={[this.state.selectedCouponCode]}
                            >
                                <div className={styles.noEligiblecoupon}>
                                    Currently you dont have any eligible coupons for the items in your cart.
                                </div>
                            </GridSelect>
                        )}
                    </div>
                    {otherCoupons && otherCoupons.length > 0 && (
                        <div className={styles.otherEligibleCouponsDesign}>
                            <AccordionWithTooltip
                                key={1}
                                text2={"Other Active coupon"}
                                text2Size={14}
                                widthForText2={`100%`}
                                headerFontSize={16}
                                textAlign={"left"}
                                marginLeft2={`20px`}
                                fontWeight2={`bold`}
                                tooltip={true}
                                tooltipSrc={ibutton}
                                tooltipText={`To use these coupons, you might have to add or modify products in your cart`}
                                subHeading={true}
                                isOpen={this.state.isOpen}
                            >
                                <DesktopOnly>
                                    <div className={styles.other_coupon_disclaimer_desktop}>
                                        {USER_COUPON_OTHER_NOTE_DESKTOP}
                                    </div>
                                </DesktopOnly>
                                <GridSelect
                                    elementWidthMobile={100}
                                    elementWidthDesktop={100}
                                    offset={0}
                                    offsetDesktop="0px 22px 20px 22px"
                                    limit={1}
                                    onSelect={val => this.onSelectCouponCode(val)}
                                    selected={[this.state.selectedCouponCode]}
                                >
                                    {otherCoupons &&
                                        otherCoupons.map((value, i) => {
                                            let couponName = value.couponName ? value.couponName : value.couponCode;
                                            return (
                                                <OtherCuponDetails
                                                    promotionTitle={couponName}
                                                    promotionDetail={value.description}
                                                    tnc={value.tnc}
                                                    dateTime={value.couponExpiryDate}
                                                    amount={value.maxDiscount}
                                                    key={i}
                                                    couponType={value.couponType}
                                                    value={value.couponCode}
                                                />
                                            );
                                        })}
                                </GridSelect>
                            </AccordionWithTooltip>
                        </div>
                    )}
                </div>
            </SlideModal>
        );
    }
}

ProductCouponDetails.propTypes = {
    productOfferPromotion: PropTypes.array,
    history: PropTypes.object,
    closeModal: PropTypes.func,
    onClickImage: PropTypes.func,
    activeNonEligibleCouponList: PropTypes.arrayOf(
        PropTypes.shape({
            couponCode: PropTypes.string,
            couponCreationDate: PropTypes.string,
            couponExpiryDate: PropTypes.string,
            couponName: PropTypes.string,
            couponSequenceNumber: PropTypes.number,
            couponType: PropTypes.string,
            description: PropTypes.string,
            isPercentage: PropTypes.bool,
            marketIndicator: PropTypes.string,
            tnc: PropTypes.string,
            value: PropTypes.number,
        })
    ),
    activeEligibleCouponList: PropTypes.arrayOf(
        PropTypes.shape({
            couponCode: PropTypes.string,
            couponCreationDate: PropTypes.string,
            couponExpiryDate: PropTypes.string,
            couponName: PropTypes.string,
            couponSequenceNumber: PropTypes.number,
            couponType: PropTypes.string,
            description: PropTypes.string,
            isPercentage: PropTypes.bool,
            marketIndicator: PropTypes.string,
            maxDiscount: PropTypes.number,
            tnc: PropTypes.string,
            value: PropTypes.number,
        })
    ),
    activeEligibleBankCouponList: PropTypes.arrayOf(
        PropTypes.shape({
            couponCode: PropTypes.string,
            couponCreationDate: PropTypes.string,
            couponExpiryDate: PropTypes.string,
            couponName: PropTypes.string,
            couponSequenceNumber: PropTypes.number,
            couponType: PropTypes.string,
            description: PropTypes.string,
            isPercentage: PropTypes.bool,
            marketIndicator: PropTypes.string,
            maxDiscount: PropTypes.number,
            tnc: PropTypes.string,
            value: PropTypes.number,
        })
    ),

    opencouponsList: PropTypes.arrayOf(
        PropTypes.shape({
            couponCode: PropTypes.string,
            couponCreationDate: PropTypes.string,
            couponExpiryDate: PropTypes.string,
            couponName: PropTypes.string,
            couponSequenceNumber: PropTypes.number,
            couponType: PropTypes.string,
            isPercentage: PropTypes.bool,
            marketIndicator: PropTypes.string,
            maxDiscount: PropTypes.number,
            value: PropTypes.number,
        })
    ),
    releaseUserCoupon: PropTypes.func,
    applyUserCoupon: PropTypes.func,
    navigateToLogin: PropTypes.func,
    closedcouponsList: PropTypes.array,
};

ProductCouponDetails.defaultProps = {
    activeNonEligibleCouponList: [],
    activeEligibleCouponList: [],
    opencouponsList: [],
};

export default ProductCouponDetails;
