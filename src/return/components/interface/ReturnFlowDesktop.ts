import { Dispatch } from "redux";

export interface IProductDetailsObj {
  transactionId: string;
  returnCancelFlag: string;
  orderCode: string;
}
export interface IProps {
  getReturnRequest: (
    orderCode: string,
    transactionId: string
  ) => (dispatch: Dispatch<any>) => Promise<void>;
  returnProductDetailsFunc: (
    productDetails: IProductDetailsObj
  ) => (dispatch: Dispatch<any>) => Promise<void>;
  getUserAddress?: () => (dispatch: Dispatch<any>) => Promise<void>;
  showSecondaryLoader: () => (dispatch: Dispatch<any>) => Promise<void>;
  hideSecondaryLoader: () => (dispatch: Dispatch<any>) => Promise<void>;
  fetchOrderDetails: (
    orderCode: string
  ) => (dispatch: Dispatch<any>) => Promise<void>;
  displayToast: (
    errorMessage: string
  ) => (dispatch: Dispatch<any>) => Promise<void>;
  history: any;
  location: any;
  userAddress: any;
  returnProductDetails: any;
  orderDetails: any;
  returnRequest: any;
}
export interface IState {
  orderCode?: string;
  isCOD?: boolean;
  bankDetail: any;
  returnProgressStatus: ReturnStatus;
  selectedReasonAndCommentObj: IReturnSelectedReason | null;
}

export enum ReturnStatus {
  SHOW_SELECT_REASON_AND_COMMENT_SECTION,
  SHOW_BANK_DETAIL_SECTION,
  SHOW_SELECT_MODE_SECTION,
  SHOW_FINAL_SUMMARY_SECTION
}

export interface IBankDetails {
  accountNumber: string;
  bankName: string;
  code: string;
  userName: string;
}
export interface IReturnSelectedReason {
  comment: string;
  reason: string;
  returnReasonCode: string;
  reverseSeal: string;
  subReasonCode: string;
}
