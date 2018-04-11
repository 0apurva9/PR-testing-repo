import React from "react";
import styles from "./SearchHeader.css";
import cancelIcon from "../../general/components/img/cancel.svg";
import searchIcon from "./img/search.svg";
import iconImageURL from "../../general/components/img/arrowBack.svg";
import searchRedIcon from "./img/searchRed.svg";
import PropTypes from "prop-types";
import { Icon } from "xelpmoc-core";
import Input2 from "../../general/components/Input2.js";
export default class SearchHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchBar: false,
      searchString: null
    };
  }
  onClickBack() {
    if (this.props.onClickBack) {
      this.props.onClickBack();
    }
  }
  onSearch(val) {
    if (this.props.onSearch) {
      this.props.onSearch(val);
      this.setState({ searchString: val });
    }
  }
  searchString = () => {
    if (this.props.onSearchString) {
      this.props.onSearchString(this.state.searchString);
    }
  };
  handleKeyUp = val => {
    if (val === "Enter") {
      this.searchString();
    }
  };
  onClickIcon() {
    if (this.state.searchBar) {
      this.setState({ searchBar: false }, () => {
        if (this.props.onSearchClick) {
          this.props.onSearchClick(false);
        }
      });
    } else {
      this.setState({ searchBar: true }, () => {
        if (this.props.onSearchClick) {
          this.props.onSearchClick(true);
        }
      });
    }
  }
  render() {
    let search = searchIcon;
    if (this.state.searchBar) {
      search = cancelIcon;
    }
    return (
      <div className={styles.base}>
        <div className={styles.InformationHeader}>
          {this.props.canGoBack && (
            <div
              className={styles.backHolder}
              onClick={() => this.onClickBack()}
            >
              <Icon image={iconImageURL} size={16} />
            </div>
          )}

          <div
            className={styles.searchHolder}
            onClick={() => this.onClickIcon()}
          >
            <Icon image={search} size={16} />
          </div>
          {!this.state.searchBar && (
            <div className={styles.searchWithText}>
              <div className={styles.textBox}>{this.props.text}</div>
            </div>
          )}
          {this.state.searchBar && (
            <div className={styles.searchWithInputRedHolder}>
              <div
                className={styles.searchRedHolder}
                onClick={() => {
                  this.searchString();
                }}
              >
                <Icon image={searchRedIcon} size={16} />
              </div>
              <div className={styles.input}>
                <Input2
                  onChange={val => this.onSearch(val)}
                  textStyle={{ fontSize: 14 }}
                  height={30}
                  isWhite={true}
                  borderColor={"#212121"}
                  borderBottom={"0px solid #212121"}
                  onKeyUp={event => this.handleKeyUp(event.key)}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}
SearchHeader.propTypes = {
  text: PropTypes.string,
  onClickBack: PropTypes.func,
  onSearch: PropTypes.func,
  canGoBack: PropTypes.bool
};
SearchHeader.defaultProps = {
  text: "Mobile",
  canGoBack: true
};
