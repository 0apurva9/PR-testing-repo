import React from "react";
import OrderCard from "./OrderCard";
import SelectBoxMobile2 from "../../general/components/SelectBoxMobile2";
import SelectBoxMobile3 from "../../general/components/SelectBoxMobile3";
import TextArea from "../../general/components/TextArea";
import ReturnsFrame from "./ReturnsFrame";
import styles from "./CancelReasonForm.css";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
export default class CancelReasonForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displaySecondary: false,
      secondaryReasons: null,
      comment: null,
      reason: "Select a reason",
      placeholder: "Add comments (optional)"
    };
  }
  onClickImage(productCode) {
    if (this.props.onClickImage) {
      this.props.onClickImage(productCode);
    }
  }
  handleContinue() {
    if (this.props.onContinue) {
      this.props.onContinue(this.state);
    }
  }
  onChangePrimary(val) {
    const code = val.value;
    const label = val.label;

    this.setState({ cancelReasonCode: code, reason: label });
  }
  handleChange(val) {
    this.setState({ comment: val });
  }

  handleCancel() {
    if (this.props.onCancel) {
      this.props.onCancel();
    }
  }
  render() {
    const data = this.props.cancelProductDetails;
    return (
      <ReturnsFrame
         headerText="Cancel Item"
        onContinue={() => this.handleContinue()}
       // onCancel={() => this.handleCancel()}
      >
        <div className={styles.content}>
          <OrderCard
            imageUrl={
              data &&
              data.orderProductWsDTO &&
              data.orderProductWsDTO[0] &&
              data.orderProductWsDTO[0].imageURL
            }
            imageHolderWidth="47px"
            productName={`${data.orderProductWsDTO[0].productName}`}
            
            onClick={() =>
              this.onClickImage(
                data.orderProductWsDTO &&
                  data.orderProductWsDTO[0] &&
                  data.orderProductWsDTO[0].productcode
              )
            }
            price={false}
            quantity={false}
            isSelect={false}
          >
            {data.orderProductWsDTO[0].productSize && (
              <span className={styles.productSizeColor}>
                {data.orderProductWsDTO[0].productSize} |&nbsp;
              </span>
            )}
            {data.orderProductWsDTO[0].productColour && (
              <span className={styles.productSizeColor}>
                {data.orderProductWsDTO[0].productColour}
              </span>
            )}
          </OrderCard>
          <div className={styles.cancelReasonForm}>
            <div className={styles.cancelTitle}>
              Please select cancel reason
            </div>
         
          <div className={styles.select}>
            <SelectBoxMobile3
              placeholder={"Select a reason"}
              options={data.returnReasonDetailsWsDTO.map((val, i) => {
                return {
                  value: val.code,
                  label: val.reasonDescription
                };
              })}
              onChange={val => this.onChangePrimary(val)}
            />
          </div>

          <div className={styles.textArea}>
            <TextArea
              onChange={val => this.handleChange(val)}
                value={this.state.comment}
                placeholder={this.state.placeholder}
            />
          </div>
          </div>
          </div>
      </ReturnsFrame>
    );
  }
}
CancelReasonForm.propTypes = {
  onContinue: PropTypes.func,
  onCancel: PropTypes.func,
  cancelProductDetails: PropTypes.object
};
