/* eslint-disable react/display-name */
import React, { Component } from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import WidgetContainer from "../containers/WidgetContainer";
import HomeSkeleton from "../../general/components/HomeSkeleton.js";
import HeroBanner from "./HeroBanner.js";
import AllQuickLinks from "./AllQuickLinks";
import PersonalisedQuickLinks from "./PersonalisedQuickLinks";
import BankOfferPersonalisedComponent from "./BankOfferPersonalisedComponent";
import ConnectWidgetPersonalisedComponent from "./ConnectWidgetPersonalisedComponent";
import MultipleBannersPersonalisedComponent from "./MultipleBannersPersonalisedComponent";
import CuratedFeatureForPersonalisedComponent from "./CuratedFeatureForPersonalisedComponent";
import HeroBannerPersonalisedComponent from "./HeroBannerPersonalisedComponent";
import styles from "./Feed.css";
import * as Cookie from "../../lib/Cookie";
import List from "@researchgate/react-intersection-list";
import MobileOnly from "../../general/components/MobileOnly";
import HeroBannerComponentMonetization from "./HeroBannerComponentMonetization.js";
import HomeAutoWishlistComponent from "./HomeAutoWishlistComponent";
import {
    LOGGED_IN_USER_DETAILS,
    CUSTOMER_ACCESS_TOKEN,
    HOME_FEED_TYPE,
    SECONDARY_FEED_TYPE,
} from "../../lib/constants";
import { addCanonicalUrl } from "../../lib/seoUtils";
import Loadable from "react-loadable";
import delay from "lodash.delay";
import {
    setDataLayer,
    ADOBE_VIRTUAL_PAGELOAD,
    ADOBE_HOME_TYPE,
    setDataLayerForLogin,
    ADOBE_DIRECT_CALL_FOR_ANONYMOUS_USER,
} from "../../lib/adobeUtils";
import Chatbot from "../../plp/components/Chatbot";
import AutomatedWidgetsForHome from "./AutomatedWidgetsForHome";
export const PRODUCT_RECOMMENDATION_TYPE = "productRecommendationWidget";
const DEFAULT_TITLE = "Online Shopping Site in India - Upto 60% Off On Mobiles, Electronics & Fashion at Tata CLiQ";
const typeKeyMapping = {
    "Hero Banner Component": "heroBannerComponent",
};
const ProductCapsulesContainer = Loadable({
    loader: () => import("../containers/ProductCapsulesContainer"),
    loading() {
        return <div />;
    },
});
const FollowBase = Loadable({
    loader: () => import("./FollowBase.js"),
    loading() {
        return <div />;
    },
});
const MultipleBanners = Loadable({
    loader: () => import("./MultipleBanners"),
    loading() {
        return <div />;
    },
});
const ConnectWidget = Loadable({
    loader: () => import("./ConnectWidget"),
    loading() {
        return <div />;
    },
});
const DiscoverMore = Loadable({
    loader: () => import("./DiscoverMore"),
    loading() {
        return <div />;
    },
});
const CuratedProductsComponent = Loadable({
    loader: () => import("./CuratedProductsComponent"),
    loading() {
        return <div />;
    },
});
const MonoBanner = Loadable({
    loader: () => import("./MonoBanner"),
    loading() {
        return <div />;
    },
});
const ThemeProductWidget = Loadable({
    loader: () => import("./ThemeProductWidget"),
    loading() {
        return <div />;
    },
});
const FollowingBrands = Loadable({
    loader: () => import("./FollowingBrands"),
    loading() {
        return <div />;
    },
});
const ContentWidgetWrapper = Loadable({
    loader: () => import("./ContentWidgetWrapper"),
    loading() {
        return <div />;
    },
});

const FlashSale = Loadable({
    loader: () => import("./FlashSale"),
    loading() {
        return <div />;
    },
});
const OfferWidget = Loadable({
    loader: () => import("./OfferWidget"),
    loading() {
        return <div />;
    },
});
const ThemeOffer = Loadable({
    loader: () => import("./ThemeOffer"),
    loading() {
        return <div />;
    },
});
const BankOfferBanner = Loadable({
    loader: () => import("./BankOfferBanner"),
    loading() {
        return <div />;
    },
});
const CMSParagraphComponent = Loadable({
    loader: () => import("../../staticpage/components/CMSParagraphComponent"),
    loading() {
        return <div />;
    },
});
const SimpleBannerComponent = Loadable({
    loader: () => import("../../staticpage/components/SimpleBannerComponent.js"),
    loading() {
        return <div />;
    },
});

