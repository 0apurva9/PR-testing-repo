import React from "react";
import SelectBoxDesktop from "../../general/components/SelectBoxDesktop";
import DeliveryInfoSelect from "./DeliveryInfoSelect";
import PropTypes from "prop-types";
import {
  HOME_DELIVERY,
  EXPRESS,
  COLLECT,
  EXPRESS_TEXT,
  STANDARD_SHIPPING,
  COLLECT_TEXT,
  YES,
  NO,
  DEFAULT_PIN_CODE_LOCAL_STORAGE
} from "../../lib/constants";
import ProductImage from "../../general/components/ProductImage.js";
import styles from "./CartItemForDesktop.css";
import { RUPEE_SYMBOL } from "../../lib/constants";
import AddToWishListButtonContainer from "../../wishlist/containers/AddToWishListButtonContainer";
import { WISHLIST_BUTTON_TEXT_TYPE } from "../../wishlist/components/AddToWishListButton";
import { ADOBE_DIRECT_CALL_FOR_SAVE_ITEM_ON_CART } from "../../lib/adobeUtils";
const NO_SIZE = "NO SIZE";
const NOT_SERVICEABLE = "Not available at your PIN code";
const OUT_OF_STOCK = "Product is out of stock";
export default class CartItemForDesktop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showDelivery: this.props.showDelivery ? this.props.showDelivery : false,
      label: "See all"
    };
  }
  onClick() {
    if (this.props.onClickImage) {
      this.props.onClickImage();
    }
  }
  handleRemove(index) {
    if (this.props.onRemove) {
      this.props.onRemove(index);
    }
  }
  getDeliveryName = type => {
    if (type === HOME_DELIVERY) {
      return STANDARD_SHIPPING;
    }
    if (type === EXPRESS) {
      return EXPRESS_TEXT;
    } else if (type === COLLECT) {
      return COLLECT_TEXT;
    }
  };

  selectDeliveryMode(val) {
    if (this.props.selectDeliveryMode) {
      this.props.selectDeliveryMode(val);
    }
  }

  getPickUpDetails = () => {
    this.props.onPiq();
  };
  onHide() {
    this.setState({ showDelivery: !this.state.showDelivery }, () => {
      if (this.state.label === "See all") {
        this.setState({ label: "Hide" });
      } else {
        this.setState({ label: "See all" });
      }
    });
  }

  handleQuantityChange(changedValue) {
    const updatedQuantity = parseInt(changedValue.value, 10);
    if (this.props.onQuantityChange) {
      this.props.onQuantityChange(this.props.entryNumber, updatedQuantity);
    }
  }
  render() {
    let fetchedQuantityList = [];
    if (this.props.isOutOfStock) {
      fetchedQuantityList = [{}];
    } else {
      for (let i = 1; i <= this.props.maxQuantityAllowed; i++) {
        fetchedQuantityList.push({
          value: i.toString(),
          label: i.toString()
        });
      }
    }
    return (
      <div className={styles.base}>
        <div className={styles.productImage}>
          <ProductImage
            image={this.props.productImage}
            onClickImage={() => this.onClick()}
          />
        </div>
        <div className={styles.productInformation}>
          <div className={styles.productInformationHolder}>
            {this.props.productName && (
              <div className={styles.informationText}>
                {this.props.productName}
              </div>
            )}
            <div className={styles.textWithOutOfStock}>
              {this.props.isGiveAway === NO && (
                <div className={styles.informationTextWithBolder}>
                  {!this.props.offerPrice && (
                    <React.Fragment>
                      {` ${RUPEE_SYMBOL}${this.props.price}`}
                    </React.Fragment>
                  )}
                  {this.props.offerPrice && (
                    <React.Fragment>
                      {` ${RUPEE_SYMBOL}${this.props.offerPrice}`}
                    </React.Fragment>
                  )}
                </div>
              )}
              {this.props.isGiveAway === NO &&
                (!this.props.productIsServiceable
                  ? localStorage.getItem(DEFAULT_PIN_CODE_LOCAL_STORAGE) && (
                      <React.Fragment>
                        <div className={styles.space}>|</div>
                        <div className={styles.serviceAvailabilityText}>
                          {`${NOT_SERVICEABLE}`}
                        </div>
                      </React.Fragment>
                    )
                  : this.props.isOutOfStock && (
                      <div className={styles.serviceAvailabilityText}>
                        {OUT_OF_STOCK}
                      </div>
                    ))}
            </div>
            {this.props.isGiveAway === NO &&
              this.props.hasFooter && (
                <div className={styles.dropDown}>
                  <SelectBoxDesktop
                    value={this.props.qtySelectedByUser}
                    label={this.props.qtySelectedByUser}
                    height={30}
                    options={fetchedQuantityList}
                    onChange={val => this.handleQuantityChange(val)}
                    size={10}
                    leftChild={this.props.dropdownLabel}
                    leftChildSize={80}
                    rightChildSize={30}
                    labelWithLeftChild={true}
                    arrowColour="black"
                    disabled={this.props.isOutOfStock}
                    theme="hollowBox"
                    paddingLeftColour={"#000"}
                    paddingLeftFontFamily={"light"}
                    paddingLeft={"0px"}
                    rightArrow={0}
                  />
                </div>
              )}
            {(this.props.size || this.props.color) && (
              <div className={styles.colourSizeHolder}>
                {this.props.size &&
                  this.props.size.toUpperCase() !== NO_SIZE && (
                    <div className={styles.colourText}>
                      {`Size:  ${this.props.size}`}
                    </div>
                  )}
                {this.props.color && (
                  <div className={styles.sizeText}>
                    {`Color:  ${this.props.color}`}
                  </div>
                )}
              </div>
            )}
          </div>
          {this.props.isGiveAway === NO &&
            this.props.hasFooter && (
              <div className={styles.footer}>
                <div className={styles.wishlist}>
                  <AddToWishListButtonContainer
                    type={WISHLIST_BUTTON_TEXT_TYPE}
                    productListingId={this.props.product.productcode}
                    winningUssID={this.props.product.USSID}
                    setDataLayerType={ADOBE_DIRECT_CALL_FOR_SAVE_ITEM_ON_CART}
                    index={this.props.index}
                  />
                </div>
                <div
                  className={styles.removeLabel}
                  onClick={() => this.handleRemove(this.props.index)}
                >
                  {this.props.removeText}
                </div>
              </div>
            )}
        </div>

        {this.props.isGiveAway === NO &&
          this.props.deliveryInformation && (
            <div className={styles.deliveryInfo}>
              <DeliveryInfoSelect
                deliveryInformation={this.props.deliveryInformation}
                selected={this.props.selected}
                onSelect={val => this.selectDeliveryMode(val)}
                onPiq={val => this.getPickUpDetails()}
                isClickable={this.props.isClickable}
              />
            </div>
          )}
      </div>
    );
  }
}
CartItemForDesktop.propTypes = {
  onRemove: PropTypes.func,
  productImage: PropTypes.string,
  productName: PropTypes.string,
  productDetails: PropTypes.string,
  price: PropTypes.string,
  deliverTime: PropTypes.string,
  dropdownLabel: PropTypes.string,
  deliveryInfoToggle: PropTypes.bool,
  hasFooter: PropTypes.bool,
  onQuantityChange: PropTypes.func,
  deliveryInformation: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string,
      header: PropTypes.string,
      placedTime: PropTypes.string
    })
  ),
  product: PropTypes.object,
  pinCode: PropTypes.object,
  maxQuantityAllowed: PropTypes.string,
  qtySelectedByUser: PropTypes.string
};

CartItemForDesktop.defaultProps = {
  deliveryInfoToggle: true,
  hasFooter: true,
  dropdownLabel: "Quantity:",
  removeText: "Remove"
};
