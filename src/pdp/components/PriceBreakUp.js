import React from "react";
import Accordion from "../../general/components/Accordion";
import PropTypes from "prop-types";
import styles from "./ProductFeatures.css";
const GrossWeight = "Gross Weight";
export default class PriceBreakUp extends React.Component {
  render() {
    return (
      <Accordion
        text="Price breakup"
        headerFontSize={this.props.headerFontSize}
        isOpen={this.props.isOpen}
      >
        <div className={styles.holder}>
          {this.props.data.map((val, index) => {
            return (
              <div
                key={index}
                className={
                  this.props.sideBySide
                    ? styles.sideBySideContent
                    : styles.content
                }
              >
                <div className={styles.header}>{val.name}</div>
                <div className={styles.description}>
                  {val.name !== GrossWeight
                    ? val.price && val.price.formattedValue
                    : val.weightRateList && val.weightRateList[0]}
                </div>
              </div>
            );
          })}
        </div>
      </Accordion>
    );
  }
}
PriceBreakUp.propTypes = {
  isOpen: PropTypes.bool,
  headerFontSize: PropTypes.number,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      price: PropTypes.shape({ formattedValue: PropTypes.string })
    })
  ),
  sideBySide: PropTypes.bool
};
PriceBreakUp.propTypes = {
  headerFontSize: 16,
  sideBySide: false
};
