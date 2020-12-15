import React from "react";
import styles from "./AppliancesExchangeCheckout.css";
import PropTypes from "prop-types";
import { AC_CART_EXCHANGE_DETAILS } from "../../lib/constants";
export default class AppliancesExchangeCheckout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      exchangeData: null
    };
  }

  componentDidMount() {
    let cartExchangeDetails = localStorage.getItem(AC_CART_EXCHANGE_DETAILS);
    if (cartExchangeDetails) {
      let parsedExchangeDetails = JSON.parse(cartExchangeDetails);
      let exchangeDetails = parsedExchangeDetails.find(data => {
        return data.ussid === this.props.productUssid;
      });
      if (exchangeDetails) {
        this.setState({ exchangeData: exchangeDetails });
      }
    }
  }

  render() {
    if (!this.state.exchangeData) {
      return null;
    }

    return (
      <div className={styles.base}>
        <div className={styles.title}>Exchange Device:</div>
        <div className={styles.name}>
          {" "}
          {this.state.exchangeData && this.state.exchangeData.brandName}-
          {this.state.exchangeData && this.state.exchangeData.type} AC
        </div>
      </div>
    );
  }
}

AppliancesExchangeCheckout.propTypes = {
  productUssid: PropTypes.string
};
