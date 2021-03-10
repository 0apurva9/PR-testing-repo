/* eslint-disable react/display-name */
import React from "react";
import Loadable from "react-loadable";
import MobileOnly from "../../general/components/MobileOnly";
import Helmet from "react-helmet";
import styles from "./ProductDescriptionPageWrapper.css";
import SecondaryLoader from "../../general/components/SecondaryLoader";
import {
    PRODUCT_DESCRIPTION_PRODUCT_CODE,
    PRODUCT_DESCRIPTION_SLUG_PRODUCT_CODE,
    AMP_PRODUCT_CODE_REG_EX,
    DEFAULT_PIN_CODE_LOCAL_STORAGE,
    CUSTOMER_ACCESS_TOKEN,
    LOGGED_IN_USER_DETAILS,
    CART_DETAILS_FOR_LOGGED_IN_USER,
    COLLECT,
    SUCCESS,
    SELECTED_DELIVERY_MODE,
    LOGIN_PATH,
    STORE_DETAILS,
    CHECKOUT_ROUTER,
    CNC_CART,
} from "../../lib/constants";
import { renderMetaTags, renderMetaTagsWithoutSeoObject } from "../../lib/seoUtils.js";
import PdpDesktop from "./PdpDesktop";
import PdpBeautyDesktop from "./PdpBeautyDesktop/PdpBeautyDesktop";
import { checkUserAgentIsMobile } from "../../lib/UserAgent.js";
import queryString from "query-string";
import { isBrowser } from "browser-or-node";
import * as Cookie from "../../lib/Cookie";
export const CLIQ_AND_PIQ_CART_ID = "cliqAndPiqCartId";
export const CLIQ_AND_PIQ_CART_CODE = "cliqAndPiqCartCode";
const ERROR_MESSAGE_FOR_MOBILE_NUMBER = "Please enter valid mobile number";

const PiqPageForPdp = Loadable({
    loader: () => import("./PiqPageForPdp"),
    loading() {
        return (
            <div className={styles.loadingIndicator}>
                <Loader />
            </div>
        );
    },
});
let typeComponentMapping = {};
let PdpElectronics;
let PdpJewellery;
let PdpApparel;
let PdpHome;

if (isBrowser) {
    PdpElectronics = require("./PdpElectronics");
    PdpJewellery = require("./PdpJewellery");
    PdpApparel = require("./PdpApparel");
    PdpHome = require("./PdpHome");

    typeComponentMapping = {
        Electronics: props => <PdpElectronics {...props} />,
        Watches: props => <PdpElectronics {...props} />,
        FashionJewellery: props => <PdpJewellery {...props} />,
        Clothing: props => <PdpApparel {...props} />,
        Footwear: props => <PdpApparel {...props} />,
        HomeFurnishing: props => <PdpHome {...props} />,
        FineJewellery: props => <PdpJewellery {...props} />,
    };
}

