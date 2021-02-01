import React, { Component } from "react";
import styles from "./CliqCashKnowMore.css";
import { CDN_URL_ROOT } from "../../../src/lib/constants";
import Image from "../../xelpmoc-core/Image";
import CliqCashKnowMoreSlider from "./CliqCashKnowMoreSlider";

class CliqCashKnowMore extends Component {
  render() {
    return (
      <div className={styles.baseWrapper}>
        <div className={styles.base}>
          <div className={styles.sliderWrapper}>
            <CliqCashKnowMoreSlider stepsInfo={stepsInfo} {...this.props}>
              {stepsInfo &&
                stepsInfo.map((value, index) => {
                  return (
                    <div className={styles.topContainer} key={`key${index}`}>
                      <div className={styles.innerImage}>
                        <Image image={value.img} />
                      </div>
                    </div>
                  );
                })}
            </CliqCashKnowMoreSlider>
          </div>
        </div>
      </div>
    );
  }
}

export default CliqCashKnowMore;

const stepsInfo = [
  {
    id: 1,
    stepNumber: 1,
    stepHeader: "LOG IN",
    stepDescription:
      "Log in or sign up using your  email ID or Facebook, Google to your TATA CLiQ account.",
    img: `${CDN_URL_ROOT}cliqcash_desktop_2x8.png`
  },
  {
    id: 2,
    stepNumber: 2,
    stepHeader: "GO TO CLiQ CASH",
    stepDescription:
      "Go to your CLiQ Cash wallet from your TATA CLiQ homepage top navigation",
    img: `${CDN_URL_ROOT}cliqcash_desktop_2x1.png`
  },

  {
    id: 3,
    stepNumber: 3,
    stepHeader: "COMPLETE KYC",
    stepDescription: "Verify your Mobile number to complete your KYC",
    img: `${CDN_URL_ROOT}cliqcash_desktop_2x5.png`
  },
  {
    id: 4,
    stepNumber: 3,
    stepHeader: "COMPLETE KYC",
    stepDescription: "Verify your Mobile number to complete your KYC",
    img: `${CDN_URL_ROOT}cliqcash_desktop_2x3.png`
  },
  {
    id: 5,
    stepNumber: 3,
    stepHeader: "COMPLETE KYC",
    stepDescription: "Verify your Mobile number to complete your KYC",
    img: `${CDN_URL_ROOT}cliqcash_desktop_2x2.png`
  },
  {
    id: 6,
    stepNumber: 4,
    stepHeader: "ADD GIFT CARD",
    stepDescription:
      "Add balance to your CLiQ Cash account from the Gift Card received",
    img: `${CDN_URL_ROOT}cliqcash_desktop_2x4.png`
  },
  {
    id: 7,
    stepNumber: 4,
    stepHeader: "ADD GIFT CARD",
    stepDescription:
      "Add balance to your CLiQ Cash account from the Gift Card received",
    img: `${CDN_URL_ROOT}cliqcash_desktop_2x6.png`
  },
  {
    id: 8,
    stepNumber: 5,
    stepHeader: "PAY WITH CLiQ CASH",
    stepDescription: "Complete your purchase by paying through CLiQ Cash",
    img: `${CDN_URL_ROOT}cliqcash_desktop_2x7.png`
  }
];
