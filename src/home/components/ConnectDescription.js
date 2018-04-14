import React from "react";
import styles from "./ConnectDescription.css";
import Icon from "../../xelpmoc-core/Icon";
import PropTypes from "prop-types";

export default class ConnectDescription extends React.Component {
  render() {
    return (
      <div className={styles.base}>
        <div className={styles.manage}>
          <div className={styles.icon}>
            <Icon image={this.props.imageURL} size={30} />
          </div>
          <div className={styles.title}>{this.props.title}</div>
          <div className={styles.description}>{this.props.description}</div>
        </div>
      </div>
    );
  }
}
ConnectDescription.PropsTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string
};
