import React from "react";
import DeliveryInformations from "../../general/components/DeliveryInformations.js";
export default class DeliveryInfoSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCode: ""
    };
  }
  handleSelect(val) {
    this.setState({ selectedCode: val }, () => {
      if (this.props.onSelect) {
        this.props.onSelect(val);
      }
    });
  }
  render() {
    return (
      <div>
        {this.props.deliveryInformation.map((datum, i) => {
          return (
            <DeliveryInformations
              key={i}
              type={datum.code}
              header={datum.name}
              placedTime={datum.desc}
              selected={datum.code === this.state.selectedCode}
              onSelect={val => this.handleSelect(val)}
            />
          );
        })}
      </div>
    );
  }
}
