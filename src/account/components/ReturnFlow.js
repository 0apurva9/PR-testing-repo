import React from "react";
import cloneDeep from "lodash/cloneDeep";
import { Route } from "react-router-dom";
import ReturnCliqAndPiqContainer from "../containers/ReturnCliqAndPiqContainer.js";

import ReturnModes from "./ReturnModes.js";
import ReturnToStoreContainer from "../containers/ReturnToStoreContainer";
import ReturnBankForm from "./ReturnBankForm";
import ReturnReasonAndModes from "./ReturnReasonAndModes";
import MDSpinner from "react-md-spinner";
import SelfCourierContainer from "../containers/SelfCourierContainer";
import {
  RETURNS,
  RETURNS_REASON,
  RETURNS_MODES,
  RETURNS_STORE_MAP,
  RETURNS_STORE_BANK_FORM,
  RETURNS_STORE_FINAL,
  RETURN_TO_STORE,
  RETURN_LANDING,
  RETURNS_PREFIX,
  RETURN_CLIQ_PIQ,
  RETURNS_SELF_COURIER
} from "../../lib/constants";
const RETURN_FLAG = "R";

export default class ReturnFlow extends React.Component {
  constructor(props) {
    super(props);
    this.orderCode = props.location.pathname.split("/")[2];
    this.isCOD = props.location.state && props.location.state.isCOD;
    this.state = {
      bankDetail: {},
      isCOD: this.isCOD
    };
  }
  componentDidMount() {
    let orderCode = this.orderCode;
    let transactionId = this.props.location.state.transactionId;

    let productDetails = {};
    productDetails.transactionId = transactionId;
    productDetails.returnCancelFlag = RETURN_FLAG;
    productDetails.orderCode = orderCode;

    this.props.returnProductDetailsFunc(productDetails);
    this.props.getReturnRequest(orderCode, transactionId);
  }
  onChangeBankingDetail(val) {
    let bankDetail = cloneDeep(this.state.bankDetail);
    Object.assign(bankDetail, val);
    this.setState({ bankDetail });
  }

  onChangeReasonAndMode(val) {
    this.setState(val);
  }
  navigateToShowInitiateReturn() {
    this.props.history.push({
      pathname: `${RETURNS_PREFIX}/${
        this.orderCode
      }${RETURN_LANDING}${RETURNS_MODES}`,
      state: {
        isRequestFromFlow: true
      }
    });
  }
  renderLoader() {
    return <MDSpinner />;
  }
  render() {
    if (!this.props.returnRequest || !this.props.returnProductDetails) {
      return this.renderLoader();
    }
    return (
      <React.Fragment>
        <Route
          path={`${RETURNS}${RETURN_LANDING}`}
          render={() => (
            <ReturnReasonAndModes
              {...this.state}
              {...this.props}
              onChange={val => this.onChangeReasonAndMode(val)}
            />
          )}
        />
        <Route
          exact
          path={`${RETURNS}${RETURNS_STORE_BANK_FORM}`}
          render={() => (
            <ReturnBankForm
              onChange={val => this.onChangeBankingDetail(val)}
              onContinue={() => this.navigateToShowInitiateReturn()}
            />
          )}
        />
        <Route
          path={`${RETURNS}${RETURN_TO_STORE}`}
          render={() => (
            <ReturnToStoreContainer {...this.state} {...this.props} />
          )}
        />
        <Route
          path={`${RETURNS}${RETURN_CLIQ_PIQ}`}
          render={() => (
            <ReturnCliqAndPiqContainer {...this.state} {...this.props} />
          )}
        />
        <Route
          exact
          path={`${RETURNS}${RETURNS_SELF_COURIER}`}
          render={() => <SelfCourierContainer {...this.state} />}
        />

        {/* end of need to call return bia store pick up  routes */}
      </React.Fragment>
    );
  }
}
