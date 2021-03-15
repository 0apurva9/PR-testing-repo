import React, { Component } from "react";
import Icon from "../../xelpmoc-core/Icon";
import styles from "./RnRSuccessSectionComponent.css";
import PropTypes from "prop-types";
import rnrSuccessHighRating from "./img/rnrSuccessHighRating.jpg";
import rnrSuccessLowRating from "./img/rnrSuccessLowRating.jpg";

class RnRSuccessSectionComponent extends Component {
    render() {
        return (
            <React.Fragment>
				{this.props.selectedRating > 2.5 ? (
					<React.Fragment>
						<div className={styles.heading}>Looks like we really CLiQed!</div>
						<div className={styles.iconContainer}>
							<Icon image={rnrSuccessHighRating} size={97} />
						</div>
					</React.Fragment>
				) : (
					<React.Fragment>
						<div className={styles.heading}>Thank you for your honest feedback.</div>
						<div className={styles.iconContainer}>
							<Icon image={rnrSuccessLowRating} size={97} />
						</div>
					</React.Fragment>
				)}

            </React.Fragment>
        );
    }
}

RnRSuccessSectionComponent.propTypes = {
	selectedRating: PropTypes.number,
};

export default RnRSuccessSectionComponent;
