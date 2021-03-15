import React, { Component } from "react";
import ControlInput from "../../general/components/ControlInput";
import ControlTextArea from "../../general/components/ControlTextArea";
import styles from "./RnRReviewSectionComponent.css";
import PropTypes from "prop-types";
const success = "success";
class RnRReviewSectionComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            suggestions: null,
            selectedTitle: null,
            reviewDetails: null,
            reviewDetailsLength: 0,
        };
    }

	componentDidMount() {
		if(this.props.userProductReviewDetails &&
			this.props.userProductReviewDetails.headline &&
			this.props.userProductReviewDetails.comment) {
			this.setState({
				selectedTitle : this.props.userProductReviewDetails.headline,
				reviewDetails : this.props.userProductReviewDetails.comment,
				reviewDetailsLength : this.props.userProductReviewDetails.comment.length
			});
			this.props.getUpdatedReviewDetails(
				this.props.userProductReviewDetails.headline,
				this.props.userProductReviewDetails.comment,
				this.props.userProductReviewDetails.id
			);
		}
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
        this.setState({ selectedTitle });
        this.props.getUpdatedReviewDetails(selectedTitle, this.state.reviewDetails, id ? id : null);
    };

    changeReviewDetails = (reviewDetails, id) => {
        this.setState({ reviewDetails, reviewDetailsLength: reviewDetails.length });
        this.props.getUpdatedReviewDetails(this.state.selectedTitle, reviewDetails, id ? id : null);
    };

    render() {
		let id = null;
		if(this.props.userProductReviewDetails && this.props.userProductReviewDetails.id) {
			id = this.props.userProductReviewDetails.id;
		}

        return (
            <React.Fragment>
                <div className={styles.heading}>Help us understand what you liked</div>
                <div className={styles.ratingDetailsContainer}>
                    <div className={styles.subHeading}>Choose a Title</div>
                    {this.state.suggestions &&
                        this.state.suggestions.map((title) => {
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
                    />
                    <div className={styles.subHeading}>Write a detailed review about your experience</div>
                    <ControlTextArea
                        height={124}
                        placeholder="Tell us about your experience with this product (Min 50 characters)"
                        value={this.state.reviewDetails ? this.state.reviewDetails : null}
                        onChange={reviewDetails => this.changeReviewDetails(reviewDetails, id)}
                    />
                    {this.state.reviewDetailsLength <= 130 ? (
                        <span className={styles.reviewDetailsCount}>{this.state.reviewDetailsLength}</span>
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
};

export default RnRReviewSectionComponent;
