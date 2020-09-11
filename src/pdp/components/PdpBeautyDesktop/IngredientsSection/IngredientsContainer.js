import React, { Component } from "react";
import IngredientsComponents from "./IngredientsComponents";
import styles from "./IngredientsComponents.css";

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
