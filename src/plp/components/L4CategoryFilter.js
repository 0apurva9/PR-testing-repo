import React from "react";

import CheckBox from "../../general/components/CheckBox.js";
import styles from "./FilterDesktop.css";
export default class L4CategoryFilter extends React.Component {
    handleClick(categoryCode, hardCodeCategory, categoryName, categoryNameDup) {
        if (this.props.onL4Click) {
            this.props.onL4Click(categoryCode, hardCodeCategory, categoryName, categoryNameDup);
        }
    }

    render() {
        return (
            <React.Fragment>
                {this.props.l4filters.map((l4filter, i) => {
                    if (l4filter.quantity > 1) {
                        return (
                            <div
                                className={styles.newFilCheckboxBlock}
                                key={i}
                                onClick={() =>
                                    this.handleClick(
                                        l4filter.categoryCode,
                                        "Category",
                                        l4filter.categoryName,
                                        l4filter.categoryName
                                    )
                                }
                            >
                                <div className={styles.newFilCheckbox}>
                                    <CheckBox selected={this.props.selected} />
                                </div>
                                <div className={styles.newFilName}>{l4filter.categoryName}</div>
                                <div className={styles.newFilCount}>{l4filter.quantity}</div>
                            </div>
                        );
                    } else return null;
                })}
            </React.Fragment>
        );
    }
}
