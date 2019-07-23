import React, { Component } from "react";
import styles from "./DesktopFooterProductList.css";
class DesktopFooterProductList extends Component {
  render() {
    return (
      <div className={styles.baseWrapper}>
        <div className={styles.base}>
          <div className={styles.header}>
            {this.props &&
              this.props.productListings &&
              this.props.productListings.searchresult[0]
                .productCategoryType}{" "}
            Price List
          </div>
          <div className={styles.productListWrapper}>
            <div className={styles.productListHeader}>
              {this.props &&
                this.props.productListings &&
                this.props.productListings.searchresult[0].productCategoryType}
              <div className={styles.priceText}>Price</div>
            </div>

            <div className={styles.productListDetailsWrapper}>
              {this.props &&
                this.props.productListings &&
                this.props.productListings.searchresult.map((value, i) => {
                  return (
                    i < 10 && (
                      <div className={styles.productListRow}>
                        <div className={styles.productListDetailWrapper}>
                          <span>{i + 1}. </span>
                          <a
                            target="_blank"
                            href={`${window.location.origin}${value.webURL}`}
                            className={styles.productListDetail}
                          >
                            {value.productname}
                          </a>
                        </div>
                        <div className={styles.productListPrice}>
                          Rs. {value.price.sellingPrice.doubleValue}
                        </div>
                      </div>
                    )
                  );
                })}
            </div>
          </div>
          <div className={styles.lastUpdated}>
            This data was last updated on 2019/06/28
          </div>
        </div>
      </div>
    );
  }
}

export default DesktopFooterProductList;
