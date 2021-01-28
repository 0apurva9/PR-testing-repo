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
    const headerName =
      this.props &&
      this.props.productListings &&
      this.props.productListings.seo &&
      this.props.productListings.seo.breadcrumbs;
    return (
      <div className={styles.baseWrapper}>
        <div className={styles.base}>
          <div className={styles.header}>
            {headerName
              ? headerName[0].name
              : this.props &&
                this.props.productListings &&
                this.props.productListings.currentQuery &&
                this.props.productListings.currentQuery.searchQuery.replace(
                  "%22",
                  '"'
                )}{" "}
            Price List
          </div>
          <div className={styles.productListWrapper}>
            <div className={styles.productListHeader}>
              <div className={styles.productListHeaderLeft}>
                {headerName
                  ? headerName[0].name
                  : this.props &&
                    this.props.productListings &&
                    this.props.productListings.currentQuery &&
                    this.props.productListings.currentQuery.searchQuery.replace(
                      "%22",
                      '"'
                    )}
              </div>
              <div className={styles.priceText}>Price</div>
            </div>
            <div className={styles.productListDetailsWrapper}>
              {this.props &&
                this.props.productListings &&
                this.props.productListings.searchresult &&
                this.props.productListings.searchresult
                  .slice(0, 10)
                  .map((value, i) => {
                    return (
                      <div className={styles.productListRow} key={i}>
                        <div className={styles.productListDetailWrapper}>
                          <span>{i + 1}. </span>
                          <a
                            target="_blank"
                            rel="noreferrer"
                            href={`${window.location.origin}${value.webURL}`}
                            className={styles.productListDetail}
                          >
                            {value.productname}
                          </a>
                        </div>
                        <div className={styles.productListPrice}>
                          {value.price &&
                            (value.price.maxPrice &&
                            value.price.maxPrice.formattedValueNoDecimal
                              ? value.price.maxPrice.formattedValueNoDecimal
                              : value.price.sellingPrice &&
                                value.price.sellingPrice
                                  .formattedValueNoDecimal)}
                        </div>
                      </div>
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
