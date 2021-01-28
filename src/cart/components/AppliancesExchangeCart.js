import React from "react";
import exchangeIconLight from "../../cart/components/img/exchangeIconLight.svg";
import closeIcon from "../../cart/components/img/exchangeCloseIcon.svg";
import styles from "./CartItemForDesktop.css";
import PropTypes from "prop-types";
import {
    SUCCESS,
    AC_CART_EXCHANGE_DETAILS,
    EXCHANGE_NOT_SERVICEABLE,
    MAIN_PRODUCT_NOT_SERVICEABLE_WITH_EXCHANGE,
    FAILURE_LOWERCASE,
    EXCHANGE_DISABLED,
} from "../../lib/constants";
export default class AppliancesExchangeCart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            exchangeData: null,
            isPickupAvailableForAppliance: false,
            exchangeDisabled: false,
        };
    }

    componentDidMount() {
        let cartExchangeDetails = localStorage.getItem(AC_CART_EXCHANGE_DETAILS);
        let parsedExchangeDetails = cartExchangeDetails && JSON.parse(cartExchangeDetails);
        if (parsedExchangeDetails && parsedExchangeDetails.length > 0) {
            let exchangeDetails = parsedExchangeDetails.find(data => {
                return data.ussid === this.props.productUssid;
            });
            if (exchangeDetails) {
                this.setState({ exchangeData: exchangeDetails });
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        let cartExchangeDetails = localStorage.getItem(AC_CART_EXCHANGE_DETAILS);
        let parsedExchangeDetails = cartExchangeDetails && JSON.parse(cartExchangeDetails);
        if (parsedExchangeDetails && parsedExchangeDetails.length > 0) {
            if (
                nextProps.appliancesExchangePincodeData &&
                nextProps.appliancesExchangePincodeData.status &&
                nextProps.appliancesExchangePincodeData !== this.state.isPickupAvailableForAppliance
            ) {
                if (nextProps.appliancesExchangePincodeData.status.toLowerCase() === SUCCESS) {
                    let data = nextProps.appliancesExchangePincodeData.listOfDataList;
                    let serviceabliltyDetails = data.find(data => {
                        return data.key === this.props.productCode;
                    });
                    if (
                        serviceabliltyDetails &&
                        serviceabliltyDetails.key === this.props.productCode &&
                        Object.keys(serviceabliltyDetails.value).length !== 0
                    ) {
                        let isPickupAvailableForAppliance =
                            serviceabliltyDetails.value &&
                            serviceabliltyDetails.value.vendorDetails &&
                            serviceabliltyDetails.value.vendorDetails[0] &&
                            serviceabliltyDetails.value.vendorDetails[0].isPickupAvailableForAppliance;
                        if (isPickupAvailableForAppliance) {
                            this.setState({
                                isPickupAvailableForAppliance: isPickupAvailableForAppliance,
                            });
                        }
                    } else {
                        this.setState({ isPickupAvailableForAppliance: false });
                    }
                }
                if (nextProps.appliancesExchangePincodeData.status.toLowerCase() === FAILURE_LOWERCASE) {
                    this.setState({
                        isPickupAvailableForAppliance: false,
                        exchangeDisabled: true,
                    });
                }
            }
        }
    }

    removeAppliancesExchange(ussid) {
        this.props.displayToast("Exchange for product removed");
        this.setState({ exchangeData: null });
        this.props.removeAppliancesExchange(ussid);
    }

    openAppliancesExchangeModal(data) {
        this.props.openAppliancesExchangeModal(data);
    }

    render() {
        if (!this.state.exchangeData) {
            return null;
        }

        return (
            <React.Fragment>
                <div
                    className={
                        !this.state.isPickupAvailableForAppliance
                            ? styles.exchangeDetailsPickupNotAvail
                            : styles.exchangeDetails
                    }
                >
                    <div className={styles.aeExchangeDetailsSectionOne}>
                        <img
                            src={closeIcon}
                            alt="exchange icon"
                            className={styles.closeIcon}
                            onClick={() => this.removeAppliancesExchange(this.props.productUssid)}
                        />
                        <img src={exchangeIconLight} alt="exchange icon" className={styles.exchangeIcon} />
                        <div className={styles.exchangeDetailsHeading}>
                            Exchange Cashback for{" "}
                            <span className={styles.exchangeProductName}>
                                {this.state.exchangeData && this.state.exchangeData.brandName}-
                                {this.state.exchangeData && this.state.exchangeData.type} AC
                            </span>
                        </div>
                    </div>
                    <div className={styles.exchangeDetailsSectionTwo}>
                        <div className={styles.exchangePriceNDetails}>
                            <div className={styles.exchangePrice}>
                                {this.state.exchangeData && this.state.exchangeData.totalExchangeAmount}
                            </div>
                            <div
                                className={styles.exchangeViewDetails}
                                onClick={() =>
                                    this.openAppliancesExchangeModal({
                                        showAppliancesExchangeWorks: true,
                                    })
                                }
                            >
                                Know more
                            </div>
                        </div>
                    </div>
                </div>
                {this.state.exchangeDisabled && (
                    <div className={styles.exchangeProductNotServiceable}>{EXCHANGE_DISABLED}</div>
                )}
                {this.props.productIsServiceable &&
                    !this.state.isPickupAvailableForAppliance &&
                    !this.state.exchangeDisabled && (
                        <div className={styles.exchangeProductNotServiceable}>{EXCHANGE_NOT_SERVICEABLE}</div>
                    )}
                {!this.props.productIsServiceable && !this.state.exchangeDisabled && (
                    <div className={styles.exchangeProductNotServiceable}>
                        {MAIN_PRODUCT_NOT_SERVICEABLE_WITH_EXCHANGE}
                    </div>
                )}
            </React.Fragment>
        );
    }
}

AppliancesExchangeCart.propTypes = {
    productUssid: PropTypes.string,
    openAppliancesExchangeModal: PropTypes.func,
    pinCodeResponse: PropTypes.object,
    productIsServiceable: PropTypes.bool,
    appliancesExchangePincodeData: PropTypes.object,
    productCode: PropTypes.string,
    displayToast: PropTypes.func,
    removeAppliancesExchange: PropTypes.func,
};
