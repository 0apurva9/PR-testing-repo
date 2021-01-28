import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import styles from "./IngredientsComponents.css";
import IngredientToggleComponent from "./IngredientToggleComponent";
import { Collapse } from "react-collapse";

export default class IngredientsComponents extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: true,
        };
    }

    openMenu() {
        this.setState(prevState => ({
            isOpen: !prevState.isOpen,
        }));
    }

    render() {
        let iconActive = styles.iconup;
        if (this.state.isOpen) {
            iconActive = styles.icon;
        }

        return (
            <Fragment>
                {(this.props.ingredientData &&
                    this.props.ingredientData.sortedIngredient &&
                    this.props.ingredientData.sortedIngredient.length > 0) ||
                (this.props.ingredientData &&
                    this.props.ingredientData.allIngredients &&
                    this.props.ingredientData.allIngredients.length > 0) ||
                (this.props.ingredientData &&
                    this.props.ingredientData.notIngredients &&
                    this.props.ingredientData.notIngredients.length > 0) ? (
                    <div className={styles.container}>
                        <div
                            className={
                                this.state.isOpen
                                    ? styles["ingredents-component"]
                                    : styles["ingredents-component-hide-padding"]
                            }
                        >
                            <div className={styles.base}>
                                <div
                                    className={styles.holder}
                                    onClick={() => {
                                        this.openMenu();
                                    }}
                                >
                                    <div className={styles["ingredents-heading"]}>{this.props.heading}</div>
                                    <div className={iconActive} />
                                </div>

                                <Collapse isOpened={this.state.isOpen}>
                                    <IngredientToggleComponent ingredientData={this.props.ingredientData} />
                                </Collapse>
                            </div>
                        </div>
                    </div>
                ) : null}
            </Fragment>
        );
    }
}

IngredientsComponents.propTypes = {
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
    heading: PropTypes.string,
};
