import React from "react";
import styles from "./DesktopHeader.css";
import exchangeIconWhite from "../../general/components/img/exchangeIconWhite.svg";
import { RUPEE_SYMBOL } from "../../../src/lib/constants";
import Button from "./Button.js";
const NO_SIZE = "NO SIZE";

export default class Minibag extends React.Component {
  navigateToCart() {
    if (this.props.gotoCart) {
      this.props.gotoCart();
    }
  }
  render() {
    let bagCount =
      this.props.cart.products.length &&
      (this.props.cart.products.length > 1
        ? `${this.props.cart.products.length} items`
        : `${this.props.cart.products.length} item`);

    let productCardStyle =
      this.props.cart.products.length &&
      (this.props.cart.products.length > 2
        ? styles.mybagProductCard
        : styles.mybagProductCardShort);

    return (
      <div className={styles.mybag}>
        <div
          className={styles.mybagHeading}
          dangerouslySetInnerHTML={{
            __html: `My Bag (${bagCount})`
          }}
        />
        <div className={styles.mybagProductsContainer}>
          {this.props.cart.products.slice(0, 3).map((product, i) => {
            return (
              <div key={i} className={productCardStyle}>
                <div className={styles.mybagImage}>
                  <img alt={product.title} src={product.imageURL} />
                </div>
                <div className={styles.mybagProductInformation}>
                  <div className={styles.productTitle}>{product.title}</div>
                  {(product.price || product.MRP || product.discount) && (
                    <div className={styles.informationTextWithBolder}>
                      {product.price && (
                        <div className={styles.price}>
                          {`${RUPEE_SYMBOL}${product.price}`}
                        </div>
                      )}
                      {product.MRP && product.price !== product.MRP && (
                        <div
                          className={
                            !product.price ? styles.mrp : styles.strikemrp
                          }
                        >
                          {`${RUPEE_SYMBOL}${product.MRP}`}
                        </div>
                      )}
                      {!!product.discount && product.discount > 0 && (
                        <div className={styles.discount}>
                          {`(${product.discount}%)`}
                        </div>
                      )}
                    </div>
                  )}
                  {(product.size || product.color || product.quantity) && (
                    <div className={styles.productVariantsHolder}>
                      {product.color && (
                        <div className={styles.colourText}>
                          {`Color:  ${product.color}`}
                        </div>
                      )}
                      {product.size &&
                        product.size.toUpperCase() !== NO_SIZE && (
                          <div className={styles.sizeText}>
                            {product.isSizeOrLength
                              ? `${product.isSizeOrLength}: ${product.size}`
                              : `Size: ${product.size}`}
                          </div>
                        )}
                      {product.quantity && (
                        <div className={styles.quantityText}>
                          {`Quantity:  ${product.quantity}`}
                        </div>
                      )}
                    </div>
                  )}
                </div>
                {product.exchangeDetails && (
                  <div className={styles.exchangeProductDetailsContainer}>
                    <img
                      src={exchangeIconWhite}
                      alt="exchange icon"
                      className={styles.exchangeIcon}
                    />
                    <span className={styles.exchangeProductDetails}>
                      Exchange Phone:{" "}
                      <span className={styles.fontLight}>
                        {product.exchangeDetails.exchangeModelName}
                      </span>
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div className={styles.totalAmount}>
          Total Payable Amount
          <span>{`${RUPEE_SYMBOL}${this.props.cart.bagTotal}`}</span>
        </div>
        <div className={styles.viewBagButtonHolder}>
          <div className={styles.buttonViewBag}>
            <Button
              type="primary"
              backgroundColor="#ff1744"
              height={36}
              label="View Bag"
              width={147}
              color="#ffffff"
              textStyle={{ color: "#ffffff", fontSize: 14 }}
              onClick={() => this.navigateToCart()}
            />
          </div>
        </div>
      </div>
    );
  }
}
