import React from "react";
import { Redirect } from "react-router-dom";
import OrderCard from "./OrderCard";
import SelectReturnDate from "./SelectReturnDate";
import ReturnsFrame from "./ReturnsFrame";
import PropTypes from "prop-types";
import styles from "./ReturnModes.css";
import DesktopOnly from "../../general/components/DesktopOnly.js";
import MobileOnly from "../../general/components/MobileOnly.js";
import DummyTab from "../../cart/components/DummyTab.js";
import UnderLinedButton from "../../general/components/UnderLinedButton";
import ReturnToStoreContainer from "../containers/ReturnToStoreContainer.js";
import ReturnCliqAndPiqContainer from "../containers/ReturnCliqAndPiqContainer.js";
import SelfCourierContainer from "../containers/SelfCourierContainer.js";
import { checkUserAgentIsMobile } from "../../lib/UserAgent.js";
import ReturnStoreConfirmation from "./ReturnStoreConfirmation.js";
import Button from "../../general/components/Button";
import checkIcon from "../../general/components/img/check.svg";
import Icon from "../../xelpmoc-core/Icon";
import SelectedReasonForReturn from "./SelectedReasonForReturn";

import {
  QUICK_DROP,
  SCHEDULED_PICKUP,
  SELF_COURIER,
  RETURNS_PREFIX,
  RETURN_LANDING,
  RETURNS_REASON
} from "../../lib/constants";
const REFUND_DETAILS = "Refund Details";
export default class ReturnModes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedMode: null,
      isModeSelected: false,
      returnModesDetails: "",
      selectedOption: "",
      selectedOptionStores: ""
    };
  }
  async componentDidMount() {
    console.log(this.props);
    //use delivery address id - required for getPickupAddrReturnPincodeServcblty api call
    let pickUpAddressId = this.props.getRefundOptionsDetails.deliveryAddress.id;
    let returnId = this.props.getRefundModesDetails.returnId;
    let orderId = this.props.data.sellerorderno;
    let transactionId = this.props.data.transactionId;
    let data = await this.props.getReturnModes(
      returnId,
      orderId,
      pickUpAddressId,
      transactionId
    );
    console.log(data);
    if (data.status === "success") {
      this.setState({ returnModesDetails: data.returnModesDetails });
    }
  }
  handleSelect(val) {
    if (checkUserAgentIsMobile()) {
      if (this.props.selectMode) {
        this.props.selectMode(val);
      }
    }

    this.setState({ selectedMode: val });
  }
  handleCancel() {
    if (this.props.onCancel) {
      this.props.onCancel();
    }
  }
  onChangeBankDetails = val => {
    if (this.props.onChangeBankDetails) {
      this.props.onChangeBankDetails(val);
    }
  };
  navigateToReturnLanding() {
    return (
      <Redirect
        to={`${RETURNS_PREFIX}/${
          this.orderCode
        }${RETURN_LANDING}${RETURNS_REASON}`}
      />
    );
  }
  handleCancelForReturn = () => {
    this.setState({ isModeSelected: false });
  };

  isReturnModesEnabled = () => {
    const data = this.state.returnModesDetails;
    if (
      (data && data.returnModes && data.returnModes.quickDrop) ||
      (data && data.returnModes && data.returnModes.schedulePickup) ||
      (data && data.returnModes && data.returnModes.selfCourier)
    ) {
      return true;
    }
    return false;
  };

  selectReturnMode = () => {
    this.setState({ isModeSelected: true });
  };

  cancelReturnMode = () => {
    this.setState({ isModeSelected: false, selectedMode: null });
  };
  render() {
    // Preventing user to open this page direct by hitting URL
    if (
      !this.props.location.state ||
      !this.props.location.state.authorizedRequest
    ) {
      return this.navigateToReturnLanding();
    }
    const { productInfo } = this.props;
    //const data = this.state.returnModesDetails;
    // const returnStoreDetailsList = data && Object.keys(data.returnStoreDetailsList);
    // const returnLogisticsResponseDTO = data && data.returnLogisticsResponseDTO;
    return (
      <div className={styles.base}>
        {/* <MobileOnly>
          <div className={styles.header}>
            Select mode of return
            <div className={styles.cancel}>
              <UnderLinedButton
                label="Cancel"
                color="#ff1744"
                onClick={() => this.handleCancel()}
              />
            </div>
          </div>
          {this.props.onContinue && (
            <div className={styles.buttonHolder}>
              <div className={styles.button}>
                <Button
                  width={175}
                  type="primary"
                  label={this.props.buttonText}
                  onClick={() => this.handleContinue()}
                />
              </div>
            </div>
          )}
        </MobileOnly> */}
        {/* <div className={styles.content}>
					{data && (
						<div className={styles.card}>
							<div className={styles.returnModesHeading}>Pickup Address:</div>
							<div className={styles.addressText}>
								{data.deliveryAddress.line1} ,&nbsp;
								{data.deliveryAddress.landmark} ,&nbsp;
								{data.deliveryAddress.town} ,&nbsp;
								{data.deliveryAddress.state}&nbsp;
								{data.deliveryAddress.postalCode}
							</div>
						</div>
					)}
				</div> */}
        <div className={styles.content}>
          {this.isReturnModesEnabled() && (
            <div
              className={
                !this.state.isModeSelected
                  ? styles.refundableModes
                  : styles.returnModes
              }
            >
              {!this.state.isModeSelected && (
                <DesktopOnly>
                  <div className={styles.header}>Select mode of return</div>
                </DesktopOnly>
              )}
              {/* {data.returnModes.quickDrop &&
								returnStoreDetailsList &&
								returnStoreDetailsList.length > 0 && (
									<label className={styles.labelForRadioBtn}>
										<input
											className={styles.radioBtn}
											type="radio"
											value="Return To Store"
											checked={this.state.selectedOption === 'Return To Store'}
											onChange={this.radioChange}
										/>
										Return To Store
									</label>
								)}
							{data.returnModes.schedulePickup && (
								<label className={styles.labelForRadioBtn}>
									<input
										className={styles.radioBtn}
										type="radio"
										value="Pick Up"
										checked={this.state.selectedOption === 'Pick Up'}
										onChange={this.radioChange}
									/>
									Pick Up
								</label>
							)}
							{data.returnModes.selfCourier && (
								<label className={styles.labelForRadioBtn}>
									<input
										className={styles.radioBtn}
										type="radio"
										value="Self Courier"
										checked={this.state.selectedOption === 'Self Courier'}
										onChange={this.radioChange}
									/>
									Self Courier
									<span className={styles.radioBtnSubText}>
										{returnLogisticsResponseDTO[0].responseDescription}
									</span>
								</label>
							)} */}
              {/* {!this.state.isModeSelected && (
								<div className={styles.returnModesWithBorder}>
									{data.returnModes.quickDrop &&
										!this.state.isModeSelected && (
											<SelectReturnDate
												label="Return to store"
												selected={this.state.selectedMode === QUICK_DROP}
												selectItem={() => {
													this.handleSelect(QUICK_DROP);
												}}
											/>
										)}
									{data.returnModes.schedulePickup &&
										!this.state.isModeSelected && (
											<SelectReturnDate
												label="Tata CliQ Pick Up"
												selectItem={() => {
													this.handleSelect(SCHEDULED_PICKUP);
												}}
												selected={this.state.selectedMode === SCHEDULED_PICKUP}
											/>
										)}
									{data.returnModes.selfCourier &&
										!this.state.isModeSelected && (
											<SelectReturnDate
												selectItem={() => {
													this.handleSelect(SELF_COURIER);
												}}
												label="Self Courier"
												selected={this.state.selectedMode === SELF_COURIER}
											/>
										)}
								</div>
							)} */}

              <DesktopOnly>
                {this.state.selectedMode === QUICK_DROP && (
                  <ReturnToStoreContainer
                    {...this.state}
                    {...this.props}
                    selectReturnMode={() => this.selectReturnMode()}
                    cancelReturnMode={() => this.cancelReturnMode()}
                    onChangeBankDetails={val => this.onChangeBankDetails(val)}
                  />
                )}
                {this.state.selectedMode === SCHEDULED_PICKUP && (
                  <ReturnCliqAndPiqContainer
                    {...this.state}
                    {...this.props}
                    selectReturnMode={() => this.selectReturnMode()}
                    cancelReturnMode={() => this.cancelReturnMode()}
                    onChangeBankDetails={val => this.onChangeBankDetails(val)}
                  />
                )}
                {this.state.selectedMode === SELF_COURIER && (
                  <SelfCourierContainer {...this.state} {...this.props} />
                )}
              </DesktopOnly>
            </div>
          )}
          {!this.isReturnModesEnabled() && (
            <div className={styles.text}>
              sorry we are not able to process your request, contact customer
              care 90291 08282
            </div>
          )}
          {/* <DesktopOnly>
            {!this.state.isModeSelected && (
              <DummyTab title={REFUND_DETAILS} number={3} />
            )}
          </DesktopOnly> */}
        </div>
      </div>
    );
  }
}
ReturnModes.propTypes = {
  selectedMode: PropTypes.oneOf([QUICK_DROP, SCHEDULED_PICKUP, SELF_COURIER]),
  selectMode: PropTypes.func
};
