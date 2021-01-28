import React from "react";
import PropTypes from "prop-types";

import styles from "./BreadCrumbs.css";
import { reverse } from "../../../reducers/utils";
import { HOME_ROUTER } from "../../../../lib/constants";
import { TATA_CLIQ_ROOT } from "../../../../lib/apiRequest.js";

export default class BreadCrumbs extends React.Component {
    handleHomeClick(e) {
        e.preventDefault();
        this.props.history.push(HOME_ROUTER);
    }

    handleBreadCrumbClick(e, url) {
        e.preventDefault();
        const urlSuffix = url.replace(TATA_CLIQ_ROOT, "$1");
        this.props.history.push(urlSuffix);
    }

    render() {
        const productDetails = this.props && this.props.productDetails;
        const breadCrumbs = productDetails && productDetails.seo && productDetails.seo.breadcrumbs;
        const reverseBreadCrumbs = breadCrumbs && breadCrumbs.length > 0 && reverse(breadCrumbs);
        return (
            <div className={styles["bread-crumb-container"]}>
                <ul className={styles["bread-crumb-ulblock"]}>
                    <li className={styles["bread-crumb-list"]}>
                        <a href={""} onClick={e => this.handleHomeClick(e)} className={styles["breadcrumb-link"]}>
                            Home
                        </a>
                    </li>
                    {reverseBreadCrumbs &&
                        reverseBreadCrumbs.map((el, i) => {
                            return (
                                <li className={styles["bread-crumb-list"]} key={i}>
                                    <a
                                        href={""}
                                        onClick={e => this.handleBreadCrumbClick(e, el.url)}
                                        className={styles["breadcrumb-link"]}
                                    >
                                        {el.name}
                                    </a>
                                </li>
                            );
                        })}
                </ul>
            </div>
        );
    }
}

BreadCrumbs.propTypes = {
    productDetails: PropTypes.object,
    history: PropTypes.shape({
        push: PropTypes.func,
    }),
};
