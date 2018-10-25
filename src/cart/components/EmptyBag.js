import React from "react";
import PropTypes from "prop-types";
import styles from "./EmptyBag.css";
import Button from "../../general/components/Button.js";
import bagIcon from "../../general/components/img/order-history.svg";
import bagIconDesktop from "./img/emptycard.png";
import Icon from "../../xelpmoc-core/Icon";
import MobileOnly from "../../general/components/MobileOnly";
import DesktopOnly from "../../general/components/DesktopOnly";
export default class EmptyBag extends React.Component {
  handleOnContinue() {
    if (this.props.onContinueShopping) {
      this.props.onContinueShopping();
    }
  }
  handleOnSaved() {
    if (this.props.viewSavedProduct) {
      this.props.viewSavedProduct();
    }
  }
  render() {
    return (
      <div className={styles.base}>
        <MobileOnly>
          <React.Fragment>
            <div className={styles.bagIconAndTextHolder}>
              <div className={styles.bagImageHolder}>
                <div className={styles.bagImage}>
                  <Icon image={bagIcon} size={80} />
                </div>
              </div>
              <div className={styles.headingText}>Your Bag is empty </div>
              <div className={styles.infoText}>
                Add some wonderful products from Tata CLiQ
              </div>
            </div>
            <div className={styles.buttonHolder}>
              <div className={styles.button}>
                <Button
                  type="primary"
                  backgroundColor="#ff1744"
                  height={36}
                  label="Continue Shopping"
                  width={210}
                  textStyle={{ color: "#FFF", fontSize: 14 }}
                  onClick={() => this.handleOnContinue()}
                />
              </div>
            </div>
            <div className={styles.buttonHolder}>
              <div className={styles.button}>
                <Button
                  type="hollow"
                  height={36}
                  label="View saved products"
                  width={210}
                  textStyle={{ color: "#212121", fontSize: 14 }}
                  onClick={() => this.handleOnSaved()}
                />
              </div>
            </div>
          </React.Fragment>
        </MobileOnly>
        <DesktopOnly>
          <div className={styles.bagIconAndTextHolder}>
            <div className={styles.bagImageHolder}>
              <div className={styles.bagImage}>
                <Icon image={bagIconDesktop} size={200} />
              </div>
            </div>
            <div className={styles.headingText}>
              Your bag is empty! Let’s fill it up shall we?{" "}
            </div>
            <div className={styles.buttonWrapper}>
              <div className={styles.buttonHolder}>
                <div className={styles.button}>
                  <Button
                    type="primary"
                    backgroundColor="#ff1744"
                    height={46}
                    label="Continue Shopping"
                    width={194}
                    textStyle={{ color: "#FFF", fontSize: 14 }}
                    onClick={() => this.handleOnContinue()}
                  />
                </div>
              </div>
              <div className={styles.buttonHolder}>
                <div className={styles.button}>
                  <Button
                    type="hollow"
                    color="#ff1744"
                    height={46}
                    label="View saved products"
                    width={194}
                    onClick={() => this.handleOnSaved()}
                  />
                </div>
              </div>
            </div>
          </div>
        </DesktopOnly>
      </div>
    );
  }
}
EmptyBag.propTypes = {
  onContinueShopping: PropTypes.func,
  viewSavedProduct: PropTypes.func
};
