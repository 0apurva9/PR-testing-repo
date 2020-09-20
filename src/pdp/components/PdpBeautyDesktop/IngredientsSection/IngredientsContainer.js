import React, { Component } from "react";
import IngredientsComponents from "./IngredientsComponents";
import styles from "./IngredientsComponents.css";
import PropTypes from "prop-types";

import { INGREDIENTS_COMPONENT } from "../ComponentConstants";
export default class IngredientsContainer extends Component {
  render() {
    const ingredientsComponents =
      this.props.compDetails &&
      this.props.compDetails.filter(
        compItem => compItem.componentId === INGREDIENTS_COMPONENT
      );

    return (
      ingredientsComponents &&
      ingredientsComponents.length > 0 && (
        <IngredientsComponents
          ingredientData={this.props.ingredientData}
          {...this.props}
        />
      )
    );
  }
}

IngredientsContainer.propTypes = {
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
