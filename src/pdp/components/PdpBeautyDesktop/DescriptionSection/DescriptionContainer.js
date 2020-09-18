import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import {
  INGREDIENTS_COMPONENT,
  HOW_TO_WEAR_COMPONENT,
  FROM_THE_BRAND_COMPONENT,
  SECTION_OF_PRODUCT_DESCRIPTION
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

const IngredientsComponents = Loadable({
  loader: () => import("./IngredientsComponents"),
  loading() {
    return <Loader />;
  }
});

const HowToWearComponent = Loadable({
  loader: () => import("./HowToWearComponent"),
  loading() {
    return <Loader />;
  }
});

const APlusTemplate = Loadable({
  loader: () => import("./APlusTemplate"),
  loading() {
    return <Loader />;
  }
});

const typeComponentMapping = {
  [INGREDIENTS_COMPONENT]: props => (
    <IngredientsComponents {...props} heading={"INGREDIENTS"} />
  ),
  [HOW_TO_WEAR_COMPONENT]: props => (
    <HowToWearComponent {...props} heading={"HOW TO WEAR"} />
  ),
  [FROM_THE_BRAND_COMPONENT]: props => (
    <APlusTemplate {...props} heading={"FROM THE BRAND"} />
  )
};

export default class DescriptionContainer extends Component {
  render() {
    const descripCompDetails = [];

    const ingredientsComponents =
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
            renderComponent(componentDetails, typeComponentMapping, this.props)
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
        tagPosition: PropTypes.string
      })
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
            imageURL: PropTypes.string
          })
        )
      })
    ),
    allIngredients: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.string,
        value: PropTypes.string
      })
    ),
    notIngredients: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.string,
        value: PropTypes.string
      })
    )
  })
};
