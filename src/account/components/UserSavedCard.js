import React from "react";
import * as Cookie from "../../lib/Cookie";
import {
  CUSTOMER_ACCESS_TOKEN,
  LOGGED_IN_USER_DETAILS,
  SAVED_PAYMENTS
} from "../../lib/constants";
import SavedPaymentCard from "./SavedPaymentCard.js";
import styles from "./UserSavedCard.css";
import visaLogo from "../../cart/components/img/Visa.svg";
import masterLogo from "../../cart/components/img/Master.svg";
import amexLogo from "../../cart/components/img/amex.svg";
import repayLogo from "../../cart/components/img/rupay.svg";
import dinersLogo from "../../cart/components/img/diners.svg";
import discoverLogo from "../../cart/components/img/discover.svg";
import jcbLogo from "../../cart/components/img/jcb.svg";
import {
  RUPAY_CARD,
  VISA_CARD,
  MASTER_CARD,
  AMEX_CARD,
  MESTRO_CARD,
  DINERS_CARD,
  DISCOVER_CARD,
  JCB_CARD,
  MASTER
} from "../../lib/constants";
import DesktopOnly from "../../general/components/DesktopOnly";
import ProfileMenu from "./ProfileMenu";
import * as myAccountStyles from "./MyAccountDesktop.css";
import UserProfile from "./UserProfile";
import SavedPaymentUpi from "./SavedPaymentUpi";
import TabHolder from "./TabHolder";
import TabData from "./TabData";
import Button from "../../xelpmoc-core/Button";
import MyAccountUpiForm from "./MyAccountUpiForm";
const CARD_FORMAT = /\B(?=(\d{4})+(?!\d))/g;
const NO_SAVED_CARDS = "No Saved Cards";
export default class UserSavedCard extends React.Component {
  /**
   * @author Prashant Kumar
   * @param Boolean isSavedCardTab If 0 then "Saved Card" tab will be active and vice versa
   */
  constructor(props) {
    super(props);
    this.state = {
      isSavedCardTab: 0,
      showAddNewUpi: 1
    };
  }
  tabSelect(val) {
    this.setState({ isSavedCardTab: val });
  }
  /**
   * EOD
   */
  getCardLogo(cardType) {
    switch (cardType) {
      case VISA_CARD:
        return visaLogo;
      case MASTER_CARD:
        return masterLogo;
      case AMEX_CARD:
        return amexLogo;
      case RUPAY_CARD:
        return repayLogo;
      case MESTRO_CARD:
        return masterLogo;
      case DINERS_CARD:
        return dinersLogo;
      case DISCOVER_CARD:
        return discoverLogo;
      case JCB_CARD:
        return jcbLogo;
      case MASTER:
        return masterLogo;
      default:
        return false;
    }
  }

  componentDidMount() {
    document.title = "My Saved Cards ";
    this.props.setHeaderText(SAVED_PAYMENTS);
    let customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
    let userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    if (customerCookie && userDetails) {
      if (this.props.getSavedCardDetails) {
        this.props.getSavedCardDetails(
          JSON.parse(userDetails).userName,
          JSON.parse(customerCookie).access_token
        );
      }
    }
  }

