import React from "react";
import styles from "./ShowBrandModal.css";
import SearchInput from "../../general/components/SearchInput";
import CheckBox from "../../general/components/CheckBox.js";
export default class ShowBrandModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      brandSearchString: ""
    };
  }
  closeModal() {
    if (this.props.closeModal) {
      this.props.closeModal();
    }
  }
  onBrandSearch = val => {
    this.setState({ brandSearchString: val });
  };
  onFilterClick = (val, evt) => {
    evt.preventDefault();
    const url = val.replace("{pageNo}", 1);
    this.props.history.push(url);
  };
  render() {
    let brandsList = this.props.brandData;
    if (this.state.brandSearchString !== "") {
      brandsList = brandsList.filter(brand => {
        return brand.name
          .toLowerCase()
          .includes(this.state.brandSearchString.toLowerCase());
      });
    }
    return (
      <div className={styles.base}>
        <div className={styles.headerElement}>
          <div className={styles.searchHolder}>
            <div className={styles.searchHeader}>Filter by Brands</div>
            <div className={styles.inputHolder}>
              <SearchInput
                placeholder="Search for Brands"
                onChange={val => this.onBrandSearch(val)}
              />
            </div>
          </div>
          <div
            className={styles.crossElement}
            onClick={() => this.closeModal()}
          />
        </div>
        <div className={styles.displayDataElement}>
          {brandsList &&
            brandsList.map((val, i) => {
              return (
                <div className={styles.brandNameHolder}>
                  <div
                    className={styles.checkBoxHolder}
                    onClick={evt => this.onFilterClick(val.url, evt)}
                  >
                    <CheckBox selected={val.selected} />
                  </div>
                  {val.name}
                </div>
              );
            })}
        </div>
        <div className={styles.footerElement} />
      </div>
    );
  }
}
