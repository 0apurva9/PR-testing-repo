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
  HOME_ROUTER,
  CLIQ_CARE
} from "../../lib/constants";
import {
  setDataLayerForCLiQCarePage,
  ADOBE_SELF_SERVE_OTHER_ISSUES_CLICK,
  ADOBE_SELF_SERVE_ALL_HELP_TOPIC_CLICK,
  ADOBE_SELF_SERVE_PAGE_LOAD,
  ADOBE_SELF_SERVE_ISSUE_SELECTION,
  ADOBE_SELF_SERVE_FEEDBACK_SELECTION,
  ADOBE_SELF_SERVE_CONTINUE_BUTTON_CLICK,
  ADOBE_SELF_SERVE_NON_ORDER_CATEGORY_CLICK,
  ADOBE_SELF_SERVE_SUBMIT_CLICK,
  ADOBE_SELF_SERVE_NON_ORDER_PAGE_LOAD,
  ADOBE_SELF_SERVE_NON_ORDER_QUESTION_CLICK,
  ADOBE_LOGIN_START
} from "../../lib/adobeUtils";
import SSRquest from "../../general/components/SSRequest";
import Icon from "../../xelpmoc-core/Icon";
const ORDER_REALTED_QUESTION = "orderRelated";
const NON_ORDER_REALTED_QUESTION = "NonOrderRelated";
const FAQ_PAGE = "ss-faq";
const YES = "Yes";
const NO = "No";
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
      slectOrderData: null,
      formSubmit: false
    };
    this.resetState = this.state;
  }

  componentDidMount() {
    setDataLayerForCLiQCarePage(ADOBE_SELF_SERVE_PAGE_LOAD, null, [
      CLIQ_CARE,
      "Care_Homepage"
    ]);
    if (this.props.getOrdersTransactionData) {
      this.props.getOrdersTransactionData(false);
    }
    if (this.props.getNonOrderRelatedQuestions) {
      setDataLayerForCLiQCarePage(ADOBE_SELF_SERVE_OTHER_ISSUES_CLICK);
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
    setDataLayerForCLiQCarePage(
      ADOBE_SELF_SERVE_FEEDBACK_SELECTION,
      NO.toLowerCase()
    );
    if (this.state.orderRelatedQuestion) {
      setDataLayerForCLiQCarePage(
        ADOBE_SELF_SERVE_PAGE_LOAD,
        this.getOrderData(),
        "Care_Order_MoreHelp"
      );
    }
    if (this.state.otherQuestion) {
      setDataLayerForCLiQCarePage(
        ADOBE_SELF_SERVE_NON_ORDER_PAGE_LOAD,
        this.getNonOrderData(),
        "Care_Other_MoreHelp"
      );
    }
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
    setDataLayerForCLiQCarePage(
      ADOBE_SELF_SERVE_FEEDBACK_SELECTION,
      YES.toLowerCase()
    );
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
      setDataLayerForCLiQCarePage(ADOBE_SELF_SERVE_SUBMIT_CLICK);
      const submitOrderDetailsResponse = await this.props.submitOrderDetails(
        formData
      );
      setTimeout(() => {
        if (submitOrderDetailsResponse.status === SUCCESS) {
          if (
            submitOrderDetailsResponse.submitOrder.referenceNum == "duplicate"
          ) {
            let pageName = this.state.otherQuestion
              ? "Care_Other_Webform_Duplicate"
              : "Care_Order_Webform_Duplicate";
            setDataLayerForCLiQCarePage(
              ADOBE_SELF_SERVE_PAGE_LOAD,
              submitOrderDetailsResponse.submitOrder.referenceNum,
              [pageName, "TicketCreation"]
            );
            this.setState({
              showLoader: false,
              raiseTiketRequest: false,
              formSubmit: true
            });
            this.props.showCustomerQueryModal(getCustomerQueryDetailsObject);
            this.props.setSelfServeState(null);
          } else {
            let pageName = this.state.otherQuestion
              ? "Care_Other_Webform_Success"
              : "Care_Order_Webform_Success";
            setDataLayerForCLiQCarePage(
              ADOBE_SELF_SERVE_PAGE_LOAD,
              submitOrderDetailsResponse.submitOrder.referenceNum,
              [pageName, "TicketCreation"]
            );
            this.setState({
              raiseTiketSucess: true,
              raiseTiketRequest: false,
              formSubmit: true
            });
            setTimeout(() => {
              this.setState({ showLoader: false, raiseTiketSucess: false });
              this.props.showCustomerQueryModal({
                ticketId: submitOrderDetailsResponse.submitOrder.referenceNum,
                sla: submitOrderDetailsResponse.submitOrder.sla
              });
              this.props.setSelfServeState(null);
            }, 2000);
          }
        }
      }, 2000);

      // }
    }
  }
  getNonOrderData = () => {
    return {
      name: this.state.parentIssueType,
      question: this.state.question.subIssueType
    };
  };

  selectOtehrQuestion(selectOtehrQuestion) {
    setDataLayerForCLiQCarePage(
      ADOBE_SELF_SERVE_NON_ORDER_CATEGORY_CLICK,
      selectOtehrQuestion.parentIssueType
    );
    setDataLayerForCLiQCarePage(
      ADOBE_SELF_SERVE_NON_ORDER_PAGE_LOAD,
      {
        name: selectOtehrQuestion.parentIssueType
      },
      "Care_Other_Questions"
    );
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
    setDataLayerForCLiQCarePage(
      ADOBE_SELF_SERVE_PAGE_LOAD,
      {
        status:
          orderData && orderData.product && orderData.product.statusDisplay,
        id: orderData && orderData.product && orderData.product.transactionId,
        productId:
          orderData && orderData.product && orderData.product.productcode
      },
      "Care_Order_Questions"
    );

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
    setDataLayerForCLiQCarePage(
      ADOBE_SELF_SERVE_ALL_HELP_TOPIC_CLICK,
      faq.FAQHeader
    );
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
  getOrderData = () => {
    return {
      status: this.state.slectOrderData.statusDisplay,
      id: this.state.slectOrderData.transactionId,
      productId: this.state.slectOrderData.productcode
    };
  };

  selectQuestion(question, index) {
    if (this.state.orderRelatedQuestion) {
      setDataLayerForCLiQCarePage(
        ADOBE_SELF_SERVE_ISSUE_SELECTION,
        question.issueType
      );

      setDataLayerForCLiQCarePage(
        ADOBE_SELF_SERVE_PAGE_LOAD,
        {
          order: this.getOrderData(),
          issue: {
            title: question.issueType
          }
        },
        "Care_Order_Solution"
      );
    }
    if (this.state.otherQuestion) {
      setDataLayerForCLiQCarePage(
        ADOBE_SELF_SERVE_NON_ORDER_QUESTION_CLICK,
        question.subIssueType
      );
      setDataLayerForCLiQCarePage(
        ADOBE_SELF_SERVE_NON_ORDER_PAGE_LOAD,
        {
          name: this.state.parentIssueType,
          question: question.subIssueType
        },
        "Care_Other_Solution"
      );
    }

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
    setDataLayerForCLiQCarePage(ADOBE_SELF_SERVE_PAGE_LOAD, null, [
      CLIQ_CARE,
      "Care_Homepage"
    ]);
    this.setState({ orderAllList: false });
  }

  navigateLogin() {
    const url = this.props.location.pathname;
    if (url === `${MY_ACCOUNT_PAGE}${COSTUMER_CLIQ_CARE_ROUTE}`) {
      if (this.props.setUrlToRedirectToAfterAuth) {
        this.props.setUrlToRedirectToAfterAuth(url);
      }
    }
    setDataLayerForCLiQCarePage(ADOBE_LOGIN_START);
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
      setDataLayerForCLiQCarePage(ADOBE_SELF_SERVE_PAGE_LOAD, null, [
        CLIQ_CARE,
        "Care_Homepage"
      ]);
      this.setState(this.resetState);
    } else if (this.state.showFeedBack) {
      if (this.state.orderRelatedQuestion) {
        setDataLayerForCLiQCarePage(
          ADOBE_SELF_SERVE_PAGE_LOAD,
          {
            order: this.getOrderData()
          },
          "Care_Order_Questions"
        );
      }

      if (this.state.otherQuestion) {
        setDataLayerForCLiQCarePage(
          ADOBE_SELF_SERVE_NON_ORDER_PAGE_LOAD,
          {
            name: this.state.parentIssueType
          },
          "Care_Other_Questions"
        );
      }

      this.setState({
        question: null,
        showQuestionList: true,
        showFeedBack: false,
        isAnswerHelpFull: false
      });
    } else if (this.state.isQuesryForm) {
      if (this.state.orderRelatedQuestion) {
        setDataLayerForCLiQCarePage(
          ADOBE_SELF_SERVE_PAGE_LOAD,
          this.getOrderData(),
          "Care_Order_MoreHelp"
        );
      }
      if (this.state.otherQuestion) {
        setDataLayerForCLiQCarePage(
          ADOBE_SELF_SERVE_NON_ORDER_PAGE_LOAD,
          this.getNonOrderData(),
          "Care_Other_MoreHelp"
        );
      }
      this.setState({
        showQuestionList: false,
        isQuesryForm: false,
        isIssueOptions: true
      });
    } else if (this.state.isIssueOptions) {
      if (this.state.orderRelatedQuestion) {
        setDataLayerForCLiQCarePage(
          ADOBE_SELF_SERVE_PAGE_LOAD,
          {
            order: this.getOrderData(),
            issue: {
              title: this.state.question.issueType
            }
          },
          "Care_Order_Solution"
        );
      }
      if (this.state.otherQuestion) {
        setDataLayerForCLiQCarePage(
          ADOBE_SELF_SERVE_NON_ORDER_PAGE_LOAD,
          this.getNonOrderData(),
          "Care_Other_Solution"
        );
      }
      this.setState({
        isAnswerHelpFull: false,
        isIssueOptions: false,
        showFeedBack: true
      });
    }
  }
  navigateHomePage() {
    setDataLayerForCLiQCarePage(ADOBE_SELF_SERVE_CONTINUE_BUTTON_CLICK);
    this.props.history.push(HOME_ROUTER);
  }
  updateThanks() {
    this.setState({ isAnswerHelpFull: false });
  }
  navigateCliqCarePage() {
    setDataLayerForCLiQCarePage(ADOBE_SELF_SERVE_PAGE_LOAD, null, [
      CLIQ_CARE,
      "Care_Homepage"
    ]);
    this.setState(this.resetState);
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
                      formSubmit={this.state.formSubmit}
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
