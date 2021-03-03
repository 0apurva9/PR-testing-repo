import React from "react";
import Image from "../../xelpmoc-core/Image";
import PropTypes from "prop-types";
import styles from "./BankSelect.css";
import MobileOnly from "../../general/components/MobileOnly";
import DesktopOnly from "../../general/components/DesktopOnly";
export default class BankSelect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hoverd: false,
        };
    }

    handleClick() {
        if (this.props.selectItem && !this.props.isRetryPaymentFromURL) {
            this.props.selectItem();
        }
    }

    hoverIn() {
        this.setState({ hoverd: true });
    }

    hoverOut() {
        this.setState({ hoverd: false });
    }

    render() {
        return (
            <div>
                <div
                    className={this.props.selected || this.state.hoverd ? styles.selected : styles.base}
                    onClick={() => {
                        this.handleClick();
                    }}
                    onMouseEnter={() => this.hoverIn()}
                    onMouseLeave={() => this.hoverOut()}
                >
                    <div className={styles.image}>
                        <Image image={this.props.image} />
                    </div>
                </div>
                <MobileOnly>{this.props.name && <div className={styles.name}>{this.props.name}</div>}</MobileOnly>
                <DesktopOnly>
                    {this.props.name && <div className={styles.name}>{this.props.name}</div>}
                    {/* {this.state.hoverd &&
            !this.props.selected && (
              <div className={styles.name}>{this.props.name}</div>
            )} */}
                </DesktopOnly>
            </div>
        );
    }
}

BankSelect.propTypes = {
    image: PropTypes.string,
    value: PropTypes.string,
    selected: PropTypes.bool,
    selectItem: PropTypes.func,
    isRetryPaymentFromURL: PropTypes.bool,
    name: PropTypes.string,
};
