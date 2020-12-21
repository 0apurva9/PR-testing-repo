import React from "react";

import styles from "./ColorComponent.css";

const VIEW_MORE = "View More";
const VIEW_LESS = "View Less";

export default class ColorComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expandClass: false,
      showTooltip: false,
      sizeIndex: -1,
      toolTipIndex: -1
    };
  }

  expandShadeSelector(e) {
    e.preventDefault();
    this.setState({ expandClass: !this.state.expandClass });
  }

  onMouseEnter(i, j) {
    console.log(i);
    this.setState({ showTooltip: true, sizeIndex: i, toolTipIndex: j });
    console.log("mouseenter...");
  }

  onMouseLeave(i, j) {
    this.setState({ showTooltip: false, sizeIndex: i, toolTipIndex: j });
    console.log("mouseleave...");
  }

  render() {
    console.log("11111", this.props);
    const variantTheme = this.props.variantTheme;
    return (
      <React.Fragment>
        <div className={styles["shade-component"]}>
          <div className={styles["shade-block"]}>
            <a
              href={""}
              onClick={e => this.expandShadeSelector(e)}
              className={styles["shade-block-view-more"]}
            >
              {this.state.expandClass ? VIEW_LESS : VIEW_MORE}
            </a>
            <div className={styles["shade-heading"]}>Knockout Nude 184</div>
            <div
              className={
                this.state.expandClass
                  ? styles["shade-collapsed-block"]
                  : styles["shade-collapse-block"]
              }
            >
              {variantTheme.map((colorAndSize, i) => {
                if (
                  colorAndSize.colorOptions &&
                  colorAndSize.colorOptions.length > 0 &&
                  colorAndSize.sizelink
                ) {
                  return (
                    <React.Fragment>
                      <div className={styles["shade-subheading"]}>
                        {colorAndSize.sizelink.size &&
                          colorAndSize.sizelink.size}
                      </div>
                      <React.Fragment>
                        <div className={styles["shade-list-block"]}>
                          {colorAndSize.colorOptions.map((colorElement, j) => {
                            return (
                              <div
                                key={i}
                                className={styles["shade-list"]}
                                onMouseEnter={() => this.onMouseEnter(i, j)}
                                onMouseLeave={() => this.onMouseLeave(i, j)}
                              >
                                <div className={styles["shade-list-img-block"]}>
                                  <img
                                    src={colorElement.swatchUrl}
                                    className={styles["shade-list-img"]}
                                  />
                                </div>
                                <div className={styles["shade-stock-left"]}>
                                  2 Left
                                </div>
                                {this.state.showTooltip &&
                                  this.state.sizeIndex === i &&
                                  this.state.toolTipIndex === j && (
                                    <div className={styles["shade-tool-tip"]}>
                                      {colorElement.color}
                                    </div>
                                  )}
                              </div>
                            );
                          })}
                        </div>
                      </React.Fragment>
                    </React.Fragment>
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
