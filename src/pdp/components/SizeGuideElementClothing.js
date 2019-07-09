import React, { Component } from "react";
import SizeTable from "./SizeTable";
import Image from "../../xelpmoc-core/Image";
import styles from "./SizeGuideElementClothing.css";
import MobileOnly from "../../general/components/MobileOnly";
import DesktopOnly from "../../general/components/DesktopOnly";

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
        <MobileOnly>
          {image && image[0] && image[0].imagePosition === 0 ? (
            <div className={styles.imageTop}>
              <div className={styles.imageHolder}>
                <div className={styles.image}>
                  <Image
                    fit="contain"
                    image={image && image[0] && image.imageURL}
                  />
                </div>
              </div>
              {tip1 && (
                <div className={styles.tipContainer}>
                  <span className={styles.tipHeader}>Tip:</span> Buy a size{" "}
                  {tip1} for this brand.
                  {tip2 && <div>{tip2}</div>}
                </div>
              )}

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
              {(tip1 || tip2) && (
                <div className={styles.tipContainer}>
                  <span className={styles.tipHeader}>Tip:</span> Buy a size{" "}
                  {tip1 && tip1} for this brand.{tip2 && tip2}
                </div>
              )}

              <div className={styles.imageHolder}>
                <div className={styles.image}>
                  <Image fit="contain" image={image} />
                </div>
              </div>
            </div>
          )}
        </MobileOnly>
        <DesktopOnly>
          <div className={styles.imageAndTipsHolder}>
            {(tip1 || tip2) && (
              <div className={styles.tipContainer}>
                Tip: Buy a size {tip1 && tip1} for this brand.
                <div>{tip2 && tip2}</div>
              </div>
            )}
            <div className={styles.imageHolder}>
              <div className={styles.image}>
                <Image fit="contain" image={image} />
              </div>
            </div>
          </div>
          <div className={styles.sizeGudeTableHolder}>
            <SizeTable
              data={
                this.props.showInch
                  ? sizeGuidForInch && sizeGuidForInch[0]
                  : sizeGuidForCms && sizeGuidForCms[0]
              }
            />
          </div>
        </DesktopOnly>
      </div>
    );
  }
}
