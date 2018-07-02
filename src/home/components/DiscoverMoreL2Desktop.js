import React from "react";
import Carousel from "../../general/components/Carousel";
import DiscoverMoreComponentDesktop from "./DiscoverMoreComponentDesktop";
import styles from "./DiscoverMoreL2Desktop.css";
import PropTypes from "prop-types";
export default class DiscoverMoreL2Desktop extends React.Component {
  render() {
    const { feedComponentData, title } = this.props;

    return (
      <div className={styles.base}>
        <Carousel
          header={feedComponentData && feedComponentData.title}
          elementWidthDesktop={33.33}
        >
          {feedComponentData.items &&
            feedComponentData.items.map((datum, i) => {
              return (
                <DiscoverMoreComponentDesktop
                  imageURL={datum.imageURL}
                  title={datum.title}
                  webURL={datum.webURL}
                  btnText={datum.btnText}
                  items={datum.items}
                  history={this.props.history}
                />
              );
            })}
        </Carousel>
      </div>
    );
  }
}
DiscoverMoreL2Desktop.propTypes = {
  imageURL: PropTypes.string,
  title: PropTypes.string,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      imageURL: PropTypes.string,
      title: PropTypes.string,
      webURL: PropTypes.string,
      btnText: PropTypes.string,
      items: PropTypes.string
    })
  )
};
