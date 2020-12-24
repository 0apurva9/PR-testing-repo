import React, { Component } from 'react';
import PropTypes from "prop-types";
import Styles from './alert-pop-up.css';
import cancelGrey from "../components/img/cancelGrey.svg";
import Button from "../../general/components/Button.js";
import { withRouter } from "react-router-dom";
import BottomSlideModal from "../../general/components/BottomSlideModal";
import Icon from '../../xelpmoc-core/Icon';
import { LOGIN_PATH, HOME_ROUTER, } from "../../lib/constants";
import { SUCCESS } from '../../general/header.actions';

class AlertPopUp extends Component {

    componentWillReceiveProps(nextProps) {
        if (nextProps.logoutUserStatuss !== this.props.logoutUserStatuss) {
            if (nextProps.logoutUserStatuss.toLowerCase() === SUCCESS.toLowerCase()) {
                const url = this.props.location.pathname + this.props.location.search;
                this.props.setUrlToRedirectToAfterAuth(url);
                this.props.closeModal();
                this.props.history.push(LOGIN_PATH);
            }

        }
    }

    closeButtonClickHandle(reDirectHomePage) {
        if (reDirectHomePage) {
            this.props.history.push(HOME_ROUTER);
        }
        else {
            this.props.closeModal()
        }

    }

    navigateLogin() {
        if (this.props.logoutUser) {
            this.props.logoutUser()
        }

    }

    render() {
        const { btnLabel, txt, reDirectHomePage } = this.props
        return (
            <BottomSlideModal>
                <div className={Styles.base}>
                    <div className={Styles.cotentBody}>
                        <div className={Styles.closeIconBody} onClick={() => this.closeButtonClickHandle(reDirectHomePage)}>
                            <Icon image={cancelGrey} size={14} />
                        </div>
                        <div className={Styles.content}>
                            {txt}
                        </div>
                        <div className={Styles.btnBody}>
                            <Button
                                type="primary"
                                backgroundColor="#da1c5c"
                                height={40}
                                label={btnLabel}
                                borderRadius={6}
                                width={205}
                                textStyle={{ color: "#FFF", fontSize: 14 }}
                                disabled={false}
                                onClick={() => reDirectHomePage ? this.navigateLogin() : this.closeButtonClickHandle()}
                            />
                        </div>
                    </div>
                </div>
            </BottomSlideModal>
        )
    }
}

export default withRouter(AlertPopUp)

AlertPopUp.propTypes = {
    closeModal: PropTypes.func,
    logoutUser: PropTypes.func,
    setUrlToRedirectToAfterAuth: PropTypes.func,
    reDirectHomePage: PropTypes.bool,
    btnLabel: PropTypes.string,
    txt: PropTypes.string

};