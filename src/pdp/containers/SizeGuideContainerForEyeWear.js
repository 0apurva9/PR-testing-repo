import { connect } from "react-redux";
import SizeGuideMainForEyeWear from "../components/SizeGuideMainForEyeWear";
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
    productName: state.productDescription.productDetails.productName
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

const SizeGuideContainerForEyeWear = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SizeGuideMainForEyeWear)
);

export default SizeGuideContainerForEyeWear;
