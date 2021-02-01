import React from "react";
import SizeSelect from "./../../pdp/components/SizeSelect";

import styles from "./sizeSelectorOOSModal.css";
import Button from "../../general/components/Button";
import { SIMILAR_PRODUCTS_OOS_MODAL } from "./../modal.actions";

export default class SizeSelectorOOSModal extends React.Component {
  constructor() {
    super();
    this.state = {
      datum: {},
      active: null,
      ownProps: null
    };
  }

  pushToArray(arr, i, bool) {
    for (let j = 0; j < arr.sizes.length; j++) {
      arr.sizes[j].colorlink.selected = !bool;
    }
    arr.sizes[i].colorlink.selected = bool;
  }

  updateSize(datum, i, bool) {
    this.setState({ datum: datum });
    let sizeArray = this.state.ownProps;
    this.pushToArray(sizeArray, i, bool);
  }

  componentDidMount() {
    let sizeArray = this.props.ownProps;
    this.setState({ ownProps: sizeArray });
  }

  render() {
    return (
      <div className={styles.base}>
        <div className={styles.header}>Out of Stock</div>
        <div className={styles.subHeader}>
          Select a size to view it&#39; s smilar products
        </div>
        <div className={styles.allButton}>
          {this.props.ownProps.sizes.map((datum, i) => {
            return (
              <SizeSelect
                key={i}
                selected={datum.colorlink.selected}
                id={`selectSize${i}`}
                size={datum.sizelink.size}
                value={datum.sizelink.size}
                fontSize={this.props.textSize}
                onSelect={() => this.updateSize(datum, i, true)}
              />
            );
          })}
        </div>
        <div className={styles.buttonProceed}>
          <Button
            type="primary"
            height={45}
            width={195}
            label="Proceed"
            onClick={() =>
              this.props.showModal(SIMILAR_PRODUCTS_OOS_MODAL, {
                product: this.state.datum
              })
            }
          />
        </div>
      </div>
    );
  }
}
