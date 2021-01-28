import { Dispatch } from "redux";
import { IReturnSelectedReason } from "./ReturnFlowDesktop";

export interface IProps {
    onContinue: (bankDetails: IStateForBank) => void;
    onCancel: () => void;
    clearForm: () => void;
    displayToast: (val: string) => (dispatch: Dispatch<any>) => Promise<void>;
    history: any;
    orderCode: string;
    returnFlow: boolean;
    selectedReasonAndCommentObj: null | IReturnSelectedReason;
    changeReturnReason: () => void;
    subReason: null;
    bankDetail: {};
    updateStateForBankDetails: (data: IStateForBank) => void;
    onChange: (val: string) => void;
}
export interface ModeInterface {
    label: string;
    value: string;
}
export interface IStateForBank {
    accountNumber?: string;
    reEnterAccountNumber?: string;
    userName?: string;
    mode?: ModeInterface;
    bankName?: string;
    code?: string;
}
