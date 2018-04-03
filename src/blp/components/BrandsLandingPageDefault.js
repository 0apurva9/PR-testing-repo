import React from "react";
import PropTypes from "prop-types";
import map from "lodash/map";
import groupBy from "lodash/groupBy";
import filter from "lodash/filter";
import MDSpinner from "react-md-spinner";
import BrandsCategory from "./BrandsCategory";
import BrandsSubCategory from "./BrandsSubCategory";
import BrandBanner from "./BrandBanner";
import BrandImage from "../../general/components/BrandImage";
import BannerMobile from "../../general/components/BannerMobile";
import Carousel from "../../general/components/Carousel";
import BrandsSelect from "./BrandsSelect";
import Input2 from "../../general/components/Input2";
import { Icon } from "xelpmoc-core";
import BrandsItem from "./BrandsItem";
import styles from "./BrandsLandingPageDefault.css";
import arrowIcon from "../../general/components/img/down-arrow.svg";
import searchIcon from "../../general/components/img/Search.svg";
import { TATA_CLIQ_ROOT } from "../../lib/apiRequest.js";
import { BRANDS } from "../../lib/headerName";
export default class BrandsLandingPageDefault extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showFollowing: false,
      currentActiveBrandType: 0,
      searchBy: null
    };
  }
  componentDidMount() {
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
    this.setState({ currentActiveBrandType: val });
  }
  handleShowFollow() {
    const showFollowing = !this.state.showFollowing;
    this.setState({ showFollowing });
  }
  renderLoader() {
    return (
      <div className={styles.loadingIndicator}>
        <MDSpinner />
      </div>
    );
  }

  render() {
    if (this.props.loading || !this.props.brandsStores) {
      return this.renderLoader();
    }
    const brandsStores = this.props.brandsStores[
      this.props.brandsStores.componentName
    ].items;
    const brandList = map(brandsStores, brandName => {
      return brandName.subType;
    });
    let currentActiveHeroBanner = [];
    if (
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
    if (this.state.searchBy) {
      currentActiveBrandList = filter(currentActiveBrandList, brand => {
        return brand.brandName
          .toLowerCase()
          .includes(this.state.searchBy.toLowerCase());
      });
    }

    currentActiveBrandList = groupBy(currentActiveBrandList, list => {
      return list.brandName[0];
    });
    const parentBrandsLabel = Object.keys(currentActiveBrandList);

    return (
      <div className={styles.base}>
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
        {/* we need to show this once api will be work and at that
        time also need some modification in integration */}
        {/* <div className={styles.following}>
          <div
            className={
              this.state.showFollowing
                ? styles.followVisible
                : styles.followingHeader
            }
            onClick={() => this.handleShowFollow()}
          >
            Following Brands
            <div className={styles.arrow}>
              <Icon image={arrowIcon} size={18} />
            </div>
          </div>
          {this.state.showFollowing && (
            <Carousel>
              <BrandImage image="https://i.pinimg.com/originals/96/29/ef/9629efc8a4be4fd1600a9bb3940fd89c.jpg" />
            </Carousel>
          )}
        </div> */}
        <div className={styles.bannerHolder}>
          <BannerMobile bannerHeight="45vw">
            {currentActiveHeroBanner &&
              currentActiveHeroBanner.map(heroBanner => {
                return (
                  <BrandBanner
                    image={heroBanner.imageURL}
                    logo={heroBanner.brandLogo}
                    title={heroBanner.title}
                    onClick={() => this.renderToAnotherURL(heroBanner.webURL)}
                  />
                );
              })}
          </BannerMobile>
        </div>
        <div className={styles.searchInput}>
          <Input2
            placeholder="Search your brand"
            onChange={val => this.setState({ searchBy: val })}
            rightChild={
              <div className={styles.searchIcon}>
                <Icon image={searchIcon} size={15} />
              </div>
            }
            rightChildSize={40}
          />
        </div>
        <div className={styles.following} />
        <div className={styles.category}>
          {parentBrandsLabel &&
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
            })}
        </div>
      </div>
    );
  }
}
BrandsLandingPageDefault.propTypes = {
  loading: PropTypes.bool,
  brandsStores: PropTypes.object
};
