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
      this.props.customComponent.applicationProperties.length &&
      JSON.parse(this.props.customComponent.applicationProperties[0].value);
    return (
      <div className={styles.holder}>
        <div className={styles.descriptionHolder}>
          <div className={styles.header}>
            {customComponent && customComponent.header}
          </div>
          <ul className={styles.bulletPoint}>
            {customComponent &&
              customComponent.description &&
              customComponent.description.map(point => {
                return <li className={styles.point}>{point}</li>;
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
  customComponent: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.string,
      header: PropTypes.string,
      description: PropTypes.array
    })
  )
};
