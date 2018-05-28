import React from "react";
import styles from "./GetTermsAndCondition.css";

import SlideModal from "../../general/components/SlideModal";
import TermsAndConditionQuestion from "./TermsAndConditionQuestion";
import PropTypes from "prop-types";
export default class GetTermsAndCondition extends React.Component {
  componentDidMount() {
    this.props.getTermsAndConditionData();
  }
  render() {
    return (
      <SlideModal closeModal={this.props.closeModal}>
        <div className={styles.base}>
          <div className={styles.header}>Terms & Condition</div>
          <div className={styles.content}>
            {this.props.getTermsAndConditions &&
              this.props.getTermsAndConditions.coupons &&
              this.props.getTermsAndConditions.coupons.map((val, i) => {
                return (
                  <div className={styles.dataHolder}>
                    <TermsAndConditionQuestion
                      offerTitle={val.offerTitle}
                      offerDescription={val.offerDescription}
                    >
                      <div
                        className={styles.answer}
                        dangerouslySetInnerHTML={{
                          __html: val.offerTermsConditions
                        }}
                      />
                    </TermsAndConditionQuestion>
                  </div>
                );
              })}
          </div>
        </div>
      </SlideModal>
    );
  }
}
GetTermsAndCondition.propTypes = {
  lat: PropTypes.number,
  lng: PropTypes.number,
  image: PropTypes.string
};
