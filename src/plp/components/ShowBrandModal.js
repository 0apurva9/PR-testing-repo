import React from "react";
import styles from "./ShowBrandModal.css";
import SearchInput from "../../general/components/SearchInput";
import groupBy from "lodash.groupby";
import Button from "../../general/components/Button";
import CheckBox from "../../general/components/CheckBox.js";
const RegularExpression = /^[0-9]+(.)*$/;
export default class ShowBrandModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      brandSearchString: "",
      selectedBrandType: null
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
  selectedBrandType = val => {
    if (this.state.selectedBrandType !== val) {
      this.setState({ selectedBrandType: val });
    } else {
      this.setState({ selectedBrandType: null });
    }
  };
  onFilterClick = val => {
    if (this.props.onSelect) {
      this.props.onSelect(val);
    }
  };
  render() {
    let brandsList = this.props.brandData;
    let selectedFixBrand = this.props.brandData;
    if (this.state.brandSearchString !== "") {
      brandsList = brandsList.filter(brand => {
        return brand.name
          .toLowerCase()
          .includes(this.state.brandSearchString.toLowerCase());
      });
    }
    if (this.state.selectedBrandType === "#") {
      brandsList = brandsList.filter(brand => {
        if (RegularExpression.test(brand.name)) {
          return brand.name;
        }
      });
    }
    if (this.state.selectedBrandType && this.state.selectedBrandType !== "#") {
      brandsList = brandsList.filter(brand => {
        return brand.name
          .toLowerCase()
          .startsWith(this.state.selectedBrandType.toLowerCase());
      });
    }
    selectedFixBrand = groupBy(selectedFixBrand, list => {
      if (isNaN(list.name[0])) {
        return list.name[0].toUpperCase();
      } else {
        return "#";
      }
    });
    brandsList = groupBy(brandsList, list => {
      if (isNaN(list.name[0])) {
        return list.name[0].toUpperCase();
      } else {
        return "#";
      }
    });
    const selectedFixBrandLabel = Object.keys(selectedFixBrand);
    const parentBrandsLabel = Object.keys(brandsList);
    return (
      <div className={styles.base}>
        <div className={styles.dataDisplayHolder}>
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
            <div className={styles.bandFirstIndex}>
              {selectedFixBrandLabel &&
                selectedFixBrandLabel.length !== 0 &&
                selectedFixBrandLabel.map((brandInitials, i) => {
                  return (
                    <div
                      className={
                        brandInitials === this.state.selectedBrandType
                          ? styles.activeText
                          : styles.text
                      }
                      onClick={() => this.selectedBrandType(brandInitials)}
                    >
                      {brandInitials}
                    </div>
                  );
                })}
            </div>

            <div
              className={styles.crossElement}
              onClick={() => this.closeModal()}
            />
          </div>
          <div className={styles.displayDataElement}>
            {parentBrandsLabel &&
              parentBrandsLabel.map((val, i) => {
                return (
                  <React.Fragment>
                    <div className={styles.textHeader}>{val}</div>
                    {brandsList[val].map((brandsList, j) => {
                      return (
                        <div className={styles.brandNameHolder}>
                          <div
                            className={styles.checkBoxHolder}
                            onClick={data => this.onFilterClick(brandsList.url)}
                          >
                            <CheckBox
                              selected={brandsList.selected}
                              size={"15px"}
                            />
                          </div>
                          {brandsList.name}
                        </div>
                      );
                    })}
                  </React.Fragment>
                );
              })}
          </div>
          <div className={styles.footerElement}>
            <div className={styles.applyAndClearButton}>
              <Button
                label="Apply"
                type="primary"
                width={142}
                height={40}
                onClick={() => this.closeModal()}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
