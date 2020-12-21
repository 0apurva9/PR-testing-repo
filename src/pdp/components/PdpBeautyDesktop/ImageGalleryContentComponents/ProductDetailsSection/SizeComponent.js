import React from "react";

import ColorComponent from "./ColorComponent";
import styles from "./SizeComponent.css";

export default class SizeComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSelected: false,
      selectedIndex: -1
    };
  }

  componentDidMount() {
    let sizeOptions = [];
    let selectedSize = [];
    if (
      this.props.productDetails &&
      this.props.productDetails.variantOptions &&
      this.props.productDetails.variantTheme
    ) {
      const variantTheme =
        this.props &&
        this.props.productDetails &&
        this.props.productDetails.variantTheme;
      sizeOptions = variantTheme && variantTheme.map(el => el.sizelink);
      const productListingId =
        this.props &&
        this.props.productDetails &&
        this.props.productDetails.productListingId;
      selectedSize =
        sizeOptions &&
        sizeOptions.filter((el, i) => {
          if (
            el.productCode === productListingId &&
            el.isAvailable === true &&
            el.selected === true
          ) {
            this.setState({ isSelected: true, selectedIndex: i });
          }
        });
    } else {
      const variantOptions =
        this.props &&
        this.props.productDetails &&
        this.props.productDetails.variantOptions;
      sizeOptions = variantOptions && variantOptions.map(el => el.sizelink);
      const productListingId =
        this.props &&
        this.props.productDetails &&
        this.props.productDetails.productListingId;
      selectedSize =
        sizeOptions &&
        sizeOptions.filter((el, i) => {
          if (el.productCode === productListingId && el.isAvailable === true) {
            this.setState({ isSelected: true, selectedIndex: i });
          }
        });
    }
  }

  handleSizeOptionClick(url) {
    this.props.history.push(url);
  }

  render() {
    const variantTheme =
      this.props &&
      this.props.productDetails &&
      this.props.productDetails.variantTheme;
    let sizeOptions = [];
    let selectedClass = "";
    if (
      this.props.productDetails &&
      this.props.productDetails.variantOptions &&
      this.props.productDetails.variantTheme
    ) {
      const variantOptions =
        this.props &&
        this.props.productDetails &&
        this.props.productDetails.variantTheme;
      sizeOptions = variantOptions && variantOptions.map(el => el.sizelink);
    } else {
      const variantOptions =
        this.props &&
        this.props.productDetails &&
        this.props.productDetails.variantOptions;
      sizeOptions = variantOptions && variantOptions.map(el => el.sizelink);
    }

    return (
      <React.Fragment>
        {this.props.colorComponentFound ? (
          <ColorComponent
            variantTheme={variantTheme}
            selectedSizeIndex={
              this.state.isSelected ? this.state.selectedIndex : -1
            }
            {...this.props}
          />
        ) : null}
        <div className={styles["size-component"]}>
          <div className={styles["size-block"]}>
            <div className={styles["size-heading"]}>SELECT SIZE:</div>
            <div className={styles["size-select-block"]}>
              {sizeOptions &&
                sizeOptions.length > 0 &&
                sizeOptions.map((val, i) => {
                  if (val.isAvailable === true) {
                    selectedClass =
                      this.state.isSelected && this.state.selectedIndex === i
                        ? [styles["size-outer"], styles["selected"]].join(" ")
                        : styles["size-outer"];
                    return (
                      <div
                        key={i}
                        className={styles["size-select"]}
                        onClick={() => this.handleSizeOptionClick(val.url)}
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
                      <div
                        key={i}
                        className={[
                          styles["size-not-avail"],
                          styles["size-select"]
                        ].join(" ")}
                      >
                        <div className={styles["size-outer"]}>
                          <div
                            className={styles["size-icon"]}
                            style={{
                              backgroundImage: `url(${val.imageUrl})`,
                              backgroundSize: `auto ${34}px`
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
      </React.Fragment>
    );
  }
}
