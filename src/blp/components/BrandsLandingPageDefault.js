import React from "react";
import PropTypes from "prop-types";
import BrandsCategory from "./BrandsCategory";
import BrandsSubCategory from "./BrandsSubCategory";
import BrandBanner from "./BrandBanner";
import * as Cookie from "../../lib/Cookie";
import BrandImage from "../../general/components/BrandImage";
import BannerMobile from "../../general/components/BannerMobile";
import Carousel from "../../general/components/Carousel";
import BrandsSelect from "./BrandsSelect";
import Input2 from "../../general/components/Input2";
import Icon from "../../xelpmoc-core/Icon";
import BrandsItem from "./BrandsItem";
import styles from "./BrandsLandingPageDefault.css";
import arrowIcon from "../../general/components/img/down-arrow.svg";
import searchIcon from "../../general/components/img/Search.svg";
import { TATA_CLIQ_ROOT } from "../../lib/apiRequest.js";
import Loader from "../../general/components/Loader";
import {
  BRANDS,
  LOGGED_IN_USER_DETAILS,
  CUSTOMER_ACCESS_TOKEN
} from "../../lib/constants";
import MobileOnly from "../../general/components/MobileOnly";
import DesktopOnly from "../../general/components/DesktopOnly";
import BannerImage from "../../general/components/BannerImage";
import Banner from "../../general/components/Banner";
import { groupByBrandAccordingToFirstLetter } from "../../pdp/reducers/utils";
import { RouterPropTypes } from "../../general/router-prop-types";

const REGULAR_EXPRESSION_FOR_NON_ALPHABET = /^[0-9]+(.)*$/;

