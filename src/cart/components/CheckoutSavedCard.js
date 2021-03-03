import React from "react";
import savedCardIcon from "./img/saved-card.svg";
import PropTypes from "prop-types";
import SavedCard from "./SavedCard.js";
import MenuDetails from "../../general/components/MenuDetails.js";
import filter from "lodash.filter";
import merge from "lodash.merge";
import visaLogo from "./img/Visa.svg";
import masterLogo from "./img/Master.svg";
import amexLogo from "./img/amex.svg";
import repayLogo from "./img/rupay.svg";
import dinersLogo from "./img/diners.svg";
import discoverLogo from "./img/discover.svg";
import jcbLogo from "./img/jcb.svg";
import {
    SAVED_CARD_PAYMENT_MODE,
    RUPAY_CARD,
    VISA_CARD,
    MASTER_CARD,
    AMEX_CARD,
    MESTRO_CARD,
    DINERS_CARD,
    DISCOVER_CARD,
    JCB_CARD,
} from "../../lib/constants";

export default class CheckoutSavedCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedCardIndex: 0,
            cvv: "",
        };
    }

    getCardLogo(cardDetails) {
        switch (cardDetails.value.cardBrand) {
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
            default:
                return false;
        }
    }

    onChangeCvv(cvv, cardNo, index) {
        this.setState({ cvv, selectedCardIndex: index });
        if (cvv.length >= 3) {
            let paymentModesToDisplay = filter(this.props.saveCardDetails, modes => {
                return modes.value.cardEndingDigits === cardNo;
            });

            var cardDetails = merge(paymentModesToDisplay[0].value, {
                cvvNumber: cvv,
            });

            this.props.binValidationForSavedCard(cardDetails);
        } else {
            this.props.binValidationForSavedCard(null);
        }
    }

    render() {
        return (
            <MenuDetails
                text={SAVED_CARD_PAYMENT_MODE}
                icon={savedCardIcon}
                onOpenMenu={currentPaymentMode => this.props.onSelectPaymentsMode(currentPaymentMode)}
                isOpen={this.props.currentPaymentMode === SAVED_CARD_PAYMENT_MODE}
            >
                {this.props.saveCardDetails &&
                    this.props.saveCardDetails.map((data, i) => {
                        let cardLogo = this.getCardLogo(data);
                        return (
                            <SavedCard
                                key={i}
                                cvv={this.state.cvv}
                                validateSavedCard={this.props.validateSavedCard}
                                onFocusInput={this.props.onFocusInput}
                                cardNumber={data.value.cardEndingDigits}
                                cardImage={cardLogo}
                                selected={i === this.state.selectedCardIndex}
                                onChangeCvv={(cvv, cardNo) => this.onChangeCvv(cvv, cardNo, i)}
                                onCheckout={this.props.onCheckout}
                                selectedSavedCardDetails={this.props.selectedSavedCardDetails}
                                currentPaymentMode={this.props.currentPaymentMode}
                            />
                        );
                    })}
            </MenuDetails>
        );
    }
}

CheckoutSavedCard.propTypes = {
    saveCardDetails: PropTypes.arrayOf(
        PropTypes.shape({
            cardNumber: PropTypes.string,
            cardImage: PropTypes.string,
        })
    ),
    onChangeCvv: PropTypes.func,
    validateSavedCard: PropTypes.func,
    binValidationForSavedCard: PropTypes.func,
    onSelectPaymentsMode: PropTypes.func,
    currentPaymentMode: PropTypes.string,
    onFocusInput: PropTypes.func,
    onCheckout: PropTypes.func,
    selectedSavedCardDetails: PropTypes.object,
};
