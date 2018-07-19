import { connect } from "react-redux";
import ReviewListSection from "../components/ReviewListSection";
import { withRouter } from "react-router-dom";
import { getProductReviews } from "../actions/pdp.actions";

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getProductReviews: (pageIndex, orderBy, sortBy) => {
      dispatch(
        getProductReviews(ownProps.productId, pageIndex, orderBy, sortBy)
      );
    }
  };
};
const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    reviews: state.productDescription.reviews
  };
};

const ProductReviewListContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ReviewListSection)
);

export default ProductReviewListContainer;
