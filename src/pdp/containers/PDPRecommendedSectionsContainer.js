import { connect } from "react-redux";
import PDPRecommendedSections from "../components/PDPRecommendedSections";
import {
  pdpAboutBrand,
  getMsdRequest,
  getRecentlyViewedProduct,
  setToOld
} from "../actions/pdp.actions.js";
import { withRouter } from "react-router-dom";

const mapDispatchToProps = dispatch => {
  return {
    getMsdRequest: (productCode, widgetName) => {
      dispatch(getMsdRequest(productCode, widgetName));
    },
    getRecentlyViewedProduct: productCode => {
      dispatch(getRecentlyViewedProduct(productCode));
    },
    pdpAboutBrand: productCode => {
      dispatch(pdpAboutBrand(productCode));
    },
    setToOld: () => {
      dispatch(setToOld());
    }
  };
};

const mapStateToProps = state => {
  return {
    msdItems: state.productDescription.msdItems,
    recentlyViewedProduct: state.productDescription.recentlyViewedProduct,
    aboutTheBrand: state.productDescription.aboutTheBrand,
    visitedNewProduct: state.productDescription.visitedNewProduct,
    recommendedItems: state.productDescription.recommendedItems
  };
};

const PDPRecommendedSectionsContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PDPRecommendedSections)
);
export default PDPRecommendedSectionsContainer;
