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
export default class SizeGuideMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: 0
    };
  }
  componentDidMount() {
    this.props.getSizeGuide(this.props.productCode);
  }
  toggleView(val) {
    this.setState({ isOpen: val }, () => {
      if (this.state.isOpen) {
        let scroll = document.getElementById("currentOpenSize");
        scroll.scrollIntoView();
      }
    });
  }
  render() {
    if (this.props.loading) {
      return <Loader />;
    }
    if (this.props.sizeData && this.props.sizeData.sizeGuideList) {
      return (
        <div className={styles.base}>
          <div className={styles.header}>
            {this.props.productName} Size Guide
          </div>
          <div className={styles.imageWithSize}>
            <MobileOnly>
              <div className={styles.imageHolder}>
                <div className={styles.image}>
                  <Image fit="contain" image={this.props.sizeData.imageURL} />
                </div>
              </div>
            </MobileOnly>
            {this.props.category !== "Footwear" &&
              this.props.category !== "Accessories" &&
              this.props.sizeData.sizeGuideList && (
                <div className={styles.sizeList} id="currentOpenSize">
                  {this.props.sizeData.sizeGuideList.map((list, i) => {
                    return (
                      <Accordion
                        text={list.dimensionSize}
                        key={i}
                        offset={20}
                        activeBackground="#f8f8f8"
                        isOpen={this.state.isOpen === i}
                        onOpen={() => {
                          this.toggleView(i);
                        }}
                      >
                        {this.props.category !== "Footwear" && (
                          <SizeGuideElement
                            data={list.dimensionList}
                            category={this.props.category}
                          />
                        )}
                      </Accordion>
                    );
                  })}
                </div>
              )}
            {this.props.category === "Footwear" &&
              this.props.sizeData.sizeGuideList && (
                <div className={styles.sizeList}>
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
            <DesktopOnly>
              <div className={styles.imageHolder}>
                <div className={styles.image}>
                  <Image fit="contain" image={this.props.sizeData.imageURL} />
                </div>
              </div>
            </DesktopOnly>
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
