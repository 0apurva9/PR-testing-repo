import React from "react";
import { Redirect } from "react-router-dom";
import PiqPage from "../../cart/components/PiqPage";
import CliqAndPiqForReturn from "./CliqAndPiqForReturn.js";
import Loader from "../../general/components/Loader";
import ReturnStoreConfirmation from "./ReturnStoreConfirmation.js";
import * as styles from "./ReturnToStore.css";
import MobileOnly from "../../general/components/MobileOnly.js";
import DesktopOnly from "../../general/components/DesktopOnly.js";
import { checkUserAgentIsMobile } from "../../lib/UserAgent.js";
import SearchLocationByPincode from "../../cart/components/SearchLocationByPincode";
import PickUpLocation from "../../cart/components/PickUpLocation";
import GridSelect from "../../general/components/GridSelect.js";
import DumbGrid from "../../general/components/DumbGrid";
import UnderLinedButton from "../../general/components/UnderLinedButton";
import Button from "../../general/components/Button";
import {
  RETURNS_PREFIX,
  RETURN_TO_STORE,
  RETURNS_STORE_FINAL,
  RETURN_LANDING,
  RETURNS_REASON,
  QUICK_DROP,
  DEFAULT_PIN_CODE_LOCAL_STORAGE,
  YES,
  NO
} from "../../lib/constants";
const REG_X_FOR_STORE_PICKUP = /storePick/i;
const REG_X_FOR_FINAL_SUBMIT = /submit/i;

export default class ReturnToStore extends React.Component {
  constructor(props) {
    super(props);
    this.orderCode = props.location.pathname.split("/")[2];
    this.state = {
      currentActive: 0,
      storeId: null,
      pincode:
        this.props.returnRequest.deliveryAddressesList &&
        this.props.returnRequest.deliveryAddressesList[0] &&
        this.props.returnRequest.deliveryAddressesList[0].postalCode
          ? this.props.returnRequest.deliveryAddressesList &&
            this.props.returnRequest.deliveryAddressesList[0] &&
            this.props.returnRequest.deliveryAddressesList[0].postalCode
          : "",
      isStoreSelected: false
    };
  }

  componentDidMount() {
    if (
      this.props.returnRequest.deliveryAddressesList &&
      this.props.returnRequest.deliveryAddressesList[0] &&
      this.props.returnRequest.deliveryAddressesList[0].postalCode
    ) {
      this.quickDropStore(
        this.props.returnRequest.deliveryAddressesList &&
          this.props.returnRequest.deliveryAddressesList[0] &&
          this.props.returnRequest.deliveryAddressesList[0].postalCode
      );
    }
  }

  selectStore(storeId) {
    if (checkUserAgentIsMobile()) {
      this.setState({ storeId }, () => {
        this.props.history.push({
          pathname: `${RETURNS_PREFIX}/${
            this.orderCode
          }${RETURN_TO_STORE}${RETURNS_STORE_FINAL}`,
          state: {
            authorizedRequest: true
          }
        });
      });
    } else {
      this.setState({ isStoreSelected: true, storeId });
    }
  }
  // i am using this function becasue of on pincode section i don't have any
  // update button we ll change this function when we ll have update button
  getLocation() {
    if (this.state.pincode && this.state.pincode.length === 6) {
      const ussId = this.props.returnProductDetails.orderProductWsDTO[0].USSID;
      this.props.quickDropStore(this.state.pincode, ussId);
    }
  }

  cancel = () => {
    this.props.history.goBack();
  };

  finalSubmit() {
    // submit form here
    const product = this.props.returnProductDetails.orderProductWsDTO[0];
    const productObj = Object.assign(
      {},
      {
        orderCode: this.orderCode,
        transactionId: product.transactionId,
        ussid: product.USSID,
        transactionType: "01",
        refundType: "R",
        isCODorder: this.props.isCOD ? YES : NO,
        returnMethod: QUICK_DROP,
        storeIds: this.state.storeId
      }
    );
    if (this.props.bankDetail.accountNumber) {
      Object.assign(productObj, {
        accountNumber: this.props.bankDetail.accountNumber,
        reEnterAccountNumber: this.props.bankDetail.reEnterAccountNumber,
        accountHolderName: this.props.bankDetail.userName,
        bankName: this.props.bankDetail.bankName,
        IFSCCode: this.props.bankDetail.code
      });
    }
    if (this.props.data) {
      Object.assign(productObj, {
        subReasonCode: this.props.data.subReasonCode,
        returnReasonCode: this.props.data.returnReasonCode,
        comment: this.props.data.comment
      });
    }
    // here we are product object has all data we we need to send in api for return product
    // and product is actual object
    this.props.newReturnInitial(productObj, product);
  }
  renderLoader() {
    return <Loader />;
  }
  navigateToReturnLanding() {
    return (
      <Redirect
        to={`${RETURNS_PREFIX}/${
          this.orderCode
        }${RETURN_LANDING}${RETURNS_REASON}`}
      />
    );
  }

