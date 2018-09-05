import React from "react";
import Image from "../../xelpmoc-core/Image";
import Logo from "../../general/components/Logo";
import Button from "../../general/components/Button";
import { TATA_CLIQ_ROOT } from "../../lib/apiRequest.js";
import styles from "./ContentWidgetDesktop.css";
import queLogo from "./img/que_logo.png";

export default class ContentWidgetDesktop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      position: 0
    };
  }
  handleReadMore(webURL) {
    if (webURL) {
      const urlSuffix = webURL.replace(TATA_CLIQ_ROOT, "$1").trim();
      const urlPath = new URL(webURL).pathname;
      if (urlPath.indexOf("/que") > -1) {
        window.open(urlSuffix, "_blank");
        window.focus();
      } else {
        this.props.history.push(urlSuffix);
      }
    }
    if (this.props.setClickedElementId) {
      this.props.setClickedElementId();
    }
  }
  goForward = () => {
    if (
      this.props.allData &&
      this.props.allData.length - 1 > this.state.position
    ) {
      const position = this.state.position + 1;
      this.setState({ position });
    }
  };
  goBack = () => {
    if (this.state.position > 0) {
      const position = this.state.position - 1;
      this.setState({ position });
    }
  };
  swithPosition(i, evt) {
    evt.stopPropagation();
    if (i !== undefined) {
      this.setState({ position: i });
    }
  }
  render() {
    return (
      <div className={styles.base}>
        <div
          className={styles.banner}
          onClick={() =>
            this.handleReadMore(this.props.allData[this.state.position].webURL)
          }
        >
          <div className={styles.bannerHolder}>
            <Image image={this.props.allData[this.state.position].imageURL} />;
          </div>
          <div className={styles.navHolder}>
            {this.props.allData &&
              this.props.allData.map((val, i) => {
                return (
                  <div
                    className={
                      this.state.position === i ? styles.navActive : styles.nav
                    }
                    onClick={evt => this.swithPosition(i, evt)}
                  />
                );
              })}
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.contentHeader}>
            <div className={styles.logo}>
              <Logo image={queLogo} />
            </div>
            <div className={styles.buttons}>
              <div className={styles.backButton} onClick={this.goBack} />
              <div className={styles.forwardButton} onClick={this.goForward} />
            </div>
          </div>
          <div className={styles.descriptionHolder}>
            <div className={styles.description}>
              <div className={styles.descriptionHeader}>
                {this.props.allData[this.state.position].title}
              </div>
              <div className={styles.descriptionContent}>
                {this.props.allData[this.state.position].description}
              </div>
              <div className={styles.readMore}>
                <Button
                  width={126}
                  type="secondary"
                  label="Read more"
                  onClick={() =>
                    this.handleReadMore(
                      this.props.allData[this.state.position].webURL
                    )
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
