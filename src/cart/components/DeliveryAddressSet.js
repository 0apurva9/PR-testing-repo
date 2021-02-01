import React from "react";
import PropTypes from "prop-types";
import DeliveryCard from "./DeliveryCard.js";
import styles from "./DeliveryAddressSet.css";
export default class DeliveryAddressSet extends React.Component {
    handleClick() {
        if (this.props.changeDeliveryAddress) {
            this.props.changeDeliveryAddress();
        }
    }

    render() {
        let addressLable = "Delivery Address";
        if (this.props.isFromCliqAndPiq) {
            addressLable = "Billing Address";
        }
        return (
            <DeliveryCard
                onClick={() => this.handleClick()}
                confirmTitle={addressLable}
                indexNumber="1"
                completed={true}
            >
                <div className={styles.base}>
                    <div className={styles.deliveryAddressSetText}>
                        <span className={styles.home}>{this.props.addressType}</span>
                        <span>{this.props.address}</span>
                    </div>
                </div>
            </DeliveryCard>
        );
    }
}
DeliveryAddressSet.propTypes = {
    onClick: PropTypes.func,
    address: PropTypes.string,
    addressType: PropTypes.string,
    changeDeliveryAddress: PropTypes.func,
    isFromCliqAndPiq: PropTypes.bool,
};
