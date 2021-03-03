import React, { Fragment } from "react";
import { Collapse } from "react-collapse";
import PropTypes from "prop-types";
import styles from "./APlusTemplates.css";
import APlusTemplate1 from "../../APlusTemplate1";
import APlusTemplate2 from "../../APlusTemplate2";
import APlusTemplate3 from "../../APlusTemplate3";
export default class APlusTemplate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: true,
        };
    }

    openMenu() {
        this.setState(prevState => ({
            isOpen: !prevState.isOpen,
        }));
    }

    render() {
        const productContent = this.props.productDetails.APlusContent
            ? this.props.productDetails.APlusContent.productContent
            : [];
        const template = this.props.productDetails.APlusContent
            ? this.props.productDetails.APlusContent.temlateName
            : null;

        let iconActive = styles.iconup;
        if (this.state.isOpen) {
            iconActive = styles.icon;
        }

        const data = {};
        productContent.length > 0 &&
            productContent
                .sort((a, b) => {
                    if (a.key < b.key) {
                        return -1;
                    }
                    if (a.key > b.key) {
                        return 1;
                    }
                    return 0;
                })
                .map(val => {
                    return val;
                })
                .forEach(val => {
                    if (val.key.slice(0, -1) in data) {
                        data[val.key.slice(0, -1)].push(val);
                    } else {
                        data[val.key.slice(0, -1)] = [];
                        data[val.key.slice(0, -1)].push(val);
                    }
                });
        let APlusContentType = template && template.split("_")[2];

        return (
            <Fragment>
                {productContent && productContent.length > 0 ? (
                    <div>
                        <div className={styles.container}>
                            <div
                                className={
                                    this.state.isOpen ? styles["ftb-component"] : styles["ftb-component-hide-padding"]
                                }
                            >
                                <div className={styles.base}>
                                    <div
                                        className={styles.holder}
                                        onClick={() => {
                                            this.openMenu();
                                        }}
                                    >
                                        <div className={styles["ftb-heading"]}>{this.props.heading}</div>
                                        <div className={iconActive} />
                                    </div>
                                    <Collapse isOpened={this.state.isOpen}>
                                        {data && APlusContentType === "1" && <APlusTemplate1 data={data} />}
                                        {data && APlusContentType === "2" && <APlusTemplate2 data={data} />}
                                        {data && APlusContentType === "3" && <APlusTemplate3 data={data} />}
                                    </Collapse>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : null}
            </Fragment>
        );
    }
}

APlusTemplate.propTypes = {
    productDetails: PropTypes.shape({
        APlusContent: PropTypes.shape({
            productContent: PropTypes.arrayOf(
                PropTypes.shape({
                    key: PropTypes.string,
                    value: PropTypes.object,
                })
            ),
            temlateName: PropTypes.string,
        }),
    }),
    heading: PropTypes.string,
};
