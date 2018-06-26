import React, { Component } from "react";
import SecondaryLoader from "../../general/components/SecondaryLoader.js";
import Feed from "../../home/components/Feed";
import styles from "./StaticPage.css";
import {
  SECONDARY_FEED_TYPE,
  NOT_FOUND,
  SUCCESS,
  ERROR
} from "../../lib/constants";
import { Redirect } from "react-router-dom";

export default class StaticPage extends Component {
  constructor(props) {
    super();
    this.componentIsMounted = false;
  }
  componentDidMount() {
    const slug = this.props.match.params.slug;

    this.props.getStaticPage(slug);
    this.componentIsMounted = true;
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.slug !== prevProps.match.params.slug) {
      const slug = this.props.match.params.slug;
      this.props.getStaticPage(slug);
    }
  }
  navigateTo404() {
    return <Redirect to={NOT_FOUND} />;
  }
  render() {
    if (this.props.loading || !this.props.data) {
      return <SecondaryLoader />;
    }
    if (
      this.props.feedType === SECONDARY_FEED_TYPE &&
      this.props.data &&
      this.props.data.length === 0 &&
      this.props.status === SUCCESS &&
      this.componentIsMounted
    ) {
      return this.navigateTo404();
    }

    return (
      <div className={styles.base}>
        <Feed
          feedType={this.props.feedType}
          homeFeedData={this.props.data}
          setHeaderText={this.props.setHeaderText}
        />
      </div>
    );
  }
}
