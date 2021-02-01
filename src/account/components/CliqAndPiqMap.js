import React from "react";
import Map from "../../general/components/Map";
import MarkerStore from "../../cart/components/MarkerStore";
import styles from "./CliqAndPiqMap.css";
import LocationPinIcon from "../../cart/components/img/newGoogleSearchPin.svg";
import SelectedLocationIcon from "../../cart/components/img/newGoogleSearchSelected.svg";

export default class CliqAndPiqMap extends React.Component {
  render() {
    return (
      <div className={styles.base}>
        <div className={styles.map}>
          <Map lat={this.props.lat} lng={this.props.lng} zoom={14}>
            {this.props.availableStores &&
              this.props.availableStores.map((val, i) => {
                let imgURL = LocationPinIcon;
                let displayText = "";
                if (
                  this.props.lat === val.geoPoint.latitude &&
                  this.props.lng === val.geoPoint.longitude
                ) {
                  imgURL = SelectedLocationIcon;
                  displayText = val.displayName;
                }
                return (
                  <MarkerStore
                    lat={val.geoPoint.latitude}
                    lng={val.geoPoint.longitude}
                    image={imgURL}
                    key={i}
                    storeNumber={i + 1}
                    text={displayText}
                    slaveID={val.slaveId}
                    storeClick={this.props.storeClick}
                  />
                );
              })}
          </Map>
        </div>
      </div>
    );
  }
}
