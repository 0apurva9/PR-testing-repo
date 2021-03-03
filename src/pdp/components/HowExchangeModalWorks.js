import React from "react";
import styles from "./ExchangeModal.css";
import hew1 from "../../pdp/components/img/hew1.svg";
import hew2 from "../../pdp/components/img/hew2.svg";
import hew3 from "../../pdp/components/img/hew3.svg";
import hew4 from "../../pdp/components/img/hew4.svg";
import hew5 from "../../pdp/components/img/hew5.svg";

export default class HowExchangeModalWorks extends React.Component {
  closeHowExchangeWorksModal() {
    this.props.closeHowExchangeWorksModal();
  }

  render() {
    return (
      <div className={styles.howExchangeWorksContainer}>
        <div className={styles.topContainer}>
          <div
            className={styles.modalBackArrow}
            onClick={() => this.closeHowExchangeWorksModal()}
          />
          <div className={styles.howExchangeWorksHeading}>
            How Exchange works?
          </div>
        </div>
        <div className={styles.bottomContainer}>
          <img src={hew1} alt="" className={styles.iconSize} />
          <div className={styles.contentContainer}>
            <div className={styles.contentHeading}>
              1. Share your old phone details{" "}
            </div>
            <div className={styles.contentDescriptionHEW}>
              Once you have decided which phone to buy, to view the exchange
              offer, allow access to auto-detect your old phone details or enter
              them manually{" "}
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
              3. Place the order for your new phone and select preferred mode to
              get Exchange Cashback
            </div>
            <div className={styles.contentDescriptionHEW}>
              Place the order for your new phone along with exchange offer.
              Remember to select your preferred payment mode for receiving
              Exchange Cashback
            </div>
          </div>
          <img src={hew4} alt="" className={styles.iconSize} />
          <div className={styles.contentContainer}>
            <div className={styles.contentHeading}>
              4. Your new phone would be delivered
            </div>
            <div className={styles.contentDescriptionHEW}>
              Your new phone order will be delivered as per the scheduled post
              which your exchange order will be processed
            </div>
          </div>
          <img src={hew5} alt="" className={styles.iconSize} />
          <div className={styles.contentContainer}>
            <div className={styles.contentHeading}>
              5. Hand over your old/exchange product
            </div>
            <div className={styles.contentDescriptionHEW}>
              Your old phone will be picked up separately after successful
              delivery of your new phone. Please note that the physical
              condition of the old product such as major screen damage, severe
              cracks on body and/or power on or difference in IMEI, issues will
              lead to cancellation of exchange
            </div>
          </div>
          <img src={hew5} alt="" className={styles.iconSize} />
          <div className={styles.contentContainer}>
            <div className={styles.contentHeading}>
              6. Receive Exchange Cashback
            </div>
            <div className={styles.contentDescriptionHEW}>
              Upon successful pick-up of your old phone, the Exchange Cashback
              value will be credited to your preferred payment mode within 2
              business days
            </div>
          </div>
          <div className={styles.contentHeading}>
            The exchange product will be rejected if,
          </div>
          <div className={styles.contentContainerHEW}>
            <div className={styles.contentDescriptionHEW}>
              a) The phone does not power on
            </div>
            <div className={styles.contentDescriptionHEW}>
              b) The brand or model is different from what was mentioned by you
              on Tata CLiQ at the time of purchase of your new phone
            </div>
            <div className={styles.contentDescriptionHEW}>
              c) Screen lock (all forms of screen lock viz. pattern, pin,
              password, fingerprint, face recognition, smart lock, etc. need to
              be deactivated) or iCloud lock (Apple) is not removed
            </div>
            <div className={styles.contentDescriptionHEW}>
              d) IMEI No., on dialing *#06#, does not match with that provided
              by you on Tata CLiQ at the time of purchase of your new phone
            </div>
          </div>
          <div className={styles.contentHeadingHEW}>Questions? / FAQs</div>
          <div className={styles.contentContainerHEW}>
            <div className={styles.contentHeading}>
              1) How do I know if my device is eligible for the Exchange Offer?
            </div>
            <div className={styles.contentDescriptionHEW}>
              To verify if your old phone qualifies for the Exchange Offer,
              check the list of eligible devices against the new phone you are
              buying.
            </div>
          </div>
          <div className={styles.contentContainerHEW}>
            <div className={styles.contentHeading}>
              2) How do I avail the Exchange Offer?
            </div>
            <div className={styles.contentDescriptionHEW}>
              Submit your old phone details, check the proposed Exchange
              Cashback and place order for your new phone. Pick-up of your old
              phone will be scheduled after delivery of your new phone, and you
              will receive your Exchange Cashback within 2 working days of
              pick-up confirmation.
            </div>
          </div>
          <div className={styles.contentContainerHEW}>
            <div className={styles.contentHeading}>
              3) How do I send my old phone back?
            </div>
            <div className={styles.contentDescriptionHEW}>
              Your old phone will be picked up by us after your new one is
              delivered. Kindly keep your old phone ready with all your data
              backed up, and screen lock, iCloud account lock removed on your
              device.
            </div>
          </div>
          <div className={styles.contentContainerHEW}>
            <div className={styles.contentHeading}>
              4) How do I find the IMEI number of my mobile phone?
            </div>
            <div className={styles.contentDescriptionHEW}>
              The IMEI number can be found by dialing <i>*#06#</i> on your phone
            </div>
          </div>
          <div className={styles.contentContainerHEW}>
            <div className={styles.contentHeading}>
              5) The phone I&apos;m exchanging is a dual SIM device. Do I have to
              provide both the IMEI numbers while filling the Exchange Offer
              form?
            </div>
            <div className={styles.contentDescriptionHEW}>
              You need to mention only one of the IMEI numbers while filling the
              form.
            </div>
          </div>
          <div className={styles.contentContainerHEW}>
            <div className={styles.contentHeading}>
              6) Should the device be in working condition to qualify for this
              offer?
            </div>
            <div className={styles.contentDescriptionHEW}>
              Yes. The phone needs to be in working condition. It also needs to
              have all screen locks disabled and the iCloud Account unlocked to
              enable pick-up by our partners.
            </div>
          </div>
          <div className={styles.contentContainerHEW}>
            <div className={styles.contentHeading}>
              7) Can I exchange more than one device towards a purchase?
            </div>
            <div className={styles.contentDescriptionHEW}>
              No. You may only exchange one device at a time.
            </div>
          </div>
          <div className={styles.contentContainerHEW}>
            <div className={styles.contentHeading}>
              8) Can I provide one address for pick up and another for delivery?
            </div>
            <div className={styles.contentDescriptionHEW}>
              No. The delivery address and pick-up address must be the same.
            </div>
          </div>
          <div className={styles.contentContainerHEW}>
            <div className={styles.contentHeading}>
              9) In case I wish to return the new phone I bought with the
              Exchange Offer, will my old phone be shipped back to me?
            </div>
            <div className={styles.contentDescriptionHEW}>
              No. Unfortunately, the old phone you have handed over for exchange
              cannot be shipped back to you. We will be refunded the value of
              your new phone after deducting promotional cashback, if any.
            </div>
          </div>
          <div className={styles.contentContainerHEW}>
            <div className={styles.contentHeading}>
              10) Can I hand in a different phone for Exchange?
            </div>
            <div className={styles.contentDescriptionHEW}>
              No. You can only exchange the phone for which you have provided
              details.
            </div>
          </div>
          <div className={styles.contentContainerHEW}>
            <div className={styles.contentHeading}>
              11) Any pointers to keep in mind before I exchange my phone?
            </div>
            <div className={styles.contentDescriptionHEW}>
              Kindly ensure all your data is backed up and cleared from your old
              phone before handing over for exchange. You may also remove any
              external memory card. TATACLiQ.comor the logistic partner will not
              be responsible for any misuse of your data as a result. In the
              event the device is not working, or the pick-up executive is not
              able to do an iCloud unlock check, screen lock check and IMEI
              check due to your phone being &quot;factory reset&quot; the exchange may not
              go through.
            </div>
          </div>
          <div className={styles.contentContainerHEW}>
            <div className={styles.contentHeading}>
              12) Why do I see a pickup charge for availing the exchange offer?
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
    );
  }
}