const Loader = () => {
    return (
        <div>
            <SecondaryLoader />
        </div>
    );
};
export default class ProductDescriptionPageWrapper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showPiqPage: false,
            selectedProductsUssIdForCliqAndPiq: null,
        };
    }

    componentWillMount() {
        if (this.props.relevantBundleProductCode()) {
            this.props.relevantBundleProductCode();
        }
    }

    componentDidMount = async () => {
        if (this.props.match.path === PRODUCT_DESCRIPTION_PRODUCT_CODE) {
            setTimeout(() => {
                window.scrollTo(0, 0);
            }, 0);
            await this.props.getProductDescription(this.props.match.params[0]);
        } else if (this.props.match.path === PRODUCT_DESCRIPTION_SLUG_PRODUCT_CODE) {
            setTimeout(() => {
                window.scrollTo(0, 0);
            }, 0);
            this.props.getProductDescription(this.props.match.params[1]);
        } else {
            //need to show error page
        }
        const parsedQueryString = queryString.parse(this.props.location.search);

        //show the pinCodeModal if showAmpPincode is true
        if (parsedQueryString.showAmpPincode === "true") {
            if (this.props.match.path === PRODUCT_DESCRIPTION_PRODUCT_CODE) {
                this.props.showPincodeModal(this.props.match.params[0]);
            } else if (this.props.match.path === PRODUCT_DESCRIPTION_SLUG_PRODUCT_CODE) {
                this.props.showPincodeModal(this.props.match.params[1]);
            }
        }
        // get chatbot json details
        if (this.props.getChatbotDetails) {
            this.props.getChatbotDetails();
        }
        this.initiateHaptikScript();
    };

    initiateHaptikScript() {
        var f = document.getElementsByTagName("SCRIPT")[0];
        var p = document.createElement("SCRIPT");
        var date = new Date();
        var timestamp = date.getTime();
        var source_url = process.env.HAPTIK_CHATBOT_URL + "/static/aspectwise/js/haptik.js?" + timestamp;
        p.type = "text/javascript";
        p.setAttribute("charset", "utf-8");
        p.setAttribute("clientid", "tatacliq");
        p.async = true;
        p.id = "buzzosrc";
        p.src = source_url;
        if (!document.getElementById("buzzosrc")) {
            f.parentNode.insertBefore(p, f);
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.productDetails && this.props.productDetails !== "null") {
            this.props.setHeaderText(this.props.productDetails.productName);
        }

        if (prevProps.location.pathname !== this.props.location.pathname) {
            setTimeout(() => {
                window.scrollTo(0, 0);
            }, 0);

            if (this.props.match.path === PRODUCT_DESCRIPTION_PRODUCT_CODE) {
                this.props.getProductDescription(this.props.match.params[0], true);
                // this.props.getMsdRequest(this.props.match.params[0]);
            } else if (this.props.match.path === PRODUCT_DESCRIPTION_SLUG_PRODUCT_CODE) {
                setTimeout(() => {
                    window.scrollTo(0, 0);
                }, 0);
                this.props.getProductDescription(this.props.match.params[1], true);
                // this.props.getMsdRequest(this.props.match.params[1]);
            } else {
                //need to show error page
            }
        }
    }

    showLoader = () => {
        this.props.showSecondaryLoader();
    };

    hideLoader = () => {
        this.props.hideSecondaryLoader();
    };

    renderRootCategory = datumType => {
        let pdpToRender = typeComponentMapping[datumType];
        if (!pdpToRender) {
            pdpToRender = typeComponentMapping["Clothing"];
        }
        return <React.Fragment>{pdpToRender({ ...this.props })}</React.Fragment>;
    };

    renderAmpTags = () => {
        if (AMP_PRODUCT_CODE_REG_EX.test(this.props.history.location.pathname)) {
            let productCode = /mp[0-9]+/i.test(this.props.match.params[0])
                ? this.props.match.params[0]
                : this.props.match.params[1];
            return (
                <Helmet>
                    <link rel="amphtml" href={`/amp/p-${productCode}`} />
                    <link rel="canonical" href={`/amp/p-${productCode}`} />
                </Helmet>
            );
        }
    };

    renderLoader() {
        return (
            <div className={styles.loadingIndicator}>
                <SecondaryLoader />
            </div>
        );
    }

    navigateToLogin() {
        const url = this.props.location.pathname;
        this.props.setUrlToRedirectToAfterAuth(url);
        this.props.history.push(LOGIN_PATH);
    }

    addStoreCNC = async selectedSlaveId => {
        let customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
        let userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
        let cartDetailsLoggedInUser = Cookie.getCookie(CART_DETAILS_FOR_LOGGED_IN_USER);
        let productDetailsObject = {};
        productDetailsObject.code = this.props.productDetails && this.props.productDetails.productListingId;
        productDetailsObject.slaveId = selectedSlaveId;
        productDetailsObject.ussId = this.props.productDetails && this.props.productDetails.winningUssID;
        productDetailsObject.isCNC = true;
        if (!(customerCookie || userDetails || cartDetailsLoggedInUser)) {
            this.navigateToLogin();
        } else {
            this.setState({
                selectedProductsUssIdForCliqAndPiq: this.props.productDetails && this.props.productDetails.winningUssID,
            });
            let buyNowResponse = await this.props.buyNow(productDetailsObject);
            if (buyNowResponse && buyNowResponse.status === SUCCESS && buyNowResponse.cartDetails) {
                localStorage.setItem(CNC_CART, "true");
                this.setState({
                    isCliqAndPiqCartGuid: buyNowResponse.cartDetails.buyNowCartGuid,
                    isCliqAndPiqCartCode: buyNowResponse.cartDetails.buyNowCartCode,
                });
            }
        }
    };

    getUserDetails = () => {
        const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
        const customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
        if (userDetails && customerCookie) {
            if (this.props.getUserDetails) {
                this.props.getUserDetails();
            }
        }
    };

    async addPickupPersonCNC(mobile, name) {
        const mobileRegEx = /^[6-9]\d{9}$/;
        var res = mobileRegEx.test(mobile);
        if (!mobile || mobile.length !== 10 || !res) {
            return this.props.displayToast(ERROR_MESSAGE_FOR_MOBILE_NUMBER);
        }
        let storeDetails = localStorage.getItem(STORE_DETAILS);
        if (storeDetails) {
            localStorage.removeItem(STORE_DETAILS);
            this.props.history.replace({
                state: {},
            });
        }
        localStorage.setItem(CLIQ_AND_PIQ_CART_ID, JSON.stringify(this.state.isCliqAndPiqCartGuid));
        localStorage.setItem(CLIQ_AND_PIQ_CART_CODE, JSON.stringify(this.state.isCliqAndPiqCartCode));
        const addPickUpPerson = await this.props.addPickupPersonCNC(mobile, name);
        if (addPickUpPerson.status === SUCCESS) {
            const updatedDeliveryModeUssid = {};
            updatedDeliveryModeUssid[this.state.selectedProductsUssIdForCliqAndPiq] = COLLECT;

            localStorage.setItem(SELECTED_DELIVERY_MODE, JSON.stringify(updatedDeliveryModeUssid));
            const defaultPinCode = localStorage.getItem(DEFAULT_PIN_CODE_LOCAL_STORAGE);
            this.props.history.push({
                pathname: CHECKOUT_ROUTER,
                state: {
                    pinCode: defaultPinCode,
                    isFromCliqAndPiq: true,
                    isCliqAndPiqCartGuid: this.state.isCliqAndPiqCartGuid,
                    isCliqAndPiqCartCode: this.state.isCliqAndPiqCartCode,
                },
            });
        }
    }

    render() {
        //UPF-2999 : Removing below loader to enhance user experience
        // if (this.props.loading) {
        //     this.showLoader();
        // } else {
        //     this.hideLoader();
        // }

        if (!checkUserAgentIsMobile() && this.props.showPiqPage && this.props.stores && this.props.stores.length > 0) {
            let cliqAndPiqDetails = {};
            cliqAndPiqDetails.loadingForCliqAndPiq = this.props.loadingForCliqAndPiq;
            cliqAndPiqDetails.stores = this.props.stores;
            cliqAndPiqDetails.productDetails = this.props.productDetails;
            cliqAndPiqDetails.pinCodeUpdateDisabled = true;
            cliqAndPiqDetails.userDetails = this.props.userDetails;
            cliqAndPiqDetails.from = "Pdp";
            cliqAndPiqDetails.addPickupPersonCNC = (mobile, name) => this.addPickupPersonCNC(mobile, name);
            cliqAndPiqDetails.addStoreCNC = slavesId => this.addStoreCNC(slavesId);
            cliqAndPiqDetails.getUserDetails = () => this.getUserDetails();
            cliqAndPiqDetails.mergeTempCartWithOldCart = () => this.props.mergeTempCartWithOldCart();
            cliqAndPiqDetails.pincodeResponseList =
                this.props && this.props.productDetails && this.props.productDetails.pincodeResponseList;
            cliqAndPiqDetails.winningUssID =
                this.props && this.props.productDetails && this.props.productDetails.winningUssID;
            cliqAndPiqDetails.pincode = localStorage.getItem(DEFAULT_PIN_CODE_LOCAL_STORAGE);
            this.props.showPdpCliqAndPiqPage(cliqAndPiqDetails);
        }
        if (this.props.productDetails) {
            if (!this.props.showPiqPage) {
                if (checkUserAgentIsMobile()) {
                    return (
                        <MobileOnly>
                            {this.renderAmpTags()}
                            {this.props.productDetails.seo
                                ? renderMetaTags(this.props.productDetails)
                                : renderMetaTagsWithoutSeoObject(this.props.productDetails)}
                            {this.renderRootCategory(this.props.productDetails.rootCategory)}
                        </MobileOnly>
                    );
                } else {
                    const categoryHierarchy =
                        this.props && this.props.productDetails && this.props.productDetails.categoryHierarchy;
                    let beautyCategory = [];
                    beautyCategory =
                        categoryHierarchy &&
                        categoryHierarchy.length > 0 &&
                        categoryHierarchy.filter(hierarchy => hierarchy.category_id.toLowerCase() === "msh25");
                    if (beautyCategory && beautyCategory.length > 0) {
                        return <PdpBeautyDesktop {...this.props} />;
                    } else {
                        return <PdpDesktop {...this.props} />;
                    }
                }
            } else {
                return (
                    <div>
                        <MobileOnly>
                            <PiqPageForPdp
                                loadingForCliqAndPiq={this.props.loadingForCliqAndPiq}
                                productDetails={this.props.productDetails}
                                stores={this.props.stores}
                                displayToast={this.props.displayToast}
                                getAllStoresForCliqAndPiq={this.props.getAllStoresForCliqAndPiq}
                                removeCliqAndPiq={() => this.removeCliqAndPiq()}
                                hidePdpPiqPage={this.props.hidePdpPiqPage}
                            />
                        </MobileOnly>
                    </div>
                );
            }
        } else {
            return this.renderLoader();
        }
    }
}
