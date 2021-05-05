import React from "react";

import CheckBox from "../../general/components/CheckBox.js";
import styles from "./FilterDesktop.css";
export default class L3CategoryFilter extends React.Component {
    handleClick(categoryCode, hardCodeCategory, categoryName, categoryNameDup) {
        if (this.props.onL3Click) {
            this.props.onL3Click(categoryCode, hardCodeCategory, categoryName, categoryNameDup);
        }
    }

    render() {
        return (
            <React.Fragment>
                {this.props.l3filters.map((l3filter, i) => {
                    if (l3filter.quantity > 0) {
                        return (
                            <div
                                className={styles.newFilCheckboxBlock}
                                key={i}
                                onClick={() =>
                                    this.handleClick(
                                        l3filter.categoryCode,
                                        "Category",
                                        l3filter.categoryName,
                                        l3filter.categoryName
                                    )
                                }
                            >
                                <div className={styles.newFilCheckbox}>
                                    <CheckBox selected={this.props.selected} />
                                </div>
                                <div className={styles.newFilName}>{l3filter.categoryName}</div>
                                <div className={styles.newFilCount}>{l3filter.quantity}</div>
                            </div>
                        );
                    } else return null;
                })}
            </React.Fragment>
        );
    }
}
