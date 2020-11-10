import React from "react";
import styles from "./ExchangeModal.css";
import closeIcon from "../../general/components/img/closeIcon.svg";
import Icon from "../../xelpmoc-core/Icon";
import searchIconRed from "../../pdp/components/img/searchIconRed.svg";
import closeSearch from "../../general/components/img/cancelGrey.svg";
import backArrowIcon from "../../pdp/components/img/arrowBack.svg";
import PropTypes from "prop-types";
import AppliancesExchangeDetails from "./AppliancesExchangeDetails";
import ExchangeTnCModal from "./ExchangeTnCModal";
import HowAppliancesExchangeWorks from "./HowAppliancesExchangeWorks";
const OTHERS = "others";
const SELECT_BRAND = "Select Brand";
const SELECT_CAPACITY = "Select Capacity";
const SELECT_WORKING_CONDITION = "Select Working Condition";
const EXCHANGE_DETAILS = "Exchange Details";
export default class AppliancesExchangeSelection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      brandList: null,
      otherBrand: null,
      selectedBrandData: null,
      selectedCapacityData: null,
      selectedConditionData: null,
      showSearchBox: false,
      exchangeData: null,
      showTnCModal: false,
      showHowAppliancesExchangeWorks: false
    };
  }

  componentDidMount() {
    if (
      this.props.appliancesExchangeDetails &&
      this.props.appliancesExchangeDetails.brands
    ) {
      this.setState({ brandList: this.props.appliancesExchangeDetails.brands });
    }
    let otherBrand =
      this.props.appliancesExchangeDetails &&
      this.props.appliancesExchangeDetails.brands.filter(brand => {
        return brand.brandName.toLowerCase() === OTHERS;
      });
    this.setState({ otherBrand });
  }

  closeAppliancesExchangeModal() {
    this.props.closeAppliancesExchangeModal();
  }

  searchBrand(e) {
    let searchText = e.target.value;
    if (searchText) {
      let searchedBrand =
        this.props.appliancesExchangeDetails &&
        this.props.appliancesExchangeDetails.brands.filter(brand => {
          return brand.brandName
            .toLowerCase()
            .includes(searchText.toLowerCase());
        });
      if (searchedBrand && searchedBrand.length > 0) {
        this.setState({ brandList: searchedBrand });
      } else {
        this.setState({ brandList: this.state.otherBrand });
      }
    } else {
      this.setState({ brandList: this.props.appliancesExchangeDetails.brands });
    }
  }

  selectBrand(brandDetails) {
    this.setState({ showSearchBox: false });
    this.setState({ selectedBrandData: brandDetails });
  }

  selectCapacity(capacityDetails, modelType) {
    let info = capacityDetails;
    info.modelType = modelType;
    this.setState({ selectedCapacityData: info });
  }

  selectCondition(conditionDetails) {
    this.setState({ selectedConditionData: conditionDetails });
    let data = {};
    data.brandName = this.state.selectedBrandData.brandName;
    data.modelCapacity = this.state.selectedCapacityData.capacity;
    data.state = conditionDetails.value;
    data.exchangeAmount = conditionDetails.exchangeAmount;
    data.totalExchangeAmount = conditionDetails.totalExchangeAmount;
    data.ussid = this.props.ussid;
    data.modelType = this.state.selectedCapacityData.modelType;
    this.setState({ exchangeData: data });
  }

  openSearchInputBox() {
    this.setState({ showSearchBox: true });
  }

  closeSearchInputBox() {
    this.setState({ showSearchBox: false });
    this.setState({ brandList: this.props.appliancesExchangeDetails.brands });
  }

  resetState(section) {
    if (section === "two") {
      this.setState({ selectedBrandData: null });
    }
    if (section === "three") {
      this.setState({ selectedCapacityData: null });
    }
    if (section === "all") {
      this.setState({
        selectedBrandData: null,
        selectedCapacityData: null,
        selectedConditionData: null
      });
    }
  }

  showHowAppliancesExchangeWorks(data) {
    this.setState({ showHowAppliancesExchangeWorks: true });
  }

  hideHowAppliancesExchangeWorks(data) {
    this.setState({ showHowAppliancesExchangeWorks: false });
  }

  openTnCModal() {
    this.setState({ showTnCModal: true });
  }

  closeTnCModal() {
    this.setState({ showTnCModal: false });
  }

  render() {
    let classForProgress = styles.progressBarOne;
    if (this.state.selectedBrandData) {
      classForProgress = styles.progressBarTwo;
    }
    if (this.state.selectedCapacityData) {
      classForProgress = styles.progressBarThree;
    }

    return (
      <div className={styles.base}>
        <img
          src={closeIcon}
          alt="closeIcon"
          className={styles.closeIcon}
          onClick={() => this.closeAppliancesExchangeModal()}
        />
        {!this.state.selectedConditionData && (
          <div className={classForProgress} />
        )}
        {/* Modal for terms and condiions */}
        {this.state.showTnCModal ? (
          <ExchangeTnCModal
            history={this.props.history}
            closeTnCModal={() => this.closeTnCModal()}
          />
        ) : null}

        {this.state.showHowAppliancesExchangeWorks ? (
          <HowAppliancesExchangeWorks
            hideHowAppliancesExchangeWorks={() =>
              this.hideHowAppliancesExchangeWorks()
            }
            closeAppliancesExchangeModal={() =>
              this.closeAppliancesExchangeModal()
            }
            showBackButton={true}
          />
        ) : null}

        <div className={styles.appliancesExchangeTopContainer}>
          {!this.state.showSearchBox && (
            <div className={styles.aeHowExchangeWorksHeading}>
              {this.state.selectedBrandData &&
                !this.state.selectedConditionData && (
                  <div
                    className={styles.backButtonContainer}
                    onClick={() =>
                      this.resetState(
                        !this.state.selectedBrandData
                          ? "one"
                          : !this.state.selectedCapacityData
                            ? "two"
                            : "three"
                      )
                    }
                  >
                    <Icon image={backArrowIcon} size={12} />
                  </div>
                )}
              <div className={styles.sectionName}>
                {!this.state.selectedBrandData
                  ? SELECT_BRAND
                  : !this.state.selectedCapacityData
                    ? SELECT_CAPACITY
                    : !this.state.selectedConditionData
                      ? SELECT_WORKING_CONDITION
                      : EXCHANGE_DETAILS}
              </div>
              {!this.state.selectedBrandData && (
                <div
                  className={styles.searchButton}
                  onClick={() => this.openSearchInputBox()}
                >
                  <div className={styles.searchIconHolder}>
                    <Icon image={searchIconRed} size={18} />
                  </div>
                  <div className={styles.searchTitle}>Search</div>
                </div>
              )}
            </div>
          )}
          {this.state.showSearchBox && (
            <div className={styles.brandSearchContainer}>
              <div className={styles.iconHolder}>
                <Icon image={searchIconRed} size={17} />
              </div>
              <input
                type="text"
                onChange={e => this.searchBrand(e)}
                className={styles.searchInput}
                placeholder="Enter your brand"
              />
              <div
                className={styles.closeSearchIconHolder}
                onClick={() => this.closeSearchInputBox()}
              >
                <Icon image={closeSearch} size={13} />
              </div>
            </div>
          )}
        </div>
        <div className={styles.appliancesExchangeBottomContainer}>
          {!this.state.selectedBrandData ? (
            <React.Fragment>
              {this.state.brandList &&
                this.state.brandList.map(brand => {
                  return (
                    <div
                      className={styles.brandNameContainer}
                      onClick={() => this.selectBrand(brand)}
                    >
                      <img className={styles.brandImage} src={brand.imageUrl} />
                      <span className={styles.brandName}>
                        {brand.brandName}
                      </span>
                    </div>
                  );
                })}
            </React.Fragment>
          ) : !this.state.selectedCapacityData ? (
            <React.Fragment>
              {this.state.selectedBrandData &&
                this.state.selectedBrandData.modelCapacityList &&
                this.state.selectedBrandData.modelCapacityList.map(capacity => {
                  return (
                    <React.Fragment>
                      <div className={styles.capacityHeading}>
                        {capacity.iconUrl && (
                          <div className={styles.capacityIconContainer}>
                            <Icon image={capacity.iconUrl} size={24} />
                          </div>
                        )}
                        <div className={styles.capacityModelType}>
                          {capacity.modelType}
                        </div>
                      </div>
                      {capacity.capacityList.map(value => {
                        return (
                          <div
                            className={styles.capacityNameContainer}
                            onClick={() =>
                              this.selectCapacity(value, capacity.modelType)
                            }
                          >
                            <span className={styles.capacityName}>
                              {value.capacity}
                            </span>
                          </div>
                        );
                      })}
                    </React.Fragment>
                  );
                })}
            </React.Fragment>
          ) : !this.state.selectedConditionData ? (
            <React.Fragment>
              {this.state.selectedCapacityData &&
                this.state.selectedCapacityData.state &&
                this.state.selectedCapacityData.state.map(condition => {
                  return (
                    <div
                      className={styles.conditionNameContainer}
                      onClick={() => this.selectCondition(condition)}
                    >
                      <div className={styles.conditionIconContainer}>
                        <Icon image={condition.nonSelectedImageUrl} size={45} />
                      </div>
                      <span className={styles.conditionName}>
                        {condition.value}
                      </span>
                    </div>
                  );
                })}
            </React.Fragment>
          ) : (
            <AppliancesExchangeDetails
              resetState={section => this.resetState(section)}
              exchangeData={this.state.exchangeData}
              bonusExchangeAmount={
                this.props.appliancesExchangeDetails.bonusExchangeAmount
              }
              showHowAppliancesExchangeWorks={() =>
                this.showHowAppliancesExchangeWorks()
              }
              closeAppliancesExchangeModal={() =>
                this.closeAppliancesExchangeModal()
              }
              openTnCModal={() => this.openTnCModal()}
              updateAppliancesExchangeDetails={exchangeData =>
                this.props.updateAppliancesExchangeDetails(exchangeData)
              }
            />
          )}
        </div>
      </div>
    );
  }
}

AppliancesExchangeSelection.propTypes = {
  appliancesExchangeDetails: PropTypes.object,
  closeAppliancesExchangeModal: PropTypes.func,
  ussid: PropTypes.string
};
