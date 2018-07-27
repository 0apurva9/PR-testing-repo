export interface IProps {
  onCancel: () => void;
  orderCode: string;
  selectedReason: string;
  returnProductDetails: any;
  selectMode: any;
}

export interface IState {
  selectedMode: "quickDrop" | "schedulePickup" | "selfCourier" | "";
}
