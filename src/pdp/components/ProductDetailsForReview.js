import React from "react";
import styles from "./ProductDetailsForReview.css";
import ProductImage from "../../general/components/ProductImage.js";
import PropTypes from "prop-types";
import { RUPEE_SYMBOL } from "../../lib/constants";
export default class ProductDetailsForReview extends React.Component {
    onClickImage() {
        if (this.props.onClickImage) {
            this.props.onClickImage();
        }
    }

    handleLinkClick = e => {
        e.preventDefault();
    };

    render() {
        return (
            <div className={styles.base}>
                <div className={styles.productImageHolder}>
                    {this.props.outOfStock && <div className={styles.flag}>Out Of Stock</div>}

                    <ProductImage image={this.props.productImage} onClickImage={() => this.onClickImage()} />
                </div>
                <div className={styles.productDescriptionHolder}>
                    {this.props.brandName && (
                        <div itemProp="brand" itemScope="" itemType="http://schema.org/Organization">
                            {this.props.brandName && (
                                <h2 className={styles.brandName}>
                                    <span itemProp="name">{this.props.brandName}</span>
                                </h2>
                            )}
                        </div>
                    )}
                    {this.props.productName && (
                        <a itemProp="url" href={window.location.href} onClick={this.handleLinkClick}>
                            <div itemProp="name">
                                <h1 className={styles.productName}>{this.props.productName}</h1>
                            </div>
                        </a>
                    )}
                    {(this.props.price || this.props.discountPrice) && (
                        <div
                            className={styles.productPrice}
                            itemProp="offers"
                            itemScope
                            itemType="http://schema.org/AggregateOffer"
                        >
                            {this.props.price && (
                                <React.Fragment>
                                    <meta itemProp="priceCurrency" content={RUPEE_SYMBOL} />
                                    <meta itemProp="lowPrice" content={this.props.seoDoublePrice} />
                                    <span className={styles.onPrice}>
                                        {this.props.price.toString().includes(RUPEE_SYMBOL)
                                            ? this.props.price
                                            : `${RUPEE_SYMBOL}${this.props.price}`}
                                    </span>
                                </React.Fragment>
                            )}
                            {this.props.discountPrice && this.props.discountPrice !== this.props.price && (
                                <span className={styles.deletePrice}>
                                    {this.props.discountPrice.toString().includes(RUPEE_SYMBOL)
                                        ? this.props.discountPrice
                                        : `${RUPEE_SYMBOL}${this.props.discountPrice}`}
                                </span>
                            )}
                        </div>
                    )}
                    {this.props.discount && <span className={styles.discount}>{`(${this.props.discount}% OFF)`}</span>}
                    {this.props.productTitle && <div className={styles.productTitle}>{this.props.productTitle}</div>}
                    {this.props.size && this.props.size !== "NO SIZE" && (
                        <div className={styles.sizeHolder}>
                            <span className={styles.size}>size</span> {this.props.size}
                        </div>
                    )}
                </div>
            </div>
        );
    }
}
ProductDetailsForReview.propTypes = {
    productImage: PropTypes.string,
    brandName: PropTypes.string,
    productName: PropTypes.string,
    price: PropTypes.string,
    seoDoublePrice: PropTypes.string,
    discountPrice: PropTypes.string,
    averageRating: PropTypes.number,
    totalNoOfReviews: PropTypes.number,
    outOfStock: PropTypes.bool,
    onClickImage: PropTypes.func,
    productTitle: PropTypes.string,
    size: PropTypes.string,
    discount: PropTypes.string,
};
ProductDetailsForReview.defaultProps = {
    showAverageRatingWithDays: false,
};
