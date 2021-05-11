import { connect } from "react-redux";
import ReviewListSection from "../components/ReviewListSection";
import { withRouter } from "react-router-dom";
import { getPdpReviews } from "../actions/pdp.actions";

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getPdpReviews: () => {
            dispatch(getPdpReviews(ownProps.productId));
        },
    };
};
const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps,
        reviews: state.productDescription.getPdpReviewsDetails,
        getPdpReviewsStatus: state.productDescription.getPdpReviewsStatus,
    };
};

const ProductReviewListContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(ReviewListSection));

export default ProductReviewListContainer;
