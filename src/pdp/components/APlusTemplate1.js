import React from "react";
import ProductVideo from "../../general/components/ProductVideo";
import styles from "./APlusTemplates.css";
export default class APlusTemplate1 extends React.Component {
  render() {
    const data = {};
    this.props.productContent
      .sort((a, b) => {
        if (a.key < b.key) {
          return -1;
        }
        if (a.key > b.key) {
          return 1;
        }
        return 0;
      })
      .map(val => {
        return val;
      })
      .forEach((val, i) => {
        if (val.key.slice(0, -1) in data) {
          data[val.key.slice(0, -1)].push(val);
        } else {
          data[val.key.slice(0, -1)] = [];
          data[val.key.slice(0, -1)].push(val);
        }
      });

    return (
      <div className={styles.base}>
        {data["Section1"] && (
          <div className={styles.section}>
            <div className={styles.longSection}>
              {data["Section1"] &&
              data["Section1"][0] &&
              data["Section1"][0].value &&
              data["Section1"][0].value.imageList &&
              data["Section1"][0].value.imageList[0] ? (
                <img src={data["Section1"][0].value.imageList[0]} alt="" />
              ) : null}
            </div>
            <div className={styles.shortSection}>
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
            <div className={styles.longSection}>
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
            <div className={styles.longImage}>
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
            <div className={styles.longSection}>
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
        {data["Section5"] && (
          <div className={styles.section}>
            <div className={styles.leftShortSection}>
              {data["Section5"] &&
              data["Section5"][0] &&
              data["Section5"][0].value &&
              data["Section5"][0].value.imageList &&
              data["Section5"][0].value.imageList[0] ? (
                <img src={data["Section5"][0].value.imageList[0]} alt="" />
              ) : null}
            </div>
            <div className={styles.centerShortSection}>
              {data["Section5"] &&
              data["Section5"][1] &&
              data["Section5"][1].value &&
              data["Section5"][1].value.imageList &&
              data["Section5"][1].value.imageList[0] ? (
                <img src={data["Section5"][1].value.imageList[0]} alt="" />
              ) : null}
            </div>
            <div className={styles.rightShortSection}>
              {data["Section5"] &&
              data["Section5"][2] &&
              data["Section5"][2].value &&
              data["Section5"][2].value.imageList &&
              data["Section5"][2].value.imageList[0] ? (
                <img src={data["Section5"][2].value.imageList[0]} alt="" />
              ) : null}
            </div>
          </div>
        )}
        {data["Section6"] && (
          <div className={styles.section}>
            <div className={styles.leftShortSection}>
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
                />
              ) : null}
            </div>
            <div className={styles.centerShortSection}>
              {data["Section6"] &&
              data["Section6"][1] &&
              data["Section6"][1].value &&
              data["Section6"][1].value.textList &&
              data["Section6"][1].value.textList[0] ? (
                <div
                  className={styles.textSection}
                  dangerouslySetInnerHTML={{
                    __html: data["Section6"][1].value.textList[0]
                  }}
                />
              ) : null}
            </div>
            <div className={styles.rightShortSection}>
              {data["Section6"] &&
              data["Section6"][2] &&
              data["Section6"][2].value &&
              data["Section6"][2].value.textList &&
              data["Section6"][2].value.textList[0] ? (
                <div
                  className={styles.textSection}
                  dangerouslySetInnerHTML={{
                    __html: data["Section6"][2].value.textList[0]
                  }}
                />
              ) : null}
            </div>
          </div>
        )}
        {data["Section7"] && (
          <div className={styles.section}>
            {data["Section7"] &&
            data["Section7"][0] &&
            data["Section7"][0].value &&
            data["Section7"][0].value.textList &&
            data["Section7"][0].value.textList[0] ? (
              <div
                className={styles.textSection}
                dangerouslySetInnerHTML={{
                  __html: data["Section7"][0].value.textList[0]
                }}
              />
            ) : null}
          </div>
        )}
        {data["Section8"] && (
          <div className={styles.jointSection}>
            <div className={styles.leftShortSection}>
              {data["Section8"] &&
              data["Section8"][0] &&
              data["Section8"][0].value &&
              data["Section8"][0].value.videoList &&
              data["Section8"][0].value.videoList[0] ? (
                <ProductVideo url={data["Section8"][0].value.videoList[0]} />
              ) : null}
            </div>
            <div className={styles.centerShortSection}>
              {data["Section8"] &&
              data["Section8"][1] &&
              data["Section8"][1].value &&
              data["Section8"][1].value.videoList &&
              data["Section8"][1].value.videoList[0] ? (
                <ProductVideo url={data["Section8"][1].value.videoList[0]} />
              ) : null}
            </div>
            <div className={styles.rightShortSection}>
              {data["Section8"] &&
              data["Section8"][2] &&
              data["Section8"][2].value &&
              data["Section8"][2].value.videoList &&
              data["Section8"][2].value.videoList[0] ? (
                <ProductVideo url={data["Section8"][2].value.videoList[0]} />
              ) : null}
            </div>
          </div>
        )}
        {data["Section9"] && (
          <div className={styles.jointSection}>
            <div className={styles.leftShortSection}>
              {data["Section9"] &&
              data["Section9"][0] &&
              data["Section9"][0].value &&
              data["Section9"][0].value.textList &&
              data["Section9"][0].value.textList[0] ? (
                <div
                  className={styles.textSection}
                  dangerouslySetInnerHTML={{
                    __html: data["Section9"][0].value.textList[0]
                  }}
                />
              ) : null}
            </div>
            <div className={styles.centerShortSection}>
              {data["Section9"] &&
              data["Section9"][1] &&
              data["Section9"][1].value &&
              data["Section9"][1].value.textList &&
              data["Section9"][1].value.textList[0] ? (
                <div
                  className={styles.textSection}
                  dangerouslySetInnerHTML={{
                    __html: data["Section9"][1].value.textList[0]
                  }}
                />
              ) : null}
            </div>
            <div className={styles.rightShortSection}>
              {data["Section9"] &&
              data["Section9"][2] &&
              data["Section9"][2].value &&
              data["Section9"][2].value.textList &&
              data["Section9"][2].value.textList[0] ? (
                <div
                  className={styles.textSection}
                  dangerouslySetInnerHTML={{
                    __html: data["Section9"][2].value.textList[0]
                  }}
                />
              ) : null}
            </div>
          </div>
        )}
      </div>
    );
  }
}
