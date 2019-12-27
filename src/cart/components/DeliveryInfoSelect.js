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
      availableStores = [].concat
        .apply([], [].concat.apply([], someData))
        .map(store => {
          return store && store.storeId;
        });
    }
    return (
      <div>
        {this.props.deliveryInformationWithDate &&
          this.props.deliveryInformationWithDate.map((datum, i) => {
            <DeliveryInformations
              key={i}
              type={datum.type}
              //header={datum.name}
              showDeliveryCharge={true}
              placedTime={datum.deliveryDate}
              deliveryCharge={datum.deliveryCost}
              selected={datum.code === this.state.selectedCode}
              //onSelect={val => this.handleSelect(val)}
              onSelect={false}
              onPiq={val => this.onPiq(val)}
              showCliqAndPiqButton={true}
              available={true}
              isClickable={this.props.isClickable}
              /* numberOfStore={
                this.props.deliveryInformationWithDate &&
                this.props.deliveryInformationWithDate.map(val => {
                  if (val.type === "CNC")
                    return `${availableStores &&
                      availableStores.length} stores nearby`;
                })
              } */
              numberOfStore={
                datum.type === "CNC"
                  ? `${availableStores && availableStores.length} stores nearby`
                  : null
              }
              cutOffTime={
                datum.type === "SDD" || "ED" ? datum.cutoffTime : null
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
  }
}
