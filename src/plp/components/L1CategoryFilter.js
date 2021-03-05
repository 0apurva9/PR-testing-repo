import React from "react";

import CheckBox from "../../general/components/CheckBox.js";
import styles from "./FilterDesktop.css";

export default class L1CategoryFilter extends React.Component {
    onClick = () => {
        if (this.props.onL1Click) {
            this.props.onL1Click(this.props.value, "Category", this.props.name, this.props.name);
        }
    };

    render() {
        return (
            <React.Fragment>
                <div className={styles.newFilCheckboxBlock} onClick={this.onClick}>
                    <div className={styles.newFilCheckbox}>
                        <CheckBox selected={this.props.selected} />
                    </div>
                    <div className={styles.newFilName}>{this.props.name}</div>
                    <div className={styles.newFilCount}>{this.props.count}</div>
                </div>
            </React.Fragment>
        );
    }
}
