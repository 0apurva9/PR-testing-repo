import React from "react";
import styles from "./AddressBook.css";
import Button from "../../general/components/Button.js";
import AddressItemFooter from "./AddressItemFooter.js";
import Loader from "../../general/components/Loader";
import {
  MY_ACCOUNT_PAGE,
  MY_ACCOUNT_ADDRESS_EDIT_PAGE,
  MY_ACCOUNT_ADDRESS_ADD_PAGE,
  ADDRESS_BOOK,
  LOGGED_IN_USER_DETAILS,
  LOGIN_PATH,
  CUSTOMER_ACCESS_TOKEN,
  HOME_ROUTER
} from "../../lib/constants.js";
import DesktopOnly from "../../general/components/DesktopOnly";
import MobileOnly from "../../general/components/MobileOnly";
import * as Cookie from "../../lib/Cookie";
import ProfileMenu from "./ProfileMenu";
import * as myAccountStyles from "./MyAccountDesktop.css";
import UserProfile from "./UserProfile";
import * as UserAgent from "../../lib/UserAgent.js";
const ADDRESS_BOOK_HEADER = "Add a new address";
const DELETE_LABEL = "Delete";
const EDIT_LABEL = "Edit";
const NO_ADDRESS_TEXT = "No Saved Address";

export default class AddressBook extends React.Component {
  componentDidMount() {
    this.props.setHeaderText(ADDRESS_BOOK);
  }
  componentDidUpdate() {
    this.props.setHeaderText(ADDRESS_BOOK);
  }
  removeAddress = addressId => {
    if (this.props.removeAddress) {
      this.props.removeAddress(addressId);
      this.props.getUserAddress();
    }
  };

  renderLoader = () => {
    return <Loader />;
  };

  editAddress = address => {
    this.props.history.push({
      pathname: `${MY_ACCOUNT_PAGE}${MY_ACCOUNT_ADDRESS_EDIT_PAGE}`,
      state: {
        addressDetails: address
      }
    });
  };

  addAddress = () => {
    this.props.history.push({
      pathname: `${MY_ACCOUNT_PAGE}${MY_ACCOUNT_ADDRESS_ADD_PAGE}`
    });
  };
  navigateToLogin() {
    if (UserAgent.checkUserAgentIsMobile()) {
      this.props.history.push(LOGIN_PATH);
      return null;
    } else {
      if (this.props.showAuthPopUp) {
        this.props.history.push(HOME_ROUTER);
        this.props.showAuthPopUp();
        return null;
      }
    }
  }
  renderAddressBook = () => {
    const userProfileDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    const customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
    if (!userProfileDetails || !customerCookie) {
      return this.navigateToLogin();
    }
    const userData = JSON.parse(userProfileDetails);

    return (
      <div className={styles.base}>
        <div className={myAccountStyles.holder}>
          <DesktopOnly>
            <div className={myAccountStyles.profileMenu}>
              <ProfileMenu {...this.props} />
            </div>
          </DesktopOnly>
          <div className={styles.editAccountDetail}>
            <div className={styles.editAccountDetailWithHolder}>
              {this.props.userAddress &&
                this.props.userAddress.addresses &&
                this.props.userAddress.addresses.map(address => {
                  return (
                    <div className={styles.addressBlock}>
                      <div className={styles.addressHolder}>
                        <div className={styles.name}>{`${address.firstName} ${
                          address.lastName
                        }`}</div>
                        <MobileOnly>
                          <div className={styles.address}>{`${
                            address.line1 ? address.line1 : ""
                          }, ${address.landmark ? address.landmark : ""}, ${
                            address.city ? address.city : ""
                          }, ${address.state ? address.state : ""} ,${
                            address.postalCode ? address.postalCode : ""
                          } ,${
                            address.country && address.country.isocode
                              ? address.country.isocode
                              : ""
                          }`}</div>
                        </MobileOnly>
                        <DesktopOnly>
                          <div className={styles.address}>{`${
                            address.line1 ? address.line1 : ""
                          },  ${
                            address.landmark && address.landmark
                              ? address.landmark
                              : ""
                          }`}</div>
                          <div className={styles.address}>{` ${
                            address.city ? address.city : ""
                          } ,${
                            address.state && address.state ? address.state : ""
                          }`}</div>
                          <div className={styles.address}>{` ${
                            address.postalCode ? address.postalCode : ""
                          } ,${
                            address.country && address.country.isocode
                              ? address.country.isocode
                              : ""
                          }`}</div>
                        </DesktopOnly>
                        <div className={styles.phoneNumber}>{`Ph. ${
                          address.phone
                        }`}</div>
                      </div>
                      <div className={styles.actionHolder}>
                        <AddressItemFooter
                          buttonLabel={DELETE_LABEL}
                          underlineButtonLabel={EDIT_LABEL}
                          editAddress={() => this.editAddress(address)}
                          removeAddress={() => this.removeAddress(address.id)}
                          isEditable={true}
                        />
                      </div>
                    </div>
                  );
                })}
              {this.props.userAddress &&
                !this.props.userAddress.addresses && (
                  <div className={styles.noAddressBlock}>{NO_ADDRESS_TEXT}</div>
                )}
              <div className={styles.buttonHolder}>
                <div className={styles.button}>
                  <Button
                    type="hollow"
                    height={40}
                    label={ADDRESS_BOOK_HEADER}
                    width={200}
                    textStyle={{ color: "#212121", fontSize: 14 }}
                    onClick={() => this.addAddress()}
                  />
                </div>
              </div>
            </div>
          </div>
          <DesktopOnly>
            <div className={myAccountStyles.userProfile}>
              <UserProfile
                image={userData.imageUrl}
                userLogin={userData.userName}
                loginType={userData.loginType}
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
  };
  render() {
    if (this.props.loading) {
      this.props.showSecondaryLoader();
    } else {
      this.props.hideSecondaryLoader();
    }

    return this.renderAddressBook();
  }
}