  componentDidUpdate() {
    this.props.setHeaderText(SAVED_PAYMENTS);
  }
  removeSavedCardDetails = cardToken => {
    if (this.props.removeSavedCardDetails) {
      this.props.removeSavedCardDetails(cardToken);
    }
  };
  /**
   * @author Prashant Kumar
   * @comment Added function to removed the UPI of the customer
   */
  removeSavedUpiDetails = upiId => {
    if (this.props.removeSavedUpiDetails) {
      this.props.removeSavedUpiDetails(upiId);
    }
  };
  toggleForAddNewUpi = val => {
    this.setState({
      showAddNewUpi: val
    });
  };
  /**
   * EOD
   */
  render() {
    let userData;
    const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    if (userDetails) {
      userData = JSON.parse(userDetails);
    }
    if (this.props.profile.loading) {
      this.props.showSecondaryLoader();
    } else {
      this.props.hideSecondaryLoader();
    }
    if (
      this.props.profile.savedCards &&
      this.props.profile.savedCards.savedCardDetailsMap
    ) {
      return (
        <div className={styles.base}>
          <div className={myAccountStyles.holder}>
            <DesktopOnly>
              <div className={myAccountStyles.profileMenu}>
                <ProfileMenu {...this.props} />
              </div>
            </DesktopOnly>
            <div className={styles.saveCardDetail}>
              {this.state.showAddNewUpi === 0 && (
                <div className={styles.saveCardDetailWithHolder}>
                  <MyAccountUpiForm
                    showHowToPay={() => this.props.showHowToPay()}
                  />
                </div>
              )}
              {this.state.showAddNewUpi === 1 && (
                <div className={styles.saveCardDetailWithHolder}>
                  <div className={styles.tabHolder}>
                    <TabHolder>
                      <TabData
                        width="47%"
                        label="Saved Cards"
                        selected={!this.state.isSavedCardTab}
                        selectItem={() => this.tabSelect(0)}
                      />
                      <TabData
                        width="47%"
                        label="Saved UPI"
                        selected={this.state.isSavedCardTab}
                        selectItem={() => this.tabSelect(1)}
                      />
                    </TabHolder>
                  </div>

                  {this.state.isSavedCardTab === 0 &&
                    this.props.profile.savedCards.savedCardDetailsMap &&
                    this.props.profile.savedCards.savedCardDetailsMap.map(
                      (data, i) => {
                        let cardNumber = `${data.value.cardISIN}xx xxxx ${
                          data.value.cardEndingDigits
                        }`.replace(CARD_FORMAT, " ");
                        let cardHolderName = data.value.nameOnCard
                          ? data.value.nameOnCard
                          : "";
                        return (
                          <div className={styles.cardHolder} key={i}>
                            <SavedPaymentCard
                              key={i}
                              bankLogo={""}
                              bankName={data.value.cardIssuer}
                              cardLogo={this.getCardLogo(data.value.cardBrand)}
                              cardName={data.value.cardType}
                              cardHolderName={cardHolderName}
                              validityDate={`${data.value.expiryMonth}/${
                                data.value.expiryYear
                              }`}
                              cardNumber={cardNumber}
                              cardImage={data.cardImage}
                              onChangeCvv={(cvv, cardNo) =>
                                this.onChangeCvv(cvv, cardNo)
                              }
                              removeSavedCardDetails={() =>
                                this.removeSavedCardDetails(
                                  data.value.cardToken
                                )
                              }
                            />
                          </div>
                        );
                      }
                    )}
                  {this.state.isSavedCardTab === 1 &&
                    this.props.profile.savedCards.savedUpiDetailsMap &&
                    this.props.profile.savedCards.savedUpiDetailsMap.map(
                      (data, i) => {
                        let upiId = data.value.upiId;
                        return (
                          <div className={styles.cardHolder} key={i}>
                            <SavedPaymentUpi
                              key={i}
                              upiId={upiId}
                              removeSavedUpiDetails={() =>
                                this.removeSavedUpiDetails(data.value.upiId)
                              }
                            />
                          </div>
                        );
                      }
                    )}
                  {this.state.isSavedCardTab === 1 &&
                    this.props.profile.savedCards.savedUpiDetailsMap && (
                      <div className={styles.buttonHolder}>
                        <div className={styles.button}>
                          <Button
                            type="hollow"
                            height={40}
                            label={`Add a new UPI ID`}
                            backgroundColor={""}
                            borderColor={"black"}
                            borderRadius={22}
                            width={200}
                            textStyle={{ color: "#212121", fontSize: 14 }}
                            onClick={() => this.toggleForAddNewUpi(0)}
                          />
                        </div>
                      </div>
                    )}
                </div>
              )}
            </div>

            <DesktopOnly>
              <div className={myAccountStyles.userProfile}>
                <UserProfile
                  image={userData && userData.imageUrl}
                  userLogin={userData && userData.userName}
                  loginType={userData && userData.loginType}
                  onClick={() => this.renderToAccountSetting()}
                  firstName={
                    userData &&
                    userData.firstName &&
                    userData.firstName.trim().charAt(0)
                  }
                  heading={
                    userData && userData.firstName && `${userData.firstName} `
                  }
                  lastName={
                    userData && userData.lastName && `${userData.lastName}`
                  }
                  userAddress={this.props.profile.userAddress}
                />
              </div>
            </DesktopOnly>
          </div>
        </div>
      );
    } else {
      return (
        <div className={styles.base}>
          <div className={myAccountStyles.holder}>
            <DesktopOnly>
              <div className={myAccountStyles.profileMenu}>
                <ProfileMenu {...this.props} />
              </div>
            </DesktopOnly>
            <div className={styles.saveCardDetail}>
              <div className={styles.saveCardDetailWithHolder}>
                <div className={styles.noSavedCardBlock}>{NO_SAVED_CARDS}</div>
              </div>
            </div>
            <DesktopOnly>
              <div className={myAccountStyles.userProfile}>
                <UserProfile
                  image={userData && userData.imageUrl}
                  userLogin={userData && userData.userName}
                  loginType={userData && userData.loginType}
                  onClick={() => this.renderToAccountSetting()}
                  firstName={
                    userData &&
                    userData.firstName &&
                    userData.firstName.trim().charAt(0)
                  }
                  heading={
                    userData && userData.firstName && `${userData.firstName} `
                  }
                  lastName={
                    userData && userData.lastName && `${userData.lastName}`
                  }
                  userAddress={this.props.userAddress}
                />
              </div>
            </DesktopOnly>
          </div>
        </div>
      );
    }
  }
}
