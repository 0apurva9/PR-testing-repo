import React from "react";
import PdpLink from "./PdpLink";
import {
  sellers,
  winningSellerText,
  otherText
} from "./ProductDescriptionPage.css";
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

  renderLink = () => {
    return (
      <div className={sellers}>
        Sold directly by{" "}
        <span className={winningSellerText}>{this.props.winningSeller}</span>
        {this.props.serviceableOtherSellers && (
          <span className={otherText}>
            {" "}
            and {this.props.serviceableOtherSellers} other seller(s)
          </span>
        )}
      </div>
    );
  };
  handleClick = () => {
    if (this.props.onClick) {
      this.props.onClick();
    }
  };

  render() {
    let noLink = false;
    if (!this.props.serviceableOtherSellers) {
      noLink = true;
    }
    if (this.props.winningSeller) {
      return (
        <PdpLink noLink={noLink} onClick={this.handleClick}>
          {this.renderLink()}
        </PdpLink>
      );
    } else {
      return null;
    }
  }
}
