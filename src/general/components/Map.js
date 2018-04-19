import React from "react";
import GoogleMap from "google-map-react";
const DEFAULT_LATITUDE = 59.95;
const DEFAULT_LONGITUDE = 30.33;
const DEFAULT_ZOOM = 20;
export default class Map extends React.Component {
  static defaultProps = {
    center: { lat: DEFAULT_LATITUDE, lng: DEFAULT_LONGITUDE },
    zoom: DEFAULT_ZOOM
  };

  render() {
    return (
      <GoogleMap
        bootstrapURLKeys={{ key: ["AIzaSyAqkKpQBlLTJwxAjtSKe3Dz7-GUn9xPfd8"] }}
        defaultCenter={this.props.center}
        defaultZoom={this.props.zoom}
        center={{ lat: this.props.lat, lng: this.props.lng }}
      >
        {this.props.children}
      </GoogleMap>
    );
  }
}
