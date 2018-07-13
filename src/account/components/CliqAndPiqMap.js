import React from "react";
import Map from "../../general/components/Map";
import MarkerStore from "../../cart/components/MarkerStore";
import BannerMobile from "../../general/components/BannerMobile";
import PickUpLocation from "../../cart/components/PickUpLocation";
import GetLocationDetails from "../../cart/components/GetLocationDetails";
import PickUpDetails from "../../cart/components/PickUpDetails";
import styles from "./CliqAndPiqMap.css";
import WestSideIcon from "../../cart/components/img/googleSearch.png";

export default class CliqAndPiqMap extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.userDetails) {
      this.setState({
        name: nextProps.userDetails && nextProps.userDetails.firstName,
        mobile: nextProps.userDetails && nextProps.userDetails.mobileNumber
      });
    }

    if (nextProps.availableStores && nextProps.availableStores.length > 0) {
      this.setState(prevState => ({
        lat: nextProps.availableStores[0].geoPoint.latitude,
        lng: nextProps.availableStores[0].geoPoint.longitude
      }));
    }
  }
  componentDidMount = () => {
    if (this.props.getUserDetails) {
      this.props.getUserDetails();
    }
  };

  getValue(val) {
    this.setState(val);
  }
  selectStore(slaveId) {
    this.props.addStoreCNC(slaveId);
  }
  changeStore() {
    this.props.hidePickupPersonDetail();
  }
  handleSubmit() {
    if (this.props.addPickupPersonCNC) {
      this.props.addPickupPersonCNC(this.state.mobile, this.state.name);
    }
  }

  getPinCodeDetails = pinCode => {
    if (this.props.changePincode) {
      this.props.changePincode(pinCode);
    }
  };
  render() {
    let selectedStore = {};
    if (this.props.availableStores) {
      selectedStore = this.props.availableStores.find(store => {
        return store.slaveId === this.props.selectedSlaveId;
      });
    }

    return (
      <div className={styles.base}>
        <div className={styles.map}>
          <Map lat={this.props.lat} lng={this.props.lng} zoom={16}>
            {this.props.availableStores &&
              this.props.availableStores.map((val, i) => {
                return (
                  <MarkerStore
                    lat={val.geoPoint.latitude}
                    lng={val.geoPoint.longitude}
                    image={WestSideIcon}
                    key={i}
                  />
                );
              })}
          </Map>
        </div>
      </div>
    );
  }
}
PickUpLocation.defaultProps = {
  canSelectStore: true
};