const CMSTextComponent = Loadable({
    loader: () => import("../../staticpage/components/CMSTextComponent.js"),
    loading() {
        return <div />;
    },
});

const AccountNavigationComponent = Loadable({
    loader: () => import("../../staticpage/components/AccountNavigationComponent.js"),
    loading() {
        return <div />;
    },
});

const TopCategories = Loadable({
    loader: () => import("../../blp/components/TopCategories"),
    loading() {
        return <div />;
    },
});

const SubBrandsBanner = Loadable({
    loader: () => import("../../blp/components/SubBrandsBanner"),
    loading() {
        return <div />;
    },
});

const BrandCardHeader = Loadable({
    loader: () => import("../../blp/components/BrandCardHeader"),
    loading() {
        return <div />;
    },
});

const AllBrandTypes = Loadable({
    loader: () => import("../../blp/components/AllBrandTypes"),
    loading() {
        return <div />;
    },
});

const CuratedFeature = Loadable({
    loader: () => import("../../blp/components/CuratedFeature"),
    loading() {
        return <div />;
    },
});

const LatestCollections = Loadable({
    loader: () => import("../../blp/components/LatestCollections"),
    loading() {
        return <div />;
    },
});
const ShopeByPriceDesktopComponent = Loadable({
    loader: () => import("../../home/components/ShopeByPriceDesktop"),
    loading() {
        return <div />;
    },
});
const PopularBrandsDesktopComponent = Loadable({
    loader: () => import("../../general/components/PopularBrandsDesktop"),
    loading() {
        return <div />;
    },
});
const SplitBannerForDesktopComponent = Loadable({
    loader: () => import("../../home/components/SplitBannerForDesktop"),
    loading() {
        return <div />;
    },
});
const TopSellingBrandSliderComponent = Loadable({
    loader: () => import("../../home/components/TopSellingBrandSlider"),
    loading() {
        return <div />;
    },
});
const MultiClickBannerComponent = Loadable({
    loader: () => import("../../home/components/MultiClickBanner"),
    loading() {
        return <div />;
    },
});
const BannerSeparator = Loadable({
    loader: () => import("../../general/components/BannerSeparator.js"),
    loading() {
        return <div />;
    },
});
/* const AutomatedBrandProductCarousel = Loadable({
  loader: () => import("./AutomatedBrandProductCarousel.js"),
  loading() {
    return <div />;
  }
}); */
// const PreAutomatedBrandProductCarousel = Loadable({
//   loader: () => import("./PreAutomatedBrandProductCarousel.js"),
//   loading() {
//     return <div />;
//   }
// });
const BannerProductCarousel = Loadable({
    loader: () => import("./BannerProductCarousel.js"),
    loading() {
        return <div />;
    },
});
const VideoProductCarousel = Loadable({
    loader: () => import("./VideoProductCarousel.js"),
    loading() {
        return <div />;
    },
});
const RecommendationWidget = Loadable({
    loader: () => import("./RecommendationWidget.js"),
    loading() {
        return <div />;
    },
});
const DiscoverMoreMsd = Loadable({
    loader: () => import("./DiscoverMoreMsd.js"),
    loading() {
        return <div />;
    },
});
const MsdAutomatedBrandProductCarousel = Loadable({
    loader: () => import("./MsdAutomatedBrandProductCarousel.js"),
    loading() {
        return <div />;
    },
});

// Import Monetization Components
const MultiPurposeBannerMonetization = Loadable({
    loader: () => import("./MultiPurposeBannerMonetization.js"),
    loading() {
        return <div />;
    },
});
const TopSellingBrandsComponentMonetization = Loadable({
    loader: () => import("./TopSellingBrandsComponentMonetization.js"),
    loading() {
        return <div />;
    },
});
const OffersComponentMonetization = Loadable({
    loader: () => import("./OffersComponentMonetization.js"),
    loading() {
        return <div />;
    },
});
const SplitBannerComponentMonetization = Loadable({
    loader: () => import("./SplitBannerComponentMonetization.js"),
    loading() {
        return <div />;
    },
});

