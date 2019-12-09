import { connect } from "react-redux";
import SearchPage from "./components/SearchPage";
import { withRouter } from "react-router-dom";
import {
  getSearchResults,
  clearSearchResults
} from "./actions/search.actions.js";

import { userSelectedOutOfStock } from "../plp/actions/plp.actions.js";

import throttle from "lodash.throttle";
const SEARCH_RESULTS_THROTTLE_TIME = 500;
const mapStateToProps = (state, ownProps) => {
  return {
    searchResult: state.search.searchResult.result,
    loading: state.search.searchResult.loading,
    header: ownProps.text,
    canGoBack: ownProps.canGoBack
  };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  const throttledSearchResultsFunction = throttle(string => {
    dispatch(userSelectedOutOfStock(false));
    dispatch(getSearchResults(string));
  }, SEARCH_RESULTS_THROTTLE_TIME);
  return {
    goBack: () => dispatch(ownProps.goBack()),
    getSearchResults: throttledSearchResultsFunction,
    clearSearchResults: () => {
      dispatch(clearSearchResults());
    }
  };
};

const SearchContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SearchPage)
);

export default SearchContainer;
