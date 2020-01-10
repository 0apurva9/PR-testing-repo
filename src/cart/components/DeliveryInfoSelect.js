import React from "react";
import DeliveryInformation from "../../general/components/DeliveryInformations.js";
import styles from "./DeliveryInfoSelect.css";
import {
  EXPRESS,
  COLLECT,
  HOME_DELIVERY,
  SAME_DAY_DELIVERY,
  DEFAULT_PIN_CODE_LOCAL_STORAGE,
  SHORT_EXPRESS,
  SHORT_COLLECT,
  SHORT_HOME_DELIVERY,
  SHORT_SAME_DAY_DELIVERY
} from "../../lib/constants";

export default class DeliveryInfoSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCode: props.selected
    };
  }
  handleSelect(val) {
    this.setState({ selectedCode: val }, () => {
      if (this.props.onSelect) {
        this.props.onSelect(val);
      }
    });
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.selected !== this.state.selectedCode) {
      this.setState({ selectedCode: nextProps.selected });
    }
  }
  onPiq = () => {
    this.props.onPiq();
  };
  render() {
    let availableStores = "";
    let deliveryDate =
      this.props &&
      this.props.deliveryInformationWithDate &&
      this.props.deliveryInformationWithDate.find(val => {
        return val.type === "CNC";
      });
    const firstSlaveData = deliveryDate;
    if (
      firstSlaveData &&
      firstSlaveData.type &&
      firstSlaveData.type === "CNC"
    ) {
      const someData =
        firstSlaveData &&
        firstSlaveData.CNCServiceableSlavesData &&
        firstSlaveData.CNCServiceableSlavesData.map(slaves => {
          return slaves;
        });
      availableStores = [].concat
        .apply([], [].concat.apply([], someData))
        .map(store => {
          return store && store.storeId;
        });
    }
    let deliveryInformationWithDate = this.props.deliveryInformationWithDate;
    let elligibleDeliveryModes = this.props.deliveryInformation;
    const isCod = this.props.isCod;
    console.log(
      "props coming to deliveryInfoselect is and state is ",
      this.props,
      this.state
    );
    return (
      <div className={styles.base}>
        {deliveryInformationWithDate &&
          deliveryInformationWithDate
            .map(val => {
              return val.type;
            })
            .includes(SHORT_SAME_DAY_DELIVERY) && (
            <DeliveryInformation
              code={
                elligibleDeliveryModes &&
                elligibleDeliveryModes
                  .filter(val => {
                    return val.code === SAME_DAY_DELIVERY;
                  })
                  .map(val => {
                    return val.code;
                  })[0]
              }
              type={SHORT_SAME_DAY_DELIVERY}
              showDeliveryCharge={true}
              selected={
                (elligibleDeliveryModes &&
                  elligibleDeliveryModes
                    .filter(val => {
                      return val.code === SAME_DAY_DELIVERY;
                    })
                    .map(val => {
                      return val.code;
                    })[0]) === this.state.selectedCode
              }
              onSelect={val => this.handleSelect(val)}
              onPiq={val => this.onPiq(val)}
              isClickable={this.props.isClickable}
              deliveryInformationByCart={true}
              isTop={this.props.isTop}
              inCartPage={this.props.inCartPage}
              inCartPageIcon={this.props.inCartPageIcon}
              isArrowIcon={this.props.isArrowIcon}
              deliveryCharge={
                elligibleDeliveryModes &&
                elligibleDeliveryModes
                  .filter(val => {
                    return val.code === SAME_DAY_DELIVERY;
                  })
                  .map(val => {
                    return val.deliveryCost;
                  })[0]
              }
              cutOffTime={
                deliveryInformationWithDate &&
                deliveryInformationWithDate
                  .filter(val => {
                    return val.type === SHORT_SAME_DAY_DELIVERY;
                  })
                  .map(val => {
                    return val.cutoffTime;
                  })[0]
              }
              available={
                deliveryInformationWithDate &&
                deliveryInformationWithDate
                  .map(val => {
                    return val.type;
                  })
                  .includes(SHORT_SAME_DAY_DELIVERY)
              }
              placedTime={
                deliveryInformationWithDate &&
                deliveryInformationWithDate
                  .filter(val => {
                    return val.type === SHORT_SAME_DAY_DELIVERY;
                  })
                  .map(val => {
                    return val.deliveryDate;
                  })[0]
              }
            />
          )}

        {deliveryInformationWithDate &&
          deliveryInformationWithDate
            .map(val => {
              return val.type;
            })
            .includes(SHORT_EXPRESS) && (
            <DeliveryInformation
              code={
                elligibleDeliveryModes &&
                elligibleDeliveryModes
                  .filter(val => {
                    return val.code === EXPRESS;
                  })
                  .map(val => {
                    return val.code;
                  })[0]
              }
              type={SHORT_EXPRESS}
              showDeliveryCharge={true}
              selected={
                (elligibleDeliveryModes &&
                  elligibleDeliveryModes
                    .filter(val => {
                      return val.code === EXPRESS;
                    })
                    .map(val => {
                      return val.code;
                    })[0]) === this.state.selectedCode
              }
              onSelect={val => this.handleSelect(val)}
              onPiq={val => this.onPiq(val)}
              isClickable={this.props.isClickable}
              deliveryInformationByCart={true}
              isTop={this.props.isTop}
              inCartPage={this.props.inCartPage}
              inCartPageIcon={this.props.inCartPageIcon}
              isArrowIcon={this.props.isArrowIcon}
              deliveryCharge={
                elligibleDeliveryModes &&
                elligibleDeliveryModes
                  .filter(val => {
                    return val.code === EXPRESS;
                  })
                  .map(val => {
                    return val.deliveryCost;
                  })[0]
              }
              available={
                deliveryInformationWithDate &&
                deliveryInformationWithDate
                  .map(val => {
                    return val.type;
                  })
                  .includes(SHORT_EXPRESS)
              }
              cutOffTime={
                deliveryInformationWithDate &&
                deliveryInformationWithDate
                  .filter(val => {
                    return val.type === SHORT_EXPRESS;
                  })
                  .map(val => {
                    return val.cutoffTime;
                  })[0]
              }
              placedTime={
                deliveryInformationWithDate &&
                deliveryInformationWithDate
                  .filter(val => {
                    return val.type === SHORT_EXPRESS;
                  })
                  .map(val => {
                    return val.deliveryDate;
                  })[0]
              }
            />
          )}

        {deliveryInformationWithDate &&
          deliveryInformationWithDate
            .map(val => {
              return val.type;
            })
            .includes(SHORT_COLLECT) && (
            <DeliveryInformation
              code={
                elligibleDeliveryModes &&
                elligibleDeliveryModes
                  .filter(val => {
                    return val.code === COLLECT;
                  })
                  .map(val => {
                    return val.code;
                  })[0]
              }
              pdpApparel={this.props.pdpApparel}
              onPiq={this.props.onPiq}
              type={SHORT_COLLECT}
              showDeliveryCharge={true}
              selected={
                (elligibleDeliveryModes &&
                  elligibleDeliveryModes
                    .filter(val => {
                      return val.code === COLLECT;
                    })
                    .map(val => {
                      return val.code;
                    })[0]) === this.state.selectedCode
              }
              onSelect={val => this.handleSelect(val)}
              onPiq={val => this.onPiq(val)}
              showCliqAndPiqButton={true}
              available={true}
              isClickable={this.props.isClickable}
              deliveryInformationByCart={true}
              isTop={this.props.isTop}
              inCartPage={this.props.inCartPage}
              inCartPageIcon={this.props.inCartPageIcon}
              isArrowIcon={this.props.isArrowIcon}
              deliveryCharge={
                elligibleDeliveryModes &&
                elligibleDeliveryModes
                  .filter(val => {
                    return val.code === COLLECT;
                  })
                  .map(val => {
                    return val.deliveryCost;
                  })[0]
              }
              available={
                deliveryInformationWithDate &&
                deliveryInformationWithDate
                  .map(val => {
                    return val.type;
                  })
                  .includes(SHORT_COLLECT)
              }
              isClickable={this.props.isClickable}
              isShowCliqAndPiqUnderLineText={localStorage.getItem(
                DEFAULT_PIN_CODE_LOCAL_STORAGE
              )}
              numberOfStore={
                deliveryInformationWithDate &&
                deliveryInformationWithDate
                  .map(val => {
                    return val.type;
                  })
                  .includes(SHORT_COLLECT) &&
                `${availableStores &&
                  availableStores.length} more stores nearby`
              }
              splitIntoTwoLine={false}
            />
          )}
        <div
          className={
            (deliveryInformationWithDate &&
              deliveryInformationWithDate
                .map(val => {
                  return val.type;
                })
                .includes(SHORT_EXPRESS)) ||
            (elligibleDeliveryModes &&
              elligibleDeliveryModes
                .map(val => {
                  return val.code;
                })
                .includes(SHORT_COLLECT)) ||
            (deliveryInformationWithDate &&
              deliveryInformationWithDate
                .map(val => {
                  return val.type;
                })
                .includes(SHORT_SAME_DAY_DELIVERY))
              ? styles.standardAndCashOnDelivery
              : styles.noStandardAndCashOnDelivery
          }
        >
          {deliveryInformationWithDate &&
            deliveryInformationWithDate
              .map(val => {
                return val.type;
              })
              .includes(SHORT_HOME_DELIVERY) && (
              <div className={styles.infoHolder}>
                <DeliveryInformation
                  code={
                    elligibleDeliveryModes &&
                    elligibleDeliveryModes
                      .filter(val => {
                        return val.code === HOME_DELIVERY;
                      })
                      .map(val => {
                        return val.code;
                      })[0]
                  }
                  paddingTop={"0px"}
                  paddingBottom={"0px"}
                  paddingRight={"0px"}
                  type={SHORT_HOME_DELIVERY}
                  showDeliveryCharge={true}
                  selected={
                    (elligibleDeliveryModes &&
                      elligibleDeliveryModes
                        .filter(val => {
                          return val.code === HOME_DELIVERY;
                        })
                        .map(val => {
                          return val.code;
                        })[0]) === this.state.selectedCode
                  }
                  onSelect={val => this.handleSelect(val)}
                  onPiq={val => this.onPiq(val)}
                  isClickable={this.props.isClickable}
                  deliveryInformationByCart={true}
                  isTop={this.props.isTop}
                  inCartPage={this.props.inCartPage}
                  inCartPageIcon={this.props.inCartPageIcon}
                  isArrowIcon={this.props.isArrowIcon}
                  deliveryCharge={
                    elligibleDeliveryModes &&
                    elligibleDeliveryModes
                      .filter(val => {
                        return val.code === HOME_DELIVERY;
                      })
                      .map(val => {
                        return val.deliveryCost;
                      })[0]
                  }
                  available={
                    deliveryInformationWithDate &&
                    deliveryInformationWithDate
                      .map(val => {
                        return val.type;
                      })
                      .includes(SHORT_HOME_DELIVERY)
                  }
                  placedTime={
                    deliveryInformationWithDate &&
                    deliveryInformationWithDate
                      .filter(val => {
                        return val.type === SHORT_HOME_DELIVERY;
                      })
                      .map(val => {
                        return val.deliveryDate;
                      })[0]
                  }
                  notShowDay={true}
                  isHomeDelivery={
                    deliveryInformationWithDate &&
                    deliveryInformationWithDate
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

/*
    {
    return (
      <div>
        {this.props.deliveryInformationWithDate &&
          this.props.deliveryInformationWithDate.map((datum, i) => {
            <DeliveryInformations
              key={i}
              type={datum.type}
              header={datum.name}
              showDeliveryCharge={true}
              placedTime={datum.deliveryDate}
              deliveryCharge={datum.deliveryCost}
              selected={datum.code === this.state.selectedCode}
              onSelect={val => this.handleSelect(val)}
              onPiq={val => this.onPiq(val)}
              showCliqAndPiqButton={true}
              available={true}
              isClickable={this.props.isClickable}
              numberOfStore={
                datum.type === "CNC"
                  ? `${availableStores && availableStores.length} stores nearby`
                  : null
              }
              deliveryInformationWithDate={
                this.props.deliveryInformationWithDate
              }
              deliveryInformationByCart={true}
              isTop={this.props.isTop}
              inCartPage={this.props.inCartPage}
              inCartPageIcon={this.props.inCartPageIcon}
              isArrowIcon={this.props.isArrowIcon}
            />;
          })}
      </div>
    );
        } */
