import React from "react";
import Button from "../../general/components/Button";
import CommonCenter from "../../general/components/CommonCenter";
import DesktopOnly from "../../general/components/DesktopOnly";
import MobileOnly from "../../general/components/MobileOnly";
import UnderLinedButton from "../../general/components/UnderLinedButton";
import styles from "./CuratedProductsComponent.css";
import Grid from "../../general/components/Grid";
import ProductModule from "../../general/components/ProductModule";
import { transformData } from "./utils.js";
import { TATA_CLIQ_ROOT } from "../../lib/apiRequest.js";
import { widgetsTracking } from "../../lib/adobeUtils.js";
class CuratedProductsComponent extends React.Component {
  onClick = (val, i) => {
    widgetsTracking({
      widgetName: "Curated products component",
      sourceOfWidget: this.props.postData && this.props.postData.widgetPlatform,
      PositionOfProduct: i + 1
    });
    if (this.props.location.pathname === "/") {
      window.open(val, "_blank");
    } else {
      this.props.history.push({
        pathname: val,
        state: {
          componentName: "Curated products component"
        }
      });
    }
  };

  handleSeeAll = () => {
    widgetsTracking({
      widgetName: "Curated products component",
      sourceOfWidget: this.props.postData && this.props.postData.widgetPlatform
    });
    const urlSuffix = this.props.feedComponentData.webURL.replace(
      TATA_CLIQ_ROOT,
      "$1"
    );
    this.props.history.push(urlSuffix);
    if (this.props.setClickedElementId) {
      this.props.setClickedElementId();
    }
  };

  render() {
    const { feedComponentData, ...rest } = this.props;
    let items = [];
    if (feedComponentData.items) {
      items = feedComponentData.items.map(transformData);
    }
    return (
      <CommonCenter>
        <div className={styles.base}>
          <div className={styles.header}>
            <div className={styles.headingText}>
              <h2>{feedComponentData.title}</h2>
              <DesktopOnly>
                <div className={styles.desktopButtonHolder}>
                  <UnderLinedButton
                    color="#212121"
                    fontFamily="light"
                    onClick={this.handleSeeAll}
                    label={feedComponentData.btnText}
                  />
                </div>
              </DesktopOnly>
            </div>
          </div>
          <Grid offset={20}>
            {items &&
              items.map((datum, i) => {
                return (
                  <ProductModule
                    key={i}
                    productImage={datum.image}
                    title={datum.title}
                    price={datum.price}
                    discountPrice={datum.discountPrice}
                    description={datum.description}
                    webURL={datum.webURL}
                    onClick={url => this.onClick(url, i)}
                    {...rest}
                    widgetName={"Curated Products Component"}
                    sourceOfWidget={
                      this.props.postData && this.props.postData.widgetPlatform
                    }
                  />
                );
              })}
          </Grid>
          <MobileOnly>
            <div className={styles.button}>
              {feedComponentData.btnText && (
                <Button
                  type="hollow"
                  width={100}
                  onClick={this.handleSeeAll}
                  label={feedComponentData.btnText}
                  color="#212121"
                />
              )}
            </div>
          </MobileOnly>
        </div>
      </CommonCenter>
    );
  }
}
export default CuratedProductsComponent;
