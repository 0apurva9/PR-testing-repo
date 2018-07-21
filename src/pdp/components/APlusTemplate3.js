import React from "react";
import ProductVideoForAPlusTemplate3 from "./ProductVideoForAPlusTemplate3";
import styles from "./APlusTemplates.css";
export default class APlusTemplate3 extends React.Component {
  render() {
    let data = this.props.data;
    return (
      <div className={styles.base}>
        {data["Section1"] && (
          <div className={styles.section}>
            <div className={styles.leftMiddleSection}>
              {data["Section1"] &&
              data["Section1"][0] &&
              data["Section1"][0].value &&
              data["Section1"][0].value.imageList &&
              data["Section1"][0].value.imageList[0] ? (
                <img src={data["Section1"][0].value.imageList[0]} alt="" />
              ) : null}
            </div>
            <div className={styles.rightMiddleSection}>
              {data["Section1"] &&
              data["Section1"][1] &&
              data["Section1"][1].value &&
              data["Section1"][1].value.imageList &&
              data["Section1"][1].value.imageList[0] ? (
                <img src={data["Section1"][1].value.imageList[0]} alt="" />
              ) : null}
            </div>
          </div>
        )}
        {data["Section2"] && (
          <div className={styles.section}>
            <div className={styles.leftMiddleSection}>
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
            <div className={styles.rightMiddleSection}>
              {data["Section2"] &&
              data["Section2"][1] &&
              data["Section2"][1].value &&
              data["Section2"][1].value.textList &&
              data["Section2"][1].value.textList[0] ? (
                <div
                  className={styles.textSection}
                  dangerouslySetInnerHTML={{
                    __html: data["Section2"][1].value.textList[0]
                  }}
                  alt=""
                />
              ) : null}
            </div>
          </div>
        )}

        {data["Section3"] && (
          <div className={styles.section}>
            {data["Section3"] &&
            data["Section3"][0] &&
            data["Section3"][0].value &&
            data["Section3"][0].value.textList &&
            data["Section3"][0].value.textList[0] ? (
              <div
                className={styles.textSectionWithCenter}
                dangerouslySetInnerHTML={{
                  __html: data["Section3"][0].value.textList[0]
                }}
              />
            ) : null}
          </div>
        )}
        {data["Section4"] && (
          <div className={styles.section}>
            <div className={styles.leftShortSection}>
              {data["Section4"] &&
              data["Section4"][0] &&
              data["Section4"][0].value &&
              data["Section4"][0].value.imageList &&
              data["Section4"][0].value.imageList[0] ? (
                <img src={data["Section4"][0].value.imageList[0]} alt="" />
              ) : null}
            </div>
            <div className={styles.centerShortSection}>
              {data["Section4"] &&
              data["Section4"][1] &&
              data["Section4"][1].value &&
              data["Section4"][1].value.imageList &&
              data["Section4"][1].value.imageList[0] ? (
                <img src={data["Section4"][1].value.imageList[0]} alt="" />
              ) : null}
            </div>
            <div className={styles.rightShortSection}>
              {data["Section4"] &&
              data["Section4"][2] &&
              data["Section4"][2].value &&
              data["Section4"][2].value.imageList &&
              data["Section4"][2].value.imageList[0] ? (
                <img src={data["Section4"][2].value.imageList[0]} alt="" />
              ) : null}
            </div>
          </div>
        )}
        {data["Section5"] && (
          <div className={styles.section}>
            <div className={styles.leftShortSectionHeaderCenter}>
              {data["Section5"] &&
              data["Section5"][0] &&
              data["Section5"][0].value &&
              data["Section5"][0].value.textList &&
              data["Section5"][0].value.textList[0] ? (
                <div
                  className={styles.textSection}
                  dangerouslySetInnerHTML={{
                    __html: data["Section5"][0].value.textList[0]
                  }}
                />
              ) : null}
            </div>
            <div className={styles.centerShortSectionHeaderCenter}>
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
                />
              ) : null}
            </div>
            <div className={styles.rightShortSectionHeaderCenter}>
              {data["Section5"] &&
              data["Section5"][2] &&
              data["Section5"][2].value &&
              data["Section5"][2].value.textList &&
              data["Section5"][2].value.textList[0] ? (
                <div
                  className={styles.textSection}
                  dangerouslySetInnerHTML={{
                    __html: data["Section5"][2].value.textList[0]
                  }}
                />
              ) : null}
            </div>
          </div>
        )}
        {data["Section6"] && (
          <div className={styles.section}>
            {data["Section6"] &&
            data["Section6"][0] &&
            data["Section6"][0].value &&
            data["Section6"][0].value.textList &&
            data["Section6"][0].value.textList[0] ? (
              <div
                className={styles.textSectionWithCenter}
                dangerouslySetInnerHTML={{
                  __html: data["Section6"][0].value.textList[0]
                }}
              />
            ) : null}
          </div>
        )}
        {data["Section7"] && (
          <div className={styles.section}>
            <div className={styles.longSectionOfImage}>
              {data["Section7"] &&
              data["Section7"][0] &&
              data["Section7"][0].value &&
              data["Section7"][0].value.videoList &&
              data["Section7"][0].value.videoList[0] ? (
                <ProductVideoForAPlusTemplate3
                  url={data["Section7"][0].value.videoList[0]}
                />
              ) : null}
            </div>
          </div>
        )}
      </div>
    );
  }
}
