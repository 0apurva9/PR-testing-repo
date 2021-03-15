import React from "react";
import styles from "./ReviewPage.css";
import PropTypes from "prop-types";
import RatingAndIconComponent from "./PdpBeautyDesktop/DescriptionSection/RatingAndIconComponent";
import RatingWithStatusBarComponent from "./PdpBeautyDesktop/DescriptionSection/RatingWithStatusBarComponent";
import Icon from "../../xelpmoc-core/Icon";
import defaultUserIcon from "./img/defaultUserIcon.svg";
import maleUserIcon from "./img/maleUserIcon.svg";
import femaleUserIcon from "./img/femaleUserIcon.svg";

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const INVALID_DATE = "Invalid Date";
export default class ReviewPage extends React.Component {
    render() {
        let getDate;
        let userReviewDate = this.props.date && this.props.date.split(" ")[0].split("-");
        if (userReviewDate) {
            getDate = userReviewDate[2].split("T")[0];
        }
        let date = getDate + " " + months[userReviewDate[1] - 1] + ", " + userReviewDate[0];
		let userIcon = defaultUserIcon;
		if(this.props.gender) {
			if(this.props.gender === "MALE") {
				userIcon = maleUserIcon;
			}
			if(this.props.gender === "FEMALE") {
				userIcon = femaleUserIcon;
			}
		}

        return (
            <div className={styles.base}>
                {date && date !== INVALID_DATE ? (
                    <div className={styles.dateTimeBox}>
                        <span>
							<span className={styles.userIconContainer}>
								<Icon image={userIcon} size={25} />
							</span>
                            <span className={styles.nameHolder}>
                                {this.props.name &&
                                    this.props.name.charAt(0).toUpperCase() + this.props.name.slice(1).toLowerCase()}
                            </span>
                            {this.props.isBuyer && (
                                <span className={styles.isBuyer}>
                                    <span className={styles.buyerIcon} />
                                    Verified Buyer
                                </span>
                            )}

                            <span className={styles.reviewAge}>{this.props.reviewAge}</span>
                        </span>
                    </div>
                ) : (
                    <div className={styles.dateTimeBox}>
                        {this.props.name &&
                            this.props.name.charAt(0).toUpperCase() + this.props.name.slice(1).toLowerCase()}
                    </div>
                )}
                {this.props.rating && (
                    <div className={styles.starHolder}>
                        <RatingAndIconComponent averageRating={this.props.rating} isReviewPage={true} />
                    </div>
                )}
                {this.props.heading && <div className={styles.heading}>{this.props.heading}</div>}
                {this.props.sizelink && this.props.sizelink.size && (
                    <span className={styles.productAttribute}>{this.props.sizelink.size}</span>
                )}
                {this.props.colorlink && this.props.colorlink.color && (
                    <span className={styles.productAttribute}>
                        <span
                            className={styles.colorAttribute}
                            style={{ backgroundColor: this.props.colorlink.colorHexCode }}
                        />
                        {this.props.colorlink.color}
                    </span>
                )}
                {this.props.text && (
                    <div
                        className={this.props.fromBeautyPdp ? [styles.text, styles.familyLight].join(" ") : styles.text}
                    >
                        {this.props.text.replace(new RegExp("<br />", "g"), "\r\n")}
                    </div>
                )}

                {this.props.eligibleParamCaptured && this.props.eligibleParamCaptured.length > 0 ? (
                    <div className={styles.ratingWithStatusBarContainer}>
                        {this.props.eligibleParamCaptured.map(rating => {
                            if (rating.paramVisibility) {
                                return (
                                    <RatingWithStatusBarComponent
                                        currentRating={rating.parameterRating}
                                        showCurrentRating={false}
                                        ratingTitle={rating.parameterName}
                                        isFluid={true}
                                    />
                                );
                            }
                        })}
                    </div>
                ) : null}
                <div />
            </div>
        );
    }
}
ReviewPage.propTypes = {
    text: PropTypes.string,
    date: PropTypes.string,
    heading: PropTypes.string,
    rating: PropTypes.number,
    isBuyer: PropTypes.bool,
    fromBeautyPdp: PropTypes.bool,
    name: PropTypes.string,
    reviewAge: PropTypes.string,
    colorlink: PropTypes.object,
    sizelink: PropTypes.object,
    eligibleParamCaptured: PropTypes.object,
	gender: PropTypes.string,
};
