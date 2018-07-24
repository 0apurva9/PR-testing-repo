import React from "react";
import styles from "./ColourSelector.css";
import ColourSelect from "./ColourSelect";
import Carousel from "../../general/components/Carousel";
import MobileOnly from "../../general/components/MobileOnly";
import DesktopOnly from "../../general/components/DesktopOnly";
import PropTypes from "prop-types";
export default class ColourSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayColour: this.props.selected ? this.props.selected[0] : [""]
    };
  }
  updateColour(productUrl, selectedColour, currentColour) {
    if (selectedColour !== currentColour) {
      if (
        this.props.history.location.state &&
        this.props.history.location.state.isSizeSelected
      ) {
        this.props.history.push({
          pathname: productUrl,
          state: { isSizeSelected: true }
        });
      } else {
        this.props.history.push({ pathname: productUrl });
      }
    }
  }
  renderColours(datum, i, selectedColour) {
    return (
      <ColourSelect
        key={i}
        colour={datum.colorHexCode}
        value={datum.color}
        selected={datum.color === selectedColour}
        onSelect={() =>
          this.updateColour(datum.colorurl, selectedColour, datum.color)
        }
      />
    );
  }
  render() {
    const selectedSize = this.props.data.filter(val => {
      return val.sizelink.productCode === this.props.productId;
    })[0].sizelink.size;
    const selectedColour = this.props.data.filter(val => {
      return val.colorlink.selected;
    })[0].colorlink.color;

    const colors = this.props.data
      .filter(val => {
        return val.sizelink.size === selectedSize;
      })
      .map(val => {
        return val.colorlink;
      });

    if (colors.length !== 0) {
      return (
        <div
          className={
            this.props.noBackground ? styles.noBackground : styles.base
          }
        >
          <MobileOnly>
            <Carousel
              elementWidthMobile="auto"
              elementWidthDesktop="auto"
              headerComponent={
                <div className={styles.header}>
                  Colour:{" "}
                  <span className={styles.colourName}>{selectedColour}</span>
                </div>
              }
            >
              {colors.map((datum, i) => {
                return this.renderColours(datum, i, selectedColour);
              })}
            </Carousel>
          </MobileOnly>
          <DesktopOnly>
            <div className={styles.header}>
              Colour:{" "}
              <span className={styles.colourName}>{selectedColour}</span>
            </div>
            <div className={styles.colorHolder}>
              {colors.map((datum, i) => {
                return (
                  <div className={styles.colour}>
                    {this.renderColours(datum, i, selectedColour)}
                  </div>
                );
              })}
            </div>
          </DesktopOnly>
        </div>
      );
    } else {
      return null;
    }
  }
}
ColourSelector.propTypes = {
  noBackground: PropTypes.bool,
  onSelect: PropTypes.func,
  productId: PropTypes.string,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      color: PropTypes.string,
      hexCode: PropTypes.string
    })
  )
};
