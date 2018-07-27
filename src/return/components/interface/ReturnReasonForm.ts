import { Dispatch } from "redux";

export interface IPReturnCommentsObj {
  returnReasonCode: string;
  subReasonCode: string;
  comment: string;
  reason: string;
  reverseSeal: string;
}

export interface IState extends IPReturnCommentsObj {
  displaySecondary?: boolean;
  secondaryReasons?: string;
  isEnable: boolean;
  subReason: string;
}
export interface IReturnReasonMapItem {
  parentReasonCode: string;
  parentReturnReason: string;
}

export interface IReturnSubReasons {
  subReasonCode: string;
  subReturnReason: string;
}

export interface IReturnSubReasonWithLabel {
  value: string;
  label: string;
}
export interface IProps {
  onContinue: (
    reasonAndCommentObj: IPReturnCommentsObj
  ) => (dispatch: Dispatch<any>) => Promise<void>;
  onCancel: () => (dispatch: Dispatch<any>) => Promise<void>;
  returnProductDetails: any;
}
