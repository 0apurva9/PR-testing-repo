import PropTypes from "prop-types";
import React from "react";

import styles from "./SizeComponent.css";
import { findSelectedSize } from "../../../../reducers/utils";

export default class SizeComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isSelected: false,
            selectedIndex: -1,
        };
    }

    componentDidMount() {
        const variantTheme =
            this.props.productDetails && this.props.productDetails.variantTheme
                ? this.props.productDetails.variantTheme
                : [];

        const productListingId = this.props && this.props.productDetails && this.props.productDetails.productListingId;
        if (Array.isArray(variantTheme) && variantTheme.length > 0 && productListingId) {
            const sizeToSetInState = findSelectedSize(variantTheme, productListingId);
            this.setState(sizeToSetInState);
        }
    }

    componentDidUpdate(prevProps, prevState) {
        const variantTheme =
            this.props.productDetails && this.props.productDetails.variantTheme
                ? this.props.productDetails.variantTheme
                : [];

        const productListingId = this.props && this.props.productDetails && this.props.productDetails.productListingId;
        if (Array.isArray(variantTheme) && variantTheme.length > 0 && productListingId) {
            const sizeToSetInState = findSelectedSize(variantTheme, productListingId);
            if (prevState.selectedIndex !== sizeToSetInState.selectedIndex) {
                this.setState(sizeToSetInState);
            }
        }
    }

    handleSizeOptionClick(url) {
        this.props.history.push(url);
    }

    render() {
        let sizeOptions = [];
        let selectedClass = "";
        let variantOptions = [];
        if (this.props.productDetails && this.props.productDetails.variantTheme) {
            variantOptions = this.props && this.props.productDetails && this.props.productDetails.variantTheme;
            sizeOptions = Array.isArray(variantOptions) && variantOptions.map(el => el.sizelink);
        }

        return (
            <React.Fragment>
                <div className={styles["size-component"]}>
                    <div className={styles["size-block"]}>
                        <div className={styles["size-heading"]}>SELECT SIZE:</div>
                        <div className={styles["size-select-block"]}>
                            {sizeOptions &&
                                sizeOptions.length > 0 &&
                                sizeOptions.map((val, i) => {
                                    if (val.productCode) {
                                        if (val.isAvailable === true) {
                                            selectedClass =
                                                this.state.isSelected && this.state.selectedIndex === i
                                                    ? [styles["size-outer"], styles["selected"]].join(" ")
                                                    : styles["size-outer"];
                                            return (
                                                <div
                                                    key={i}
                                                    className={styles["size-select"]}
                                                    onClick={() => this.handleSizeOptionClick(val.url)}
                                                >
                                                    <div className={selectedClass}>
                                                        {val.imageUrl ? (
                                                            <div
                                                                className={styles["size-icon"]}
                                                                style={{
                                                                    backgroundImage: `url(${val.imageUrl})`,
                                                                }}
                                                            ></div>
                                                        ) : null}
                                                        {val.size}
                                                    </div>
                                                </div>
                                            );
                                        }
                                        if (val.isAvailable === false) {
                                            return (
                                                <div
                                                    key={i}
                                                    className={[styles["size-not-avail"], styles["size-select"]].join(
                                                        " "
                                                    )}
                                                >
                                                    <div className={styles["size-outer"]}>
                                                        {val.imageUrl ? (
                                                            <div
                                                                className={styles["size-icon"]}
                                                                style={{
                                                                    backgroundImage: `url(${val.imageUrl})`,
                                                                    backgroundSize: `auto ${34}px`,
                                                                }}
                                                            ></div>
                                                        ) : null}
                                                        {val.size}
                                                    </div>
                                                </div>
                                            );
                                        }
                                    } else {
                                        return null;
                                    }
                                })}
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

SizeComponent.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func,
    }),
    productDetails: PropTypes.shape({
        productListingId: PropTypes.string,
        variantTheme: PropTypes.any,
    }),
};
