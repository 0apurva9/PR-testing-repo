import React, { Component } from "react";
import styles from "./CliqCashKnowMore.css";

// import { CDN_URL_ROOT } from "../../../src/lib/constants";
import img1 from "./img/cliqcash1.png";
import img2 from "./img/cliqcash2.png";
import img3 from "./img/cliqcash3.png";
import img4 from "./img/cliqcash4.png";
import img5 from "./img/cliqcash5.png";
import img6 from "./img/cliqcash6.png";
import img7 from "./img/cliqcash7.png";
import img8 from "./img/cliqcash8.png";
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
                stepsInfo.map(value => {
                  return (
                    <div className={styles.topContainer}>
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
    img: img1
  },
  {
    id: 2,
    stepNumber: 2,
    stepHeader: "GO TO CLiQ CASH",
    stepDescription:
      "Go to your CLiQ Cash wallet from your TATA CLiQ homepage top navigation",
    img: img2
  },

  {
    id: 3,
    stepNumber: 3,
    stepHeader: "COMPLETE KYC",
    stepDescription: "Verify your Mobile number to complete your KYC",
    img: img3
  },
  {
    id: 4,
    stepNumber: 3,
    stepHeader: "COMPLETE KYC",
    stepDescription: "Verify your Mobile number to complete your KYC",
    img: img4
  },
  {
    id: 5,
    stepNumber: 3,
    stepHeader: "COMPLETE KYC",
    stepDescription: "Verify your Mobile number to complete your KYC",
    img: img5
  },
  {
    id: 6,
    stepNumber: 4,
    stepHeader: "ADD GIFT CARD",
    stepDescription:
      "Add balance to your CLiQ Cash account from the Gift Card received",
    img: img6
  },
  {
    id: 7,
    stepNumber: 4,
    stepHeader: "ADD GIFT CARD",
    stepDescription:
      "Add balance to your CLiQ Cash account from the Gift Card received",
    img: img7
  },
  {
    id: 8,
    stepNumber: 5,
    stepHeader: "PAY WITH CLiQ CASH",
    stepDescription: "Complete your purchase by paying through CLiQ Cash",
    img: img8
  }
];
