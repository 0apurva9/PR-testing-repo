import React from "react";
import CircleProductDescriptionDesktop from "./CircleProductDescriptionDesktop";
import styles from "./DiscoverMoreComponentDesktop.css";
import UnderLinedButton from "../../general/components/UnderLinedButton";
import PropTypes from "prop-types";
import { TATA_CLIQ_ROOT } from "../../lib/apiRequest.js";
export default class DiscoverMoreComponentDesktop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showAll: false,
      label: "View More"
    };
  }

  goToLink = webURL => {
    if (webURL) {
      const urlSuffix = webURL.replace(TATA_CLIQ_ROOT, "$1");
      this.props.history.push(urlSuffix);
    }
    if (this.props.setClickedElementId) {
      this.props.setClickedElementId();
    }
  };

  showSeeAll = () => {
    this.setState({ showAll: !this.state.showAll }, () => {
      if (this.state.label === "View More") {
        this.setState({ label: "View Less" });
      } else {
        this.setState({ label: "View More" });
      }
    });
  };

  onRedirectToHeader = val => {
    if (val) {
      const urlSuffix = val.replace(TATA_CLIQ_ROOT, "$1");
      this.props.history.push(urlSuffix);
    }
  };

  handleClickOnLink = event => {
    event.preventDefault();
  };

  render() {
    return (
      <div className={styles.base}>
        <div className={styles.imageHolder}>
          <a
            href={this.props.webURL}
            target="_blank"
            rel="noreferrer"
            onClick={event => this.handleClickOnLink(event)}
            style={{ width: "100%", height: "100%" }}
          >
            <CircleProductDescriptionDesktop
              onRedirect={() => this.goToLink(this.props.webURL)}
              image={this.props.imageURL}
            />
          </a>
        </div>
        <div className={styles.descriptionHolder}>
          <div
            className={styles.heading}
            onClick={() => this.onRedirectToHeader(this.props.webURL)}
          >
            <h3>{this.props.title}</h3>
          </div>
          {this.props.items && (
            <div className={styles.listHolder}>
              {this.props.items &&
                this.props.items
                  .filter((val, i) => {
                    return !this.state.showAll ? i < 3 : true;
                  })
                  .map((val, i) => {
                    return (
                      <div
                        key={i}
                        className={styles.listLink}
                        onClick={() => this.goToLink(val.webURL)}
                      >
                        <h4> {val.title}</h4>
                      </div>
                    );
                  })}
            </div>
          )}

          <div className={styles.buttonHolder}>
            <div className={styles.button}>
              <UnderLinedButton
                label={this.state.label}
                color="#212121"
                onClick={() => this.showSeeAll()}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
DiscoverMoreComponentDesktop.propTypes = {
  imageURL: PropTypes.string,
  title: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      webURL: PropTypes.string
    })
  ),
  setClickedElementId: PropTypes.func,
  history: PropTypes.object,
  webURL: PropTypes.string
};
