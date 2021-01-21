import React from "react";
import SelectBoxDesktop from "../../general/components/SelectBoxDesktop";
import DeliveryInfoSelect from "./DeliveryInfoSelect";
import PropTypes from "prop-types";
import {
  HOME_DELIVERY,
  EXPRESS,
  COLLECT,
  EXPRESS_TEXT,
  STANDARD_SHIPPING,
  COLLECT_TEXT,
  YES,
  NO,
  DEFAULT_PIN_CODE_LOCAL_STORAGE,
  SHORT_COLLECT,
  NOT_SERVICEABLE,
  LOGGED_IN_USER_DETAILS,
  CART_DETAILS_FOR_ANONYMOUS,
  CART_DETAILS_FOR_LOGGED_IN_USER,
  CUSTOMER_ACCESS_TOKEN,
  GLOBAL_ACCESS_TOKEN,
  ANONYMOUS_USER,
  AC_CART_EXCHANGE_DETAILS,
  RUPEE_SYMBOL
} from "../../lib/constants";
import * as Cookie from "../../lib/Cookie";
import ProductImage from "../../general/components/ProductImage.js";
import styles from "./CartItemForDesktop.css";
import AddToWishListButtonContainer from "../../wishlist/containers/AddToWishListButtonContainer";
import { WISHLIST_BUTTON_TEXT_TYPE_SMALL } from "../../wishlist/components/AddToWishListButton";
import { ADOBE_DIRECT_CALL_FOR_SAVE_ITEM_ON_CART } from "../../lib/adobeUtils";
import exchangeIconLight from "../../cart/components/img/exchangeIconLight.svg";
import closeIcon from "../../cart/components/img/exchangeCloseIcon.svg";
import format from "date-fns/format";
import {
  setDataLayer,
  ADOBE_MDE_CLICK_ON_REMOVE_EXCHANGE,
  ADOBE_MDE_CLICK_ON_GET_NEW_PRICE,
  ADOBE_MDE_CLICK_ON_CART_VIEW_MORE,
  ADOBE_MDE_CLICK_ON_CART_VIEW_LESS,
  ADOBE_MDE_CLICK_ON_CART_TNC
} from "../../lib/adobeUtils";
import DigitalBundledProduct from "./DigitalBundledProduct";
import RecommendedBundledProduct from "./RecommendedBundledProduct";
import AppliancesExchangeCart from "./AppliancesExchangeCart";
import {
  getGlobalAccessToken,
  getCustomerAccessToken,
  getLoggedInUserDetails,
  getCartDetailsForLoggedInUser,
  getCartDetailsForAnonymousInUser
} from "../../lib/getCookieDetails.js";
import ComboOfferSection from "./ComboOfferSection";
const NO_SIZE = "NO SIZE";
const OUT_OF_STOCK = "Product is out of stock";
export default class CartItemForDesktop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showDelivery: this.props.showDelivery ? this.props.showDelivery : false,
      label: "See all",
      showMore: false
    };
  }
  componentDidMount() {
    document.title = "Shopping Cart - TATA CLiQ";
    if (
      this.props.product &&
      this.props.product.exchangeInfo &&
      this.props.product.exchangeInfo.exchangeCancelMessage
    ) {
      this.props.displayToast(
        this.props.product.exchangeInfo.exchangeCancelMessage
      );
    }
  }
  onClick() {
    if (this.props.onClickImage) {
      this.props.onClickImage();
    }
  }
  handleRemove(entryNumber, mainProductUssid, isForDigitalBundledProduct) {
    if (this.props.onRemove) {
      this.props.onRemove(
        entryNumber,
        mainProductUssid,
        isForDigitalBundledProduct
      );
      this.removeAppliancesExchange(mainProductUssid);
    }
  }
  getDeliveryName = type => {
    if (type === HOME_DELIVERY) {
      return STANDARD_SHIPPING;
    }
    if (type === EXPRESS) {
      return EXPRESS_TEXT;
    } else if (type === COLLECT) {
      return COLLECT_TEXT;
    }
  };

  selectDeliveryMode(val) {
    if (this.props.selectDeliveryMode) {
      this.props.selectDeliveryMode(val);
    }
  }

  getPickUpDetails = () => {
    if (this.props.onPiq) {
      this.props.onPiq();
    }
  };
  onHide() {
    this.setState({ showDelivery: !this.state.showDelivery }, () => {
      if (this.state.label === "See all") {
        this.setState({ label: "Hide" });
      } else {
        this.setState({ label: "See all" });
      }
    });
  }
  handleQuantityChange(changedValue) {
    const updatedQuantity = parseInt(changedValue.value, 10);
    if (this.props.onQuantityChange) {
      this.props.onQuantityChange(this.props.entryNumber, updatedQuantity);
    }
  }
  viewMoreDetails() {
    this.setState({ showMore: true });
    setDataLayer(ADOBE_MDE_CLICK_ON_CART_VIEW_MORE);
  }
  viewLessDetails() {
    this.setState({ showMore: false });
    setDataLayer(ADOBE_MDE_CLICK_ON_CART_VIEW_LESS);
  }
  openTnCModal() {
    this.props.showExchangeTnCModal();
    setDataLayer(ADOBE_MDE_CLICK_ON_CART_TNC);
  }
  async removeExchange() {
    await this.props.showRemoveExchangeModal({
      cartGuid: this.props.cartGuid,
      entryNumber: this.props.entryNumber,
      quoteId: this.props.product.exchangeDetails.quoteId,
      IMEINumber: this.props.product.exchangeDetails.IMEINumber
    });
    setDataLayer(ADOBE_MDE_CLICK_ON_REMOVE_EXCHANGE);
  }
  getDayNumberSuffix(d) {
    let dateWithMonth = new Date(d);
    let date = dateWithMonth.getDate();
    let month = dateWithMonth.getMonth();
    let year = dateWithMonth.getFullYear();
    let monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];
    switch (date) {
      case 1:
      case 21:
      case 31:
        return "" + date + "st " + monthNames[month];
      case 2:
      case 22:
        return "" + date + "nd " + monthNames[month];
      case 3:
      case 23:
        return "" + date + "rd " + monthNames[month];
      default:
        return "" + date + "th " + monthNames[month];
    }
  }
  async verifyIMEINumber() {
    if (this.props) {
      const globalCookie = Cookie.getCookie(GLOBAL_ACCESS_TOKEN);
      const customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
      let loggedInUserDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
      let cartDetails = Cookie.getCookie(CART_DETAILS_FOR_ANONYMOUS);
      let user = "anonymous";
      let accessToken = globalCookie && JSON.parse(globalCookie).access_token;
      let cartId = cartDetails && JSON.parse(cartDetails).guid;
      if (loggedInUserDetails) {
        user = JSON.parse(loggedInUserDetails).userName;
        cartDetails = Cookie.getCookie(CART_DETAILS_FOR_LOGGED_IN_USER);
        accessToken = JSON.parse(customerCookie).access_token;
        cartId = cartDetails && JSON.parse(cartDetails).code;
      }
      const defaultPinCode = localStorage.getItem(
        DEFAULT_PIN_CODE_LOCAL_STORAGE
      );
      let guid = JSON.parse(cartDetails).guid;
      let response = await this.props.verifyIMEINumber(
        this.props.product.exchangeDetails.IMEINumber,
        this.props.product.exchangeDetails.exchangeProductId,
        this.props.product.exchangeDetails.exchangePriceDetail
          .exchangeAmountCashify.value,
        this.props.product.exchangeDetails.exchangePriceDetail.TULBump
          ? this.props.product.exchangeDetails.exchangePriceDetail.TULBump.value
          : null,
        this.props.product.exchangeDetails.exchangePriceDetail.pickupCharge
          .value,
        this.props.product.productcode,
        this.props.product.USSID,
        guid,
        this.props.product.entryNumber
      );
      if (
        response.status &&
        response.status.toLowerCase() === "success" &&
        response.isIMEIVerified
      ) {
        this.props.displayToast("Exchange Cashback has been updated");
        this.props.getCartDetails(user, accessToken, cartId, defaultPinCode);
      }
      if (
        response.status &&
        response.status.toLowerCase() === "failure" &&
        !response.isIMEIVerified &&
        response.error
      ) {
        this.props.displayToast(response.error);
      }
      setDataLayer(ADOBE_MDE_CLICK_ON_GET_NEW_PRICE);
    }
  }

  removeAppliancesExchange(ussid) {
    let acCartExchangeDetails = localStorage.getItem(AC_CART_EXCHANGE_DETAILS);
    let cartExchangeDetails =
      acCartExchangeDetails && JSON.parse(acCartExchangeDetails);
    if (cartExchangeDetails && cartExchangeDetails.length > 0) {
      let index = cartExchangeDetails.findIndex(product => {
        return product.ussid === ussid;
      });
      if (index !== -1) {
        cartExchangeDetails.splice(index, 1);
        localStorage.setItem(
          AC_CART_EXCHANGE_DETAILS,
          JSON.stringify(cartExchangeDetails)
        );
      }

      let loggedInUserDetails = getLoggedInUserDetails();
      let cartDetails = getCartDetailsForAnonymousInUser();
      let cartId = cartDetails && cartDetails.guid;
      let user = ANONYMOUS_USER;
      let accessToken = getGlobalAccessToken();
      if (loggedInUserDetails) {
        user = loggedInUserDetails.userName;
        cartDetails = getCartDetailsForLoggedInUser();
        cartId = cartDetails && cartDetails.code;
        accessToken = getCustomerAccessToken();
      }
      let defaultPinCode = localStorage.getItem(DEFAULT_PIN_CODE_LOCAL_STORAGE);
      this.props.getCartDetails(user, accessToken, cartId, defaultPinCode);
    }
  }

  render() {
    let fetchedQuantityList = [];
    if (this.props.isOutOfStock) {
      fetchedQuantityList = [{}];
    } else {
      for (let i = 1; i <= this.props.maxQuantityAllowed; i++) {
        fetchedQuantityList.push({
          value: i.toString(),
          label: i.toString()
        });
      }
    }
    let hideQuantityArrow = false;
    let isDigitalBundledProduct =
      this.props.product &&
      this.props.product.bundledDigitalItems &&
      Array.isArray(this.props.product.bundledDigitalItems) &&
      this.props.product.bundledDigitalItems.length > 0;
    if (
      this.props.product &&
      (this.props.product.exchangeDetails || isDigitalBundledProduct)
    ) {
      hideQuantityArrow = true;
    }
    let productMessage = this.props.productNotServiceable
      ? this.props.productNotServiceable
      : !this.props.productOutOfStocks
      ? NOT_SERVICEABLE
      : null;
    let pickUpDateDetails = "";
    if (this.props.storeDetails && this.props.storeDetails.slaveId) {
      let productSlaveId = this.props.storeDetails.slaveId;
      let cncDetails =
        this.props.deliveryInformationWithDate &&
        this.props.deliveryInformationWithDate.find(val => {
          return val.type === SHORT_COLLECT;
        });
      pickUpDateDetails =
        cncDetails &&
        cncDetails.CNCServiceableSlavesData &&
        cncDetails.CNCServiceableSlavesData.length > 0 &&
        cncDetails.CNCServiceableSlavesData.find(val => {
          return val.storeId === productSlaveId;
        });
    }
    let strTime = "";
    let productDayFormatOfClqAndPiq = "";
    let dayFormat = "";
    let nextDayFormat = "";
    if (
      this.props.isFromCnc &&
      this.props.storeDetails &&
      this.props.storeDetails.displayName
    ) {
      let day = new Date();
      dayFormat = format(day, "DD-MMM-YYYY");
      let nextWithOutFormatDay = day.setDate(day.getDate() + 1);
      let nextDay = new Date(nextWithOutFormatDay);
      nextDayFormat = format(nextDay, "DD-MMM-YYYY");
      productDayFormatOfClqAndPiq = format(
        pickUpDateDetails && pickUpDateDetails.pickupDate,
        "DD-MMM-YYYY"
      );
      var dateForPiq = new Date(
        pickUpDateDetails && pickUpDateDetails.pickupDate
      );
      var hours = dateForPiq.getHours();
      var minutes = dateForPiq.getMinutes();
      var salutationOfTime = hours >= 12 ? "PM" : "AM";
      hours = hours % 12;
      hours = hours ? hours : 0; // the hour '0' should be '12'
      minutes = minutes < 10 ? "0" + minutes : minutes;
      strTime = hours + ":" + minutes + " " + salutationOfTime;
    }
    let SizeType = this.props.sizeType ? this.props.sizeType : "Size";
    let sizeValue = this.props.size;
    if (this.props.sizeType === "Power" && this.props.size > 0) {
      sizeValue = `+${this.props.size}`;
    }

    let parsedComboDiscount =
      this.props.product.comboDiscount &&
      parseFloat(this.props.product.comboDiscount);

    return (
      <div className={styles.base}>
        <div className={styles.productImage}>
          <ProductImage
            image={this.props.productImage}
            onClickImage={() => this.onClick()}
          />
        </div>
        <div className={styles.productInformation}>
          <div className={styles.productInformationHolder}>
            {this.props.productName && (
              <div className={styles.informationText}>
                {this.props.productName}
              </div>
            )}
            <div className={styles.textWithOutOfStock}>
              {this.props.isGiveAway === YES && (
                <div className={styles.isGiveAwayText}>FREE</div>
              )}
              {this.props.isGiveAway === NO && (
                <div className={styles.informationTextWithBolder}>
                  {!this.props.offerPrice && (
                    <React.Fragment>
                      {` ${RUPEE_SYMBOL}${this.props.price}`}
                    </React.Fragment>
                  )}
                  {this.props.offerPrice && (
                    <React.Fragment>
                      {` ${RUPEE_SYMBOL}${this.props.offerPrice}`}
                    </React.Fragment>
                  )}
                </div>
              )}
              {this.props.product &&
                this.props.product.price &&
                this.props.offerPrice &&
                this.props.product.price !== this.props.offerPrice && (
                  <div className={styles.priceCancelled}>
                    <span
                      className={styles.cancelPrice}
                    >{`${RUPEE_SYMBOL}${Math.floor(
                      this.props.product.price
                    )}`}</span>
                    <span className={styles.discount}>
                      {this.props.discount && this.props.discount > 0
                        ? `(${this.props.discount}%)`
                        : null}
                    </span>
                  </div>
                )}
              {this.props.isGiveAway === NO &&
                (!this.props.productIsServiceable && productMessage
                  ? localStorage.getItem(DEFAULT_PIN_CODE_LOCAL_STORAGE) && (
                      <React.Fragment>
                        <div className={styles.space}>|</div>
                        <div className={styles.serviceAvailabilityText}>
                          {/* `${NOT_SERVICEABLE}` */}
                          {`${productMessage}`}
                        </div>
                      </React.Fragment>
                    )
                  : (this.props.isOutOfStock ||
                      this.props.productOutOfStocks) && (
                      <React.Fragment>
                        <div className={styles.space}>|</div>
                        <div className={styles.serviceAvailabilityText}>
                          {/* OUT_OF_STOCK */}
                          {this.props.productOutOfStocks}
                        </div>
                      </React.Fragment>
                    ))}
            </div>

            {this.props.product.comboDiscount &&
              parsedComboDiscount &&
              parsedComboDiscount !== 0 && (
                <ComboOfferSection
                  comboDiscount={this.props.product.comboDiscount}
                  comboDiscountWith={
                    this.props.product.comboDiscountWith
                      ? this.props.product.comboDiscountWith
                      : this.props.productName
                  }
                  comboDiscountAppliedQuantity={
                    this.props.product.comboDiscountAppliedQuantity
                  }
                  quantitySelectedByUser={this.props.qtySelectedByUser}
                />
              )}

            {this.props.isGiveAway === YES && (
              <div className={styles.isGiveAwayQuantity}>
                Quantity:
                <span className={styles.isGiveAwayQuantityValue}>
                  {this.props.qtySelectedByUser}
                </span>
              </div>
            )}

            {this.props.isGiveAway === NO && this.props.hasFooter && (
              <div className={styles.dropDown}>
                <SelectBoxDesktop
                  value={this.props.qtySelectedByUser}
                  label={this.props.qtySelectedByUser}
                  height={30}
                  options={fetchedQuantityList}
                  onChange={val => this.handleQuantityChange(val)}
                  size={10}
                  leftChild={this.props.dropdownLabel}
                  leftChildSize={80}
                  rightChildSize={30}
                  labelWithLeftChild={true}
                  arrowColour="black"
                  disabled={this.props.isOutOfStock}
                  theme="hollowBox"
                  paddingLeftColour={"#212121"}
                  paddingLeftFontFamily={"light"}
                  paddingLeft={"0px"}
                  rightArrow={0}
                  hideArrow={hideQuantityArrow}
                />
              </div>
            )}
            {(this.props.size || this.props.color) && (
              <div className={styles.colourSizeHolder}>
                {this.props.color && (
                  <div className={styles.sizeText}>
                    {`Color:  ${this.props.color}`}
                  </div>
                )}
                {this.props.size &&
                  this.props.size.toUpperCase() !== NO_SIZE && (
                    <div className={styles.colourText}>
                      {`${SizeType}: ${sizeValue}`}
                    </div>
                  )}
              </div>
            )}
          </div>
          {this.props.isGiveAway === NO && this.props.hasFooter && (
            <div className={styles.footer}>
              <div className={styles.wishlist}>
                <AddToWishListButtonContainer
                  type={WISHLIST_BUTTON_TEXT_TYPE_SMALL}
                  productListingId={this.props.product.productcode}
                  winningUssID={this.props.product.USSID}
                  setDataLayerType={ADOBE_DIRECT_CALL_FOR_SAVE_ITEM_ON_CART}
                  index={this.props.index}
                  exchangeDetails={this.props.product.exchangeDetails}
                  entryNumber={this.props.entryNumber}
                  isFromCartPage={true}
                  removeAppliancesExchange={ussid =>
                    this.removeAppliancesExchange(ussid)
                  }
                />
              </div>
              <div
                className={styles.removeLabel}
                onClick={() =>
                  this.handleRemove(
                    this.props.product.entryNumber,
                    this.props.product.USSID
                  )
                }
              >
                {this.props.removeText}
              </div>
            </div>
          )}
        </div>
        {this.props.isFromCnc &&
          this.props.storeDetails &&
          this.props.storeDetails.address &&
          this.props.storeDetails.address && (
            <div className={styles.storeDataHolder}>
              <div className={styles.pickUpIcon} />
              <div className={styles.dataHolder}>
                <div className={styles.pickUpStoreHeading}>Pick from store</div>
                <div className={styles.pickUpData}>
                  <div className={styles.addressOfSelect}>
                    {this.props.storeDetails.address.line1
                      ? this.props.storeDetails.address.line1
                      : ""}
                    ,
                    {this.props.storeDetails.address.line2
                      ? this.props.storeDetails.address.line2
                      : ""}
                    ,
                    {this.props.storeDetails.address.city
                      ? this.props.storeDetails.address.city
                      : ""}
                    ,
                    {this.props.storeDetails.address.postalCode
                      ? this.props.storeDetails.address.postalCode
                      : ""}
                  </div>
                  <div className={styles.addressOfSelect}>
                    {pickUpDateDetails && pickUpDateDetails.pickupDate
                      ? dayFormat === productDayFormatOfClqAndPiq
                        ? `Today, ${this.getDayNumberSuffix(
                            pickUpDateDetails && pickUpDateDetails.pickupDate
                          )}`
                        : nextDayFormat === productDayFormatOfClqAndPiq
                        ? `Tomorrow, ${this.getDayNumberSuffix(
                            pickUpDateDetails && pickUpDateDetails.pickupDate
                          )}`
                        : `${this.getDayNumberSuffix(
                            pickUpDateDetails && pickUpDateDetails.pickupDate
                          )}`
                      : ""}
                    {hours !== 0 ? ` | After ${strTime}` : ""}
                  </div>
                </div>
              </div>
            </div>
          )}
        {!this.props.isFromCnc &&
          this.props.isGiveAway === NO &&
          this.props.deliveryInformation && (
            <div className={styles.deliveryInfo}>
              <DeliveryInfoSelect
                deliveryInformation={this.props.deliveryInformation}
                selected={this.props.selected}
                onSelect={val => this.selectDeliveryMode(val)}
                onPiq={() => this.getPickUpDetails()}
                isClickable={this.props.isClickable}
                deliveryInformationWithDate={
                  this.props.deliveryInformationWithDate
                }
                isCod={this.props.isCod}
                allStores={this.props.allStores}
                isTop={this.props.isTop}
                inCartPage={this.props.inCartPage}
                inCartPageIcon={true}
                isArrowIcon={this.props.isArrowIcon}
                productCode={
                  this.props.product && this.props.product.productcode
                }
                winningUssID={this.props.product && this.props.product.USSID}
                isShippingObjAvailable={this.props.isShippingObjAvailable}
              />
            </div>
          )}

        {this.props.product.exchangeDetails &&
          this.props.product.exchangeDetails.exchangeModelName && (
            <React.Fragment>
              <div
                className={
                  this.props.product.pinCodeResponse &&
                  this.props.product.pinCodeResponse.errorMessagePincode
                    ? styles.exchangeDetailsPickupNotAvail
                    : styles.exchangeDetails
                }
              >
                <div className={styles.exchangeDetailsSectionOne}>
                  <img
                    src={closeIcon}
                    alt="exchange icon"
                    className={styles.closeIcon}
                    onClick={() => this.removeExchange()}
                  />
                  <img
                    src={exchangeIconLight}
                    alt="exchange icon"
                    className={styles.exchangeIcon}
                  />
                  <div className={styles.exchangeDetailsHeading}>
                    Exchange Cashback for{" "}
                    <span className={styles.exchangeProductName}>
                      {this.props.product.exchangeDetails.exchangeModelName}
                    </span>
                    {this.props.product.exchangeDetails.quoteExpired && (
                      <span> has been updated</span>
                    )}
                  </div>
                </div>
                <div className={styles.exchangeDetailsSectionTwo}>
                  {this.props.product.exchangeDetails.quoteExpired ? (
                    <div className={styles.exchangePriceNDetails}>
                      <div
                        className={styles.getNewPrice}
                        onClick={() => this.verifyIMEINumber()}
                      >
                        Get New Price
                      </div>
                    </div>
                  ) : (
                    <div className={styles.exchangePriceNDetails}>
                      <div className={styles.exchangePrice}>
                        {this.props.product.exchangeDetails
                          .exchangePriceDetail &&
                          this.props.product.exchangeDetails.exchangePriceDetail
                            .totalExchangeCashback &&
                          this.props.product.exchangeDetails.exchangePriceDetail
                            .totalExchangeCashback.formattedValueNoDecimal}
                      </div>
                      {!this.state.showMore && (
                        <div
                          className={styles.exchangeViewDetails}
                          onClick={() => this.viewMoreDetails()}
                        >
                          View Details
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {this.state.showMore && (
                  <React.Fragment>
                    {this.props.product.exchangeDetails.exchangePriceDetail &&
                      this.props.product.exchangeDetails.exchangePriceDetail
                        .exchangeAmountCashify && (
                        <React.Fragment>
                          <div className={styles.font14LightLeft}>
                            Base Value
                          </div>
                          <div className={styles.font14LightRight}>
                            {
                              this.props.product.exchangeDetails
                                .exchangePriceDetail.exchangeAmountCashify
                                .formattedValueNoDecimal
                            }
                          </div>
                        </React.Fragment>
                      )}
                    {this.props.product.exchangeDetails.exchangePriceDetail &&
                      this.props.product.exchangeDetails.exchangePriceDetail
                        .TULBump && (
                        <React.Fragment>
                          <div className={styles.font14LightLeft}>
                            CLiQ Exclusive Cashback
                          </div>
                          <div className={styles.font14LightRight}>
                            {
                              this.props.product.exchangeDetails
                                .exchangePriceDetail.TULBump
                                .formattedValueNoDecimal
                            }
                          </div>
                        </React.Fragment>
                      )}
                    <div className={styles.exchangePickupDetails}>
                      <span className={styles.font14bold}>Pick Up</span>: Within
                      3 days of Product Delivery{" "}
                      <span className={styles.separator}>|</span>
                      <span className={styles.font14bold}>
                        Pick Up Charge
                      </span>:{" "}
                      {this.props.product.exchangeDetails.exchangePriceDetail &&
                      this.props.product.exchangeDetails.exchangePriceDetail
                        .pickupCharge &&
                      this.props.product.exchangeDetails.exchangePriceDetail
                        .pickupCharge.value === 0 ? (
                        <span className={styles.font14green}>FREE</span>
                      ) : (
                        <span>
                          {this.props.product.exchangeDetails
                            .exchangePriceDetail &&
                            this.props.product.exchangeDetails
                              .exchangePriceDetail.pickupCharge &&
                            this.props.product.exchangeDetails
                              .exchangePriceDetail.pickupCharge
                              .formattedValueNoDecimal}
                        </span>
                      )}
                    </div>
                    <div className={styles.font12light}>
                      Your mobile will be examined during pick up.{" "}
                      <span
                        className={styles.tncLink}
                        onClick={() => this.openTnCModal()}
                      >
                        T&amp;C
                      </span>{" "}
                    </div>
                    <div
                      className={styles.exchangeViewLessDetails}
                      onClick={() => this.viewLessDetails()}
                    >
                      View Less
                    </div>
                  </React.Fragment>
                )}
              </div>
              {this.props.product.pinCodeResponse &&
                this.props.product.pinCodeResponse.errorMessagePincode && (
                  <div className={styles.exchangeProductNotServiceable}>
                    {this.props.product.pinCodeResponse.errorMessagePincode}
                  </div>
                )}
              {!this.props.productIsServiceable && (
                <div className={styles.exchangeProductNotServiceable}>
                  Cannot service Exchange since main product not serviceable
                </div>
              )}
            </React.Fragment>
          )}

        <AppliancesExchangeCart
          productUssid={this.props.product.USSID}
          pinCodeResponse={this.props.product.pinCodeResponse}
          productIsServiceable={this.props.productIsServiceable}
          openAppliancesExchangeModal={this.props.openAppliancesExchangeModal}
          removeAppliancesExchange={ussid =>
            this.removeAppliancesExchange(ussid)
          }
          displayToast={this.props.displayToast}
          appliancesExchangePincodeData={
            this.props.appliancesExchangePincodeData
          }
          productCode={this.props.product.productcode}
        />

        {this.props.product.bundledDigitalItems &&
          this.props.product.bundledDigitalItems.map(
            (digitalProduct, index) => {
              return (
                <DigitalBundledProduct
                  key={index}
                  digitalProduct={digitalProduct}
                  mainProductUssid={this.props.product.USSID}
                  onRemove={(
                    entryNumber,
                    mainProductUssid,
                    isForDigitalBundledProduct
                  ) =>
                    this.handleRemove(
                      entryNumber,
                      mainProductUssid,
                      isForDigitalBundledProduct
                    )
                  }
                  history={this.props.history}
                  comboDiscount={digitalProduct.comboDiscount}
                  comboDiscountWith={digitalProduct.comboDiscountWith}
                />
              );
            }
          )}

        {this.props.product.bundlingSuggestionAvailable &&
          !this.props.isOutOfStock &&
          this.props.productIsServiceable && (
            <RecommendedBundledProduct
              product={this.props.product}
              getBundledProductSuggestion={
                this.props.getBundledProductSuggestion
              }
              bundledProductSuggestionDetails={
                this.props.bundledProductSuggestionDetails
              }
              addBundledProductsToCart={this.props.addBundledProductsToCart}
              addBundledProductsToCartDetails={
                this.props.addBundledProductsToCartDetails
              }
              getCartDetails={this.props.getCartDetails}
              displayToast={this.props.displayToast}
              history={this.props.history}
              bundledProductSuggestionStatus={
                this.props.bundledProductSuggestionStatus
              }
            />
          )}

        {this.props.isGiveAway === NO && this.props.deliveryInformation && (
          <div className={styles.deliveryInfo}>
            <DeliveryInfoSelect
              deliveryInformation={this.props.deliveryInformation}
              selected={this.props.selected}
              onSelect={val => this.selectDeliveryMode(val)}
              onPiq={val => this.getPickUpDetails()}
              isClickable={this.props.isClickable}
              isShippingObjAvailable={this.props.isShippingObjAvailable}
            />
          </div>
        )}
      </div>
    );
  }
}
CartItemForDesktop.propTypes = {
  onRemove: PropTypes.func,
  productImage: PropTypes.string,
  productName: PropTypes.string,
  productDetails: PropTypes.string,
  price: PropTypes.string,
  deliverTime: PropTypes.string,
  dropdownLabel: PropTypes.string,
  deliveryInfoToggle: PropTypes.bool,
  hasFooter: PropTypes.bool,
  onQuantityChange: PropTypes.func,
  deliveryInformation: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string,
      header: PropTypes.string,
      placedTime: PropTypes.string
    })
  ),
  product: PropTypes.object,
  pinCode: PropTypes.object,
  maxQuantityAllowed: PropTypes.string,
  qtySelectedByUser: PropTypes.string,
  isShippingObjAvailable: PropTypes.bool
};

CartItemForDesktop.defaultProps = {
  deliveryInfoToggle: true,
  hasFooter: true,
  dropdownLabel: "Quantity:",
  removeText: "Remove",
  isFromCnc: false,
  isShippingObjAvailable: false
};
