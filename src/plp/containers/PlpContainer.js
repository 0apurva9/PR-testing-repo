import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Plp from "../components/Plp";
import { showModal, SORT } from "../../general/modal.actions.js";
import { setHeaderText } from "../../general/header.actions";
import {
  showFilter,
  hideFilter,
  setIfFilterHasBeenClicked,
  setProductModuleRef,
  userSelectedOutOfStock,
  getChatbotDetails,
  checkPincodeFromPLP
} from "../../plp/actions/plp.actions.js";
import { displayToast } from "../../general/toast.actions";
import { addProductToCart } from "../../pdp/actions/pdp.actions";

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    showSort: () => {
      dispatch(showModal(SORT));
    },
    displayToast: text => {
      dispatch(displayToast(text));
    },
    paginate: (pageNumber, suffix) => {
      ownProps.paginate(pageNumber, suffix);
    },
    setHeaderText: text => {
      dispatch(setHeaderText(text));
    },
    showFilter: () => {
      dispatch(showFilter());
    },
    hideFilter: () => {
      dispatch(hideFilter());
    },
    setIfFilterHasBeenClicked: () => {
      dispatch(setIfFilterHasBeenClicked());
    },
    setProductModuleRef: ref => {
      dispatch(setProductModuleRef(ref));
    },
    userSelectedOutOfStock: flag => {
      dispatch(userSelectedOutOfStock(flag));
    },
    getChatbotDetails: async () => {
      await dispatch(getChatbotDetails());
    },
    getProductPinCode: (
      pinCode,
      productCode,
      winningUssID,
      isComingFromPiqPage,
      isExchangeAvailable,
      isComingFromClickEvent,
      isComingFromHaptikChatbot
    ) => {
      dispatch(
        checkPincodeFromPLP(
          pinCode,
          productCode,
          winningUssID,
          isComingFromHaptikChatbot
        )
      );
    },
    addProductToCart: productDetails => {
      dispatch(addProductToCart(productDetails));
    }
  };
};

const mapStateToProps = (state, ownProps) => {
  let isFilterOpen = state.productListings.isFilterOpen;
  if (ownProps.isFilter === true) {
    isFilterOpen = true;
  }
  return {
    onFilterClick: ownProps.onFilterClick,
    isFilterOpen,
    filterHasBeenClicked: state.productListings.filterHasBeenClicked,
    sortHasBeenClicked: state.productListings.sortHasBeenClicked,
    productListings: state.productListings.productListings,
    pageNumber: state.productListings.pageNumber,
    loading: state.productListings.loading,
    searchresult: state.productListings.searchresult,
    lastVisitedPlpUrl: state.productListings.lastVisitedPlpUrl,
    status: state.productListings.status,
    headerText: state.header.text,
    searchMsdData: state.productListings.searchMsdData,
    banners: state.productListings.banners,
    chatbotDetailsData: state.productListings.getChatbotDetailsData,
    isServiceableToPincode: state.productListings.isServiceableToPincode,
    addToCartResponseDetails: state.productDescription.addToCartResponseDetails,
    addToCartResponseLoading: state.productDescription.addToCartResponseLoading,
    cartCountDetails: state.cart.cartCountDetails,
    checkPincodeDetailsLoading:
      state.productListings.checkPincodeDetailsLoading,
    checkPincodeFromHaptikChatbot:
      state.productListings.checkPincodeFromHaptikChatbot,
    cartCountDetailsLoading: state.cart.cartCountDetailsLoading,
    secondaryFeedData: state.feed.secondaryFeed
  };
};

const PlpContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Plp)
);
export default PlpContainer;
