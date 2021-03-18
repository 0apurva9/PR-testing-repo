import React from "react";

import CheckBox from "../../general/components/CheckBox.js";
import styles from "./FilterDesktop.css";
export default class L2CategoryFilter extends React.Component {
    handleClick(categoryCode, hardCodeCategory, categoryName, categoryNameDup) {
        if (this.props.onClick) {
            this.props.onClick(categoryCode, hardCodeCategory, categoryName, categoryNameDup);
        }
    }

    render() {
        return (
            <React.Fragment>
                {this.props.l2filters.map((l2filter, i) => {
                    if (l2filter.quantity > 0) {
                        return (
                            <div
                                className={styles.newFilCheckboxBlock}
                                key={i}
                                onClick={() =>
                                    this.handleClick(
                                        l2filter.categoryCode,
                                        "Category",
                                        l2filter.categoryName,
                                        l2filter.categoryName
                                    )
                                }
                            >
                                <div className={styles.newFilCheckbox}>
                                    <CheckBox selected={this.props.selected} />
                                </div>
                                <div className={styles.newFilName}>{l2filter.categoryName}</div>
                                <div className={styles.newFilCount}>{l2filter.quantity}</div>
                            </div>
                        );
                    } else return null;
                })}
            </React.Fragment>
        );
    }
}
