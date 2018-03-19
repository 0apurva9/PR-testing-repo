import { connect } from "react-redux";
import SearchPage from "./components/SearchPage";
import { withRouter } from "react-router-dom";
import { getSearchResults } from "./actions/search.actions.js";
const mapStateToProps = (state, ownProps) => {
  return {
    searchResult: state.search.searchResult.result,
    loading: state.search.searchResult.loading,
    header: ownProps.text,
    canGoBack: ownProps.canGoBack
  };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    goBack: () => dispatch(ownProps.goBack()),
    getSearchResults: string => {
      dispatch(getSearchResults(string));
    }
  };
};

const SearchContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SearchPage)
);

export default SearchContainer;
