import React from "react";
import styles from "./EditAddressPopUp.css";
import PropTypes from "prop-types";
import Input2 from "../../general/components/Input2.js";
import OrderReturn from "../../account/components/OrderReturn";
import SelectBoxMobile from "../../general/components/SelectBoxMobile";
import { SUCCESS } from "../../lib/constants";
const CANCEL_TEXT = "Cancel";
const SAVE_CHANGES = "Save changes";
let addressDetails;

export default class EditAddressPopUp extends React.Component {
  constructor(props) {
    super(props);
    addressDetails = this.props.location.state.addressDetails;
    this.state = {
      countryIso: addressDetails.country.isocode,
      addressType: addressDetails.addressType,
      phone: addressDetails.phone,
      firstName: addressDetails.firstName,
      lastName: addressDetails.lastName,
      postalCode: addressDetails.postalCode,
      line1: addressDetails.line1,
      state: addressDetails.state,
      emailId: "",
      line2: addressDetails.line2,
      line3: "",
      town: addressDetails.town,
      addressId: addressDetails.id,
      defaultFlag: addressDetails.defaultAddress
    };
  }
  componentDidMount() {
    this.props.getPinCode();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.editAddressStatus === SUCCESS) {
      this.props.history.goBack();
    }
  }
  onChange(val) {
    this.setState(val);
  }

  editAddress(val) {
    if (this.props.editAddress) {
      let addressDetails = this.state;
      this.props.editAddress(addressDetails);
    }
  }

  cancelAddress = () => {
    this.props.history.goBack();
  };
  render() {
    return (
      <div className={styles.base}>
        <div className={styles.holder}>
          <div className={styles.container}>
            <Input2
              value={this.state.firstName}
              boxy={true}
              textStyle={{ fontSize: 14 }}
              height={33}
              onChange={firstName => this.onChange({ firstName })}
            />
          </div>
          <div className={styles.container}>
            <Input2
              value={this.state.phone}
              boxy={true}
              textStyle={{ fontSize: 14 }}
              height={33}
              onChange={phone => this.onChange({ phone })}
            />
          </div>
          <div className={styles.container}>
            <Input2
              value={this.state.line1}
              boxy={true}
              textStyle={{ fontSize: 14 }}
              height={33}
              onChange={line1 => this.onChange({ line1 })}
            />
          </div>
          <div className={styles.container}>
            <Input2
              value={this.state.line2}
              boxy={true}
              textStyle={{ fontSize: 14 }}
              height={33}
              onChange={line2 => this.onChange({ line2 })}
            />
          </div>
          <div className={styles.container}>
            <Input2
              value={this.state.postalCode}
              boxy={true}
              textStyle={{ fontSize: 14 }}
              height={33}
              onChange={postalCode => this.onChange({ postalCode })}
            />
          </div>
          <div className={styles.container}>
            <SelectBoxMobile
              value={this.state.state}
              arrowColour="black"
              height={33}
              options={[{ value: this.state.state, label: this.state.state }]}
              onChange={state => this.onChange({ state })}
            />
          </div>
          <div className={styles.container}>
            <SelectBoxMobile
              value={this.state.countryIso}
              arrowColour="black"
              height={33}
              options={[
                {
                  value: this.state.countryIso,
                  label: this.state.countryIso
                }
              ]}
              onChange={countryIso => this.onChange({ countryIso })}
            />
          </div>
        </div>
        <div className={styles.buttonHolder}>
          <OrderReturn
            isEditable={true}
            buttonLabel={CANCEL_TEXT}
            underlineButtonLabel={SAVE_CHANGES}
            writeReview={() => this.editAddress()}
            replaceItem={() => this.cancelAddress()}
          />
        </div>
      </div>
    );
  }
}
EditAddressPopUp.propTypes = {
  country: PropTypes.string,
  buttonLabel: PropTypes.string,
  underlineButtonLabel: PropTypes.string,
  userName: PropTypes.string,
  contactNumber: PropTypes.string,
  line1: PropTypes.string,
  line2: PropTypes.string,
  postalCode: PropTypes.bool,
  state: PropTypes.string,
  cancelAddress: PropTypes.func,
  saveChanges: PropTypes.func,
  onChange: PropTypes.func
};