const PlpBannerComponent = Loadable({
    loader: () => import("../../staticpage/components/PlpBannerComponent.js"),
    loading() {
        return <div />;
    },
});

const PlpBannerComponentMonetization = Loadable({
    loader: () => import("../../staticpage/components/PlpBannerComponentMonetization.js"),
    loading() {
        return <div />;
    },
});

const SimpleBannerComponentMonetization = Loadable({
    loader: () => import("./SimpleBannerComponentMonetization.js"),
    loading() {
        return <div />;
    },
});

export const typeComponentMapping = {
    "Product Capsules Component": props => <ProductCapsulesContainer {...props} />,
    "Landing Page Header Component": props => {
        return <BrandCardHeader {...props} />;
    },
    quickLinksComponent: props => <AllQuickLinks {...props} />,
    "01QLC-P": props => <PersonalisedQuickLinks {...props} />,
    "01BOC-P": props => <BankOfferPersonalisedComponent {...props} />,
    "01MPB-P": props => <ConnectWidgetPersonalisedComponent {...props} />,
    "01MBC-P": props => <MultipleBannersPersonalisedComponent {...props} />,
    "01TBT-P": props => <CuratedFeatureForPersonalisedComponent {...props} />,
    "01HBC-P": props => <HeroBannerPersonalisedComponent {...props} />,
    // "01LEC-P":props => <LuxEditorial
    "Hero Banner Component": props => <HeroBanner {...props} />, // no hard coded data
    "Theme Offers Component": props => <ThemeOffer {...props} />, // no hard coded data
    "Desktop Theme Offer Component": props => <ThemeOffer {...props} />,
    themeOffersComponent: props => <ThemeOffer {...props} />,
    "Auto Product Recommendation Component": props => <RecommendationWidget {...props} />,
    "Content Component": props => <ContentWidgetWrapper {...props} />,
    "Banner Product Carousel Component": props => <BannerProductCarousel {...props} />,
    "Video Product Carousel Component": props => <VideoProductCarousel {...props} />,
    // "Automated Banner Product Carousel Component": props => (
    //   <PreAutomatedBrandProductCarousel {...props} />
    // ),
    "Auto Following Brands Component": props => <FollowingBrands {...props} />,
    multipleBannerComponent: props => <MultipleBanners {...props} />,
    "Flash Sales Component": props => <FlashSale {...props} />, // wired up
    "Offers Component": props => <OfferWidget {...props} />, // wired up
    "Multipurpose Banner Component": props => <ConnectWidget {...props} />, // modal not working - need to figure out what to show here.
    "Desktop Multi Click Component": props => <ThemeProductWidget {...props} />,
    "Auto Fresh From Brands Component": props => <FollowBase {...props} />, // wired up with clickable url
    "Banner Separator Component": props => <BannerSeparator {...props} />,
    "Auto Discover More Component": props => <DiscoverMore {...props} />,
    "Top Categories Component": props => <TopCategories {...props} />,
    "Recently viewed product": props => <RecommendationWidget {...props} />,
    "Single Banner Component": props => <MonoBanner {...props} />,
    "Curated Listing Strip Component": props => <LatestCollections {...props} />,
    "Two by Two Banner Component": props => <CuratedFeature {...props} />,
    "Curated Products Component": props => <CuratedProductsComponent {...props} />,
    bankOfferComponent: props => <BankOfferBanner {...props} />,
    "Sub Brands Banner Component": props => <SubBrandsBanner {...props} />,
    "Desktop Sub Brands Component": props => <SubBrandsBanner {...props} />,
    "Landing Page Hierarchy": props => <AllBrandTypes {...props} />,
    "Landing Page Hierarchy Component": props => <AllBrandTypes {...props} />,
    "CMS Paragraph Component": props => <CMSParagraphComponent {...props} />,
    "Banner And Links Component": props => <ShopeByPriceDesktopComponent {...props} />,
    "Desktop Popular Brands Component": props => <PopularBrandsDesktopComponent {...props} />,
    "Split Banner Component": props => <SplitBannerForDesktopComponent {...props} />,
    "Desktop Top Selling Brands Component": props => <TopSellingBrandSliderComponent {...props} />,
    "Multi Click Banner Component": props => <MultiClickBannerComponent {...props} />,
    AutoWidget: props => <AutomatedWidgetsForHome {...props} />,
    msdAutomatedBannerProductCarouselComponent: props => <MsdAutomatedBrandProductCarousel {...props} />,
    AutoWishlist: props => <HomeAutoWishlistComponent {...props} />,
    msdAutoDiscoverMoreComponent: props => <DiscoverMoreMsd {...props} />,

    "Simple Banner Component": props => {
        return (
            <div className={styles.simpleBannerHolder}>
                <SimpleBannerComponent {...props} />
            </div>
        );
    },
    "CMS Text Component": props => {
        let parsedContent;

        try {
            parsedContent = JSON.parse(props.feedComponentData.content);
        } catch (e) {
            if (props.displayToast) {
                props.displayToast("JSON Parse error, check static page content");
            }
        }
        return (
            parsedContent &&
            parsedContent.map((content, index) => {
                return <CMSTextComponent data={content} key={index} />;
            })
        );
    },
    "Account Navigation Component": props => <AccountNavigationComponent {...props} />,
    HeroBannerComponentMonetization: props => <HeroBannerComponentMonetization {...props} />,
    SimpleBannerComponentMonetization: props => <SimpleBannerComponentMonetization {...props} />,
    MultiPurposeBanner_Monetization: props => <MultiPurposeBannerMonetization {...props} />,
    DesktopTopSellingBrandsComponent_Monetization: props => <TopSellingBrandsComponentMonetization {...props} />,
    OffersComponent_Monetization: props => <OffersComponentMonetization {...props} />,
    SplitBannerComponent_Monetization: props => <SplitBannerComponentMonetization {...props} />,
    plpBannerComponent: props => <PlpBannerComponent {...props} />,
    plpShortBannerComponent: props => <PlpBannerComponent {...props} />,
    plpBannerComponent_Monetization: props => <PlpBannerComponentMonetization {...props} />,
    plpShortBannerComponent_Monetization: props => <PlpBannerComponentMonetization {...props} />,
};

