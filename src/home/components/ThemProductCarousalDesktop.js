import React from "react";
import Logo from "../../general/components/Logo";
import Button from "../../general/components/Button.js";
import PropTypes from "prop-types";
import styles from "./ThemProductCarousalDesktop.css";
import BrandsAndDescriptionDesktop from "./BrandsAndDescriptionDesktop.js";
export default class ThemProductCarousalDesktop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      position: 0
    };
  }
  swithPosition(i) {
    if (i !== undefined) {
      this.setState({ position: i });
    }
  }
  handleClick() {
    if (this.props.onClick) {
      this.props.onClick();
    }
  }

  render() {
    return (
      <div
        className={styles.base}
        style={{
          backgroundImage: `url(${this.props.imageURL})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        <div className={styles.infoAndCarousel}>
          <div className={styles.logoAndDescriptionHolder}>
            <div className={styles.logoTextAndButtonHolder}>
              <div className={styles.logoHolder}>
                <Logo image={this.props.brandLogo} />
              </div>
              <div className={styles.descriptionText}>
                {this.props.description}
              </div>
              <div className={styles.buttonHolder}>
                <div className={styles.button}>
                  <Button
                    disabled={this.props.disabled}
                    type="primary"
                    backgroundColor="#ff1744"
                    height={45}
                    label={this.props.label}
                    width={160}
                    textStyle={{ color: "#FFF", fontSize: 14 }}
                    onClick={() => this.handleClick()}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className={styles.carousalHolder}>
            {this.props.items &&
              this.props.items.length > 0 && (
                <BrandsAndDescriptionDesktop
                  image={this.props.items[this.state.position].imageUrl}
                  brandsName={this.props.items[this.state.position].brandsName}
                  description={
                    this.props.items[this.state.position].productName
                  }
                  discountPrice={
                    this.props.items[this.state.position].winningSellerMOP
                  }
                  price={this.props.items[this.state.position].mrp}
                />
              )}

            <div className={styles.navBar}>
              {this.props.items &&
                this.props.items.map((val, i) => {
                  return (
                    <div
                      className={
                        this.state.position === i
                          ? styles.navActive
                          : styles.nav
                      }
                      onClick={() => this.swithPosition(i)}
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
  onClick: PropTypes.func
};
