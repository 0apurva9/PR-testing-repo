import React from "react";
import DeliveryInformation from "../../general/components/DeliveryInformations";
import {
  EXPRESS,
  COLLECT,
  HOME_DELIVERY,
  DEFAULT_PIN_CODE_LOCAL_STORAGE,
  QUIQPIQ,
  SHORT_EXPRESS,
  SHORT_COLLECT,
  SHORT_HOME_DELIVERY,
  SHORT_SAME_DAY_DELIVERY
} from "../../lib/constants";
import PropTypes from "prop-types";
import styles from "./PdpDeliveryModes.css";
import { checkUserAgentIsMobile } from "../../lib/UserAgent.js";
export default class PdpDeliveryModes extends React.Component {
  render() {
    let deliveryMode = "";
    let deliveryDates = "";
    const eligibleDeliveryModes = this.props.eligibleDeliveryModes;
    const deliveryModesATP = this.props.deliveryModesATP;
    const QuiqPiq =
      this.props &&
      this.props.pincodeDetails &&
      this.props.pincodeDetails.deliveryOptions &&
      this.props.pincodeDetails.deliveryOptions.pincodeListResponse &&
      this.props.pincodeDetails.deliveryOptions.pincodeListResponse[0] &&
      this.props.pincodeDetails.deliveryOptions.pincodeListResponse[0].QUIQPIQ;
    if (
      this.props &&
      this.props.pincodeDetails &&
      this.props.pincodeDetails.deliveryOptions &&
      this.props.pincodeDetails.deliveryOptions.pincodeListResponse &&
      this.props.pincodeDetails.deliveryOptions.pincodeListResponse[0] &&
      this.props.pincodeDetails.deliveryOptions.pincodeListResponse[0]
        .validDeliveryModes
    ) {
      deliveryDates = this.props.pincodeDetails.deliveryOptions
        .pincodeListResponse[0].validDeliveryModes;
    } else {
      deliveryMode =
        this.props &&
        this.props.pincodeDetails &&
        this.props.pincodeDetails.deliveryOptions &&
        this.props.pincodeDetails.deliveryOptions.pincodeListResponse &&
        this.props.pincodeDetails.deliveryOptions.pincodeListResponse.filter(
          val => {
            return val.validDeliveryModes;
          }
        );
      deliveryDates =
        deliveryMode && deliveryMode[0] && deliveryMode[0].validDeliveryModes;
    }
    const isCod = this.props && this.props.isCod;
    return (
      <div className={styles.base}>
        {QuiqPiq === "Y" && (
          <DeliveryInformation
            isQuiqPiq={QuiqPiq}
            isStaticText={true}
            fontSize={"14px"}
            available={QuiqPiq === "Y" ? true : false}
          />
        )}
        {deliveryDates &&
          deliveryDates
            .map(val => {
              return val.type;
            })
            .includes(SHORT_SAME_DAY_DELIVERY) && (
            <DeliveryInformation
              pdpApparel={this.props.pdpApparel}
              type={SHORT_SAME_DAY_DELIVERY}
              available={
                deliveryDates &&
                deliveryDates
                  .map(val => {
                    return val.type;
                  })
                  .includes(SHORT_SAME_DAY_DELIVERY)
              }
              placedTime={
                deliveryDates &&
                deliveryDates.find(val => {
                  return val.type === SHORT_SAME_DAY_DELIVERY;
                })
              }
            />
          )}
        {deliveryDates &&
          deliveryDates
            .map(val => {
              return val.type;
            })
            .includes(SHORT_EXPRESS) && (
            <DeliveryInformation
              pdpApparel={this.props.pdpApparel}
              type={EXPRESS}
              available={
                deliveryDates &&
                deliveryDates
                  .map(val => {
                    return val.type;
                  })
                  .includes(SHORT_EXPRESS)
              }
              placedTime={
                deliveryDates &&
                deliveryDates.find(val => {
                  return val.type === SHORT_EXPRESS;
                })
              }
            />
          )}
        {eligibleDeliveryModes
          .map(val => {
            return val.code;
          })
          .includes(COLLECT) && (
          <DeliveryInformation
            pdpApparel={this.props.pdpApparel}
            onPiq={this.props.onPiq}
            type={COLLECT}
            available={eligibleDeliveryModes
              .map(val => {
                return val.code;
              })
              .includes(COLLECT)}
            showCliqAndPiqButton={false}
            isClickable={true}
            isShowCliqAndPiqUnderLineText={localStorage.getItem(
              DEFAULT_PIN_CODE_LOCAL_STORAGE
            )}
            numberOfStore={`
                    ${this.props.availableStores} stores nearby`}
          />
        )}
        <div
          className={
            (deliveryDates &&
              deliveryDates
                .map(val => {
                  return val.type;
                })
                .includes(SHORT_EXPRESS)) ||
            eligibleDeliveryModes
              .map(val => {
                return val.code;
              })
              .includes(COLLECT) ||
            (deliveryDates &&
              deliveryDates
                .map(val => {
                  return val.type;
                })
                .includes(SHORT_SAME_DAY_DELIVERY))
              ? styles.standardAndCashOnDelivery
              : styles.noStandardAndCashOnDelivery
          }
        >
          {deliveryDates &&
            deliveryDates
              .map(val => {
                return val.type;
              })
              .includes(SHORT_HOME_DELIVERY) && (
              <div className={styles.infoHolder}>
                <DeliveryInformation
                  pdpApparel={this.props.pdpApparel}
                  paddingTop={"0px"}
                  paddingBottom={"0px"}
                  paddingRight={"0px"}
                  type={HOME_DELIVERY}
                  available={
                    deliveryDates &&
                    deliveryDates
                      .map(val => {
                        return val.type;
                      })
                      .includes(SHORT_HOME_DELIVERY)
                  }
                  placedTime={
                    deliveryDates &&
                    deliveryDates.find(val => {
                      return val.type === SHORT_HOME_DELIVERY;
                    })
                  }
                  notShowDay={true}
                  isHomeDelivery={
                    deliveryDates &&
                    deliveryDates
                      .map(val => {
                        return val.type;
                      })
                      .includes(SHORT_HOME_DELIVERY)
                      ? true
                      : false
                  }
                />
              </div>
            )}
          {isCod === "Y" && (
            <div className={styles.infoHolder}>
              <DeliveryInformation
                paddingTop={"0px"}
                paddingBottom={"0px"}
                paddingRight={"0px"}
                pdpApparel={this.props.pdpApparel}
                isCod={isCod}
                placedTimeForCod={"Available"}
                available={isCod === "Y"}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}
PdpDeliveryModes.propTypes = {
  iconShow: PropTypes.bool
};
PdpDeliveryModes.defaultProps = {
  iconShow: false
};
