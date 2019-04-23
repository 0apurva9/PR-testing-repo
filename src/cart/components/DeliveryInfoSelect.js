import React from "react";
import DeliveryInformations from "../../general/components/DeliveryInformations.js";
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
      const allStoreIds = [].concat
        .apply([], [].concat.apply([], someData))
        .map(store => {
          return store && store.storeId;
        });
      availableStores = this.props.allStores
        ? this.props.allStores.filter(val => {
            return allStoreIds.includes(val.slaveId);
          })
        : [];
    }
    return (
      <div>
        {this.props.deliveryInformation.map((datum, i) => {
          return (
            <DeliveryInformations
              key={i}
              type={datum.code}
              header={datum.name}
              showDeliveryCharge={true}
              placedTime={datum.desc}
              deliveryCharge={datum.deliveryCost}
              selected={datum.code === this.state.selectedCode}
              onSelect={val => this.handleSelect(val)}
              onPiq={val => this.onPiq(val)}
              showCliqAndPiqButton={true}
              available={true}
              isClickable={this.props.isClickable}
              numberOfStore={
                this.props.deliveryInformationWithDate &&
                this.props.deliveryInformationWithDate.map(val => {
                  if (val.type === "CNC")
                    return `${availableStores &&
                      availableStores.length} stores nearby`;
                })
              }
              deliveryInformationWithDate={
                this.props.deliveryInformationWithDate
              }
              deliveryInformationByCart={true}
              isTop={this.props.isTop}
              inCartPage={this.props.inCartPage}
              inCartPageIcon={this.props.inCartPageIcon}
              isArrowIcon={this.props.isArrowIcon}
            />
          );
        })}
      </div>
    );
  }
}
