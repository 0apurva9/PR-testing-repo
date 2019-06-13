import React, { Component } from "react";
import SizeTable from "./SizeTable";
import Image from "../../xelpmoc-core/Image";
import styles from "./SizeGuideElementClothing.css";

export default class SizeGuideElementClothing extends Component {
  render() {
    const sizeGudeList =
      this.props.data && this.props.data.sizeGuideTabularWsData;

    const image = this.props.data && this.props.data.imageURL;
    const tip1 = sizeGudeList && sizeGudeList.tip1;
    const tip2 = sizeGudeList && sizeGudeList.tip2;
    const sizeGuidForCms =
      sizeGudeList &&
      sizeGudeList.unitList &&
      sizeGudeList.unitList.filter(function(data) {
        return data.unit.toUpperCase().match(/^(CMS|CM)$/);
      });
    const sizeGuidForInch =
      sizeGudeList &&
      sizeGudeList.unitList &&
      sizeGudeList.unitList.filter(function(data) {
        return data.unit.toUpperCase().match(/^(INCH|INCHES|IN|INCHE)$/);
      });
    return (
      <div className={styles.base}>
        {image && image[0] && image[0].imagePosition === 0 ? (
          <div className={styles.imageTop}>
            <div className={styles.imageHolder}>
              <div className={styles.image}>
                <Image
                  fit="contain"
                  image={image && image[0] && image[0].imageURL}
                />
              </div>
            </div>
            <div className={styles.tipContainer}>
              <span className={styles.tipHeader}>Tip:</span> Buy a size{" "}
              {tip1 && tip1} for this brand.{tip2 && tip2}
            </div>
            <SizeTable
              data={
                this.props.showInch
                  ? sizeGuidForInch && sizeGuidForInch[0]
                  : sizeGuidForCms && sizeGuidForCms[0]
              }
            />
          </div>
        ) : (
          <div className={styles.imageBottom}>
            <SizeTable
              data={
                this.props.showInch
                  ? sizeGuidForInch && sizeGuidForInch[0]
                  : sizeGuidForCms && sizeGuidForCms[0]
              }
            />
            <div className={styles.tipContainer}>
              <span className={styles.tipHeader}>Tip:</span> Buy a size{" "}
              {tip1 && tip1} for this brand.{tip2 && tip2}
            </div>
            <div className={styles.imageHolder}>
              <div className={styles.image}>
                <Image fit="contain" image={image} />
              </div>
            </div>
          </div>
        )}
        <div className={styles.noteContainer}>
          <div className={styles.noteHeader}>How to Measure</div>
          <div className={styles.noteContent}>
            Always keep the measuring tape parallel to the floor and ensure that
            you are only wearing undergarments while measuring yourself.
            Outerwear could affect the accuracy of the readings
          </div>
        </div>
      </div>
    );
  }
}
