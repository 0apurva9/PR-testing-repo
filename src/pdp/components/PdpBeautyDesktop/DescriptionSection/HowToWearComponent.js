import React, { Component, Fragment } from "react";
import styles from "./HowToWearComponent.css";
import HowToWearToggleComponent from "./HowToWearToggleComponent";

export default class HowToWearComponent extends Component {
    render() {
        const htwData = this.props.howToWearResponse ? this.props.howToWearResponse.items : [];
        let title;
        if (htwData && htwData.length > 0) {
            htwData.forEach(element => {
                if (element.componentName === "HTWPDPCarouselComponent") {
                    title = element.singleBannerComponent.title;
                }
            });
        }

        return (
            <Fragment>
                {this.props.howToWearResponse ? (
                    <div className={styles.container}>
                        <div className={styles["htw-component"]}>
                            <div className={styles.base}>
                                <div
                                    className={styles.holder}
                                    onClick={() => {
                                        this.openMenu();
                                    }}
                                >
                                    <div className={styles["htw-heading"]}>{title ? title.toUpperCase() : ""}</div>
                                </div>

                                <HowToWearToggleComponent {...this.props} />
                            </div>
                        </div>
                    </div>
                ) : null}
            </Fragment>
        );
    }
}
