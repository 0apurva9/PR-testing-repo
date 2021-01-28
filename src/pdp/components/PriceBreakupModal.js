import React from "react";
import SlideModal from "../../general/components/SlideModal";
import styles from "./PriceBreakupModal.css";
import { checkUserAgentIsMobile } from "../../lib/UserAgent.js";
export default class PriceBreakupModal extends React.Component {
  render() {
    return (
      <SlideModal
        closeModal={this.props.closeModal}
        height={checkUserAgentIsMobile() ? "" : "437px"}
        width={checkUserAgentIsMobile() ? "" : "400px"}
      >
        <div className={styles.base}>
          <div className={styles.header}>Price breakup</div>
          <div className={styles.content}>
            {this.props.data &&
              this.props.data.map((val, index) => {
                return (
                  <div className={styles.row} key={index}>
                    <div className={styles.name}>{val.name}</div>
                    {val.price && (
                      <div className={styles.price}>
                        {val.price.formattedValue}
                      </div>
                    )}
                    {val.weightRateList &&
                      val.weightRateList.length > 0 &&
                      val.weightRateList.map((val, i) => {
                        return <div className={styles.detail} key={i}>{val}</div>;
                      })}
                  </div>
                );
              })}
          </div>
        </div>
      </SlideModal>
    );
  }
}
