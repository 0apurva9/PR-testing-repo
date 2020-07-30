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
  COSTUMER_CLIQ_CARE_ROUTE,
  MY_ACCOUNT_PAGE,
  HOME_ROUTER
} from "../../lib/constants";
import SSRquest from "../../general/components/SSRequest";
import Icon from "../../xelpmoc-core/Icon";
const ORDER_REALTED_QUESTION = "orderRelated";
const NON_ORDER_REALTED_QUESTION = "NonOrderRelated";
const FAQ_PAGE = "ss-faq";
export default class OrderRelatedIssue extends React.Component {
  constructor(props) {
    super(props);
    const selectedOrderObj =
      this.props.location &&
      this.props.location.state &&
      this.props.location.state.selectedOrderObj;
    this.state = {
      isIssueOptions: false,
      isQuesryForm: false,
      questionList: [],
      orderList: true,
      isOrderDatails: false,
      isAnswerHelpFull: false,
      orderRelatedQuestion: false,
      otherQuestion: false,
      FAQquestion: false,
      selectedOrder: null,
      uploadedAttachments: null,
      orderAllList: false,
      parentIssueType: null,
      questionType: "",
      loaderResponse: true,
      isUserLogin: false,
      showQuestionList: false,
      showFeedBack: false,
      question: null,
      selectedOrderObj: selectedOrderObj,
      showLoader: false,
      raiseTiketRequest: false,
      raiseTiketSucess: false,
      slectOrderData: null
    };
    this.resetState = this.state;
  }

  componentDidMount() {
    if (this.props.getOrdersTransactionData) {
      this.props.getOrdersTransactionData(false);
    }

    if (this.props.getNonOrderRelatedQuestions) {
      this.props.getNonOrderRelatedQuestions();
    }

    if (this.props.getUserDetails) {
      this.props.getUserDetails();
    }
    if (this.props.getAllOthersHelp) {
      this.props.getAllOthersHelp(FAQ_PAGE);
    }
    if (this.props.currentState) {
      this.setState({ ...this.props.currentState });
    }

    if (this.state.selectedOrderObj) {
      this.orderRelatedInfo(this.state.selectedOrderObj);
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.logoutUserStatus !== this.props.logoutUserStatus) {
      if (nextProps.logoutUserStatus == "success") {
        this.setState(this.resetState);
      }
    }
  }
  moreHelps() {
    const { FAQquestion, question } = this.state;
    if (
      FAQquestion ||
      (question.webform === "No" &&
        question.call === "No" &&
        question.chat === "No" &&
        question.click2Call === "No")
    ) {
      this.setState({ isAnswerHelpFull: true });
    } else {
      this.setState({ isIssueOptions: true, showFeedBack: false });
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
      const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
      const customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
      if (userDetails || customerCookie) {
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
        this.props.setSelfServeState(this.state);
        this.navigateLogin();
      }
    }
  }

  feedBackHelpFull(e) {
    this.setState({ isAnswerHelpFull: true });
  }

