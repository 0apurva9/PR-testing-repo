import React, { Component } from "react";
import SizeTable from "./SizeTable";
import Image from "../../xelpmoc-core/Image";
import styles from "./SizeGuideElementClothing.css";
import MobileOnly from "../../general/components/MobileOnly";
import DesktopOnly from "../../general/components/DesktopOnly";

export default class SizeGuideElementClothing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inchActive: true,
      cmsActive: false
    };
  }

  handleToggleClick = (inch, cms) => {
    this.setState({
      inchActive: inch,
      cmsActive: cms
    });
  };

  render() {
    const sizeGuideList =
      this.props.data && this.props.data.sizeGuideTabularWsData;

    const image = this.props.data && this.props.data.imageURL;
    const imagePosition = this.props.data && this.props.data.imagePosition;
    const tip1 = sizeGuideList && sizeGuideList.tip1;
    const tip2 = sizeGuideList && sizeGuideList.tip2;
    const sizeGuidForCms =
      sizeGuideList &&
      sizeGuideList.unitList &&
      sizeGuideList.unitList.filter(function(data) {
        return data.unit.toUpperCase().match(/^(CMS|CM)$/);
      });
    const sizeGuidForInch =
      sizeGuideList &&
      sizeGuideList.unitList &&
      sizeGuideList.unitList.filter(function(data) {
        return data.unit.toUpperCase().match(/^(INCH|INCHES|IN|INCHE|INC)$/);
      });
    const inch = this.state.inchActive ? styles.inActive : styles.in;
    const cm = this.state.cmsActive ? styles.cmActive : styles.cm;
    let inActiveInch =
      sizeGuidForCms &&
      sizeGuidForCms[0] &&
      sizeGuidForCms[0].sizeGuideList &&
      sizeGuidForCms[0].sizeGuideList.length > 0
        ? true
        : false;
    return (
      <div className={styles.base}>
        <MobileOnly>
          <React.Fragment>
            {sizeGuidForInch[0] &&
            sizeGuidForInch[0].sizeGuideList &&
            sizeGuidForInch[0].sizeGuideList.length > 0 &&
            sizeGuidForCms[0] &&
            sizeGuidForCms[0].sizeGuideList.length > 0 ? (
              <div className={styles.toggleContainer}>
                <div className={styles.toggle}>
                  <div
                    className={inch}
                    onClick={() => this.handleToggleClick(true, false)}
                  >
                    In
                  </div>

                  <div
                    className={cm}
                    onClick={() => this.handleToggleClick(false, true)}
                  >
                    Cm
                  </div>
                </div>
              </div>
            ) : (
              <div className={styles.toggleContainer}>
                <div className={styles.toggle}>
                  <div
                    className={inActiveInch ? styles.disable : styles.inActive}
                  >
                    In
                  </div>
                  <div
                    className={!inActiveInch ? styles.disable : styles.cmActive}
                  >
                    Cm
                  </div>
                </div>
              </div>
            )}
            {imagePosition === 1 ? (
              <div className={styles.imageTop}>
                <SizeTable
                  data={
                    (sizeGuidForInch &&
                      sizeGuidForInch[0] &&
                      sizeGuidForInch[0].sizeGuideList &&
                      !sizeGuidForInch[0].sizeGuideList.length > 0) ||
                    !sizeGuidForInch.length
                      ? sizeGuidForCms && sizeGuidForCms[0]
                      : this.state.inchActive
                        ? sizeGuidForInch && sizeGuidForInch[0]
                        : sizeGuidForCms && sizeGuidForCms[0]
                  }
                />
                <div className={styles.imageHolder}>
                  <div className={styles.image}>
                    <Image fit="contain" image={image} />
                  </div>
                </div>
                {(tip1 || tip2) && (
                  <div className={styles.tipContainer}>
                    <span className={styles.tipHeader}>Tip: </span>
                    {tip1 && <span>Buy a size {tip1} for this brand.</span>}
                    {tip2 && !tip1 && <span>{tip2}</span>}
                    {tip2 && tip1 && <div>{tip2}</div>}
                  </div>
                )}
              </div>
            ) : (
              <div className={styles.imageBottom}>
                <SizeTable
                  data={
                    (sizeGuidForInch &&
                      sizeGuidForInch[0] &&
                      sizeGuidForInch[0].sizeGuideList &&
                      !sizeGuidForInch[0].sizeGuideList.length > 0) ||
                    !sizeGuidForInch.length
                      ? sizeGuidForCms && sizeGuidForCms[0]
                      : this.state.inchActive
                        ? sizeGuidForInch && sizeGuidForInch[0]
                        : sizeGuidForCms && sizeGuidForCms[0]
                  }
                />
                {(tip1 || tip2) && (
                  <div className={styles.tipContainer}>
                    <span className={styles.tipHeader}>Tip: </span>
                    {tip1 && <span>Buy a size {tip1} for this brand.</span>}
                    {tip2 && !tip1 && <span>{tip2}</span>}
                    {tip2 && tip1 && <div>{tip2}</div>}
                  </div>
                )}

                <div className={styles.imageHolder}>
                  <div className={styles.image}>
                    {this.props.brandName == "One Friday" && (
                      <div className={styles.tips}>
                        Tip: Measurements are body measurements
                      </div>
                    )}
                    <Image fit="contain" image={image} />
                  </div>
                </div>
              </div>
            )}
          </React.Fragment>
        </MobileOnly>
        <DesktopOnly>
          <React.Fragment>
            <div className={styles.togglebase}>
              {sizeGuidForInch[0] &&
              sizeGuidForInch[0].sizeGuideList &&
              sizeGuidForInch[0].sizeGuideList.length > 0 &&
              sizeGuidForCms[0] &&
              sizeGuidForCms[0].sizeGuideList.length > 0 ? (
                <div className={styles.toggleContainer}>
                  <div className={styles.toggle}>
                    <div
                      className={inch}
                      onClick={() => this.handleToggleClick(true, false)}
                    >
                      In
                    </div>

                    <div
                      className={cm}
                      onClick={() => this.handleToggleClick(false, true)}
                    >
                      Cm
                    </div>
                  </div>
                </div>
              ) : (
                <div className={styles.toggleContainer}>
                  <div className={styles.toggle}>
                    <div
                      className={
                        inActiveInch ? styles.disable : styles.inActive
                      }
                    >
                      In
                    </div>
                    <div
                      className={
                        !inActiveInch ? styles.disable : styles.cmActive
                      }
                    >
                      Cm
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className={styles.imageAndTipsHolder}>
              {(tip1 || tip2) && (
                <div className={styles.tipContainer}>
                  <span className={styles.tipHeader}>Tip: </span>
                  {tip1 && <span>Buy a size {tip1} for this brand.</span>}
                  {tip2 && !tip1 && <span className={styles.tip}>{tip2}</span>}
                  {tip2 && tip1 && <div className={styles.tip}>{tip2}</div>}
                </div>
              )}
              <div className={styles.imageHolder}>
                <div className={styles.image}>
                  {this.props.brandName == "One Friday" && (
                    <div className={styles.tips}>
                      Tip: Measurements are body measurements
                    </div>
                  )}
                  <Image fit="contain" image={image} />
                </div>
              </div>
            </div>
            <div className={styles.sizeGudeTableHolder}>
              <SizeTable
                data={
                  (sizeGuidForInch &&
                    sizeGuidForInch[0] &&
                    sizeGuidForInch[0].sizeGuideList &&
                    !sizeGuidForInch[0].sizeGuideList.length > 0) ||
                  !sizeGuidForInch.length
                    ? sizeGuidForCms && sizeGuidForCms[0]
                    : this.state.inchActive
                      ? sizeGuidForInch && sizeGuidForInch[0]
                      : sizeGuidForCms && sizeGuidForCms[0]
                }
              />
            </div>
          </React.Fragment>
        </DesktopOnly>
      </div>
    );
  }
}
