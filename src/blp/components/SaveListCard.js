import React from "react";
import styles from "./SaveListCard.css";
import PropTypes from "prop-types";
import ProductDetailsCardForSaveList from "../../pdp/components/ProductDetailsCardForSaveList";
import StarRating from "../../general/components/StarRating.js";
import OrderReturn from "../../account/components/OrderReturn.js";
export default class SaveListCard extends React.Component {
  addToBagItem() {
    if (this.props.addToBagItem) {
      this.props.addToBagItem();
    }
  }

  removeItem() {
    if (this.props.removeItem) {
      this.props.removeItem();
    }
  }

  openPopup() {
    this.setState({ openPopup: true });
  }

  onClickImage() {
    if (this.props.onClickImage) {
      this.props.onClickImage();
    }
  }

  render() {
    return (
      <div className={styles.base}>
        <div className={styles.imageHolder}>
          <ProductDetailsCardForSaveList
            productImage={this.props.image}
            outOfStock={this.props.outOfStock}
            productName={this.props.productName}
            brandName={this.props.brandName}
            productMaterial={this.props.productMaterial}
            price={this.props.price}
            onClickImage={() => this.onClickImage()}
            size={this.props.size}
            isSizeOrLength={this.props.isSizeOrLength}
            exchangeDetails={this.props.exchangeDetails}
          />
          <div className={styles.rating}>
            {this.props.totalNoOfReviews && (
              <StarRating averageRating={this.props.averageRating}>
                <div
                  className={styles.noOfReviews}
                >{`(${this.props.totalNoOfReviews})`}</div>
              </StarRating>
            )}
          </div>
        </div>
        {/* This may come back so commenting it */}

        {/* <MediaQuery query="(max-device-width: 1024px)">
          <div className={styles.textContainer}>
            <div className={styles.offers}>{`${
              this.props.offer
            } offers from ₹${this.props.offerPrice}`}</div>
          </div>
        </MediaQuery>
        <MediaQuery query="(min-device-width: 1025px)">
          <div className={styles.textContainer}>
            <div className={styles.offers}>
              <span>{this.props.offer}</span> <span>offers from ₹</span>{" "}
              <span className={styles.highlitedDate}>
                {this.props.offerPrice}
              </span>
            </div>
          </div>
        </MediaQuery> */}

        <div className={styles.footer}>
          <OrderReturn
            replaceItem={() => this.removeItem()}
            writeReview={() => this.addToBagItem()}
            underlineButtonLabel={this.props.underlineButtonLabel}
            buttonLabel={this.props.buttonLabel}
            underlineButtonColour={this.props.underlineButtonColour}
            isEditable={this.props.isEditable}
            outOfStock={this.props.outOfStock}
          />
        </div>
      </div>
    );
  }
}

const PriceFormatType = PropTypes.shape({
  commaFormattedValue: PropTypes.string,
  commaFormattedValueNoDecimal: PropTypes.string,
  currencyIso: PropTypes.string,
  currencySymbol: PropTypes.string,
  doubleValue: PropTypes.number,
  formattedValue: PropTypes.string,
  formattedValueNoDecimal: PropTypes.string,
  priceType: PropTypes.string,
  value: PropTypes.number,
});

SaveListCard.propTypes = {
  text: PropTypes.string,
  offers: PropTypes.number,
  image: PropTypes.string,
  productName: PropTypes.string,
  averageRating: PropTypes.number,
  price: PropTypes.number,
  totalNoOfReviews: PropTypes.string,
  productMaterial: PropTypes.string,
  removeItem: PropTypes.func,
  addToBagItem: PropTypes.func,
  underlineButtonColour: PropTypes.string,
  underlineButtonLabel: PropTypes.string,
  buttonLabel: PropTypes.string,
  outOfStock: PropTypes.bool,
  onClickImage: PropTypes.func,
  brandName: PropTypes.string,
  size: PropTypes.string,
  isSizeOrLength: PropTypes.string,
  isEditable: PropTypes.bool,
  exchangeDetails: PropTypes.shape({
    IMEINumber: PropTypes.string,
    detailCheckNotAllowed: PropTypes.bool,
    effectiveModelName: PropTypes.string,
    exchangeBrandId: PropTypes.string,
    exchangeBrandName: PropTypes.string,
    exchangeModelName: PropTypes.string,
    exchangeProductId: PropTypes.string,
    isIMEIVerified: PropTypes.bool,
    isPickupAvailableForExchange: PropTypes.bool,
    quoteExpired: PropTypes.bool,
    quoteExpiryDate: PropTypes.instanceOf(Date),
    quoteId: PropTypes.string,
    exchangePriceDetail: PropTypes.shape({
      TULBump: PriceFormatType,
      exchangeAmountCashify: PriceFormatType,
      pickupCharge: PriceFormatType,
      totalExchangeCashback: PriceFormatType,
    })
  })
};

SaveListCard.defaultProps = {
  underlineButtonLabel: "Add to bag",
  buttonLabel: "Remove",
  underlineButtonColour: "#ff1744",
  isEditable: true,
  outOfStock: false
};