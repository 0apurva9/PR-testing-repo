import React from "react";
import styles from "./ShowBrandModal.css";
import CheckBox from "../../general/components/CheckBox.js";
export default class ShowBrandModal extends React.Component {
  closeModal() {
    if (this.props.closeModal) {
      this.props.closeModal();
    }
  }
  onFilterClick = (val, evt) => {
    evt.preventDefault();
    const url = val.replace("{pageNo}", 1);
    this.props.history.push(url);
  };
  render() {
    return (
      <div className={styles.base}>
        <div className={styles.headerElement}>
          <div
            className={styles.crossElement}
            onClick={() => this.closeModal()}
          />
        </div>
        <div className={styles.displayDataElement}>
          {this.props &&
            this.props.brandData.map((val, i) => {
              return (
                <div className={styles.brandNameHolder}>
                  <div
                    className={styles.checkBoxHolder}
                    onClick={evt => this.onFilterClick(val.url, evt)}
                  >
                    <CheckBox selected={val.selected} />
                  </div>
                  {val.name}
                </div>
              );
            })}
        </div>
        <div className={styles.footerElement} />
      </div>
    );
  }
}
