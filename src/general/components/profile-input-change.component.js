import React from "react";
import styles from "../../account/components/EditAccountDetails.css";

export class ProfileInputChange extends React.Component {
    render() {
        return (
            <div className={styles.inputHolder}>
                <input
                    type="text"
                    className={styles.inputBoxNew}
                    placeholder={this.props.placeholder}
                    value={this.props.value ? this.props.value : ""}
                />
                <button
                    type="button"
                    className={styles.editBtn}
                    onClick={this.props.onClick ? () => this.props.onClick() : null}
                ></button>
            </div>
        );
    }
}
