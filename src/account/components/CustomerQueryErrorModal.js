import React from "react";
import styles from "./CustomerQueryErrorModal.css";
import BottomSlideModal from "../../general/components/BottomSlideModal";
import PropTypes from "prop-types";
import Button from "../../general/components/Button.js";
import Icon from "../../xelpmoc-core/Icon";
import cancleSvg from "../components/img/cancleSvg.svg";
import raiseTicketDuplicate from "../components/img/raiseTicketDuplicate.svg";
export default class CustomerQueryErrorModal extends React.Component {
  constructor() {
    super();
    this.clickedOnSubmitButton = false;
  }
  closeModal() {
    this.props.closeModal();
  }
  render() {
    return (
      <BottomSlideModal>
        <div className={styles.base}>
          <div className={styles.closeModal} onClick={() => this.closeModal()}>
            <Icon image={cancleSvg} size={17} />
          </div>
          <div className={styles.iconBox}>
            <Icon image={raiseTicketDuplicate} />
          </div>
          <div>text</div>
          <div className={styles.buttonHolder}>
            <Button
              type="primary"
              backgroundColor="#da1c5c"
              height={40}
              borderRadius={6}
              label={"CONTINUE SHOPPING"}
              width={204}
              textStyle={{ color: "#FFF", fontSize: 14 }}
              // disabled={true}
              onClick={() => this.submit()}
            />
          </div>
        </div>
      </BottomSlideModal>
    );
  }
}
