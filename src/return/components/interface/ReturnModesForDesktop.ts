import { IReturnSelectedReason } from "./ReturnFlowDesktop";
export interface IProps {
  changeReturnReason: () => void;
  orderCode: string;
  selectedReasonAndCommentObj: null | IReturnSelectedReason;
  returnRequest: any;
}
export interface IState {
  selectedMode: string;
}
