import React from "react";
import Logo from "../../general/components/Logo";
import Button from "../../general/components/Button.js";
import PropTypes from "prop-types";
import styles from "./ThemProductCarousalDesktop.css";
import CircleProductDescriptionDesktop from "./CircleProductDescriptionDesktop.js";
import { widgetsTracking } from "../../lib/adobeUtils.js";
export default class ThemProductCarousalDesktop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      position: 0
    };
  }

  swithPosition(i, evt) {
    evt.stopPropagation();
    if (i !== undefined) {
      this.setState({ position: i });
    }
  }

  autoRun = () => {
    setTimeout(() => {
      this.goForward();
      this.autoRun();
    }, this.props.interval * 1000);
  };

  componentDidMount() {
    if (this.props.interval) {
      this.autoRun();
    }
  }

  goForward = () => {
    let childCount = this.props.items && this.props.items.length;
    this.setState({ position: (this.state.position + 1) % childCount });
  };

  handleClick() {
    widgetsTracking({
      widgetName: this.props.feedComponentData.type,
      sourceOfWidget: this.props.postData && this.props.postData.widgetPlatform
    });
    if (this.props.onClick) {
      this.props.onClick();
    }
  }

  onRedirect(url, brandsName, evt) {
    evt.stopPropagation();
    widgetsTracking({
      widgetName: this.props.feedComponentData.type,
      sourceOfWidget: this.props.postData && this.props.postData.widgetPlatform,
      brandName: brandsName,
      type: "Brand",
      PositionOfProduct: this.state.position + 1
    });
    if (this.props.onRedirect) {
      this.props.onRedirect(url);
    }
  }

  render() {
    return (
      <div
        className={
          this.props.positionInFeed === 1 ? styles.firstItemBase : styles.base
        }
        style={{
          backgroundImage: `url(${this.props.imageURL})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
        onClick={() => this.handleClick()}
      >
        <div className={styles.infoAndCarousel}>
          <div className={styles.logoAndDescriptionHolder}>
            <div className={styles.logoTextAndButtonHolder}>
              <div className={styles.logoHolder}>
                <Logo image={this.props.brandLogo} />
              </div>
              <div className={styles.descriptionText}>
                <h2> {this.props.description}</h2>
              </div>
              {this.props.label && (
                <div className={styles.buttonHolder}>
                  <div className={styles.button}>
                    <Button
                      disabled={this.props.disabled}
                      type="primary"
                      backgroundColor="#ff1744"
                      height={46}
                      label={this.props.label}
                      width={196}
                      textStyle={{ color: "#FFF", fontSize: 14 }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className={styles.carousalHolder}>
            {this.props.items &&
              this.props.items.length > 0 && (
                <CircleProductDescriptionDesktop
                  image={this.props.items[this.state.position].imageUrl}
                  brandsName={this.props.items[this.state.position].brandsName}
                  description={
                    this.props.items[this.state.position].productName
                  }
                  discountPrice={
                    this.props.items[this.state.position].winningSellerMOP
                  }
                  price={this.props.items[this.state.position].mrp}
                  webURL={this.props.items[this.state.position].webURL}
                  onRedirect={(url, brandsName, evt) =>
                    this.onRedirect(url, brandsName, evt)
                  }
                />
              )}

            <div className={styles.navBar}>
              {this.props.items &&
                this.props.items.map((val, i) => {
                  return (
                    <div
                      key={i}
                      className={
                        this.state.position === i
                          ? styles.navActive
                          : styles.nav
                      }
                      onClick={evt => this.swithPosition(i, evt)}
                    />
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
ThemProductCarousalDesktop.PropTypes = {
  imageURL: PropTypes.string,
  brandLogo: PropTypes.string,
  description: PropTypes.string,
  label: PropTypes.string,
  productName: PropTypes.string,
  image: PropTypes.string,
  brandsName: PropTypes.string,
  discountPrice: PropTypes.string,
  price: PropTypes.string,
  onClick: PropTypes.func,
  interval: PropTypes.number
};
ThemProductCarousalDesktop.defaultProps = {
  interval: 9
};
