import React, { Component } from "react";
import Input2 from "./Input2";
import Button from "../../xelpmoc-core/Button";
import styles from "./CleverTapEmailUnsubscribe.css";
const CLEVERTAP_ID = "867-R5K-8R5Z";

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
    clevertap.account.push({ id: CLEVERTAP_ID });
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
  }

  componentDidMount() {
    var loadScript = function(scriptContent) {
      var tag = document.createElement("script");
      tag.async = false;
      tag.innerHTML = scriptContent;
      document.getElementsByTagName("body")[0].appendChild(tag);
    };

    loadScript(
      `// on  page load, fetch the email id of the user.
			window.onload = function() {
				$WZRK_WR.getEmail();
			};

			// will be called after the email id of the user has been fetched
			function wzrk_email_fetched(emailStr) {
				document.getElementById("email").value = emailStr;
			}

			// will be called after the subscription preferences for the user have been updated
			function wzrk_email_subscription(status) {
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
				$WZRK_WR.unSubEmail();
			}`
    );
  }

  onUnsubscribe() {
    if (Object.prototype.hasOwnProperty.call(window, "unsubscribe")) window.unsubscribe();
  }

  render() {
    return (
      <div className={styles.base}>
        <div className={styles.emailUnsubscribe}>
          <h4>I want to unsubscribe from future emails</h4>
          <div className={styles.input}>
            <Input2
              boxy={true}
              id={"email"}
              placeholder="Email"
              textStyle={{ fontSize: 14 }}
              height={33}
              disabled={true}
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
