import React from "react";
import Loader from "../../general/components/Loader";
import ReturnReasonForm from "./ReturnReasonForm.js";
import ReturnModes from "./ReturnModes.js";
import {
  CASH_ON_DELIVERY,
  RETURNS_PREFIX,
  RETURN_LANDING,
  RETURNS_MODES,
  RETURNS_REASON,
  QUICK_DROP,
  RETURN_TO_STORE,
  RETURNS_STORE_MAP,
  RETURN_CLIQ_PIQ,
  SCHEDULED_PICKUP,
  RETURN_CLIQ_PIQ_ADDRESS,
  RETURNS_STORE_BANK_FORM,
  SELF_COURIER
} from "../../lib/constants";
const REG_X_FOR_REASON = /reason/i;
const REG_X_FOR_MODES = /modes/i;

export default class ReturnReasonAndModes extends React.Component {
  constructor(props) {
    super();
    this.orderCode = props.location.pathname.split("/")[2];
  }
  renderLoader() {
    return <Loader />;
  }
  onChange(val) {
    if (this.props.onChange) {
      this.props.onChange(val);
    }
  }
  renderToModes(data) {
    this.props.onChange({ data });
    if (this.props.isCOD) {
      this.props.history.push({
        pathname: `${RETURNS_PREFIX}/${
          this.orderCode
        }${RETURNS_STORE_BANK_FORM}`,
        state: {
          authorizedRequest: true
        }
      });
    } else {
      this.props.history.push({
        pathname: `${RETURNS_PREFIX}/${
          this.orderCode
        }${RETURN_LANDING}${RETURNS_MODES}`,
        state: {
          authorizedRequest: true
        }
      });
    }
  }
  onSelectMode(mode) {
    if (mode === QUICK_DROP) {
      this.props.history.push({
        pathname: `${RETURNS_PREFIX}/${
          this.orderCode
        }${RETURN_TO_STORE}${RETURNS_STORE_MAP}`,
        state: {
          authorizedRequest: true
        }
      });
    } else if (mode === SCHEDULED_PICKUP) {
      this.props.history.push({
        pathname: `${RETURNS_PREFIX}/${
          this.orderCode
        }${RETURN_CLIQ_PIQ}${RETURN_CLIQ_PIQ_ADDRESS}`,
        state: {
          authorizedRequest: true
        }
      });
    } else if (mode === SELF_COURIER) {
      this.props.history.push({
        pathname: `${RETURNS_PREFIX}/${
          this.orderCode
        }${RETURN_CLIQ_PIQ}${RETURN_CLIQ_PIQ_ADDRESS}`,
        state: {
          authorizedRequest: true
        }
      });
    }
  }
  render() {
    if (!this.props.returnRequest || !this.props.returnProductDetails) {
      return this.renderLoader();
    }

    const { pathname } = this.props.location;

    const renderReasonForm = (
      <ReturnReasonForm
        returnProductDetails={this.props.returnProductDetails}
        onChange={comment => this.onChange({ comment })}
        onChangePrimary={reason => this.onChange({ reason })}
        onContinue={data => this.renderToModes(data)}
      />
    );
    const renderReturnMode = (
      <ReturnModes
        {...this.props}
        productInfo={this.props.returnRequest.returnEntry.orderEntries[0]}
        selectMode={mode => this.onSelectMode(mode)}
      />
    );
    return (
      <React.Fragment>
        {pathname.match(REG_X_FOR_REASON) && renderReasonForm}
        {pathname.match(REG_X_FOR_MODES) && renderReturnMode}
      </React.Fragment>
    );
  }
}
