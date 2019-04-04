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
      active: null
    };
  }

  render() {
    return (
      <div className={styles.base}>
        <div className={styles.header}>Out of Stock</div>
        <div className={styles.subHeader}>
          Select a size to view it's smilar products
        </div>
        <div className={styles.allButton}>
          {this.props.ownProps.sizes.map((datum, i) => {
            return (
              <SizeSelect
                key={i}
                selected={
                  datum.colorlink.selected
                    ? this.props.history.location.state.isSizeSelected
                    : false
                }
                size={datum.sizelink.size}
                value={datum.sizelink.size}
                fontSize={this.props.textSize}
                onSelect={() => this.setState({ datum: datum })}
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
