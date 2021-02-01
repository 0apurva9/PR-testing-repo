import React from "react";
import PropTypes from "prop-types";
import MobileOnly from "../../general/components/MobileOnly";
import DesktopOnly from "../../general/components/DesktopOnly";
import Image from "../../xelpmoc-core/Image";
import styles from "./CheckOutHeader.css";
import checkIcon from "./img/check.svg";

export default class CheckOutHeader extends React.Component {
    render() {
        const propFontSize = this.props.fontSize ? this.props.fontSize : 0;
        return (
            <div className={styles.base}>
                <div className={styles.confirm} style={{ fontSize: propFontSize ? propFontSize : "" }}>
                    <DesktopOnly>
                        {this.props.indexNumber !== "0" && !this.props.completed && (
                            <div className={styles.circleHolder}>
                                <div className={styles.circle}>{this.props.indexNumber}</div>
                            </div>
                        )}
                        {this.props.completed && (
                            <div className={styles.checkIconHolder}>
                                <Image image={checkIcon} fit="165%" />
                            </div>
                        )}
                        {this.props.isAdditionsTextRight && (
                            <div style={{ float: "right" }}>
                                <span className={styles.lowerLimitColor}>0</span>/
                                <span className={styles.upperLimitColor}>240</span>
                            </div>
                        )}
                    </DesktopOnly>
                    <MobileOnly>
                        {this.props.indexNumber !== "0" && (
                            <div className={styles.circleHolder}>
                                <div className={styles.circle}>{this.props.indexNumber}</div>
                            </div>
                        )}
                    </MobileOnly>
                    {this.props.confirmTitle}
                </div>
            </div>
        );
    }
}

CheckOutHeader.propTypes = {
    indexNumber: PropTypes.string,
    confirmTitle: PropTypes.string,
    completed: PropTypes.bool,
    fontSize: PropTypes.string,
    isAdditionsTextRight: PropTypes.bool,
};

CheckOutHeader.defaultProps = {
    completed: false,
};
