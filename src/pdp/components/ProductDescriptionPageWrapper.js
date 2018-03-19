import React from "react";
import PdpElectronics from "./PdpElectronics";
import PdpApparel from "./PdpApparel";
import PdpHome from "./PdpHome";
import styles from "./ProductDescriptionPageWrapper.css";
import ProductDescriptionPage from "./ProductDescriptionPage";
import MDSpinner from "react-md-spinner";
import {
  PRODUCT_DESCRIPTION_PRODUCT_CODE,
  PRODUCT_DESCRIPTION_SLUG_PRODUCT_CODE,
  UPDATE_PDP_REDUCER_FOR_DELIVERY_OPTION
} from "../../lib/constants";
// prettier-ignore
const typeComponentMapping = {
  "Electronics": props => <PdpElectronics {...props} />,
  "FashionJewellery":props => <ProductDescriptionPage {...props} />,
  "Clothing":props => <PdpApparel {...props} />,
  "HomeFurnishing":props => <PdpHome {...props} />
};

export default class ProductDescriptionPageWrapper extends React.Component {
  componentDidMount() {
    if (this.props.match.path === PRODUCT_DESCRIPTION_PRODUCT_CODE) {
      this.props.getProductDescription(this.props.match.params[1]);
      this.props.getMsdRequest(this.props.match.params[1]);
      this.props.pdpAboutBrand(this.props.match.params[1]);
      if (
        this.props.productDetails &&
        this.props.productDetails.isServiceableToPincode &&
        this.props.productDetails.isServiceableToPincode.pinCode
      ) {
        this.props.getProductPinCode(
          this.props.productDetails.isServiceableToPincode.pinCode,
          this.props.match.params[1]
        );
      }
    } else if (
      this.props.match.path === PRODUCT_DESCRIPTION_SLUG_PRODUCT_CODE
    ) {
      this.props.getProductDescription(this.props.match.params[2]);
      this.props.getMsdRequest(this.props.match.params[2]);
      this.props.pdpAboutBrand(this.props.match.params[2]);
      if (
        this.props.productDetails &&
        this.props.productDetails.isServiceableToPincode &&
        this.props.productDetails.isServiceableToPincode.pinCode
      ) {
        this.props.getProductPinCode(
          this.props.productDetails.isServiceableToPincode.pinCode,
          this.props.match.params[0]
        );
      }
    } else {
      //need to show error page
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      if (this.props.match.path === PRODUCT_DESCRIPTION_PRODUCT_CODE) {
        this.props.getProductDescription(this.props.match.params[1]);
        this.props.getMsdRequest(this.props.match.params[1]);
      } else if (
        this.props.match.path === PRODUCT_DESCRIPTION_SLUG_PRODUCT_CODE
      ) {
        this.props.getProductDescription(this.props.match.params[1]);
        this.props.getMsdRequest(this.props.match.params[1]);
      } else {
        //need to show error page
      }
    }
  }

  renderRootCategory = datumType => {
    return (
      <React.Fragment>
        {typeComponentMapping[datumType] &&
          typeComponentMapping[datumType]({ ...this.props })}
      </React.Fragment>
    );
  };
  renderLoader() {
    return (
      <div className={styles.loadingIndicator}>
        <MDSpinner />
      </div>
    );
  }

  render() {
    console.log(this.props);
    if (!this.props.loading && this.props.productDetails) {
      return (
        <div>
          {this.renderRootCategory(this.props.productDetails.rootCategory)}
        </div>
      );
    } else {
      return this.renderLoader();
    }
  }
}
