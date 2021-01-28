import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import Carousel from "../../../../general/components/Carousel";
import ProductModule from "../../../../general/components/ProductModule";
import { transformData } from "../../../../home/components/utils";
import { RUPEE_SYMBOL } from "../../../../lib/constants";
import styles from "./MoreFromBrand.css";

export default class MoreFromBrand extends Component {
    goToProductDescription = url => {
        this.props.history.push(url);
    };

    render() {
        return (
            <Fragment>
                {this.props.moreFromBrandResponse ? (
                    <div>
                        <div className={styles.container}>
                            <div className={styles["mfb-heading"]}>{this.props.heading}</div>
                        </div>
                        <Carousel
                            elementWidth={120}
                            isPaddingTop={false}
                            elementWidthDesktop={25}
                            header=""
                            buttonColor={true}
                            sliderWidthFull={true}
                        >
                            {this.props.moreFromBrandResponse &&
                                this.props.moreFromBrandResponse.length > 0 &&
                                this.props.moreFromBrandResponse.map((val, i) => {
                                    const transformedDatum = transformData(val);
                                    const productImage = transformedDatum.image;
                                    const discountedPrice = transformedDatum.discountPrice;
                                    let mrpInteger = null;
                                    if (transformData.price) {
                                        mrpInteger = parseInt(transformedDatum.price.replace(RUPEE_SYMBOL, ""), 10);
                                    }
                                    let discount = null;
                                    if (discountedPrice && mrpInteger) {
                                        discount = Math.floor(
                                            ((mrpInteger - parseInt(discountedPrice.replace(RUPEE_SYMBOL, ""), 10)) /
                                                mrpInteger) *
                                                100
                                        );
                                    }

                                    return (
                                        <ProductModule
                                            key={i}
                                            {...transformedDatum}
                                            {...this.props}
                                            productImage={productImage}
                                            productId={val.productListingId}
                                            isShowAddToWishlistIcon={false}
                                            discountPercent={discount}
                                            onClick={url => this.goToProductDescription(url)}
                                        />
                                    );
                                })}
                        </Carousel>
                    </div>
                ) : null}
            </Fragment>
        );
    }
}

MoreFromBrand.propTypes = {
    moreFromBrandResponse: PropTypes.arrayOf(
        PropTypes.shape({
            results: PropTypes.arrayOf(
                PropTypes.shape({
                    imageUrl: PropTypes.string,
                    mrp: PropTypes.string,
                    productListingId: PropTypes.string,
                    productName: PropTypes.string,
                    sharedText: PropTypes.string,
                    webURL: PropTypes.string,
                    winningSellerMOP: PropTypes.string,
                    winningUssID: PropTypes.string,
                })
            ),
        })
    ),
    history: PropTypes.shape({
        push: PropTypes.func,
    }),
    heading: PropTypes.string,
};
