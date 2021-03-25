import React from "react";
import RatingAndReviewCenterModalV2 from "./RatingAndReviewCenterModalV2";
import RatingAndReviewModalV2 from "./RatingAndReviewModalV2";
import PropTypes from "prop-types";

export default class RatingAndReviewWrapperModalV2 extends React.Component {
    render() {
        return (
            <React.Fragment>
                <RatingAndReviewCenterModalV2 closeModal={this.props.closeModal}>
                    <RatingAndReviewModalV2 {...this.props} />
                </RatingAndReviewCenterModalV2>
            </React.Fragment>
        );
    }
}

RatingAndReviewWrapperModalV2.propTypes = {
    closeModal: PropTypes.func,
};
