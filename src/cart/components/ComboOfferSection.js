import React from "react";
import styles from "./ComboOfferSection.css";
import PropTypes from "prop-types";
import { RUPEE_SYMBOL } from "../../lib/constants";
import Icon from "../../xelpmoc-core/Icon";
import infoIcon from "../../general/components/img/infoIconGreen.svg";
import { trimProductName } from "../../lib/commonFunctionsUtils.js";

export default class ComboOfferSection extends React.Component {
    render() {
        let comboDiscountFormatted = this.props.comboDiscount && parseFloat(this.props.comboDiscount).toFixed(2);
        let productName = this.props.comboDiscountWith && trimProductName(this.props.comboDiscountWith, 15);

        let showComboDiscountAppliedQuantity =
            this.props.comboDiscountAppliedQuantity &&
            this.props.quantitySelectedByUser &&
            parseInt(this.props.quantitySelectedByUser) > this.props.comboDiscountAppliedQuantity &&
            this.props.comboDiscountAppliedQuantity;

        return (
            <div className={styles.bundlingComboDiscount}>
                <span className={styles.comboOfferText}>1 Combo Offer Applied </span>
                <div className={styles.cashbackIconContainer}>
                    <Icon image={infoIcon} size={12} />
                    <div
                        className={
                            !showComboDiscountAppliedQuantity ? styles.cashbackTooltip : styles.cashbackTooltipExpanded
                        }
                    >
                        <div className={styles.comboDiscountText1}>Offer Applied</div>
                        {this.props.comboDiscountWith && (
                            <div className={styles.comboDiscountText2}>
                                Combo Offer with {productName}
                                {showComboDiscountAppliedQuantity && (
                                    <span>X {this.props.comboDiscountAppliedQuantity} Qty</span>
                                )}
                            </div>
                        )}
                        <div>
                            <span className={styles.comboDiscountText3}>Combo discount applied: </span>
                            <span className={styles.comboDiscountText4}>
                                {RUPEE_SYMBOL}
                                {comboDiscountFormatted}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

ComboOfferSection.propTypes = {
    comboDiscount: PropTypes.number,
    comboDiscountAppliedQuantity: PropTypes.any,
    comboDiscountWith: PropTypes.number,
    quantitySelectedByUser: PropTypes.any,
};