class Feed extends Component {
    constructor(props) {
        super(props);
        this.pageSize = this.props.pageSize;
        this.state = {
            wishListedItem: null,
        };
    }

    componentDidMount() {
        const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
        if (this.props.mnlLoginPath) {
            if (!userDetails) {
                this.props.openMobileNumberLoginModal();
            } else {
                this.props.history.push("/");
            }
        }
        setDataLayer(ADOBE_VIRTUAL_PAGELOAD);
        if (!userDetails) {
            setDataLayerForLogin(ADOBE_DIRECT_CALL_FOR_ANONYMOUS_USER);
        }
        this.props.seo
            ? this.props.seo.title
                ? (document.title = this.props.seo.title)
                : (document.title = DEFAULT_TITLE)
            : (document.title = DEFAULT_TITLE);
        const titleObj =
            this.props.homeFeedData &&
            this.props.homeFeedData.find(data => {
                return data.type === "Landing Page Title Component";
            });
        if (this.props.feedType === HOME_FEED_TYPE) {
            if (titleObj) {
                this.props.setHeaderText(titleObj.title);
            } else {
                this.props.setHeaderText(this.props.headerMessage);
            }
        } else {
            if (!this.props.headerMessage) {
                if (titleObj && this.props.setHeaderText) {
                    this.props.setHeaderText(titleObj.title);
                }
            }
        }
        if (this.props.clearProductModuleRef) {
            this.props.clearProductModuleRef();
        }
        // get chatbot json details on clp pages
        if (this.props.feedType === SECONDARY_FEED_TYPE && this.props.getChatbotDetails) {
            this.props.getChatbotDetails();
        }
        // this.initiateHaptikScript();
    }

