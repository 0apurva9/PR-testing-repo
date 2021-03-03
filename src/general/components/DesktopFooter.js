import React from "react";
import styles from "./DesktopFooter.css";
import { withRouter } from "react-router-dom";
import Button from "../../general/components/Button.js";
import Input2 from "../../general/components/Input2.js";
import Icon from "../../xelpmoc-core/Icon";
import { TATA_CLIQ_ROOT } from "../../lib/apiRequest.js";
import {
    LOGGED_IN_USER_DETAILS,
    MY_ACCOUNT_PAGE,
    SAVE_LIST_PAGE,
    MY_ACCOUNT_ORDERS_PAGE,
    TITLE_DEFAULT,
} from "../../../src/lib/constants";
import TrustComponent from "../../general/components/TrustComponent";
import {
    setDataLayerForHeaderAndFooterDirectCalls,
    ADOBE_DIRECT_CALL_FOR_FOOTER_CLICK,
    ADOBE_DIRECT_CALL_FOR_SOCIALMEDIA_CLICK,
} from "../../lib/adobeUtils";
import * as Cookie from "../../lib/Cookie";
import DesktopFooterProductList from "./DesktopFooterProductList";
const TEXT = " Tata CLiQ | All rights reserved";

console.log("desktop style", styles);
class DesktopFooter extends React.Component {
    componentDidMount() {
        const currentUrl = this.props.location.pathname;
        if (this.props.getDesktopFooter) {
            this.props.getDesktopFooter(currentUrl);
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (this.props.location && nextProps.location) {
            if (this.props.location.pathname !== nextProps.location.pathname) {
                this.props.getDesktopFooter(nextProps.location.pathname);
            }
        }
    }
    // footerClick() {
    //   setDataLayerForHeaderAndFooterDirectCalls(
    //     ADOBE_DIRECT_CALL_FOR_FOOTER_CLICK
    //   );
    // }

    onClick = (url, value) => {
        let userCookie = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
        setDataLayerForHeaderAndFooterDirectCalls(ADOBE_DIRECT_CALL_FOR_FOOTER_CLICK, value);
        const hostName = window.location.hostname.replace(/^www\./, "");
        if (url.includes("sitemap.xml") || !url.includes(hostName)) {
            window.open(url, "_blank");
            window.focus();
        } else {
            const urlSuffix = url.replace(TATA_CLIQ_ROOT, "$1");
            if (userCookie && value === "My Account") {
                userCookie = JSON.parse(userCookie);
                this.props.history.push(MY_ACCOUNT_PAGE);
            } else if (!userCookie && value === "My Account") {
                this.props.setUrlToRedirectToAfterAuth(MY_ACCOUNT_PAGE);
                this.props.history.push(urlSuffix);
            } else if (userCookie && value === "My Wishlist") {
                userCookie = JSON.parse(userCookie);
                this.props.history.push(`${MY_ACCOUNT_PAGE}${SAVE_LIST_PAGE}`);
            } else if (!userCookie && value === "My Wishlist") {
                this.props.setUrlToRedirectToAfterAuth(`${MY_ACCOUNT_PAGE}${SAVE_LIST_PAGE}`);
                this.props.history.push(urlSuffix);
            } else if (userCookie && value === "My Orders") {
                userCookie = JSON.parse(userCookie);
                this.props.history.push(`${MY_ACCOUNT_PAGE}${MY_ACCOUNT_ORDERS_PAGE}`);
            } else if (!userCookie && value === "My Orders") {
                this.props.setUrlToRedirectToAfterAuth(`${MY_ACCOUNT_PAGE}${MY_ACCOUNT_ORDERS_PAGE}`);
                this.props.history.push(urlSuffix);
            } else {
                this.props.history.push(urlSuffix);
            }
        }
    };

    onClickSocialMedia = webUrl => {
        let currentSocialMedia;
        if (webUrl.indexOf("facebook") !== -1) {
            currentSocialMedia = "facebook";
        }
        if (webUrl.indexOf("plus") !== -1) {
            currentSocialMedia = "googlePlus";
        }
        if (webUrl.indexOf("twitter") !== -1) {
            currentSocialMedia = "twitter";
        }
        if (webUrl.indexOf("youtube") !== -1) {
            currentSocialMedia = "youtube";
        }
        if (webUrl.indexOf("instagram") !== -1) {
            currentSocialMedia = "instagram";
        }
        setDataLayerForHeaderAndFooterDirectCalls(ADOBE_DIRECT_CALL_FOR_SOCIALMEDIA_CLICK, currentSocialMedia);
    };

    render() {
        const url = this.props.location.pathname;
        const footerData = this.props && this.props.DesktopFooterDetails;
        const isNotPdp = /p-mp[0-9]+/.test(this.props.location.pathname) ? false : true;
        const isPlp =
            /c-msh[0-9]+/.test(this.props.location.pathname) ||
            /c-mbh[0-9]+/.test(this.props.location.pathname) ||
            /search/.test(this.props.location.pathname);

        const isProductListingNull =
            this.props && this.props.productListings && this.props.productListings.searchresult ? false : true;
        return (
            <div className={styles.contentHolder}>
                {(!url.includes("how-upi-work") || !url.includes("how-dcemi-works")) && <TrustComponent />}
                {(!url.includes("how-upi-work") || !url.includes("how-dcemi-works")) && (
                    <div className={styles.linkAndSuscribeHolder}>
                        <div className={styles.linkHolder}>
                            {footerData &&
                                footerData.items &&
                                footerData.items[0] &&
                                footerData.items[0].pageLinks &&
                                footerData.items[0].pageLinks.map((val, i) => {
                                    return (
                                        <div className={styles.linkSection} key={i}>
                                            <div className={styles.linkHeader}>{val && val.heading}</div>
                                            {val &&
                                                val.list &&
                                                val.list.map((data, i) => {
                                                    return (
                                                        <div
                                                            className={styles.link}
                                                            onClick={() => this.onClick(data.webUrl, data.text)}
                                                            key={i}
                                                        >
                                                            {data.text}
                                                        </div>
                                                    );
                                                })}
                                        </div>
                                    );
                                })}
                        </div>
                        <div className={styles.newsLetterSection}>
                            {footerData &&
                                footerData.items &&
                                footerData.items[0] &&
                                footerData.items[0].newsLetter &&
                                footerData.items[0].newsLetter.heading && (
                                    <div className={styles.newsLetterHeading}>
                                        {footerData.items[0].newsLetter.heading}
                                    </div>
                                )}

                            <div className={styles.buttonAndTextBoxHolder}>
                                {footerData &&
                                    footerData.items &&
                                    footerData.items[0] &&
                                    footerData.items[0].newsLetter &&
                                    footerData.items[0].newsLetter.placeholderText && (
                                        <div className={styles.textBoxHolder}>
                                            <Input2
                                                boxy={true}
                                                placeholder={footerData.items[0].newsLetter.placeholderText}
                                                textStyle={{ fontSize: 14 }}
                                                height={33}
                                                type="text"
                                            />
                                        </div>
                                    )}
                                <div className={styles.buttonHolder}>
                                    {footerData &&
                                        footerData.items &&
                                        footerData.items[0] &&
                                        footerData.items[0].newsLetter &&
                                        footerData.items[0].newsLetter.btnText && (
                                            <div className={styles.button}>
                                                <Button
                                                    type="hollow"
                                                    label={footerData.items[0].newsLetter.btnText}
                                                    height={36}
                                                    width={180}
                                                    textStyle={{ color: "#212121", fontSize: 14 }}
                                                    onClick={() => this.onSuscribe()}
                                                />
                                            </div>
                                        )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                <div className={styles.footerBottomHolder}>
                    <div className={styles.socialLinkAndLogoHolder}>
                        {/* <div className={styles.companyLogo}>
              <Icon image={companyLogo} size={80} />
            </div> */}
                        {!url.includes("how-upi-work") && (
                            <div className={styles.downLoadAppHolder}>
                                {footerData &&
                                    footerData.items &&
                                    footerData.items[0] &&
                                    footerData.items[0].socialLinks &&
                                    footerData.items[0].socialLinks[1] &&
                                    footerData.items[0].socialLinks[1].heading && (
                                        <div className={styles.downLoaAppText}>
                                            {footerData.items[0].socialLinks[1].heading}
                                        </div>
                                    )}
                                {footerData &&
                                    footerData.items &&
                                    footerData.items[0] &&
                                    footerData.items[0].socialLinks &&
                                    footerData.items[0].socialLinks[1] &&
                                    footerData.items[0].socialLinks[1].list &&
                                    footerData.items[0].socialLinks[1].list.map((val, i) => {
                                        return (
                                            <a href={val.webUrl} target="_blank" key={i} rel="noreferrer">
                                                <div className={styles.appIconHolder}>
                                                    <Icon image={val.imageURL} size={20} />
                                                </div>
                                            </a>
                                        );
                                    })}
                            </div>
                        )}
                        {!url.includes("how-upi-work") && (
                            <div className={styles.socialIconHolder}>
                                {footerData &&
                                    footerData.items &&
                                    footerData.items[0] &&
                                    footerData.items[0].socialLinks &&
                                    footerData.items[0].socialLinks[0] &&
                                    footerData.items[0].socialLinks[0].list &&
                                    footerData.items[0].socialLinks[0].list.map((val, i) => {
                                        return (
                                            <a href={val.webUrl} target="_blank" key={i} rel="noreferrer">
                                                <div
                                                    className={styles.socialIcon}
                                                    onClick={() => this.onClickSocialMedia(val.webUrl)}
                                                >
                                                    <Icon image={val.imageURL} size={20} />
                                                </div>
                                            </a>
                                        );
                                    })}
                            </div>
                        )}
                        {!url.includes("how-upi-work") && (
                            <div className={styles.copyRightText}>&copy; {`${new Date().getFullYear()} ${TEXT}`}</div>
                        )}
                    </div>
                </div>

                {isPlp && (
                    <div className={styles.footerDataWrapper}>
                        <div className={isProductListingNull ? styles.footerDataPlpNull : styles.footerDataPlp}>
                            <div
                                className={styles.pageSpecificFooterData}
                                dangerouslySetInnerHTML={{
                                    __html:
                                        footerData && footerData.items && footerData.items[0].pageSpecificFooterData,
                                }}
                            />
                            <div
                                className={styles.popularSearches}
                                dangerouslySetInnerHTML={{
                                    __html: footerData && footerData.items && footerData.items[0].popularSearches,
                                }}
                            />
                        </div>

                        <div
                            className={
                                isProductListingNull
                                    ? styles.desktopFooterProductListWrapperNull
                                    : styles.desktopFooterProductListWrapper
                            }
                        >
                            <DesktopFooterProductList
                                productListings={this.props && this.props.productListings}
                                history={this.props.history}
                                location={this.props.location}
                            />
                        </div>
                    </div>
                )}

                {isNotPdp && !isPlp && !url.includes("how-upi-work") && (
                    <div>
                        {this.props.footer && this.props.footer.title ? (
                            <h1 className={styles.seoPagetitle}>{this.props.footer.title}</h1>
                        ) : (
                            <h1 className={styles.seoPagetitle}>{TITLE_DEFAULT}</h1>
                        )}

                        <div
                            className={styles.footerData}
                            dangerouslySetInnerHTML={{
                                __html: footerData && footerData.items && footerData.items[0].pageSpecificFooterData,
                            }}
                        />
                    </div>
                )}
                {isNotPdp && !isPlp && (
                    <div
                        className={styles.footerData}
                        dangerouslySetInnerHTML={{
                            __html: footerData && footerData.items && footerData.items[0].popularSearches,
                        }}
                    />
                )}
            </div>
        );
    }
}

export default withRouter(DesktopFooter);
