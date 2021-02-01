import React from "react";
import styles from "./MarkerStore.css";
import Icon from "../../xelpmoc-core/Icon";
import PropTypes from "prop-types";
export default class MarkerStore extends React.Component {
    selectedItem = val => {
        if (this.props.storeClick && val) {
            this.props.storeClick([val]);
        }
    };

    render() {
        return (
            <div className={styles.base}>
                <div className={styles.place} lat={this.props.lat} lng={this.props.lng}>
                    <Icon
                        image={this.props.image}
                        width={20}
                        height={30}
                        selectItem={() => this.selectedItem(this.props.slaveID)}
                    >
                        {this.props.storeNumber && !this.props.text && (
                            <span className={styles.imageText}>{this.props.storeNumber}</span>
                        )}
                    </Icon>
                    {this.props.text && <div className={styles.storeName}>{this.props.text}</div>}
                </div>
            </div>
        );
    }
}
MarkerStore.propTypes = {
    lat: PropTypes.number,
    lng: PropTypes.number,
    image: PropTypes.string,
    storeClick: PropTypes.func,
    slaveID: PropTypes.string,
    storeNumber: PropTypes.string,
    text: PropTypes.string,
};
