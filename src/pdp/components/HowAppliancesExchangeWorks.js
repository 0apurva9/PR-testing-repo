import React from "react";
import styles from "./ExchangeModal.css";
import closeIcon from "../../general/components/img/closeIcon.svg";
import hew1 from "../../pdp/components/img/hew1.svg";
import hew2 from "../../pdp/components/img/hew2.svg";
import hew3 from "../../pdp/components/img/hew3.svg";
import hew4 from "../../pdp/components/img/hew4.svg";
import hew5 from "../../pdp/components/img/hew5.svg";
import PropTypes from "prop-types";

export default class HowAppliancesExchangeWorks extends React.Component {
  hideHowAppliancesExchangeWorks() {
    this.props.hideHowAppliancesExchangeWorks();
  }

  closeAppliancesExchangeModal() {
    this.props.closeAppliancesExchangeModal();
  }

  render() {
    return (
      <div className={styles.appliancesExchangeBase}>
        {!this.props.showBackButton && (
          <img
            src={closeIcon}
            alt="closeIcon"
            className={styles.closeIcon}
            onClick={() => this.closeAppliancesExchangeModal()}
          />
        )}
        <div className={styles.howExchangeWorksContainer}>
          <div className={styles.topContainer}>
            <div className={styles.howExchangeWorksHeading}>
              How exchange works?
              {this.props.showBackButton && (
                <div
                  className={styles.modalForwardArrowContainer}
                  onClick={() => this.hideHowAppliancesExchangeWorks()}
                >
                  Back <div className={styles.modalForwardArrow} />
                </div>
              )}
            </div>
          </div>
          <div className={styles.bottomContainer}>
            <img src={hew1} alt="" className={styles.iconSize} />
            <div className={styles.contentContainer}>
              <div className={styles.contentHeading}>
                1. Share your old appliance details{" "}
              </div>
              <div className={styles.contentDescriptionHEW}>
                Once you have decided which appliance to buy, to view the
                exchange offer,enter the old product details manually{" "}
              </div>
            </div>
            <img src={hew2} alt="" className={styles.iconSize} />
            <div className={styles.contentContainer}>
              <div className={styles.contentHeading}>
                2. Check applicable Exchange Cashback value{" "}
              </div>
              <div className={styles.contentDescriptionHEW}>
                Cashback value is proposed based on the old product details.
              </div>
            </div>
            <img src={hew3} alt="" className={styles.iconSize} />
            <div className={styles.contentContainer}>
              <div className={styles.contentHeading}>
                3. Place the order for your new appliance
              </div>
              <div className={styles.contentDescriptionHEW}>
                Place the order for your new appliance along with exchange
                offer. You will receive the Exchange Cashback through a paylink
                shared by Tata CLiQ team post 5 days of old product pick up.
              </div>
            </div>
            <img src={hew4} alt="" className={styles.iconSize} />
            <div className={styles.contentContainer}>
              <div className={styles.contentHeading}>
                4. Your new appliance would be delivered
              </div>
              <div className={styles.contentDescriptionHEW}>
                Your new appliance order will be delivered as per the scheduled
                post which your exchange order will be processed
              </div>
            </div>
            <img src={hew5} alt="" className={styles.iconSize} />
            <div className={styles.contentContainer}>
              <div className={styles.contentHeading}>
                5. Hand over your old/exchange product
              </div>
              <div className={styles.contentDescriptionHEW}>
                Your old appliance will be picked up separately after successful
                delivery of your new appliance. Please note that AC should be in
                working condition (Powers On) if declared otherwise it will lead
                to cancellation of exchange
              </div>
            </div>
            <img src={hew5} alt="" className={styles.iconSize} />
            <div className={styles.contentContainer}>
              <div className={styles.contentHeading}>
                6. Receive Exchange Cashback
              </div>
              <div className={styles.contentDescriptionHEW}>
                Upon successful pick-up of your old appliance, the Exchange
                Cashback value will be credited to your preferred payment mode
                within 5 business days via paylink shared by Tata CLiQ team
              </div>
            </div>
            <div className={styles.contentHeading}>
              The exchange product will be rejected if,
            </div>
            <div className={styles.contentContainerHEW}>
              <div className={styles.contentDescriptionHEW}>
                a) If the AC was declared as working condition and the AC does
                not power on
              </div>
              <div className={styles.contentDescriptionHEW}>
                b) The brand or capacity is different from what was mentioned by
                you on Tata CLiQ at the time of purchase of your new appliance
              </div>
            </div>
            <div className={styles.contentHeadingHEW}>Questions? / FAQs</div>
            <div className={styles.contentContainerHEW}>
              <div className={styles.contentHeading}>
                1) How do I know if my device is eligible for the Exchange
                Offer?
              </div>
              <div className={styles.contentDescriptionHEW}>
                To verify if your old AC qualifies for the Exchange Offer, check
                the list of eligible devices against the new AC you are buying.
              </div>
            </div>
            <div className={styles.contentContainerHEW}>
              <div className={styles.contentHeading}>
                2) How do I check if exchange is available at my location?
              </div>
              <div className={styles.contentDescriptionHEW}>
                To check if Exchange is available at your location, please check
                the list of pin codes which are serviceable for exchange on the
                "Exchange details" page
              </div>
            </div>
            <div className={styles.contentContainerHEW}>
              <div className={styles.contentHeading}>
                3) How do I avail the Exchange Offer?
              </div>
              <div className={styles.contentDescriptionHEW}>
                Submit your old appliance details, check the proposed Exchange
                Cashback and place order for your new appliance
              </div>
              <div className={styles.contentDescriptionHEW}>
                Pick-up of your old appliance will be scheduled after delivery
                of your new appliance, and you will receive your Exchange
                Cashback within 2 working days of pick-up confirmation.
              </div>
            </div>
            <div className={styles.contentContainerHEW}>
              <div className={styles.contentHeading}>
                4) How do I send my old AC back?
              </div>
              <div className={styles.contentDescriptionHEW}>
                Your old AC will be picked up by us after your new one is
                delivered. Kindly keep your old AC ready by uninstalling the
                same
              </div>
            </div>
            <div className={styles.contentContainerHEW}>
              <div className={styles.contentHeading}>
                5) Should the device be in working condition to qualify for this
                offer?
              </div>
              <div className={styles.contentDescriptionHEW}>
                Yes. The AC needs to be in working condition I.e. Powers On if
                declared during buying and should not be damaged, broken, or
                otherwise tampered with
              </div>
            </div>
            <div className={styles.contentContainerHEW}>
              <div className={styles.contentHeading}>
                6) Can I exchange more than one device towards a purchase?
              </div>
              <div className={styles.contentDescriptionHEW}>
                Yes. You may exchange more than one device at a time however
                each of them should be associated with a new product purchased
                on the site
              </div>
            </div>
            <div className={styles.contentContainerHEW}>
              <div className={styles.contentHeading}>
                7) Can I provide one address for pick up and another for
                delivery?
              </div>
              <div className={styles.contentDescriptionHEW}>
                No. The delivery address and pick-up address must be the same.
              </div>
            </div>
            <div className={styles.contentContainerHEW}>
              <div className={styles.contentHeading}>
                8) In case I wish to return the new AC I bought with the
                Exchange Offer, will my old AC be shipped back to me?
              </div>
              <div className={styles.contentDescriptionHEW}>
                No. Unfortunately, the old AC you have handed over for exchange
                cannot be shipped back to you. We will be refunded the value of
                your new AC after deducting promotional cashback, if any.
              </div>
            </div>
            <div className={styles.contentContainerHEW}>
              <div className={styles.contentHeading}>
                9) Can I hand in a different AC for Exchange?
              </div>
              <div className={styles.contentDescriptionHEW}>
                No. You can only exchange the AC for which you have provided
                details.
              </div>
            </div>
            <div className={styles.contentContainerHEW}>
              <div className={styles.contentHeading}>
                10) Why do I see a pickup charge for availing the exchange
                offer?
              </div>
              <div className={styles.contentDescriptionHEW}>
                When you avail the exchange offer, our courier partner picks up
                your old device right from your doorstep. It is then shipped to
                the seller in lieu of the new device. The pickup charge covers
                pickup from your doorstep, packing and shipping of your old
                device.
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

HowAppliancesExchangeWorks.propTypes = {
  hideHowAppliancesExchangeWorks: PropTypes.func,
  closeAppliancesExchangeModal: PropTypes.func,
  showBackButton: PropTypes.bool
};
