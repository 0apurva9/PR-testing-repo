import React, { Component, Fragment } from "react";
import styles from "./IngredientsComponents.css";
import PropTypes from "prop-types";

export default class IngredientToggleComponent extends Component {
  render() {
    return (
      <Fragment>
        <div className={styles["ingredents-sections"]}>
          {this.props.ingredientData.sortedIngredient &&
            this.props.ingredientData.sortedIngredient.map(item => (
              <div className={styles["ingredents-sec-blocks"]}>
                <div className={styles["ingredents-blk-sub-head"]}>
                  {item.key}:
                </div>
                <div
                  className={
                    item.order % 2
                      ? styles["ingredents-sec-inner-blocks"]
                      : styles["ingredents-sec-inner-blocks1"]
                  }
                >
                  {item &&
                    item.values.map(value => (
                      <div className={styles["ingredents-details"]}>
                        <div
                          className={styles["ingredents-icon"]}
                          style={{
                            backgroundImage: `url(https:${value.imageURL})`
                          }}
                        ></div>
                        <div className={styles["ingredents-txt"]}>
                          <span className={styles["ingredents-txt-head"]}>
                            {value.key}
                          </span>
                          ({value.description})
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
        </div>
        <div className={styles["ingredents-all-ingre-sec"]}>
          {this.props.ingredientData.allIngredients &&
            this.props.ingredientData.allIngredients.length > 0 && (
              <div className={styles["ingredents-all-block"]}>
                <div className={styles["all-ingred-head"]}>
                  {this.props.ingredientData.allIngredients[0].key}:
                </div>
                <div className={styles["all-ingred-desc"]}>
                  {this.props.ingredientData.allIngredients[0].value}
                </div>
              </div>
            )}
          {this.props.ingredientData.notIngredients &&
            this.props.ingredientData.notIngredients.length > 0 && (
              <div className={styles["ingredents-all-block"]}>
                <div className={styles["all-ingred-head"]}>
                  {this.props.ingredientData.notIngredients[0].key}:
                </div>
                <div className={styles["all-ingred-desc"]}>
                  {this.props.ingredientData.notIngredients[0].value}
                </div>
              </div>
            )}
        </div>
      </Fragment>
    );
  }
}

IngredientToggleComponent.propTypes = {
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
