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
const ERROR_MESSAGE = "Please select Store";
export default class ReturnToStore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lat:
        this.props &&
        this.props.stores &&
        this.props.stores[0].geoPoint.latitude
          ? this.props &&
            this.props.stores &&
            this.props.stores[0].geoPoint.latitude
          : 28.6129918,
      lng:
        this.props &&
        this.props.stores &&
        this.props.stores[0].geoPoint.longitude
          ? this.props &&
            this.props.stores &&
            this.props.stores[0].geoPoint.longitude
          : 77.2310456,
      availableStores: []
    };
  }

  selectStoreForDesktop = val => {
    if (val.length > 0) {
      const lat =
        this.state.availableStores &&
        this.state.availableStores[val].geoPoint.latitude;
      const lng =
        this.state.availableStores &&
        this.state.availableStores[val].geoPoint.longitude;

      this.setState({ lat, lng });
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
  componentDidMount() {
    const firstSlaveData = this.props.productDetails.slaveData;
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
    this.setState({ availableStores: availableStores });
  }
  render() {
    if (!this.state.availableStores) {
      return (
        <div className={styles.loadingIndicator}>
          <SecondaryLoader />
        </div>
      );
    }
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
                  this.props.productName ? this.props.productName : ""
                } ${this.props.productColour ? this.props.productColour : ""}`}
                disabled={this.props.pinCodeUpdateDisabled}
                pincode={this.props.pincode}
                changePincode={pincode => this.getPinCodeDetails(pincode)}
              />
            </div>
            {this.state.availableStores &&
              this.state.availableStores.length > 1 &&
              !this.props.showPickupPerson && (
                <GridSelect
                  limit={1}
                  offset={0}
                  elementWidthDesktop={100}
                  onSelect={val => this.selectStoreForDesktop(val)}
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
                        value={i}
                        canSelectStore={this.props.canSelectStore}
                      />
                    );
                  })}
                </GridSelect>
              )}
            {this.state.availableStores &&
              this.state.availableStores.length === 1 &&
              !this.props.showPickupPerson && (
                <div className={styles.singleCardHolder}>
                  {this.state.availableStores &&
                    this.state.availableStores.map((val, i) => {
                      return (
                        <PickUpLocation
                          key={i}
                          address={`${val.address.line1} ${
                            val.address.line2
                          }, `}
                          PickUpKey="Open on: "
                          workingDays={val.mplWorkingDays}
                          openingTime={val.mplOpeningTime}
                          closingTime={val.mplClosingTime}
                          address2={`${val.returnCity} ${val.returnPin}`}
                          iconText="C"
                          headingText={val.displayName}
                          canSelectStore={this.props.canSelectStore}
                          buttonText="Select"
                        />
                      );
                    })}
                </div>
              )}
          </div>
        </div>
      </div>
    );
  }
}
