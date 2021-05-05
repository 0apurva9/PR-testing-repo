import React from "react";
import styles from "./CenterSlideModal.css";
export default class CenterSlideModal extends React.Component {
    render() {
        return (
            <div className={styles.base}>
                <div className={styles.content}>{this.props.children}</div>
            </div>
        );
    }
}
