import React, { Component } from "react";
import ControlInput from "../../general/components/ControlInput";
import ControlTextArea from "../../general/components/ControlTextArea";
import styles from "./RnRReviewSectionComponent.css";
import PropTypes from "prop-types";
import { setDataLayerForRatingReviewSection, ADOBE_RATING_REVIEW_MODAL_REVIEW_SECTION } from "../../lib/adobeUtils";
const success = "success";
class RnRReviewSectionComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            suggestions: null,
            selectedTitle: null,
            reviewDetails: null,
            reviewDetailsLength: 0,
            inputBorderColor: "",
            textBoxBorderColor: "#8d8d8d",
            showReviewGuidelines: false,
        };
        this.textInput = React.createRef();
    }

    componentDidMount() {
        if (
            this.props.userProductReviewDetails &&
            this.props.userProductReviewDetails.headline &&
            this.props.userProductReviewDetails.comment
        ) {
            this.setState({
                selectedTitle: this.props.userProductReviewDetails.headline,
                reviewDetails: this.props.userProductReviewDetails.comment,
                reviewDetailsLength: this.props.userProductReviewDetails.comment.length,
            });
            this.props.getUpdatedReviewDetails(
                this.props.userProductReviewDetails.headline,
                this.props.userProductReviewDetails.comment,
                this.props.userProductReviewDetails.id
            );
        }
        let data = { pageName: this.props.pageName ? this.props.pageName : null };
        setDataLayerForRatingReviewSection(ADOBE_RATING_REVIEW_MODAL_REVIEW_SECTION, data);
    }

    componentDidUpdate(prevProps) {
        if (
            this.props.titleSuggestionsDetails &&
            this.props.titleSuggestionsDetails !== prevProps.titleSuggestionsDetails &&
            this.props.titleSuggestionsDetails.status &&
            this.props.titleSuggestionsDetails.status.toLowerCase() === success &&
            this.props.titleSuggestionsDetails.suggestions &&
            this.props.titleSuggestionsDetails.suggestions.length > 0
        ) {
            this.setState({ suggestions: this.props.titleSuggestionsDetails.suggestions });
        }
    }

    setTitle = (selectedTitle, id) => {
        this.setState({ selectedTitle, inputBorderColor: "#212121" });
        this.props.getUpdatedReviewDetails(selectedTitle, this.state.reviewDetails, id ? id : null);
        this.textInput.current.focus();
    };

    changeReviewDetails = (reviewDetails, id) => {
        this.setState({ reviewDetails, reviewDetailsLength: reviewDetails.length });
        this.props.getUpdatedReviewDetails(this.state.selectedTitle, reviewDetails, id ? id : null);
    };

    handleInputOnFocus = () => {
        this.setState({ inputBorderColor: "#212121" });
    };

    handleInputOnBlur = () => {
        this.setState({ inputBorderColor: "" });
    };

    handleTextBoxOnFocus = () => {
        this.setState({ textBoxBorderColor: "#212121" });
    };

    handleTextboxOnBlur = () => {
        this.setState({ textBoxBorderColor: "" });
    };

    toggleReviewGuidelines = () => {
        this.setState({ showReviewGuidelines: !this.state.showReviewGuidelines });
    };

    render() {
        let id = null;
        if (this.props.userProductReviewDetails && this.props.userProductReviewDetails.id) {
            id = this.props.userProductReviewDetails.id;
        }

        return (
            <React.Fragment>
                <div className={styles.heading}>Help us understand what you liked</div>
                <div className={styles.ratingDetailsContainer}>
                    <div className={styles.subHeading}>Choose a Title</div>
                    {this.state.suggestions &&
                        this.state.suggestions.map(title => {
                            return (
                                <div
                                    key={title.titleSuggestion}
                                    className={
                                        this.state.selectedTitle !== title.titleSuggestion
                                            ? styles.suggestionTitle
                                            : styles.suggestionTitleSelected
                                    }
                                    onClick={() => this.setTitle(title.titleSuggestion, id)}
                                >
                                    {title.titleSuggestion}
                                </div>
                            );
                        })}
                    <ControlInput
                        placeholder="Or Type a Title"
                        value={this.state.selectedTitle ? this.state.selectedTitle : null}
                        boxy={true}
                        textStyle={{ fontSize: 14 }}
                        height={24}
                        onChange={selectedTitle => this.setTitle(selectedTitle, id)}
                        refForText={this.textInput}
                        borderColor={this.state.inputBorderColor}
                        onFocus={() => this.handleInputOnFocus()}
                        onBlur={() => this.handleInputOnBlur()}
                    />
                    <div className={styles.subHeading}>Write a detailed review about your experience</div>
                    <ControlTextArea
                        height={124}
                        placeholder="Tell us about your experience with this product (Min 50 characters)"
                        value={this.state.reviewDetails ? this.state.reviewDetails : null}
                        onChange={reviewDetails => this.changeReviewDetails(reviewDetails, id)}
                        borderColor={this.state.textBoxBorderColor}
                        onFocus={() => this.handleTextBoxOnFocus()}
                        onBlur={() => this.handleTextboxOnBlur()}
                    />
                    <span className={styles.reviewGuidelines} onClick={() => this.toggleReviewGuidelines()}>
                        Review Guidelines
                    </span>
                    {this.state.reviewDetailsLength <= 130 ? (
                        <span className={styles.reviewDetailsCount}>{this.state.reviewDetailsLength}</span>
                    ) : null}
                    {this.state.showReviewGuidelines ? (
                        <div className={styles.reviewGuidelinesBase}>
                            <div className={styles.headerForGuidelines}>How To Write a Good Customer Review</div>
                            <div className={styles.reviewBody}>
                                <div className={styles.contentHeader}>Do&#39;s</div>
                                <ul className={styles.contentContainer}>
                                    <li className={styles.reviewTipsText}>
                                        Describe your experience using the product.
                                    </li>
                                    <li className={styles.reviewTipsText}>
                                        Share details about what you like or dislike.
                                    </li>
                                </ul>
                                <div className={styles.contentHeader}>Dont&#39;s</div>
                                <ul className={styles.contentContainer}>
                                    <li className={styles.reviewTipsText}>
                                        Don&#39;t share personal information such as email address, phone number or
                                        order number.
                                    </li>
                                    <li className={styles.reviewTipsText}>
                                        Don&#39;t share prices or availability details from our site or our competitors.
                                    </li>
                                    <li className={styles.reviewTipsText}>
                                        Use inappropriate language, discriminatory language, or other languages not
                                        suitable for a public forum.
                                    </li>
                                </ul>
                            </div>
                        </div>
                    ) : null}
                </div>
            </React.Fragment>
        );
    }
}

RnRReviewSectionComponent.propTypes = {
    titleSuggestionsDetails: PropTypes.object,
    getUpdatedReviewDetails: PropTypes.func,
    userProductReviewDetails: PropTypes.object,
    pageName: PropTypes.string,
};

export default RnRReviewSectionComponent;
