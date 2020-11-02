import React from "react";
import styles from "./ExchangeModal.css";
import HowAppliancesExchangeWorks from "./HowAppliancesExchangeWorks";
import AppliancesExchangeSelection from "./AppliancesExchangeSelection";
import PropTypes from "prop-types";

export default class AppliancesExchangeModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showAppliancesExchangeWorks: false,
      showBackButton: false
    };
  }

  openHowAppliancesExchangeWorks(data) {
    if (data.showAppliancesExchangeWorks) {
      this.setState({ showAppliancesExchangeWorks: true });
    } else {
      this.setState({ showAppliancesExchangeWorks: false });
    }
    if (data.showBackButton) {
      this.setState({ showBackButton: true });
    } else {
      this.setState({ showBackButton: false });
    }
  }

  closeAppliancesExchangeModal() {
    this.props.closeAppliancesExchangeModal();
  }

  render() {
    if (
      this.props.showAppliancesExchangeWorks ||
      this.state.showAppliancesExchangeWorks
    ) {
      return (
        <HowAppliancesExchangeWorks
          openHowAppliancesExchangeWorks={data =>
            this.openHowAppliancesExchangeWorks(data)
          }
          closeAppliancesExchangeModal={() =>
            this.closeAppliancesExchangeModal()
          }
          showBackButton={this.state.showBackButton}
        />
      );
    } else {
      return (
        <AppliancesExchangeSelection
          closeAppliancesExchangeModal={() =>
            this.closeAppliancesExchangeModal()
          }
          appliancesExchangeDetails={this.props.appliancesExchangeDetails}
          ussid={this.props.ussid}
        />
      );
    }
  }
}

AppliancesExchangeModal.propTypes = {
  closeAppliancesExchangeModal: PropTypes.func,
  showAppliancesExchangeWorks: PropTypes.bool,
  appliancesExchangeDetails: PropTypes.object,
  ussid: PropTypes.string
};
