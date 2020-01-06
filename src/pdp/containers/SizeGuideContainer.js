import { connect } from "react-redux";
import SizeGuideMain from "../components/SizeGuideMain";
import { withRouter } from "react-router-dom";
import {
  getProductSizeGuide,
  getProductSizeChart
} from "../actions/pdp.actions.js";
import {
  setDataLayerForPdpDirectCalls,
  SET_DATA_LAYER_FOR_SIZE_GUIDE
} from "../../lib/adobeUtils";

const mapStateToProps = state => {
  return {
    sizeData: state.productDescription.sizeGuide.data,
    loading: state.productDescription.sizeGuide.loading,
    productCode: state.productDescription.productDetails.productListingId,
    category: state.productDescription.productDetails.rootCategory,
    productName: state.productDescription.productDetails.productName,
    brandName: state.productDescription.productDetails.brandName
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getSizeGuide: productCode => {
      dispatch(getProductSizeGuide(productCode));
      setDataLayerForPdpDirectCalls(SET_DATA_LAYER_FOR_SIZE_GUIDE);
    },
    getProductSizeChart: productCode => {
      dispatch(getProductSizeChart(productCode));
      setDataLayerForPdpDirectCalls(SET_DATA_LAYER_FOR_SIZE_GUIDE);
    }
  };
};

const SizeGuideContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SizeGuideMain)
);

export default SizeGuideContainer;
