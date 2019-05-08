import React from "react";
import DumbGrid from "../../general/components/DumbGrid";
import ProductModule from "../../general/components/ProductModule";
import PlpComponent from "./PlpComponent";
import PropTypes from "prop-types";
import Icon from "../../xelpmoc-core/Icon";
import styles from "./ProductGrid.css";
import gridImage from "./img/grid.svg";
import listImage from "./img/list.svg";
import MediaQuery from "react-responsive";
import dropDownSortIcon from "../../cart/components/img/googleSearch.png";
import { checkUserAgentIsMobile } from "../../lib/UserAgent.js";
import {
  PRODUCT_DESCRIPTION_ROUTER,
  IS_OFFER_EXISTING,
  PRODUCT_LISTINGS_WITHOUT_SLASH
} from "../../lib/constants";
import queryString from "query-string";
import { applySortToUrl } from "./SortUtils.js";
import SelectBoxDesktop from "../../general/components/SelectBoxDesktop";
import { setDataLayerForPlpDirectCalls } from "../../lib/adobeUtils";
import DesktopOnly from "../../general/components/DesktopOnly.js";
import MobileOnly from "../../general/components/MobileOnly.js";
const LIST = "list";
const GRID = "grid";
const PRODUCT = "product";
export const PLPAD = "plpAd";
export const ICONICFILTER = "iconicFilter";
export default class ProductGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: GRID,
      gridBreakup: false
    };
  }

  changeAddress() {
    if (this.props.changeAddress) {
      this.props.changeAddress();
    }
  }
  componentDidMount() {
    const data = this.props && this.props.data;
    const type = data && data[0] && data[0].productCategoryType;
    if (type === "Electronics") {
      this.setState({ view: LIST });
    }
  }
  goToProductDescription = (url, productObj, productModuleId, index) => {
    // change this
    if (!checkUserAgentIsMobile()) {
      window.open(url, "_blank");
    }
    if (
      this.props.history.location.pathname === PRODUCT_LISTINGS_WITHOUT_SLASH
    ) {
      setDataLayerForPlpDirectCalls(productObj, index);
    }
    if (checkUserAgentIsMobile()) {
      this.props.setProductModuleRef(productModuleId);
      this.props.history.push(url, {
        isComingFromPlp: true
      });
    }
  };

  renderComponent = (data, index) => {
    const altTag = `${data.productname}-${data.brandname}-${
      data.productCategoryType
    }-TATA CLIQ`;
    return (
      <ProductModule
        key={index}
        isRange={data.price.isRange}
        productCategoryType={data.productCategoryType}
        isRange={data.price.isRange}
        maxPrice={
          data.price &&
          data.price.maxPrice &&
          data.price.maxPrice.formattedValueNoDecimal
        }
        alt={altTag}
        minPrice={
          data.price &&
          data.price.minPrice &&
          data.price.minPrice.formattedValueNoDecimal
        }
        isPlp={true}
        productImage={data.imageURL}
        title={data.brandname}
        price={
          data.price.mrpPrice
            ? data.price.mrpPrice.formattedValueNoDecimal
            : null
        }
        discountPrice={
          data.price.sellingPrice
            ? data.price.sellingPrice.formattedValueNoDecimal
            : null
        }
        description={data.productname}
        discountPercent={data.discountPercent}
        isOfferExisting={data.isOfferExisting}
        onlineExclusive={data.onlineExclusive}
        webURL={data.webURL}
        outOfStock={!data.cumulativeStockLevel}
        onOffer={data.isOfferExisting}
        newProduct={data.newProduct}
        averageRating={data.averageRating}
        totalNoOfReviews={data.totalNoOfReviews}
        view={this.state.view}
        onClick={(url, data, ref) =>
          this.goToProductDescription(url, data, ref, index)
        }
        productCategory={data.productCategoryType}
        productId={data.productId}
        showWishListButton={false}
        offerData={data.offerData}
        plpAttrMap={data && data.plpAttrMap}
      />
    );
  };
  render() {
    let electronicView =
      this.props.data &&
      this.props.data[0] &&
      this.props.data[0].productCategoryType === "Electronics";
    return (
      <React.Fragment>
        <div
          className={styles.base}
          style={{ position: this.props.isPosition ? "relative" : "" }}
        >
          <MediaQuery query="(max-device-width:1024px)">
            <div className={styles.header}>
              <div className={styles.product}>
                {this.props.totalResults ? this.props.totalResults : 0} Products
              </div>
            </div>
          </MediaQuery>

          <div className={styles.content}>
            <DumbGrid
              search={this.props.search}
              offset={0}
              elementWidthMobile={this.props.view === LIST ? 100 : 50}
              elementWidthDesktop={
                electronicView ? 100 : this.props.gridBreakup ? 33.33 : 25
              }
            >
              {this.props.data &&
                this.props.data.map((datum, i) => {
                  let widthMobile = false;
                  return (
                    <PlpComponent
                      key={i}
                      gridWidthMobile={widthMobile}
                      view={this.state.view}
                      type={datum && datum.type}
                    >
                      {this.renderComponent(datum, i)}
                    </PlpComponent>
                  );
                })}
            </DumbGrid>
          </div>
        </div>
        <React.Fragment>{this.props.children}</React.Fragment>
      </React.Fragment>
    );
  }
}
ProductGrid.propTypes = {
  isPosition: PropTypes.bool
};
ProductGrid.defaultProps = {
  area: "Delhi - 560345",
  isPosition: false
};
