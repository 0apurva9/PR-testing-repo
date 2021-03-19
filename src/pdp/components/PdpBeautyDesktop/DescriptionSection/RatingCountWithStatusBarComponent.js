import React, { Component } from "react";
import styles from "./RatingCountWithStatusBarComponent.css";
import Icon from "../../../../xelpmoc-core/Icon";
import FilledStarBlack from "../../../../general/components/img/star-fill-black.svg";
import PropTypes from "prop-types";

export default class RatingCountWithStatusBarComponent extends Component {
    render() {
        return (
            <div>
                <span className={styles.rating}>{this.props.rating}</span>
                <span className={styles.ratingStar}>
                    <Icon image={FilledStarBlack} size={10} />
                </span>
                <span className={styles.ratingCountStatusBar}>
                    <span
                        style={{
                            display: "block",
                            width: this.props.width,
                            height: "4px",
                            backgroundColor: this.props.backgroundColor,
                        }}
                    />
                </span>
                <span className={styles.ratingCount}>{this.props.ratingCount ? this.props.ratingCount : 0}</span>
            </div>
        );
    }
}

RatingCountWithStatusBarComponent.propTypes = {
    rating: PropTypes.number,
    width: PropTypes.string,
    backgroundColor: PropTypes.string,
    ratingCount: PropTypes.number,
};
