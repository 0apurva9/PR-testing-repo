import React from "react";
import PropTypes from "prop-types";
import styles from "./NonEmiEligibleToWishlist.css";
import Button from "../../general/components/Button";
import Image from "../../xelpmoc-core/Image";
import BottomSlideModal from "../../general/components/BottomSlideModal";

export default class NonEmiEligibleToWishlist extends React.Component {
  addToWishlist() {
    let ussid = "";
    this.props.data.map(ele => (ussid += ele.USSID + ","));
    let ussidList = ussid.replace(/,\s*$/, "");
    this.props.addAllToWishList(ussidList);
  }

  render() {
    return (
      <BottomSlideModal
        heading="Move to Wishlist"
        closeModal={() => this.props.closeModal()}
      >
        <div className={styles.base}>
          <div
            id="PINCodeLabel"
            className={styles.labelText}
            data-test="nonEmiEligible-subheading"
          >
            Sorry! The following items do not qualify for an EMI and can be
            moved to your wish list; they can be purchased later.
          </div>

          <div className={styles.body}>
            {this.props.data.map(ele => (
              <div className={styles.marginTop} key={ele.USSID}>
                <div className={styles.bodyDiv}>
                  <div className={styles.content}>{ele.productName}</div>
                  <div className={styles.image}>
                    <Image image={ele.imageURL} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.buttonHolder}>
            <div className={styles.buttonleft}>
              <div className={styles.button}>
                <Button
                  type="primary"
                  height={36}
                  width={160}
                  label="Move to wishlist"
                  textStyle={{ color: "#212121", fontSize: 14 }}
                  onClick={e => this.addToWishlist(e)}
                  dataTest="move-to-wishlist"
                />
              </div>
            </div>
            <div className={styles.buttonRight}>
              <div className={styles.button}>
                <Button
                  type="hollow"
                  backgroundColor="#ff1744"
                  height={36}
                  label="Change payment mode"
                  textStyle={{ color: "#FFF", fontSize: 14 }}
                  onClick={() => this.props.changePaymentMethod()}
                  dataTest="change-payment-mode"
                />
              </div>
            </div>
          </div>
        </div>
      </BottomSlideModal>
    );
  }
}
NonEmiEligibleToWishlist.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      heading: PropTypes.string,
      address: PropTypes.string,
      value: PropTypes.string
    })
  ),
  changePaymentMethod: PropTypes.func,
  closeModal: PropTypes.func,
  addAllToWishList: PropTypes.func,
};
