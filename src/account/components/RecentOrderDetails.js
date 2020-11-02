import React, { Component } from "react";
import ProductImage from "../../general/components/ProductImage";
import Styles from "./RecentOrderHistory.css";
export default class RecentOrderDetails extends Component {
  render() {
    return (
      <div className={Styles.orderInfo}>
        <div className={Styles.fontLight}>
          {" "}
          Ticket ID :{" "}
          <span className={Styles.fontBold}> TQ12062020123456 </span>
        </div>
        <div className={Styles.fontLight}>
          {" "}
          Created on :{" "}
          <span className={Styles.fontBold}> TQ12062020123456 </span>
        </div>
        <div className={Styles.orderInfoDetails}>
          <div className={Styles.orderImg}>
            <ProductImage
              image={this.props.orderDataList.orderData[0].products[0].imageURL}
            />
          </div>
          <div className={Styles.orderDetails}>
            <div className={Styles.productName}>
              {this.props.orderDataList.orderData[0].products[0].productName}
            </div>
          </div>
        </div>
        <div className={Styles.statusDisplay}>
          <div className={Styles.fontLight}>
            {" "}
            Status : <span className={Styles.fontBold}> In Process</span>
          </div>
          <div className={Styles.fontLight}>
            {" "}
            Estimated Resolution :{" "}
            <span className={Styles.fontBold}> 10 Jun, 2020 </span>{" "}
            <span className={Styles.colorMaroon}>(Delayed)</span>
          </div>
          <div className={Styles.note}>
            Note: It seems that your issue is taking more than usual time to get
            resolved. Please report the issue or ignore if resolved.
          </div>
        </div>
        <div className={Styles.communication}>
          <div className={Styles.communicationHeading}>
            Communication details
          </div>
          <div className={Styles.customerCetails}>
            <div className={Styles.customerCircle}></div>
            <div>
              <div className={Styles.fontBold}>
                Customer :{" "}
                <span className={Styles.fontLight}>
                  {
                    // this.props.orderDataList.orderData[0].products[0]
                    //   .statusDisplay
                    "09 Jun, 12:30"
                  }
                </span>
              </div>
              <div className={Styles.fontLight}>
                Unfortunately, your product has not performed well [or the
                service was inadequate] because state the problem.
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
