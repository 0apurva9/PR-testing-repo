/* eslint-disable react/display-name */
import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import {
    INGREDIENTS_COMPONENT,
    HOW_TO_WEAR_COMPONENT,
    FROM_THE_BRAND_COMPONENT,
    SECTION_OF_PRODUCT_DESCRIPTION,
    MORE_FROM_THIS_BRAND_COMPONENT,
    RETURNS_COMPONENT,
    ABOUT_THE_BRAND_COMPONENT,
    SIMILAR_BRANDS_COMPONENT,
    STORY_COMPONENT,
    DETAILS_COMPONENT,
    RATING_REVIEW_DETAIL_COMPONENT,
} from "../ComponentConstants";
import Loadable from "react-loadable";
import SecondaryLoader from "../../../../general/components/SecondaryLoader";
import { renderComponent } from "../../../reducers/utils";

const Loader = () => {
    return (
        <div>
            <SecondaryLoader />
        </div>
    );
};

const StoryComponent = Loadable({
    loader: () => import("./StoryComponent"),
    loading() {
        return <Loader />;
    },
});

const IngredientsComponents = Loadable({
    loader: () => import("./IngredientsComponents"),
    loading() {
        return <Loader />;
    },
});

const HowToWearComponent = Loadable({
    loader: () => import("./HowToWearComponent"),
    loading() {
        return <Loader />;
    },
});

const APlusTemplate = Loadable({
    loader: () => import("./APlusTemplate"),
    loading() {
        return <Loader />;
    },
});

const MoreFromBrand = Loadable({
    loader: () => import("./MoreFromBrand"),
    loading() {
        return <Loader />;
    },
});

const NoReturnComponent = Loadable({
    loader: () => import("./NoReturnComponent"),
    loading() {
        return <Loader />;
    },
});

const AboutTheBrandComponent = Loadable({
    loader: () => import("./AboutTheBrandComponent"),
    loading() {
        return <Loader />;
    },
});

const SimilarProductComponent = Loadable({
    loader: () => import("./SimiarProductComponent"),
    loading() {
        return <Loader />;
    },
});

const RatingAndReviewsLongComponent = Loadable({
    loader: () => import("./RatingAndReviewsLongComponent"),
    loading() {
        return <Loader />;
    },
});

const typeComponentMapping = {
    [STORY_COMPONENT]: (props, descripCompDetails) => {
        const detailsComponentFound = descripCompDetails.filter(el => el.componentId === DETAILS_COMPONENT);
        if (detailsComponentFound) {
            return <StoryComponent {...props} detailsComponent={true} />;
        } else {
            return <StoryComponent {...props} />;
        }
    },
    [INGREDIENTS_COMPONENT]: props => <IngredientsComponents {...props} heading={"COMPOSITION"} />,
    [HOW_TO_WEAR_COMPONENT]: props => <HowToWearComponent {...props} />,
    [FROM_THE_BRAND_COMPONENT]: props => <APlusTemplate {...props} heading={"FROM THE BRAND"} />,
    [MORE_FROM_THIS_BRAND_COMPONENT]: props => <MoreFromBrand {...props} heading={"MORE FROM THIS BRAND"} />,
    [RETURNS_COMPONENT]: props => (
        <NoReturnComponent {...props} heading={"NON-RETURNABLE"} heading2={"MANUFACTURER INFORMATION"} />
    ),
    [ABOUT_THE_BRAND_COMPONENT]: props => <AboutTheBrandComponent {...props} />,
    [SIMILAR_BRANDS_COMPONENT]: props => <SimilarProductComponent {...props} heading={"SIMILAR PRODUCTS"} />,
    [RATING_REVIEW_DETAIL_COMPONENT]: props => <RatingAndReviewsLongComponent {...props} />,
};

export default class DescriptionContainer extends Component {
    render() {
        const descripCompDetails = [];
        this.props.compDetails &&
            this.props.compDetails.map(componentDetails => {
                return SECTION_OF_PRODUCT_DESCRIPTION.find(componentName => {
                    if (componentDetails.componentId === componentName) {
                        descripCompDetails.push(componentDetails);
                    }
                });
            });

        return (
            <Fragment>
                {descripCompDetails &&
                    descripCompDetails.map(componentDetails =>
                        renderComponent(componentDetails, typeComponentMapping, this.props, descripCompDetails)
                    )}
            </Fragment>
        );
    }
}

DescriptionContainer.propTypes = {
    compDetails: PropTypes.arrayOf(
        PropTypes.shape({
            componentId: PropTypes.string,
            componentPosition: PropTypes.string,
            componentProperties: PropTypes.shape({
                shareButton: PropTypes.bool,
                componentScrollingPosition: PropTypes.string,
                componentSliderDotsPosition: PropTypes.string,
                tagPosition: PropTypes.string,
            }),
        })
    ),
    ingredientData: PropTypes.shape({
        sortedIngredient: PropTypes.arrayOf(
            PropTypes.shape({
                key: PropTypes.string,
                order: PropTypes.string,
                values: PropTypes.arrayOf(
                    PropTypes.shape({
                        key: PropTypes.string,
                        description: PropTypes.string,
                        imageURL: PropTypes.string,
                    })
                ),
            })
        ),
        allIngredients: PropTypes.arrayOf(
            PropTypes.shape({
                key: PropTypes.string,
                value: PropTypes.string,
            })
        ),
        notIngredients: PropTypes.arrayOf(
            PropTypes.shape({
                key: PropTypes.string,
                value: PropTypes.string,
            })
        ),
    }),
};
