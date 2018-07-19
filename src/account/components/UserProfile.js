import React from "react";
import styles from "./UserProfile.css";
import Icon from "../../xelpmoc-core/Icon";
import PropTypes from "prop-types";
import { CDN_URL_ROOT } from "../../../src/lib/constants";
import ProfileImage from "../../xelpmoc-core/ProfileImage";
const userIcon = `${CDN_URL_ROOT}myCliq_icon.png`;
export default class UserProfile extends React.Component {
  render() {
    let heading, name;
    if (this.props.heading) {
      heading = this.props.heading;
      name = heading.trim();
    }
    return (
      <div className={styles.base}>
        <div className={styles.userProfileHolder}>
          <div className={styles.iconHolder}>
            <div className={styles.holder} />
            {(this.props.image || name) && (
              <div className={styles.userWithOutIcon}>
                {this.props.image && <ProfileImage image={this.props.image} />}
                {name &&
                  name !== "undefined" && (
                    <div className={styles.accountImageText}>
                      {this.props.firstName}
                    </div>
                  )}
              </div>
            )}
            {!this.props.image &&
              !this.props.firstName &&
              !this.props.lastName && (
                <div className={styles.accountImage}>
                  <ProfileImage image={userIcon} size={2} />
                </div>
              )}
          </div>
          <div className={styles.headindTextWithLink}>
            <div className={styles.headingText}>
              {name && name !== "undefined" && this.props.heading}
              {this.props.lastName &&
                this.props.lastName !== "undefined" &&
                this.props.lastName}
            </div>
            <div className={styles.login}>
              {this.props.userLogin && this.props.loginType === "mobile"
                ? `Ph.: ${this.props.userLogin}`
                : this.props.userLogin}
            </div>
          </div>
        </div>
        {this.props.userAddress &&
          this.props.userAddress.addresses && (
            <div className={styles.defaultAddressHolder}>
              <div className={styles.deafultAddressLabel}>Default Address</div>
              {this.props.userAddress &&
                this.props.userAddress.addresses
                  .filter(val => {
                    return val.defaultAddress === true;
                  })
                  .map((datum, i) => {
                    return (
                      <div className={styles.addressWrap}>
                        {datum.addressType && (
                          <div className={styles.defaultAddressHeader}>
                            {datum.addressType}
                          </div>
                        )}
                        <div className={styles.addressLine1}>{datum.line1}</div>
                        <div className={styles.addressLine1}>
                          {`${datum.state},${datum.postalCode} ,${datum.town}`}
                        </div>

                        <div className={styles.addressLine1}>
                          {`ph :${datum.phone}`}
                        </div>
                      </div>
                    );
                  })}
            </div>
          )}
      </div>
    );
  }
}
UserProfile.propTypes = {
  onClick: PropTypes.func,
  title: PropTypes.string,
  btnText: PropTypes.string,
  backgroundColor: PropTypes.string,
  logo: PropTypes.string,
  image: PropTypes.string,
  header: PropTypes.string,
  color: PropTypes.string
};
UserProfile.defaultProps = {
  color: "#fff",
  backgroundColor: "#ff1744"
};
