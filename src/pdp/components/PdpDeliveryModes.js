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
    //const deliveryModesATP = this.props.deliveryModesATP;
    let getDeliveryModesByWinningUssid = "";
    if (
      this.props &&
      this.props.pincodeDetails &&
      this.props.pincodeDetails.deliveryOptions &&
      this.props.pincodeDetails.deliveryOptions.pincodeListResponse &&
      this.props.pincodeDetails.deliveryOptions.pincodeListResponse
    ) {
      getDeliveryModesByWinningUssid = this.props.pincodeDetails.deliveryOptions.pincodeListResponse.find(
        val => {
          return val.ussid === this.props.winningUssID;
        }
      );
    }
    const QuiqPiq =
      getDeliveryModesByWinningUssid &&
      getDeliveryModesByWinningUssid.quickDeliveryMode;
    if (
      getDeliveryModesByWinningUssid &&
      getDeliveryModesByWinningUssid.validDeliveryModes
    ) {
      deliveryDates = getDeliveryModesByWinningUssid.validDeliveryModes;
    }
    const isCod = this.props && this.props.isCod;

    console.log(
      "props, quiqpiq, deliverydates and placedTime in pdpdeliverymodes is : ",
      this.props,
      QuiqPiq,
      deliveryDates
    );

    return (
      <div className={styles.base}>
        {QuiqPiq === "Y" && (
          <DeliveryInformation
            isQuiqPiq={QuiqPiq}
            isStaticText={true}
            fontSize={"14px"}
            available={true}
            type={QUIQPIQ}
          />
        )}
        {deliveryDates &&
          deliveryDates
            .map(val => {
              return val.type;
            })
            .includes(SHORT_SAME_DAY_DELIVERY) && (
            <DeliveryInformation
              isQuiqPiq={QuiqPiq}
              pdpApparel={this.props.pdpApparel}
              type={SHORT_SAME_DAY_DELIVERY}
              cutOffTime={
                deliveryDates &&
                deliveryDates
                  .filter(val => {
                    return val.type === SHORT_SAME_DAY_DELIVERY;
                  })
                  .map(val => {
                    return val.cutoffTime;
                  })[0]
              }
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
                deliveryDates
                  .filter(val => {
                    return val.type === SHORT_SAME_DAY_DELIVERY;
                  })
                  .map(val => {
                    return val.deliveryDate;
                  })[0]
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
              isQuiqPiq={QuiqPiq}
              pdpApparel={this.props.pdpApparel}
              type={SHORT_EXPRESS}
              available={
                deliveryDates &&
                deliveryDates
                  .map(val => {
                    return val.type;
                  })
                  .includes(SHORT_EXPRESS)
              }
              cutOffTime={
                deliveryDates &&
                deliveryDates
                  .filter(val => {
                    return val.type === SHORT_EXPRESS;
                  })
                  .map(val => {
                    return val.cutoffTime;
                  })[0]
              }
              placedTime={
                deliveryDates &&
                deliveryDates
                  .filter(val => {
                    return val.type === SHORT_EXPRESS;
                  })
                  .map(val => {
                    return val.deliveryDate;
                  })[0]
              }
            />
          )}
        {deliveryDates &&
          deliveryDates
            .map(val => {
              return val.type;
            })
            .includes(SHORT_COLLECT) && (
            <DeliveryInformation
              pdpApparel={this.props.pdpApparel}
              onPiq={this.props.onPiq}
              type={SHORT_COLLECT}
              available={
                deliveryDates &&
                deliveryDates
                  .map(val => {
                    return val.type;
                  })
                  .includes(SHORT_COLLECT)
              }
              showCliqAndPiqButton={false}
              isClickable={true}
              isShowCliqAndPiqUnderLineText={localStorage.getItem(
                DEFAULT_PIN_CODE_LOCAL_STORAGE
              )}
              numberOfStore={`
                    ${this.props.availableStores} more stores nearby`}
              splitIntoTwoLine={false}
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
              .includes(SHORT_COLLECT) ||
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
                  type={SHORT_HOME_DELIVERY}
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
                    deliveryDates
                      .filter(val => {
                        return val.type === SHORT_HOME_DELIVERY;
                      })
                      .map(val => {
                        return val.deliveryDate;
                      })[0]
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
