import React from "react";
import styles from "./PopularBrandsDesktop.css";
import BrandImage from "../../general/components/BrandImage";
import BrandsItem from "../../blp/components/BrandsItem.js";
import { TATA_CLIQ_ROOT } from "../../lib/apiRequest.js";
import DesktopOnly from "../../general/components/DesktopOnly";
import PropTypes from "prop-types";
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
  onClick = webURL => {
    if (webURL) {
      const urlSuffix = webURL.replace(TATA_CLIQ_ROOT, "$1");
      this.props.history.push(urlSuffix);
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
    return (
      <DesktopOnly>
        <div className={styles.base}>
          <div className={styles.header}>
            <div className={styles.showHeaderText}>
              {feedComponentData && feedComponentData.title}
            </div>
            {currentActivePopularBrands &&
              currentActivePopularBrands.brands &&
              currentActivePopularBrands.brands.length > 6 && (
                <div className={styles.nav}>
                  <div
                    className={styles.back}
                    onClick={() => {
                      this.slideBack();
                    }}
                  />
                  <div
                    className={styles.forward}
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
                            onClick={value => this.onClick(value)}
                          />
                        </div>
                      </div>
                    </React.Fragment>
                  );
                })}
            </div>
          </div>
        </div>
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
  )
};
