import React from "react";
import styles from "./OrderRelatedIssue.css";
import MobileOnly from "../../general/components/MobileOnly";
import DesktopOnly from "../../general/components/DesktopOnly";
import * as Cookie from "../../lib/Cookie";
import CustomerIssue from "./CustomerIssue.js";
import MoreHelps from "./MoreHelps";
import {
  SUCCESS,
  LOGGED_IN_USER_DETAILS,
  CUSTOMER_ACCESS_TOKEN,
  LOGIN_PATH,
  COSTUMER_ORDER_RELATED_QUERY_ROUTE,
  MY_ACCOUNT_PAGE
} from "../../lib/constants";
import SSRquest from "../../general/components/SSRequest";
import Icon from "../../xelpmoc-core/Icon";
const ORDER_REALTED_QUESTION = "orderRelated";
const NON_ORDER_REALTED_QUESTION = "NonOrderRelated";
export default class OrderRelatedIssue extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSelected: 0,
      isIssueOptions: false,
      isQuesryForm: false,
      questionList: [],
      orderList: true,
      isOrderDatails: false,
      orderRelatedQuestion: false,
      otherQuestion: false,
      FAQquestion: false,
      selectedOrder: null,
      uploadedAttachments: null,
      orderAllList: false,
      parentIssueType: null,
      questionType: "",
      name: "",
      mobile: "",
      email: "",
      loaderResponse: true,
      isUserLogin: false,
      showQuestionList: false,
      showFeedBack: false,
      question: null
    };
  }
  tabSelect(val) {
    this.setState({ isSelected: val });
  }
  componentDidMount() {
    const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    const customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
    if (userDetails || customerCookie) {
      this.setState({ isUserLogin: true });
      if (
        this.props.getOrdersTransactionData &&
        !this.props.ordersTransactionData
      ) {
        this.props.getOrdersTransactionData(false);
      }
    }
    if (this.props.getNonOrderRelatedQuestions) {
      this.props.getNonOrderRelatedQuestions();
    }

    if (this.props.getUserDetails) {
      this.props.getUserDetails();
    }
    if (this.props.getFAQQuestions) {
      this.props.getFAQQuestions();
    }
  }
  getQuestyTesting() {
    //Only testing remove if form validation is completed
    this.props.getCustomerQueriesFieldsv2("SSW_18", false);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.userDetails !== this.props.userDetails) {
      this.setState({
        email: nextProps.userDetails.emailID
          ? nextProps.userDetails.emailID
          : "",
        name:
          nextProps.userDetails.firstName || nextProps.userDetails.lastName
            ? `${nextProps.userDetails.firstName} ${nextProps.userDetails.lastName}`
            : "",
        mobile: nextProps.userDetails.mobileNumber
          ? nextProps.userDetails.mobileNumber
          : ""
      });
    }
  }
  moreHelps(question) {
    if (this.state.FAQquestion) {
      console.log("FAq no ");
    } else {
      // if (this.state.isUserLogin) {
      this.setState({ isIssueOptions: true });
      // }
      // else{
      //   this.navigateLogin();
      // }
    }
  }

  async getCustomerQueriesFields(issue, isSelecteRadio = false) {
    if (isSelecteRadio) {
      const response = await this.props.getCustomerQueriesFieldsv2(
        issue,
        isSelecteRadio
      );
      if (response.status == SUCCESS) {
        this.setState({
          isIssueOptions: false,
          isQuesryForm: true,
          showFeedBack: false
        });
      }
    } else {
      if (this.state.isUserLogin) {
        if (this.props.getCustomerQueriesFieldsv2) {
          const response = await this.props.getCustomerQueriesFieldsv2(
            this.state.question.UItemplateCode,
            isSelecteRadio
          );
          if (response.status == SUCCESS) {
            this.setState({
              isIssueOptions: false,
              isQuesryForm: true,
              showFeedBack: false
            });
          }
        }
      } else {
        this.navigateLogin();
      }
    }
  }

  async submitCustomerForms(formData) {
    if (this.props.submitOrderDetails) {
      let getCustomerQueryDetailsObject = Object.assign(
        {},
        {
          ticketID: null,
          issue:
            this.state.questionType == ORDER_REALTED_QUESTION
              ? this.state.question.issueType
              : this.state.question.subIssueType,
          tat: this.state.question.tat,
          emailId: formData.customerInfo.contactEmail
        }
      );
      // this.props.showCustomerQueryModal(getCustomerQueryDetailsObject);

      if ((this.state.questionType = NON_ORDER_REALTED_QUESTION)) {
        getCustomerQueryDetailsObject.issueCategory = this.state.parentIssueType;
      }
      console.log("form data", formData);
      // this.props.showCustomerQueryModal(getCustomerQueryDetailsObject);

      // this.props.showCustomerQueryModal(getCustomerQueryDetailsObject)
      // const submitOrderDetailsResponse = await this.props.submitOrderDetails(
      //   formData
      // );
      // if (submitOrderDetailsResponse.status === SUCCESS) {
      //   getCustomerQueryDetailsObject.ticketID =
      //     submitOrderDetailsResponse.submitOrder.referenceNum;
      //   this.props.showCustomerQueryModal(getCustomerQueryDetailsObject);
      // }
    }
  }

  selectOtehrQuestion(selectOtehrQuestion) {
    this.setState({
      isOrderDatails: true,
      orderList: false,
      orderRelatedQuestion: false,
      otherQuestion: true,
      FAQquestion: false,
      showQuestionList: true,
      questionList: selectOtehrQuestion.listofSubIssues,
      parentIssueType: selectOtehrQuestion.parentIssueType,
      questionType: NON_ORDER_REALTED_QUESTION
    });
  }

  async getOrderRelatedQuestions(orderData) {
    this.setState({ selectedOrder: orderData });
    if (this.props.getOrderRelatedQuestions) {
      const response = await this.props.getOrderRelatedQuestions(
        orderData.products[0].transactionId
      );
      if (response.status == SUCCESS && response.orderRelatedQuestions) {
        this.setState({
          orderAllList: false,
          isOrderDatails: true,
          orderList: false,
          orderRelatedQuestion: true,
          otherQuestion: false,
          FAQquestion: false,
          showQuestionList: true,
          questionList: response.orderRelatedQuestions.listOfIssues,
          parentIssueType: null,
          questionType: ORDER_REALTED_QUESTION
        });
      }
    }
  }

  getFAQQuestionSelect(faq) {
    this.setState({
      isOrderDatails: true,
      orderList: false,
      orderRelatedQuestion: false,
      otherQuestion: false,
      FAQquestion: true,
      showQuestionList: true,
      questionList: this.props.customerQueriesOtherIssueData.parentIssueList[1]
        .listofSubIssues,
      parentIssueType: null,
      questionType: NON_ORDER_REALTED_QUESTION,
      showFeedBack: false,
      isQuesryForm: false

      // isOrderDatails: true,
      // orderList: false,
      // orderRelatedQuestion: false,
      // otherQuestion: true,
      // FAQquestion: true,
      // questionList: this.props.customerQueriesOtherIssueData.parentIssueList[1]
      //   .listofSubIssues,
      // parentIssueType: null
    });
  }

  selectQuestion(question, index) {
    this.setState({
      question: question,
      showQuestionList: false,
      showFeedBack: true
    });
  }

  showAllOrdersList() {
    this.setState({ orderAllList: true });
  }
  hideAllOrder() {
    this.setState({ orderAllList: false });
  }

  navigateLogin() {
    const url = this.props.location.pathname;
    if (url === `${MY_ACCOUNT_PAGE}${COSTUMER_ORDER_RELATED_QUERY_ROUTE}`) {
      if (this.props.setUrlToRedirectToAfterAuth) {
        this.props.setUrlToRedirectToAfterAuth(url);
      }
    }
    this.props.history.push(LOGIN_PATH);
  }

  getMoreOrder() {
    if (
      this.props.ordersTransactionData &&
      (this.props.ordersTransactionData.currentPage + 1) *
        this.props.ordersTransactionData.pageSize <
        this.props.ordersTransactionData.totalNoOfOrders
    ) {
      this.props.getOrdersTransactionData(true);
    }
  }

  render() {
    const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    const customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
    let isUserLogin = false;
    if (userDetails || customerCookie) {
      isUserLogin = true;
    }

    const {
      customerQueriesOtherIssueData,
      customerQueriesOtherIssueLoading,
      ordersTransactionData,
      orderRelatedIssueLoading,
      orderRelatedQuestionsData,
      orderRelatedQuestionsStatus,
      ordersTransactionLoading,
      customerQueriesField,
      loadingForUserDetails,
      customerQueriesLoading,
      uploadUserFileLoading,
      submitOrderDetailsLoading,
      FAQQuestionsListData
    } = this.props;
    if (
      customerQueriesOtherIssueLoading ||
      ordersTransactionLoading ||
      loadingForUserDetails ||
      orderRelatedIssueLoading ||
      customerQueriesLoading ||
      uploadUserFileLoading
    ) {
      this.props.showSecondaryLoader();
    } else {
      this.props.hideSecondaryLoader();
    }

    if (this.props.submitOrderDetailsLoading) {
      return <SSRquest></SSRquest>;
    } else {
      return (
        <div className={styles.base}>
          <MobileOnly>
            <h1>Here is only mobile</h1>
          </MobileOnly>
          <DesktopOnly>
            {this.state.isIssueOptions ? (
              <MoreHelps
                getCustomerQueriesFields={() => this.getCustomerQueriesFields()}
                selectedOrder={this.state.question}
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

                      <div className={styles.faqList}>
                        {FAQQuestionsListData &&
                          FAQQuestionsListData.map((faq, index) => {
                            return (
                              <div
                                className={styles.faqListBox}
                                onClick={() => {
                                  this.getFAQQuestionSelect(faq);
                                }}
                              >
                                <div className={styles.faqIcon}>
                                  <Icon
                                    image={`${require("../components/img/" +
                                      faq.image.split(".")[0] +
                                      ".svg")}`}
                                    width={33}
                                    height={33}
                                  ></Icon>
                                </div>
                                <div className={styles.faqHederBox}>
                                  <div className={styles.faqHeader}>
                                    {faq.FAQHeader}
                                  </div>
                                  <div className={styles.faqSubheading}>
                                    {faq.FAQSubHeader}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
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
                      moreHelps={() => this.moreHelps()}
                      ordersTransactionData={ordersTransactionData}
                      questionsList={this.state.questionList}
                      selectQuestion={(listOfIssue, index) =>
                        this.selectQuestion(listOfIssue, index)
                      }
                      showFeedBack={this.state.showFeedBack}
                      question={this.state.question}
                      getOrderRelatedQuestions={selcetOrder =>
                        this.getOrderRelatedQuestions(selcetOrder)
                      }
                      orderRelatedQuestionsStatus={orderRelatedQuestionsStatus}
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
                      customerQueriesField={customerQueriesField}
                      name={this.state.name}
                      email={this.state.email}
                      mobile={this.state.mobile}
                      getCustomerQueriesFields={(
                        webFormTemplate,
                        isIssueOptions
                      ) =>
                        this.getCustomerQueriesFields(
                          webFormTemplate,
                          isIssueOptions
                        )
                      }
                      // selectedQuestion={this.state.selectedQuestion}
                      orderRelatedQuestion={this.state.orderRelatedQuestion}
                      otherQuestion={this.state.otherQuestion}
                      FAQquestion={this.state.FAQquestion}
                      selectOtehrQuestion={selectedOtehrQuestion =>
                        this.selectOtehrQuestion(selectedOtehrQuestion)
                      }
                      parentIssueType={this.state.parentIssueType}
                      orderAllList={this.state.orderAllList}
                      showAllOrdersList={() => this.showAllOrdersList()}
                      hideAllOrder={() => this.hideAllOrder()}
                      questionType={this.state.questionType}
                      isUserLogin={isUserLogin}
                      navigateLogin={() => this.navigateLogin()}
                      getMoreOrder={() => this.getMoreOrder()}
                      showQuestionList={this.state.showQuestionList}
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
}
