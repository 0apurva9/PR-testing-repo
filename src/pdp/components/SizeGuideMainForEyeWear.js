import React from "react";
import styles from "./SizeGuideMainForEyeWear.css";
import Image from "../../xelpmoc-core/Image";
import Loader from "../../general/components/Loader";
//import SizeTableForEyeWear from './SizeTableForEyeWear';
import SizeTableForEyeWearChangedJson from "./SizeTableForEyeWearChangedJson";

const json = {
  type: "sizeGuideWsDTO",
  status: "Success",
  imageURL:
    "https://assets.tatacliq.com/medias/sys_master/images/11781658771486.jpg",
  Guideadvisor: [
    {
      header1: "1.Buying an Eyeglass for the first time?",
      header1Text:
        "Take a credit/debit card and stand infront of a mirror.Put the edge of the card at the center of your nose and make a note of where the other edge ends",
      header2: "2.Have an existing Eyeglass?",
      header2Text:
        "You can easily find the size of your frame on the inner side of your eyeglass temples/arm pieces.Below is a quick guide to help you identify your eyeglasses.",
      image1Url:
        "https://assets.tatacliq.com/medias/sys_master/images/11034180288542.jpg",
      image1UrlText:
        "If the card extends beyond the end of the eye, you should buy SMALL SIZE",
      image2Url:
        "https://assets.tatacliq.com/medias/sys_master/images/11034180288542.jpg",
      image2UrlText:
        "If the card touches the end of the eye approximately, you should buy MEDIUM SIZE",
      image3Url:
        "https://assets.tatacliq.com/medias/sys_master/images/11034180288542.jpg",
      image3UrlText:
        "If the card finishes before the end of the eye, you should buy LARGE SIZE",
      footerText: "Frame size based on lens width"
    }
  ],
  sizeGuideList: {
    dimensionList: [
      {
        dimension: "EYEGLASSES",
        dimensionSize: "small",
        dimensionUnit: "mm",
        dimensionValue: "Below 48"
      },
      {
        dimension: "SUNGLASSES",
        dimensionSize: "small",
        dimensionUnit: "mm",
        dimensionValue: "Below 48"
      },
      {
        dimension: "EYEGLASSES",
        dimensionSize: "medium",
        dimensionUnit: "mm",
        dimensionValue: "48 to 55"
      },
      {
        dimension: "SUNGLASSES",
        dimensionSize: "medium",
        dimensionUnit: "mm",
        dimensionValue: "48 to 55"
      },
      {
        dimension: "EYEGLASSES",
        dimensionSize: "large",
        dimensionUnit: "mm",
        dimensionValue: "Above 55"
      },
      {
        dimension: "SUNGLASSES",
        dimensionSize: "large",
        dimensionUnit: "mm",
        dimensionValue: "Above 55"
      }
    ]
  }
  // 	sizeGuideList: [{
  // 	dimensionList: [
  // 		{
  // 			dimension: 'eyeglasses',
  // 			dimensionValue: 'Below 48',
  // 			dimensionUnit: 'mm',
  // 		},
  // 		{
  // 			dimension: 'sunglasses',
  // 			dimensionValue: 'Below 48',
  // 			dimensionUnit: 'mm',
  // 		},
  // 	],
  // 	dimensionSize: 'Small',
  // },
  // {
  // 	dimensionList: [
  // 		{
  // 			dimension: 'eyeglasses',
  // 			dimensionValue: '48 to 55',
  // 			dimensionUnit: 'mm',
  // 		},
  // 		{
  // 			dimension: 'sunglasses',
  // 			dimensionValue: '48 to 55',
  // 			dimensionUnit: 'mm',
  // 		},
  // 	],
  // 	dimensionSize: 'Medium',
  // },
  // {
  // 	dimensionList: [
  // 		{
  // 			dimension: 'eyeglasses',
  // 			dimensionValue: 'Above 55',
  // 			dimensionUnit: 'mm',
  // 		},
  // 		{
  // 			dimension: 'sunglasses',
  // 			dimensionValue: 'Above 55',
  // 			dimensionUnit: 'mm',
  // 		},
  // 	],
  // 	dimensionSize: 'Large',
  // },
  // ],
};
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
    if (this.props.sizeData && this.props.sizeData.sizeGuideList) {
      return (
        <div className={styles.base}>
          <div className={styles.header}>Eyewear Size Chart</div>
          <div className={styles.container}>
            <div className={styles.creditCardMethod}>CREDIT CARD METHOD</div>
            <div className={styles.creditMethodHeader}>
              Get a credit/debit card & stand in front of a mirror. Put an edge
              of the card at the center of your nose. Make a note of where the
              other edge ends
            </div>
            <div className={styles.imageHolderContainer}>
              <div className={styles.imageHolder}>
                <div className={styles.image}>
                  <Image fit="contain" image={json.Guideadvisor[0].image1Url} />
                </div>
                <div className={styles.imageTextCss}>
                  {json.Guideadvisor[0].image1UrlText}
                </div>
              </div>
              <div className={styles.imageHolder}>
                <div className={styles.image}>
                  <Image fit="contain" image={json.Guideadvisor[0].image2Url} />
                </div>
                <div className={styles.imageTextCss}>
                  {json.Guideadvisor[0].image2UrlText}
                </div>
              </div>
              <div className={styles.imageHolder}>
                <div className={styles.image}>
                  <Image fit="contain" image={json.Guideadvisor[0].image3Url} />
                </div>
                <div className={styles.imageTextCss}>
                  {json.Guideadvisor[0].image3UrlText}
                </div>
              </div>
            </div>
            <div className={styles.eyeGlasses}>
              {json.Guideadvisor[0].header2}
            </div>
            <div className={styles.eyeGlassesHeader}>
              {json.Guideadvisor[0].header2Text}
            </div>
            <div className={styles.eyeGlassesImage}>
              <div className={styles.image}>
                <Image fit="contain" image={json.imageURL} />
              </div>
            </div>
            <div className={styles.sizeTableText}>
              {json.Guideadvisor[0].footerText}
            </div>
            <div className={styles.sizeGuideTableHolder}>
              <SizeTableForEyeWearChangedJson data={json} />
            </div>
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
