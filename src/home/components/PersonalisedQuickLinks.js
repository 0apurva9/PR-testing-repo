import React from "react";
import styles from "./AllQuickLinks.css";
import QuickLinks from "./QuickLinks";
import Carousel from "../../general/components/Carousel";
import { TATA_CLIQ_ROOT } from "../../lib/apiRequest.js";
export default class PersonalisedQuickLinks extends React.Component {
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

  onClick = webUrl => {
    if (webUrl) {
      const urlSuffix = webUrl.replace(TATA_CLIQ_ROOT, "$1");
      this.props.history.push(urlSuffix);
    }
  };

  render() {
    let data = this.state.targetData
      ? this.state.targetData
      : this.props.feedComponentData;
    if (data) {
      return (
        <React.Fragment>
          <div className={styles.base}>
            <div className={styles.carouselHolder}>
              <Carousel elementWidthMobile={28} padding="0px 5px">
                {data &&
                  data.items &&
                  data.items.map((val, i) => {
                    return (
                      <QuickLinks
                        key={i}
                        imageURL={val.imageURL}
                        onClick={() => this.onClick(val.webURL)}
                      />
                    );
                  })}
              </Carousel>
            </div>
          </div>
        </React.Fragment>
      );
    } else {
      return null;
    }
  }
}
