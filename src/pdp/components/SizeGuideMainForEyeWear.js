import React from "react";
import styles from "./SizeGuideMainForEyeWear.css";
import Image from "../../xelpmoc-core/Image";
import Loader from "../../general/components/Loader";
//import SizeTableForEyeWear from './SizeTableForEyeWear';
import SizeTableForEyeWearChangedJson from "./SizeTableForEyeWearChangedJson";

export default class SizeGuideMainForEyeWear extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: 0
    };
  }

  componentDidMount() {
    this.props.getSizeGuide(this.props.productCode);
  }

  render() {
    if (this.props.loading) {
      return <Loader />;
    }
    if (
      this.props.sizeData &&
      this.props.sizeData.sizeGuideList &&
      this.props.sizeData.sizeGuideHeader
    ) {
      return (
        <div className={styles.base}>
          <div className={styles.header}>Eyewear Size Chart</div>
          <div className={styles.container}>
            {this.props.sizeData.sizeGuideHeader.header1 && (
              <div className={styles.creditCardMethod}>
                {this.props.sizeData.sizeGuideHeader.header1}
              </div>
            )}
            {this.props.sizeData.sizeGuideHeader.header1Text && (
              <div className={styles.creditMethodHeader}>
                {this.props.sizeData.sizeGuideHeader.header1Text}
              </div>
            )}
            <div className={styles.imageHolderContainer}>
              <div className={styles.imageHolder}>
                {this.props.sizeData.sizeGuideHeader.image1Url && (
                  <div className={styles.image}>
                    <Image
                      fit="contain"
                      image={this.props.sizeData.sizeGuideHeader.image1Url}
                    />
                  </div>
                )}
                {this.props.sizeData.sizeGuideHeader.image1UrlText && (
                  <div className={styles.imageTextCss}>
                    {this.props.sizeData.sizeGuideHeader.image1UrlText}
                  </div>
                )}
              </div>
              <div className={styles.imageHolder}>
                {this.props.sizeData.sizeGuideHeader.image2Url && (
                  <div className={styles.image}>
                    <Image
                      fit="contain"
                      image={this.props.sizeData.sizeGuideHeader.image2Url}
                    />
                  </div>
                )}
                {this.props.sizeData.sizeGuideHeader.image2UrlText && (
                  <div className={styles.imageTextCss}>
                    {this.props.sizeData.sizeGuideHeader.image2UrlText}
                  </div>
                )}
              </div>
              <div className={styles.imageHolder}>
                {this.props.sizeData.sizeGuideHeader.image3Url && (
                  <div className={styles.image}>
                    <Image
                      fit="contain"
                      image={this.props.sizeData.sizeGuideHeader.image3Url}
                    />
                  </div>
                )}
                {this.props.sizeData.sizeGuideHeader.image3UrlText && (
                  <div className={styles.imageTextCss}>
                    {this.props.sizeData.sizeGuideHeader.image3UrlText}
                  </div>
                )}
              </div>
            </div>
            {this.props.sizeData.sizeGuideHeader.header2 && (
              <div className={styles.eyeGlasses}>
                {this.props.sizeData.sizeGuideHeader.header2}
              </div>
            )}
            {this.props.sizeData.sizeGuideHeader.header2Text && (
              <div className={styles.eyeGlassesHeader}>
                {this.props.sizeData.sizeGuideHeader.header2Text}
              </div>
            )}
            {this.props.sizeData.imageURL && (
              <div className={styles.eyeGlassesImage}>
                <div className={styles.image}>
                  <Image fit="contain" image={this.props.sizeData.imageURL} />
                </div>
              </div>
            )}
            <div className={styles.tableHeader}>LENS WIDTH & FRAME SIZE</div>
            <div className={styles.sizeGuideTableHolder}>
              <SizeTableForEyeWearChangedJson data={this.props.sizeData} />
            </div>
            {this.props.sizeData.sizeGuideHeader.footerText && (
              <div className={styles.sizeTableText}>
                {this.props.sizeData.sizeGuideHeader.footerText}
              </div>
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
