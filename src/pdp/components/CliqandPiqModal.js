import React from "react";
import CliqAndPiqMap from "../../account/components/CliqAndPiqMap.js";
import SearchLocationByPincode from "../../cart/components/SearchLocationByPincode";
import styles from "./CliqAndPiqModal.css";
import GridSelect from "../../general/components/GridSelect.js";
import PickUpLocation from "../../cart/components/PickUpLocation.js";
import GetLocationDetails from "../../cart/components/GetLocationDetails.js";
import { checkUserAgentIsMobile } from "../../lib/UserAgent.js";
import PickUpDetails from "../../cart/components/PickUpDetails.js";
import Button from "../../general/components/Button";
import { SELECTED_STORE } from "../../lib/constants.js";
import {
  setDataLayerForCartDirectCalls,
  ADOBE_DIRECT_CALL_FOR_SELECT_STORE
} from "../../lib/adobeUtils";
export default class ReturnToStore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: 28.6129918,
      lng: 77.2310456,
      availableStores: [],
      storeId: null,
      showPickupPerson: false,
      selectedStore: null,
      selectedStoreId: null,
      mobile: this.props.userDetails && this.props.userDetails.mobileNumber,
      name: this.props.userDetails && this.props.userDetails.firstName
    };
    this.scrollToView = React.createRef();
  }

  selectStoreForDesktop = val => {
    if (val.length === 0 && !this.state.showPickupPerson) {
      this.setState({ storeId: null });
    }
    if (val.length > 0 && !this.state.showPickupPerson) {
      let selectedStore =
        this.state.availableStores &&
        this.state.availableStores.find(store => {
          return store.slaveId === val[0];
        });

      this.setState({ selectedStore: selectedStore });
      const lat = selectedStore && selectedStore.geoPoint.latitude;
      const lng = selectedStore && selectedStore.geoPoint.longitude;
      const storeId = selectedStore && selectedStore.slaveId;
      // if (
      //   selectedStore.address &&
      //   (this.props.from === "Pdp" || this.props.from === "Cart")
      // ) {
      // localStorage.setItem(
      //   SELECTED_STORE,
      //   `{"address": "${selectedStore.displayName}, ${
      //     selectedStore.address.line1
      //   } ${selectedStore.address.line2}, ${selectedStore.address.city} ${
      //     selectedStore.address.postalCode
      //   }", "storeId": "${storeId}"}`
      // );
      // }
      this.setState({
        lat,
        lng,
        storeId
      });
    }
  };

  selectStoreButtonForDesktop = () => {
    if (this.props.from === "Checkout") {
      let element = this.scrollToView;
      element.scrollTop = 0;
      if (this.props.addStoreCNC && this.state.storeId) {
        this.setState({ showPickupPerson: true });
        this.props.addStoreCNC(this.state.storeId);
      }
    } else {
      if (this.state.selectedStore && this.state.storeId) {
        let selectedStore = this.state.selectedStore;
        let productListingId =
          this.props.productDetails &&
          this.props.productDetails.productListingId;
        let ussId = this.props.winningUssID;
        let selectedStorefromStorage = JSON.parse(
          localStorage.getItem(SELECTED_STORE)
        );
        let selectedStoreLength =
          selectedStorefromStorage && selectedStorefromStorage.length;
        let storeFind =
          selectedStorefromStorage &&
          selectedStorefromStorage.find(store => {
            return store.ussId === ussId;
          });
        if (selectedStoreLength > 0 && !storeFind) {
          selectedStorefromStorage.push({
            address: `${selectedStore.displayName}, ${
              selectedStore.address.line1
            } ${selectedStore.address.line2}, ${selectedStore.address.city} ${
              selectedStore.address.postalCode
            }`,
            storeId: `${selectedStore.slaveId}`,
            ussId: `${ussId}`,
            productcode: `${productListingId}`,
            sellerId: `${selectedStore.sellerId}`,
            pincode: this.props.pincode
          });
          localStorage.setItem(
            SELECTED_STORE,
            JSON.stringify(selectedStorefromStorage)
          );
        } else if (selectedStoreLength > 0 && storeFind) {
          let storeIndex = selectedStorefromStorage.findIndex(
            x => x.ussId === ussId
          );

          selectedStorefromStorage.splice(storeIndex, 1);

          selectedStorefromStorage.push({
            address: `${selectedStore.displayName}, ${
              selectedStore.address.line1
            } ${selectedStore.address.line2}, ${selectedStore.address.city} ${
              selectedStore.address.postalCode
            }`,
            storeId: `${selectedStore.slaveId}`,
            ussId: `${ussId}`,
            productcode: `${productListingId}`,
            sellerId: `${selectedStore.sellerId}`,
            pincode: this.props.pincode
          });

          localStorage.setItem(
            SELECTED_STORE,
            JSON.stringify(selectedStorefromStorage)
          );
        } else {
          localStorage.setItem(
            SELECTED_STORE,
            JSON.stringify([
              {
                address: `${selectedStore.displayName}, ${
                  selectedStore.address.line1
                } ${selectedStore.address.line2}, ${
                  selectedStore.address.city
                } ${selectedStore.address.postalCode}`,
                storeId: `${selectedStore.slaveId}`,
                ussId: `${ussId}`,
                productcode: `${productListingId}`,
                sellerId: `${selectedStore.sellerId}`,
                pincode: this.props.pincode
              }
            ])
          );
        }
        this.props.CloseCliqAndPiqModal();
      }
    }
  };

  getPinCodeDetails = async pinCode => {
    if (this.props.getProductPinCode) {
      await this.props.getProductPinCode(
        pinCode,
        this.props.productDetails.productListingId,
        this.props.productDetails.winningUssID
      );
    }
    if (this.props.getAllStoresForCliqAndPiq) {
      this.props.getAllStoresForCliqAndPiq(pinCode);
    }
  };

  CloseCliqAndPiqModal = () => {
    if (this.props.CloseCliqAndPiqModal) {
      this.props.CloseCliqAndPiqModal();
    }
  };

  async componentDidUpdate(nextProps) {
    if (
      this.props.stores !== nextProps.stores &&
      this.props.from === "Checkout"
    ) {
      await this.getAvailableStores();
      // If user selected store on PDP page or cart page then automatically
      // selects store on checkout page
      let selectedStore = JSON.parse(localStorage.getItem(SELECTED_STORE));
      let ussId = this.props.winningUssID
        ? this.props.winningUssID
        : this.props.productDetails && this.props.productDetails.USSID
          ? this.props.productDetails.USSID
          : null;
      let storeDetails =
        selectedStore &&
        selectedStore.find(store => {
          return store.ussId === ussId;
        });
      if (
        storeDetails &&
        storeDetails.storeId &&
        storeDetails.pincode === this.props.pincode
      ) {
        await this.selectStoreForDesktop([storeDetails.storeId]);
        this.selectStoreButtonForDesktop();
      }
    }
  }

  async componentDidMount() {
    await this.getAvailableStores();
    let selectedStore = JSON.parse(localStorage.getItem(SELECTED_STORE));
    if (
      this.props.from === "Checkout" &&
      (selectedStore && selectedStore.length > 0) &&
      this.state.storeId
    ) {
      this.setState({ showPickupPerson: true });
    }

    if (this.props.getUserDetails) {
      this.props.getUserDetails();
    }

    if (
      this.props.from !== "Checkout" &&
      selectedStore &&
      selectedStore.length > 0
    ) {
      let ussId = this.props.winningUssID
        ? this.props.winningUssID
        : this.props.productDetails && this.props.productDetails.USSID
          ? this.props.productDetails.USSID
          : null;
      let storeDetails =
        selectedStore &&
        selectedStore.find(store => {
          return store.ussId === ussId;
        });
      if (
        storeDetails &&
        storeDetails.storeId &&
        storeDetails.pincode === this.props.pincode
      ) {
        await this.selectStoreForDesktop([storeDetails.storeId]);
      }
    }
  }

  getAvailableStores() {
    let firstSlaveData;
    if (this.props.productDetails.slaveData) {
      firstSlaveData = this.props.productDetails.slaveData;
    } else {
      firstSlaveData = this.props.productDetails.pinCodeResponse
        .validDeliveryModes;
    }

    const someData = firstSlaveData
      .map(slaves => {
        return (
          slaves.CNCServiceableSlavesData &&
          slaves.CNCServiceableSlavesData.map(slave => {
            return slave && slave.storeId;
          })
        );
      })
      .map(val => {
        return (
          val &&
          val.map(v => {
            return v;
          })
        );
      });
    // const allStoreIds = [].concat
    //   .apply([], [].concat.apply([], someData))
    //   .map(store => {
    //     return store && store.slaveId;
    //   });
    const allStoreIds = [].concat.apply([], someData).map(store => {
      return store;
    });
    const availableStores = this.props.stores
      ? this.props.stores.filter(val => {
          return allStoreIds.includes(val.slaveId) && val.clicknCollect === "Y";
        })
      : [];
    const lat =
      availableStores &&
      availableStores[0] &&
      availableStores[0].geoPoint.latitude;
    const lng =
      availableStores &&
      availableStores[0] &&
      availableStores[0].geoPoint.longitude;
    if (checkUserAgentIsMobile()) {
      this.setState({
        availableStores: availableStores,
        lat,
        lng,
        storeId:
          availableStores && availableStores[0] && availableStores[0].slaveId,
        selectedStore: availableStores[0]
      });
    } else {
      this.setState({
        availableStores: availableStores,
        lat,
        lng,
        storeId:
          availableStores && availableStores[0] && availableStores[0].slaveId,
        selectedStore: availableStores[0]
      });
    }
  }

  getValue(val) {
    this.setState(val);
  }

  handleSubmit() {
    setDataLayerForCartDirectCalls(ADOBE_DIRECT_CALL_FOR_SELECT_STORE);
    if (this.props.addPickupPersonCNC) {
      this.props.addPickupPersonCNC(this.state.mobile, this.state.name);
      if (
        this.state.selectedStore &&
        this.state.selectedStore.address &&
        this.props.from !== "Pdp"
      ) {
        let selectedStore = this.state.selectedStore;
        let productListingId =
          this.props.productDetails && this.props.productDetails.productcode;
        let ussId = this.props.productDetails.USSID;
        let selectedStorefromStorage = JSON.parse(
          localStorage.getItem(SELECTED_STORE)
        );
        let selectedStoreLength =
          selectedStorefromStorage && selectedStorefromStorage.length;
        let storeFind =
          selectedStorefromStorage &&
          selectedStorefromStorage.find(store => {
            return store.ussId === ussId;
          });

        if (selectedStoreLength > 0 && !storeFind) {
          selectedStorefromStorage.push({
            address: `${selectedStore.displayName}, ${
              selectedStore.address.line1
            } ${selectedStore.address.line2}, ${selectedStore.address.city} ${
              selectedStore.address.postalCode
            }`,
            storeId: `${selectedStore.slaveId}`,
            ussId: `${ussId}`,
            productcode: `${productListingId}`,
            sellerId: `${selectedStore.sellerId}`,
            pincode: this.props.pincode
          });

          localStorage.setItem(
            SELECTED_STORE,
            JSON.stringify(selectedStorefromStorage)
          );
        } else if (selectedStoreLength > 0 && storeFind) {
          let storeIndex = selectedStorefromStorage.findIndex(
            x => x.ussId === ussId
          );

          selectedStorefromStorage.splice(storeIndex, 1);

          selectedStorefromStorage.push({
            address: `${selectedStore.displayName}, ${
              selectedStore.address.line1
            } ${selectedStore.address.line2}, ${selectedStore.address.city} ${
              selectedStore.address.postalCode
            }`,
            storeId: `${selectedStore.slaveId}`,
            ussId: `${ussId}`,
            productcode: `${productListingId}`,
            sellerId: `${selectedStore.sellerId}`,
            pincode: this.props.pincode
          });

          localStorage.setItem(
            SELECTED_STORE,
            JSON.stringify(selectedStorefromStorage)
          );
        } else {
          localStorage.setItem(
            SELECTED_STORE,
            JSON.stringify([
              {
                address: `${selectedStore.displayName}, ${
                  selectedStore.address.line1
                } ${selectedStore.address.line2}, ${
                  selectedStore.address.city
                } ${selectedStore.address.postalCode}`,
                storeId: `${selectedStore.slaveId}`,
                ussId: `${ussId}`,
                productcode: `${productListingId}`,
                sellerId: `${selectedStore.sellerId}`,
                pincode: this.props.pincode
              }
            ])
          );
        }
      }
    }
  }

  changeStore() {
    this.setState({
      showPickupPerson: false,
      selectedStore: null,
      lat: 28.6129918,
      lng: 77.2310456,
      storeId: null
    });
    if (this.props.mergeTempCartWithOldCart) {
      this.props.mergeTempCartWithOldCart();
    }
  }

  render() {
    let getDeliveryModesByWinningUssid = "";
    let ctaLable = "Continue";
    if (!this.props.isFromCheckOut) {
      if (
        this.props &&
        this.props.pincodeResponseList &&
        this.props.pincodeResponseList.deliveryOptions &&
        this.props.pincodeResponseList.deliveryOptions.pincodeListResponse
      ) {
        getDeliveryModesByWinningUssid = this.props.pincodeResponseList.deliveryOptions.pincodeListResponse.find(
          val => {
            return val.ussid === this.props.winningUssID;
          }
        );
      }
      ctaLable = "Select";
    }
    if (!this.state.availableStores) {
      return (
        <div className={styles.base}>
          <div className={styles.loadingIndicator} />
        </div>
      );
    } else {
      return (
        <div className={styles.base}>
          <div className={styles.mapButton}>
            <div className={styles.cliqPiqText}>CliQ n PiQ</div>
            <div
              className={styles.closeButton}
              onClick={() => this.CloseCliqAndPiqModal()}
            />
          </div>
          <div className={styles.mapDesktopWithPincode}>
            <div className={styles.mapDesktop}>
              <CliqAndPiqMap
                availableStores={this.state.availableStores}
                lat={this.state.lat}
                lng={this.state.lng}
                storeClick={val => this.selectStoreForDesktop(val)}
              />
            </div>
            <div className={styles.storeListForDesktop} ref={this.scrollToView}>
              <div className={styles.searchPincode}>
                <SearchLocationByPincode
                  header={`${
                    this.props.productDetails &&
                    this.props.productDetails.productName
                      ? this.props.productDetails.productName
                      : ""
                  } ${
                    this.props.productDetails &&
                    this.props.productDetails.productColour
                      ? this.props.productDetails.productColour
                      : ""
                  }`}
                  disabled={this.props.pinCodeUpdateDisabled}
                  pincode={this.props.pincode}
                  ServiceablePincode={
                    this.props.productDetails &&
                    this.props.productDetails.isServiceableToPincode &&
                    this.props.productDetails.isServiceableToPincode.pinCode
                  }
                  changePincode={pincode => this.getPinCodeDetails(pincode)}
                />
              </div>
              {!this.state.showPickupPerson &&
                this.state.availableStores &&
                Object.keys(this.state.availableStores).length > 0 && (
                  <React.Fragment>
                    <GridSelect
                      limit={1}
                      offset={0}
                      elementWidthDesktop={100}
                      onSelect={val => this.selectStoreForDesktop(val)}
                      selected={[this.state.storeId]}
                    >
                      {this.state.availableStores.map((val, i) => {
                        return (
                          <PickUpLocation
                            key={i}
                            count={i + 1}
                            address={`${val.address &&
                              val.address.line1} ${val.address &&
                              val.address.line2}, `}
                            preventSelection={this.props.preventSelection}
                            PickUpKey="Open on: "
                            workingDays={val.mplWorkingDays}
                            openingTime={val.mplOpeningTime}
                            closingTime={val.mplClosingTime}
                            address2={`${val.returnCity} ${val.returnPin}`}
                            headingText={val.displayName}
                            value={val.slaveId}
                            canSelectStore={this.props.canSelectStore}
                            slaveId={val.slaveId}
                            deliveryInformationWithDate={
                              this.props.fromSellersPage
                                ? this.props.productDetails &&
                                  this.props.productDetails.slaveData
                                : this.props.pincodeResponse
                                  ? this.props.pincodeResponse
                                  : this.props.pincodeResponseList &&
                                    getDeliveryModesByWinningUssid &&
                                    getDeliveryModesByWinningUssid.validDeliveryModes
                            }
                          />
                        );
                      })}
                    </GridSelect>
                    <div
                      className={
                        !this.state.showPickupPerson
                          ? styles.buttonContainer
                          : styles.visiblityHidden
                      }
                      style={
                        Object.keys(this.state.availableStores).length === 1
                          ? { position: "absolute" }
                          : null
                      }
                      onClick={() => this.selectStoreButtonForDesktop()}
                    >
                      <div className={styles.button}>
                        <Button
                          type="primary"
                          label={ctaLable}
                          color="#fff"
                          width={121}
                          backgroundColor={
                            !this.state.storeId ? "#989898" : "#FF1744"
                          }
                          disabled={!this.state.storeId}
                        />
                      </div>
                    </div>
                  </React.Fragment>
                )}
              {this.state.showPickupPerson &&
                this.state.selectedStore && (
                  <div className={styles.getLocationDetailsHolder}>
                    <div className={styles.getLocationDetails}>
                      <GetLocationDetails
                        changeLocation={() => {
                          this.changeStore();
                        }}
                        headingText={this.state.selectedStore.displayName}
                        address={`${this.state.selectedStore.returnAddress1} ${
                          this.state.selectedStore.returnAddress2
                        } ${this.state.selectedStore.returnCity}`}
                        pickUpKey="Open on: "
                        pickUpValue={this.state.selectedStore.selectedStoreTime}
                        workingDays={this.state.selectedStore.mplWorkingDays}
                        openingTime={this.state.selectedStore.mplOpeningTime}
                        closingTime={this.state.selectedStore.mplClosingTime}
                        pincodeDetails={
                          this.props.isFromCheckOut
                            ? this.props.pincodeResponse
                            : getDeliveryModesByWinningUssid
                        }
                        selectedSlaveId={this.state.selectedStore.slaveId}
                        isFromCheckOut={this.props.isFromCheckOut}
                      />
                    </div>
                    <div className={styles.pickUpDetails}>
                      <PickUpDetails
                        getValue={val => this.getValue(val)}
                        onSubmit={() => this.handleSubmit()}
                        name={this.state.name}
                        mobile={this.state.mobile}
                      />
                    </div>
                  </div>
                )}
            </div>
          </div>
        </div>
      );
    }
  }
}
ReturnToStore.defaultProps = {
  isFromCheckOut: false
};
