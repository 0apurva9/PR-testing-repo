import { connect } from "react-redux";
import {
  getFeed,
  setClickedElementId,
  setPageFeedSize
} from "../actions/home.actions";
import { getCartId } from "../../cart/actions/cart.actions";
import {
  getWishListItems,
  getWishlist
} from "../../wishlist/actions/wishlist.actions";
import { clearProductModuleRef } from "../../plp/actions/plp.actions";
import Feed from "../components/Feed";
import { setHeaderText } from "../../general/header.actions";
import { withRouter } from "react-router-dom";
import * as Cookie from "../../lib/Cookie";
import { LOGGED_IN_USER_DETAILS, HOME_FEED_TYPE } from "../../lib/constants";
const mapDispatchToProps = dispatch => {
  return {
    homeFeed: () => {
      dispatch(getFeed());
    },
    getCartId: () => {
      dispatch(getCartId());
    },
    getWishListItems: () => {
      dispatch(getWishListItems());
    },
    setHeaderText: text => {
      dispatch(setHeaderText(text));
    },
    setClickedElementId: id => {
      dispatch(setClickedElementId(id));
    },
    setPageFeedSize: size => {
      dispatch(setPageFeedSize(size));
    },
    clearProductModuleRef: () => {
      dispatch(clearProductModuleRef());
    },
    getWishlist: () => {
      dispatch(getWishlist());
    }
  };
};

const mapStateToProps = state => {
  let headerMessage = "Welcome to Tata CLiQ";
  let userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);

  if (userDetails) {
    userDetails = JSON.parse(userDetails);
    if (userDetails.firstName && userDetails.firstName !== "undefined") {
      headerMessage = `Welcome ${userDetails.firstName}`;
    } else {
      headerMessage = `Welcome`;
    }
  }
  return {
    homeFeedData: state.feed.homeFeed,
    loading: state.feed.loading,
    type: state.cart.type,
    headerMessage,
    loginFromMyBag: state.cart.loginFromMyBag,
    feedType: HOME_FEED_TYPE,
    clickedElementId: state.feed.clickedElementId,
    pageSize: state.feed.pageSize,
    wishlistProductId: state.wishlistItems.wishlistProductId,
    seo: state.feed.seo,
    wishlistCount: state.wishlistItems.wishlistcount,
    isHomePage: true
  };
};

const HomeContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Feed)
);

export default HomeContainer;
