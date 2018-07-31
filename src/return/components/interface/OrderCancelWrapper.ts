import { Dispatch } from "redux";

export interface IProps {
  getUserAddress?: () => (dispatch: Dispatch<any>) => Promise<void>;
  userAddress: any;
  orderDetails: any;
  orderId: string;
  userDetails: any;
}
