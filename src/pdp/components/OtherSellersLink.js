import React from "react";
import PdpLink from "./PdpLink";
import styles from "./ProductDescriptionPage.css";
export default class OtherSellersLink extends React.Component {
    /*  In PDP page only those other sellers are shown that are servicable in latest pincode in PDP,
      have stock count > 0 in checkpincode api response, ussid of seller in checkpincode response should match with USSID
      of other seller in getProductDescription api response. Commenting out below function because of this reason.

  getValidSellerCount = () => {
    const validSellersCount = this.props.otherSellers
      ? this.props.otherSellers.filter(val => {
          return parseInt(val.availableStock, 10) > 0;
        }).length
      : 0;
    return validSellersCount;
  }; */

    renderLink = serviceableOtherSellersCount => {
        return (
            <div className={styles.sellers}>
                Sold directly by <span className={styles.winningSellerText}>{this.props.winningSeller}</span>
                {serviceableOtherSellersCount > 0 ? (
                    <span className={styles.otherText}> and {serviceableOtherSellersCount} other seller(s)</span>
                ) : null}
            </div>
        );
    };

    handleClick = () => {
        if (this.props.onClick) {
            this.props.onClick();
        }
    };

    render() {
        let serviceableOtherSellersCount =
            this.props.serviceableOtherSellersUssid && this.props.serviceableOtherSellersUssid.length;
        let serviceableOtherSellersUssid =
            this.props.serviceableOtherSellersUssid && this.props.serviceableOtherSellersUssid;
        let foundWinningSellerInOtherSeller = [];
        if (serviceableOtherSellersUssid && this.props.winnningSellerUssId) {
            foundWinningSellerInOtherSeller = serviceableOtherSellersUssid.filter(seller => {
                return seller.USSID === this.props.winnningSellerUssId;
            });
        }
        if (foundWinningSellerInOtherSeller.length > 0) {
            serviceableOtherSellersCount = serviceableOtherSellersCount - 1;
        }
        let noLink = false;
        if (serviceableOtherSellersCount <= 0) {
            noLink = true;
        }
        if (this.props.winningSeller) {
            return (
                <PdpLink noLink={noLink} onClick={this.handleClick}>
                    {this.renderLink(serviceableOtherSellersCount)}
                </PdpLink>
            );
        } else {
            return null;
        }
    }
}
