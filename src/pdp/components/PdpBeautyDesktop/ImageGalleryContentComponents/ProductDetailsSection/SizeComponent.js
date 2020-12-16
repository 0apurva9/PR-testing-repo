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

  componentDidMount() {
    const variantOptions =
      this.props &&
      this.props.productDetails &&
      this.props.productDetails.variantOptions;
    let sizeOptions = [];
    sizeOptions = variantOptions && variantOptions.map(el => el.sizelink);
    const productListingId =
      this.props &&
      this.props.productDetails &&
      this.props.productDetails.productListingId;
    let selectedSize = [];
    selectedSize =
      sizeOptions &&
      sizeOptions.filter((el, i) => {
        if (el.productCode === productListingId && el.isAvailable === true) {
          this.setState({ isSelected: true, selectedIndex: i });
        }
      });
  }

  handleSizeOptionClick(url) {
    this.props.history.push(url);
  }

  render() {
    const variantOptions =
      this.props &&
      this.props.productDetails &&
      this.props.productDetails.variantOptions;
    let sizeOptions = [];
    sizeOptions = variantOptions && variantOptions.map(el => el.sizelink);
    let selectedClass;
    return (
      <React.Fragment>
        <div className={styles["shade-component"]}>
          <div className={styles["shade-block"]}>
            <a href="#" className={styles["shade-block-view-more"]}>
              View More
            </a>
            <div className={styles["shade-heading"]}>Knockout Nude 184 </div>
            <div className={styles["shade-collapse-block"]}>
              <div className={styles["shade-subheading"]}>Mini</div>
              <div className={styles["shade-list-block"]}>
                <div className={styles["shade-list"]}>
                  <div className={styles["shade-list-img-block"]}>
                    <img
                      src="https://cdn.iconscout.com/icon/free/png-256/color-palette-1575101-1331436.png"
                      className={styles["shade-list-img"]}
                    />
                  </div>
                  <div className={styles["shade-stock-left"]}>2 Left</div>
                </div>
                <div className={styles["shade-list"]}>
                  <div className={styles["shade-list-img-block"]}>
                    <img
                      src="https://cdn.iconscout.com/icon/free/png-256/color-palette-1575101-1331436.png"
                      className={styles["shade-list-img"]}
                    />
                  </div>
                  <div className={styles["shade-stock-left"]}>2 Left</div>
                </div>
                <div className={styles["shade-list"]}>
                  <div className={styles["shade-list-img-block"]}>
                    <img
                      src="https://cdn.iconscout.com/icon/free/png-256/color-palette-1575101-1331436.png"
                      className={styles["shade-list-img"]}
                    />
                  </div>
                  <div className={styles["shade-stock-left"]}>2 Left</div>
                </div>
                <div className={styles["shade-list"]}>
                  <div className={styles["shade-list-img-block"]}>
                    <img
                      src="https://cdn.iconscout.com/icon/free/png-256/color-palette-1575101-1331436.png"
                      className={styles["shade-list-img"]}
                    />
                  </div>
                  <div className={styles["shade-stock-left"]}>2 Left</div>
                </div>
                <div className={styles["shade-list"]}>
                  <div className={styles["shade-list-img-block"]}>
                    <img
                      src="https://cdn.iconscout.com/icon/free/png-256/color-palette-1575101-1331436.png"
                      className={styles["shade-list-img"]}
                    />
                  </div>
                  <div className={styles["shade-stock-left"]}>2 Left</div>
                </div>
                <div className={styles["shade-list"]}>
                  <div className={styles["shade-list-img-block"]}>
                    <img
                      src="https://cdn.iconscout.com/icon/free/png-256/color-palette-1575101-1331436.png"
                      className={styles["shade-list-img"]}
                    />
                  </div>
                  <div className={styles["shade-stock-left"]}>2 Left</div>
                </div>
                <div className={styles["shade-list"]}>
                  <div className={styles["shade-list-img-block"]}>
                    <img
                      src="https://cdn.iconscout.com/icon/free/png-256/color-palette-1575101-1331436.png"
                      className={styles["shade-list-img"]}
                    />
                  </div>
                  <div className={styles["shade-stock-left"]}>2 Left</div>
                </div>
                <div className={styles["shade-list"]}>
                  <div className={styles["shade-list-img-block"]}>
                    <img
                      src="https://cdn.iconscout.com/icon/free/png-256/color-palette-1575101-1331436.png"
                      className={styles["shade-list-img"]}
                    />
                  </div>
                  <div className={styles["shade-stock-left"]}>2 Left</div>
                </div>
                <div className={styles["shade-list"]}>
                  <div className={styles["shade-list-img-block"]}>
                    <img
                      src="https://cdn.iconscout.com/icon/free/png-256/color-palette-1575101-1331436.png"
                      className={styles["shade-list-img"]}
                    />
                  </div>
                  <div className={styles["shade-stock-left"]}>2 Left</div>
                </div>
              </div>
              <div className={styles["shade-subheading"]}>Standard</div>
              <div className={styles["shade-list-block"]}>
                <div className={styles["shade-list"]}>
                  <div className={styles["shade-list-img-block"]}>
                    <img
                      src="https://cdn.iconscout.com/icon/free/png-256/color-palette-1575101-1331436.png"
                      className={styles["shade-list-img"]}
                    />
                  </div>
                  <div className={styles["shade-stock-left"]}>2 Left</div>
                </div>
                <div className={styles["shade-list"]}>
                  <div className={styles["shade-list-img-block"]}>
                    <img
                      src="https://cdn.iconscout.com/icon/free/png-256/color-palette-1575101-1331436.png"
                      className={styles["shade-list-img"]}
                    />
                  </div>
                  <div className={styles["shade-stock-left"]}>2 Left</div>
                </div>
                <div className={styles["shade-list"]}>
                  <div className={styles["shade-list-img-block"]}>
                    <img
                      src="https://cdn.iconscout.com/icon/free/png-256/color-palette-1575101-1331436.png"
                      className={styles["shade-list-img"]}
                    />
                  </div>
                  <div className={styles["shade-stock-left"]}>2 Left</div>
                </div>
                <div className={styles["shade-list"]}>
                  <div className={styles["shade-list-img-block"]}>
                    <img
                      src="https://cdn.iconscout.com/icon/free/png-256/color-palette-1575101-1331436.png"
                      className={styles["shade-list-img"]}
                    />
                  </div>
                  <div className={styles["shade-stock-left"]}>2 Left</div>
                </div>
                <div className={styles["shade-list"]}>
                  <div className={styles["shade-list-img-block"]}>
                    <img
                      src="https://cdn.iconscout.com/icon/free/png-256/color-palette-1575101-1331436.png"
                      className={styles["shade-list-img"]}
                    />
                  </div>
                  <div className={styles["shade-stock-left"]}>2 Left</div>
                </div>
                <div className={styles["shade-list"]}>
                  <div className={styles["shade-list-img-block"]}>
                    <img
                      src="https://cdn.iconscout.com/icon/free/png-256/color-palette-1575101-1331436.png"
                      className={styles["shade-list-img"]}
                    />
                  </div>
                  <div className={styles["shade-stock-left"]}>2 Left</div>
                </div>
                <div className={styles["shade-list"]}>
                  <div className={styles["shade-list-img-block"]}>
                    <img
                      src="https://cdn.iconscout.com/icon/free/png-256/color-palette-1575101-1331436.png"
                      className={styles["shade-list-img"]}
                    />
                  </div>
                  <div className={styles["shade-stock-left"]}>2 Left</div>
                </div>
                <div className={styles["shade-list"]}>
                  <div className={styles["shade-list-img-block"]}>
                    <img
                      src="https://cdn.iconscout.com/icon/free/png-256/color-palette-1575101-1331436.png"
                      className={styles["shade-list-img"]}
                    />
                  </div>
                  <div className={styles["shade-stock-left"]}>2 Left</div>
                </div>
                <div className={styles["shade-list"]}>
                  <div className={styles["shade-list-img-block"]}>
                    <img
                      src="https://cdn.iconscout.com/icon/free/png-256/color-palette-1575101-1331436.png"
                      className={styles["shade-list-img"]}
                    />
                  </div>
                  <div className={styles["shade-stock-left"]}>2 Left</div>
                </div>
              </div>
            </div>
          </div>
        </div>

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
