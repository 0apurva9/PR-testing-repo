import React from "react";
import styles from "./SizeGuideElementFootwear.css";
import propTypes from "prop-types";
export default class SizeGuideElement extends React.Component {
  render() {
    const data = this.props.data;
    const white = data[0].age ? styles.kidswhite : styles.white;
    const grey = data[0].age ? styles.kidsgrey : styles.grey;
    return (
      <div className={styles.base}>
        {data[0].age && (
          <div className={white}>
            <div className={styles.header}>AGE</div>
            <div className={styles.dimensionValue}>
              {data.map((datum, i) => {
                return (
                  <div className={styles.dimensionValueList}>{datum.age}</div>
                );
              })}
            </div>
          </div>
        )}

        <div className={grey}>
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

        <div className={white}>
          <div className={styles.header}>US</div>
          <div className={styles.dimensionValue}>
            {data.map((datum, i) => {
              return (
                <div className={styles.dimensionValueList}>{datum.usSize}</div>
              );
            })}
          </div>
        </div>

        <div className={grey}>
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

        <div className={white}>
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
