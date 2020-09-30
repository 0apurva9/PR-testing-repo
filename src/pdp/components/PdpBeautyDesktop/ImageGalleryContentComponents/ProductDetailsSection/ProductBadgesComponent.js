import React from "react";

import PdpFlags from "../../../../components/PdpFlags";

export default class ProductBadgesComponent extends React.Component {
  render() {
    const productDetails = this.props && this.props.productDetails;
    let seasonData = {};
    if (productDetails && productDetails["seasonDetails"] !== undefined) {
      seasonData = productDetails["seasonDetails"].find(item => {
        return item.key === "Season";
      });
    }

    return (
      <React.Fragment>
        {productDetails && productDetails.winningSellerPrice && (
          <PdpFlags
            isBeautyPdp={true}
            discountPercent={productDetails.discount}
            isOfferExisting={productDetails.isOfferExisting}
            onlineExclusive={productDetails.isOnlineExclusive}
            outOfStock={productDetails.allOOStock}
            seasonSale={seasonData}
            newProduct={productDetails.isProductNew}
            showExchangeTag={productDetails.showExchangeTag}
            exchangeOfferAvailable={productDetails.exchangeOfferAvailable}
          />
        )}
      </React.Fragment>
    );
  }
}
