import React from "react";
import styles from "./ManufacturerDetails.css";

export default class ManufacturerDetails extends React.Component {
  displayManuImporterPackerInfo(details, Text) {
    if (details.length > 1) {
      return (
        <div className={styles.content1}>
          <div className={styles.manufacturedByText}>
            {Text} by one of the following:
          </div>

          {details.map((detail, index) => {
            return (
              <div className={styles.manufacturer} key = {index}>
                <span>{index + 1}. </span>
                {detail.value}
              </div>
            );
          })}
        </div>
      );
    } else {
      return (
        <div className={styles.content1}>
          <div>{Text} by:</div>
          {details.map((detail, index) => {
            return <div key = {index}>{detail.value}</div>;
          })}
        </div>
      );
    }
  }

  render() {
    let manufacturerDetails = this.props;
    return (
      <div className={styles.base}>
        <div className={styles.header}>
          Manufacturing, Packaging and Import Info
        </div>

        <div className={styles.genericCountryPart}>
          <div className={styles.genericName}>
            <div className={styles.genericLabel}>Generic Name</div>
            <div className={styles.manufacturerDetailsBoldText}>
              {manufacturerDetails.productType}
            </div>
          </div>

          <div className={styles.countryOfOrigin}>
            <div className={styles.genericLabel}>Country of Origin</div>
            <div className={styles.manufacturerDetailsBoldText}>
              {manufacturerDetails.countryOfOrigin}
            </div>
          </div>
        </div>
        <div className={styles.subHeader}>
          <div className={styles.box1}>Manufacturer&apos;s Details</div>
          <div className={styles.box2}>Importer&apos;s Details</div>
          <div className={styles.box3}>Packer&apos;s Details</div>
        </div>
        <div className={styles.manuImportPackerInfo}>
          {manufacturerDetails.manufacturer &&
            this.displayManuImporterPackerInfo(
              manufacturerDetails.manufacturer,
              "Manufactured"
            )}
          {manufacturerDetails.importer &&
            this.displayManuImporterPackerInfo(
              manufacturerDetails.importer,
              "Imported"
            )}
          {manufacturerDetails.packer &&
            this.displayManuImporterPackerInfo(
              manufacturerDetails.packer,
              "Packed"
            )}
        </div>
      </div>
    );
  }
}