  quickDropStore = pincode => {
    this.setState({ pincode, isStoreSelected: false });
    if (pincode.length === 6) {
      this.props.quickDropStore(
        pincode,
        this.props.returnProductDetails.orderProductWsDTO[0].USSID
      );
    }
  };

  handleContinue = () => {
    if (this.state.storeId) {
      this.setState({ isStoreSelected: true });
    }
  };
  handleCancel = () => {
    this.setState({ isStoreSelected: false });
  };
  render() {
    // Preventing user to open this page direct by hitting URL
    if (
      !this.props.location.state ||
      !this.props.location.state.authorizedRequest
    ) {
      return this.navigateToReturnLanding();
    }
    let noOfStories = 0;

    if (
      this.props.returnRequest &&
      this.props.returnRequest.returnStoreDetailsList
    ) {
      noOfStories = this.props.returnRequest.returnStoreDetailsList.length;
    }

    if (
      !this.props.returnRequest ||
      !this.props.returnProductDetails ||
      this.props.loading
    ) {
      return this.renderLoader();
    }

    const { pathname } = this.props.location;
    const renderStoresMap = (
      <React.Fragment>
        <MobileOnly>
          <PiqPage
            {...this.props}
            productName={
              this.props.returnProductDetails.orderProductWsDTO[0].productName
            }
            productColour={
              this.props.returnProductDetails.orderProductWsDTO[0].productColour
            }
            availableStores={this.props.returnRequest.returnStoreDetailsList}
            numberOfStores={noOfStories}
            pincode={this.state.pincode}
            addStoreCNC={storeId => this.selectStore(storeId)}
            changePincode={pincode => this.quickDropStore(pincode)}
            getLocation={() => this.getLocation()}
          />
        </MobileOnly>
        <DesktopOnly>
          <CliqAndPiqForReturn
            availableStores={this.props.returnRequest.returnStoreDetailsList}
            numberOfStores={noOfStories}
          />
          <div className={styles.location}>
            <div className={styles.locationWithPincode}>
              <SearchLocationByPincode
                header={`${
                  this.props.returnProductDetails.orderProductWsDTO[0]
                    .productName
                    ? this.props.returnProductDetails.orderProductWsDTO[0]
                        .productName
                    : ""
                } ${
                  this.props.returnProductDetails.orderProductWsDTO[0]
                    .productColour
                    ? this.props.returnProductDetails.orderProductWsDTO[0]
                        .productColour
                    : ""
                }`}
                pincode={this.state.pincode}
                changePincode={pincode => this.quickDropStore(pincode)}
              />
            </div>
          </div>
          {this.props.returnRequest &&
            this.props.returnRequest.returnStoreDetailsList &&
            !this.props.showPickupPerson && (
              <div className={styles.addressDetail}>
                <DumbGrid limit={1} offset={0} elementWidthDesktop={100}>
                  {this.props.returnRequest.returnStoreDetailsList.map(
                    (val, i) => {
                      console.log(val);
                      return (
                        <PickUpLocation
                          key={i}
                          slaveId={val.slaveId}
                          address={`${val.address.line1} ${
                            val.address.line2
                          }, `}
                          PickUpKey="Open on: "
                          workingDays={val.mplWorkingDays}
                          openingTime={val.mplOpeningTime}
                          closingTime={val.mplClosingTime}
                          address2={`${val.returnCity} ${val.returnPin}`}
                          headingText={val.displayName}
                          buttonText="Select"
                          canSelectStore={this.props.canSelectStore}
                          handleClickForDesktop={val =>
                            this.setState({ storeId: val })
                          }
                          selectedId={this.state.storeId}
                        />
                      );
                    }
                  )}
                </DumbGrid>
              </div>
            )}
        </DesktopOnly>
      </React.Fragment>
    );

    const renderFinalSubmit = (
      <ReturnStoreConfirmation
        {...this.props}
        orderDetails={this.props.orderDetails}
        onContinue={() => this.finalSubmit()}
        cancel={() => this.cancel()}
      />
    );
    return (
      <div className={styles.base}>
        <DesktopOnly>
          {!this.state.isStoreSelected && renderStoresMap}
          {this.state.isStoreSelected && renderFinalSubmit}
        </DesktopOnly>
        <MobileOnly>
          {pathname.match(REG_X_FOR_STORE_PICKUP) && renderStoresMap}
          {pathname.match(REG_X_FOR_FINAL_SUBMIT) && renderFinalSubmit}
        </MobileOnly>
      </div>
    );
  }
}
