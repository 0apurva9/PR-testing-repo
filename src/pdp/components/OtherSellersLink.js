import React from "react";
import PdpLink from "./PdpLink";
import {
  sellers,
  winningSellerText,
  otherText
} from "./ProductDescriptionPage.css";
export default class OtherSellersLink extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      actualAvailableOtherSellers: []
    };
  }
  /*  getValidSellerCount = () => {
    const validSellersCount = this.props.otherSellers
      ? this.props.otherSellers.filter(val => {
          return parseInt(val.availableStock, 10) > 0;
        }).length
      : 0;
    return validSellersCount;
  }; */

  getAllValidSellers = () => {
    const validSellersCount = this.props.otherSellers
      ? this.props.otherSellers.filter(val => {
          return parseInt(val.availableStock, 10) > 0;
        })
      : 0;
    return validSellersCount;
  };

  renderLink = () => {
    return (
      <div className={sellers}>
        Sold directly by{" "}
        <span className={winningSellerText}>{this.props.winningSeller}</span>
        {this.state.actualAvailableOtherSellers.length !== 0 && (
          <span className={otherText}>
            {" "}
            and {this.state.actualAvailableOtherSellers.length} other seller(s)
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

  setAllAvailableOtherSellers = pinCodeResponse => {
    let potentialAvailableOtherSellers = [];
    let tmpActualAvailableOtherSeller = [];
    potentialAvailableOtherSellers = this.getAllValidSellers();
    potentialAvailableOtherSellers &&
      potentialAvailableOtherSellers.map((otherSeller, i) => {
        tmpActualAvailableOtherSeller = pinCodeResponse.filter(
          pincodeSeller => {
            return (
              otherSeller.USSID === pincodeSeller.ussid &&
              pincodeSeller.stockCount > 0 &&
              pincodeSeller.isServicable == "Y"
            );
          }
        );
      });
    this.setState({
      actualAvailableOtherSellers: tmpActualAvailableOtherSeller
    });
  };

  componentDidMount() {
    this.setAllAvailableOtherSellers(this.props.pinCodeResponse);
  }

  render() {
    if (this.props.winningSeller) {
      return (
        <PdpLink
          noLink={this.state.actualAvailableOtherSellers.length === 0}
          onClick={this.handleClick}
        >
          {this.renderLink()}
        </PdpLink>
      );
    } else {
      return null;
    }
  }
}
