import React from "react";
import styles from "./CustomerQueryErrorModal.css";
import { RouterPropTypes } from "../../general/router-prop-types";
import BottomSlideModal from "../../general/components/BottomSlideModal";
import PropTypes from "prop-types";
import Button from "../../general/components/Button.js";
import Icon from "../../xelpmoc-core/Icon";
import cancleSvg from "../components/img/cancleSvg.svg";
import { withRouter } from "react-router-dom";
import { HOME_ROUTER } from "../../lib/constants";
import raiseTicketDuplicate from "../components/img/raiseTicketDuplicate.svg";
class CustomerQueryErrorModal extends React.Component {
  constructor() {
    super();
    this.clickedOnSubmitButton = false;
  }

  closeModal() {
    this.props.closeModal();
  }

  onContinueShoppingClick = () => {
    this.props.history.push(HOME_ROUTER);
    window.location.reload();
  };

  render() {
    return (
      <BottomSlideModal>
        <div className={styles.base}>
          <div className={styles.closeModal} onClick={() => this.closeModal()}>
            <Icon image={cancleSvg} size={17} />
          </div>
          <div className={styles.iconBox}>
            <Icon image={raiseTicketDuplicate} size={274} />
          </div>
          <div className={styles.heading}>{this.props.heading}</div>
          <div className={styles.subHeading}>{this.props.subHeading}</div>
          {this.props.showBtn && (
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
                onClick={() => this.onContinueShoppingClick()}
              />
            </div>
          )}
        </div>
      </BottomSlideModal>
    );
  }
}
export default withRouter(CustomerQueryErrorModal);

CustomerQueryErrorModal.propTypes = {
  closeModal: PropTypes.func,
  heading:PropTypes.string,
  subHeading:PropTypes.string,
  showBtn:PropTypes.bool,
  ...RouterPropTypes
};