  async submitCustomerForms(formData) {
    this.setState({ raiseTiketRequest: true, showLoader: true });
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
      if ((this.state.questionType = NON_ORDER_REALTED_QUESTION)) {
        getCustomerQueryDetailsObject.issueCategory = this.state.parentIssueType;
      }
      const submitOrderDetailsResponse = await this.props.submitOrderDetails(
        formData
      );
      setTimeout(() => {
        if (submitOrderDetailsResponse.status === SUCCESS) {
          getCustomerQueryDetailsObject.ticketID =
            submitOrderDetailsResponse.submitOrder.referenceNum;
          if (
            submitOrderDetailsResponse.submitOrder.referenceNum == "duplicate"
          ) {
            this.setState({ showLoader: false, raiseTiketRequest: false });
            this.props.showCustomerQueryModal(getCustomerQueryDetailsObject);
            this.props.setSelfServeState(null);
          } else {
            this.setState({ raiseTiketSucess: true, raiseTiketRequest: false });
            setTimeout(() => {
              this.setState({ showLoader: false, raiseTiketSucess: false });
              this.props.showCustomerQueryModal(getCustomerQueryDetailsObject);
              this.props.setSelfServeState(null);
            }, 2000);
          }
        }
      }, 2000);

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

  async orderRelatedInfo(orderData) {
    if (this.props.fetchOrderItemDetails) {
      this.props.fetchOrderItemDetails(
        orderData.orderCode,
        orderData.transactionId
      );
    }
    if (this.props.getOrderRelatedQuestions) {
      const response = await this.props.getOrderRelatedQuestions(
        orderData.transactionId
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
          questionType: ORDER_REALTED_QUESTION,
          slectOrderData: orderData.product
        });
      }
    }
  }

  getOrderRelatedQuestions(orderData, product) {
    const selectedOrder = {
      transactionId: product.transactionId,
      orderCode: orderData.orderId,
      product: product
    };
    this.orderRelatedInfo(selectedOrder);
  }

  async handleFAQClick(faq) {
    if (this.state.parentIssueType !== faq.FAQHeader) {
      if (this.props.getFaqRelatedQuestions) {
        const response = await this.props.getFaqRelatedQuestions(faq.FAQPageId);
        if (response.status === SUCCESS) {
          if (response.data && response.data.items) {
            const questionList = response.data.items[0].hasOwnProperty(
              "cmsTextComponent"
            )
              ? JSON.parse(response.data.items[0].cmsTextComponent.content)
              : JSON.parse(response.data.items[1].cmsTextComponent.content);
            this.setState({
              isOrderDatails: true,
              orderList: false,
              orderRelatedQuestion: false,
              otherQuestion: false,
              FAQquestion: true,
              showQuestionList: true,
              questionList: questionList,
              parentIssueType: faq.FAQHeader,
              questionType: NON_ORDER_REALTED_QUESTION,
              showFeedBack: false,
              isQuesryForm: false
            });
          }
        }
      }
    }
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
    if (url === `${MY_ACCOUNT_PAGE}${COSTUMER_CLIQ_CARE_ROUTE}`) {
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
  sendInvoice(ussid, sellerOrderNo) {
    if (this.props.sendInvoice) {
      this.props.sendInvoice(ussid, sellerOrderNo);
    }
  }
  hideLoader() {}
  navigatePreviousPage() {
    if (this.state.showQuestionList) {
      this.setState(this.resetState);
    } else if (this.state.showFeedBack) {
      this.setState({
        question: null,
        showQuestionList: true,
        showFeedBack: false,
        isAnswerHelpFull: false
      });
    } else if (this.state.isQuesryForm) {
      this.setState({
        showQuestionList: false,
        isQuesryForm: false,
        isIssueOptions: true
      });
    } else if (this.state.isIssueOptions) {
      this.setState({
        isAnswerHelpFull: false,
        isIssueOptions: false,
        showFeedBack: true
      });
    }
  }
  navigateHomePage() {
    this.props.history.push(HOME_ROUTER);
  }
  updateThanks() {
    this.setState({ isAnswerHelpFull: false });
  }
  navigateCliqCarePage() {
    this.setState(this.resetState);
  }

  render() {
    console.log("check");
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
      FAQData,
      FAQRelatedDataLoading,
      FAQDataLoading,
      loadingForFetchOrderDetails,
      loadingForSendInvoice
    } = this.props;
    if (
      customerQueriesOtherIssueLoading ||
      ordersTransactionLoading ||
      loadingForUserDetails ||
      orderRelatedIssueLoading ||
      customerQueriesLoading ||
      uploadUserFileLoading ||
      FAQDataLoading ||
      FAQRelatedDataLoading ||
      loadingForFetchOrderDetails ||
      loadingForSendInvoice
    ) {
      this.props.showSecondaryLoader();
    } else {
      this.props.hideSecondaryLoader();
    }

    if (this.state.showLoader) {
      return (
        <SSRquest
          raiseTiketRequest={this.state.raiseTiketRequest}
          raiseTiketSucess={this.state.raiseTiketSucess}
        />
      );
    } else {
      return (
        <div className={styles.base}>
          <DesktopOnly>
            {this.state.isIssueOptions ? (
              <MoreHelps
                getCustomerQueriesFields={() => this.getCustomerQueriesFields()}
                selectedOrder={this.state.question}
                navigatePreviousPage={() => this.navigatePreviousPage()}
                navigateHomePage={() => this.navigateHomePage()}
              />
            ) : (
              <div className={styles.baseWrapper}>
                <div className={styles.formAbdTabHolder}>
                  <div className={styles.tabHolder}>
                    <div className={styles.tabHolderBox}>
                      <div className={styles.tabHeader}>All Help Topics</div>

                      <div className={styles.faqList}>
                        {FAQData &&
                          FAQData.map((faq, index) => {
                            return (
                              <div
                                className={styles.faqListBox}
                                onClick={() => {
                                  this.handleFAQClick(faq);
                                }}
                              >
                                <div className={styles.faqIcon}>
                                  <Icon
                                    image={
                                      this.state.parentIssueType ==
                                      faq.FAQHeader
                                        ? `${require("../components/img/" +
                                            faq.image.split(".")[0] +
                                            "active" +
                                            ".svg")}`
                                        : `${require("../components/img/" +
                                            faq.image.split(".")[0] +
                                            ".svg")}`
                                    }
                                    width={33}
                                    height={33}
                                  />
                                </div>
                                <div className={styles.faqHederBox}>
                                  <div
                                    className={[
                                      styles.faqHeader,
                                      this.state.parentIssueType ==
                                      faq.FAQHeader
                                        ? styles.colorRed
                                        : null
                                    ].join(" ")}
                                  >
                                    {faq.FAQHeader.replace("&amp;", "&")}
                                  </div>
                                  <div className={styles.faqSubheading}>
                                    {faq.FAQSubHeader.includes("&amp;")
                                      ? faq.FAQSubHeader.replace(/&amp;/g, "&")
                                      : faq.FAQSubHeader}
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
                      selectedOrder={this.props.selectedOrderDetails || null}
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
                      getOrderRelatedQuestions={(orderData, product) =>
                        this.getOrderRelatedQuestions(orderData, product)
                      }
                      orderRelatedQuestionsStatus={orderRelatedQuestionsStatus}
                      isQuesryForm={this.state.isQuesryForm}
                      uploadUserFile={(issueType, title, file) =>
                        this.props.uploadUserFile(issueType, title, file)
                      }
                      feedBackHelpFull={() => this.feedBackHelpFull()}
                      isAnswerHelpFull={this.state.isAnswerHelpFull}
                      uploadedAttachments={this.state.uploadedAttachments}
                      userDetails={this.props.userDetails}
                      submitCustomerForms={formaData =>
                        this.submitCustomerForms(formaData)
                      }
                      displayToast={message => this.props.displayToast(message)}
                      customerQueriesField={customerQueriesField}
                      getCustomerQueriesFields={(
                        webFormTemplate,
                        isIssueOptions
                      ) =>
                        this.getCustomerQueriesFields(
                          webFormTemplate,
                          isIssueOptions
                        )
                      }
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
                      sendInvoice={(ussid, sellerOrderNo) => {
                        this.sendInvoice(ussid, sellerOrderNo);
                      }}
                      navigatePreviousPage={() => this.navigatePreviousPage()}
                      navigateHomePage={() => this.navigateHomePage()}
                      updateThanks={() => this.updateThanks()}
                      navigateCliqCarePage={() => this.navigateCliqCarePage()}
                      slectOrderData={this.state.slectOrderData}
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
