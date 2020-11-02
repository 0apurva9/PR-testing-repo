import React, { Fragment } from "react";
import Video from "../../../../general/components/Video";
import Image from "../../../../xelpmoc-core/Image";
import Logo from "../../../../general/components/Logo";
import PropTypes from "prop-types";
import styles from "./ProductVideoForAPlusTemplate3.css";
export default class ProductVideoForAPlusTemplate3 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      played: false
    };
  }
  onEnded = () => {
    this.setState({ played: false });
  };

  onPlay = () => {
    this.setState({ played: true });
  };
  render() {
    let overlayClass = styles.overlay;
    if (this.state.played) {
      overlayClass = styles.overlayHidden;
    }
    return (
      <Fragment>
        <div className={styles.base}>
          <div className={styles.video} style={{ backgroundColor: "#212121" }}>
            <Video
              url={this.props.url}
              playing={this.state.played}
              controls
              onEnded={() => this.onEnded()}
              onPlay={() => {
                this.onPlay();
              }}
            />
          </div>
          {!this.state.played && (
            <div
              className={overlayClass}
              onClick={() => {
                this.setState({ played: !this.state.played });
              }}
            >
              <div className={styles.video}>
                <Image image={this.props.image} color="transparent" />
              </div>
              <div className={styles.logoHolder}>
                <div className={styles.logo}>
                  <Logo image={this.props.logo} />
                </div>
              </div>
              <div className={styles.play} />
              <div className={styles.description}>{this.props.description}</div>
            </div>
          )}
        </div>
      </Fragment>
    );
  }
}
ProductVideoForAPlusTemplate3.propTypes = {
  url: PropTypes.string,
  logo: PropTypes.string,
  image: PropTypes.string,
  description: PropTypes.string
};
