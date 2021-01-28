import React from "react";
import PropTypes from "prop-types";
import CheckBox from "../../general/components/CheckBox.js";
import Image from "../../xelpmoc-core/Image";
import FillupRatingOrder from "../../pdp/components/FillupRatingOrder";
import TextArea from "../../general/components/TextArea";
import styles from "./SellerCardReview.css";

const ItemDeliveredAsDescribed = [
  { Label: "Yes", Value: "yes" },
  { Label: "No", Value: "no" }
];

const ItemDeliveredOnCommunicatedTime = [
  { Label: "Yes", Value: "yes" },
  { Label: "No", Value: "no" }
];

export default class SellerCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: "",
      placeholder: "Add comments (optional)",
      isItemDeliveredAsDescribed: null,
      isItemDeliveredInCommunicatedTime: null,
      rating: null
    };
  }

  handleChange(val) {
    this.setState({ comment: val });
  }

  onRatingChange = val => {
    this.setState({ rating: val });
  };

  handleDescribedChange(selectedStatus) {
    this.setState({ isItemDeliveredAsDescribed: selectedStatus.Value });
  }

  handleCommunicatedTimeChange(selectedStatus) {
    this.setState({
      isItemDeliveredInCommunicatedTime: selectedStatus.Value
    });
  }

  handleSubmitClick = sellerData => {
    this.props.onSellerReviewSubmit(sellerData, this.state);
  };

  render() {
    let {
      title,
      placedTime,
      orderNumber,
      orderFullfilledBy,
      productImage,
      sellerData,
      pathURL
    } = this.props;

    let {
      resetRating,
      isItemDeliveredAsDescribed,
      isItemDeliveredInCommunicatedTime,
      comment,
      placeholder,
      rating
    } = this.state;

    let btnStyle = {
      opacity: 1,
      cursor: "pointer"
    };

    return (
      <div className={styles.base}>
        <div className={styles.orderDetails}>
          <div className={styles.productNameNMoreInfo}>
            <div className={styles.title}>{title}</div>
          </div>

          <div className={styles.placedTime}>
            Order Placed:{" "}
            <span className={styles.placedTimeText}>{placedTime}</span>
          </div>
          <div className={styles.orderNumber}>
            Order Number:{" "}
            <span className={styles.placedTimeText}>{orderNumber}</span>
          </div>
          <div className={styles.orderFullfilledBy}>
            Order Fulfilled by SELLER{" "}
            <span className={styles.placedTimeText}>{orderFullfilledBy}</span>
          </div>
        </div>
        <div className={styles.productImage}>
          <Image image={productImage} alt="" />
        </div>
        {pathURL.indexOf("seller-reviewed") === -1 ? (
          <div>
            <div
              className={styles.orderIdHolder}
              style={{
                marginBottom: `${15}px`,
                borderBottom: `${1}px solid #efefef`,
                paddingBottom: `${15}px`
              }}
            />
            <div className={styles.ratingContainer}>
              <div className={styles.ratingHeader}>Rate your Seller</div>
              <div className={styles.ratingBar}>
                <FillupRatingOrder
                  rating={rating}
                  onChange={this.onRatingChange}
                  resetRating={resetRating}
                />
              </div>
            </div>
            <div
              className={styles.orderIdHolder}
              style={{
                marginBottom: `${15}px`,
                borderBottom: `${1}px solid #efefef`,
                paddingBottom: `${15}px`
              }}
            />
            <div className={styles.describedItem}>
              <div className={styles.itemDeliveredHeader}>
                <React.Fragment>
                  <span className={styles.headerText}>
                    Item delivered as described
                  </span>
                  <div className={styles.iteDeliveredAsDescribed}>
                    {ItemDeliveredAsDescribed &&
                      ItemDeliveredAsDescribed.map((item, index) => {
                        return (
                          <div
                            className={styles.radioBtnWrapper}
                            key={`${index}_Described`}
                            value={item.Value}
                            onClick={() => this.handleDescribedChange(item)}
                          >
                            <div className={styles.radioBtnContent}>
                              <CheckBox
                                selected={
                                  isItemDeliveredAsDescribed === item.Value
                                }
                              />
                            </div>
                            {item.Label}
                          </div>
                        );
                      })}
                  </div>
                </React.Fragment>
                <React.Fragment>
                  <span className={styles.headerText}>
                    Item delivered as on communicated time
                  </span>
                  <div className={styles.iteDeliveredAsDescribed}>
                    {ItemDeliveredOnCommunicatedTime &&
                      ItemDeliveredOnCommunicatedTime.map((item, index) => {
                        return (
                          <div
                            className={styles.radioBtnWrapper}
                            key={`${index}_CommunicatedTime`}
                            value={item.Value}
                            onClick={() =>
                              this.handleCommunicatedTimeChange(item)
                            }
                          >
                            <div className={styles.radioBtnContent}>
                              <CheckBox
                                selected={
                                  isItemDeliveredInCommunicatedTime ===
                                  item.Value
                                }
                              />
                            </div>
                            {item.Label}
                          </div>
                        );
                      })}
                  </div>
                </React.Fragment>
              </div>
              <div className={styles.itemDescribed}>
                <TextArea
                  onChange={val => this.handleChange(val)}
                  value={comment}
                  placeholder={placeholder}
                />
              </div>
              <div className={styles.submitButtonDiv}>
                <button
                  className={styles.submitButton}
                  style={btnStyle}
                  onClick={() => this.handleSubmitClick(sellerData)}
                >
                  <span className={styles.buttonText}>Submit</span>
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

SellerCard.propTypes = {
  productImage: PropTypes.string,
  productName: PropTypes.string,
  additionalContent: PropTypes.element,
  price: PropTypes.number,
  discountPrice: PropTypes.string,
  isSelect: PropTypes.bool,
  pathURL: PropTypes.string,
  onSellerReviewSubmit: PropTypes.func,
  title: PropTypes.string,
  placedTime: PropTypes.string,
  orderNumber: PropTypes.string,
  orderFullfilledBy: PropTypes.string,
  sellerData: PropTypes.object,
};
SellerCard.defaultProps = {
  quantity: false,
  numberOfQuantity: 1
};
