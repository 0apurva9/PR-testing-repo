import React from "react";

import cancelIcon from "../../general/components/img/cancelGrey.svg";
import Icon from "../../xelpmoc-core/Icon";
import styles from "./FilterDesktop.css";
export default class SelectedCategoryLevel extends React.Component {
    onClick = () => {
        if (this.props.onL1Click) {
            this.props.onL1Click(this.props.l1CategoryCode, "Category", this.props.l1Name, this.props.l1Name);
        }
        if (this.props.onClick) {
            this.props.onClick(this.props.l2CategoryCode, "Category", this.props.l2Name, this.props.l2Name);
        }
        if (this.props.onClickResetL1) {
            this.props.onClickResetL1();
        }
    };

    render() {
        return (
            <React.Fragment>
                <div className={styles.newselectedFilterWithIcon}>
                    {this.props.name}
                    <div className={styles.newFilcancelIcon} onClick={this.onClick}>
                        <Icon image={cancelIcon} size={10} backgroundSize="auto 20px" />
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
