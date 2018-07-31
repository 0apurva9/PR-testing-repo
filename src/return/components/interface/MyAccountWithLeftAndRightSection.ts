import { Dispatch } from "redux";

export interface IProps {
  getUserAddress?: () => (dispatch: Dispatch<any>) => Promise<void>;
  history: any;
  location: any;
  userAddress: any;
  returnProductDetails: any;
  orderDetails: any;
}
