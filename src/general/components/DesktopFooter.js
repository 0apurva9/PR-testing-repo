import React from "react";
import styles from "./DesktopFooter.css";
import { withRouter } from "react-router-dom";
class DesktopFooter extends React.Component {
  componentDidMount() {
    if (this.props.getDesktopFooter) {
      this.props.getDesktopFooter();
    }
  }

  render() {
    return (
      <div
        className={styles.contentHolder}
        dangerouslySetInnerHTML={{
          __html: this.props.DesktopFooterDetails
        }}
      />
    );
  }
}

export default withRouter(DesktopFooter);
