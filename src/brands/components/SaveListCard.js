import React from "react";
import styles from "./SaveListCard.css";
import PropTypes from "prop-types";
import ProductDetailsCard from "../../pdp/components/ProductDetailsCard";
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
  render() {
    return (
      <div className={styles.base}>
        <div className={styles.imageHolder}>
          <ProductDetailsCard
            productImage={this.props.image}
            productName={this.props.productName}
            productMaterial={this.props.productMaterial}
            price={this.props.price}
          />
          <div className={styles.rating}>
            <StarRating averageRating={this.props.averageRating}>
              {this.props.totalNoOfReviews && (
                <div className={styles.noOfReviews}>{`(${
                  this.props.totalNoOfReviews
                })`}</div>
              )}
            </StarRating>
          </div>
        </div>
        <div className={styles.textContainer}>
          <div className={styles.text}>{this.props.text}</div>
          <div className={styles.offers}>{this.props.offers}</div>
        </div>
        <div className={styles.footer}>
          <OrderReturn
            replaceItem={() => this.removeItem()}
            writeReview={() => this.addToBagItem()}
            underlineButtonLabel={this.props.underlineButtonLabel}
            buttonLabel={this.props.buttonLabel}
            underlineButtonColour={this.props.underlineButtonColour}
          />
        </div>
      </div>
    );
  }
}
SaveListCard.propTypes = {
  text: PropTypes.string,
  offers: PropTypes.string,
  image: PropTypes.string,
  productName: PropTypes.string,
  averageRating: PropTypes.number,
  price: PropTypes.string,
  totalNoOfReviews: PropTypes.string,
  productMaterial: PropTypes.string,
  removeItem: PropTypes.func,
  addToBagItem: PropTypes.func,
  underlineButtonColour: PropTypes.string,
  underlineButtonLabel: PropTypes.string,
  buttonLabel: PropTypes.string
};
SaveListCard.defaultProps = {
  underlineButtonLabel: "Add to bag",
  buttonLabel: "Remove",
  underlineButtonColour: "#ff1744"
};
