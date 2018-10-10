import React from "react";
import DumbGrid from "../../general/components/DumbGrid";
import ProductModule from "../../general/components/ProductModule";
import PlpComponent from "./PlpComponent";
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

  switchView() {
    if (checkUserAgentIsMobile()) {
      if (this.state.view === LIST) {
        this.setState({ view: GRID });
      } else {
        this.setState({ view: LIST });
      }
    } else {
      this.setState({ gridBreakup: !this.state.gridBreakup });
    }
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
    // if (data.type === PRODUCT) {
    return (
      <ProductModule
        isRange={data.price.isRange}
        maxPrice={
          data.price &&
          data.price.maxPrice &&
          data.price.maxPrice.formattedValueNoDecimal
        }
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
        plpAttrMap={data && data.plpAttrMap}
      />
    );
  };
  render() {
    return (
      <div className={styles.base}>
        <div className={styles.header}>
          <MediaQuery query="(max-device-width:1024px)">
            <div className={styles.product}>
              {this.props.totalResults ? this.props.totalResults : 0} Products
            </div>
          </MediaQuery>
          <MobileOnly>
            <div className={styles.icon} onClick={() => this.switchView()}>
              {this.state.view === LIST && <Icon image={gridImage} size={20} />}
              {this.state.view === GRID && <Icon image={listImage} size={20} />}
            </div>
          </MobileOnly>
          <DesktopOnly>
            <div className={styles.icon} onClick={() => this.switchView()}>
              {this.state.gridBreakup && <Icon image={gridImage} size={20} />}
              {!this.state.gridBreakup && <Icon image={listImage} size={20} />}
            </div>
          </DesktopOnly>
        </div>
        <div className={styles.content}>
          <DumbGrid
            search={this.props.search}
            offset={0}
            elementWidthMobile={this.state.view === LIST ? 100 : 50}
            elementWidthDesktop={this.state.gridBreakup ? 33.33 : 25}
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
    );
  }
}

ProductGrid.defaultProps = {
  area: "Delhi - 560345"
};
