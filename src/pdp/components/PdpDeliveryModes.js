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
  SHORT_SAME_DAY_DELIVERY,
  SAME_DAY_DELIVERY
} from "../../lib/constants";
import PropTypes from "prop-types";
import styles from "./PdpDeliveryModes.css";
import { checkUserAgentIsMobile } from "../../lib/UserAgent.js";
import { isBrowser } from "browser-or-node";
export default class PdpDeliveryModes extends React.Component {
  render() {
    let deliveryMode = "";
    let deliveryDates = "";
    let baseClass = styles.base;
    let firstSlaveData;
    let availableStores = this.props.availableStores;
    let ussid;
    const { eligibleDeliveryModes, deliveryModesATP } = this.props;
    let getDeliveryModesByWinningUssid = "";
    if (this.props.fromSellerCard) {
      baseClass = `${styles.base} ${styles.sellerBase}`;
    }

    if (this.props.fromSellerCard && this.props.pincodeDetails) {
      deliveryDates = this.props.pincodeDetails.validDeliveryModes;
      firstSlaveData =
        this.props.pincodeDetails &&
        this.props.pincodeDetails.validDeliveryModes &&
        this.props.pincodeDetails.validDeliveryModes.find(val => {
          return val.type === "CNC";
        });
      availableStores =
        firstSlaveData &&
        firstSlaveData.CNCServiceableSlavesData &&
        firstSlaveData.CNCServiceableSlavesData.length;
      ussid = this.props.pincodeDetails.ussid;
      if (
        this.props &&
        this.props.pincodeDetails &&
        this.props.pincodeDetails.quickDeliveryMode
      ) {
        getDeliveryModesByWinningUssid = this.props.pincodeDetails;
      }
    } else {
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

      if (
        getDeliveryModesByWinningUssid &&
        getDeliveryModesByWinningUssid.validDeliveryModes
      ) {
        deliveryDates = getDeliveryModesByWinningUssid.validDeliveryModes;
      }
    }

    const isCod = this.props && this.props.isCod;
    const QuiqPiq =
      getDeliveryModesByWinningUssid &&
      getDeliveryModesByWinningUssid.quickDeliveryMode &&
      getDeliveryModesByWinningUssid.quickDeliveryMode === "Y";
    let wrapperClass =
      (deliveryDates &&
        deliveryDates
          .map(val => {
            return val.type;
          })
          .includes(SHORT_EXPRESS)) ||
      (deliveryDates &&
        deliveryDates
          .map(val => {
            return val.code;
          })
          .includes(SHORT_COLLECT)) ||
      (deliveryDates &&
        deliveryDates
          .map(val => {
            return val.type;
          })
          .includes(SHORT_SAME_DAY_DELIVERY))
        ? styles.standardAndCashOnDelivery
        : styles.noStandardAndCashOnDelivery;
    return (
      <div className={baseClass}>
        {QuiqPiq === true && (
          <div className={styles.quickDeliveryMode}>
            <DeliveryInformation
              isQuiqPiq={QuiqPiq}
              isStaticText={true}
              pdpApparel={this.props.pdpApparel}
              fontSize={"14px"}
              available={true}
              type={QUIQPIQ}
            />
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
                  deliveryMessage={
                    deliveryModesATP &&
                    deliveryModesATP
                      .filter(val => {
                        return val.key === SAME_DAY_DELIVERY;
                      })
                      .map(val => {
                        return val.value;
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
                  deliveryMessage={
                    deliveryModesATP &&
                    deliveryModesATP
                      .filter(val => {
                        return val.key === EXPRESS;
                      })
                      .map(val => {
                        return val.value;
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
                  inPdpPage={true}
                  pdpApparel={this.props.pdpApparel}
                  onPiq={this.props.onPiq}
                  fromSellerCard={this.props.fromSellerCard}
                  ussid={ussid}
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
                  numberOfStore={
                    availableStores
                      ? `${availableStores} more stores nearby`
                      : null
                  }
                  splitIntoTwoLine={false}
                  deliveryMessage={
                    deliveryModesATP &&
                    deliveryModesATP
                      .filter(val => {
                        return val.key === COLLECT;
                      })
                      .map(val => {
                        return val.value;
                      })[0]
                  }
                />
              )}
          </div>
        )}
        <div className={wrapperClass}>
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
                  deliveryMessage={
                    deliveryModesATP &&
                    deliveryModesATP
                      .filter(val => {
                        return val.key === HOME_DELIVERY;
                      })
                      .map(val => {
                        return val.value;
                      })[0]
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
