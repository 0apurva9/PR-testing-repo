import React from "react";
import styles from "./OrderRelatedIssue.css";
import CheckOutHeader from "../../cart/components/CheckOutHeader";
import ProductImage from "../../general/components/ProductImage";
import SelectBoxMobile2 from "../../general/components/SelectBoxMobile2";
import FloatingLabelInputWithPlace from "../../general/components/FloatingLabelInputWithPlace";
import FloatingLabelInput from "../../general/components/FloatingLabelInput";
import CheckboxAndText from "../../cart/components/CheckboxAndText";
import TextArea from "../../general/components/TextArea";
import ImageUpload from "./ImageUpload";
import Button from "../../general/components/Button.js";
import format from "date-fns/format";

export default class CustomerCareOrderRelated extends React.Component {
  render() {
    let {
      l1OptionsArray,
      textboxData,
      customerQueriesFieldArray,
      radioData,
      checkboxData,
      textAreaData,
      attachmentData,
      getUserDetails,
      isSelected,
      productImageURL,
      orderDate,
      productName,
      productPrice,
      productStatus,
      transactionId,
      webform,
      solution,
      customerQryFldTextBox,
      textboxFldData,
      customerQryFldCheckBox,
      checkBoxDefaultFlag,
      customerQryFldRadio,
      radioSelectedOption,
      customerQryFldTextArea,
      comment,
      customerQryFldAttachment,
      file,
      email,
      mobile,
      onChange,
      onChangeReasonForOrderRelated,
      onChangeDefaultFlag,
      onUploadFile,
      submitCustomerForm,
      goToOrderPage
      // updateState
    } = this.props;
    return (
      <div className={styles.formHolder}>
        <div className={styles.firstTab}>
          {isSelected === 0 && (
            <div
              className={styles.selectedOrder}
              onClick={() => goToOrderPage()}
            >
              <div className={styles.headingHolder}>
                <CheckOutHeader
                  indexNumber="1"
                  confirmTitle="Select your order3"
                />
                <div className={styles.iconHolder} />
              </div>
              {!productImageURL &&
              !orderDate &&
              !productName &&
              !productPrice &&
              !productStatus ? (
                <div
                  className={styles.dummySelectBoxWithIcon}
                  onClick={() => this.goToOrderPage()}
                />
              ) : (
                <div
                  className={styles.productsDisplayHolder}
                  onClick={() =>
                    onChange({
                      showOrder: true,
                      productImageURL: "",
                      orderDate: "",
                      productName: "",
                      productPrice: "",
                      productStatus: ""
                    })
                  }
                >
                  <div className={styles.imageHolder}>
                    <ProductImage image={productImageURL} />
                  </div>
                  <div className={styles.dataHolder}>
                    {productName && (
                      <div className={styles.dataDescription}>
                        {productName}
                      </div>
                    )}
                    {orderDate && (
                      <div className={styles.dataDescription}>
                        {`Order on: ${format(orderDate, "DD MMM,YYYY")}`}
                      </div>
                    )}
                    {productPrice && (
                      <div className={styles.dataDescription}>
                        {productPrice}
                      </div>
                    )}
                    {productStatus && (
                      <div className={styles.dataDescription}>
                        {productStatus}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
          {transactionId && (
            <div className={styles.selectIssueHolder}>
              <div className={styles.formWrapper}>
                <div className={styles.secondOrder}>
                  <CheckOutHeader
                    indexNumber={isSelected === 0 ? "2" : "1"}
                    confirmTitle="Select issue"
                    fontSize={"14px"}
                  />
                </div>
                <div className={styles.selectIssue}>
                  <CheckOutHeader
                    indexNumber={"0"}
                    confirmTitle="What is the issue?"
                    fontSize={"13px"}
                  />
                  <SelectBoxMobile2
                    placeholder="Select issue"
                    arrowColour="black"
                    height={33}
                    extraVisibleBoxCss={true}
                    options={
                      l1OptionsArray &&
                      l1OptionsArray.map((val, i) => {
                        return {
                          value: val.uItemplateCode,
                          label: val.issueType
                        };
                      })
                    }
                    //isEnable={this.state.isEnableForOrderRelated}
                    onChange={val =>
                      onChangeReasonForOrderRelated(
                        val,
                        customerQueriesFieldArray
                      )
                    }
                  />
                </div>
                {webform === "No" && (
                  <div className={styles.selectIssue}>{solution}</div>
                )}
                {/* {webform === "Yes" &&
                            l2OptionsArray &&
                            l2OptionsArray.children &&
                            l2OptionsArray.children.length > 0 && (
                              <div className={styles.selectIssue}>
                                <SelectBoxMobile2
                                  placeholder="Select sub-issue"
                                  arrowColour="black"
                                  height={33}
                                  options={
                                    l2OptionsArray &&
                                    l2OptionsArray.children &&
                                    l2OptionsArray.children.map((val, i) => {
                                      return {
                                        value: val.nodeCode,
                                        label: val.nodeDesc
                                      };
                                    })
                                  }
                                  isEnable={
                                    this.state.isEnableForSubOrderRelated
                                  }
                                  onChange={val =>
                                    onChangeSubReasonForOrderRelated(val)
                                  }
                                />
                              </div>
                            )} */}
                <div className={styles.selectIssue}>
                  {webform === "Yes" && customerQryFldTextBox && (
                    <React.Fragment>
                      <div className={styles.secondOrder}>
                        <CheckOutHeader
                          indexNumber={"0"}
                          confirmTitle={textboxData.heading}
                          fontSize={"12px"}
                        />
                      </div>
                      <div className={styles.textInformationHolder}>
                        <FloatingLabelInputWithPlace
                          label={
                            textboxData.isMandatory
                              ? textboxData.placeholder + " *"
                              : textboxData.placeholder
                          }
                          placeholder={``}
                          disabled={false}
                          value={textboxFldData}
                          onChange={textboxFldData =>
                            onChange({ textboxFldData })
                          }
                          fontSize={"11px"}
                        />
                      </div>
                    </React.Fragment>
                  )}
                </div>
                <div className={styles.selectIssue}>
                  {webform === "Yes" && (
                    <React.Fragment>
                      {customerQryFldCheckBox && (
                        <div className={styles.textInformationHolder}>
                          {checkboxData &&
                            checkboxData.optionArray.map(ele => {
                              return (
                                <CheckboxAndText
                                  key={ele.value}
                                  label={ele.optionName}
                                  value={ele.value}
                                  size={"18px"}
                                  fontSize={"12px"}
                                  selected={
                                    checkBoxDefaultFlag === ele.value
                                      ? true
                                      : false
                                  }
                                  selectItem={() =>
                                    onChangeDefaultFlag(ele.value)
                                  }
                                />
                              );
                            })}
                        </div>
                      )}
                      {customerQryFldRadio && (
                        <div className={styles.secondOrder}>
                          <CheckOutHeader
                            indexNumber={"0"}
                            confirmTitle={
                              radioData.isMandatory
                                ? radioData.heading + " *"
                                : radioData.heading
                            }
                            fontSize={"12px"}
                          />
                          {radioData &&
                            radioData.optionArray.map(ele => {
                              return (
                                <div
                                  key={ele.value}
                                  className={styles.radioBtnMyAcc}
                                >
                                  <label>
                                    {ele.optionName}
                                    <input
                                      type="radio"
                                      value={ele.value}
                                      checked={
                                        ele.value == radioSelectedOption
                                          ? true
                                          : false
                                      }
                                      onChange={e =>
                                        onChange({
                                          radioSelectedOption: e.target.value
                                        })
                                      }
                                    />
                                    <span />
                                  </label>
                                </div>
                              );
                            })}
                        </div>
                      )}
                      {customerQryFldTextArea && (
                        <React.Fragment>
                          <div className={styles.secondOrder}>
                            <CheckOutHeader
                              indexNumber={"0"}
                              confirmTitle={textAreaData.heading}
                              fontSize={"12px"}
                              isAdditionsTextRight={true}
                            />
                          </div>
                          <TextArea
                            placeholder={textAreaData.placeholder}
                            value={comment}
                            onChange={comment => onChange({ comment })}
                            maxLength={parseInt(textAreaData.maxLimit)}
                          />
                        </React.Fragment>
                      )}
                    </React.Fragment>
                  )}
                </div>
              </div>
            </div>
          )}
          {webform === "Yes" && customerQryFldAttachment && (
            <div className={styles.selectImageHolder}>
              <div className={styles.formWrapper}>
                <div className={styles.secondOrder}>
                  <CheckOutHeader
                    indexNumber={isSelected === 0 ? "3" : "2"}
                    confirmTitle={
                      attachmentData.isMandatory
                        ? attachmentData.heading + " *"
                        : attachmentData.heading
                    }
                    fontSize={"14px"}
                  />
                  <div className={styles.validImage}>
                    Upload JPEG, PNG (Maximum size 5 MB)
                  </div>
                </div>

                <div className={styles.imageInput}>
                  <div className={styles.secondOrder}>
                    <CheckOutHeader
                      indexNumber={"0"}
                      confirmTitle={attachmentData.itemsTitle}
                      fontSize={"12px"}
                    />
                  </div>
                  <ImageUpload
                    value={
                      file.length
                        ? file && file.map(ele => ele.name).join(", ")
                        : "Upload attachment"
                    }
                    onChange={file =>
                      onUploadFile(file, parseInt(attachmentData.hexCode))
                    }
                  />
                </div>
              </div>
            </div>
          )}
          {transactionId && webform === "Yes" && (
            <div className={styles.selectIssueHolder}>
              <div className={styles.formWrapper}>
                <div className={styles.secondOrder}>
                  <CheckOutHeader
                    indexNumber={isSelected === 0 ? "4" : "3"}
                    confirmTitle="Communication Details"
                    fontSize={"14px"}
                  />
                </div>

                <div className={styles.textInformationHolder}>
                  <FloatingLabelInput
                    label="Email"
                    fontSize={"12px"}
                    disabled={
                      getUserDetails &&
                      getUserDetails.loginType === "email" &&
                      getUserDetails.userName
                        ? true
                        : false
                    }
                    value={email}
                    onChange={email => onChange({ email })}
                  />
                </div>
                <div className={styles.textInformationHolder}>
                  <FloatingLabelInput
                    label="Phone*"
                    maxLength={"10"}
                    value={mobile}
                    fontSize={"12px"}
                    onChange={mobile => onChange({ mobile })}
                    disabled={
                      getUserDetails &&
                      getUserDetails.loginType === "mobile" &&
                      getUserDetails.userName
                        ? true
                        : false
                    }
                    onlyNumber={true}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
        {webform === "Yes" && (
          <div className={styles.buttonHolder}>
            <div className={styles.button}>
              <Button
                type="primary"
                height={38}
                label={"SUBMIT NOW"}
                width={166}
                textStyle={{ color: "#fff", fontSize: 14 }}
                onClick={() => submitCustomerForm()}
              />
            </div>
          </div>
        )}
      </div>
    );
  }
}
