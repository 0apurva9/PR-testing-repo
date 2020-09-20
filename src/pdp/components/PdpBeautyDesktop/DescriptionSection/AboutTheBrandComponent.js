import React, { Component } from "react";
import PropTypes from "prop-types";
import Carousel from "../../../../general/components/Carousel";
import styles from "./AboutTheBrand.css";
import ProductModule from "../../../../general/components/ProductModule";
import { transformData } from "../../../../home/components/utils";

export default class AboutTheBrandComponent extends Component {
  goToProductDescription = data => {
    if (data.webURL) {
      window.location.href = data.webURL;
    }
  };

  render() {
    return (
      <div>
        <div className={styles.container}>
          <div className={styles["atb-heading"]}>
            {this.props.aboutTheBrandResponse &&
              this.props.aboutTheBrandResponse.singleBannerComponent.title}
          </div>
        </div>
        <Carousel
          elementWidth={120}
          isPaddingTop={false}
          elementWidthDesktop={33}
          header=""
          buttonColor={true}
          sliderWidthFull={true}
        >
          {this.props.aboutTheBrandResponse &&
            this.props.aboutTheBrandResponse.singleBannerComponent.items.map(
              (val, i) => {
                const transformedDatum = transformData(val);
                const productImage = transformedDatum.image;
                return (
                  <ProductModule
                    key={i}
                    productImage={productImage}
                    onClick={() => this.goToProductDescription(val)}
                  />
                );
              }
            )}
        </Carousel>
      </div>
    );
  }
}

AboutTheBrandComponent.propsTypes = {
  aboutTheBrandResponse: PropTypes.shape({
    singleBannerComponent: PropTypes.shape({
      items: PropTypes.arrayOf(
        PropTypes.shape({
          btnText: PropTypes.string,
          description: PropTypes.string,
          hexCode: PropTypes.string,
          imageURL: PropTypes.string,
          title: PropTypes.string,
          webURL: PropTypes.string
        })
      ),
      title: PropTypes.string,
      type: PropTypes.string
    })
  })
};
