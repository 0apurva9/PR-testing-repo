import React from "react";
import OrderCard from "./OrderCard";
import SelectBoxMobile2 from "../../general/components/SelectBoxMobile2";
import TextArea from "../../general/components/TextArea";
import UnderLinedButton from "../../general/components/UnderLinedButton";
import Button from "../../general/components/Button";
import CancelAndContinueButton from "./CancelAndContinueButton";
import styles from "./ReturnReasonForm.css";
import ReverseSealYesNo from "./ReverseSealYesNo.js";
import DeskTopOnly from "../../general/components/DesktopOnly.js";
import MobileOnly from "../../general/components/MobileOnly.js";
import DummyTab from "../../cart/components/DummyTab.js";
import cancel from "../../general/components/img/canceltransperent.png";
const MODE_OF_RETURN = "Select mode of return";
const REFUND_DETAILS = "Refund Details";
export default class ReturnReasonForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displaySecondary: false,
      secondaryReasons: null,
      comment: null,
      reverseSeal: null,
      returnReasonCode: null,
      subReasonCode: null,
      subReason: null,
      isEnable: false,
      uploadedImageFiles: "",
      validImgFiles: "",
      showImageUpload: false
    };
  }
  handleContinue() {
    if (this.props.onContinue) {
      let reasonAndCommentObj = Object.assign(
        {},
        {
          returnReasonCode: this.state.returnReasonCode,
          subReasonCode: this.state.subReasonCode,
          subReason: this.state.subReason,
          comment: this.state.comment,
          reason: this.state.reason,
          reverseSeal: this.state.reverseSeal,
          sellerorderno: this.props.returnProductDetails.orderProductWsDTO[0]
            .sellerorderno,
          transactionId: this.props.returnProductDetails.orderProductWsDTO[0]
            .transactionId,
          validImgFiles: this.state.validImgFiles,
          showImageUpload: this.state.showImageUpload
        }
      );
      this.props.onContinue(reasonAndCommentObj);
    }
  }
  onChangePrimary(val) {
    const code = val.value;
    const label = val.label;
    const data = this.props.returnProductDetails;
    this.setState({
      subReasonCode: null,
      subReason: null,
      returnReasonCode: code,
      reason: label,
      isEnable: false,
      secondaryReasons: data.returnReasonMap
        .filter(val => {
          return val.parentReasonCode === code;
        })
        .map(val => {
          if (val.subReasons) {
            return val.subReasons.map(value => {
              return {
                value: value.subReasonCode,
                label: value.subReturnReason,
                isImageApplicable: value.isImageApplicable
              };
            });
          }
        })[0]
    });
    //getting value from html converts its to string so checking in below way,
    //not using === as it is not working
    if (val.isImageApplicable == "true") {
      this.setState({ showImageUpload: true });
    } else {
      this.setState({ showImageUpload: false });
    }
  }
  handleChange(val) {
    this.setState({ comment: val });
  }
  selectReverseSeal(val) {
    this.setState({ reverseSeal: val });
  }
  onChangeSecondary(val) {
    const code = val.value;
    const label = val.label;
    this.setState({ subReasonCode: code, subReason: label, isEnable: true });
    //getting value from html converts its to string so checking in below way,
    //not using === as it is not working
    if (val.isImageApplicable == "true") {
      this.setState({ showImageUpload: true });
    } else {
      this.setState({ showImageUpload: false });
    }
  }
  handleCancel() {
    if (this.props.onCancel) {
      this.props.onCancel();
    }
  }
  handleFileUpload(e) {
    let uploadedFilesArr = Array.from(e.target.files);
    if (uploadedFilesArr.length > 8) {
      return this.props.displayToast("Upload maximum 8 images");
    }
    let imgArray = [];
    let validImageFiles = [];
    uploadedFilesArr.map((value, index) => {
      if (!value.type.includes("image")) {
        return this.props.displayToast("Upload file in image file format only");
      }
      if (!value.type.includes("jpeg")) {
        if (!value.type.includes("png")) {
          return this.props.displayToast(
            "Upload image in JPEG/PNG format only"
          );
        }
      }
      if (value.size > 2500000) {
        return this.props.displayToast(
          "The Image size should be lesser than 2.5MB"
        );
      }
      let eachImgSrc = URL.createObjectURL(value);
      imgArray.push(eachImgSrc);
      validImageFiles.push(value);
    });
    this.setState({ uploadedImageFiles: imgArray });
    this.setState({ validImgFiles: validImageFiles });
  }
  removeFile(filename, indexOfRemovedFile) {
    let fileNames = this.state.uploadedImageFiles;
    let index = fileNames.indexOf(filename);
    if (index > -1) {
      fileNames.splice(index, 1);
      this.setState({ uploadedImageFiles: fileNames });
    }
    let updatedValidImgFiles = this.state.validImgFiles;
    if (indexOfRemovedFile > -1) {
      updatedValidImgFiles.splice(indexOfRemovedFile, 1);
      this.setState({ validImgFiles: updatedValidImgFiles });
    }
  }
  render() {
    const data = this.props.returnProductDetails;
    let imageCallOut = data && data.attachmentImageCallout;
    let imageCallOutArr = imageCallOut && imageCallOut.split("|");
    return (
      <div className={styles.base}>
        <div className={styles.content}>
          <div className={styles.selectReasonWithText}>
            {/* <DeskTopOnly>
							<div className={styles.header}>
								{/* <div className={styles.circleHolder}>
									<div className={styles.circle}>1</div>
								</div>
								Select reason for your return
							</div>
						</DeskTopOnly> */}
            {this.props.returnFlow == false ? (
              <div className={styles.header}>
                <div className={styles.circleHolder}>
                  <div className={styles.circle}>1</div>
                </div>
                Select reason for your return
              </div>
            ) : (
              <div className={styles.header}>Please select return reason</div>
            )}
            <div className={styles.select}>
              <SelectBoxMobile2
                placeholder={
                  this.props.returnFlow ? "Select issue" : "Select a reason"
                }
                options={
                  data &&
                  data.returnReasonMap &&
                  data.returnReasonMap.map((val, i) => {
                    return {
                      value: val.parentReasonCode,
                      label: val.parentReturnReason,
                      isImageApplicable: val.isImageApplicable
                    };
                  })
                }
                onChange={val => this.onChangePrimary(val)}
              />
            </div>
            {this.state.secondaryReasons && (
              <div className={styles.select}>
                <SelectBoxMobile2
                  placeholder={"Select a reason"}
                  options={this.state.secondaryReasons}
                  onChange={val => this.onChangeSecondary(val)}
                  isEnable={this.state.isEnable}
                />
              </div>
            )}
            <div className={styles.textArea}>
              <TextArea
                value={this.state.comment}
                onChange={val => this.handleChange(val)}
              />
            </div>
            <DeskTopOnly>
              <div className={styles.buttonHolder}>
                <CancelAndContinueButton
                  handleCancel={() => this.handleCancel()}
                  handleContinue={() => this.handleContinue()}
                  disabled={this.state.reason ? false : true}
                />
              </div>
            </DeskTopOnly>
          </div>
        </div>
        {data &&
          data.showReverseSealFrJwlry === "yes" && (
            <div className={styles.reverseSealHolder}>
              <ReverseSealYesNo
                selectReverseSeal={val => this.selectReverseSeal(val)}
              />
            </div>
          )}
        {this.state.showImageUpload && (
          <div className={styles.returnReasonForm}>
            <div className={styles.returnTitle}>Add attachments*</div>
            {imageCallOutArr && (
              <ol className={styles.imgAttachmentText}>
                {imageCallOutArr.map((value, index) => {
                  return <li key={index}>{value}</li>;
                })}
              </ol>
            )}

            <div className={styles.imagePreviewContainer}>
              {this.state.uploadedImageFiles.length > 0 &&
                this.state.uploadedImageFiles.map((val, index) => {
                  return (
                    <div className={styles.imagePreview} key={index}>
                      <img
                        id="panImage"
                        src={val}
                        alt="Upload"
                        width="60%"
                        height="auto"
                      />
                      <div className={styles.cancel}>
                        <img
                          src={cancel}
                          onClick={() => this.removeFile(val, index)}
                          alt="cancel"
                        />
                      </div>
                    </div>
                  );
                })}
            </div>

            <div className={styles.uploadimageButton}>
              <div className={styles.fileuploadButton}>
                <span className={styles.addImageSign} />
              </div>
              <input
                type="file"
                ref="file"
                className={styles.fileUpload}
                onChange={event => this.handleFileUpload(event)}
                name="textFile"
                multiple
              />
            </div>
            <div className={styles.imgAttachmentSubText}>
              Upload JPEG, PNG (Maximum size per image 2.5 MB)
            </div>
          </div>
        )}
        {this.props.returnFlow ? (
          ""
        ) : (
          <DummyTab title={MODE_OF_RETURN} number={2} />
        )}
        {this.props.returnFlow ? (
          ""
        ) : (
          <DummyTab title={REFUND_DETAILS} number={3} />
        )}
      </div>
    );
  }
}
