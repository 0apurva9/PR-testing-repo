import React, { Component } from "react";
import queryString from "query-string";
import PropTypes from "prop-types";
import styles from "./IntermittentFeedbackPage.css";
import ProductImage from "../../general/components/ProductImage.js";
import SecondaryLoader from "../../general/components/SecondaryLoader";
import format from "date-fns/format";
import { RouterPropTypes } from "../../general/router-prop-types";
const FORWARD_FLOW_URL = "/feedback/NPSFeedbackForm?";
const RETURN_FLOW_URL = "/feedback/ReturnNPSFeedbackForm?";
const WEEK_DAY = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const DATE_FORMAT = "Do MMM";
export default class IntermittentFeedbackPage extends Component {
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
        let { originalUid, transactionId, deliveryMode = "", returnType = "" } = this.getUserDetails;
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
            r.ratingList.forEach(item => {
                colorCode = index <= 0 ? colorArr[0] : index <= 1 ? colorArr[1] : colorArr[2];
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
            product = {},
            formattedDate = "";
        if (this.props.feedBackPageData && this.props.feedBackPageData.data) {
            feedBackData = this.props.feedBackPageData && this.props.feedBackPageData.data;
            product = feedBackData.product;
        }

        if (product.deliveryDate) {
            let day = new Date(product.deliveryDate).getDay();
            let dayofweek = isNaN(day) ? "" : WEEK_DAY[day];
            formattedDate = `${dayofweek}, ${format(product.deliveryDate, DATE_FORMAT)}`;
        }
        return (
            <div className={styles.base}>
                <div className={styles.feedBackPageContainer}>
                    <div className={styles.feedBackPageHeader}>
                        <div className={styles.headerTextWrapper}>
                            <div className={styles.checkActive} />
                            <span className={styles.headerText}>
                                {product && product.deliveryDate ? "Delivered" : "Return Completed"}
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
                                <span className={styles.ratingLabel} style={{ left: "62%", position: "absolute" }}>
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
                                    <div className={styles.productName}>{product && product.productName}</div>
                                    <div className={styles.deliveryDate}>
                                        {product && product.deliveryDate
                                            ? `Delivered on ${formattedDate}`
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

IntermittentFeedbackPage.propTypes = {
    getIntermittentPageData: PropTypes.func,
    loadingForfeedBackPage: PropTypes.bool,
    feedBackPageData: PropTypes.shape({
        data: PropTypes.string,
    }),
    data: PropTypes.shape({
        product: PropTypes.shape({
            imageURL: PropTypes.string,
            productName: PropTypes.string,
            deliveryDate: PropTypes.string,
        }),
        ratings: PropTypes.arrayOf(
            PropTypes.shape({
                displayName: PropTypes.string,
                hexCode: PropTypes.string,
                ratingList: PropTypes.array,
            })
        ),
        subTitle: PropTypes.string,
        title: PropTypes.string,
    }),
    ...RouterPropTypes,
};
