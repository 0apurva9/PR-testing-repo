import { Dispatch } from "redux";

export interface IPCommentDetailsObj {
  returnReasonCode: string;
  subReasonCode: string;
  comment: string;
  reason: string;
  reverseSeal: string;
}
export interface IProps {
  onContinue: (
    reasonAndCommentObj: IPCommentDetailsObj
  ) => (dispatch: Dispatch<any>) => Promise<void>;
  returnProductDetails: any;
  onCancel: () => (dispatch: Dispatch<any>) => Promise<void>;
  onHollow: any;
  orderDate: any;
  orderId: any;
  productBrand: any;
}
