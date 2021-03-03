import React, { Component, Fragment } from "react";
import { Collapse } from "react-collapse";
import PropTypes from "prop-types";
import styles from "./NoReturnComponent.css";

export default class NoReturnComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isReturnOpen: true,
            isManufactureOpen: true,
        };
    }

    returnOpenMenu() {
        this.setState(prevState => ({
            isReturnOpen: !prevState.isReturnOpen,
        }));
    }

    manufactureOpenMenu() {
        this.setState(prevState => ({
            isManufactureOpen: !prevState.isManufactureOpen,
        }));
    }

    render() {
        let returnIconActive = styles.iconup;
        if (this.state.isReturnOpen) {
            returnIconActive = styles.icon;
        }
        let manufacIconActive = styles.iconup;
        if (this.state.isManufactureOpen) {
            manufacIconActive = styles.icon;
        }

        return (
            <Fragment>
                {(this.props &&
                    this.props.productDetails &&
                    this.props.productDetails.knowMoreV2 &&
                    this.props.productDetails.knowMoreV2.length > 0) ||
                Object.keys(this.props.manufacturerDetails).length > 0 ? (
                    <div className={styles.container}>
                        <div className={styles["return-component"]}>
                            <div className={styles.base}>
                                <div
                                    className={styles.holder}
                                    onClick={() => {
                                        this.returnOpenMenu();
                                    }}
                                >
                                    <div className={styles["return-heading"]}>
                                        {this.props &&
                                        this.props.productDetails &&
                                        this.props.productDetails.knowMoreV2 &&
                                        this.props.productDetails.knowMoreV2.length > 0 &&
                                        this.props.productDetails.knowMoreV2[0] &&
                                        this.props.productDetails.knowMoreV2[0].knowMoreItemV2 &&
                                        this.props.productDetails.knowMoreV2[0].knowMoreItemV2.toLowerCase() ===
                                            "0 days easy return"
                                            ? this.props.heading
                                            : this.props &&
                                              this.props.productDetails &&
                                              this.props.productDetails.knowMoreV2 &&
                                              this.props.productDetails.knowMoreV2.length > 0 &&
                                              this.props.productDetails.knowMoreV2[0] &&
                                              this.props.productDetails.knowMoreV2[0].knowMoreItemV2 &&
                                              this.props.productDetails.knowMoreV2[0].knowMoreItemV2.toUpperCase()}
                                    </div>
                                    <div className={returnIconActive} />
                                </div>
                                <Collapse isOpened={this.state.isReturnOpen}>
                                    <div className={styles["return-desc"]}>
                                        {this.props &&
                                            this.props.productDetails &&
                                            this.props.productDetails.knowMoreV2 &&
                                            this.props.productDetails.knowMoreV2.length > 0 &&
                                            this.props.productDetails.knowMoreV2[1] &&
                                            this.props.productDetails.knowMoreV2[1].knowMoreItemV2}
                                    </div>
                                </Collapse>
                            </div>
                            {this.props.manufacturerDetails && Object.keys(this.props.manufacturerDetails).length > 0 && (
                                <div className={styles["manufacture-all-ingre-sec"]}>
                                    <div
                                        className={styles.holder}
                                        onClick={() => {
                                            this.manufactureOpenMenu();
                                        }}
                                    >
                                        <div className={styles["manufacture-heading"]}>{this.props.heading2}</div>
                                        <div className={manufacIconActive} />
                                    </div>
                                    <Collapse isOpened={this.state.isManufactureOpen}>
                                        <div className={styles["manufacture-desc"]}>
                                            <div className={styles["manufacture-col"]}>
                                                {this.props.manufacturerDetails.countryOfOrigin && (
                                                    <Fragment>
                                                        <span className={styles["manufacture-head"]}>
                                                            Country Of Origin:
                                                        </span>
                                                        <span>{this.props.manufacturerDetails.countryOfOrigin}</span>
                                                    </Fragment>
                                                )}
                                            </div>
                                            <div className={styles["manufacture-col"]}>
                                                {this.props.manufacturerDetails.manufacturer &&
                                                    this.props.manufacturerDetails.manufacturer.length > 0 && (
                                                        <Fragment>
                                                            <span className={styles["manufacture-head"]}>
                                                                Manufacturer&lsquo;s Details:
                                                            </span>
                                                            {this.props.manufacturerDetails.manufacturer.map(
                                                                (item, i) => (
                                                                    <span key={i}>
                                                                        {i ? ", " : ""}
                                                                        {item.value}
                                                                    </span>
                                                                )
                                                            )}
                                                        </Fragment>
                                                    )}
                                            </div>
                                            <div className={styles["manufacture-col"]}>
                                                {this.props.manufacturerDetails.packer &&
                                                    this.props.manufacturerDetails.packer.length > 0 && (
                                                        <Fragment>
                                                            <span className={styles["manufacture-head"]}>
                                                                Packer&lsquo;s Details:
                                                            </span>
                                                            {this.props.manufacturerDetails.packer.map((item, i) => (
                                                                <span key={i}>
                                                                    {i ? ", " : ""}
                                                                    {item.value}
                                                                </span>
                                                            ))}
                                                        </Fragment>
                                                    )}
                                            </div>
                                            <div className={styles["manufacture-col"]}>
                                                {this.props.manufacturerDetails.importer &&
                                                    this.props.manufacturerDetails.importer.length > 0 && (
                                                        <Fragment>
                                                            <span className={styles["manufacture-head"]}>
                                                                Importer&lsquo;s Details:
                                                            </span>
                                                            {this.props.manufacturerDetails.importer.map((item, i) => (
                                                                <span key={i}>
                                                                    {i ? ", " : ""}
                                                                    {item.value}
                                                                </span>
                                                            ))}
                                                        </Fragment>
                                                    )}
                                            </div>
                                        </div>
                                    </Collapse>
                                </div>
                            )}
                        </div>
                    </div>
                ) : null}
            </Fragment>
        );
    }
}

NoReturnComponent.propTypes = {
    productDetails: PropTypes.shape({
        knowMoreV2: PropTypes.arrayOf(
            PropTypes.shape({
                knowMoreItemV2: PropTypes.string,
            })
        ),
    }),
    manufacturerDetails: PropTypes.shape({
        countryOfOrigin: PropTypes.string,
        manufacturer: PropTypes.arrayOf(
            PropTypes.shape({
                type: PropTypes.string,
                value: PropTypes.string,
            })
        ),
        packer: PropTypes.arrayOf(
            PropTypes.shape({
                type: PropTypes.string,
                value: PropTypes.string,
            })
        ),
        importer: PropTypes.arrayOf(
            PropTypes.shape({
                type: PropTypes.string,
                value: PropTypes.string,
            })
        ),
    }),
    heading: PropTypes.string,
    heading2: PropTypes.string,
};
