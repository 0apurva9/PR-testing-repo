import React, { Component } from 'react'
import download from "../components/img/download.svg";
import deleteUpload from "../components/img/deleteUpload.svg";
import Icon from "../../xelpmoc-core/Icon";
import styles from './upload-file.css';
export default class UploadFile extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    handleClick(event) {
        const { target = {} } = event || {};
        target.value = "";
    }

    render() {
        const { attachmentComponent } = this.props
        let strArr = null;
        return (
            <div className={styles.base}>
                <div className={styles.attachment}>
                    <div
                        className={[
                            styles.fileBox,
                            this.props.file.length ? styles.borderFile : null
                        ].join(" ")}
                    >
                        <div className={styles.fileInstruction}>
                            <div className={styles.uploadHeding}>
                                {attachmentComponent && attachmentComponent.heading}
                            </div>
                            <div className={styles.uploadSubHeding}>
                                {attachmentComponent && attachmentComponent.itemsTitle}
                            </div>
                        </div>
                        <div className={styles.fileUpload}>
                            <div className={styles.fileBtn}>
                                {" "}
                                <div className={styles.uploadIcon}>
                                    <Icon image={download} width={14} height={16} />
                                </div>
                                <div className={styles.btnTxt}>
                                    {" "}
                                    <span>Attach File</span>
                                </div>
                            </div>
                            <input
                                type="file"
                                id="fileinput"
                                onClick={e => this.handleClick(e)}
                                onChange={e =>
                                    this.props.onUploadFile(
                                        e.target.files,
                                        this.props.attachmentComponent
                                    )
                                }
                                title=""
                                multiple={true}
                                accept="application/pdf, image/*" // accepting only pdf/images(all types)
                            />
                            <div className={styles.fileSize}>
                                {`Upload JPEG, PNG or PDF (Maximum size ${attachmentComponent &&
                                    attachmentComponent.maxFileSize} MB)`}
                            </div>
                        </div>
                    </div>
                    <div className={styles.filesBox}>
                        {this.props.file &&
                            this.props.file.map((file, index) => {
                                strArr = file.name ? file.name.split(".") : [];
                                return (
                                    <div
                                        key={`${file.name}_${index}`}
                                        className={styles.uploadFilesBox}
                                    >
                                        <div
                                            className={styles.deleteBOx}
                                            onClick={() => this.props.deleteFile(index)}
                                        >
                                            <Icon image={deleteUpload} size={20} />
                                        </div>
                                        <div className={styles.fileNames}>
                                            <div className={styles.fileName}>
                                                {`${strArr[0].slice(0, 20)}.${strArr[1]}`}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                    </div>
                </div>
            </div>
        )
    }
}
