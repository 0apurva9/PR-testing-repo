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
    this.colorShadeRef = React.createRef();
  }

  componentDidMount() {
    if (this.colorShadeRef.current) {
      this.colorShadeRef.current.scrollIntoView({
        block: "start",
        behavior: "smooth"
      });
    }
  }

  expandShadeSelector(e) {
    e.preventDefault();
    this.setState({ expandClass: !this.state.expandClass });
  }

  onMouseEnter(i, j) {
    this.setState({ showTooltip: true, sizeIndex: i, toolTipIndex: j });
  }

  onMouseLeave(i, j) {
    this.setState({ showTooltip: false, sizeIndex: i, toolTipIndex: j });
  }

  handleColorOptionClick(url) {
    this.props.history.push(url);
  }

  render() {
    console.log("11111", this.props);
    let stockCount = 0;
    const variantTheme = this.props.variantTheme;
    let selectedSizeColorOptions = [];
    let selectedSizeSelectedColor = {};
    if (this.props.selectedSizeIndex >= 0) {
      selectedSizeColorOptions =
        variantTheme &&
        variantTheme.length > 0 &&
        variantTheme[this.props.selectedSizeIndex].colorOptions;
    }
    selectedSizeSelectedColor =
      selectedSizeColorOptions &&
      selectedSizeColorOptions.filter(el => el.selected === true);
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
            <div className={styles["shade-heading"]}>
              {selectedSizeSelectedColor &&
                selectedSizeSelectedColor.length > 0 &&
                selectedSizeSelectedColor[0].color}
            </div>
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
                                onClick={() =>
                                  this.handleColorOptionClick(colorElement.url)
                                }
                                ref={
                                  colorElement.selected === true
                                    ? this.colorShadeRef
                                    : null
                                }
                              >
                                <div
                                  className={[
                                    styles["shade-list-img-block"],
                                    colorElement.selected === true
                                      ? styles["shade-stock-selected-img"]
                                      : "",
                                    colorElement.isAvailable === false
                                      ? styles["shade-stock-dis-img"]
                                      : ""
                                  ].join(" ")}
                                >
                                  <img
                                    src={colorElement.swatchUrl}
                                    className={styles["shade-list-img"]}
                                  />
                                </div>
                                {stockCount && stockCount <= 3 ? (
                                  <div className={styles["shade-stock-left"]}>
                                    {stockCount}
                                  </div>
                                ) : null}
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
