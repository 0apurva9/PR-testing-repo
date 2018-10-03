import React from "react";
import sortBy from "lodash.sortby";
import EmiCardForPdp from "./EmiCardForPdp";
import UnderLinedButton from "../../general/components/UnderLinedButton";
import SlideModal from "../../general/components/SlideModal";
import Accordion from "../../general/components/Accordion";
import PropTypes from "prop-types";
import styles from "./EmiModal.css";
import TabHolder from "../../account/components/TabHolder";
import TabData from "../../account/components/TabData";
import {
  setDataLayerForPdpDirectCalls,
  SET_DATA_LAYER_FOR_EMI_BANK_EVENT
} from "../../lib/adobeUtils";
import Loader from "../../general/components/Loader";
const EMI_INFO = "An EMI for this product is provided by the following banks";
export default class EmiModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openIndex: null,
      showEmi: false,
      showBank: false,
      isSelected: 0,
      standardEmiArray: null,
      noCostEmiArray: null
    };
  }
  handleOpen(index, emiArray) {
    if (emiArray.bankList[index] && emiArray.bankList[index].emiBank) {
      const bankName = emiArray.bankList[index].emiBank;
      setDataLayerForPdpDirectCalls(
        SET_DATA_LAYER_FOR_EMI_BANK_EVENT,
        bankName
      );
    }
    if (index === this.state.openIndex) {
      this.setState({ openIndex: null, showEmi: false, showBank: false });
    } else {
      this.setState({ openIndex: index, showEmi: false, showBank: false });
    }
  }
  toggleTermsView() {
    this.setState({ showEmi: !this.state.showEmi, openIndex: null }, () => {
      if (this.state.showEmi) {
        let scroll = document.getElementById("viewTermsAndConditionEmi");
        scroll.scrollIntoView();
      }
    });
  }
  toggleBankView() {
    this.setState({ showBank: !this.state.showBank, openIndex: null }, () => {
      if (this.state.showBank) {
        let scroll = document.getElementById("viewTermsAndConditionBank");
        scroll.scrollIntoView();
      }
    });
  }
  tabSelect(val) {
    if (this.state.isSelected !== val) {
      this.setState({ openIndex: null, showEmi: false });
    }
    this.setState({ isSelected: val });
  }
  componentWillReceiveProps(nextProps) {
    let standardEmiDetails =
      nextProps.emiData &&
      nextProps.emiData.emiList &&
      nextProps.emiData.emiList.find(standardData => {
        return standardData.heading === "Standard EMI";
      });
    let noCostEmiDetails =
      nextProps.emiData &&
      nextProps.emiData.emiList &&
      nextProps.emiData.emiList.find(noCostEmi => {
        return noCostEmi.heading === "No Cost EMI";
      });
    if (
      standardEmiDetails &&
      noCostEmiDetails &&
      standardEmiDetails.bankList.length > 0 &&
      noCostEmiDetails.bankList.length > 0
    ) {
      this.setState({
        isSelected: 0,
        standardEmiArray: standardEmiDetails,
        noCostEmiArray: noCostEmiDetails
      });
    } else {
      this.setState({ isSelected: 1, standardEmiArray: standardEmiDetails });
    }
  }
  renderLoader() {
    return <Loader />;
  }
  render() {
    if (this.props.loading) {
      return this.renderLoader();
    }
    return (
      <SlideModal closeModal={this.props.closeModal}>
        <div className={styles.base}>
          <div className={styles.header}>EMI details</div>
          <div className={styles.content}>
            {this.state.standardEmiArray &&
            this.state.noCostEmiArray &&
            this.state.standardEmiArray.bankList.length > 0 &&
            this.state.noCostEmiArray.bankList.length > 0 ? (
              <div className={styles.tabHolder}>
                <TabHolder>
                  <TabData
                    width="50%"
                    label={this.state.noCostEmiArray.heading}
                    selected={this.state.isSelected === 0}
                    selectItem={() => this.tabSelect(0)}
                  />
                  <TabData
                    width="50%"
                    label={this.state.standardEmiArray.heading}
                    selected={this.state.isSelected === 1}
                    selectItem={() => this.tabSelect(1)}
                  />
                </TabHolder>
              </div>
            ) : (
              <React.Fragment>
                {this.state.standardEmiArray &&
                  this.state.standardEmiArray.heading && (
                    <div className={styles.standardEmiHeading}>
                      {this.state.standardEmiArray.heading}
                    </div>
                  )}
              </React.Fragment>
            )}
            {this.state.isSelected === 0 &&
              this.state.noCostEmiArray && (
                <React.Fragment>
                  {this.state.noCostEmiArray.heading && (
                    <div className={styles.info}>
                      {this.state.noCostEmiArray.title}
                    </div>
                  )}
                  {this.state.noCostEmiArray.bankList &&
                    this.state.noCostEmiArray.bankList.map((val, i) => {
                      return (
                        <Accordion
                          controlled={true}
                          text={val.emiBank}
                          key={i}
                          offset={20}
                          activeBackground="#f8f8f8"
                          isOpen={this.state.openIndex === i}
                          onOpen={() =>
                            this.handleOpen(i, this.state.noCostEmiArray)
                          }
                        >
                          <EmiCardForPdp
                            width={33.3}
                            showInterestRate={false}
                            options={sortBy(
                              val.emitermsrate,
                              item => item && parseInt(item.term, 10)
                            )}
                          />
                        </Accordion>
                      );
                    })}
                  <div className={styles.termsAndConditionsHeading}>
                    Terms & Conditions
                  </div>
                  {!this.state.showBank &&
                    this.state.noCostEmiArray.bankSpecificTnC &&
                    this.state.noCostEmiArray.bankSpecificTnC.length > 0 && (
                      <div className={styles.bankInfo}>
                        <UnderLinedButton
                          label="Bajaj Finserv T&C"
                          onClick={() => {
                            this.toggleBankView();
                          }}
                          fontFamily="regular"
                          size={12}
                        />
                      </div>
                    )}
                  {this.state.showBank &&
                    this.state.noCostEmiArray.bankSpecificTnC &&
                    this.state.noCostEmiArray.bankSpecificTnC.length > 0 && (
                      <div className={styles.headingWithDescription}>
                        <div className={styles.headingWithHideButton}>
                          <div className={styles.heading}>
                            Bajaj Finserv T&C
                          </div>
                          <div
                            className={styles.hideButton}
                            id="viewTermsAndConditionBank"
                          >
                            <UnderLinedButton
                              label={"Hide"}
                              onClick={() => {
                                this.toggleBankView();
                              }}
                              fontFamily="regular"
                              size={12}
                            />
                          </div>
                        </div>
                        <div className={styles.content}>
                          <ul>
                            {this.state.noCostEmiArray.bankSpecificTnC.map(
                              bankDescription => {
                                return (
                                  <div className={styles.termsAndConditions}>
                                    <li>{bankDescription.description}</li>
                                  </div>
                                );
                              }
                            )}
                          </ul>
                        </div>
                      </div>
                    )}
                  {!this.state.showEmi &&
                    this.state.noCostEmiArray.termsAndConditions &&
                    this.state.noCostEmiArray.termsAndConditions
                      .description && (
                      <div className={styles.bankInfo}>
                        <UnderLinedButton
                          label={"Credit and Debit Card No Cost EMI T&C"}
                          onClick={() => {
                            this.toggleTermsView();
                          }}
                          fontFamily="regular"
                          size={12}
                        />
                      </div>
                    )}
                  {this.state.showEmi &&
                    this.state.noCostEmiArray.termsAndConditions &&
                    this.state.noCostEmiArray.termsAndConditions
                      .description && (
                      <div className={styles.headingWithDescription}>
                        <div className={styles.headingWithHideButton}>
                          <div className={styles.heading}>
                            Credit and Debit Card No Cost EMI T&C
                          </div>
                          <div
                            className={styles.hideButton}
                            id="viewTermsAndConditionEmi"
                          >
                            <UnderLinedButton
                              label={"Hide"}
                              onClick={() => {
                                this.toggleTermsView();
                              }}
                              fontFamily="regular"
                              size={12}
                            />
                          </div>
                        </div>
                        <div className={styles.content}>
                          <div
                            className={styles.termsAndConditions}
                            dangerouslySetInnerHTML={{
                              __html: this.state.noCostEmiArray
                                .termsAndConditions.description
                            }}
                          />
                        </div>
                      </div>
                    )}
                </React.Fragment>
              )}
            {this.state.isSelected === 1 &&
              this.state.standardEmiArray && (
                <React.Fragment>
                  {this.state.standardEmiArray.heading && (
                    <div className={styles.info}>
                      {this.state.standardEmiArray.title}
                    </div>
                  )}
                  {this.state.standardEmiArray.bankList &&
                    this.state.standardEmiArray.bankList.map((val, i) => {
                      return (
                        <Accordion
                          controlled={true}
                          text={val.emiBank}
                          key={i}
                          offset={20}
                          activeBackground="#f8f8f8"
                          isOpen={this.state.openIndex === i}
                          onOpen={() =>
                            this.handleOpen(i, this.state.standardEmiArray)
                          }
                        >
                          <EmiCardForPdp
                            options={sortBy(
                              val.emitermsrate,
                              item => item && parseInt(item.term, 10)
                            )}
                          />
                        </Accordion>
                      );
                    })}
                  <div className={styles.termsAndConditionsHeading}>
                    Terms & Conditions
                  </div>
                  {!this.state.showBank &&
                    this.state.standardEmiArray.bankSpecificTnC &&
                    this.state.standardEmiArray.bankSpecificTnC.length > 0 && (
                      <div className={styles.bankInfo}>
                        <UnderLinedButton
                          label="Bajaj Finserv T&C"
                          onClick={() => {
                            this.toggleBankView();
                          }}
                          fontFamily="regular"
                          size={12}
                        />
                      </div>
                    )}
                  {this.state.showBank &&
                    this.state.standardEmiArray.bankSpecificTnC &&
                    this.state.standardEmiArray.bankSpecificTnC.length > 0 && (
                      <div className={styles.headingWithDescription}>
                        <div className={styles.headingWithHideButton}>
                          <div className={styles.heading}>
                            Bajaj Finserv T&C
                          </div>
                          <div
                            className={styles.hideButton}
                            id="viewTermsAndConditionBank"
                          >
                            <UnderLinedButton
                              label={"Hide"}
                              onClick={() => {
                                this.toggleBankView();
                              }}
                              fontFamily="regular"
                              size={12}
                            />
                          </div>
                        </div>
                        <div className={styles.content}>
                          <ul>
                            {this.state.standardEmiArray.bankSpecificTnC.map(
                              bankDescription => {
                                return (
                                  <div className={styles.termsAndConditions}>
                                    <li>{bankDescription.description}</li>
                                  </div>
                                );
                              }
                            )}
                          </ul>
                        </div>
                      </div>
                    )}
                  {!this.state.showEmi && (
                    <div className={styles.bankInfo}>
                      <UnderLinedButton
                        label={"Credit and Debit Card No Cost EMI T&C"}
                        onClick={() => {
                          this.toggleTermsView();
                        }}
                        fontFamily="regular"
                        size={12}
                      />
                    </div>
                  )}
                  {this.state.showEmi &&
                    this.state.standardEmiArray.termsAndConditions &&
                    this.state.standardEmiArray.termsAndConditions
                      .description && (
                      <div className={styles.headingWithDescription}>
                        <div className={styles.headingWithHideButton}>
                          <div className={styles.heading}>
                            Credit and Debit Card No Cost EMI T&C
                          </div>
                          <div
                            className={styles.hideButton}
                            id="viewTermsAndConditionEmi"
                          >
                            <UnderLinedButton
                              label={"Hide"}
                              onClick={() => {
                                this.toggleTermsView();
                              }}
                              fontFamily="regular"
                              size={12}
                            />
                          </div>
                        </div>
                        <div className={styles.content}>
                          <div
                            className={styles.termsAndConditions}
                            dangerouslySetInnerHTML={{
                              __html: this.state.standardEmiArray
                                .termsAndConditions.description
                            }}
                          />
                        </div>
                      </div>
                    )}
                </React.Fragment>
              )}
          </div>
        </div>
      </SlideModal>
    );
  }
}
EmiModal.propTypes = {
  emiData: PropTypes.shape({
    bankList: PropTypes.arrayOf(
      PropTypes.shape({
        emiBank: PropTypes.string,
        emitermsrate: PropTypes.arrayOf(
          PropTypes.shape({
            interestPayable: PropTypes.string,
            interestRate: PropTypes.string,
            monthlyInstallment: PropTypes.string,
            term: PropTypes.string
          })
        )
      })
    )
  })
};
