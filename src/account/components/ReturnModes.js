import React from "react";
import { Redirect } from "react-router-dom";
import OrderCard from "./OrderCard";
import PropTypes from "prop-types";
import styles from "./ReturnModes.css";
import DesktopOnly from "../../general/components/DesktopOnly.js";
import { checkUserAgentIsMobile } from "../../lib/UserAgent.js";
import Button from "../../general/components/Button";
import Loader from "../../general/components/Loader";
import stylesCommon from "./ReturnReasonAndModes.css";
import {
  QUICK_DROP,
  SCHEDULED_PICKUP,
  SELF_COURIER,
  RETURNS_PREFIX,
  RETURN_LANDING,
  RETURNS_REASON,
  REFUND_SUMMARY,
  RETURN_TO_ADDRESS
} from "../../lib/constants";
import {
  setDataLayer,
  ADOBE_CHANGE_PICKUPADDRESS_LINK_CLICKED,
  ADOBE_MODE_OF_RETURN_SUBMITTED,
  ADOBE_MYACCOUNT_DELIVERYMODE_CHANGE_SUCCESS,
  ADOBE_MYACCOUNT_DELIVERYMODE_CHANGE_INITIATE,
  getDeliveryModeForMyAccountReturn
} from "../../lib/adobeUtils";
import { TATA_CLIQ_ROOT } from "../../lib/apiRequest.js";
import ProfileMenu from "../../account/components/ProfileMenu.js";
import UserProfile from "../../account/components/UserProfile.js";
import format from "date-fns/format";
import * as Cookie from "../../lib/Cookie";
import { LOGGED_IN_USER_DETAILS, PRODUCT_CANCEL } from "../../lib/constants";
const dateFormat = "DD MMM YYYY";

export default class ReturnModes extends React.Component {
  constructor(props) {
    super(props);
    this.orderCode = props.location.pathname.split("/")[2];
    this.state = {
      selectedMode: null,
      isModeSelected: false,
      returnModesDetails: "",
      selectedOption: "",
      selectedOptionStores: "",
      selectedAddress: "",
      selectedReturnStore: ""
    };
    this.radioChange = this.radioChange.bind(this);
    this.radioChangeStores = this.radioChangeStores.bind(this);
  }
  async componentDidMount() {
    //use delivery address id - required for getPickupAddrReturnPincodeServcblty api call
    let pickUpAddressId =
      this.props.location &&
      this.props.location.state &&
      this.props.location.state.address
        ? this.props.location.state.address.id
        : this.props.getRefundOptionsDetails.deliveryAddress.id;
    let returnId = this.props.getRefundModesDetails.returnId;
    let orderId = this.props.data.sellerorderno;
    let transactionId = this.props.data.transactionId;
    let data = await this.props.getReturnModes(
      returnId,
      orderId,
      pickUpAddressId,
      transactionId
    );
    if (data.status === "success") {
      this.setState({ returnModesDetails: data.returnModesDetails });
      if (
        data &&
        data.returnModesDetails &&
        data.returnModesDetails.returnModes
      ) {
        for (var key in data.returnModesDetails.returnModes) {
          if (key === "quickDrop" && data.returnModesDetails.returnModes[key]) {
            this.setState({ selectedOption: "Return To Store" });
            break;
          } else if (
            key === "schedulePickup" &&
            data.returnModesDetails.returnModes[key]
          ) {
            this.setState({ selectedOption: "Pick Up" });
            break;
          } else if (
            key === "selfCourier" &&
            data.returnModesDetails.returnModes[key]
          ) {
            this.setState({ selectedOption: "Self Courier" });
          }
        }
      }

      let pickupAddress = {};
      if (data && data.returnModesDetails) {
        getDeliveryModeForMyAccountReturn(
          ADOBE_MYACCOUNT_DELIVERYMODE_CHANGE_INITIATE
        );
      }
      //if address changed
      if (
        this.props.location &&
        this.props.location.state &&
        this.props.location.state.address
      ) {
        let changedAddress = this.props.location.state.address;

        Object.assign(pickupAddress, {
          line1: changedAddress.line1,
          line2: changedAddress.line2 ? changedAddress.line2 : "",
          line3: "",
          landmark: changedAddress.landmark ? changedAddress.landmark : "",
          city: changedAddress.city,
          state: changedAddress.state,
          postalCode: changedAddress.postalCode
        });
      } else {
        //take directly from API if not changed
        Object.assign(pickupAddress, {
          line1: data.returnModesDetails.deliveryAddress.line1,
          line2: "",
          line3: "",
          landmark: data.returnModesDetails.deliveryAddress.landmark
            ? data.returnModesDetails.deliveryAddress.landmark
            : "",
          city: data.returnModesDetails.deliveryAddress.town,
          state: data.returnModesDetails.deliveryAddress.state,
          postalCode: data.returnModesDetails.deliveryAddress.postalCode
        });
      }
      this.setState({ pickupAddress: pickupAddress });
    }
    // let deliveryAddress = data.returnModesDetails.deliveryAddress;
    // let selectedAddress = "";
    let selectedOne =
      this.props.returnRequest &&
      this.props.returnRequest.deliveryAddressesList.find((value, index) => {
        for (let key in value) {
          if (value[key] === this.props.selectedAddressId[0]) {
            return value;
          }
        }
      });
    if (selectedOne) {
      this.setState({ selectedAddress: selectedOne });
    }
  }
  handleSelect(val) {
    if (checkUserAgentIsMobile()) {
      if (this.props.selectMode) {
        this.props.selectMode(val);
      }
    }

    this.setState({ selectedMode: val });
  }
  handleCancel() {
    if (this.props.onCancel) {
      this.props.onCancel();
    }
  }
  onChangeBankDetails = val => {
    if (this.props.onChangeBankDetails) {
      this.props.onChangeBankDetails(val);
    }
  };
  navigateToReturnLanding() {
    return (
      <Redirect
        to={`${RETURNS_PREFIX}/${this.props.data.sellerorderno}${RETURN_LANDING}${RETURNS_REASON}`}
      />
    );
  }
  handleCancelForReturn = () => {
    this.setState({ isModeSelected: false });
  };

