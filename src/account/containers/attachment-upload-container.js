import {
  getCustomerQueriesFieldsv2,
  uploadUserFile,
  captureAttachmentsSubmit
} from "../actions/account.actions";
import { displayToast } from "../../general/toast.actions.js";
import { connect } from "react-redux";
import AttachmentUpload from "../components/attachment-upload";

import { setUrlToRedirectToAfterAuth } from "../../auth/actions/auth.actions.js";
import {
  showSecondaryLoader,
  hideSecondaryLoader
} from "../../general/secondaryLoader.actions";
import {
  showModal,
  ALERT_POPUP,
  ATTACHMENT_UPLOAD_RESPONSE_POPUP
} from "../../general/modal.actions";
const mapDispatchToProps = dispatch => {
  return {
    getCustomerQueriesFieldsv2: async (uItemplateCode, isSelectRadio) => {
      return dispatch(
        getCustomerQueriesFieldsv2(uItemplateCode, isSelectRadio)
      );
    },
    showSecondaryLoader: () => {
      dispatch(showSecondaryLoader());
    },
    hideSecondaryLoader: () => {
      dispatch(hideSecondaryLoader());
    },
    uploadUserFile: (issueType, title, file) => {
      dispatch(uploadUserFile(issueType, title, file));
    },
    displayToast: message => {
      dispatch(displayToast(message));
    },
    alertPopUp: getCustomerQueryDetailsObject => {
      dispatch(showModal(ALERT_POPUP, getCustomerQueryDetailsObject));
    },
    captureAttachmentsSubmit: (custoemrId, sendData) => {
      dispatch(captureAttachmentsSubmit(custoemrId, sendData));
    },
    setUrlToRedirectToAfterAuth: url => {
      dispatch(setUrlToRedirectToAfterAuth(url));
    },
    attachmentUploadResponsePopUp: responseData => {
      dispatch(showModal(ATTACHMENT_UPLOAD_RESPONSE_POPUP, responseData));
    }
  };
};

const mapStateToProps = state => {
  return {
    customerQueriesField: state.profile.customerQueriesField,
    customerQueriesLoading: state.profile.customerQueriesLoading,
    uploadUserFileLoading: state.profile.uploadUserFileLoading,
    submitCaptureAttachmentsLoading:
      state.profile.submitCaptureAttachmentsLoading,
    submitCaptureAttachmentsData: state.profile.submitCaptureAttachmentsData,
    uploadUserFiles: state.profile.uploadUserFile
  };
};

const AttachmentUploadContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AttachmentUpload);

export default AttachmentUploadContainer;
