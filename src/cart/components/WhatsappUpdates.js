import React from "react";
import styles from "./WhatsappUpdates.css";
import CheckBoxSquare from "../../general/components/CheckBoxSquare.js";
import Whatsapp from "../../general/components/img/whatsappImage.png";

export default class WhatsappUpdates extends React.Component {
  constructor() {
    super();
    this.state = {
      whatsAppActive: true
    };
  }

  async handleWhatsAppClick() {
    await this.setState({ whatsAppActive: !this.state.whatsAppActive });
    if (this.props.handleWhatsAppClick) {
      this.props.handleWhatsAppClick(this.state.whatsAppActive);
    }
  }

  render() {
    return (
      <div
        className={styles.baseWhatsapp}
        onClick={() => this.handleWhatsAppClick()}
      >
        <div className={styles.whatsAppTick}>
          <CheckBoxSquare selected={this.state.whatsAppActive} size="16px" />
        </div>
        <div className={styles.orderUpdateText}>
          {this.props.text}
          <div className={styles.whatsappImage}>
            <img
              src={Whatsapp}
              alt={this.props.text}
              width="24px"
              height="24px"
            />
          </div>
        </div>
      </div>
    );
  }
}
