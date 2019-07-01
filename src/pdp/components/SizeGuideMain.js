import React from "react";
import SizeGuideElement from "./SizeGuideElement";
import styles from "./SizeGuideMain.css";
import Image from "../../xelpmoc-core/Image";
import Accordion from "../../general/components/Accordion.js";
import Loader from "../../general/components/Loader";
import SizeGuideElementFootwear from "./SizeGuideElementFootwear";
import SizeGuideElementBelt from "./SizeGuideElementBelt";
import MobileOnly from "../../general/components/MobileOnly";
import DesktopOnly from "../../general/components/DesktopOnly";
import SizeGuideElementClothing from "./SizeGuideElementClothing";
export default class SizeGuideMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: 0,
      inchActive: true,
      cmsActive: false
    };
  }
  componentDidMount() {
    if (
      this.props.category === "Footwear" ||
      this.props.category === "Accessories"
    ) {
      this.props.getSizeGuide(this.props.productCode);
    } else {
      this.props.getProductSizeChart(this.props.productCode);
    }
  }
  toggleView(val) {
    this.setState({ isOpen: val });
  }
  render() {
    const inch = this.state.inchActive ? styles.inActive : styles.in;
    const cm = this.state.cmsActive ? styles.cmActive : styles.cm;

    if (this.props.loading) {
      return <Loader />;
    }
    if (
      this.props.sizeData &&
      (this.props.sizeData.sizeGuideList ||
        this.props.sizeData.sizeGuideTabularWsData)
    ) {
      return (
        <div className={styles.base}>
          <div className={styles.header}>
            {this.props.productName} Size Guide
          </div>
          <div className={styles.imageWithSize}>
            {this.props.category !== "Footwear" &&
              this.props.category !== "Accessories" && (
                <div className={styles.togglebase}>
                  <DesktopOnly>
                    <div className={styles.subHeading} />
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
                  </DesktopOnly>
                  <MobileOnly>
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
                  </MobileOnly>
                </div>
              )}
            <MobileOnly>
              {this.props.category === "Footwear" &&
                this.props.category === "Accessories" && (
                  <div className={styles.imageHolder}>
                    <div className={styles.image}>
                      <Image
                        fit="contain"
                        image={this.props.sizeData.imageURL}
                      />
                    </div>
                  </div>
                )}
            </MobileOnly>
            {this.props.category !== "Footwear" &&
              this.props.category !== "Accessories" && (
                <div className={styles.sizeListColthing} id="currentOpenSize">
                  <SizeGuideElementClothing
                    data={this.props.sizeData}
                    category={this.props.category}
                    showInch={this.state.inchActive}
                    showCms={this.state.cmsActive}
                  />
                </div>
              )}
            {this.props.category === "Footwear" &&
              this.props.sizeData.sizeGuideList && (
                <div className={styles.sizeListFootwear}>
                  {this.props.sizeData.sizeGuideList.map((list, i) => {
                    return (
                      <SizeGuideElementFootwear
                        data={list.dimensionList}
                        key={i}
                      />
                    );
                  })}
                </div>
              )}
            {this.props.category === "Accessories" &&
              this.props.sizeData.sizeGuideList && (
                <div className={styles.sizeList}>
                  {this.props.sizeData.sizeGuideList.map((list, i) => {
                    return (
                      <SizeGuideElementBelt data={list.dimensionList} key={i} />
                    );
                  })}
                </div>
              )}
            {this.props.category === "Footwear" &&
              this.props.category === "Accessories" && (
                <DesktopOnly>
                  <div
                    className={
                      this.props.category === "Footwear"
                        ? styles.imageHolderFootwear
                        : styles.imageHolder
                    }
                  >
                    <div className={styles.image}>
                      <Image
                        fit="contain"
                        image={this.props.sizeData.imageURL}
                      />
                    </div>
                  </div>
                </DesktopOnly>
              )}
          </div>
        </div>
      );
    } else {
      return (
        <div className={styles.noSizeGuideHolder}>
          <div className={styles.noSizeGuide}>No Size Guide Available</div>
        </div>
      );
    }
  }
}
