import { Dispatch } from "redux";

export interface IPReturnCommentsObj {
  returnReasonCode: string;
  subReasonCode: string;
  comment: string;
  reason: string;
  reverseSeal: string;
}

export interface IState {
  displaySecondary?: boolean;
  secondaryReasons?: string;
  comment: string;
  reverseSeal: string;
  returnReasonCode: string;
  subReasonCode: string;
  isEnable: boolean;
  reason: string;
  subReason: string;
}
export interface returnReasonMapItem {
  parentReasonCode: string;
  parentReturnReason: string;
}

export interface returnSubReasons {
  subReasonCode: string;
  subReturnReason: string;
}

export interface returnSubReasonWithLabel {
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
