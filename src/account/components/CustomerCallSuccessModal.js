import React from "react";
import styles from "./CustomerCallSuccessModal.css";
import BottomSlideModal from "../../general/components/BottomSlideModal";
import PropTypes from "prop-types";
import Button from "../../general/components/Button.js";
import format from "date-fns/format";
import Icon from "../../xelpmoc-core/Icon";
import { HOME_ROUTER } from "../../lib/constants";
import raisedTicket from "../components/img/raisedTicket.svg";
import { withRouter } from "react-router-dom";
const DATE_FORMAT = "Do MMMM";
class CustomerCallSuccessModal extends React.Component {
  constructor() {
    super();
    this.clickedOnSubmitButton = false;
  }
  componentWillUnmount() {
    this.props.history.push(HOME_ROUTER);
  }

  onContinueShoppingClick = () => {
    this.props.history.push(HOME_ROUTER);
  };

  closeModal() {
    this.props.closeModal();
  }
  render() {
    const { PrefferedSlot = "" } =
      (this.props &&
        this.props.callSuccessData &&
        this.props.callSuccessData.data) ||
      {};

    let timeSlotList = PrefferedSlot.split("-");
    let dateString = getSlotTime(timeSlotList).timeSlot;

    return (
      <BottomSlideModal>
        <div className={styles.base}>
          <div className={styles.iconBox}>
            <Icon image={raisedTicket} size={222} />
          </div>
          <div className={styles.subHeading}>
            Our team is working on priority to serve you.
            <br />
            Your callback request has been scheduled between
            <div className={styles.timing}> {dateString} </div>
          </div>
          <div className={styles.buttonHolder}>
            <Button
              type="primary"
              backgroundColor="#da1c5c"
              height={40}
              borderRadius={6}
              label={"CONTINUE SHOPPING"}
              width={204}
              textStyle={{ color: "#FFF", fontSize: 14 }}
              onClick={() => this.onContinueShoppingClick()}
            />
          </div>
        </div>
      </BottomSlideModal>
    );
  }
}

export default withRouter(CustomerCallSuccessModal);

CustomerCallSuccessModal.propTypes = {
  closeModal: PropTypes.func,
  callSuccessData: PropTypes.shape({
    Status: PropTypes.string,
    RecUpdated: PropTypes.string,
    PrefferedSlot: PropTypes.string
  })
};

export const getSlotTime = timeSlotList => {
  let startDateTime = new Date(parseInt(timeSlotList[0]) * 1000),
    endDateTime = new Date(parseInt(timeSlotList[1]) * 1000);

  let startTime = startDateTime.getHours(),
    endTime = endDateTime.getHours();

  startTime = startTime > 12 ? `${startTime - 12} PM` : `${startTime} AM`;
  endTime = endTime > 12 ? `${endTime - 12} PM` : `${endTime} AM`;

  return {
    timeSlot: `${startTime} - ${endTime}, ${format(
      startDateTime,
      DATE_FORMAT
    )}`,
    shift: new Date().getDay() === startDateTime.getDay() ? "today" : "tomorrow"
  };
};
