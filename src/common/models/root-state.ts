import { MobileNumberLoginReduxState } from "mobile-number-login/mobile-number-login.types";

export interface RootState {
    auth: any;
    user: any;
    modal: any;
    feed: any;
    productListings: any;
    productDescription: any;
    search: any;
    secondaryLoader: any;
    toast: any;
    cart: any;
    brandDefault: any;
    categoryDefault: any;
    profile: any;
    wishlistItems: any;
    header: any;
    icid: any;
    desktopFooter: any;
    mobileNumberLogin: MobileNumberLoginReduxState;
}
