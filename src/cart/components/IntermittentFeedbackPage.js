import React, { Component } from "react";
import queryString from "query-string";
import styles from "./IntermittentFeedbackPage.css";
import ProductImage from "../../general/components/ProductImage.js";
import SecondaryLoader from "../../general/components/SecondaryLoader";

const FORWARD_FLOW_URL = "feedback/NPSFeedbackForm?";
const RETURN_FLOW_URL = "feedback/ReturnNPSFeedbackForm?";
class IntermittentFeedbackPage extends Component {
  constructor(props) {
    super(props);

    this.getUserDetails = queryString.parse(this.props.location.search);
  }

  componentDidMount() {
    if (this.props.getIntermittentPageData) {
      let data = {
        originalUid: "dgupta@tataunistore.com",
        transactionId: "124192001717751",
        deliveryMode: "home-delivery"
      };
      this.props.getIntermittentPageData(data);
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

  renderRatingData = rating => {
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

    let {
      product: { imageURL, productName, deliveryDate },
      ratings,
      subTitle,
      title
    } = feedbackData.data; //this.props.feedbackData.data;

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

const feedbackData = {
  status: "success",
  errorCode: "NPS001",
  message: "NPS Rating successfull",
  data: {
    title: "Time to know, did we CLiQ?",
    subTitle: "How likely are you going to recommend us",
    ratings: [
      {
        displayName: "Not Likely",
        ratingList: [1, 2, 3, 4, 5, 6],
        hexCode: "#ff3435"
      },
      {
        displayName: "Maybe",
        ratingList: [7, 8],
        hexCode: "#ff3456"
      },
      {
        displayName: "Likely",
        ratingList: [9, 10],
        hexCode: "#ff3489"
      }
    ],
    product: {
      USSID: "10035032GVPL",
      categoryHierarchy: [
        {
          category_id: "BSH1E00193",
          category_name: "VU"
        },
        {
          category_id: "BSH1E00193MSH12",
          category_name: "Electronics"
        },
        {
          category_id: "BSH1E00193MSH1216",
          category_name: "TV"
        },
        {
          category_id: "BSH1E00193MSH1216105",
          category_name: "HD Ready TV"
        }
      ],
      consignmentStatus: "DELIVERED",
      deliveryDate: "Dec 30 2019",
      imageURL:
        "//img.tatacliq.com/images/i5/97Wx144H/MP000000005718665_97Wx144H_20191010152837.jpeg",
      logisticName: "Blue Dart",
      price: "7879.68",
      totalDiscount: "1240.00",
      productBrand: "VU",
      productName:
        "VU 80 cm (32 Inches) HD Ready LED TV 32GVPL (2019 Model, Black)",
      productcode: "MP000000005718665",
      returnPolicy: "7",
      selectedDeliveryMode: {
        code: "home-delivery",
        deliveryCost: "0.0",
        desc: "Delivered in 2-5 days",
        name: "Home Delivery"
      },
      sellerID: "100350",
      sellerName: "DIGITAL STORE",
      sellerorderno: "191226-006-635781",
      serialno: "32GVPL19H009792",
      statusDisplay: "Delivered"
    }
  }
};
