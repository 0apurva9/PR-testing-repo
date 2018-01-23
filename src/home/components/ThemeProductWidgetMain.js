import React from "react";
import Carousel from "../../general/components/Carousel";
import ThemeProductWidget from "../../general/components/ThemeProductWidget";
import Logo from "../../general/components/Logo";
import PropTypes from "prop-types";
import styles from "./ThemeProductWidgetMain.css";
export default class ThemeProductWidgetMain extends React.Component {
  handleClick() {
    if (this.props.seeAll) {
      this.props.seeAll();
    }
  }
  render() {
    return (
      <div
        className={styles.base}
        style={{
          backgroundImage: `url(${this.props.backgroundImage})`
        }}
      >
        <div className={styles.overlay} />
        <div className={styles.logo}>
          <Logo image={this.props.logo} />
        </div>
        <Carousel
          header={this.props.header}
          buttonText="Shop all"
          seeAll={this.handleClick}
          elementWidthMobile={45}
          withFooter={false}
          isWhite={true}
        >
          {this.props.data &&
            this.props.data.map((datum, i) => {
              return (
                <ThemeProductWidget
                  image={datum.image}
                  label={datum.label}
                  price={datum.price}
                  key={i}
                  isWhite={true}
                />
              );
            })}
        </Carousel>
      </div>
    );
  }
}
ThemeProductWidgetMain.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      header: PropTypes.string,
      label: PropTypes.string,
      price: PropTypes.string,
      image: PropTypes.string,
      backgroundImage: PropTypes.string,
      logo: PropTypes.string,
      isWhite: PropTypes.bool,
      seeAll: PropTypes.func,
      elementWidthMobile: PropTypes.number
    })
  )
};
ThemeProductWidgetMain.defaultProps = {
  header: "New arrivals"
};
