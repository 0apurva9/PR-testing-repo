import React from "react";
import PropTypes from "prop-types";
import DeliveryCard from "./DeliveryCard.js";
import styles from "./DeliveryModeSet.css";
import { COLLECT, YES } from "../../lib/constants";
import format from "date-fns/format";
export default class DeliveryModeSet extends React.Component {
    handleClick() {
        if (this.props.changeDeliveryModes) {
            this.props.changeDeliveryModes();
        }
    }

    getDayNumberSuffix(selectedDeliveryModes, USSID, expectedDeliveryDate) {
        let placedTime = "";
        let defaultText = "Delivery by ";
        let currentProduct =
            this.props &&
            this.props.productDelivery &&
            this.props.productDelivery.find(val => {
                return val.USSID === USSID;
            });
        placedTime =
            currentProduct &&
            currentProduct.pinCodeResponse &&
            currentProduct.pinCodeResponse.validDeliveryModes &&
            currentProduct.pinCodeResponse.validDeliveryModes.find(val => {
                if (val.type === "CNC") {
                    return selectedDeliveryModes === "Click and Collect";
                } else if (val.type === "HD") {
                    return selectedDeliveryModes === "Home Delivery";
                } else if (val.type === "SDD") {
                    return selectedDeliveryModes === "Same Day Delivery";
                } else if (val.type === "ED") {
                    return selectedDeliveryModes === "Express Delivery";
                }
            });
        if (placedTime && placedTime.deliveryDate) {
            let day = new Date();
            let dayFormat = format(day, "DD-MMM-YYYY");
            let nextWithOutFormatDay = day.setDate(day.getDate() + 1);
            let nextDay = new Date(nextWithOutFormatDay);
            let nextDayFormat = format(nextDay, "DD-MMM-YYYY");
            let placedTimeWithoutFormat = new Date(placedTime && placedTime.deliveryDate.replace(/-/g, "/"));
            let productDayFormat = format(placedTimeWithoutFormat, "DD-MMM-YYYY");

            let dateWithMonth = new Date(placedTime && placedTime.deliveryDate.replace(/-/g, "/"));
            let date = dateWithMonth.getDate();
            let month = dateWithMonth.getMonth();
            let monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            let dayBehavior =
                dayFormat === productDayFormat ? `Today, ` : nextDayFormat === productDayFormat ? `Tomorrow, ` : "";
            switch (date) {
                case 1:
                case 21:
                case 31:
                    return defaultText + dayBehavior + date + "st " + monthNames[month];
                case 2:
                case 22:
                    return defaultText + dayBehavior + date + "nd " + monthNames[month];
                case 3:
                case 23:
                    return defaultText + dayBehavior + date + "rd " + monthNames[month];
                default:
                    return defaultText + dayBehavior + date + "th " + monthNames[month];
            }
        } else {
            return expectedDeliveryDate;
        }
    }

    render() {
        let allProductsInCart = this.props.productDelivery;
        let bundledDigitalProducts =
            allProductsInCart &&
            allProductsInCart.filter(value => {
                return value.bundledDigitalItems;
            });
        let allProducts = [];
        // if main products contains digital product then create new array of products
        if (bundledDigitalProducts && bundledDigitalProducts.length > 0) {
            allProductsInCart.map(product => {
                allProducts.push(product);
                if (product.bundledDigitalItems && product.bundledDigitalItems.length > 0) {
                    product.bundledDigitalItems.map(digitalProduct => {
                        allProducts.push(digitalProduct);
                    });
                }
            });
        } else {
            allProducts = allProductsInCart;
        }

        return (
            <DeliveryCard
                onClick={() => this.handleClick()}
                confirmTitle="Delivery Mode"
                indexNumber="2"
                completed={true}
            >
                {allProducts &&
                    allProducts.map((data, i) => {
                        if (data.isGiveAway === YES) {
                            return <div />;
                        }
                        const selectedDeliveryModes = this.props.selectedDeliveryDetails[data.USSID];
                        const deliveryOption =
                            data &&
                            data.elligibleDeliveryMode &&
                            data.elligibleDeliveryMode.find(mode => {
                                return mode.code === selectedDeliveryModes;
                            });
                        let expectedDeliveryDate =
                            deliveryOption && deliveryOption.desc ? `${deliveryOption.desc}` : "";

                        let textForCollect;
                        if (deliveryOption && deliveryOption.code === COLLECT) {
                            textForCollect =
                                data.storeDetails &&
                                `Pick From Store: ${
                                    data.storeDetails.displayName ? data.storeDetails.displayName : ""
                                } ${
                                    data.storeDetails.address && data.storeDetails.address.city
                                        ? data.storeDetails.address.city
                                        : ""
                                }`;
                        }
                        return (
                            <div className={styles.base} key={i}>
                                <div className={styles.productName}>{data.productName}:</div>
                                <div className={styles.deliveryWay}>
                                    {deliveryOption &&
                                        `${
                                            data.isDigitalBundled
                                                ? "Activation Post Delivery"
                                                : deliveryOption.code === COLLECT
                                                ? textForCollect
                                                    ? textForCollect
                                                    : ""
                                                : this.getDayNumberSuffix(
                                                      deliveryOption.name,
                                                      data.USSID,
                                                      expectedDeliveryDate
                                                  )
                                        }`}
                                </div>
                            </div>
                        );
                    })}
            </DeliveryCard>
        );
    }
}
DeliveryModeSet.propTypes = {
    productDelivery: PropTypes.arrayOf(
        PropTypes.shape({
            productName: PropTypes.string,
            deliveryWay: PropTypes.string,
        })
    ),
    onClick: PropTypes.func,
    changeDeliveryModes: PropTypes.func,
    selectedDeliveryDetails: PropTypes.object,
};
