import React from "react";
import styles from "./NoCostEmi.css";
import PropTypes from "prop-types";
import { Collapse } from "react-collapse";
import { INSTACRED, CARDLESS_EMI, CREDIT_CARD_EMI, DEBIT_CARD_EMI } from "../../lib/constants";
export default class NoCostEmi extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: this.props.isOpenSubEMI
    };
  }

  openMenu() {
    const isOpen = !this.state.isOpen;
    this.setState({
      isOpen
    });
    if (this.props.onChangeEMIType) {
      if (isOpen) {
        this.props.onChangeEMIType(
          this.props.EMIText,
          false,
          this.props.EMITabName
        );
      } else {
        this.props.onChangeEMIType(null, false, null);
      }
    }
    if (this.props.EMIText === "Cardless EMI") {
      this.props.selectInstacred(true);
      this.props.onChange({ currentPaymentMode: INSTACRED });
    }
    if (isOpen && this.props.EMIText === CARDLESS_EMI) {
      const isOpen = true;
      this.setState({
        isOpen
      });
    }
  }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.isOpenSubEMI !== this.state.isOpen) {
            this.setState({ isOpen: nextProps.isOpenSubEMI });
        }
    }

    render() {
        let rotateIcon = styles.iconHolder;
        if (this.state.isOpen) {
            rotateIcon = styles.rot;
        }
        let tabExtension = "";
        if (this.props.EMITabName === CREDIT_CARD_EMI) {
            tabExtension = this.props.creditCardTabNameExtension;
        } else if (this.props.EMITabName === DEBIT_CARD_EMI) {
            tabExtension = this.props.debitCardTabNameExtension;
        }
        return (
            <div className={styles.base}>
                <div
                    className={styles.holder}
                    onClick={() => {
                        this.openMenu();
                    }}
                >
                    <div className={rotateIcon} />
                    <div className={styles.textHolder}>
                        {this.props.EMITabName}
                        {tabExtension && `(${tabExtension})`}
                    </div>
                </div>
                <Collapse isOpened={this.state.isOpen}>{this.props.children}</Collapse>
            </div>
        );
    }
}
NoCostEmi.propTypes = {
  EMIText: PropTypes.string,
  onOpenMenu: PropTypes.func,
  isOpenSubEMI: PropTypes.bool,
  onChangeEMIType: PropTypes.func,
  EMITabName: PropTypes.string,
  selectInstacred: PropTypes.func,
  onChange: PropTypes.func,
  creditCardTabNameExtension: PropTypes.string,
  children: PropTypes.node,
  debitCardTabNameExtension: PropTypes.string,
};
