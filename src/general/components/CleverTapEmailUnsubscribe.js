import React, { Component } from "react";
import Input2 from "../../general/components/Input2";
import Button from "../../xelpmoc-core/Button";
import styles from "./CleverTapEmailUnsubscribe.css";

export default class CleverTapEmailUnsubscribe extends Component {
  constructor(props) {
    super(props);

    var clevertap = {
      event: [],
      profile: [],
      account: [],
      onUserLogin: [],
      notifications: []
    };
    clevertap.account.push({ id: "867-R5K-8R5Z" });
    (function() {
      var wzrk = document.createElement("script");
      wzrk.type = "text/javascript";
      wzrk.async = true;
      wzrk.src =
        ("https:" == document.location.protocol
          ? "https://d2r1yp2w7bby2u.cloudfront.net"
          : "http://static.clevertap.com") + "/js/a.js";
      var s = document.getElementsByTagName("script")[0];
      s.parentNode.insertBefore(wzrk, s);
    })();
    alert("script loaded");
  }

  componentDidMount() {
    var loadScript = function(scriptContent) {
      var tag = document.createElement("script");
      tag.async = false;
      tag.innerHTML = scriptContent;
      document.getElementsByTagName("body")[0].appendChild(tag);
    };

    loadScript(
      `
        // on  page load, fetch the email id of the user.
        window.onload = function() {
          alert("Inside getEmail")
          $WZRK_WR.getEmail();
        };

        // will be called after the email id of the user has been fetched
        function wzrk_email_fetched(emailStr) {
          alert("Inside fetch email")
          document.getElementById("email").value = emailStr;
        }

        // will be called after the subscription preferences for the user have been updated
        function wzrk_email_subscription(status) {
          alert("Inside email status")
          //status 0 : unsubscribed, status 1 : subscribed
          // todo - you can show a success message to the user from here
          var statusLabel = 'subscribed';
          if (status == 0) {
              statusLabel = 'unsubscribed';
          }
          alert("You've been " + statusLabel);
        }

        // call this function to unsubscribe the user
        function unsubscribe() {
          alert("Inside unsubscribe")
          $WZRK_WR.unSubEmail();
        }
      `
    );
  }

  // componentDidMount() {
  //   if (window.hasOwnProperty("$WZRK_WR")) {
  //     window.$WZRK_WR.getEmail();
  //   } else {
  //     setTimeout(() => {
  //       window.$WZRK_WR.getEmail();
  //     }, 1000);
  //   }
  // }

  // wzrk_email_fetched(emailStr) {
  //   if (emailStr) document.getElementById("email").value = emailStr;
  // }

  // wzrk_email_subscription(status) {
  //   //status 0 : unsubscribed, status 1 : subscribed
  //   // todo - you can show a success message to the user from here
  //   var statusLabel = "subscribed";
  //   if (status == 0) {
  //     statusLabel = "unsubscribed";
  //   }
  //   alert("You've been " + statusLabel);
  // }

  onUnsubscribe() {
    window.unsubscribe();
    //if (window.hasOwnProperty("$WZRK_WR")) window.$WZRK_WR.unSubEmail();
  }

  render() {
    return (
      <div className={styles.base}>
        <div className={styles.emailUnsubscribe}>
          <div className={styles.header}>
            I want to unsubscribe from future emails
          </div>
          <div className={styles.input}>
            <Input2
              id={"email"}
              placeholder="Enter email"
              fontSize={14}
              //disabled={true}
            />
          </div>
          <div className={styles.btnWrapper}>
            <Button
              label={"Unsubscribe me"}
              width={180}
              height={40}
              borderRadius={20}
              backgroundColor={"#ff1744"}
              onClick={() => this.onUnsubscribe()}
              textStyle={{
                color: "#FFFFFF",
                fontSize: 14,
                fontFamily: "regular"
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}
