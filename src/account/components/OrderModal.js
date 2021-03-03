import React from "react";
import SlideModal from "../../general/components/SlideModal";
import styles from "./OrderModal.css";
import PropTypes from "prop-types";
export default class OrderModal extends React.Component {
  render() {
    return (
      <SlideModal closeModal={this.props.closeModal}>
        <div className={styles.base}>
          <div className={styles.header}>
            Order #{this.props.data.orderCode}
          </div>
          {this.props.data.orderNotShiped && (
            <div className={styles.step}>
              <div className={styles.location}>
                {this.props.data.alertMessage}
              </div>
            </div>
          )}
          {this.props.data &&
            this.props.data.shippingList &&
            this.props.data.shippingList.map((val, i) => {
              return (
                <div key={i} className={styles.step}>
                  {val.location && (
                    <div className={styles.location}>{val.location}</div>
                  )}
                  <div className={styles.row}>
                    {val.date && <span>{val.date} ,</span>}{" "}
                    {val.time && <span>{val.time}</span>}
                  </div>
                  <div className={styles.row}>{val.statusDescription}</div>
                </div>
              );
            })}
        </div>
      </SlideModal>
    );
  }
}
OrderModal.propTypes = {
  data: PropTypes.object,
  closeModal: PropTypes.func
};
