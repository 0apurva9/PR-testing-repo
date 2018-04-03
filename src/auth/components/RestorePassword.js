import React from "react";
import AuthPopUp from "./AuthPopUp";
import PropTypes from "prop-types";
import { Button } from "xelpmoc-core";
import Input from "../../general/components/Input";
import { default as styles } from "./AuthPopUp.css";
import { default as ownStyles } from "./RestorePassword.css";
export default class RestorePassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: ""
    };
  }

  handleCancelClick() {
    if (this.props.handleCancel) {
      this.props.handleCancel();
    }
  }

  handleRestoreClick() {
    if (this.props.handleRestoreClick) {
      this.props.handleRestoreClick(this.state.userId);
    }
  }
  render() {
    return (
      <AuthPopUp>
        <div className={styles.header}>Restore password</div>
        <div className={styles.content}>
          Please enter your Email or phone number to restore the password
        </div>
        <div className={styles.input}>
          <Input
            hollow={true}
            placeholder="email id or mobile number"
            onChange={val => this.setState({ userId: val })}
          />
        </div>
        <div className={styles.button}>
          <div className={ownStyles.submit}>
            <Button
              label={"Restore"}
              width={150}
              height={40}
              borderRadius={20}
              backgroundColor={"#FF1744"}
              onClick={() => this.handleRestoreClick()}
              loading={this.props.loading}
              textStyle={{ color: "#FFF", fontSize: 14 }}
            />
          </div>
        </div>
        <div className={styles.button}>
          <div className={ownStyles.cancel}>
            <Button
              label={"Cancel"}
              onClick={() => this.handleCancelClick()}
              backgroundColor="transparent"
              width={100}
              height={40}
              borderRadius={20}
              loading={this.props.loading}
              textStyle={{ color: "#FFF", fontSize: 14 }}
            />
          </div>
        </div>
      </AuthPopUp>
    );
  }
}

RestorePassword.propTypes = {
  handleCancel: PropTypes.func,
  handleRestoreClick: PropTypes.func
};
