import React from "react";
import ContentWidgetMobile from "./ContentWidgetMobile";
import ContentWidgetDesktop from "./ContentWidgetDesktop";
import Loader from "../../general/components/Loader";
import MediaQuery from "react-responsive";
import styles from "./ContentWidgetWrapper.css";
export default class ContentWidgetWrapper extends React.Component {
  renderLoader() {
    return <Loader />;
  }
  render() {
    if (
      this.props.loading &&
      this.props.feedComponentData &&
      this.props.feedComponentData.items &&
      this.props.feedComponentData.items.length < 1
    ) {
      return this.renderLoader();
    } else if (
      this.props.feedComponentData &&
      this.props.feedComponentData.items &&
      this.props.feedComponentData.items.length > 1
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
            <ContentWidgetDesktop
              allData={this.props.feedComponentData.items}
              history={this.props.history}
            />
          </MediaQuery>
        </div>
      );
    } else {
      return null;
    }
  }
}
