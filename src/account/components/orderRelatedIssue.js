import React from "react";
import styles from "./OrderRelatedIssue.css";
import MobileOnly from "../../general/components/MobileOnly";
import DesktopOnly from "../../general/components/DesktopOnly";
// import Icon from "../../xelpmoc-core/Icon";
import CustomerIssue from "./CustomerIssue.js";
// import ordersIcon from "../components/img/orders.svg";
import IssueContactOptions from "./IssueContactOptions";
import { SUCCESS } from "../../lib/constants";

export default class OrderRelatedIssue extends React.Component {
  state = {
    isSelected: 0,
    isIssueOptions: false,
    selectedQuestion: null,
    isQuesryForm: false,
    // isQuesryForm: true,
    orderList: true,
    isOrderDatails: false,
    // orderList: false,
    // isOrderDatails: true,
    selectedOrder: null,
    uploadedAttachments: null
  };
  tabSelect(val) {
    this.setState({ isSelected: val });
  }
  componentDidMount() {
    if (this.props.getNonOrderRelatedQuestions) {
      this.props.getNonOrderRelatedQuestions();
    }
    if (this.props.getOrdersTransactionData) {
      this.props.getOrdersTransactionData();
    }
    if (this.props.getUserDetails) {
      this.props.getUserDetails();
    }
  }
  getQuestyTesting() {
    //Only testing remove if form validation is completed
    this.props.getCustomerQueriesFieldsv2("SSW_18", false);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.customerQueriesFieldStatus == SUCCESS) {
      this.setState({ isIssueOptions: false, isQuesryForm: true });
    }
  }

  //  getOrderRelatedQuestions(transactionId) {
  //   if (this.props.getOrderRelatedQuestions)
  //      this.props.getOrderRelatedQuestions(transactionId);
  // }

  issueOptions(question) {
    this.setState({ isIssueOptions: true, selectedQuestion: question });
  }
  getCustomerQueriesFields() {
    if (this.props.getCustomerQueriesFieldsv2) {
      this.props.getCustomerQueriesFieldsv2(
        this.state.selectedQuestion.UItemplateCode,
        false
      );
    }
  }

  async getOrderRelatedQuestions(orderData) {
    this.setState({ selectedOrder: orderData });
    if (this.props.getOrderRelatedQuestions) {
      const response = await this.props.getOrderRelatedQuestions(
        orderData.products[0].transactionId
      );
      if (response.status == SUCCESS) {
        this.setState({ isOrderDatails: true, orderList: false });
      }
    }
  }

  async uploadUserFile(uploadUserFileObject) {
    const uploadFileResponse = await this.props.uploadUserFile(
      uploadUserFileObject
    );
    let { uploadUserFile, status } = uploadFileResponse;
    if (uploadFileResponse && status === SUCCESS) {
      this.setState({
        uploadedAttachments: uploadUserFile.imageURLlist
      });
    }
  }

  async submitCustomerForms(formData) {
    if (this.props.submitOrderDetails) {
      let getCustomerQueryDetailsObject = Object.assign(
        {},
        {
          // ticketID: null,
          // emailId: formData.customerInfo.contactEmail,
          // issue:
          //   this.state.isSelected == 1
          //     ? this.state.selectedObj[0].subIssueType
          //     : this.state.selectedObj[0].issueType,
          // tat: this.state.selectedObj[0].tat

          ticketID: "sedtasldfd12",
          // emailId: formData.customerInfo.contactEmail,
          issue: "Issue type",
          tat: "123"
        }
      );
      console.log("text show modal");
      this.props.showCustomerQueryModal(getCustomerQueryDetailsObject);

      // if (this.state.isSelected == 1) {
      //   getCustomerQueryDetailsObject.issueCategory = this.state.parentIssueLabel;
      // }
      // const submitOrderDetailsResponse = await this.props.submitOrderDetails(
      //   formData
      // );
      // if (submitOrderDetailsResponse.status === SUCCESS) {
      //   if (
      //     submitOrderDetailsResponse.submitOrder &&
      //     submitOrderDetailsResponse.submitOrder.referenceNum !== "duplicate"
      //   ) {
      //     getCustomerQueryDetailsObject.ticketID =
      //       submitOrderDetailsResponse.submitOrder.referenceNum;
      //     this.props.showCustomerQueryModal(getCustomerQueryDetailsObject);
      //   } else {
      //     this.props.displayToast(DUPLICATE_QUERY);
      //   }
      // }
    }
  }

  render() {
    console.log("ordersTransactionData", this.state.selectedQuestion);

    const {
      customerQueriesOtherIssueData,
      ordersTransactionData,
      orderRelatedIssueLoading,
      orderRelatedQuestionsData,
      orderRelatedQuestionsStatus,
      customerQueriesField
    } = this.props;
    if (orderRelatedIssueLoading) {
      this.props.showSecondaryLoader();
    } else {
      this.props.hideSecondaryLoader();
    }
    return (
      <div className={styles.base}>
        <MobileOnly>
          <h1>Here is only mobile</h1>
        </MobileOnly>
        {/* Desktop only code */}
        <DesktopOnly>
          {this.state.isIssueOptions ? (
            <IssueContactOptions
              getCustomerQueriesFields={() => this.getCustomerQueriesFields()}
            />
          ) : (
            <div className={styles.baseWrapper}>
              <div className={styles.formAbdTabHolder}>
                <div className={styles.tabHolder}>
                  {/* <div
                    className={[styles.tabHolderBox, styles.recentTicket].join(
                      " "
                    )}
                  >
                    <div className={styles.tabHeader}>Your Recent Tickets</div>

                    <div className={styles.recentList}>
                      <div className={styles.helpHeading}>Open Tickets</div>
                      <div className={styles.helpTxt}>
                        Lorem ipsum dorem lorem
                      </div>
                    </div>
                    <div className={styles.recentList}>
                      <div className={styles.helpHeading}>Closed Tickets</div>
                      <div className={styles.helpTxt}>
                        Lorem ipsum dorem lorem
                      </div>
                    </div>
                  </div> */}
                  <div className={styles.tabHolderBox}>
                    <div className={styles.tabHeader}>All Help Topics</div>

                    <div
                      className={[styles.helpList, styles.orderIcon].join(" ")}
                    >
                      <div className={styles.helpHeading}>Orders</div>
                      <div className={styles.helpTxt}>
                        Lorem ipsum dorem lorem
                      </div>
                    </div>
                    <div
                      className={[
                        styles.helpList,
                        styles.installationIcon
                      ].join(" ")}
                    >
                      <div className={styles.helpHeading}>
                        Installation & Warranty
                      </div>
                      <div className={styles.helpTxt}>
                        Lorem ipsum dorem lorem
                      </div>
                    </div>
                    <div
                      className={[styles.helpList, styles.invoiceIcon].join(
                        " "
                      )}
                    >
                      <div className={styles.helpHeading}>Invoice</div>
                      <div className={styles.helpTxt}>
                        Lorem ipsum dorem lorem
                      </div>
                    </div>
                    <div
                      className={[
                        styles.helpList,
                        styles.modificationIcon
                      ].join(" ")}
                    >
                      <div className={styles.helpHeading}>
                        Order Modification
                      </div>
                      <div className={styles.helpTxt}>
                        Lorem ipsum dorem lorem
                      </div>
                    </div>
                    <div
                      className={[styles.helpList, styles.shoppingIcon].join(
                        " "
                      )}
                    >
                      <div className={styles.helpHeading}>Shopping</div>
                      <div className={styles.helpTxt}>
                        Lorem ipsum dorem lorem
                      </div>
                    </div>
                    <div
                      className={[styles.helpList, styles.paymentsIcon].join(
                        " "
                      )}
                    >
                      <div className={styles.helpHeading}>Payments</div>
                      <div className={styles.helpTxt}>
                        Lorem ipsum dorem lorem
                      </div>
                    </div>
                    <div
                      className={[styles.helpList, styles.accountIcon].join(
                        " "
                      )}
                    >
                      <div className={styles.helpHeading}>
                        Manage your Account
                      </div>
                      <div className={styles.helpTxt}>
                        Lorem ipsum dorem lorem
                      </div>
                    </div>
                    <div
                      className={[styles.helpList, styles.contactIcon].join(
                        " "
                      )}
                    >
                      <div className={styles.helpHeading}>Contact Us</div>
                      <div className={styles.helpTxt}>
                        Lorem ipsum dorem lorem
                      </div>
                    </div>
                  </div>
                </div>

                <div className={styles.formHolder}>
                  <CustomerIssue
                    customerQueriesOtherIssueData={
                      customerQueriesOtherIssueData
                    }
                    selectedOrder={this.state.selectedOrder}
                    orderList={this.state.orderList}
                    isOrderDatails={this.state.isOrderDatails}
                    issueOptions={question => this.issueOptions(question)}
                    ordersTransactionData={ordersTransactionData}
                    orderRelatedQuestionsData={orderRelatedQuestionsData}
                    getOrderRelatedQuestions={selcetOrder =>
                      this.getOrderRelatedQuestions(selcetOrder)
                    }
                    orderRelatedQuestionsStatus={orderRelatedQuestionsStatus}
                    customerQueriesField={customerQueriesField}
                    isQuesryForm={this.state.isQuesryForm}
                    getQuestyTesting={() => this.getQuestyTesting()}
                    uploadUserFile={(issueType, title, file) =>
                      this.props.uploadUserFile(issueType, title, file)
                    }
                    uploadedAttachments={this.state.uploadedAttachments}
                    userDetails={this.props.userDetails}
                    submitCustomerForms={formaData =>
                      this.submitCustomerForms(formaData)
                    }
                    displayToast={message => this.props.displayToast(message)}
                  />
                </div>
              </div>
            </div>
          )}
        </DesktopOnly>
      </div>
    );
  }
}
