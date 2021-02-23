import React, { Component } from "react";
import ReviewList from "./ReviewList";
import styles from "./ProductReviewPage.css";
import ProductDetailsCard from "./ProductDetailsCard";
import Pagination from "./Pagination";
import ProductDetailsForReview from "./ProductDetailsForReview";
import WriteReview from "./WriteReview";
import PropTypes from "prop-types";
import RatingHolder from "./RatingHolder";
import PdpFrame from "./PdpFrame";
import throttle from "lodash.throttle";
import DesktopOnly from "../../general/components/DesktopOnly";
import MobileOnly from "../../general/components/MobileOnly";
import SelectBoxMobile2 from "../../general/components/SelectBoxMobile2.js";
import {
    PRODUCT_REVIEWS_PATH_SUFFIX,
    SUCCESS,
    LOGIN_PATH,
    WRITE_REVIEWS_WITH_SLUG,
    PRODUCT_CART_ROUTER,
    BUY_NOW_PRODUCT_DETAIL,
    BUY_NOW_ERROR_MESSAGE,
    WRITE_REVIEWS,
} from "../../lib/constants";
import { renderMetaTags, renderMetaTagsWithoutSeoObject } from "../../lib/seoUtils";
import * as Cookie from "../../lib/Cookie";
import * as UserAgent from "../../lib/UserAgent.js";
import { CUSTOMER_ACCESS_TOKEN, LOGGED_IN_USER_DETAILS, IS_COMING_FOR_REVIEW_PAGE } from "../../lib/constants";
import {
    setDataLayerForPdpDirectCalls,
    updatePdpDetailsBackFromReviewPage,
    SET_DATA_LAYER_FOR_WRITE_REVIEW_EVENT,
} from "../../lib/adobeUtils";
import commentArray from "../../mock/lang_profanity.json";
import { checkUserLoggedIn } from "../../lib/userUtils";
import RatingReviewHeaderComponent from "./PdpBeautyDesktop/DescriptionSection/RatingReviewHeaderComponent";
import AccordionForReviewFilter from "../../general/components/AccordionForReviewFilter";
import CheckboxMultiSelect from "../../general/components/CheckboxMultiSelect";
const WRITE_REVIEW_TEXT = "Write Review";
const PRODUCT_QUANTITY = "1";
export default class ProductReviewPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            sort: "byDate",
            orderBy: "desc",
            sortValue: "byDate_desc",
            sortLabel: "Newest First",
            reviewList: this.props && this.props.reviews && this.props.reviews.reviews && this.props.reviews.reviews,
            currentPage: 1,
            reviewListPerPage: 10,
            filterShow: true,
            isFilterSelected: false,
            checkedItems: new Map(),
        };
        this.filterOptions = [
            { label: "Oldest First", value: "byDate_asc" },
            { label: "Newest First", value: "byDate_desc" },
            { label: "Negative First", value: "byRating_asc" },
            { label: "Positive First", value: "byRating_desc" },
        ];
    }

    pageNumbers = () => {
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(this.props.reviews.totalNoOfReviews / this.state.reviewListPerPage); i++) {
            pageNumbers.push(i);
        }
        return pageNumbers;
    };

    smoothScroll() {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    handleClick = event => {
        this.setState({ currentPage: event });
        this.smoothScroll();
    };

    prevClick = (event, callback) => {
        const { reviewListPerPage } = this.state;
        if (event && this.state.currentPage > 1) {
            this.setState({
                currentPage: this.state.currentPage - 1,
            });
            callback(this.state.currentPage - 1);
        }
        if (!event && this.state.currentPage < Math.ceil(this.props.reviews.totalNoOfReviews / reviewListPerPage)) {
            this.setState({
                currentPage: this.state.currentPage + 1,
            });
            callback(this.state.currentPage + 1);
        }
        this.smoothScroll();
    };

    handleScroll = () => {
        return throttle(() => {
            if (this.props.reviews && this.props.reviews.pageNumber + 1 < this.props.reviews.totalNoOfPages) {
                const windowHeight =
                    "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
                const body = document.body;
                const html = document.documentElement;
                const docHeight = Math.max(
                    body.scrollHeight,
                    body.offsetHeight,
                    html.clientHeight,
                    html.scrollHeight,
                    html.offsetHeight
                );
                const windowBottom = windowHeight + window.pageYOffset;
                if (windowBottom >= docHeight) {
                    window.scrollBy(0, -200);
                    this.props.getProductReviews(
                        this.props.match.params[0],
                        this.props.reviews.pageNumber + 1,
                        this.state.orderBy,
                        this.state.sort
                    );
                }
            }
        }, 2000);
    };

    navigateToLogin() {
        const url = this.props.location.pathname;
        this.props.setUrlToRedirectToAfterAuth(url);
        this.props.history.push(LOGIN_PATH);
    }

    componentDidMount() {
        const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
        const customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
        this.throttledScroll = this.handleScroll();
        window.addEventListener("scroll", this.throttledScroll);
        this.props.getProductDescription(this.props.match.params[0], IS_COMING_FOR_REVIEW_PAGE);
        this.props.getProductReviews(this.props.match.params[0], 0, this.state.orderBy, this.state.sort);
        if (this.props.match.path === WRITE_REVIEWS_WITH_SLUG || this.props.match.path === WRITE_REVIEWS) {
            if (!userDetails || !customerCookie) {
                const url = this.props.location.pathname;
                this.props.setUrlToRedirectToAfterAuth(url);
                this.props.hideSecondaryLoader();
                this.props.history.push(LOGIN_PATH);
            } else {
                this.setState({ visible: true });
            }
        }
    }

    componentWillUnmount() {
        updatePdpDetailsBackFromReviewPage();
        window.removeEventListener("scroll", this.throttledScroll);
    }

    reviewSection = () => {
        const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
        const customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
        if (!userDetails || !customerCookie) {
            const url = this.props.location.pathname;
            if (this.props.setUrlToRedirectToAfterAuth) {
                this.props.setUrlToRedirectToAfterAuth(url);
            }

            if (UserAgent.checkUserAgentIsMobile()) {
                this.props.history.push(LOGIN_PATH);
            } else {
                if (this.props.showAuthPopUp) {
                    this.props.showAuthPopUp();
                    return null;
                }
            }
        } else {
            setDataLayerForPdpDirectCalls(SET_DATA_LAYER_FOR_WRITE_REVIEW_EVENT);
            this.setState(prevState => ({ visible: !prevState.visible }));
        }
    };

    onSubmit = productReview => {
        if (!productReview.rating) {
            this.props.displayToast("Please give rating");
            return false;
        }
        if (!productReview.headline && !productReview.comment) {
            this.props.displayToast("Please add a review title and description");
            return false;
        }
        if (productReview.comment && !productReview.headline) {
            this.props.displayToast("Please add a review title");
            return false;
        }
        if (!productReview.comment && productReview.headline) {
            this.props.displayToast("Minimum character length for the comment is 50 characters");
            return false;
        }
        if (productReview.comment) {
            let notCommentPossible = commentArray.words.find(words => {
                let regMatch = false;
                const splCharCheck = /[!@#$%^&*()_+\-=\\[\]{};':"\\|,.<>\\/?]/;

                if (splCharCheck.test(words)) {
                    regMatch = productReview.comment.toLowerCase().includes(words.toLowerCase());
                } else {
                    let regexWord = "\\b" + words.toLowerCase() + "\\b";
                    regMatch = new RegExp(regexWord, "i").test(productReview.comment.toLowerCase());
                }
                if (regMatch) {
                    return true;
                }
            });
            if (notCommentPossible) {
                this.props.displayToast("Review comment contains profane words");
                return false;
            } else if (productReview.comment.length < 50) {
                this.props.displayToast("Please enter minimum 50 characters");
                return false;
            } else {
                if (this.props.match.path !== WRITE_REVIEWS_WITH_SLUG && this.props.match.path !== WRITE_REVIEWS) {
                    this.setState({ visible: false });
                }
                return this.props.addProductReview(this.props.productDetails.productListingId, productReview);
            }
        }
    };

    onCancel() {
        this.setState({ visible: false });
    }

    goToCart = () => {
        this.props.history.push({
            pathname: PRODUCT_CART_ROUTER,
        });
    };

    renderReviewSection = () => {
        if (this.state.visible) {
            return (
                <WriteReview
                    {...this.props}
                    addReviewStatus={this.props.addReviewStatus}
                    onSubmit={val => this.onSubmit(val)}
                    onCancel={() => this.onCancel()}
                    showAuthPopUp={() => this.props.showAuthPopUp()}
                    setUrlToRedirectToAfterAuth={url => this.props.setUrlToRedirectToAfterAuth(url)}
                    showReviewGuidelineModal={() => this.props.showReviewGuidelineModal()}
                />
            );
        }
    };

    addProductToBag = async buyNowFlag => {
        let productDetails = {};
        productDetails.code = this.props.productDetails.productListingId;
        productDetails.quantity = PRODUCT_QUANTITY;
        productDetails.ussId = this.props.productDetails.winningUssID;
        if (buyNowFlag) {
            if (!checkUserLoggedIn()) {
                localStorage.setItem(BUY_NOW_PRODUCT_DETAIL, JSON.stringify(productDetails));
                this.navigateToLogin();
            } else {
                const buyNowResponse = await this.props.buyNow(productDetails);
                if (buyNowResponse && buyNowResponse.status === SUCCESS) {
                    this.props.history.push(PRODUCT_CART_ROUTER);
                } else {
                    this.props.displayToast(BUY_NOW_ERROR_MESSAGE);
                }
            }
        } else {
            return this.props.addProductToCart(productDetails);
        }
    };

    goBack = () => {
        const url = this.props.location.pathname.replace(PRODUCT_REVIEWS_PATH_SUFFIX, "");
        this.props.history.replace(url);
    };

    componentWillReceiveProps(nextProps) {
        if (this.props.match.path !== WRITE_REVIEWS_WITH_SLUG || this.props.match.path !== WRITE_REVIEWS) {
            if (nextProps.addReviewStatus === SUCCESS) {
                this.setState({ visible: false });
            }
        }
    }

    changeFilterValues = val => {
        let filterValues = val.value.split("_");
        this.setState({
            sort: filterValues[0],
            orderBy: filterValues[1],
            sortValue: val.value,
            sortLabel: val.label,
        });

        this.props.getProductReviews(this.props.match.params[0], 0, filterValues[1], filterValues[0]);
    };

    renderMetaTags = () => {
        const productDetails = this.props.productDetails;
        return productDetails.seo
            ? renderMetaTags(productDetails, true)
            : renderMetaTagsWithoutSeoObject(productDetails);
    };

    toggleFilterShow = () => {
        this.setState({ filterShow: !this.state.filterShow });
    };

    toggleFilterClick = e => {
        const itemName = e.target.name;
        const isChecked = e.target.checked;
        this.setState(
            prevState => ({ checkedItems: prevState.checkedItems.set(itemName, isChecked) }),
            () => {
                this.applyFilters(this.state.checkedItems);
            }
        );
    };

    applyFilters = checkedItems => {
        // get product ids and send to api
        let variantOptions = this.props.productDetails.variantOptions;
        let selectedFilter;
        checkedItems.forEach((value, key) => {
            if (value) {
                selectedFilter = variantOptions.filter(variant => {
                    if (variant.colorlink.color === key || variant.sizelink.size === key) {
                        return variant;
                    }
                });
            }
        });

        let productIds = [];
        let filterCheckToAppliedOn = [];

        selectedFilter &&
            selectedFilter.forEach(filterDetails => {
                productIds.push(filterDetails.sizelink.productCode);

                if (!filterCheckToAppliedOn.includes(filterDetails.colorlink.color)) {
                    filterCheckToAppliedOn.push(filterDetails.colorlink.color);
                }

                if (!filterCheckToAppliedOn.includes(filterDetails.sizelink.size)) {
                    filterCheckToAppliedOn.push(filterDetails.sizelink.size);
                }
            });

        let productCodes = this.props.match.params[0];
        if (productIds.length > 0) {
            productCodes = productIds.join(",");
        }
        this.props.getProductReviews(productCodes, 0, this.state.orderBy, this.state.sort);

        // show selected filter
        if (this.state.checkedItems && this.state.checkedItems.size > 0) {
            this.setState({ checkedItems: new Map() });
        }
        const updatedCheckedItems = new Map();
        filterCheckToAppliedOn.forEach(singleFilter => {
            updatedCheckedItems.set(singleFilter, true);
        });
        this.setState({ checkedItems: updatedCheckedItems });
    };

    clearFilters = () => {
        console.log(this.state.checkedItems);
        if (this.state.checkedItems && this.state.checkedItems.size > 0) {
            this.setState({ checkedItems: new Map() });
            this.props.getProductReviews(this.props.match.params[0], 0, this.state.orderBy, this.state.sort);
        }
    };

    render() {
        let variantOptions = this.props.productDetails && this.props.productDetails.variantOptions;

        let colorSet =
            variantOptions &&
            variantOptions
                .map(item => item.colorlink.color)
                .filter((value, index, self) => {
                    if (value && self.indexOf(value) === index) {
                        return value;
                    }
                });

        let colorHexCodeSet =
            variantOptions &&
            variantOptions
                .map(item => item.colorlink.colorHexCode)
                .filter((value, index, self) => {
                    if (value && self.indexOf(value) === index) {
                        return value;
                    }
                });

        let sizeSet =
            variantOptions &&
            variantOptions
                .map(item => item.sizelink.size)
                .filter((value, index, self) => {
                    if (value && self.indexOf(value) === index) {
                        return value;
                    }
                });

        const { currentPage, reviewListPerPage } = this.state;
        const indexOfLastTodo = currentPage * reviewListPerPage;
        const indexOfFirstReview = indexOfLastTodo - reviewListPerPage;
        const currentreviewList =
            this.props &&
            this.props.reviews &&
            this.props.reviews.reviews &&
            this.props.reviews.reviews.slice(indexOfFirstReview, indexOfLastTodo);
        if (this.props.loadingForAddProduct || this.props.loading) {
            this.props.showSecondaryLoader();
        } else {
            this.props.hideSecondaryLoader();
        }

        if (this.props.productDetails) {
            const mobileGalleryImages =
                this.props.productDetails &&
                this.props.productDetails.galleryImagesList &&
                this.props.productDetails.galleryImagesList
                    .map(galleryImageList => {
                        if (galleryImageList && galleryImageList.mediaType && galleryImageList.mediaType === "Image") {
                            return galleryImageList.galleryImages.filter(galleryImages => {
                                return galleryImages.key === "product";
                            });
                        }
                    })
                    .map(image => {
                        if (image) return image[0].value;
                    });
            let seoDoublePrice = 0;
            if (
                this.props.productDetails.winningSellerPrice &&
                this.props.productDetails.winningSellerPrice.doubleValue
            ) {
                seoDoublePrice = this.props.productDetails.winningSellerPrice.doubleValue;
            } else if (this.props.productDetails.mrpPrice && this.props.productDetails.mrpPrice.doubleValue) {
                seoDoublePrice = this.props.productDetails.mrpPrice.doubleValue;
            }

            return (
                <PdpFrame
                    {...this.props.productDetails}
                    addProductToBag={buyNowFlag => this.addProductToBag(buyNowFlag)}
                    gotoPreviousPage={() => this.goBack()}
                    displayToast={message => this.props.displayToast(message)}
                    goToCart={() => this.goToCart()}
                    isWriteReview={UserAgent.checkUserAgentIsMobile() ? false : true}
                >
                    {this.renderMetaTags()}
                    <div className={styles.base} itemScope itemType="http://schema.org/Product">
                        {this.props.productDetails.seo
                            ? renderMetaTags(this.props.productDetails)
                            : renderMetaTagsWithoutSeoObject(this.props.productDetails)}
                        <div className={styles.productBackground}>
                            <MobileOnly>
                                <ProductDetailsCard
                                    productImage={mobileGalleryImages[0]}
                                    brandName={this.props.productDetails.brandName}
                                    productName={this.props.productDetails.productName}
                                    price={
                                        this.props.productDetails &&
                                        this.props.productDetails.winningSellerPrice &&
                                        this.props.productDetails.winningSellerPrice.formattedValueNoDecimal
                                    }
                                    seoDoublePrice={seoDoublePrice}
                                    discountPrice={
                                        this.props.productDetails &&
                                        this.props.productDetails.mrpPrice &&
                                        this.props.productDetails.mrpPrice.formattedValueNoDecimal
                                    }
                                    averageRating={this.props.productDetails.averageRating}
                                    numberOfReviews={this.props.productDetails.numberOfReviews}
                                />
                                <RatingHolder ratingData={this.props.ratingData} />
                            </MobileOnly>
                            <DesktopOnly>
                                <ProductDetailsForReview
                                    productImage={mobileGalleryImages[0]}
                                    brandName={this.props.productDetails.brandName}
                                    productName={this.props.productDetails.productName}
                                    price={
                                        this.props.productDetails &&
                                        this.props.productDetails.winningSellerPrice &&
                                        this.props.productDetails.winningSellerPrice.formattedValueNoDecimal
                                    }
                                    seoDoublePrice={seoDoublePrice}
                                    discountPrice={
                                        this.props.productDetails &&
                                        this.props.productDetails.mrpPrice &&
                                        this.props.productDetails.mrpPrice.formattedValueNoDecimal
                                    }
                                    averageRating={this.props.productDetails.averageRating}
                                    numberOfReviews={this.props.productDetails.numberOfReviews}
                                    discount={this.props.productDetails.discount}
                                />
                                <div className={styles.writeReviewButton}>WRITE A REVIEW</div>
                                <div>
                                    <AccordionForReviewFilter
                                        text1="Filter by"
                                        text2="Clear all"
                                        isOpen={this.state.filterShow}
                                        text1Size={14}
                                        text1FontFamily="semibold"
                                        text2Color={"#4a4a4a"}
                                        text2FontFamily="light"
                                        text2Size={14}
                                        textAlign={"right"}
                                        handleClick={() => this.toggleFilterShow()}
                                        padding="0px 40px 0px 20px"
                                        backgroundColor="#f9f9f9"
                                        clearFilters={() => this.clearFilters()}
                                    >
                                        <div className={styles.filterContainer}>
                                            {colorSet && colorSet.length > 0 && (
                                                <React.Fragment>
                                                    <div className={styles.title}>Colour</div>
                                                    {colorSet.map((color, index) => {
                                                        return (
                                                            <div
                                                                className={styles.colorItem}
                                                                key={JSON.stringify(index)}
                                                            >
                                                                <div className={styles.checkBoxHolder}>
                                                                    <CheckboxMultiSelect
                                                                        name={color}
                                                                        checked={
                                                                            this.state.checkedItems &&
                                                                            this.state.checkedItems.get(color)
                                                                        }
                                                                        onChange={e => this.toggleFilterClick(e)}
                                                                    />
                                                                </div>
                                                                <span
                                                                    className={styles.colorBox}
                                                                    style={{ backgroundColor: colorHexCodeSet[index] }}
                                                                ></span>
                                                                <span className={styles.filterName}>{color}</span>
                                                            </div>
                                                        );
                                                    })}
                                                </React.Fragment>
                                            )}
                                            <div className={styles.sizeContainer}>
                                                {sizeSet && sizeSet.length > 0 && (
                                                    <React.Fragment>
                                                        <div className={styles.title}>Size</div>
                                                        {sizeSet.map((size, index) => {
                                                            return (
                                                                <div
                                                                    className={styles.colorItem}
                                                                    key={JSON.stringify(index)}
                                                                >
                                                                    <div className={styles.checkBoxHolder}>
                                                                        <CheckboxMultiSelect
                                                                            name={size}
                                                                            checked={
                                                                                this.state.checkedItems &&
                                                                                this.state.checkedItems.get(size)
                                                                            }
                                                                            onChange={e => this.toggleFilterClick(e)}
                                                                        />
                                                                    </div>
                                                                    <span className={styles.filterName}>{size}</span>
                                                                </div>
                                                            );
                                                        })}
                                                    </React.Fragment>
                                                )}
                                            </div>
                                        </div>
                                    </AccordionForReviewFilter>
                                </div>
                            </DesktopOnly>
                        </div>
                        <div className={styles.dropDownHolder}>
                            <DesktopOnly>
                                {this.state.visible && (
                                    <div className={styles.writtingReview}>
                                        <div className={styles.headerWrapper}>
                                            <div className={styles.headerWithRating}>
                                                <div className={styles.header1}>
                                                    <h3>Ratings and Reviews</h3>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={styles.reviewHolder}>{this.renderReviewSection()}</div>
                                    </div>
                                )}
                            </DesktopOnly>
                            <MobileOnly>
                                <div className={styles.dropDownHolderWithReviewText}>
                                    <div className={styles.headerWrapper}>
                                        <div className={styles.dropdownWithButton}>
                                            <div className={styles.dropdown}>
                                                <div className={styles.dropDownBox}>
                                                    <SelectBoxMobile2
                                                        value={this.state.sortValue}
                                                        label={this.state.sortLabel}
                                                        onChange={changedValue => this.changeFilterValues(changedValue)}
                                                        options={this.filterOptions}
                                                        textStyle={{ fontSize: 14 }}
                                                    />
                                                </div>
                                            </div>
                                            {this.props.match.path !== WRITE_REVIEWS_WITH_SLUG &&
                                                this.props.match.path !== WRITE_REVIEWS && (
                                                    <div className={styles.reviewText} onClick={this.reviewSection}>
                                                        {WRITE_REVIEW_TEXT}
                                                    </div>
                                                )}
                                        </div>
                                    </div>

                                    {this.state.visible && (
                                        <div className={styles.reviewHolder}>{this.renderReviewSection()}</div>
                                    )}

                                    <div className={styles.reviews}>
                                        {this.props.reviews && (
                                            <ReviewList
                                                reviewList={this.props.reviews.reviews}
                                                totalNoOfReviews={this.props.reviews.totalNoOfPages}
                                                currentreviewList={currentreviewList}
                                            />
                                        )}
                                    </div>
                                </div>
                            </MobileOnly>
                            <DesktopOnly>
                                {this.props.reviews &&
                                    this.props.reviews.reviews &&
                                    this.props.reviews.reviews.length > 0 && (
                                        <div className={styles.headerWrapper}>
                                            <div className={styles.dropdownWithButton}>
                                                <div className={styles.dropdown}>
                                                    <div className={styles.dropDownBox}>
                                                        <SelectBoxMobile2
                                                            value={this.state.sortValue}
                                                            label={this.state.sortLabel}
                                                            onChange={changedValue =>
                                                                this.changeFilterValues(changedValue)
                                                            }
                                                            options={this.filterOptions}
                                                            textStyle={{ fontSize: 14 }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                {this.props.reviews &&
                                    this.props.reviews.reviews &&
                                    this.props.reviews.reviews.length > 0 && (
                                        <div className={styles.dropDownHolderWithReviewText}>
                                            <RatingReviewHeaderComponent
                                                productDetails={this.props.productDetails}
                                                reviews={this.props.reviews}
                                                isReviewPage={true}
                                            />
                                            <div className={styles.reviews}>
                                                {this.props.reviews && (
                                                    <ReviewList
                                                        reviewList={this.props.reviews.reviews}
                                                        totalNoOfReviews={this.props.reviews.totalNoOfPages}
                                                        NoOfReviews={this.props.reviews.totalNoOfReviews}
                                                        currentreviewList={currentreviewList}
                                                    />
                                                )}
                                            </div>
                                        </div>
                                    )}
                                <div className={styles.paginationHolder}>
                                    {this.props.reviews &&
                                        this.props.reviews.reviews &&
                                        this.props.reviews.reviews.length > 0 && (
                                            <Pagination
                                                postPerPage={reviewListPerPage}
                                                totalPost={this.props.reviews.totalNoOfReviews}
                                                handleClick={this.handleClick}
                                                prevClick={this.prevClick}
                                                pageNumber={this.state.currentPage}
                                                pageNumbers={this.pageNumbers()}
                                            />
                                        )}
                                </div>
                            </DesktopOnly>
                        </div>
                    </div>
                </PdpFrame>
            );
        } else {
            return <div />;
        }
    }
}

ProductReviewPage.propTypes = {
    label: PropTypes.string,
    ratingData: PropTypes.array,
    reviewList: PropTypes.array,
    history: PropTypes.object,
    location: PropTypes.object,
    match: PropTypes.object,
    reviews: PropTypes.object,
    setUrlToRedirectToAfterAuth: PropTypes.func,
    hideSecondaryLoader: PropTypes.func,
    getProductReviews: PropTypes.func,
    getProductDescription: PropTypes.func,
    showAuthPopUp: PropTypes.bool,
    displayToast: PropTypes.func,
    addProductReview: PropTypes.func,
    productDetails: PropTypes.object,
    addReviewStatus: PropTypes.string,
    showReviewGuidelineModal: PropTypes.func,
    addProductToCart: PropTypes.func,
    loadingForAddProduct: PropTypes.bool,
    loading: PropTypes.bool,
    showSecondaryLoader: PropTypes.func,
    buyNow: PropTypes.func,
};
