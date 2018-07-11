import React from "react";
import { Redirect } from "react-router-dom";
import OrderCard from "./OrderCard";
import SelectReturnDate from "./SelectReturnDate";
import ReturnsFrame from "./ReturnsFrame";
import PropTypes from "prop-types";
import styles from "./ReturnModes.css";
import DeskTopOnly from "../../general/components/DesktopOnly.js";
import MobileOnly from "../../general/components/MobileOnly.js";
import DummyTab from "../../cart/components/DummyTab.js";
import UnderLinedButton from "../../general/components/UnderLinedButton";
import ReturnToStoreContainer from "../containers/ReturnToStoreContainer.js";
import ReturnCliqAndPiqContainer from "../containers/ReturnCliqAndPiqContainer.js";
import SelfCourierContainer from "../containers/SelfCourierContainer.js";
import { checkUserAgentIsMobile } from "../../lib/UserAgent.js";

import Button from "../../general/components/Button";
import checkIcon from "../../general/components/img/check.svg";
import Icon from "../../xelpmoc-core/Icon";
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
      selectedMode: null
    };
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
  navigateToReturnLanding() {
    return (
      <Redirect
        to={`${RETURNS_PREFIX}/${
          this.orderCode
        }${RETURN_LANDING}${RETURNS_REASON}`}
      />
    );
  }

  isReturnModesEnabled = () => {
    const data = this.props.returnProductDetails;
    if (
      (data && data.returnModes && data.returnModes.quickDrop) ||
      (data && data.returnModes && data.returnModes.schedulePickup) ||
      (data && data.returnModes && data.returnModes.selfCourier)
    ) {
      return true;
    }
    return false;
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
    const data = this.props.returnProductDetails;
    return (
      <div className={styles.base}>
        <MobileOnly>
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
        </MobileOnly>
        <div className={styles.content}>
          <div className={styles.card}>
            <OrderCard
              imageUrl={
                data &&
                data.orderProductWsDTO &&
                data.orderProductWsDTO[0] &&
                data.orderProductWsDTO[0].imageURL
              }
              productName={
                productInfo && productInfo.product && productInfo.product.name
              }
              price={
                productInfo &&
                productInfo.totalPrice &&
                productInfo.totalPrice.value
              }
              isSelect={true}
              quantity={true}
              onHollow={this.props.onHollow}
              orderPlace={this.props.orderDate}
              orderId={this.props.orderId}
              productBrand={this.props.productBrand}
              showQuantity={false}
            >
              {productInfo &&
                productInfo.quantity && (
                  <div className={styles.quantity}>
                    Qty {productInfo.quantity}
                  </div>
                )}
            </OrderCard>
          </div>
          <DeskTopOnly>
            <div className={styles.selectedDefectiveNode}>
              <div className={styles.headerForDefectiveReason}>
                Select reason for your return
              </div>
              <div className={styles.cancelButtonHolder}>
                <UnderLinedButton
                  size="14px"
                  fontFamily="regular"
                  color="#000000"
                  label="Change"
                  onClick={() => this.handleCancel()}
                />
              </div>
              <div className={styles.checkIcon}>
                <Icon image={checkIcon} size={40} />
              </div>
              <div className={styles.defectiveProductData}>
                {this.props.selectedReason}
              </div>
            </div>
          </DeskTopOnly>
          {this.isReturnModesEnabled() && (
            <div className={styles.returnModes}>
              <DeskTopOnly>
                <div className={styles.header}>
                  <div className={styles.circleHolder}>
                    <div className={styles.circle}>2</div>
                  </div>
                  Select mode of return
                </div>
              </DeskTopOnly>
              <div className={styles.returnModesWithBorder}>
                {data.returnModes.quickDrop && (
                  <SelectReturnDate
                    label="Return to store"
                    selected={this.state.selectedMode === QUICK_DROP}
                    selectItem={() => {
                      this.handleSelect(QUICK_DROP);
                    }}
                  />
                )}
                {data.returnModes.schedulePickup && (
                  <SelectReturnDate
                    label="Tata CliQ Pick Up"
                    selectItem={() => {
                      this.handleSelect(SCHEDULED_PICKUP);
                    }}
                    selected={this.state.selectedMode === SCHEDULED_PICKUP}
                  />
                )}
                {data.returnModes.selfCourier && (
                  <SelectReturnDate
                    selectItem={() => {
                      this.handleSelect(SELF_COURIER);
                    }}
                    label="Self Courier"
                    selected={this.state.selectedMode === SELF_COURIER}
                  />
                )}
              </div>
              {this.state.selectedMode === QUICK_DROP && (
                <ReturnToStoreContainer {...this.state} {...this.props} />
              )}
              {this.state.selectedMode === SCHEDULED_PICKUP && (
                <ReturnCliqAndPiqContainer {...this.state} {...this.props} />
              )}
              <DeskTopOnly>
                {this.state.selectedMode === SCHEDULED_PICKUP && (
                  <div className={styles.cancelPickUpButtonHolder}>
                    <div className={styles.continuePickup}>
                      <div className={styles.button}>
                        <Button
                          width={175}
                          type="primary"
                          label={"Continue"}
                          onClick={() => this.handleContinuePickUp()}
                        />
                      </div>
                    </div>
                    <div className={styles.cancelPickUp}>
                      <UnderLinedButton
                        label="Cancel"
                        color="#000000"
                        onClick={() => this.handleCancelPickUP()}
                      />
                    </div>
                  </div>
                )}
              </DeskTopOnly>
            </div>
          )}
          {!this.isReturnModesEnabled() && (
            <div className={styles.text}>
              sorry we are not able to process your request, contact customer
              care 90291 08282
            </div>
          )}
          <DeskTopOnly>
            <DummyTab title={REFUND_DETAILS} number={3} />
          </DeskTopOnly>
        </div>
      </div>
    );
  }
}
ReturnModes.propTypes = {
  selectedMode: PropTypes.oneOf([QUICK_DROP, SCHEDULED_PICKUP, SELF_COURIER]),
  selectMode: PropTypes.func
};
