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
      cmsActive: false,
      hideToggle: false
    };
  }
  render() {
    const sizeGudeList =
      this.props.data && this.props.data.sizeGuideTabularWsData;

    const image = this.props.data && this.props.data.imageURL;
    const imagePosition = this.props.data && this.props.data.imagePosition;
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
    const inch = this.state.inchActive ? styles.inActive : styles.in;
    const cm = this.state.cmsActive ? styles.cmActive : styles.cm;
    return (
      <div className={styles.base}>
        <MobileOnly>
          <React.Fragment>
            {sizeGuidForInch.length > 0 &&
              sizeGuidForCms.length > 0 && (
                <div className={styles.togglebase}>
                  <div className={styles.toggle}>
                    <div
                      className={inch}
                      onClick={() => {
                        this.setState({ inchActive: true, cmsActive: false });
                      }}
                    >
                      In
                    </div>

                    <div
                      className={cm}
                      onClick={() => {
                        this.setState({ cmsActive: true, inchActive: false });
                      }}
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
                    !sizeGuidForInch.length > 0
                      ? sizeGuidForCms && sizeGuidForCms[0]
                      : this.state.showInch
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
                    <span className={styles.tipHeader}>Tip:</span>
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
                    !sizeGuidForInch.length > 0
                      ? sizeGuidForCms && sizeGuidForCms[0]
                      : this.state.showInch
                        ? sizeGuidForInch && sizeGuidForInch[0]
                        : sizeGuidForCms && sizeGuidForCms[0]
                  }
                />
                {(tip1 || tip2) && (
                  <div className={styles.tipContainer}>
                    <span className={styles.tipHeader}>Tip:</span>
                    {tip1 && <span>Buy a size {tip1} for this brand.</span>}
                    {tip2 && !tip1 && <span>{tip2}</span>}
                    {tip2 && tip1 && <div>{tip2}</div>}
                  </div>
                )}

                <div className={styles.imageHolder}>
                  <div className={styles.image}>
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
              {!this.state.hideToggle && (
                <div className={styles.toggleContainer}>
                  <div className={styles.toggle}>
                    <div
                      className={inch}
                      onClick={() => {
                        this.setState({
                          inchActive: true,
                          cmsActive: false
                        });
                      }}
                    >
                      In
                    </div>

                    <div
                      className={cm}
                      onClick={() => {
                        this.setState({
                          cmsActive: true,
                          inchActive: false
                        });
                      }}
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
                  Tip: {tip1 && <span>Buy a size {tip1} for this brand.</span>}
                  {tip2 && !tip1 && <span>{tip2}</span>}
                  {tip2 && tip1 && <div>{tip2}</div>}
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
                  !sizeGuidForInch.length > 0
                    ? sizeGuidForCms && sizeGuidForCms[0]
                    : this.state.showInch
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
