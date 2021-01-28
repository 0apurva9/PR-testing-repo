import React from "react";
import styles from "./AwbForm.css";
import PropTypes from "prop-types";
import UnderLinedButton from "../../general/components/UnderLinedButton";
import Input3 from "../../general/components/Input3.js";
import Button from "../../general/components/Button";
import ImageUploadWithoutBox from "./ImageUploadWithoutBox";
export default class AwbForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      awbNumber: this.props.awbNumber ? this.props.awbNumber : "",
      logisticsPartner: this.props.logisticsPartner
        ? this.props.logisticsPartner
        : "",
      file: "",
      courierCharge: this.props.courierCharge ? this.props.courierCharge : ""
    };
  }

  updateLater() {
    if (this.props.updateLater) {
      this.props.updateLater();
    }
  }

  onUpdate() {
    if (!this.state.awbNumber) {
      this.props.displayToast("Enter AWB number");
      return false;
    }
    if (!this.state.logisticsPartner) {
      this.props.displayToast("Enter logistics partner name");
      return false;
    }
    if (!this.state.courierCharge) {
      this.props.displayToast("Enter courier charges in rupees");
      return false;
    }
    if (!this.state.file) {
      this.props.displayToast("Please upload picture of receipt");
      return false;
    }
    let uploadedFile = this.state.file;
    if (!uploadedFile.type.includes("jpeg")) {
      if (!uploadedFile.type.includes("png")) {
        this.props.displayToast("Upload image in JPEG/PNG format only");
        return false;
      }
    }
    if (this.props.onUpdate) {
      this.props.onUpdate(this.state);
    }
  }

  onUploadFile(file) {
    if (file) {
      if (file.size <= 5000000) {
        this.setState({ file });
      } else {
        this.props.displayToast("File size should be less then 5 Mb");
      }
    }
  }

  render() {
    return (
      <div className={styles.base}>
        <div className={styles.inputHolder}>
          <Input3
            boxy={true}
            placeholder="AWB number"
            value={
              this.props.awbNumber ? this.props.awbNumber : this.state.awbNumber
            }
            onChange={awbNumber => this.setState({ awbNumber })}
            textStyle={{ fontSize: 14 }}
            height={35}
          />
        </div>
        <div className={styles.inputHolder}>
          <Input3
            boxy={true}
            placeholder="Logistics partner"
            value={
              this.props.logisticsPartner
                ? this.props.logisticsPartner
                : this.state.logisticsPartner
            }
            onChange={logisticsPartner => this.setState({ logisticsPartner })}
            textStyle={{ fontSize: 14 }}
            height={35}
          />
        </div>
        <div className={styles.inputHolder}>
          <Input3
            boxy={true}
            placeholder="Courier charges in ₹"
            value={
              this.props.courierCharge
                ? this.props.courierCharge
                : this.state.courierCharge
            }
            onChange={courierCharge => this.setState({ courierCharge })}
            textStyle={{ fontSize: 14 }}
            onlyNumber={true}
            height={35}
          />
        </div>

        <div className={styles.inputHolder}>
          <ImageUploadWithoutBox
            value={
              this.state.file
                ? this.state.file.name
                : "Upload picture of Receipt"
            }
            onChange={file => this.onUploadFile(file)}
          />
        </div>

        {this.props.isShowButton && (
          <div className={styles.buttonHolder}>
            {this.props.updateLater && (
              <div className={styles.doItLaterHolder}>
                <UnderLinedButton
                  size="14px"
                  fontFamily="regular"
                  color="#000"
                  label="Do it later"
                  onClick={() => this.updateLater()}
                />
              </div>
            )}

            <div className={styles.updateHolder}>
              <UnderLinedButton
                size="14px"
                fontFamily="regular"
                color="#ff1744"
                label="Update"
                onClick={() => this.onUpdate()}
              />
            </div>
          </div>
        )}
        <div className={styles.PopUpbuttonHolder}>
          <div className={styles.PopUpbutton}>
            <Button
              width={176}
              type="primary"
              label="CONTINUE"
              onClick={() => this.onUpdate()}
            />
          </div>
        </div>
      </div>
    );
  }
}
AwbForm.propTypes = {
  doItLater: PropTypes.func,
  updateLater: PropTypes.func,
  awbNumber: PropTypes.string,
  logisticsPartner: PropTypes.string,
  courierCharge: PropTypes.string,
  onChange: PropTypes.func,
  isUpload: PropTypes.bool,
  isShowButton: PropTypes.bool,
  displayToast: PropTypes.func,
  onUpdate: PropTypes.func,
};
