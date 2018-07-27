import { Dispatch } from "redux";

export interface IProps {
  onContinue: (bankDetails: IStateForBank) => void;
  onCancel: () => void;
  displayToast: (val: string) => (dispatch: Dispatch<any>) => Promise<void>;
  history: any;
  orderCode: string;
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
