import React from "react";
import styles from "./SizeGuideElementFootwear.css";
import propTypes from "prop-types";
export default class SizeGuideElement extends React.Component {
  render() {
    const data = this.props.data;
    console.log(Object.keys(this.props.data[0]));
    console.log(Object.keys(this.props.data[0]).includes("age"));
    return (
      <div className={styles.base}>
        {Object.keys(this.props.data[0]).includes("age") ? (
          <div className={styles.sizeColumn}>
            <div className={styles.header}>AGE</div>
            <div className={styles.dimensionValue}>
              {data.map((datum, i) => {
                return (
                  <div className={styles.dimensionValueList}>{datum.age}</div>
                );
              })}
            </div>
          </div>
        ) : null}

        <div className={styles.sizeColumn}>
          <div className={styles.header}>IND/UK</div>
          <div className={styles.dimensionValue}>
            {data.map((datum, i) => {
              return (
                <div className={styles.dimensionValueList}>
                  {datum.dimensionSize}
                </div>
              );
            })}
          </div>
        </div>

        {Object.keys(this.props.data[0]).includes("usSize") ? (
          <div className={styles.sizeColumn}>
            <div className={styles.header}>US</div>
            <div className={styles.dimensionValue}>
              {data.map((datum, i) => {
                return (
                  <div className={styles.dimensionValueList}>
                    {datum.usSize}
                  </div>
                );
              })}
            </div>
          </div>
        ) : null}

        <div className={styles.sizeColumn}>
          <div className={styles.header}>EURO</div>
          <div className={styles.dimensionValue}>
            {data.map((datum, i) => {
              return (
                <div className={styles.dimensionValueList}>
                  {datum.euroSize}
                </div>
              );
            })}
          </div>
        </div>
        <div className={styles.sizeColumn}>
          <div className={styles.header}>FOOT LENGTH (CM)</div>
          <div className={styles.dimensionValue}>
            {data.map((datum, i) => {
              return (
                <div className={styles.dimensionValueList}>
                  {datum.footlength}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
SizeGuideElement.propTypes = {
  key: propTypes.string,
  value: propTypes.number
};
