import React from "react";

import CheckBox from "../../general/components/CheckBox.js";
import styles from "./FilterDesktop.css";

export default class L1CategoryFilter extends React.Component {
    handleClick(categoryCode, hardCodeCategory, categoryName, categoryNameDup) {
        if (this.props.onL1Click) {
            this.props.onL1Click(categoryCode, hardCodeCategory, categoryName, categoryNameDup);
        }
    }

    render() {
        return (
            <React.Fragment>
                {this.props.l1filters.map((l1filter, i) => {
                    if (l1filter.quantity > 0) {
                        return (
                            <div
                                className={styles.newFilCheckboxBlock}
                                onClick={() =>
                                    this.handleClick(
                                        l1filter.categoryCode,
                                        "Category",
                                        l1filter.categoryName,
                                        l1filter.categoryName
                                    )
                                }
                                key={i}
                            >
                                <div className={styles.newFilCheckbox}>
                                    <CheckBox selected={this.props.selected} />
                                </div>
                                <div className={styles.newFilName}>{l1filter.categoryName}</div>
                                <div className={styles.newFilCount}>{l1filter.quantity}</div>
                            </div>
                        );
                    } else return null;
                })}
            </React.Fragment>
        );
    }
}
