import React, { Component } from "react";
import PropTypes from "prop-types";
import queryString from "query-string";
import Styles from "./attachment-upload.css";
import * as Cookie from "../../lib/Cookie";
import attachmentUpload from "./img/attachment-upload.svg";
import Icon from "../../xelpmoc-core/Icon";
import UploadFile from "./upload-file";
import Button from "../../general/components/Button.js";
import { LOGGED_IN_USER_DETAILS, CUSTOMER_ACCESS_TOKEN, LOGIN_PATH, SUCCESS } from "./../../lib/constants";
const USE_ID_NOT_MATCH = "The user ID seems to be different from the one used. Please try again with another user ID.";
import { SOMETHING_WENT_WRONG } from "../../general/toast.actions";

export default class AttachmentUpload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            queryParamsObj: this.getParsedQueryStringData(),
            attachementData: null,
            labelData: null,
            errorData: null,
            btnDisable: true,
            file: [],
            uploadedAttachment: "",
        };
    }

    getParsedQueryStringData = () => {
        const parsedQueryString = queryString.parse(this.props.location.search);
        const cIdList = parsedQueryString.cId ? parsedQueryString.cId.split("-") : [];
        if (cIdList.length) {
            return { customerId: cIdList[0], ticketId: cIdList[2], templateId: parsedQueryString.templateId };
        } else {
            return null;
        }
    };

    componentDidMount() {
        const customerId = this.state.queryParamsObj ? this.state.queryParamsObj.customerId : "",
            userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS),
            customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
        const parseUserDetails = userDetails && JSON.parse(userDetails);
        if (!userDetails && !customerCookie) {
            this.navigateToLogin();
        } else if (customerId !== parseUserDetails.customerId) {
            this.showAlertRetry();
        } else {
            this.props.getCustomerQueriesFieldsv2(this.state.queryParamsObj.templateId, false);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.uploadUserFiles !== this.props.uploadUserFiles) {
            if (nextProps.uploadUserFiles.status.toLowerCase() === SUCCESS.toLowerCase()) {
                this.setState(prevState => ({
                    file: [...prevState.file, ...this.state.newFiles],
                    btnDisable: false,
                    uploadedAttachment: [...prevState.uploadedAttachment, ...nextProps.uploadUserFiles.imageURLlist],
                }));
            }
        }

        if (nextProps.submitCaptureAttachmentsData !== this.props.submitCaptureAttachmentsData) {
            this.props.attachmentUploadResponsePopUp({
                submitResponseData: nextProps.submitCaptureAttachmentsData,
            });
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.customerQueriesFieldError !== this.props.customerQueriesFieldError) {
            this.props.alertPopUp({
                btnLabel: "GOT IT",
                txt: SOMETHING_WENT_WRONG,
                reDirectHomePage: true,
                isGotItHomePage: true,
            });
        }
    }

    deleteFile(index) {
        const copyuploadedAttachment = [...this.state.uploadedAttachment];
        var files = [...this.state.file];
        copyuploadedAttachment.splice(index, 1);
        files.splice(index, 1);
        this.setState({ uploadedAttachment: copyuploadedAttachment, file: files }, () => {
            if (this.state.file.length <= 0) {
                this.setState({ btnDisable: true });
            }
        });
    }

    async onUploadFile(file, { maxFileLimit, maxFileSize, title }) {
        const errorData = this.props.customerQueriesField
            ? this.props.customerQueriesField.find(item => item.componentName === "errorComponent")
            : {};
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
                    this.setState({ newFiles: [...newFile] });
                    this.props.uploadUserFile("", title, Array.from(newFile));
                } else {
                    if (totalFile.length > maxFileLimit) {
                        this.props.alertPopUp({
                            btnLabel: "GOT IT",
                            txt: errorData.heading,
                            reDirectHomePage: false,
                            isGotItHomePage: false,
                        });
                    } else {
                        this.props.alertPopUp({
                            btnLabel: "GOT IT",
                            txt: `File size should be less then ${maxFileSize} MB`,
                            reDirectHomePage: false,
                            isGotItHomePage: false,
                        });
                    }
                }
            }
        } else {
            if (this.props.alertPopUp) {
                this.props.alertPopUp({
                    btnLabel: "GOT IT",
                    txt: "Upload JPEG, PNG, or PDF only",
                    reDirectHomePage: false,
                    isGotItHomePage: false,
                });
            }
        }
    }

    submit() {
        const parsedQueryString = queryString.parse(this.props.location.search);
        let urlList = [],
            imageType = "";
        this.state.uploadedAttachment.forEach(item => {
            imageType = item.componentName;
            let list = item.urlList ? item.urlList.map(url => url.fileURL) : [];
            urlList.push(...list);
        });
        const finalList = urlList.join(",");
        let URLS = {
            urls: [
                {
                    type: imageType,
                    value: finalList,
                },
            ],
        };
        if (this.props.captureAttachmentsSubmit) {
            this.props.captureAttachmentsSubmit(parsedQueryString.cId, URLS);
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
            this.props.alertPopUp({
                btnLabel: "RETRY",
                txt: USE_ID_NOT_MATCH,
                reDirectHomePage: true,
                isGotItHomePage: false,
            });
        }
    }

    render() {
        const { queryParamsObj } = this.state;
        const {
            customerQueriesLoading,
            uploadUserFileLoading,
            submitCaptureAttachmentsLoading,
            customerQueriesField,
        } = this.props;
        if (customerQueriesLoading || uploadUserFileLoading || submitCaptureAttachmentsLoading) {
            this.props.showSecondaryLoader();
        } else {
            this.props.hideSecondaryLoader();
        }
        const attachmentData = customerQueriesField
            ? customerQueriesField.find(item => item.componentName === "attachmentComponent")
            : {};
        const labelData = customerQueriesField
            ? customerQueriesField.find(item => item.componentName === "labelComponent")
            : {};
        return (
            <div className={Styles.base}>
                <div className={Styles.topSection}>
                    <div className={Styles.iconBox}>
                        <Icon image={attachmentUpload} width={55} height={57} />
                    </div>
                    <div className={Styles.contentBox}>
                        <div className={Styles.heading}>
                            Ticket ID :{" "}
                            <span className={Styles.ticketId}>{queryParamsObj ? queryParamsObj.ticketId : ""}</span>
                        </div>
                        <div className={Styles.content}>{labelData && labelData.heading}</div>
                    </div>
                </div>
                <div className={Styles.attachmentSection}>
                    <div className={Styles.attachHeading}>
                        Add attachments {attachmentData && attachmentData.isMandatory ? "*" : " (optional)"}
                    </div>
                    <UploadFile
                        attachmentComponent={attachmentData}
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
                            onClick={() => this.submit()}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

AttachmentUpload.propTypes = {
    customerQueriesLoading: PropTypes.bool,
    uploadUserFile: PropTypes.func,
    getCustomerQueriesFieldsv2: PropTypes.func,
    alertPopUp: PropTypes.func,
    showSecondaryLoader: PropTypes.func,
    hideSecondaryLoader: PropTypes.func,
    submitCaptureAttachmentsLoading: PropTypes.bool,
    uploadUserFileLoading: PropTypes.bool,
    setUrlToRedirectToAfterAuth: PropTypes.func,
    captureAttachmentsSubmit: PropTypes.func,
    customerQueriesFieldError: PropTypes.object,
    attachmentResponseData: PropTypes.object,
    attachmentUploadResponsePopUp: PropTypes.func,
    customerQueriesField: PropTypes.object,
    submitCaptureAttachmentsData: PropTypes.object,
    history: PropTypes.shape({
        push: PropTypes.func,
    }),
    location: PropTypes.shape({
        search: PropTypes.string,
        pathname: PropTypes.string,
    }),
    uploadUserFiles: PropTypes.shape({
        imageURLlist: PropTypes.string,
        status: PropTypes.shape({
            toLowerCase: PropTypes.string,
        }),
    }),
};
