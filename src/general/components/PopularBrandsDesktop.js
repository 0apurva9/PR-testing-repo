import React from "react";
import styles from "./PopularBrandsDesktop.css";
import BrandImage from "../../general/components/BrandImage";
import CommonCenter from "../../general/components/CommonCenter";
import BrandsItem from "../../blp/components/BrandsItem.js";
import { TATA_CLIQ_ROOT } from "../../lib/apiRequest.js";
import DesktopOnly from "../../general/components/DesktopOnly";
import PropTypes from "prop-types";
import { widgetsTracking } from "../../lib/adobeUtils.js";
export default class PopularBrandsDesktop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      position: 0,
      isSelect: 0
    };
  }

  slideBack() {
    if (this.state.position > 0) {
      const position = this.state.position - 1;
      this.setState({ position });
    }
  }

  onClick = (webURL, i) => {
    widgetsTracking({
      widgetName: this.props.feedComponentData.title
        ? this.props.feedComponentData.title
        : "Popular brands",
      sourceOfWidget: this.props.postData && this.props.postData.widgetPlatform,
      type: "Brand",
      PositionOfProduct: i + 1
    });
    if (webURL) {
      const urlSuffix = webURL.replace(TATA_CLIQ_ROOT, "$1");
      this.props.history.push(urlSuffix, { componentName: "Popular brands" });
      if (this.props.setClickedElementId) {
        this.props.setClickedElementId();
      }
    }
  };

  switchTab(val) {
    this.setState({
      isSelect: val,
      position: 0
    });
  }

  slideForward() {
    const { feedComponentData } = this.props;
    if (
      feedComponentData.items &&
      feedComponentData.items[this.state.position].brands.length > 6
    ) {
      const position = this.state.position + 1;
      this.setState({ position });
    }
  }

  render() {
    let currentActivePopularBrands = [];
    const { feedComponentData } = this.props;
    if (
      feedComponentData.items &&
      feedComponentData.items[this.state.isSelect]
    ) {
      currentActivePopularBrands = feedComponentData.items[this.state.isSelect];
    }

    const translationAmount = -(16.66 * this.state.position);
    const transform = `translateX(${translationAmount}%)`;

    const style = {
      transform: transform
    };
    let buttonArrowForward = styles.forward;
    if (
      this.state.position === currentActivePopularBrands &&
      currentActivePopularBrands.brands &&
      currentActivePopularBrands.brands.length - 6
    ) {
      buttonArrowForward = styles.btnDissabledForward;
    }
    let buttonArrowBack = styles.back;
    if (this.state.position === 0) {
      buttonArrowBack = styles.btnDissabledBack;
    }
    return (
      <DesktopOnly>
        <CommonCenter>
          <div className={styles.base}>
            <div className={styles.header}>
              <div className={styles.showHeaderText}>
                {feedComponentData && <h1>{feedComponentData.title}</h1>}
              </div>
              {currentActivePopularBrands &&
                currentActivePopularBrands.brands &&
                currentActivePopularBrands.brands.length > 6 && (
                  <div className={styles.nav}>
                    <div
                      className={buttonArrowBack}
                      onClick={() => {
                        this.slideBack();
                      }}
                    />
                    <div
                      className={buttonArrowForward}
                      onClick={() => {
                        this.slideForward();
                      }}
                    />
                  </div>
                )}
            </div>

            <div className={styles.staticElement}>
              <div className={styles.headerTabHolder}>
                {feedComponentData &&
                  feedComponentData.items.map((val, i) => {
                    return (
                      <BrandsItem
                        label={val.title}
                        value={i}
                        key={i}
                        selectItem={() => this.switchTab(i)}
                        selected={this.state.isSelect === i}
                      />
                    );
                  })}
              </div>
            </div>

            <div className={styles.sliderHolder}>
              <div className={styles.slider} style={style}>
                {currentActivePopularBrands &&
                  currentActivePopularBrands.brands &&
                  currentActivePopularBrands.brands.map((val, i) => {
                    return (
                      <React.Fragment key={i}>
                        <div
                          className={styles.element}
                          style={{
                            width: "16.66%"
                          }}
                        >
                          <div className={styles.circleBrandesHolder}>
                            <BrandImage
                              image={val.imageURL}
                              value={val.webURL}
                              onClick={value => this.onClick(value, i)}
                            />
                          </div>
                        </div>
                      </React.Fragment>
                    );
                  })}
              </div>
            </div>
          </div>
        </CommonCenter>
      </DesktopOnly>
    );
  }
}
PopularBrandsDesktop.propTypes = {
  title: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      brands: PropTypes.arrayOf(
        PropTypes.shape({
          imageURL: PropTypes.string,
          webURL: PropTypes.string
        })
      )
    })
  ),
  feedComponentData: PropTypes.object,
  postData: PropTypes.object,
  history: PropTypes.object,
  setClickedElementId: PropTypes.func
};
