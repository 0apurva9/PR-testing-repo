import React from "react";
import Grid from "../../general/components/Grid";
import CategoryWithName from "../../general/components/CategoryWithName";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import { TATA_CLIQ_ROOT } from "../../lib/apiRequest.js";

import styles from "./DiscoverMore500.css";
import FeedComponent from "./FeedComponent";
class DiscoverMore500 extends React.Component {
  handleClick = webUrl => {
    const urlSuffix = webUrl.replace(TATA_CLIQ_ROOT, "$1");
    this.props.history.push(urlSuffix);
  };

  render() {
    const { feedComponentData } = this.props;
    if (!(feedComponentData.data instanceof Array)) {
      return null;
    }
    return (
      <div className={styles.base}>
        <div className={styles.header}>{feedComponentData.title}</div>
        <Grid elementWidthMobile={33.33} offset={20}>
          {feedComponentData &&
            feedComponentData.data &&
            feedComponentData.data.map((datum, i) => {
              return (
                i < 5 && (
                  <CategoryWithName
                    image={datum.imageURL}
                    label={datum.title}
                    key={i}
                    value={datum.webURL}
                    onClick={this.handleClick}
                  />
                )
              );
            })}
        </Grid>
      </div>
    );
  }
}

export default withRouter(DiscoverMore500);
DiscoverMore500.propTypes = {
  feedComponentData: PropTypes.shape({
    data: PropTypes.shape({
      data: PropTypes.arrayOf(
        PropTypes.shape({
          imageURL: PropTypes.string,
          title: PropTypes.string
        })
      )
    })
  })
};