    // initiateHaptikScript() {
    //     var f = document.getElementsByTagName("SCRIPT")[0];
    //     var p = document.createElement("SCRIPT");
    //     var date = new Date();
    //     var timestamp = date.getTime();
    //     var source_url = process.env.HAPTIK_CHATBOT_URL + "/static/aspectwise/js/haptik.js?" + timestamp;
    //     p.type = "text/javascript";
    //     p.setAttribute("charset", "utf-8");
    //     p.setAttribute("clientid", "tatacliq");
    //     p.async = true;
    //     p.id = "buzzosrc";
    //     p.src = source_url;
    //     if (!document.getElementById("buzzosrc")) {
    //         f.parentNode.insertBefore(p, f);
    //     }
    // }

    async componentDidUpdate() {
        const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
        if (!userDetails) {
            setDataLayerForLogin(ADOBE_DIRECT_CALL_FOR_ANONYMOUS_USER);
        }

        this.props.seo
            ? this.props.seo.title
                ? (document.title = this.props.seo.title)
                : (document.title = DEFAULT_TITLE)
            : (document.title = DEFAULT_TITLE);

        if (this.props.homeFeedData && !this.props.headerMessage) {
            const titleObj =
                this.props.homeFeedData &&
                this.props.homeFeedData.find(data => {
                    return data.type === "Landing Page Title Component";
                });

            if (titleObj && this.props.setHeaderText) {
                this.props.setHeaderText(titleObj.title);
            }
        }

        if (this.props.headerMessage) {
            this.props.setHeaderText(this.props.headerMessage);
        }
    }

    renderFeedComponent = index => {
        const feedDatum = this.props.homeFeedData[index];

        if (feedDatum.type === "Product Capsules Component") {
            return <ProductCapsulesContainer positionInFeed={index} />;
        }

        if (this.pageSize && index > this.pageSize && this.props.isHomePage) {
            this.pageSize = index;
        }

        const setClickedElementId = (id => {
            return () => {
                this.props.setClickedElementId(`Feed-${id}`);
            };
        })(index);

        let ABPCCount = 0;
        if (feedDatum.type === "Automated Banner Product Carousel Component") {
            ABPCCount = feedDatum.num_results;
        }
        let props = {
            positionInFeed: index,
            key: index,
            id: `Feed-${index}`,
            type: typeKeyMapping[feedDatum.type],
            postData: feedDatum.postParams,
            feedType: this.props.feedType,
            msdABPCBrandCount: ABPCCount,
        };

        if (this.props.setClickedElementId) {
            props = {
                ...props,
                setClickedElementId,
            };
        }
        return (
            typeComponentMapping[feedDatum.type] && (
                <WidgetContainer
                    {...props}
                    wishListedItem={this.props.wishlistProductId}
                    wishlistCount={this.props.wishlistCount}
                >
                    {typeComponentMapping[feedDatum.type] && typeComponentMapping[feedDatum.type]}
                </WidgetContainer>
            )
        );
    };

    renderFeedComponents() {
        return (
            this.props.homeFeedData &&
            this.props.homeFeedData.map((feedDatum, i) => {
                return this.renderFeedComponent(feedDatum, i);
            })
        );
    }

    componentWillMount() {
        const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
        const customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
        if (!userDetails) {
            setDataLayerForLogin(ADOBE_DIRECT_CALL_FOR_ANONYMOUS_USER);
        }
        if (this.props.feedType === HOME_FEED_TYPE && this.props.homeFeedData.length === 0) {
            this.props.homeFeed();
        } else {
            if (this.props.feedType === HOME_FEED_TYPE) {
                setDataLayer(ADOBE_HOME_TYPE);
            }
        }
        if (userDetails && customerCookie && this.props.getWishlist) {
            // this.props.getWishListItems();
            this.props.getWishlist();
        }
        if (this.props.clickedElementId) {
            delay(() => {
                const clickedElement = document.getElementById(this.props.clickedElementId);
                if (clickedElement) {
                    delay(() => clickedElement.scrollIntoView(true), 10);
                }
            });
        }
    }

