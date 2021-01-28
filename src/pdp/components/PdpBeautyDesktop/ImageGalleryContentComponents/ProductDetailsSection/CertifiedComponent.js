import React from "react";
import PropTypes from "prop-types";

import styles from "./CertifiedComponent.css";
import { CERTIFIED_COMPONENT } from "../../ComponentConstants";

export default class CertifiedComponent extends React.Component {
    render() {
        const compDetails = this.props && this.props.compDetails;
        const certifiedComponent = compDetails && compDetails.filter(el => el.componentId === CERTIFIED_COMPONENT);
        return (
            <div className={styles["authentic-img-component"]}>
                <div className={styles["authentic-img-block"]}>
                    <img
                        src={certifiedComponent && certifiedComponent[0].bannerUrl}
                        alt="Authentic Products"
                        className={styles["authentic-image"]}
                    />
                </div>
            </div>
        );
    }
}

CertifiedComponent.propTypes = {
    productDetails: PropTypes.object,
    compDetails: PropTypes.object,
};
