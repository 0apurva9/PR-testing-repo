import React from "react";
import range from "lodash.range";
import NewBrand from "../../general/components/NewBrand.js";
import NewBrandDesktop from "../../general/components/NewBrandDesktop.js";
import Carousel from "../../general/components/Carousel.js";
import MediaQuery from "react-responsive";
import PropTypes from "prop-types";
import styles from "./FollowBase.css";
import { TATA_CLIQ_ROOT } from "../../lib/apiRequest.js";

export default class FollowBase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: this.props.feedComponentData.items
        ? this.props.feedComponentData.items
        : null
    };
  }
  handleClick = data => {
    this.props.showStory({
      positionInFeed: this.props.positionInFeed,
      ...data
    });
  };

  render() {
    let { feedComponentData, ...rest } = this.props;
    feedComponentData = feedComponentData.data;
    return (
      <React.Fragment>
        <MediaQuery query="(max-device-width: 1024px)">
          <div
            className={
              this.props.positionInFeed === 1
                ? styles.firstItemBase
                : styles.base
            }
          >
            <div className={styles.header}>
              {this.props.feedComponentData.title
                ? this.props.feedComponentData.title
                : "Fresh from Brands"}
            </div>
            <Carousel elementWidthMobile={85} elementWidthDesktop={33.333}>
              {feedComponentData &&
                (feedComponentData.length > 0 &&
                  feedComponentData.map(datum => {
                    return (
                      <NewBrand
                        image={datum.imageURL}
                        logo={datum.brandLogo}
                        label={datum.title}
                        follow={datum.isFollowing}
                        key={datum.id}
                        webUrl={datum.webURL}
                        brandId={datum.id}
                        isFollowing={datum.isFollowing}
                        onClick={() =>
                          this.handleClick({
                            itemIds: datum.itemIds,
                            image: datum.imageURL,
                            title: datum.title,
                            brandName: datum.brandName,
                            history: this.props.history
                          })
                        }
                        {...rest}
                      />
                    );
                  }))}
            </Carousel>
          </div>
        </MediaQuery>
        <MediaQuery query="(min-device-width: 1025px)">
          <div
            className={
              this.props.positionInFeed === 1
                ? styles.firstItemBase
                : styles.base
            }
          >
            <Carousel
              elementWidthDesktop={100}
              header={
                this.props.feedComponentData.title
                  ? this.props.feedComponentData.title
                  : "Fresh from Brands"
              }
            >
              {feedComponentData &&
                (feedComponentData.length > 0 &&
                  range(0, feedComponentData.length, 5).map((datum, index) => {
                    let updateFeed = [];
                    feedComponentData.forEach((data, i) => {
                      if (datum <= i && i < datum + 5) {
                        updateFeed.push(data);
                      }
                    });
                    return (
                      <NewBrandDesktop
                        data={{ ...updateFeed }}
                        {...rest}
                        onClick={() =>
                          this.handleClick({
                            itemIds: updateFeed.itemIds,
                            image: updateFeed.imageURL,
                            title: updateFeed.title,
                            brandName: updateFeed.brandName,
                            history: this.props.history
                          })
                        }
                      />
                    );
                  }))}
            </Carousel>
          </div>
        </MediaQuery>
      </React.Fragment>
    );
  }
}

FollowBase.propTypes = {
  feedComponentData: PropTypes.shape({
    title: PropTypes.string,
    data: PropTypes.shape({
      items: PropTypes.arrayOf(
        PropTypes.shape({
          imageURL: PropTypes.string,
          brandLogo: PropTypes.string,
          title: PropTypes.string,
          id: PropTypes.string,
          isFollowing: PropTypes.bool
        })
      )
    })
  })
};
