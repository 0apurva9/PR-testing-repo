import React, { Component } from 'react';
import PropTypes from "prop-types";
import Styles from './attachment-upload.css';
import * as Cookie from "../../lib/Cookie";
import attachmentUpload from './img/attachment-upload.svg';
import Icon from '../../xelpmoc-core/Icon';
import UploadFile from './upload-file';
import Button from "../../general/components/Button.js";
import { LOGGED_IN_USER_DETAILS, CUSTOMER_ACCESS_TOKEN, LOGIN_PATH, SUCCESS } from './../../lib/constants';
const USE_ID_NOT_MATCH = "The user ID seems to be different from the one used. Please try again with another user ID.";
let findTemplateId = ""

export default class AttachmentUpload extends Component {

    constructor(props) {
        super(props)
        this.state = {
            attachementData: null,
            labelData: null,
            errorData: null,
            btnDisable: true,
            file: [],
            uploadedAttachment: "",
        }
    }

    async componentDidMount() {
        if (findTemplateId) {
            const response = await this.props.getCustomerQueriesFieldsv2(findTemplateId, false);
            if (response.status == SUCCESS) {
                let attachementsData = "";
                let labelsData = "";
                let errorsData = "";
                response.customerQueriesField.map((data) => {
                    if (data.componentName === "attachmentComponent") {
                        attachementsData = data
                    }
                    if (data.componentName === "labelComponent") {
                        labelsData = data
                    }
                    if (data.componentName === "errorComponent") {
                        errorsData = data
                    }
                })
                this.setState({
                    attachementData: attachementsData,
                    labelData: labelsData,
                    errorData: errorsData
                })
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.submitCaptureAttachmentsData !== this.props.submitCaptureAttachmentsData) {
            if (nextProps.submitCaptureAttachmentsData.status.toLowerCase() == SUCCESS.toLowerCase()) {
                if (this.props.attachmentUploadResponsePopUp) {
                    this.props.attachmentUploadResponsePopUp({
                        message: nextProps.submitCaptureAttachmentsData.message,
                        isTicketDuplicate: false
                    }
                    )
                }
            }

            else {
                this.props.attachmentUploadResponsePopUp({
                    message: nextProps.submitCaptureAttachmentsData.message,
                    isTicketDuplicate: true
                }
                )
            }
        }

    }

    deleteFile(index) {
        const copyuploadedAttachment = [...this.state.uploadedAttachment];
        var files = [...this.state.file];
        copyuploadedAttachment.splice(index, 1);
        files.splice(index, 1);
        this.setState(
            { uploadedAttachment: copyuploadedAttachment, file: files },
            () => {

                if (this.state.file.length <= 0) {
                    this.setState({ btnDisable: true });
                }

            }
        );
    }

    async onUploadFile(file, { maxFileLimit, maxFileSize, title }) {

        const newFile = Array.from(file);
        let validFile = true;
        for (let value of newFile) {
            if (
                value.name.includes("jpg") ||
                value.name.includes("jpeg") ||
                value.name.includes("png") ||
                value.name.includes("pdf")
            ) {
                validFile = true;
            } else {
                validFile = false;
                break;
            }
        }
        if (validFile) {
            if (newFile.length > 0) {
                let combinedSize = 0,
                    totalFile = [...newFile, ...this.state.file];
                for (let f of totalFile) combinedSize += f.size / 1048576; //converting file size into MB
                if (combinedSize <= maxFileSize && totalFile.length <= maxFileLimit) {
                    const uploadFileResponse = await this.props.uploadUserFile(
                        "",
                        title,
                        Array.from(newFile)
                    );
                    let { uploadUserFile, status } = uploadFileResponse;
                    if (uploadFileResponse && status.toLowerCase() === SUCCESS.toLowerCase()) {
                        this.setState(prevState => ({
                            file: [...prevState.file, ...newFile],
                            btnDisable: false,
                            uploadedAttachment: [
                                ...prevState.uploadedAttachment,
                                ...uploadUserFile.imageURLlist
                            ]
                        }));
                    }
                } else {
                    if (totalFile.length > maxFileLimit)
                        if (this.props.alertPopUp) {
                            this.props.alertPopUp({ btnLabel: "GOT IT", txt: this.state.errorData.heading, reDirectHomePage: false });
                        }
                        else
                            if (this.props.alertPopUp) {
                                this.props.alertPopUp({ btnLabel: "GOT IT", txt: `File size should be less then ${maxFileSize} MB`, reDirectHomePage: false });
                            }
                }
            }
        } else {
            if (this.props.alertPopUp) {
                this.props.alertPopUp({ btnLabel: "GOT IT", txt: "Upload JPEG, PNG, or PDF only", reDirectHomePage: false });
            }
        }
    }

    submit(findCustomerId, findTicketId) {
        let urlList = [],
            imageType = "";
        this.state.uploadedAttachment.forEach(item => {
            imageType = item.componentName
            let list = item.urlList
                ? item.urlList.map(url => url.fileURL)
                : [];
            urlList.push(...list);
        });
        const finalList = urlList.join(",")
        let URLS = {
            "urls": [
                {
                    type: imageType,
                    value: finalList
                }
            ]
        }
        const customerId = findCustomerId + "-" + findTicketId
        if (this.props.captureAttachmentsSubmit) {
            this.props.captureAttachmentsSubmit(customerId, URLS)
        }
    }

    navigateToLogin() {
        const url = this.props.location.pathname + this.props.location.search;
        if (this.props.setUrlToRedirectToAfterAuth) {
            this.props.setUrlToRedirectToAfterAuth(url);
        }
        this.props.history.push(LOGIN_PATH);
        return null;
    }

    showAlertRetry() {
        if (this.props.alertPopUp) {
            this.props.alertPopUp({ btnLabel: "RETRY", txt: USE_ID_NOT_MATCH, reDirectHomePage: true });
        }
        return null
    }

    render() {
        const searchParams = this.props.location.search;
        const splitURL = searchParams.split('cId')[1].split("=");
        const findCustomerId = splitURL[1].split('-')[0]
        const findTicketId = splitURL[1].split('-')[1]
        const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
        const customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
        const userDetailsParse = userDetails ? JSON.parse(userDetails) : {};

        if (!userDetails || !customerCookie) {
            return this.navigateToLogin();
        }
        if (findCustomerId !== userDetailsParse.customerId) {
            return this.showAlertRetry();
        }

        findTemplateId = splitURL[2]

        const { customerQueriesLoading, uploadUserFileLoading, submitCaptureAttachmentsLoading } = this.props
        if (customerQueriesLoading || uploadUserFileLoading || submitCaptureAttachmentsLoading) {
            this.props.showSecondaryLoader();
        } else {
            this.props.hideSecondaryLoader();
        }

        return (
            <div className={Styles.base}>
                <div className={Styles.topSection}>
                    <div className={Styles.iconBox}>
                        <Icon
                            image={
                                attachmentUpload
                            }
                            width={55}
                            height={57}
                        />
                    </div>
                    <div className={Styles.contentBox}>
                        <div className={Styles.heading}>
                            Ticket ID : {" "}
                            <span className={Styles.Id}>{findTicketId}</span>
                        </div>
                        <div className={Styles.content}>{this.state.labelData && this.state.labelData.heading}</div>
                    </div>
                </div>
                <div className={Styles.attachmentSection}>
                    <div className={Styles.attachHeading}>
                        Add attachments
                      {this.state.attachementData && this.state.attachementData.isMandatory
                            ? "*"
                            : " (optional)"} {" "}
                    </div>
                    <UploadFile
                        attachmentComponent={this.state.attachementData}
                        deleteFile={index => this.deleteFile(index)}
                        onUploadFile={(target, attachmentComponent) => this.onUploadFile(target, attachmentComponent)}
                        file={this.state.file}
                    />
                    <div className={Styles.btnSection}>
                        <Button
                            type="primary"
                            backgroundColor="#da1c5c"
                            height={40}
                            label={"SUBMIT"}
                            borderRadius={6}
                            width={205}
                            textStyle={{ color: "#FFF", fontSize: 14 }}
                            disabled={this.state.btnDisable}
                            disabledLightGray={this.state.btnDisable}
                            onClick={() => this.submit(findCustomerId, findTicketId)}
                        />
                    </div>
                </div>

            </div>
        )
    }
}

AttachmentUpload.propTypes = {
    customerQueriesLoading: PropTypes.bool,
    uploadUserFile: PropTypes.func,
    getCustomerQueriesFieldsv2: PropTypes.func,
    alertPopUp: PropTypes.func,
    showSecondaryLoader: PropTypes.func,
    hideSecondaryLoader: PropTypes.func
};