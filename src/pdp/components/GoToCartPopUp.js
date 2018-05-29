import React from "react";
import Button from "../../general/components/Button.js";
import styles from "./GoToCartPopUp.css";
export default class GoToCartPopUp extends React.Component {
  render() {
    return (
      <div className={styles.base}>
        <div className={styles.dataWrap}>
          <div className={styles.messageText}>
            The item has been added to your bag
          </div>
        </div>
        <div className={styles.dataWrap}>
          <div className={styles.buttonHolder}>
            <Button
              type="primary"
              backgroundColor="#ff1744"
              height={36}
              label="View bag"
              width={211}
              textStyle={{ color: "#FFF", fontSize: 14 }}
              onClick={() => this.goToCartPage()}
            />
          </div>
        </div>
        <div className={styles.dataWrap}>
          <div className={styles.buttonHolder}>
            <Button
              type="secondary"
              height={36}
              label="Continue shopping"
              width={211}
              onClick={() => this.goToHomePage()}
            />
          </div>
        </div>
      </div>
    );
  }
}
