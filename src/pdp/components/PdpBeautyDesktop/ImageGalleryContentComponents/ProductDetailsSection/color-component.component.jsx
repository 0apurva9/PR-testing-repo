import React from "react";
import PropTypes from "prop-types";

import styles from "./color-component.component.css";
import { findSelectedSize } from "../../../../reducers/utils";

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
      selectedSizeIndex: -1
    };
    this.colorShadeRef = React.createRef();
  }

  componentDidMount() {
    if (this.colorShadeRef.current) {
      this.colorShadeRef.current.scrollIntoView({ block: "nearest" });
    }
    const variantTheme = this.props.productDetails && this.props.productDetails.variantOptions && this.props.productDetails.variantTheme;
    const variantOptions =  this.props && this.props.productDetails && this.props.productDetails.variantOptions;
    const productListingId =  this.props && this.props.productDetails && this.props.productDetails.productListingId;
    if((variantTheme && variantTheme.length > 0 || variantOptions && variantOptions.length > 0) && productListingId) {
      const sizeToSetInState = findSelectedSize(variantTheme, variantOptions, productListingId, true);
      this.setState(sizeToSetInState);
    }
    if(this.props.history && this.props.history.location && this.props.history.location.viewMoreLess) {
      this.setState({expandClass: this.props.history.location.viewMoreLess.viewMoreLess});
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
    let selectedSizeSelectedColor = {};
    let noOfColoursForSelectedSize = 0;
    if (this.state.selectedSizeIndex >= 0) {
      selectedSizeColorOptions =
        variantTheme &&
        variantTheme.length > 0 &&
        variantTheme[this.state.selectedSizeIndex].colorOptions;
        noOfColoursForSelectedSize = selectedSizeColorOptions && selectedSizeColorOptions.length;
    }

    selectedSizeSelectedColor =
      selectedSizeColorOptions &&
      selectedSizeColorOptions.filter(el => el.selected === true);
    return (
      <React.Fragment>
        <div className={styles["shade-component"]}>
          <div className={styles["shade-block"]}>
            <div className={styles["shade-top-block"]}>
              {(noOfColoursForSelectedSize && noOfColoursForSelectedSize > 7 ) || (variantTheme && variantTheme.length > 1) ? (
                <a
                href={""}
                onClick={e => this.expandShadeSelector(e)}
                className={styles["shade-block-view-more"]}
                >
                {this.state.expandClass ? VIEW_LESS : VIEW_MORE}
                </a>
              ): null}
              <div className={styles["shade-heading"]}>
                {selectedSizeSelectedColor &&
                  selectedSizeSelectedColor.length > 0 &&
                  selectedSizeSelectedColor[0].color}
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
                if (
                  colorAndSize.colorOptions &&
                  colorAndSize.colorOptions.length > 0 &&
                  colorAndSize.sizelink
                ) {
                  return (
                    <div key={i}>
                      <div className={styles["shade-subheading"]}>
                        {colorAndSize.sizelink.size &&
                          colorAndSize.sizelink.size}
                      </div>
                      <React.Fragment>
                        <div className={styles["shade-list-block"]}>
                          {colorAndSize.colorOptions.map((colorElement, j) => {
                            return (
                              <div
                                key={j}
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
    variantOptions: PropTypes.arrayOf(PropTypes.shape({
      colorlink: PropTypes.shape({
        colorurl: PropTypes.string.isRequired,
        selected: PropTypes.bool.isRequired
      }).isRequired,
      sizelink: PropTypes.shape({
        imageUrl: PropTypes.string.isRequired,
        isAvailable: PropTypes.bool.isRequired,
        productCode: PropTypes.string.isRequired,
        size: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired
      }).isRequired
    }).isRequired),
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