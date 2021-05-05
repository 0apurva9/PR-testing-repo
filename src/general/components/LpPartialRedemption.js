import React, { Component } from "react";
import styles from "./LpPartialRedemption.css";
import CenterSlideModal from "./CenterSlideModal";
import Button from "../../general/components/Button";
import * as Cookie from "../../lib/Cookie";
import { ERROR, SUCCESS } from "../../lib/constants";
import Image from "../../xelpmoc-core/Image";
import coin from "./img/coin.png";

export default class LpPartialRedemption extends Component {
    constructor() {
        super();
        this.state = {
            inputValue: "",
            lpError: false,
        };
    }

    async applyLp() {
        if (this.state.inputValue > this.props.data.totalLoyaltyAmount) {
            this.setState({ lpError: true });
        } else {
            const cartDetails = Cookie.getCookie("cartDetails");
            let cartGuId = cartDetails && (JSON.parse(cartDetails).guid || Cookie.getCookie("oldCartGuId"));

            let response = await this.props.applyRemoveloyaltyPoints(
                cartGuId,
                "apply",
                this.props.data.totalLoyaltyAmount,
                this.state.inputValue
            );
            if (response.status === SUCCESS) {
                this.props.closeModal();
            } else if (response.status === ERROR) {
                this.props.displayToast(response.error);
            }
            this.setState({ lpError: false });
        }
    }

    udpateInputvalue(value) {
        if (!isNaN(value)) {
            let trimmedValue = Math.trunc(value);
            let inputValue = trimmedValue === 0 ? "" : trimmedValue;
            if (inputValue > this.props.data.totalLoyaltyAmount) {
                this.setState({ inputValue, lpError: true });
            } else {
                this.setState({ inputValue, lpError: false });
            }
        }
    }

    render() {
        return (
            <CenterSlideModal crossIconHide={true}>
                <div className={styles.base}>
                    <div className={styles.box}>
                        <div className={styles.content}>
                            <div>
                                <div className={styles.headerLp}>
                                    <span className={styles.headerLeft}>Tata Loyalty Points</span>
                                    <span className={styles.headerRight}>
                                        <span className={styles.imgHolder}>
                                            <Image image={coin} />
                                        </span>
                                        <span className={styles.pointsText}>
                                            {this.props.data.totalLoyaltyAmount} Points Available
                                        </span>
                                    </span>
                                </div>
                                <div className={styles.modalText}>
                                    Please enter the number of loyalty points which you would like to redeem for this
                                    purchase
                                </div>
                                <div className={styles.inputField}>
                                    <div className={styles.materialField}>
                                        <input
                                            type="text"
                                            maxLength="8"
                                            className={[
                                                styles.materialFieldInput,
                                                this.state.lpError ? styles.materialFieldInputError : null,
                                            ].join(" ")}
                                            value={this.state.inputValue}
                                            onChange={event => this.udpateInputvalue(event.target.value)}
                                        />
                                        <label
                                            className={[
                                                styles.materialFieldLabel,
                                                this.state.inputValue
                                                    ? this.state.lpError
                                                        ? styles.materialFieldInputFocusError
                                                        : styles.materialFieldInputFocus
                                                    : null,
                                            ].join(" ")}
                                        >
                                            Enter Points
                                        </label>
                                    </div>
                                    {this.state.lpError ? (
                                        <div className={styles.errorMsg}>
                                            The points entered are exceeding your balance
                                        </div>
                                    ) : null}
                                </div>
                                <div className={styles.applyBtn}>
                                    <div className={styles.cancelButtonHolder}>
                                        <Button
                                            type="hollow"
                                            height={51}
                                            width={177}
                                            borderRadius={25}
                                            label={"Cancel"}
                                            backgroundColor={"#4a4a4a"}
                                            onClick={() => this.props.closeModal()}
                                            textStyle={{
                                                color: "#4a4a4a",
                                                fontSize: 18,
                                            }}
                                        />
                                    </div>
                                    <div className={styles.divApplyBtn}>
                                        <Button
                                            height={51}
                                            width={177}
                                            borderRadius={25}
                                            backgroundColor={"#da1c5c"}
                                            label={"Apply"}
                                            disabled={this.state.inputValue ? false : true}
                                            onClick={() => this.applyLp()}
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