    renderFeed = (items, ref) => {
        return (
            <div
                className={styles.base}
                ref={ref}
                style={{
                    background: this.props.background ? this.props.background : "#ececec",
                    marginTop: this.props.marginTop,
                }}
            >
                <div className={styles.center}>{items}</div>
            </div>
        );
    };

    renderMetaTags = () => {
        return addCanonicalUrl(window.location.href);
    };

    renderAmpTags = () => {
        return (
            <Helmet>
                <link rel="amphtml" href={`/amp/home`} />
            </Helmet>
        );
    };

    componentWillUnmount() {
        if (this.props.setPageFeedSize && this.props.isHomePage) {
            this.props.setPageFeedSize(this.pageSize);
        }
    }

    render() {
        if (this.props.loading) {
            return <HomeSkeleton />;
        }
        //let propsForHeader = {};
        if (this.props.isHomeFeedPage) {
            /* propsForHeader = {
        hasBackButton: false,
        text: this.props.headerMessage
      }; */
        } else {
            let landingPageTitleObj = this.props.homeFeedData[0] ? this.props.homeFeedData[0] : {};
            if (landingPageTitleObj.type === "Landing Page Title Component") {
                /* propsForHeader = {
          hasBackButton: true,
          text: landingPageTitleObj.title
        }; */
            }
        }
        return (
            <React.Fragment>
                {/* {this.props.feedType !== "secondaryFeed" && this.renderMetaTags()} */}
                {this.renderMetaTags()}
                {this.props.isHomePage ? this.renderAmpTags() : null}
                {this.props.homeFeedData ? (
                    <List
                        pageSize={this.props.pageSize ? this.props.pageSize : 1}
                        currentLength={this.props.homeFeedData.length}
                        itemsRenderer={this.renderFeed}
                    >
                        {this.renderFeedComponent}
                    </List>
                ) : null}
                {this.props.clpUrl && this.props.chatbotDetailsData && (
                    <Chatbot clpUrl={this.props.clpUrl} chatbotDetailsData={this.props.chatbotDetailsData} />
                )}
                <MobileOnly>
                    <div
                        style={{
                            width: "100%",
                            height: 100,
                        }}
                    />
                </MobileOnly>
            </React.Fragment>
        );
    }
}

Feed.propTypes = {
    onSubmit: PropTypes.func,
    onForgotPassword: PropTypes.func,
    onChangeEmail: PropTypes.func,
    onChangePassword: PropTypes.func,
    emailValue: PropTypes.string,
    passwordValue: PropTypes.string,
    loading: PropTypes.bool,
    marginTop: PropTypes.string,
    feedType: PropTypes.oneOf([HOME_FEED_TYPE, SECONDARY_FEED_TYPE]),
    clpUrl: PropTypes.string,
    getChatbotDetails: PropTypes.func,
    chatbotDetailsData: PropTypes.objectOf(
        PropTypes.shape({
            chatEnabled: PropTypes.bool,
            list: PropTypes.arrayOf(
                PropTypes.shape({
                    pageType: PropTypes.string,
                    showWidget: PropTypes.bool,
                    categoryCode: PropTypes.string,
                    categoryName: PropTypes.string,
                    enableAfterSeconds: PropTypes.number,
                    categoryLandingPage: PropTypes.string,
                })
            ),
        })
    ),
    pageSize: PropTypes.number,
    seo: PropTypes.object,
    homeFeedData: PropTypes.array,
    setHeaderText: PropTypes.func,
    headerMessage: PropTypes.string,
    clearProductModuleRef: PropTypes.func,
    isHomeFeedPage: PropTypes.bool,
    isHomePage: PropTypes.bool,
    setClickedElementId: PropTypes.func,
    homeFeed: PropTypes.func,
    getWishlist: PropTypes.func,
    clickedElementId: PropTypes.bool,
    background: PropTypes.string,
    wishlistProductId: PropTypes.string,
    setPageFeedSize: PropTypes.func,
    wishlistCount: PropTypes.string,
    openMobileNumberLoginModal: PropTypes.func,
    mnlLoginPath: PropTypes.bool,
    history: PropTypes.object,
};

Feed.defaultProps = {
    loading: false,
    marginTop: "-30px",
};

export default Feed;
