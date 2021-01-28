import React from "react";
import styles from "./SizeGuideElementFootwear.css";
import propTypes from "prop-types";
export default class SizeGuideElement extends React.Component {
  render() {
    const data = this.props.data;
    return (
      <div className={styles.base}>
        {data[0].age && (
          <div className={styles.display}>
            <div className={styles.header}>AGE</div>
            <div className={styles.dimensionValue}>
              {data.map((datum, i) => {
                return (
                  <div key={i} className={styles.dimensionValueList}>{datum.age}</div>
                );
              })}
            </div>
          </div>
        )}
        {data.find(datum => datum.dimensionSize) && (
          <div className={styles.display}>
            <div className={styles.header}>IND/UK</div>
            <div className={styles.dimensionValue}>
              {data.map((datum, i) => {
                return (
                  <div className={styles.dimensionValueList} key={i}>
                    {datum.dimensionSize}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {data.find(datum => datum.usSize) && (
          <div className={styles.display}>
            <div className={styles.header}>US</div>
            <div className={styles.dimensionValue}>
              {data.map((datum, i) => {
                return (
                  <div className={styles.dimensionValueList} key={i}>
                    {datum.usSize}
                  </div>
                );
              })}
            </div>
          </div>
        )}
        {data.find(datum => datum.euroSize) && (
          <div className={styles.display}>
            <div className={styles.header}>EURO</div>
            <div className={styles.dimensionValue}>
              {data.map((datum, i) => {
                return (
                  <div className={styles.dimensionValueList} key={i}>
                    {datum.euroSize}
                  </div>
                );
              })}
            </div>
          </div>
        )}
        {data.find(datum => datum.footlength) && (
          <div className={styles.display}>
            <div className={styles.header}>FOOT LENGTH (CM)</div>
            <div className={styles.dimensionValue}>
              {data.map((datum, i) => {
                return (
                  <div className={styles.dimensionValueList} key={i}>
                    {datum.footlength}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  }
}
SizeGuideElement.propTypes = {
  key: propTypes.string,
  value: propTypes.number,
  data: propTypes.array,
};
