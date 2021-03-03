import React, { Component } from "react";
import styles from "./PanCardForm.css";
import queryString from "query-string";
import Input2 from "./Input2.js";
import Button from "./Button.js";
import cancel from "./img/canceltransperent.png";
import upload from "./img/upload.svg";
import { SUCCESS, HOME_ROUTER } from "../../lib/constants";
const panRegEx = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;
export default class PanCardForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Pancard_number: "",
      file: "",
      disable: true,
      panCradNumberError: false,
      ImageUrl: ""
    };
    this.file = React.createRef();
  }

  componentDidMount() {
    let getUserDetails = queryString.parse(this.props.location.search);
    if (this.props.getPanCardDetails) {
      this.props.getPanCardDetails(getUserDetails);
    }
    this.props.setHeaderText("PANCARD");
  }

  handleChange = Pancard_number => {
    let capitalizedata = Pancard_number.toUpperCase();
    this.setState({
      panCradNumberError: false,
      Pancard_number: capitalizedata
    });
  };

  handleFileUpload = event => {
    if (event.target.files[0]) {
      let panImage = URL.createObjectURL(event.target.files[0]);
      this.setState({
        file: event.target.files[0],
        ImageUrl: panImage
      });
    }
  };

  removeFile = () => {
    this.setState({ ImageUrl: "", file: "" });
  };

  async onSubmit() {
    if (!this.state.Pancard_number.match(panRegEx)) {
      return this.setState({ panCradNumberError: true });
    } else if (this.state.file === null || this.state.file === "") {
      return this.props.displayToast("Upload image");
    } else if (this.state.file.size >= 5000000) {
      return this.props.displayToast(
        "The Image size should be lesser than 5MB"
      );
    }

    if (this.state.file !== null && this.state.file !== "") {
      const panCardResponse = await this.props.submitPancardDetails(
        this.props.panCardDetails.orderID,
        this.props.panCardDetails.customerName,
        this.state.Pancard_number,
        this.state.file
      );
      if (panCardResponse && panCardResponse.status === SUCCESS) {
        this.props.history.push(HOME_ROUTER);
      }
    }
  }

  render() {
    return (
      <div className={styles.base}>
        <div className={styles.text}>
          {this.props.panCardDetails && this.props.panCardDetails.heading1}
        </div>
        <div className={styles.subText}>
          {this.props.panCardDetails && this.props.panCardDetails.heading2}
        </div>
        <div className={styles.pancarddetailsHolder}>
          <div className={styles.orderText}>
            <strong>Order ID:</strong>{" "}
            {this.props.panCardDetails && this.props.panCardDetails.orderID}
          </div>
          <div className={styles.orderText}>
            <strong>Name:</strong>{" "}
            {this.props.panCardDetails &&
              this.props.panCardDetails.customerName}
          </div>
          <div className={styles.pancardHolder}>
            <div className={styles.pancard}>
              {this.props.panCardDetails &&
                this.props.panCardDetails.pancadNumberheader}
            </div>
            <div className={styles.subdetails}>
              {this.props.panCardDetails &&
                this.props.panCardDetails.pansubheading}
            </div>
            <div
              className={
                !this.state.panCradNumberError
                  ? styles.inputHolder
                  : styles.inputHolderError
              }
            >
              <Input2
                boxy={true}
                id={this.props.id}
                value={this.state.Pancard_number}
                placeholder="Enter PAN Number"
                onChange={Pancard_number => this.handleChange(Pancard_number)}
                textStyle={{ fontSize: 14 }}
                height={35}
                rightChildSize={35}
                borderColor={"#fff"}
                borderBottom={"#fff"}
              />
            </div>
            {this.state.panCradNumberError && (
              <div className={styles.showerror}>
                *Please enter a valid PAN card number
              </div>
            )}

            <div className={styles.uploadPancardMessage}>
              {this.props.panCardDetails &&
                this.props.panCardDetails.uploadPancardMessage}
            </div>
            <div className={styles.uploadSubText}>
              Upload JPEG, PNG (Maximum size 5 MB)
            </div>
            {this.state.ImageUrl !== "" && (
              <div className={styles.image}>
                <img
                  id="panImage"
                  src={this.state.ImageUrl}
                  alt="Pan"
                  width="63px"
                  height="70px"
                />
                <div className={styles.cancel}>
                  <img src={cancel} alt="" onClick={() => this.removeFile()} />
                </div>
              </div>
            )}

            <div className={styles.uploadimageButton}>
              <Button
                type="secondary"
                label={
                  this.props.panCardDetails &&
                  this.props.panCardDetails.uploadimageButton
                }
                height={40}
                width={200}
              />
              <img
                src={upload}
                alt="upload icon"
                className={styles.uploadIcon}
              />
              <input
                type="file"
                ref={this.file}
                className={styles.file}
                onChange={event => this.handleFileUpload(event)}
                name="textFile"
              />
            </div>
          </div>

          <div className={styles.submitButton}>
            <div
              className={
                this.props.panCardDetails &&
                (this.props.panCardDetails.status !==
                  "PENDING_FOR_VERIFICATION" &&
                  this.props.panCardDetails.status !== "APPROVED" &&
                  this.state.file !== "" &&
                  this.state.Pancard_number.length !== "")
                  ? styles.buttonCover
                  : styles.buttonCoverDisabled
              }
            >
              <Button
                type="primary"
                label="Submit"
                backgroundColor="#ff1744"
                height={40}
                width={165}
                textStyle={{
                  color: "#FFF",
                  fontSize: 14
                }}
                onClick={() => this.onSubmit()}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
