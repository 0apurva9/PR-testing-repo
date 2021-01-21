import React, { Component } from 'react';
import PropTypes from "prop-types";
import Styles from './attchment-upload-response-popup.css';
import cancleSvg from "../components/img/cancleSvg.svg";
import Button from "../../general/components/Button.js";
import { withRouter } from "react-router-dom";
import successIcon from "../components/img/successIcon.svg";
import raiseTicketDuplicate from "../components/img/raiseTicketDuplicate.svg";
import Icon from '../../xelpmoc-core/Icon';
import { HOME_ROUTER } from "../../lib/constants";
const DUPLICATE = "Duplicate";

class AttachmentUploadResponse extends Component {

    continueShopping() {
        this.props.history.push(HOME_ROUTER);
    }

    render() {
        const { message, status } = this.props.submitResponseData;
        return (
            <div className={Styles.base}>
                <div className={Styles.closeIconBody} onClick={() => this.continueShopping()}>
                    <Icon image={cancleSvg} size={15} />
                </div>
                <div className={Styles.ticketTypeContentBody}>
                    <div className={Styles.ticketTypeHeading}>
                        {status === DUPLICATE ? "Files Already Received" : "Files Uploaded Successfully"}
                    </div>
                    {status === DUPLICATE ?
                        <div className={Styles.duplicateIcon}>
                            <Icon image={raiseTicketDuplicate} width={232} height={170} />
                        </div>
                        :
                        <div className={Styles.iconBox}>
                            <Icon image={successIcon} width={232} height={159} />
                        </div>
                    }

                    <div className={status === DUPLICATE ? Styles.messageBox : null}>
                        {message}
                    </div>

                    <div className={Styles.btnBody}>
                        <Button
                            type="primary"
                            backgroundColor="#da1c5c"
                            height={40}
                            label={"CONTINUE SHOPPING"}
                            borderRadius={6}
                            width={205}
                            textStyle={{ color: "#FFF", fontSize: 14 }}
                            disabled={false}
                            onClick={() => this.continueShopping()}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(AttachmentUploadResponse)

AttachmentUploadResponse.propTypes = {
    status: PropTypes.string,
    message: PropTypes.string
};