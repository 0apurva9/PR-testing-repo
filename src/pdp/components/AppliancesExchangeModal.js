import React from "react";
import HowAppliancesExchangeWorks from "./HowAppliancesExchangeWorks";
import AppliancesExchangeSelection from "./AppliancesExchangeSelection";
import PropTypes from "prop-types";

export default class AppliancesExchangeModal extends React.Component {
  constructor(props) {
    super(props);
  }

  closeAppliancesExchangeModal() {
    this.props.closeAppliancesExchangeModal();
  }

  render() {
    if (this.props.showAppliancesExchangeWorks) {
      return (
        <HowAppliancesExchangeWorks
          closeAppliancesExchangeModal={() =>
            this.closeAppliancesExchangeModal()
          }
          showBackButton={false}
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
          updateAppliancesExchangeDetails={exchangeData =>
            this.props.updateAppliancesExchangeDetails(exchangeData)
          }
          history={this.props.history}
        />
      );
    }
  }
}

AppliancesExchangeModal.propTypes = {
  closeAppliancesExchangeModal: PropTypes.func,
  showAppliancesExchangeWorks: PropTypes.bool,
  appliancesExchangeDetails: PropTypes.object,
  ussid: PropTypes.string,
  updateAppliancesExchangeDetails: PropTypes.func,
  history: PropTypes.object
};
