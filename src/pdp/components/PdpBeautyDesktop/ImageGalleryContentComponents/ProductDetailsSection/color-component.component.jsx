import React from "react";
import PropTypes from "prop-types";
import delay from "lodash.delay";

import styles from "./color-component.component.css";
import { findSelectedSize } from "../../../../reducers/utils";
import { COLOR_COMPONENT, SIZE_COMPONENT } from "../../ComponentConstants";

const VIEW_MORE = "View More";
const VIEW_LESS = "View Less";

export default class ColorComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expandClass: false,
      showTooltip: false,
      sizeIndex: -1,
      toolTipIndex: -1,
      selectedSizeIndex: -1,
      sizeAndColorComp: [],
    };
    this.colorShadeRef = React.createRef();
  }

  handleScrollToTop(delayValue, scrollBehavior = "") {
    if (this.props.handleScrollToTop) {
      this.props.handleScrollToTop(delayValue, scrollBehavior);
    }
  }

  componentDidMount() {
    if (this.colorShadeRef && this.colorShadeRef.current) {
      delay(() => {
        if(this.colorShadeRef && this.colorShadeRef.current) {
          this.colorShadeRef.current.scrollIntoView({block: "start", inline: "nearest"});
        }
      }, 200);
    }
    this.handleScrollToTop(210);
    const compDetails = this.props.compDetails ? this.props.compDetails : [];
    const sizeAndColorComp = Array.isArray(compDetails) && compDetails.length > 0 && compDetails.filter(el => (el.componentId === COLOR_COMPONENT || el.componentId === SIZE_COMPONENT));
    this.setState({sizeAndColorComp: sizeAndColorComp});
    const variantTheme = this.props.productDetails && this.props.productDetails.variantTheme ? this.props.productDetails.variantTheme : [];
    const productListingId =  this.props && this.props.productDetails && this.props.productDetails.productListingId ? this.props.productDetails.productListingId : null;
    if((Array.isArray(variantTheme) && variantTheme.length > 0) && (sizeAndColorComp && sizeAndColorComp.length === 2) && productListingId) {
      const sizeToSetInState = findSelectedSize(variantTheme, productListingId, true);
      this.setState(sizeToSetInState);
    }
    if(this.props.history && this.props.history.location && this.props.history.location.viewMoreLess) {
      this.setState({expandClass: this.props.history.location.viewMoreLess.viewMoreLess}, () => {
        if(this.colorShadeRef && this.colorShadeRef.current) {
          delay(() => {
            if(this.colorShadeRef && this.colorShadeRef.current) {
              this.colorShadeRef.current.scrollIntoView({block: "nearest"});
            }
          }, 200);
        }
      });
    }
  }

  expandShadeSelector(e) {
    e.preventDefault();
    this.setState({ expandClass: !this.state.expandClass }, () => {
      if(!this.state.expandClass) {
        if (this.colorShadeRef && this.colorShadeRef.current) {
            this.colorShadeRef.current.scrollIntoView({block: "start", inline: "nearest"});
            this.handleScrollToTop(200, "smooth");
        }
      } else {
        if(this.colorShadeRef && this.colorShadeRef.current) {
          this.colorShadeRef.current.scrollIntoView({block: "nearest"});
        }
      }
    });
  }

  onMouseEnter(i, j) {
    this.setState({ showTooltip: true, sizeIndex: i, toolTipIndex: j });
  }

  onMouseLeave(i, j) {
    this.setState({ showTooltip: false, sizeIndex: i, toolTipIndex: j });
  }

  handleColorOptionClick(url) {
    this.props.history.push({
      pathname: `${url}`,
      viewMoreLess: { viewMoreLess: this.state.expandClass }
    });
  }

  render() {
    const variantTheme = this.props.productDetails && this.props.productDetails.variantTheme ? this.props.productDetails.variantTheme : [];
    let stockCount = 0;
    const winningUssID =
      this.props.productDetails && this.props.productDetails.winningUssID;
    const pincodeListResponse =
      this.props.productDetails &&
      this.props.productDetails.pincodeListResponse &&
      this.props.productDetails.pincodeListResponse.deliveryOptions &&
      this.props.productDetails.pincodeListResponse.deliveryOptions
        .pincodeListResponse
        ? this.props.productDetails.pincodeListResponse.deliveryOptions
            .pincodeListResponse
        : [];
    stockCount = pincodeListResponse
      .filter(el => el.ussid === winningUssID)
      .map(el => el.stockCount);

    let selectedSizeColorOptions = [];
    let noOfColoursForSelectedSize = 0;
    let selectedSizeSelectedColor = [];
    let noOfColours = 0;
    let selectedColorOptions = [];
    let selectedColor = {};
    if(this.state.sizeAndColorComp.length === 2) {
      if (this.state.selectedSizeIndex >= 0) {
        selectedSizeColorOptions =
          Array.isArray(variantTheme) &&
          variantTheme.length > 0 &&
          variantTheme[this.state.selectedSizeIndex].colorOptions;
          noOfColoursForSelectedSize = selectedSizeColorOptions && selectedSizeColorOptions.length;
      }

      selectedSizeSelectedColor =
        selectedSizeColorOptions &&
        selectedSizeColorOptions.filter(el => el.selected === true);
    } else {
      selectedColorOptions = Array.isArray(variantTheme) && variantTheme.length > 0 && variantTheme[0].colorOptions;
      noOfColours = selectedColorOptions && selectedColorOptions.length;
      selectedColor = selectedColorOptions && selectedColorOptions.filter(el => el.selected === true);
    }
    return (
      <React.Fragment>
        <div className={styles["shade-component"]}>
          <div className={styles["shade-block"]}>
            <div className={styles["shade-top-block"]}>
              {(noOfColoursForSelectedSize && noOfColoursForSelectedSize > 7 ) || (variantTheme && variantTheme.length > 1) || (noOfColours && noOfColours > 7 ) ? (
                <a
                href={""}
                onClick={e => this.expandShadeSelector(e)}
                className={styles["shade-block-view-more"]}
                >
                {this.state.expandClass ? VIEW_LESS : VIEW_MORE}
                </a>
              ): null}
                <div className={styles["shade-heading"]}>
                  {this.state.sizeAndColorComp.length === 2 ?
                    (selectedSizeSelectedColor &&
                    selectedSizeSelectedColor.length > 0 &&
                    selectedSizeSelectedColor[0].color) :
                    selectedColor &&
                    selectedColor.length > 0 &&
                    selectedColor[0].color}
                </div>
            </div>
            <div
              className={
                this.state.expandClass
                  ? styles["shade-collapsed-block"]
                  : styles["shade-collapse-block"]
              }
            >
              {variantTheme && variantTheme.length > 0 && variantTheme.map((colorAndSize, i) => {
                if(this.state.sizeAndColorComp && this.state.sizeAndColorComp.length === 1 && i > 0) {
                  return null;
                }
                if (
                  colorAndSize.colorOptions &&
                  colorAndSize.colorOptions.length > 0
                ) {
                  return (
                    <div key={i}>
                      {this.state.sizeAndColorComp && this.state.sizeAndColorComp.length === 2 ? (
                        <div className={styles["shade-subheading"]}>
                          {colorAndSize.sizelink && colorAndSize.sizelink.size ? colorAndSize.sizelink.size : null}
                      </div>
                      ): null}
                      <React.Fragment>
                        <div className={styles["shade-list-block"]}>
                          {colorAndSize.colorOptions.map((colorElement, j) => {
                            let classForHexCode = (!colorElement.swatchUrl && colorElement.colorHexCode) ?  { backgroundColor: `${colorElement.colorHexCode}`, width: "58px", height: "58px"}: null;
                            if(colorElement.productCode) {
                              return (
                                <div className={
                                  !colorElement.isAvailable
                                  ? styles["dis-cursor"]
                                  : null
                                }>
                                  <div
                                    key={j}
                                    className={
                                      !colorElement.isAvailable
                                      ? styles["dis-outstock-img"]
                                      : styles["shade-list"]
                                    }
                                    onMouseEnter={() => this.onMouseEnter(i, j)}
                                    onMouseLeave={() => this.onMouseLeave(i, j)}
                                    onClick={() =>
                                      this.handleColorOptionClick(colorElement.url)
                                    }
                                    ref={
                                      colorElement.selected
                                        ? this.colorShadeRef
                                        : null
                                    }
                                  >
                                    <div
                                      className={[
                                        styles["shade-list-img-block"],
                                        colorElement.selected
                                          ? styles["shade-stock-selected-img"]
                                          : "",
                                        !colorElement.isAvailable
                                          ? styles["shade-stock-dis-img"]
                                          : "",
                                      ].join(" ")}
                                      style={classForHexCode}
                                    >
                                      {colorElement.swatchUrl ? (
                                        <img
                                        src={colorElement.swatchUrl}
                                        className={styles["shade-list-img"]}
                                        alt={"swatch"}
                                      />
                                      ): null}
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
                                </div>
                              );
                            } else {
                              return null;
                            }
                          })}
                        </div>
                      </React.Fragment>
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


ColorComponent.propTypes = {
  productDetails: PropTypes.shape({
    variantTheme: PropTypes.arrayOf(PropTypes.shape({
      colorOptions: PropTypes.arrayOf(PropTypes.shape({
        color: PropTypes.string.isRequired,
        colorHexCode: PropTypes.string.isRequired,
        isAvailable: PropTypes.bool.isRequired,
        productCode: PropTypes.string,
        selected: PropTypes.bool.isRequired,
        swatchUrl: PropTypes.string.isRequired,
        url: PropTypes.string
      }).isRequired).isRequired,
      sizelink: PropTypes.shape({
        imageUrl: PropTypes.string.isRequired,
        isAvailable: PropTypes.bool.isRequired,
        productCode: PropTypes.string.isRequired,
        selected: PropTypes.bool.isRequired,
        size: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired
      }).isRequired
    }).isRequired).isRequired,
    winningUssID: PropTypes.string,
    productListingId: PropTypes.string,
    pincodeListResponse: PropTypes.shape({
      deliveryOptions: PropTypes.shape({
          pincodeListResponse: PropTypes.arrayOf(PropTypes.shape({
            cod: PropTypes.string.isRequired,
            exchangeServiceable: PropTypes.bool.isRequired,
            fulfilmentType: PropTypes.string.isRequired,
            isCODLimitFailed: PropTypes.string.isRequired,
            isFragile: PropTypes.string.isRequired,
            isPickupAvailableForExchange: PropTypes.bool.isRequired,
            isPrecious: PropTypes.string.isRequired,
            isPrepaidEligible: PropTypes.string.isRequired,
            isServicable: PropTypes.string.isRequired,
            quickDeliveryMode: PropTypes.string.isRequired,
            stockCount: PropTypes.number.isRequired,
            transportMode: PropTypes.string.isRequired,
            ussid: PropTypes.string.isRequired,
          }).isRequired).isRequired
      })
    })
  }).isRequired
};