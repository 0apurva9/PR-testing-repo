import React from "react";
import styles from "../../blp/components/CuratedFeature.css";
import PropTypes from "prop-types";
import Image from "../../xelpmoc-core/Image";
import Grid from "../../general/components/Grid";
import { TATA_CLIQ_ROOT } from "../../lib/apiRequest.js";

export default class CuratedFeatureForPersonalisedComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      targetData: ""
    };
  }

  componentDidMount = async () => {
    let check =
      this.props.feedComponentData &&
      this.props.feedComponentData.type &&
      this.props.feedComponentData.type.includes("-P");
    if (this.props.feedComponentData && check) {
      let getPageTypeAndSequence =
        this.props.feedComponentData.items &&
        this.props.feedComponentData.items[0].description;
      let splitValue =
        getPageTypeAndSequence && getPageTypeAndSequence.split("-");
      let pageType = splitValue && splitValue[0];
      let sequence = splitValue && splitValue[1];
      let data = await this.props.getTargetMboxData(
        this.props.feedComponentData.type,
        pageType,
        sequence
      );
      if (
        data &&
        data.status === "success" &&
        data.dataMboxHome &&
        data.dataMboxHome.singleBannerComponent
      ) {
        this.setState({ targetData: data.dataMboxHome.singleBannerComponent });
      }
    }
  };

  handleClick(webURL) {
    let urlSuffix = webURL.replace(TATA_CLIQ_ROOT, "$1");
    this.props.history.push(urlSuffix);
    if (this.props.setClickedElementId) {
      this.props.setClickedElementId();
    }
  }

  render() {
    let feedComponentData = this.state.targetData
      ? this.state.targetData
      : this.props.feedComponentData;
    if (feedComponentData) {
      return (
        <div
          className={
            this.props.positionInFeed === 1 ? styles.firstItemBase : styles.base
          }
        >
          <div className={styles.headerText}>{feedComponentData.title}</div>
          <div className={styles.featuresCardHolder}>
            <Grid offset={10} elementWidthMobile={50}>
              {feedComponentData &&
                feedComponentData.items.map((val, i) => {
                  return (
                    <div
                      className={styles.curatedCard}
                      onClick={() => this.handleClick(val.webURL)}
                      key={i}
                    >
                      <div className={styles.imageHolder}>
                        <Image image={val.imageURL} fit="cover" />
                      </div>
                      <div className={styles.overlayTextHolder}>
                        {val.title && (
                          <div className={styles.featuresHeader}>
                            {val.title}
                          </div>
                        )}
                        {/* {val.description && (
                          <div className={styles.featuresText}>
                            {val.description}
                          </div>
                        )} */}
                      </div>
                    </div>
                  );
                })}
            </Grid>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}
CuratedFeatureForPersonalisedComponent.propTypes = {
  header: PropTypes.string,
  onClick: PropTypes.func,
  feedComponentData: PropTypes.object,
  getTargetMboxData: PropTypes.func,
  history: PropTypes.object,
  positionInFeed: PropTypes.number,
  setClickedElementId: PropTypes.func,
  CuratedFeatureForPersonalisedComponent: PropTypes.arrayOf(
    PropTypes.shape({
      header: PropTypes.string,
      text: PropTypes.string,
      imageUrl: PropTypes.string
    })
  )
};
