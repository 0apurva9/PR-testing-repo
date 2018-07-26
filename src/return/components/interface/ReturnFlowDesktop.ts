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
  history: any;
  location: any;
  userAddress: any;
}
