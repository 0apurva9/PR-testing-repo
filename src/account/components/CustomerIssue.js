import React from "react";
import styles from "./CustomerIssue.css";
import loginIcon from "../components/img/loginIcon.svg";
import Button from "../../general/components/Button.js";
import OtherQuestions from "./OtherQuestions";
import OrderList from "./OrderList";
import { SUCCESS } from "../../lib/constants";
import OrderListDetails from "./OrderListDetails";

export default class CustomerIssue extends React.Component {
  state = {
    isLogin: false
    // isOrderDatails: false,
    // orderList: true,
    // isOrderDatails: true,
    // orderList: false,
    // selectedOrder: null
  };
  // componentWillReceiveProps(nextProps) {

  //   if (nextProps.orderRelatedQuestionsStatus == SUCCESS) {
  //     this.setState({ isOrderDatails: true, orderList: false });
  //   }

  // }

  // async getOrderRelatedQuestions(orderData) {
  //   this.setState({ selectedOrder: orderData });
  //   if (this.props.getOrderRelatedQuestions) {
  //     const response = await this.props.getOrderRelatedQuestions(orderData.products[0].transactionId);
  //     if(response.status==SUCCESS){
  //       this.setState({ isOrderDatails: true, orderList: false });
  //     }
  //   }
  // }

  render() {
    const { isLogin, isOrderDatails, orderList } = this.state;
    return (
      <div className={styles.base}>
        {this.props.orderList && (
          <div className={styles.whiteCard}>
            {isLogin ? (
              <div className={styles.loginBox}>
                <div className={styles.loginImg}>
                  <img src={loginIcon} alt="Login icon"></img>
                </div>
                <div className={styles.loginHeading}>
                  Need help with recent orders
                </div>
                <div className={styles.loginButton}>
                  <Button
                    type="primary"
                    backgroundColor="#da1c5c"
                    height={36}
                    label="LOGIN"
                    width={205}
                    textStyle={{ color: "#FFF", fontSize: 14 }}
                    // onClick={() => this.generateOtp()}
                  />
                </div>
              </div>
            ) : (
              <OrderList
                ordersTransactionData={this.props.ordersTransactionData}
                getOrderRelatedQuestions={orderData =>
                  this.props.getOrderRelatedQuestions(orderData)
                }
              />
            )}
          </div>
        )}

        {this.props.orderList && (
          <OtherQuestions
            customerQueriesOtherIssueData={
              this.props.customerQueriesOtherIssueData
            }
          />
        )}

        {this.props.isOrderDatails && (
          <OrderListDetails
            selectedOrder={this.props.selectedOrder}
            issueOptions={question => this.props.issueOptions(question)}
            orderRelatedQuestionsData={this.props.orderRelatedQuestionsData}
            customerQueriesField={this.props.customerQueriesField}
            isQuesryForm={this.props.isQuesryForm}
            getQuestyTesting={() => this.props.getQuestyTesting()}
            uploadUserFile={(issueType, title, file) =>
              this.props.uploadUserFile(issueType, title, file)
            }
            uploadedAttachments={this.props.uploadedAttachments}
            userDetails={this.props.userDetails}
            submitCustomerForms={formaData =>
              this.props.submitCustomerForms(formaData)
            }
            displayToast={message => this.props.displayToast(message)}
          />
        )}
      </div>
    );
  }
}
