import React from "react";
import styles from "./ShowBrandModal.css";
import SearchInput from "../../general/components/SearchInput";
import Button from "../../general/components/Button";
import CheckBox from "../../general/components/CheckBox.js";
import { groupByBrandAccordingToFirstLetter } from "../../pdp/reducers/utils";
const REGULAR_EXPRESSION_FOR_NON_ALPHABET = /^[0-9]+(.)*$/;
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
  ViewAll() {
    this.setState({ selectedBrandType: null });
  }
  onFilterClick = (val, filterType, filterValue) => {
    if (this.props.onSelect) {
      this.props.onSelect(val, filterType, filterValue);
    }
  };
  render() {
    let parentBrandsLabel = "";
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
        if (REGULAR_EXPRESSION_FOR_NON_ALPHABET.test(brand.name)) {
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
    selectedFixBrand = groupByBrandAccordingToFirstLetter(
      selectedFixBrand,
      "name"
    );
    brandsList = groupByBrandAccordingToFirstLetter(brandsList, "name");

    const selectedFixBrandLabel = Object.keys(selectedFixBrand);

    parentBrandsLabel = Object.keys(brandsList);
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
                      className={styles.text}
                      onClick={() => this.selectedBrandType(brandInitials)}
                    >
                      {brandInitials}
                    </div>
                  );
                })}
              <div className={styles.viewAll} onClick={() => this.ViewAll()}>
                All Brands
              </div>
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
                            onClick={data =>
                              this.onFilterClick(
                                brandsList.url,
                                this.props.typeOfFilter,
                                brandsList.name
                              )
                            }
                          >
                            <CheckBox
                              checked={brandsList.selected}
                              size={"15px"}
                              isCircle={false}
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
