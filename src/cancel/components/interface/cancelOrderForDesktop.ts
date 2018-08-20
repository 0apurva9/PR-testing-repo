import { Dispatch } from "redux";

export interface ICancelProductDetailsObj {
  transactionId: string;
  orderCode: string;
  USSID: string;
  returnCancelFlag: string;
}
export interface IProps {
  cancelProductDetails: any;
  userAddress: any;
  error: string;
  loadingForCancelProductDetails: boolean;
  history: any;
  match: any;
  getDetailsOfCancelledProduct: (
    cancelProductDetails: ICancelProductDetailsObj
  ) => (dispatch: Dispatch<any>) => Promise<void>;
  getUserAddress?: () => (dispatch: Dispatch<any>) => Promise<void>;
  displayToast: (
    errorMessage: string
  ) => (dispatch: Dispatch<any>) => Promise<void>;
  showCancelOrderModal: (
    orderDetails: any
  ) => (dispatch: Dispatch<any>) => Promise<void>;
}
export interface IState {
  cancelReasonCode: string;
  reason: string;
  comment: string;
}
export interface ICancelItem {
  code: string;
  reasonDescription: string;
}
export interface ICancelReasonWithLabel {
  value: string;
  label: string;
}
export interface cancelProductDetailsObj {
  transactionId: string;
  orderCode: string;
  USSID: string;
  ticketTypeCode: string;
  reasonCode: string;
  refundType: string;
  reasonLabel: string;
}
export interface orderDetailsObj {
  cancelProductDetails: cancelProductDetailsObj;
  productDetails: any;
}
