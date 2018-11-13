import React from "react";
import Logo from "../../general/components/Logo";
import PropTypes from "prop-types";
import Input2 from "../../general/components/Input2.js";
import Button from "../../general/components/Button";
import DesktopOnly from "../../general/components/DesktopOnly";
import styles from "./SavedCard.css";
export default class SavedCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cvv: ""
    };
  }
  componentWillReceiveProps(nextProps) {
    if (!nextProps.selected) {
      this.setState({ cvv: "" });
    }
  }
  onChangeCvv(val) {
    if (this.props.onChangeCvv) {
      this.props.onChangeCvv(val, this.props.cardNumber);
      this.setState({ cvv: val });
    }
  }
  handleClick = () => {
    if (this.props.onCheckout) {
      this.props.onCheckout();
    }
  };
  render() {
    return (
      <div className={styles.base}>
        <div className={styles.cardNumber}>
          <div className={styles.circleDesign} />
          <div className={styles.circleDesign} />
          <div className={styles.circleDesign} />
          <div className={styles.circleDesign} />
          <div className={styles.circleTransparent} />
          <div className={styles.circleDesign} />
          <div className={styles.circleDesign} />
          <div className={styles.circleDesign} />
          <div className={styles.circleDesign} />
          <div className={styles.circleTransparent} />
          <div className={styles.circleDesign} />
          <div className={styles.circleDesign} />
          <div className={styles.circleDesign} />
          <div className={styles.circleDesign} />
          <div className={styles.cardDigits}>{this.props.cardNumber}</div>
        </div>
        <div className={styles.cardCvvHolder}>
          <div className={styles.cardsSection}>
            <div className={styles.cardIconHolder}>
              <Logo image={this.props.cardImage} width={75} imageWidth="100%" />
            </div>
          </div>

          <div className={styles.cvvInput}>
            <Input2
              value={this.state.cvv}
              placeholder="CVV"
              height={33}
              type="password"
              textStyle={{
                color: "#000",
                fontSize: 13
              }}
              onFocus={() => {
                this.props.onFocusInput();
              }}
              onlyNumber={true}
              maxLength="4"
              onChange={val => this.onChangeCvv(val)}
            />
          </div>
          <DesktopOnly>
            <div className={styles.buttonHolder}>
              {this.props.selectedSavedCardDetails &&
                this.props.selectedSavedCardDetails.cardEndingDigits ===
                  this.props.cardNumber && (
                  <Button
                    disabled={this.props.validateSavedCard()}
                    type="primary"
                    backgroundColor="#ff1744"
                    height={40}
                    label="Pay now"
                    width={150}
                    textStyle={{
                      color: "#FFF",
                      fontSize: 14
                    }}
                    onClick={this.handleClick}
                  />
                )}
              {this.props.selectedSavedCardDetails &&
                this.props.selectedSavedCardDetails.cardEndingDigits !==
                  this.props.cardNumber && (
                  <Button
                    disabled={true}
                    type="primary"
                    backgroundColor="#ff1744"
                    height={40}
                    label="Pay now"
                    width={150}
                    textStyle={{
                      color: "#FFF",
                      fontSize: 14
                    }}
                    onClick={this.handleClick}
                  />
                )}
              {!this.props.selectedSavedCardDetails && (
                <Button
                  disabled={true}
                  type="primary"
                  backgroundColor="#ff1744"
                  height={40}
                  label="Pay now"
                  width={150}
                  textStyle={{
                    color: "#FFF",
                    fontSize: 14
                  }}
                  onClick={this.handleClick}
                />
              )}
            </div>
          </DesktopOnly>
        </div>
      </div>
    );
  }
}
SavedCard.propTypes = {
  onChangeCvv: PropTypes.func,
  cardImage: PropTypes.string,
  cardNumber: PropTypes.string,
  validateSavedCard: PropTypes.func
};
