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
      URL = `${FORWARD_FLOW_URL}originalUid=${originalUid}&transactionId=
            ${transactionId}&deliveryMode=${deliveryMode}&rating=${ratingValue}`;
    } else {
      URL = `${RETURN_FLOW_URL}originalUid=${originalUid}&transactionId=
            ${transactionId}&returnType=${returnType}&rating=${ratingValue}`;
    }
    this.props.history.push(URL);
  }

  renderRatingData = (rating = []) => {
    let ratinglist = [];

    rating.forEach((r, index) => {
      r.ratingList.forEach((item, key) => {
        ratinglist.push(
          <div
            className={styles.ratingCicrle}
            style={{ backgroundColor: r.hexCode }}
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

    if (this.props && this.props.feedBackPageData) {
      var {
        product: { imageURL, productName, deliveryDate },
        ratings,
        subTitle,
        title
      } =
        this.props.feedBackPageData && this.props.feedBackPageData.data;
    }

    return (
      <div className={styles.base}>
        <div className={styles.feedBackPageContainer}>
          <div className={styles.feedBackPageHeader}>
            <div className={styles.headerTextWrapper}>
              <div className={styles.checkActive} />
              <span className={styles.headerText}>Delivered</span>
            </div>
            <div className={styles.headerSeperator} />
          </div>
          <div className={styles.mainTextWrapper}>
            <div className={styles.mainText}>{title}</div>
            <span className={styles.subMainText}>{subTitle}</span>
          </div>
          <div className={styles.productContainer}>
            <div className={styles.productRatingWrapper}>
              {this.renderRatingData(ratings)}
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
                    image={imageURL}
                    flatImage={productName === "Gift Card"}
                  />
                </div>
                <div className={styles.productDetails}>
                  <div className={styles.productName}>{productName}</div>
                  <div
                    className={styles.deliveryDate}
                  >{`Delivered on ${deliveryDate}`}</div>
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
