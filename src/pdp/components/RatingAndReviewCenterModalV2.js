import React from "react";
import styles from "./RatingAndReviewCenterModalV2.css";
import PropTypes from "prop-types";

export default class RatingAndReviewCenterModalV2 extends React.Component {
    handleClose() {
        this.props.closeModal();
    }

    render() {
        return (
            <div className={styles.base}>
                <div className={styles.cancel} onClick={() => this.handleClose()} />
                <div className={styles.content}>{this.props.children}</div>
            </div>
        );
    }
}

RatingAndReviewCenterModalV2.propTypes = {
    closeModal: PropTypes.func,
    children: PropTypes.node,
};
