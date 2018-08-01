import { IReturnSelectedReason, IBankDetails } from "./ReturnFlowDesktop";
import { Dispatch } from "redux";

export interface IProps {
  changeReturnReason: () => void;
  orderCode: string;
  selectedReasonAndCommentObj: null | IReturnSelectedReason;
  returnRequest: any;
  returnProductDetails: any;
  showSecondaryLoader: () => (dispatch: Dispatch<any>) => Promise<void>;
  hideSecondaryLoader: () => (dispatch: Dispatch<any>) => Promise<void>;
  bankDetail: IBankDetails;
}
export interface IState {
  selectedMode: string;
  isReturnModeSelected: boolean;
}
