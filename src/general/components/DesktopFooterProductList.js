import React, { Component } from "react";
import styles from "./DesktopFooterProductList.css";
class DesktopFooterProductList extends Component {
  render() {
    let current_datetime = new Date();
    let formatted_date =
      current_datetime.getFullYear() +
      "/" +
      (current_datetime.getMonth() + 1) +
      "/" +
      current_datetime.getDate();

    return (
      <div className={styles.baseWrapper}>
        <div className={styles.base}>
          <div className={styles.header}>
            {this.props &&
              this.props.productListings &&
              this.props.productListings.searchresult &&
              this.props.productListings.searchresult[0]
                .productCategoryType}{" "}
            Price List
          </div>
          <div className={styles.productListWrapper}>
            <div className={styles.productListHeader}>
              <div className={styles.productListHeaderLeft}>
                {this.props &&
                  this.props.productListings &&
                  this.props.productListings.searchresult &&
                  this.props.productListings.searchresult[0]
                    .productCategoryType}
              </div>
              <div className={styles.priceText}>Price</div>
            </div>

            <div className={styles.productListDetailsWrapper}>
              {this.props &&
                this.props.productListings &&
                this.props.productListings.searchresult &&
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
            This data was last updated on {formatted_date}
          </div>
        </div>
      </div>
    );
  }
}

export default DesktopFooterProductList;
