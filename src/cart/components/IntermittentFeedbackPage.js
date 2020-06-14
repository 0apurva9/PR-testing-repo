import React, { Component } from "react";
import queryString from "query-string";
import styles from "./IntermittentFeedbackPage.css";
import ProductImage from "../../general/components/ProductImage.js";
import SecondaryLoader from "../../general/components/SecondaryLoader";

const FORWARD_FLOW_URL = "/feedback/NPSFeedbackForm?";
const RETURN_FLOW_URL = "/feedback/ReturnNPSFeedbackForm?";
class IntermittentFeedbackPage extends Component {
  constructor(props) {
    super(props);

    this.getUserDetails = queryString.parse(this.props.location.search);
  }

  componentDidMount() {
    if (this.props.getIntermittentPageData) {
      this.props.getIntermittentPageData(this.getUserDetails);
    }
  }

  onFeedbackRatingClick(ratingValue) {
    let {
      originalUid,
      transactionId,
      deliveryMode = "",
      returnType = ""
    } = this.getUserDetails;
    let URL = "";
    if (deliveryMode) {
      URL = `${FORWARD_FLOW_URL}originalUid=${originalUid}&transactionId=${transactionId}&deliveryMode=${deliveryMode}&rating=${ratingValue}`;
    } else {
      URL = `${RETURN_FLOW_URL}originalUid=${originalUid}&transactionId=${transactionId}&returnType=${returnType}&rating=${ratingValue}`;
    }
    this.props.history.push(URL);
  }

  renderRatingData = (rating = []) => {
    let ratinglist = [],
      colorCode = null;
    const colorArr = ["#e96a65", "#f7a535", "#55be9f"];

    rating.forEach((r, index) => {
      r.ratingList.forEach((item, key) => {
        colorCode =
          index <= 0 ? colorArr[0] : index <= 1 ? colorArr[1] : colorArr[2];
        ratinglist.push(
          <div
            className={styles.ratingCicrle}
            style={{ backgroundColor: colorCode }}
            onClick={() => this.onFeedbackRatingClick(item)}
          >
            {item}
          </div>
        );
      });
    });

    return <div className={styles.rating}>{ratinglist}</div>;
  };

  render() {
    if (this.props.loadingForfeedBackPage) {
      return <SecondaryLoader />;
    }
    let feedBackData = {},
      product = {};
    if (this.props.feedBackPageData && this.props.feedBackPageData.data) {
      feedBackData =
        this.props.feedBackPageData && this.props.feedBackPageData.data;
      product = feedBackData.product;
    }

    return (
      <div className={styles.base}>
        <div className={styles.feedBackPageContainer}>
          <div className={styles.feedBackPageHeader}>
            <div className={styles.headerTextWrapper}>
              <div className={styles.checkActive} />
              <span className={styles.headerText}>
                {product && product.deliveryDate
                  ? "Delivered"
                  : "Return Completed"}
              </span>
            </div>
            <div className={styles.headerSeperator} />
          </div>
          <div className={styles.mainTextWrapper}>
            <div className={styles.mainText}>{feedBackData.title}</div>
            <span className={styles.subMainText}>{feedBackData.subTitle}</span>
          </div>
          <div className={styles.productContainer}>
            <div className={styles.productRatingWrapper}>
              <div className={styles.rateUsNow}>Rate us now</div>
              {this.renderRatingData(feedBackData.ratings)}
              <div className={styles.ratingLabelWrapper}>
                <span className={styles.ratingLabel}>Not Likely</span>
                <span
                  className={styles.ratingLabel}
                  style={{ left: "62%", position: "absolute" }}
                >
                  Maybe
                </span>
                <span
                  className={styles.ratingLabel}
                  style={{ fontWeight: 500, fontFamily: "semibold" }}
                >
                  Likely
                </span>
              </div>
            </div>
            <div className={styles.productDetailsContainer}>
              <div className={styles.productDetailsWrapper}>
                <div className={styles.productImageHolder}>
                  <ProductImage
                    image={product && product.imageURL}
                    flatImage={product && product.productName === "Gift Card"}
                  />
                </div>
                <div className={styles.productDetails}>
                  <div className={styles.productName}>
                    {product && product.productName}
                  </div>
                  <div className={styles.deliveryDate}>
                    {product && product.deliveryDate
                      ? `Delivered on ${product.deliveryDate}`
                      : "Return Completed"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default IntermittentFeedbackPage;
