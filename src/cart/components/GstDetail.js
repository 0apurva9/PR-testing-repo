import React from "react";
import PropTypes from "prop-types";
import styles from "./GstDetails.css";
import { SUCCESS_CAMEL_CASE, LOGGED_IN_USER_DETAILS, SAVED_CUSTOMER_GST_DETAILS } from "../../lib/constants";
import * as Cookie from "../../lib/Cookie";
export default class GstDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gst: "",
            companyName: "",
            stateName: "",
        };
    }

    onClick() {
        if (Cookie.getCookie(LOGGED_IN_USER_DETAILS) === undefined) {
            this.props.displayToast("Please login to add GST details");
        } else {
            if (this.props.gstPopUp) {
                this.props.gstPopUp({
                    gstData: this.props.gstDetails,
                });
            }
        }
        if (window._satellite) {
            window._satellite.track("genericClick");
        }
        if (window && window.digitalData) {
            Object.assign(window.digitalData, {
                event: {
                    linkName: {
                        GST:
                            this.props && this.props.gstDetails && this.props.gstDetails.status === SUCCESS_CAMEL_CASE
                                ? "editDetails"
                                : "addDetails",
                    },
                },
            });
        }
    }

    componentDidMount() {
        let localStorageGstData = localStorage.getItem(SAVED_CUSTOMER_GST_DETAILS);
        let savedCustomerGstDetails = localStorageGstData ? JSON.parse(localStorageGstData) : "";
        if (savedCustomerGstDetails && savedCustomerGstDetails.gst && savedCustomerGstDetails.companyName) {
            this.setState({
                gst: savedCustomerGstDetails.gst,
                companyName: savedCustomerGstDetails.companyName,
                stateName: savedCustomerGstDetails.stateName,
            });
        } else if (this.props.getValidateGstDetails && Cookie.getCookie(LOGGED_IN_USER_DETAILS)) {
            this.props.getValidateGstDetails("", "", "apply");
        }
    }

    componentDidUpdate(prevProps) {
        if (
            prevProps !== this.props &&
            this.props.gstDetails &&
            this.props.gstDetails.status &&
            this.props.gstDetails.status == SUCCESS_CAMEL_CASE
        ) {
            this.setState({
                gst: this.props.gstDetails.gstin,
                companyName: this.props.gstDetails.companyName,
                stateName: this.props.gstDetails.state,
            });
            const savedCustomerGstDetails = {
                gst: this.props.gstDetails.gstin,
                companyName: this.props.gstDetails.companyName,
                stateName: this.props.gstDetails.state,
            };
            localStorage.setItem(SAVED_CUSTOMER_GST_DETAILS, JSON.stringify(savedCustomerGstDetails));
        }
    }

    render() {
        return (
            <div className={styles.base}>
                {this.state.gst ? (
                    <div className={styles.couponInnerBox}>
                        <div className={[styles.headingText, styles.headingTextFont].join(" ")}>
                            Your GST Information
                        </div>
                        <div className={styles.apply} onClick={() => this.onClick()}>
                            Edit Details
                        </div>

                        <div className={styles.margin}>
                            <span className={styles.headingText}>GSTIN Number :</span>{" "}
                            <span className={styles.subText}>{this.state.gst}</span>
                        </div>
                        <div>
                            <span className={styles.headingText}>Business Name :</span>{" "}
                            <span className={styles.subText}>{this.state.companyName}</span>
                        </div>
                        <div>
                            <span className={styles.headingText}>GST State :</span>{" "}
                            <span className={styles.subText}>{this.state.stateName}</span>
                        </div>
                    </div>
                ) : (
                    <div className={styles.couponInnerBox}>
                        <div className={styles.headingTextGst}>Need GST invoice?</div>
                        <div className={styles.apply} onClick={() => this.onClick()}>
                            Add Details
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

GstDetails.propTypes = {
    heading: PropTypes.string,
    subText: PropTypes.string,
    gstPopUp: PropTypes.func,
    gstDetails: PropTypes.object,
    getValidateGstDetails: PropTypes.func,
    displayToast: PropTypes.func,
};
