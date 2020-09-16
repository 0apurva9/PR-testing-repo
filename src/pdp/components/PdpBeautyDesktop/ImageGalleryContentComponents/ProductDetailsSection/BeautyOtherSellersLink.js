import React from "react";
import PdpLink from "../../../PdpLink";
import {
  sellers,
  winningSellerText,
  otherText
} from "./BeautyOtherSellersLink.css";

export default class BeautyOtherSellersLink extends React.Component {
  renderLink = serviceableOtherSellersCount => {
    return (
      <div className={sellers}>
        Sold directly by{" "}
        <span className={winningSellerText}>{this.props.winningSeller}</span>
        {serviceableOtherSellersCount > 0 ? (
          <span className={otherText}>
            {" "}
            and {serviceableOtherSellersCount} other seller(s)
          </span>
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
      this.props.serviceableOtherSellersUssid &&
      this.props.serviceableOtherSellersUssid.length;
    let serviceableOtherSellersUssid =
      this.props.serviceableOtherSellersUssid &&
      this.props.serviceableOtherSellersUssid;
    let foundWinningSellerInOtherSeller = [];
    if (serviceableOtherSellersUssid && this.props.winnningSellerUssId) {
      foundWinningSellerInOtherSeller = serviceableOtherSellersUssid.filter(
        seller => {
          return seller.USSID === this.props.winnningSellerUssId;
        }
      );
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