export default class BrandsLandingPageDefault extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showFollowing: true,
      currentActiveBrandType: 0,
      searchBy: null,
      selectedBrandType: null
    };
  }

  handleClick = webURL => {
    if (webURL) {
      const urlSuffix = webURL.replace(TATA_CLIQ_ROOT, "$1");
      this.props.history.push(urlSuffix);
    }
  };

  componentDidMount() {
    this.props.getFollowedBrands();
    this.props.getAllBrands();
  }

  componentWillUpdate() {
    this.props.setHeaderText(BRANDS);
  }

  renderToAnotherURL(webURL) {
    if (webURL) {
      const urlSuffix = webURL.replace(TATA_CLIQ_ROOT, "$1");
      this.props.history.push(urlSuffix);
    }
  }

  switchTab(val) {
    if (val !== undefined && this.state.currentActiveBrandType !== val) {
      this.setState({ currentActiveBrandType: val });
    }
  }

  handleShowFollow() {
    const showFollowing = !this.state.showFollowing;
    this.setState({ showFollowing });
  }

  renderLoader() {
    return <Loader />;
  }

  findSelectedText(selectedBrandType) {
    if (this.state.selectedBrandType !== selectedBrandType) {
      this.setState({ selectedBrandType: selectedBrandType });
    } else {
      this.setState({ selectedBrandType: null });
    }
  }

  render() {
    const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    const customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
    if (this.props.loading || !this.props.brandsStores) {
      return this.renderLoader();
    }

    const brandsStores = this.props.brandsStores[
      this.props.brandsStores.componentName
    ].items;
    if (!brandsStores) {
      return null;
    }

    var showFollowBrands =
      this.props.followedBrands &&
      this.props.followedBrands.filter(function(item) {
        return item["isFollowing"] === "true";
      });

    const brandList = brandsStores.map(brandName => {
      return brandName.subType;
    });
    let currentActiveHeroBanner = [];

    if (
      brandsStores[this.state.currentActiveBrandType] &&
      brandsStores[this.state.currentActiveBrandType].items &&
      brandsStores[this.state.currentActiveBrandType].items[0]
        .heroBannerComponent
    ) {
      currentActiveHeroBanner =
        brandsStores[this.state.currentActiveBrandType].items[0]
          .heroBannerComponent.items;
    }
    let currentActiveBrandList =
      brandsStores[this.state.currentActiveBrandType].brands;
    let selectedBrand = brandsStores[this.state.currentActiveBrandType].brands;
    if (this.state.searchBy) {
      currentActiveBrandList = currentActiveBrandList.filter(brand => {
        return brand.brandName
          .toLowerCase()
          .includes(this.state.searchBy.toLowerCase());
      });
    }
    if (this.state.selectedBrandType && this.state.selectedBrandType !== "#") {
      currentActiveBrandList = currentActiveBrandList.filter(brand => {
        return brand.brandName
          .toLowerCase()
          .startsWith(this.state.selectedBrandType.toLowerCase());
      });
    }
    if (this.state.selectedBrandType === "#") {
      currentActiveBrandList = currentActiveBrandList.filter(brand => {
        return REGULAR_EXPRESSION_FOR_NON_ALPHABET.test(brand.brandName);
      });
    }
    currentActiveBrandList = groupByBrandAccordingToFirstLetter(
      currentActiveBrandList,
      "brandName"
    );
    selectedBrand = groupByBrandAccordingToFirstLetter(
      selectedBrand,
      "brandName"
    );
    const parentBrandsLabel = Object.keys(currentActiveBrandList);
    const presentLabel = Object.keys(selectedBrand);
    return (
      <div className={styles.base}>
        <MobileOnly>
          <div className={styles.header}>
            <BrandsSelect
              limit={1}
              onSelect={val => this.switchTab(val[0])}
              selected={[this.state.currentActiveBrandType]}
            >
              {brandList.map((val, id) => {
                return <BrandsItem label={val} value={id} key={id} />;
              })}
            </BrandsSelect>
          </div>
        </MobileOnly>
        <div className={styles.bannerHolderDetails}>
          <div className={styles.bannerHolder}>
            {currentActiveHeroBanner &&
              currentActiveHeroBanner.length > 1 && (
                <React.Fragment>
                  <MobileOnly>
                    <BannerMobile bannerHeight="45vw">
                      {currentActiveHeroBanner &&
                        currentActiveHeroBanner.map((heroBanner, i) => {
                          return (
                            <BrandBanner
                              image={heroBanner.imageURL}
                              logo={heroBanner.brandLogo}
                              title={heroBanner.title}
                              key={i}
                              onClick={() =>
                                this.renderToAnotherURL(heroBanner.webURL)
                              }
                            />
                          );
                        })}
                    </BannerMobile>
                  </MobileOnly>
                  <DesktopOnly>
                    <Banner>
                      {currentActiveHeroBanner &&
                        currentActiveHeroBanner.map((datum, i) => {
                          return (
                            <BannerImage
                              logo={datum.brandLogo}
                              title={datum.title}
                              subTitle={datum.subTitle}
                              image={datum.imageURL}
                              key={i}
                              url={datum.webURL}
                              showButton={false}
                              {...this.props}
                            />
                          );
                        })}
                    </Banner>
                  </DesktopOnly>
                </React.Fragment>
              )}
            <MobileOnly>
              {currentActiveHeroBanner &&
                currentActiveHeroBanner.length < 2 &&
                currentActiveHeroBanner.map((heroBanner, i) => {
                  return (
                    <div className={styles.monoBannerHolder} key={i}>
                      <BrandBanner
                        image={heroBanner.imageURL}
                        logo={heroBanner.brandLogo}
                        title={heroBanner.title}
                        onClick={() =>
                          this.renderToAnotherURL(heroBanner.webURL)
                        }
                      />
                    </div>
                  );
                })}
            </MobileOnly>
          </div>
        </div>
        {userDetails &&
          customerCookie &&
          showFollowBrands &&
          showFollowBrands.length > 0 && (
            <div className={styles.following}>
              <div className={styles.followingHolder}>
                <React.Fragment>
                  <MobileOnly>
                    <div
                      className={
                        this.state.showFollowing
                          ? styles.followVisible
                          : styles.followingHeader
                      }
                      onClick={() => this.handleShowFollow()}
                    >
                      Brands You Follow
                      <div className={styles.arrow}>
                        <Icon image={arrowIcon} size={18} />
                      </div>
                    </div>
                    {this.state.showFollowing && (
                      <Carousel elementWidthMobile={30}>
                        {this.props.followedBrands &&
                          this.props.followedBrands.length > 0 &&
                          this.props.followedBrands
                            .filter(brand => {
                              return brand.isFollowing === "true";
                            })
                            .map((brand, i) => {
                              return (
                                <BrandImage
                                  isFollowing={brand.isFollowing}
                                  image={brand.imageURL}
                                  key={i}
                                  onClick={() => this.handleClick(brand.webURL)}
                                />
                              );
                            })}
                      </Carousel>
                    )}
                  </MobileOnly>
                  <DesktopOnly>
                    <div className={styles.followingBrandsWithHeader}>
                      <div className={styles.followingBrandsWithHeader}>
                        <div className={styles.headerWithFollowing}>
                          <div
                            className={
                              this.state.showFollowing
                                ? styles.headerText
                                : styles.followingHeader
                            }
                            onClick={() => this.handleShowFollow()}
                          >
                            Following brands
                            <div
                              className={
                                this.state.showFollowing
                                  ? styles.arrow
                                  : styles.downArrow
                              }
                            />
                          </div>
                          <div className={styles.countFollowBrands}>{`${
                            showFollowBrands.length
                          } Brands`}</div>
                        </div>
                        {this.state.showFollowing && (
                          <div className={styles.brandsList}>
                            <Carousel elementWidthDesktop={16.66}>
                              {showFollowBrands.map((brand, index) => {
                                return (
                                  <div className={styles.brandDetails} key={index}>
                                    <BrandImage
                                      key={index}
                                      isFollowing={brand.isFollowing}
                                      image={brand.imageURL}
                                      onClick={() =>
                                        this.handleClick(brand.webURL)
                                      }
                                    />
                                  </div>
                                );
                              })}
                            </Carousel>
                          </div>
                        )}
                      </div>
                    </div>
                  </DesktopOnly>
                </React.Fragment>
              </div>
            </div>
          )}
        <div className={styles.searchInputWithText}>
          <div className={styles.searchInputWithTextHolder}>
            <DesktopOnly>
              {presentLabel &&
                presentLabel.length !== 0 &&
                presentLabel.map((brandInitials, i) => {
                  return (
                    <div
                      key={i}
                      className={
                        brandInitials === this.state.selectedBrandType
                          ? styles.activeTextWithCircle
                          : styles.textWithCircle
                      }
                      onClick={() => this.findSelectedText(brandInitials)}
                    >
                      {brandInitials}
                    </div>
                  );
                })}
            </DesktopOnly>
            <div className={styles.searchInput}>
              <Input2
                placeholder="Find your favourite brands"
                onChange={val => this.setState({ searchBy: val })}
                rightChild={
                  <div className={styles.searchIcon}>
                    <Icon image={searchIcon} size={15} />
                  </div>
                }
                rightChildSize={40}
              />
            </div>
          </div>
        </div>
        <DesktopOnly>
          <div className={styles.header}>
            <BrandsSelect
              limit={1}
              onSelect={val => this.switchTab(val[0])}
              selected={[this.state.currentActiveBrandType]}
            >
              {brandList.map((val, id) => {
                return <BrandsItem label={val} value={id} key={id} />;
              })}
            </BrandsSelect>
          </div>
        </DesktopOnly>
        <MobileOnly>
          <div className={styles.following} />
        </MobileOnly>
        <div className={styles.category}>
          {parentBrandsLabel && parentBrandsLabel.length !== 0 ? (
            parentBrandsLabel.map((val, i) => {
              return (
                <BrandsCategory index={val} catagory={val} key={i}>
                  {currentActiveBrandList[val] &&
                    currentActiveBrandList[val].map((data, i) => {
                      return (
                        <BrandsSubCategory
                          label={data.brandName}
                          select={data.select}
                          key={i}
                          onClick={() => this.renderToAnotherURL(data.webURL)}
                        />
                      );
                    })}
                </BrandsCategory>
              );
            })
          ) : (
            <div className={styles.noResultHolder}>No Result Found </div>
          )}
        </div>
      </div>
    );
  }
}
BrandsLandingPageDefault.propTypes = {
  loading: PropTypes.bool,
  brandsStores: PropTypes.object,
  getFollowedBrands: PropTypes.func,
  getAllBrands: PropTypes.func,
  setHeaderText: PropTypes.func,
  followedBrands: PropTypes,
  ...RouterPropTypes
};