  isReturnModesEnabled = () => {
    const data = this.state.returnModesDetails;
    if (
      (data && data.returnModes && data.returnModes.quickDrop) ||
      (data && data.returnModes && data.returnModes.schedulePickup) ||
      (data && data.returnModes && data.returnModes.selfCourier)
    ) {
      return true;
    } else {
      return false;
    }
  };

  selectReturnMode = () => {
    this.setState({ isModeSelected: true });
  };

  cancelReturnMode = () => {
    this.setState({ isModeSelected: false, selectedMode: null });
  };
  radioChange(e) {
    const target = e.currentTarget;
    this.setState({ selectedOption: target.value });
    getDeliveryModeForMyAccountReturn(
      ADOBE_MYACCOUNT_DELIVERYMODE_CHANGE_SUCCESS
    );
  }
  radioChangeStores(e) {
    const target = e.currentTarget;
    this.setState({ selectedOptionStores: target.value });
    this.setState({ selectedReturnStore: target.dataset.address });
  }
  async submit() {
    let orderId = this.props.data.sellerorderno;
    let transactionId = this.props.data.transactionId;
    let returnId = this.props.getRefundModesDetails.returnId;
    let returnAddress = this.state.pickupAddress;
    if (this.props.location.state.address) {
      returnAddress = this.props.location.state.address;
    }
    const data = this.state.returnModesDetails;
    let returnFullfillmentType =
      data.returnLogisticsResponseDTO[0].returnFullfillmentType;
    let returnStore = this.state.selectedReturnStore;
    //get selected mode of return
    let modeOfReturn = this.state.selectedOption;
    let dtmData = {};
    dtmData.modeOfReturn = modeOfReturn;
    dtmData.refundAddressPincode = returnAddress.postalCode;
    setDataLayer(ADOBE_MODE_OF_RETURN_SUBMITTED, dtmData);
    let updateReturnConfirmation = await this.props.updateReturnConfirmation(
      orderId,
      transactionId,
      returnId,
      returnFullfillmentType,
      returnStore,
      returnAddress,
      modeOfReturn
    );

    if (updateReturnConfirmation.status === "success") {
      //go to success page
      this.props.history.push({
        pathname: `${RETURNS_PREFIX}/${this.props.data.sellerorderno}${RETURN_LANDING}${REFUND_SUMMARY}`,
        state: {
          authorizedRequest: true,
          isRefundTransactionPage: true,
          returnMode: this.state.selectedOption
        }
      });
    } else {
      //show toast with error
      if (updateReturnConfirmation.error) {
        this.props.displayToast(updateReturnConfirmation.error);
      }
    }
  }
  onChangeAddress = () => {
    setDataLayer(ADOBE_CHANGE_PICKUPADDRESS_LINK_CLICKED);
    this.props.history.push(
      `${RETURNS_PREFIX}/${this.orderCode}${RETURN_LANDING}${RETURN_TO_ADDRESS}`
    );
  };
  downloadFile(filePath) {
    const urlSuffix = filePath.replace(TATA_CLIQ_ROOT, "$1");
    this.props.history.push(urlSuffix);
  }
  showButton(modesAvail, storesAvail) {
    if (
      modesAvail === "Pick Up" ||
      modesAvail === "Self Courier" ||
      (modesAvail === "Return To Store" && storesAvail)
    ) {
      return (
        <Button
          width={175}
          style={styles.modesAvail}
          type="primary"
          label="SUBMIT"
          onClick={() => this.submit()}
        />
      );
    }
  }
  renderLoader() {
    return <Loader />;
  }
  render() {
    const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    // const customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
    // const userData = JSON.parse(userDetails);
    const userAccountDetails = JSON.parse(userDetails);
    const orderDetails = this.props.orderDetails;
    let returnFlow = this.props.returnFlow;
    const returnProductDetails = this.props.returnProductDetails;
    // Preventing user to open this page direct by hitting URL
    if (
      !this.props.location.state ||
      !this.props.location.state.authorizedRequest
    ) {
      return this.navigateToReturnLanding();
    }
    if (this.props && this.props.loadingForUpdateReturnConfirmation) {
      return this.renderLoader();
    }

    //const { productInfo } = this.props;
    const data = this.state.returnModesDetails;
    const returnStoreDetailsList =
      data &&
      data.returnStoreDetailsList &&
      Object.keys(data.returnStoreDetailsList);
    const returnLogisticsResponseDTO = data && data.returnLogisticsResponseDTO;
    let deliveryAddress;
    if (this.props.location.state.address) {
      deliveryAddress = this.props.location.state.address;
    } else {
      deliveryAddress = data.deliveryAddress;
    }
    // this.props.location.state.address || data.deliveryAddress;

    return (
      <React.Fragment>
        <div className={stylesCommon.base}>
          <div className={stylesCommon.holder}>
            <div className={stylesCommon.profileMenu}>
              <ProfileMenu {...this.props} />
            </div>
            <div className={stylesCommon.returnReasonDetail}>
              <div className={stylesCommon.returnReasonDetailHolder}>
                <React.Fragment>
                  <div className={stylesCommon.orderCardWrapper}>
                    <OrderCard
                      imageUrl={
                        returnProductDetails &&
                        returnProductDetails.orderProductWsDTO &&
                        returnProductDetails.orderProductWsDTO[0] &&
                        returnProductDetails.orderProductWsDTO[0].imageURL
                      }
                      productName={`${returnProductDetails &&
                        returnProductDetails.orderProductWsDTO &&
                        returnProductDetails.orderProductWsDTO[0] &&
                        returnProductDetails.orderProductWsDTO[0]
                          .productBrand} ${returnProductDetails &&
                        returnProductDetails.orderProductWsDTO &&
                        returnProductDetails.orderProductWsDTO[0] &&
                        returnProductDetails.orderProductWsDTO[0].productName}`}
                      price={
                        returnProductDetails &&
                        returnProductDetails.orderProductWsDTO &&
                        returnProductDetails.orderProductWsDTO[0] &&
                        returnProductDetails.orderProductWsDTO[0].price
                      }
                      isSelect={false}
                      quantity={true}
                      orderPlace={
                        orderDetails && orderDetails.orderDate
                          ? orderDetails &&
                            format(orderDetails.orderDate, dateFormat)
                          : this.props.orderPlace
                      }
                      orderId={this.props.orderId}
                      productSize={
                        this.props.orderDetails.products[0].productSize
                      }
                      productColourName={
                        this.props.orderDetails.products[0].productColourName
                      }
                      productBrand={
                        orderDetails && orderDetails.productBrand
                          ? orderDetails.productBrand
                          : returnProductDetails &&
                            returnProductDetails.orderProductWsDTO &&
                            returnProductDetails.orderProductWsDTO[0] &&
                            returnProductDetails.orderProductWsDTO[0]
                              .productBrand
                      }
                      onHollow={true}
                      returnFlow={returnFlow}
                      title={PRODUCT_CANCEL}
                      onClick={() =>
                        this.onClickImage(
                          orderDetails &&
                            orderDetails.orderProductWsDTO &&
                            orderDetails.orderProductWsDTO[0] &&
                            orderDetails.orderProductWsDTO[0].productcode
                        )
                      }
                      exchangeDetails={
                        data &&
                        data.products &&
                        data.products[0] &&
                        data.products[0].exchangeDetails
                      }
                      bundledAssociatedItems={
                        data && data.bundledAssociatedItems
                      }
                    >
                      {returnProductDetails &&
                        returnProductDetails.orderProductWsDTO &&
                        returnProductDetails.orderProductWsDTO[0] &&
                        returnProductDetails.orderProductWsDTO[0].quantity && (
                          <div className={styles.quantity}>
                            Qty{" "}
                            {returnProductDetails.orderProductWsDTO[0].quantity}
                          </div>
                        )}
                    </OrderCard>
                  </div>
                </React.Fragment>

                <div className={styles.base}>
                  {/* <MobileOnly>
          <div className={styles.header}>
            Select mode of return
            <div className={styles.cancel}>
              <UnderLinedButton
                label="Cancel"
                color="#ff1744"
                onClick={() => this.handleCancel()}
              />
            </div>
          </div>
          {this.props.onContinue && (
            <div className={styles.buttonHolder}>
              <div className={styles.button}>
                <Button
                  width={175}
                  type="primary"
                  label={this.props.buttonText}
                  onClick={() => this.handleContinue()}
                />
              </div>
            </div>
          )}
        </MobileOnly> */}
                  <div className={styles.content}>
                    {deliveryAddress && (
                      <div className={styles.card}>
                        <div className={styles.divideHeaderAddress}>
                          <div className={styles.returnModesHeading}>
                            Pickup Address:
                          </div>
                          <div
                            className={styles.changeAddress}
                            onClick={() => this.onChangeAddress()}
                          >
                            Change
                          </div>
                        </div>
                        <div className={styles.addressText}>
                          {deliveryAddress.line1} ,{deliveryAddress.landmark} ,
                          {deliveryAddress.town} ,&nbsp;
                          {deliveryAddress.state}, {deliveryAddress.postalCode}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className={styles.content}>
                    {this.isReturnModesEnabled() && (
                      <div className={styles.card}>
                        {!this.state.isModeSelected && (
                          <DesktopOnly>
                            <div className={styles.header}>
                              Select mode of return
                            </div>
                          </DesktopOnly>
                        )}
                        {data.returnModes.quickDrop &&
                          returnStoreDetailsList &&
                          returnStoreDetailsList.length > 0 && (
                            <div className={styles.returnModesDivider}>
                              <label className={styles.labelForRadioBtn}>
                                <input
                                  className={styles.radioBtn}
                                  type="radio"
                                  value="Return To Store"
                                  checked={
                                    this.state.selectedOption ===
                                    "Return To Store"
                                  }
                                  onChange={this.radioChange}
                                />
                                Return To Store
                              </label>
                              <span className={styles.calloutForReturnModes}>
                                You can visit the nearest store to return the
                                product
                              </span>
                            </div>
                          )}
                        {data.returnModes.schedulePickup && (
                          <div className={styles.returnModesDivider}>
                            <label className={styles.labelForRadioBtn}>
                              <input
                                className={styles.radioBtn}
                                type="radio"
                                value="Pick Up"
                                checked={
                                  this.state.selectedOption === "Pick Up"
                                }
                                onChange={this.radioChange}
                              />
                              Pickup
                            </label>
                            <span className={styles.calloutForReturnModes}>
                              Our logistics partner will pick up the product
                            </span>
                          </div>
                        )}
                        {data.returnModes.selfCourier &&
                          returnLogisticsResponseDTO.length > 0 && (
                            <div className={styles.returnModesDivider}>
                              <label className={styles.labelForRadioBtn}>
                                <input
                                  className={styles.radioBtn}
                                  type="radio"
                                  value="Self Courier"
                                  checked={
                                    this.state.selectedOption === "Self Courier"
                                  }
                                  onChange={this.radioChange}
                                />
                                Self Courier
                              </label>
                              <span className={styles.radioBtnSubText}>
                                {
                                  returnLogisticsResponseDTO[0]
                                    .responseDescription
                                }
                              </span>
                            </div>
                          )}
                        {/* {!this.state.isModeSelected && (
								<div className={styles.returnModesWithBorder}>
									{data.returnModes.quickDrop &&
										!this.state.isModeSelected && (
											<SelectReturnDate
												label="Return to store"
												selected={this.state.selectedMode === QUICK_DROP}
												selectItem={() => {
													this.handleSelect(QUICK_DROP);
												}}
											/>
										)}
									{data.returnModes.schedulePickup &&
										!this.state.isModeSelected && (
											<SelectReturnDate
												label="Tata CliQ Pick Up"
												selectItem={() => {
													this.handleSelect(SCHEDULED_PICKUP);
												}}
												selected={this.state.selectedMode === SCHEDULED_PICKUP}
											/>
										)}
									{data.returnModes.selfCourier &&
										!this.state.isModeSelected && (
											<SelectReturnDate
												selectItem={() => {
													this.handleSelect(SELF_COURIER);
												}}
												label="Self Courier"
												selected={this.state.selectedMode === SELF_COURIER}
											/>
										)}
								</div>
							)} */}

                        {/* <DesktopOnly>
								{this.state.selectedMode === QUICK_DROP && (
									<ReturnToStoreContainer
										{...this.state}
										{...this.props}
										selectReturnMode={() => this.selectReturnMode()}
										cancelReturnMode={() => this.cancelReturnMode()}
										onChangeBankDetails={val => this.onChangeBankDetails(val)}
									/>
								)}
								{this.state.selectedMode === SCHEDULED_PICKUP && (
									<ReturnCliqAndPiqContainer
										{...this.state}
										{...this.props}
										selectReturnMode={() => this.selectReturnMode()}
										cancelReturnMode={() => this.cancelReturnMode()}
										onChangeBankDetails={val => this.onChangeBankDetails(val)}
									/>
								)}
								{this.state.selectedMode === SELF_COURIER && (
									<SelfCourierContainer {...this.state} {...this.props} />
								)}
							</DesktopOnly> */}
                      </div>
                    )}
                    {!this.isReturnModesEnabled() && <Loader />}
                  </div>
                  {/* {this.isReturnModesEnabled() &&
                    this.state.selectedOption === "Self Courier" &&
                    returnLogisticsResponseDTO.length > 0 && (
                      <div className={styles.content}>
                        <div className={styles.card}>
                          <div className={styles.subText}>
                            {returnLogisticsResponseDTO[0].responseMessage}
                          </div>
                          <div className={styles.button}>
                            <Button
                              width={175}
                              type="primary"
                              label="Download Form"
                              onClick={() =>
                                this.downloadFile(data.selfCourierDocumentLink)
                              }
                            />
                          </div>
                        </div>
                      </div>
                    )} */}

                  {this.isReturnModesEnabled() &&
                    this.state.selectedOption === "Return To Store" &&
                    returnStoreDetailsList &&
                    returnStoreDetailsList.length > 0 && (
                      <div className={styles.content}>
                        <div className={styles.card}>
                          <div className={styles.returnModesHeading}>
                            Select store
                          </div>
                          {data &&
                            data.returnStoreDetailsList.map((value, index) => {
                              return (
                                <label
                                  className={styles.labelForRadioBtn}
                                  key={index}
                                >
                                  <input
                                    className={styles.radioBtn}
                                    type="radio"
                                    value={value.address.id}
                                    data-address={JSON.stringify(value)}
                                    checked={
                                      this.state.selectedOptionStores ===
                                      value.address.id
                                    }
                                    onChange={this.radioChangeStores}
                                  />
                                  <div
                                    key={index}
                                    className={styles.storeAddress}
                                  >
                                    <div className={styles.storeName}>
                                      {value.displayName}
                                    </div>
                                    <div className={styles.addressFormat}>
                                      {value.address.formattedAddress}
                                    </div>
                                    <div className={styles.storeDateNTime}>
                                      Open:{" "}
                                      <span className={styles.OpeningDateTime}>
                                        {value.mplOpeningTime} -{" "}
                                        {value.mplClosingTime}
                                      </span>
                                    </div>
                                  </div>
                                </label>
                              );
                            })}
                        </div>
                      </div>
                    )}

                  {this.state.selectedOption && (
                    <div className={styles.buttonHolder}>
                      <div className={styles.submitButton}>
                        {this.showButton(
                          this.state.selectedOption,
                          this.state.selectedOptionStores
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className={stylesCommon.userProfile}>
              <UserProfile
                image={userAccountDetails.imageUrl}
                userLogin={userAccountDetails.userName}
                loginType={userAccountDetails.loginType}
                firstName={
                  userAccountDetails &&
                  userAccountDetails.firstName &&
                  userAccountDetails.firstName.trim().charAt(0)
                }
                heading={
                  userAccountDetails &&
                  userAccountDetails.firstName &&
                  `${userAccountDetails.firstName} `
                }
                lastName={
                  userAccountDetails &&
                  userAccountDetails.lastName &&
                  `${userAccountDetails.lastName}`
                }
                userAddress={this.props.userAddress}
              />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
ReturnModes.propTypes = {
  selectedMode: PropTypes.oneOf([QUICK_DROP, SCHEDULED_PICKUP, SELF_COURIER]),
  selectMode: PropTypes.func
};
