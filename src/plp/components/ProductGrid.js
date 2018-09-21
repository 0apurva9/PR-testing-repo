import React from "react";
import DumbGrid from "../../general/components/DumbGrid";
import ProductModule from "../../general/components/ProductModule";
import PlpComponent from "./PlpComponent";
import Icon from "../../xelpmoc-core/Icon";
import styles from "./ProductGrid.css";
import gridImage from "./img/grid.svg";
import listImage from "./img/list.svg";
import {
  PRODUCT_DESCRIPTION_ROUTER,
  IS_OFFER_EXISTING,
  PRODUCT_LISTINGS_WITHOUT_SLASH
} from "../../lib/constants";
import { setDataLayerForPlpDirectCalls } from "../../lib/adobeUtils";
const LIST = "list";
const GRID = "grid";
const PRODUCT = "product";
export const PLPAD = "plpAd";
export const ICONICFILTER = "iconicFilter";
export default class ProductGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: GRID
    };
  }

  switchView() {
    if (this.state.view === LIST) {
      this.setState({ view: GRID });
    } else {
      this.setState({ view: LIST });
    }
  }
  changeAddress() {
    if (this.props.changeAddress) {
      this.props.changeAddress();
    }
  }
  componentDidMount() {
    const data = this.props && this.props.data && this.props.data.length > 0;
    const type = data && data[0].productCategoryType;

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
    this.props.setProductModuleRef(productModuleId);
    this.props.history.push(url, {
      isComingFromPlp: true
    });
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
      />
    );
    // } else if (data.type === PLPAD) {
    //   return <PlpAds imageURL={data.imageURL} />;
    // } else if (data.type === ICONICFILTER) {
    //   return <IconicFilter data={data.filterValue} title={data.filterTitle} />;
    // } else {
    //   return null;
    // }
  };
  render() {
    return (
      <div className={styles.base}>
        <div className={styles.header}>
          <div className={styles.product}>
            {this.props.totalResults ? this.props.totalResults : 0} Products
          </div>

          {/* <div className={styles.area}>{this.props.area}</div> */}
          {/* <div
            className={styles.areaChange}
            onClick={() => this.changeAddress()}
          >
            Change
          </div> */}
          <div className={styles.icon} onClick={() => this.switchView()}>
            {this.state.view === LIST && <Icon image={gridImage} size={20} />}
            {this.state.view === GRID && <Icon image={listImage} size={20} />}
          </div>
        </div>
        <div className={styles.content}>
          <DumbGrid
            search={this.props.search}
            offset={0}
            elementWidthMobile={this.state.view === LIST ? 100 : 50}
          >
            {this.props.data &&
              this.props.data.map((datum, i) => {
                // if (
                //   datum.type === PRODUCT ||
                //   datum.type === PLPAD ||
                //   datum.type === ICONICFILTER
                // ) {
                let widthMobile = false;
                // if (datum.type === PLPAD || datum.type === ICONICFILTER) {
                //   widthMobile = 100;
                // }
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
                // } else {
                //   return null;
                // }
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
