import React from "react";

import styles from "./SizeComponent.css";

export default class SizeComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSelected: false,
      selectedIndex: -1
    };
  }

  handleSelect(i) {
    this.setState({ isSelected: !this.state.isSelected, selectedIndex: i });
  }

  render() {
    const variantOptions =
      this.props &&
      this.props.productDetails &&
      this.props.productDetails.variantOptions;
    const sizeOptions = variantOptions.map(el => el.sizelink);
    let selectedClass;
    return (
      <div className={styles["size-component"]}>
        <div className={styles["size-block"]}>
          <div className={styles["size-heading"]}>SELECT SIZE:</div>
          <div className={styles["size-select-block"]}>
            {sizeOptions.map((val, i) => {
              if (val.isAvailable === true) {
                selectedClass =
                  this.state.isSelected && this.state.selectedIndex === i
                    ? [styles["size-outer"], styles["selected"]].join(" ")
                    : styles["size-outer"];
                return (
                  <div
                    key={i}
                    className={styles["size-select"]}
                    onClick={() => this.handleSelect(i)}
                  >
                    <div className={selectedClass}>
                      <div
                        className={styles["size-icon"]}
                        style={{ backgroundImage: `url(${val.imageUrl})` }}
                      ></div>
                      {val.size}
                    </div>
                  </div>
                );
              }
              if (val.isAvailable === false) {
                return (
                  <div key={i} className={styles["size-select size-not-avail"]}>
                    <div className={styles["size-outer"]}>
                      <div
                        className={styles["size-icon"]}
                        style={{
                          backgroundImage: `url(${val.imageUrl})`,
                          backgroundSize: `auto ${36}px`
                        }}
                      ></div>
                      {val.size}
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </div>
      </div>
    );
  }
}
