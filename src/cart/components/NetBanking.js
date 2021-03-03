import React from "react";
import SelectBoxMobile2 from "../../general/components/SelectBoxMobile2";
import Grid from "../../general/components/Grid";
import BankSelect from "./BankSelect";
import styles from "./NetBanking.css";
import Button from "../../general/components/Button";
import DesktopOnly from "../../general/components/DesktopOnly";
import PropTypes from "prop-types";
import axisBankIcon from "./img/pwa_NB_DUMMY.svg";
import hdfcBankIcon from "./img/pwa_NB_HDFC.svg";
import iciciBankIcon from "./img/pwa_NB_ICICI.svg";
import sbiBankIcon from "./img/pwa_NB_SBI.svg";
import induslandBankIcon from "./img/indusind.svg";
import kotakBankIcon from "./img/kotak.svg";
import { BANK_GATWAY_DOWN } from "../../lib/constants";
import {
    WHATSAPP_NOTIFICATION_CHECKED,
    WHATSAPP_NOTIFICATION_UNCHECKED,
    getWhatsAppNotification,
} from "../../lib/adobeUtils";
const axisBankCode = "NB_AXIS";
const hdfcBankCode = "NB_HDFC";
const iciciBankCode = "NB_ICICI";
const sbiBankCode = "NB_SBI";
const kotakBankCode = "NB_KOTAK";
const induslandBankCode = "NB_INDUS";
const bankErrorMessage = `Your bank is currently unable to process NetBanking payments due to a technical issue. Please try another payment method.`;
const SHOW_DEFAULT_BANK_LIST = [
    axisBankCode,
    hdfcBankCode,
    iciciBankCode,
    sbiBankCode,
    kotakBankCode,
    induslandBankCode,
];
const bankImages = {
    NB_AXIS: axisBankIcon,
    NB_HDFC: hdfcBankIcon,
    NB_ICICI: iciciBankIcon,
    NB_INDUS: induslandBankIcon,
    NB_KOTAK: kotakBankIcon,
    NB_SBI: sbiBankIcon,
};
export default class NetBanking extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bankName: "",
            bankCode: "",
            selectedFromDropDown: false,
        };
    }

    handleSelectForIcon(bankCode, bankName) {
        this.setState({
            bankCode: bankCode,
            bankName: bankName,
            selectedFromDropDown: false,
        });
        if (this.props.binValidationForNetBank) {
            this.props.binValidationForNetBank(bankName);
        }
        this.props.onSelectBankForNetBanking(bankCode, bankName);
    }

    handleSelect(val) {
        const bankCode = val.value;
        const bankName = val.label;
        this.setState({
            bankCode: bankCode,
            bankName: bankName,
            selectedFromDropDown: true,
        });
        if (this.props.binValidationForNetBank) {
            this.props.binValidationForNetBank(bankName);
        }
        this.props.onSelectBankForNetBanking(bankCode, bankName);
    }

    handleCheckout = () => {
        if (this.props.whatsappSelected) {
            getWhatsAppNotification(WHATSAPP_NOTIFICATION_CHECKED);
        } else if (!this.props.whatsappSelected) {
            getWhatsAppNotification(WHATSAPP_NOTIFICATION_UNCHECKED);
        }
        if (this.props.onCheckout) {
            this.props.onCheckout();
        }
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps && !nextProps.bankCodeForNetBanking && !nextProps.bankNameForNetBanking) {
            this.setState({
                bankName: "",
                bankCode: "",
                selectedFromDropDown: false,
            });
        }
    }

    render() {
        return (
            <div>
                {this.props.bankBinFailedDetails &&
                    this.props.bankBinFailedDetails.bankGatewayStatus === BANK_GATWAY_DOWN && (
                        <span className={styles.invalidCardText}>
                            *{" "}
                            {this.props.bankBinFailedDetails.errorMsg
                                ? this.props.bankBinFailedDetails.errorMsg
                                : bankErrorMessage}
                        </span>
                    )}
                {this.props.binValidationSucessDetails &&
                    this.props.binValidationSucessDetails.bankGatewayStatus === BANK_GATWAY_DOWN && (
                        <span className={styles.invalidCardText}>
                            *{" "}
                            {this.props.binValidationSucessDetails.errorMsg
                                ? this.props.binValidationSucessDetails.errorMsg
                                : bankErrorMessage}
                        </span>
                    )}
                {this.props.bankList && (
                    <Grid limit={1} offset={30} elementWidthMobile={33.33} elementWidthDesktop={16.66}>
                        {this.props.bankList
                            .filter(bank => SHOW_DEFAULT_BANK_LIST.includes(bank.bankCode))
                            .map((val, i) => {
                                return (
                                    <BankSelect
                                        key={i}
                                        selectItem={() => this.handleSelectForIcon(val.bankCode, val.bankName)}
                                        image={bankImages[val.bankCode]}
                                        selected={this.state.bankCode === val.bankCode}
                                        name={val.bankName}
                                    />
                                );
                            })}
                    </Grid>
                )}
                <div className={styles.bankDropDown}>
                    <div className={styles.contentHolder}>
                        <SelectBoxMobile2
                            height={33}
                            placeholder={"Other Bank"}
                            options={
                                this.props.bankList &&
                                this.props.bankList
                                    .filter(bank => !SHOW_DEFAULT_BANK_LIST.includes(bank.bankCode))
                                    .map(val => {
                                        return {
                                            value: val.bankCode,
                                            label: val.bankName,
                                        };
                                    })
                            }
                            isEnable={this.state.selectedFromDropDown}
                            onChange={val => this.handleSelect(val)}
                        />
                    </div>
                    <DesktopOnly>
                        <div className={styles.contentHolder}>
                            <div className={styles.buttonHolder}>
                                <Button
                                    disabled={
                                        (this.props.bankBinFailedDetails &&
                                            this.props.bankBinFailedDetails.bankGatewayStatus === BANK_GATWAY_DOWN) ||
                                        (this.props.binValidationSucessDetails &&
                                            this.props.binValidationSucessDetails.bankGatewayStatus ===
                                                BANK_GATWAY_DOWN)
                                            ? true
                                            : this.props.validateNetBanking()
                                    }
                                    type="primary"
                                    backgroundColor="#ff1744"
                                    height={40}
                                    label="Pay now"
                                    width={150}
                                    textStyle={{
                                        color: "#FFF",
                                        fontSize: 14,
                                    }}
                                    onClick={this.handleCheckout}
                                />
                            </div>
                        </div>
                    </DesktopOnly>
                </div>
            </div>
        );
    }
}

NetBanking.propTypes = {
    bankList: PropTypes.arrayOf(
        PropTypes.shape({
            bankCode: PropTypes.string,
            bankName: PropTypes.string,
            isAvailable: PropTypes.string,
            priority: PropTypes.string,
        })
    ),
    onSelect: PropTypes.func,
    validateNetBanking: PropTypes.func,
    binValidationSucessDetails: PropTypes.object,
    onCheckout: PropTypes.func,
    binValidationForNetBank: PropTypes.func,
    onSelectBankForNetBanking: PropTypes.func,
    whatsappSelected: PropTypes.bool,
    bankCodeForNetBanking: PropTypes.string,
    bankNameForNetBanking: PropTypes.string,
    bankBinFailedDetails: PropTypes.arrayOf(
        PropTypes.shape({
            bankGatewayStatus: PropTypes.string,
            errorMsg: PropTypes.string,
        })
    ),
};
