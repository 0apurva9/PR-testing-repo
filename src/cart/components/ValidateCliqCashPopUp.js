import React from "react";
import PropTypes from "prop-types";
import Button from "../../general/components/Button.js";
import styles from "./InvalidCouponPopUp.css";


export default class ValidateCliqCashPopUp extends React.Component {
  removeCliqCash(){
    localStorage.setItem("cliqCashAppliedWithOffer", true);
    if(this.props.removeCliqCash){
      this.props.removeCliqCash();
    }
    this.props.closeModal();
  }

  continueWithoutCoupon(){
    if(this.props.releaseUserCoupon){
       this.props.releaseUserCoupon(
        this.props.result.bankCoupontoRelease
      );
    }
    this.props.resetAllPaymentModes();
    this.props.closeModal();
  }

  componentWillUnmount() {
    document.body.style.pointerEvents = "auto";
  }

  render() {
    document.body.style.pointerEvents = "none";
    let labelForFirstButton = "Continue without CliqCash";
	let labelForSecondButton = "Continue without Offer";

    return(
    <div className={styles.base}>
    	<div className={styles.paymentMethodDescription}>
    		{this.props && this.props.result &&
				<div className={styles.headingText}>
					{this.props.result.error}
				</div>
			}
			<div className={styles.buttonHolderForPaymentMode}>
				<div className={styles.button}>
				<Button
					type="primary"
					backgroundColor="#da1c5c"
					height={36}
					label={labelForFirstButton}
					width={211}
					textStyle={{ color: "#FFF", fontSize: 14 }}
					onClick={() => this.removeCliqCash()}
				/>
				</div>
			</div>
			<div className={styles.buttonHolderForContinueCoupon}>
				<div className={styles.button}>
				<Button
					type="secondary"
					height={36}
					label={labelForSecondButton}
					width={211}
					onClick={() => this.continueWithoutCoupon()}
				/>
				</div>
			</div>
        </div>
    </div>
    );
  }
}

PropTypes.PropTypes = {
  removeCliqCash: PropTypes.func,
  closeModal: PropTypes.func,
  releaseUserCoupon: PropTypes.func,
  result: PropTypes.object,
};