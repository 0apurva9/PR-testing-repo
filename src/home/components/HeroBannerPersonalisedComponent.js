import React from "react";
import BannerImage from "../../general/components/BannerImage";
import Banner from "../../general/components/Banner";
import PropTypes from "prop-types";
import HomeSkeleton from "../../general/components/HomeSkeleton.js";
import styles from "./HeroBanner.css";
export default class HeroBannerPersonalisedComponent extends React.Component {
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

  renderBanner = () => {
    const { ...rest } = this.props;
    let data = this.state.targetData
      ? this.state.targetData
      : this.props.feedComponentData;
    if (!this.props.loading && data) {
      if (data && data.items && data.items.length > 1) {
        return (
          <Banner {...data}>
            {data.items &&
              data.items.map &&
              data.items.map((datum, i) => {
                return (
                  <BannerImage
                    logo={datum.brandLogo}
                    title={datum.title}
                    ratio={data.dimension}
                    subTitle={datum.subTitle}
                    buttonLabel={datum.buttonLabel}
                    image={datum.imageURL}
                    key={i}
                    url={datum.webURL}
                    {...rest}
                  />
                );
              })}
          </Banner>
        );
      } else {
        return (
          <div className={styles.monoBanner}>
            {data.items &&
              data.items.map((datum, i) => {
                return (
                  <BannerImage
                    logo={datum.brandLogo}
                    title={datum.title}
                    image={datum.imageURL}
                    subTitle={datum.subTitle}
                    ratio={data.dimension}
                    key={i}
                    url={datum.webURL}
                    {...rest}
                  />
                );
              })}
          </div>
        );
      }
    } else {
      return <HomeSkeleton />;
    }
  };

  render() {
    return (
      <div
        className={
          this.props.positionInFeed === 0
            ? styles.base
            : styles.marginTopWithBase
        }
      >
        {this.renderBanner()}
      </div>
    );
  }
}
HeroBannerPersonalisedComponent.propTypes = {
  loading: PropTypes.bool,
  feedComponentData: PropTypes.shape({
    items: PropTypes.array,
    type: PropTypes.string,
    data: PropTypes.shape({
      items: PropTypes.arrayOf(
        PropTypes.shape({
          brandLogo: PropTypes.string,
          title: PropTypes.string,
          imageURL: PropTypes.string
        })
      )
    })
  }),
  positionInFeed: PropTypes.number,
  getTargetMboxData: PropTypes.func
};
