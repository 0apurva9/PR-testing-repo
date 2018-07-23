import React from "react";
import styles from "./APlusTemplates.css";
export default class APlusTemplate2 extends React.Component {
  render() {
    let data = this.props.data;
    return (
      <div className={styles.base}>
        {data["Section1"] && (
          <div className={styles.section}>
            <div className={styles.shortSection}>
              {data["Section1"] &&
              data["Section1"][0] &&
              data["Section1"][0].value &&
              data["Section1"][0].value.imageList &&
              data["Section1"][0].value.imageList[0] ? (
                <img src={data["Section1"][0].value.imageList[0]} alt="" />
              ) : null}
            </div>
            <div className={styles.longSectionWithRightHeading}>
              {data["Section1"] &&
              data["Section1"][1] &&
              data["Section1"][1].value &&
              data["Section1"][1].value.textList &&
              data["Section1"][1].value.textList[0] ? (
                <div
                  className={styles.textSection}
                  dangerouslySetInnerHTML={{
                    __html: data["Section1"][1].value.textList[0]
                  }}
                  alt=""
                />
              ) : null}
            </div>
          </div>
        )}
        {data["Section2"] && (
          <div className={styles.section}>
            <div className={styles.longSectionWithRightHeading}>
              {data["Section2"] &&
              data["Section2"][0] &&
              data["Section2"][0].value &&
              data["Section2"][0].value.textList &&
              data["Section2"][0].value.textList[0] ? (
                <div
                  className={styles.textSection}
                  dangerouslySetInnerHTML={{
                    __html: data["Section2"][0].value.textList[0]
                  }}
                  alt=""
                />
              ) : null}
            </div>
            <div className={styles.shortSection}>
              {data["Section2"] &&
              data["Section2"][1] &&
              data["Section2"][1].value &&
              data["Section2"][1].value.imageList &&
              data["Section2"][1].value.imageList[0] ? (
                <img src={data["Section2"][1].value.imageList[0]} alt="" />
              ) : null}
            </div>
          </div>
        )}
        {data["Section3"] && (
          <div className={styles.section}>
            <div className={styles.shortSection}>
              {data["Section3"] &&
              data["Section3"][0] &&
              data["Section3"][0].value &&
              data["Section3"][0].value.imageList &&
              data["Section3"][0].value.imageList[0] ? (
                <img src={data["Section3"][0].value.imageList[0]} alt="" />
              ) : null}
            </div>
            <div className={styles.longSectionWithRightHeading}>
              {data["Section3"] &&
              data["Section3"][1] &&
              data["Section3"][1].value &&
              data["Section3"][1].value.textList &&
              data["Section3"][1].value.textList[0] ? (
                <div
                  className={styles.textSection}
                  dangerouslySetInnerHTML={{
                    __html: data["Section3"][1].value.textList[0]
                  }}
                  alt=""
                />
              ) : null}
            </div>
          </div>
        )}
        {data["Section4"] && (
          <div className={styles.section}>
            <div className={styles.longSectionWithRightHeading}>
              {data["Section4"] &&
              data["Section4"][0] &&
              data["Section4"][0].value &&
              data["Section4"][0].value.textList &&
              data["Section4"][0].value.textList[0] ? (
                <div
                  className={styles.textSection}
                  dangerouslySetInnerHTML={{
                    __html: data["Section4"][0].value.textList[0]
                  }}
                  alt=""
                />
              ) : null}
            </div>
            <div className={styles.shortSection}>
              {data["Section4"] &&
              data["Section4"][1] &&
              data["Section4"][1].value &&
              data["Section4"][1].value.imageList &&
              data["Section4"][1].value.imageList[0] ? (
                <img src={data["Section4"][1].value.imageList[0]} alt="" />
              ) : null}
            </div>
          </div>
        )}
        {data["Section5"] && (
          <div className={styles.section}>
            <div className={styles.shortSection}>
              {data["Section5"] &&
              data["Section5"][0] &&
              data["Section5"][0].value &&
              data["Section5"][0].value.imageList &&
              data["Section5"][0].value.imageList[0] ? (
                <img src={data["Section5"][0].value.imageList[0]} alt="" />
              ) : null}
            </div>
            <div className={styles.longSectionWithRightHeading}>
              {data["Section5"] &&
              data["Section5"][1] &&
              data["Section5"][1].value &&
              data["Section5"][1].value.textList &&
              data["Section5"][1].value.textList[0] ? (
                <div
                  className={styles.textSection}
                  dangerouslySetInnerHTML={{
                    __html: data["Section5"][1].value.textList[0]
                  }}
                  alt=""
                />
              ) : null}
            </div>
          </div>
        )}
        {data["Section6"] && (
          <div className={styles.section}>
            <div className={styles.longSectionWithRightHeading}>
              {data["Section6"] &&
              data["Section6"][0] &&
              data["Section6"][0].value &&
              data["Section6"][0].value.textList &&
              data["Section6"][0].value.textList[0] ? (
                <div
                  className={styles.textSection}
                  dangerouslySetInnerHTML={{
                    __html: data["Section6"][0].value.textList[0]
                  }}
                  alt=""
                />
              ) : null}
            </div>
            <div className={styles.shortSection}>
              {data["Section6"] &&
              data["Section6"][1] &&
              data["Section6"][1].value &&
              data["Section6"][1].value.imageList &&
              data["Section6"][1].value.imageList[0] ? (
                <img src={data["Section6"][1].value.imageList[0]} alt="" />
              ) : null}
            </div>
          </div>
        )}
      </div>
    );
  }
}
