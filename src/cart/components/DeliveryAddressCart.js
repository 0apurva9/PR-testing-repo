import React from "react";
import styles from "./DeliveryAddressCart.css";
import CheckBox from "../../general/components/CheckBox.js";
import PropTypes from "prop-types";
import DesktopOnly from "../../general/components/DesktopOnly";
import MobileOnly from "../../general/components/MobileOnly";
export default class DeliveryAddressCopy extends React.Component {
    constructor() {
        super();
    }

    handleClick() {
        if (this.props.selectItem) {
            this.props.selectItem();
        }
    }

    render() {
        return (
            <div
                className={this.props.isReturn ? styles.baseForReturn : styles.base}
                onClick={() => this.handleClick()}
            >
                <div className={this.props.isReturn ? styles.titleAddressForReturn : styles.titleAddress}>
                    {this.props.addressTitle}
                </div>
                <div className={this.props.isReturn ? styles.titleDescriptionForReturn : styles.titleDescription}>
                    {this.props.addressDescription}
                    <MobileOnly>
                        {!this.props.isReturn && (
                            <div className={styles.checkCircle}>
                                <CheckBox selected={this.props.selected} />
                            </div>
                        )}
                    </MobileOnly>
                    {this.props.isReturn && (
                        <div className={styles.checkCircleForReturn}>
                            <CheckBox selected={this.props.selected} />
                        </div>
                    )}
                </div>
                {this.props.contact && (
                    <div className={this.props.isReturn ? styles.titleContactForReturn : styles.titleContact}>
                        Ph. {this.props.phone}
                    </div>
                )}
                <DesktopOnly>
                    {!this.props.isReturn && (
                        <div className={styles.checkCircle}>
                            <CheckBox selected={this.props.selected} />
                        </div>
                    )}
                </DesktopOnly>
            </div>
        );
    }
}

DeliveryAddressCopy.propTypes = {
    addressTitle: PropTypes.string,
    addressDescription: PropTypes.string,
    selected: PropTypes.bool,
    selectItem: PropTypes.func,
    isReturn: PropTypes.bool,
    contact: PropTypes.bool,
    phone: PropTypes.string,
};
DeliveryAddressCopy.defaultProps = {
    isReturn: false,
};
