import React from "react";
import ContentWidgetMobile from "./ContentWidgetMobile";
import ContentWidgetDesktop from "./ContentWidgetDesktop";
import Loader from "../../general/components/Loader";
import MediaQuery from "react-responsive";
import styles from "./ContentWidgetWrapper.css";
import CommonCenter from "../../general/components/CommonCenter.js";
export default class ContentWidgetWrapper extends React.Component {
  renderLoader() {
    return <Loader />;
  }
  render() {
    if (
      this.props.loading &&
      this.props.feedComponentData &&
      this.props.feedComponentData.items &&
      this.props.feedComponentData.items.length === 0
    ) {
      return this.renderLoader();
    } else if (
      this.props.feedComponentData &&
      this.props.feedComponentData.items &&
      this.props.feedComponentData.items.length !== 0
    ) {
      return (
        <div className={styles.base}>
          <MediaQuery query="(max-device-width: 1024px)">
            <div className={styles.header}>
              {this.props.feedComponentData.title}
            </div>
            <ContentWidgetMobile
              allData={this.props.feedComponentData.items}
              history={this.props.history}
              setClickedElementId={this.props.setClickedElementId}
            />
          </MediaQuery>
          <MediaQuery query="(min-device-width: 1025px)">
            <CommonCenter>
              <ContentWidgetDesktop
                allData={this.props.feedComponentData.items}
                history={this.props.history}
              />
            </CommonCenter>
          </MediaQuery>
        </div>
      );
    } else {
      return null;
    }
  }
}
