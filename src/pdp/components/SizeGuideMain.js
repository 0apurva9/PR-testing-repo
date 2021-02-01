import React from "react";
import styles from "./SizeGuideMain.css";
import Image from "../../xelpmoc-core/Image";
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
      isOpen: 0
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
    if (this.props.loading) {
      return <Loader />;
    }
    if (
      this.props.sizeData &&
      (this.props.sizeData.sizeGuideList ||
        (this.props.sizeData.sizeGuideTabularWsData &&
          this.props.sizeData.sizeGuideTabularWsData.unitList))
    ) {
      return (
        <div className={styles.base}>
          <div className={styles.header}>
            {this.props.productName} Size Guide
          </div>
          <div className={styles.imageWithSize}>
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
                    brandName={this.props.brandName}
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
            {(this.props.category === "Footwear" ||
              this.props.category === "Accessories") && (
              <DesktopOnly>
                <div
                  className={
                    this.props.category === "Footwear"
                      ? styles.imageHolderFootwear
                      : styles.imageHolder
                  }
                >
                  <div className={styles.image}>
                    <Image fit="contain" image={this.props.sizeData.imageURL} />
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
