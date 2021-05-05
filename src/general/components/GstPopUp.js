import React, { Component } from "react";
import styles from "./GstPopUp.css";
import CenterSlideModal from "./CenterSlideModal";
import Button from "../../general/components/Button";
import { ERROR, SUCCESS } from "../../lib/constants";
import { gstRegex } from "../../lib/constants";

export default class GstPopUp extends Component {
    constructor() {
        super();
        this.state = {
            inputValueGst: "",
            inputValueGstBusinessName: "",
            lpError: false,
            bsError: false,
        };
    }

    componentDidMount() {
        if (
            this.props &&
            this.props.data &&
            this.props.data.gstData &&
            this.props.data.gstData.gstin &&
            this.props.data.gstData.companyName
        ) {
            this.setState({
                inputValueGst: this.props.data.gstData.gstin,
                inputValueGstBusinessName: this.props.data.gstData.companyName,
            });
        }
    }

    async applyGst() {
        if (window && window.digitalData) {
            Object.assign(window.digitalData, {
                event: {
                    linkName: { GST: "submit" },
                },
            });
        }
        let isGstCorrect = this.state.inputValueGst.match(gstRegex);
        if (isGstCorrect) {
            if (this.props.getValidateGstDetails) {
                let response = await this.props.getValidateGstDetails(
                    this.state.inputValueGst,
                    this.state.inputValueGstBusinessName.trim(),
                    "apply"
                );
                if (response.status === SUCCESS) {
                    this.props.closeModal();
                } else if (response.status === ERROR) {
                    this.props.displayToast(response.error);
                }
                this.setState({ lpError: false, bsError: false });
            }
        } else {
            this.setState({ lpError: true });
        }
    }

    udpateInputvalue(value) {
        if (value.length === 15) {
            let isGstCorrect = value.match(gstRegex);
            if (isGstCorrect) {
                this.setState({ inputValueGst: value, lpError: false });
            } else {
                this.setState({ inputValueGst: value, lpError: true });
            }
        } else {
            this.setState({ inputValueGst: value, lpError: false });
        }
    }

    udpateBusinessInputvalue(value) {
        this.setState({ inputValueGstBusinessName: value });
    }

    render() {
        return (
            <CenterSlideModal crossIconHide={true}>
                <div className={styles.base}>
                    <div className={styles.box}>
                        <div className={styles.content}>
                            <div className={styles.hideModal} onClick={() => this.props.closeModal()} />
                            <div>
                                <div className={styles.headerLp}>
                                    <span className={styles.headerLeft}>Enter Your GST Information</span>
                                </div>

                                <div className={styles.inputField}>
                                    <div className={styles.materialField}>
                                        <input
                                            type="text"
                                            maxLength="15"
                                            className={[
                                                styles.materialFieldInput,
                                                this.state.lpError ? styles.materialFieldInputError : null,
                                            ].join(" ")}
                                            value={this.state.inputValueGst}
                                            onChange={event => this.udpateInputvalue(event.target.value.toUpperCase())}
                                        />
                                        <label
                                            className={[
                                                styles.materialFieldLabel,
                                                this.state.inputValueGst
                                                    ? this.state.lpError
                                                        ? styles.materialFieldInputFocusError
                                                        : styles.materialFieldInputFocus
                                                    : null,
                                            ].join(" ")}
                                        >
                                            Enter GST Number
                                        </label>
                                    </div>
                                    {this.state.lpError ? (
                                        <div className={styles.errorMsg}>Please enter a valid GST number</div>
                                    ) : null}
                                </div>

                                <div className={styles.inputField}>
                                    <div className={styles.materialField}>
                                        <input
                                            multiline={true}
                                            type="text"
                                            maxLength="500"
                                            className={styles.materialFieldInput}
                                            value={this.state.inputValueGstBusinessName}
                                            onChange={event => this.udpateBusinessInputvalue(event.target.value)}
                                        />
                                        <label
                                            className={[
                                                styles.materialFieldLabel,
                                                this.state.inputValueGstBusinessName
                                                    ? this.state.bsError
                                                        ? styles.materialFieldInputFocusError
                                                        : styles.materialFieldInputFocus
                                                    : null,
                                            ].join(" ")}
                                        >
                                            Enter Business Name
                                        </label>
                                    </div>
                                </div>

                                <div className={styles.GstWarning}>
                                    <b>Note :</b> Incorrect GSTIN details will lead to order cancellation
                                </div>

                                <div className={styles.applyBtn}>
                                    <div className={styles.divApplyBtn}>
                                        <Button
                                            height={51}
                                            width={177}
                                            borderRadius={25}
                                            backgroundColor={"#da1c5c"}
                                            label={"Submit"}
                                            disabled={
                                                this.state.inputValueGst.match(gstRegex) &&
                                                this.state.inputValueGstBusinessName.trim()
                                                    ? false
                                                    : true
                                            }
                                            onClick={() => this.applyGst()}
                                            textStyle={{
                                                color: "#fffff",
                                                fontSize: 18,
                                                fontFamily: "overpass-bold,sans-serif",
                                                fontWeight: "bold",
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </CenterSlideModal>
        );
    }
}
