import React from "react";
import DiscoverMore500 from "./DiscoverMore500.js";
import DiscoverMoreCarousel from "./DiscoverMoreCarousel.js";
import DiscoverMoreL1ForDesktop from "./DiscoverMoreL1ForDesktop";
import DiscoverMoreL3Desktop from "./DiscoverMoreL3Desktop.js";
import PropTypes from "prop-types";
import DesktopOnly from "../../general/components/DesktopOnly.js";
import MobileOnly from "../../general/components/MobileOnly.js";

export default class DiscoverMore extends React.Component {
  render() {
    console.log(this.props);
    if (this.props.feedComponentData.data) {
      if (this.props.feedComponentData.category === "L3") {
        return (
          <React.Fragment>
            <DesktopOnly>
              <DiscoverMoreL3Desktop
                feedComponentData={this.props.feedComponentData}
                setClickedElementId={this.props.setClickedElementId}
                history={this.props.history}
              />
            </DesktopOnly>
            <MobileOnly>
              <DiscoverMore500
                feedComponentData={this.props.feedComponentData}
                setClickedElementId={this.props.setClickedElementId}
              />
            </MobileOnly>
          </React.Fragment>
        );
      } else {
        return (
          <React.Fragment>
            <DesktopOnly>
              <DiscoverMoreL1ForDesktop
                history={this.props.history}
                feedComponentData={this.props.feedComponentData}
                setClickedElementId={this.props.setClickedElementId}
              />
            </DesktopOnly>
            <MobileOnly>
              <DiscoverMoreCarousel
                feedComponentData={this.props.feedComponentData}
                setClickedElementId={this.props.setClickedElementId}
              />
            </MobileOnly>
          </React.Fragment>
        );
      }
    }

    return null;
  }
}

DiscoverMore.propTypes = {
  feedComponentData: PropTypes.shape({
    title: PropTypes.string,
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
