import React from "react";
import styles from "./PdpFooter.css";
import PropTypes from "prop-types";
import FooterButton from "../../general/components/FooterButton.js";
import { SUCCESS, ADD_TO_BAG_TEXT } from "../../lib/constants.js";
export default class PdfFooter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      goToCartPageFlag: props.goToCartPageFlag ? props.goToCartPageFlag : false,
      checkForUrlGoToCartFlag: true
    };
  }
  componentWillReceiveProps(nextProps) {
    if (
      this.state.checkForUrlGoToCartFlag &&
      nextProps.goToCartPageFlag !== this.state.goToCartPageFlag
    ) {
      this.setState({ goToCartPageFlag: nextProps.goToCartPageFlag });
    }
  }
  async onAddToBag(buyNowFlag) {
    if (!this.state.goToCartPage) {
      if (this.props.onAddToBag) {
        const addProductToCartResponse = await this.props.onAddToBag(
          buyNowFlag
        );
        if (
          addProductToCartResponse &&
          addProductToCartResponse.status === SUCCESS
        ) {
          this.setState({
            goToCartPageFlag: true,
            checkForUrlGoToCartFlag: false
          });
          if (buyNowFlag) {
            this.goToCartPage();
          } else {
            this.props.displayToast(ADD_TO_BAG_TEXT);
          }
        }
      }
    } else {
      this.goToCartPage();
    }
  }
  goToCartPage() {
    if (this.props.goToCartPage) {
      this.props.goToCartPage();
    }
  }
  render() {
    return (
      <div className={styles.base}>
        <div className={styles.footerButtonHolder}>
          <FooterButton
            backgroundColor={this.state.goToCartPageFlag ? "#fff" : "#fff"}
            boxShadow="0 -2px 8px 0px rgba(0, 0, 0, 0.2)"
            label="Buy Now"
            disabled={this.props.outOfStock}
            onClick={() => this.onAddToBag(true)}
            labelStyle={{
              color: this.state.goToCartPageFlag ? "#ff1744" : "#ff1744",
              fontSize: 14,
              fontFamily: "semibold"
            }}
          />
        </div>
        <div className={styles.footerButtonHolder}>
          <FooterButton
            backgroundColor={
              this.state.goToCartPageFlag ? "#ff1744" : "#ff1744"
            }
            boxShadow="0 -2px 8px 0px rgba(0, 0, 0, 0.2)"
            label={this.state.goToCartPageFlag ? "Go to bag" : "Add to bag"}
            disabled={this.props.outOfStock}
            onClick={
              this.state.goToCartPageFlag
                ? () => this.goToCartPage()
                : () => this.onAddToBag(false)
            }
            labelStyle={{
              color: this.state.goToCartPageFlag ? "#fff" : "#fff",
              fontSize: 14,
              fontFamily: "semibold"
            }}
          />
        </div>
      </div>
    );
  }
}
PdfFooter.propTyes = {
  onSave: PropTypes.func,
  onAddToBag: PropTypes.func
};
PdfFooter.defaultProps = {
  goToCartPageState: false
};
