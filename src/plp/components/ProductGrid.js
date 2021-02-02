import React from "react";
import DumbGrid from "../../general/components/DumbGridPLP";
import ProductModuleContainer from "../../general/containers/ProductModuleContainer";
import PlpComponent from "./PlpComponent";
import PropTypes from "prop-types";
import styles from "./ProductGrid.css";
import MediaQuery from "react-responsive";
import { checkUserAgentIsMobile } from "../../lib/UserAgent.js";
import { PRODUCT_LISTINGS_WITHOUT_SLASH } from "../../lib/constants";
import { setDataLayerForPlpDirectCalls } from "../../lib/adobeUtils";

const LIST = "list";
const GRID = "grid";
export const PLPAD = "plpAd";
export const ICONICFILTER = "iconicFilter";
export default class ProductGrid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            view: GRID,
            gridBreakup: false,
            showSwatchImage: false,
            indexSwatch: -1,
            switchView: false,
            // gridScroll: localStorage.getItem("gridScroll")
            //   ? localStorage.getItem("gridScroll")
            //   : 0
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

    // recordScreenScroll = () => {
    //   localStorage.setItem("gridScroll", window.pageYOffset);
    // };
    goToProductDescription = (url, productObj, productModuleId, index) => {
        // change this
        if (!checkUserAgentIsMobile()) {
            window.open(url, "_blank");
        }
        if (this.props.history.location.pathname === PRODUCT_LISTINGS_WITHOUT_SLASH) {
            setDataLayerForPlpDirectCalls(productObj, index);
        }
        if (checkUserAgentIsMobile()) {
            this.props.setProductModuleRef(productModuleId);
            this.props.history.push(url, {
                isComingFromPlp: true,
            });
        }
    };

    renderComponent = (data, index) => {
        const altTag = `${data.productname}-${data.brandname}-${data.productCategoryType}-TATA CLIQ`;
        return (
            <ProductModuleContainer
                key={index}
                isRange={data.price.isRange}
                productCategoryType={data.productCategoryType}
                maxPrice={data.price && data.price.maxPrice && data.price.maxPrice.formattedValueNoDecimal}
                alt={altTag}
                seasonTag={data.seasonTag}
                minPrice={data.price && data.price.minPrice && data.price.minPrice.formattedValueNoDecimal}
                isPlp={true}
                productImage={
                    this.state.showSwatchImage && this.state.indexSwatch === index
                        ? data.swatchURL
                            ? data.swatchURL
                            : data.imageURL
                        : this.props.toggleView
                        ? data.swatchURL
                            ? data.swatchURL
                            : data.imageURL
                        : data.imageURL
                }
                title={data.brandname}
                price={data.price.mrpPrice ? data.price.mrpPrice.formattedValueNoDecimal : null}
                discountPrice={data.price.sellingPrice ? data.price.sellingPrice.formattedValueNoDecimal : null}
                description={data.productname}
                discountPercent={data.discountPercent}
                isOfferExisting={data.isOfferExisting}
                onlineExclusive={data.onlineExclusive}
                webURL={data.webURL}
                outOfStock={!data.cumulativeStockLevel}
                onOffer={data.isOfferExisting}
                newProduct={data.newProduct}
                averageRating={data.averageRating}
                ratingCount={data.ratingCount}
                view={this.props.view}
                winningUssID={data.winningUssID ? data.winningUssID : data.ussid}
                onClick={(url, data, ref) => this.goToProductDescription(url, data, ref, index)}
                productCategory={data.productCategoryType}
                productId={data.productId}
                offerData={data.offerData}
                showWishListButton={true}
                plpAttrMap={data && data.plpAttrMap}
                shouldShowSimilarIcon={true}
                productListings={this.props.productListings}
                ussid={data.ussid}
                showExchangeTag={data.showExchangeTag}
                exchangeOfferAvailable={data.exchangeOfferAvailable}
                maxExchangePrice={data.maxExchangePrice}
                maxExchangeBumpUp={data.maxExchangeBumpUp}
                variantCount={data.variantCount}
            />
        );
    };

    onMouseEnter(i) {
        this.setState({ showSwatchImage: true, indexSwatch: i });
    }

    onMouseLeave(i) {
        this.setState({ showSwatchImage: false, indexSwatch: i });
    }

    render() {
        let electronicView = this.props.electronicView;

        return (
            <React.Fragment>
                <div className={styles.base} style={{ position: this.props.isPosition ? "relative" : "" }}>
                    <MediaQuery query="(max-device-width:1024px)" values={{ deviceWidth: 1026 }}>
                        <div className={styles.header}>
                            <div className={styles.product}>
                                {this.props.totalResults ? this.props.totalResults : 0} Products
                            </div>
                        </div>
                    </MediaQuery>

                    <div className={styles.content}>
                        <DumbGrid
                            // gridScroll={this.state.gridScroll}
                            search={this.props.search}
                            electronicView={electronicView}
                            // recordScreenScroll={this.recordScreenScroll()}
                            offset={0}
                            elementWidthMobile={this.props.view === LIST ? 100 : 50}
                            elementWidthDesktop={this.props.gridBreakup ? 33.33 : 25}
                            banners={this.props.banners}
                            view={this.props.view}
                            plpBannerData={this.props.secondaryFeedData}
                        >
                            {this.props.data &&
                                this.props.data.map((datum, i) => {
                                    let widthMobile = false;

                                    return (
                                        <div
                                            key={i}
                                            onMouseEnter={() => this.onMouseEnter(i)}
                                            onMouseLeave={() => this.onMouseLeave(i)}
                                        >
                                            <PlpComponent
                                                gridWidthMobile={widthMobile}
                                                view={this.props.view}
                                                type={datum && datum.type}
                                            >
                                                {this.renderComponent(datum, i)}
                                            </PlpComponent>
                                        </div>
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
    isPosition: PropTypes.bool,
    history: PropTypes.object,
    changeAddress: PropTypes.func,
    setProductModuleRef: PropTypes.func,
    totalResults: PropTypes.number,
    electronicView: PropTypes.number,
    data: PropTypes.array,
    productListings: PropTypes.array,
    view: PropTypes.string,
    search: PropTypes.string,
    gridBreakup: PropTypes.bool,
    banners: PropTypes.array,
    secondaryFeedData: PropTypes.array,
    children: PropTypes.node,
    toggleView: PropTypes.bool,
};
ProductGrid.defaultProps = {
    area: "Delhi - 560345",
    isPosition: false,
};
