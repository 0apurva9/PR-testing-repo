import React from "react";
import Pre2AutomatedBrandProductCarousel from "./Pre2AutomatedBrandProductCarousel";

export default class PreAutomatedBrandProductCarousel extends React.Component {
  render() {
    if (this.props.feedComponentData.data) {
      return <Pre2AutomatedBrandProductCarousel {...this.props} />;
    }
    return false;
  }
}
