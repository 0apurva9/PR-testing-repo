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
    orderList: true,
    isOrderDatails: false,
    selectedOrder: null
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
                  <div
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
                  </div>
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
