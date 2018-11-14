import React from "react";
import styles from "./BankOfferTNCModal.css";
import { Collapse } from "react-collapse";

export default class TermsAndConditionQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: this.props.isOpen ? this.props.isOpen : false
    };
  }
  openMenu() {
    if (!this.props.controlled) {
      this.setState(prevState => ({
        isOpen: !prevState.isOpen
      }));
    }
  }

  render() {
    let iconActive = styles.icon;
    if (this.state.isOpen) {
      iconActive = styles.iconup;
    }
    return (
      <div>
        <div
          className={styles.questionHolder}
          onClick={() => {
            this.openMenu();
          }}
        >
          {this.props.offerTermsConditions && <div className={iconActive} />}
          <span>{this.props.offerTitle}</span>
        </div>
        <div className={styles.offerDescription}>
          {this.props.offerDescription}
        </div>
        <Collapse isOpened={this.state.isOpen}>{this.props.children}</Collapse>
      </div>
    );
  }
}
