import React from "react";
import { Redirect } from "react-router-dom";
import PiqPage from "../../cart/components/PiqPage";
import CliqAndPiqMap from "../../account/components/CliqAndPiqMap.js";
import SearchLocationByPincode from "../../cart/components/SearchLocationByPincode";
import find from "lodash.find";
import styles from "./CliqAndPiqModal.css";
import DesktopOnly from "../../general/components/DesktopOnly";
import MobileOnly from "../../general/components/MobileOnly";
import GridSelect from "../../general/components/GridSelect.js";
import PickUpLocation from "../../cart/components/PickUpLocation.js";
import GetLocationDetails from "../../cart/components/GetLocationDetails.js";
import Button from "../../general/components/Button.js";
import SecondaryLoader from "../../general/components/SecondaryLoader";
import { checkUserAgentIsMobile } from "../../lib/UserAgent.js";
import PickUpDetails from "../../cart/components/PickUpDetails.js";
import {
  RETURNS_PREFIX,
  RETURN_TO_STORE,
  RETURNS_STORE_FINAL,
  RETURN_LANDING,
  RETURNS_REASON,
  QUICK_DROP,
  DEFAULT_PIN_CODE_LOCAL_STORAGE,
  YES,
  NO,
  THANK_YOU
} from "../../lib/constants";
const REG_X_FOR_STORE_PICKUP = /storePick/i;
const REG_X_FOR_FINAL_SUBMIT = /submit/i;
const ERROR_MESSAGE = "Please select Store";
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
      mobile: this.props.userDetails && this.props.userDetails.mobileNumber,
      name: this.props.userDetails && this.props.userDetails.firstName
    };
  }

  selectStoreForDesktop = val => {
    if (val.length > 0) {
      let selectedStore =
        this.state.availableStores &&
        this.state.availableStores.find(store => {
          return store.slaveId === val[0];
        });
      this.setState({ selectedStore: selectedStore });

      const lat = selectedStore && selectedStore.geoPoint.latitude;
      const lng = selectedStore && selectedStore.geoPoint.longitude;
      const storeId = selectedStore && selectedStore.slaveId;

      this.setState({
        lat,
        lng,
        storeId
      });
    }

    if (this.props.from === "Checkout") {
      if (this.props.addStoreCNC) {
        this.setState({ showPickupPerson: true });
        this.props.addStoreCNC(val[0]);
      }
    }
  };

  getPinCodeDetails = pinCode => {
    if (this.props.getAllStoresForCliqAndPiq) {
      this.props.getAllStoresForCliqAndPiq(pinCode);
    }
  };
  CloseCliqAndPiqModal = () => {
    if (this.props.CloseCliqAndPiqModal) {
      this.props.CloseCliqAndPiqModal();
    }
  };
  componentDidUpdate(nextProps) {
    if (this.props.stores !== nextProps.stores) {
      this.getAvailableStores();
    }
  }
  componentDidMount() {
    this.getAvailableStores();
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
            return (
              slave &&
              slave.serviceableSlaves.map(serviceableSlave => {
                return serviceableSlave;
              })
            );
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

    const allStoreIds = [].concat
      .apply([], [].concat.apply([], someData))
      .map(store => {
        return store && store.slaveId;
      });
    const availableStores = this.props.stores
      ? this.props.stores.filter(val => {
          return allStoreIds.includes(val.slaveId);
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

    this.setState({
      availableStores: availableStores,
      lat,
      lng,
      storeId:
        availableStores && availableStores[0] && availableStores[0].slaveId,
      selectedStore: availableStores[0]
    });
  }
  getValue(val) {
    this.setState(val);
  }

  handleSubmit() {
    if (this.props.addPickupPersonCNC) {
      this.props.addPickupPersonCNC(this.state.mobile, this.state.name);
    }
  }

  changeStore() {
    this.setState({
      showPickupPerson: false,
      selectedStore: null
    });
  }

  render() {
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
            <div className={styles.closeButton}>
              <Button
                type="hollow"
                height={40}
                label={"Close"}
                width={150}
                color={"#fff"}
                textStyle={{ color: "#212121", fontSize: 14 }}
                onClick={() => this.CloseCliqAndPiqModal()}
              />
            </div>
          </div>
          <div className={styles.mapDesktopWithPincode}>
            <div className={styles.mapDesktop}>
              <CliqAndPiqMap
                availableStores={this.state.availableStores}
                lat={this.state.lat}
                lng={this.state.lng}
              />
            </div>
            <div className={styles.storeListForDesktop}>
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
                  changePincode={pincode => this.getPinCodeDetails(pincode)}
                />
              </div>
              {!this.state.showPickupPerson &&
                this.state.availableStores &&
                this.state.availableStores.length > 1 && (
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
                          address={`${val.address &&
                            val.address.line1} ${val.address &&
                            val.address.line2}, `}
                          PickUpKey="Open on: "
                          workingDays={val.mplWorkingDays}
                          openingTime={val.mplOpeningTime}
                          closingTime={val.mplClosingTime}
                          address2={`${val.returnCity} ${val.returnPin}`}
                          headingText={val.displayName}
                          value={val.slaveId}
                          canSelectStore={this.props.canSelectStore}
                        />
                      );
                    })}
                  </GridSelect>
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
