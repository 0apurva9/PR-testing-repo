import React from "react";
import Grid from "../../general/components/Grid";
import ProductModule from "../../general/components/ProductModule";
import IconicFilter from "./IconicFilter";
import PlpAds from "./PlpAds";
import PlpComponent from "./PlpComponent";
import { Icon } from "xelpmoc-core";
import styles from "./ProductGrid.css";
import gridImage from "./img/grid.svg";
import listImage from "./img/list.svg";
const LIST = "list";
const GRID = "grid";
export default class ProductGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: LIST
    };
  }
  switchView() {
    if (this.state.view === LIST) {
      this.setState({ view: GRID });
    } else {
      this.setState({ view: LIST });
    }
  }
  changeAddress() {
    if (this.props.changeAddress) {
      this.props.changeAddress();
    }
  }
  renderComponent = data => {
    if (data.type === "product") {
      return (
        <ProductModule
          productImage={data.imageURL}
          title={data.productname}
          price={data.price.mrpPrice.formattedValue}
          discountPrice={data.price.sellingPrice.formattedValue}
          description={data.description}
          bestDeliveryInfo={data.bestDeliveryInfo}
          offerText={data.offerText}
          averageRating={data.averageRating}
          totalNoOfReviews={data.totalNoOfReviews}
          view={this.state.view}
        />
      );
    } else if (data.type === "plpAd") {
      return <PlpAds imageURL={data.imageURL} />;
    } else if (data.type === "iconicFilter") {
      return <IconicFilter data={data.filterValue} title={data.filterTitle} />;
    } else {
      return null;
    }
  };
  render() {
    return (
      <div className={styles.base}>
        <div className={styles.header}>
          <div className={styles.area}>{this.props.area}</div>
          <div
            className={styles.areaChange}
            onClick={() => this.changeAddress()}
          >
            Change
          </div>
          <div className={styles.icon} onClick={() => this.switchView()}>
            {this.state.view === LIST && <Icon image={gridImage} size={20} />}
            {this.state.view === GRID && <Icon image={listImage} size={20} />}
          </div>
        </div>
        <div className={styles.content}>
          <Grid
            search={this.props.search}
            offset={0}
            elementWidthMobile={this.state.view === LIST ? 100 : 50}
          >
            {this.props.data &&
              this.props.data.map((datum, i) => {
                if (this.renderComponent(datum) !== null) {
                  let widthMobile = false;
                  if (datum.type === "plpAd" || datum.type === "iconicFilter") {
                    widthMobile = 100;
                  }
                  return (
                    <PlpComponent
                      key={i}
                      gridWidthMobile={widthMobile}
                      view={this.state.view}
                      type={datum.type}
                    >
                      {this.renderComponent(datum)}
                    </PlpComponent>
                  );
                } else {
                  return null;
                }
              })}
          </Grid>
        </div>
      </div>
    );
  }
}

ProductGrid.defaultProps = {
  area: "Delhi - 560345"
};
