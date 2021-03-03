import React from "react";
import styles from "./CustomInstructionComponent.css";
import PropTypes from "prop-types";

export default class CustomInstructionComponent extends React.Component {
    componentDidMount() {
        this.props.getCustomInstruction();
    }

    render() {
        let customComponent =
            this.props.customComponent &&
            this.props.customComponent.applicationProperties &&
            Array.isArray(this.props.customComponent.applicationProperties) &&
            // eslint-disable-next-line react/prop-types
            this.props.customComponent.applicationProperties.length &&
            JSON.parse(this.props.customComponent.applicationProperties[0].value);
        let baseClassName = styles.emptyClass;
        if (
            (typeof customComponent == "object" && Object.keys(customComponent).length === 0) ||
            customComponent == undefined
        ) {
            baseClassName = styles.emptyClass;
        } else {
            baseClassName = styles.holder;
        }
        return (
            <div className={baseClassName}>
                <div className={styles.descriptionHolder}>
                    <div className={styles.header}>{customComponent && customComponent.header}</div>
                    <ul className={styles.bulletPoint}>
                        {customComponent &&
                            customComponent.description &&
                            customComponent.description.map((point, i) => {
                                return (
                                    <li className={styles.point} key={i}>
                                        {point}
                                    </li>
                                );
                            })}
                    </ul>
                </div>
                <div className={styles.imageComponent}>
                    <img src={customComponent && customComponent.image} width="100%" />
                </div>
            </div>
        );
    }
}
CustomInstructionComponent.propTypes = {
    getCustomInstruction: PropTypes.func,
    applicationProperties: PropTypes.object,
    customComponent: PropTypes.arrayOf(
        PropTypes.shape({
            image: PropTypes.string,
            header: PropTypes.string,
            description: PropTypes.array,
            applicationProperties: PropTypes.array,
        })
    ),
};
