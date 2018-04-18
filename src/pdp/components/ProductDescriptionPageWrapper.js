import React from "react";
import PdpElectronics from "./PdpElectronics";
import PdpApparel from "./PdpApparel";
import PdpJewellery from "./PdpJewellery";
import PdpHome from "./PdpHome";

import styles from "./ProductDescriptionPageWrapper.css";
import ProductDescriptionPage from "./ProductDescriptionPage";
import MDSpinner from "react-md-spinner";
import {
  PRODUCT_DESCRIPTION_PRODUCT_CODE,
  PRODUCT_DESCRIPTION_SLUG_PRODUCT_CODE,
  UPDATE_PDP_REDUCER_FOR_DELIVERY_OPTION,
  DEFAULT_PIN_CODE_LOCAL_STORAGE
} from "../../lib/constants";
// prettier-ignore
const typeComponentMapping = {
  "Electronics": props => <PdpElectronics {...props} />,
  "Watches":props =><PdpElectronics {...props} />,
  "FashionJewellery":props => <PdpJewellery {...props} />,
  "Clothing":props => <PdpApparel {...props} />,
  "Footwear":props => <PdpApparel {...props} />,
  "HomeFurnishing":props => <PdpHome {...props} />,
  "FineJewellery": props => <PdpJewellery {...props} />,
};

const defaultPinCode = localStorage.getItem(DEFAULT_PIN_CODE_LOCAL_STORAGE);

export default class ProductDescriptionPageWrapper extends React.Component {
  componentDidMount() {
    if (this.props.match.path === PRODUCT_DESCRIPTION_PRODUCT_CODE) {
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 0);
      this.props.getProductDescription(this.props.match.params[0]);
      this.props.getMsdRequest(this.props.match.params[0]);
      this.props.pdpAboutBrand(this.props.match.params[0]);
      if (defaultPinCode) {
        this.props.getProductPinCode(
          defaultPinCode,
          this.props.match.params[0]
        );
      }
    } else if (
      this.props.match.path === PRODUCT_DESCRIPTION_SLUG_PRODUCT_CODE
    ) {
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 0);
      this.props.getProductDescription(this.props.match.params[1]);
      this.props.getMsdRequest(this.props.match.params[1]);
      this.props.pdpAboutBrand(this.props.match.params[1]);
      if (defaultPinCode) {
        this.props.getProductPinCode(
          defaultPinCode,
          this.props.match.params[1]
        );
      }
    } else {
      //need to show error page
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 0);

      if (this.props.match.path === PRODUCT_DESCRIPTION_PRODUCT_CODE) {
        this.props.getProductDescription(this.props.match.params[0]);
        this.props.getMsdRequest(this.props.match.params[0]);
        if (defaultPinCode) {
          this.props.getProductPinCode(
            defaultPinCode,
            this.props.match.params[0]
          );
        }
      } else if (
        this.props.match.path === PRODUCT_DESCRIPTION_SLUG_PRODUCT_CODE
      ) {
        setTimeout(() => {
          window.scrollTo(0, 0);
        }, 0);
        this.props.getProductDescription(this.props.match.params[1]);
        this.props.getMsdRequest(this.props.match.params[1]);
        if (defaultPinCode) {
          this.props.getProductPinCode(
            defaultPinCode,
            this.props.match.params[1]
          );
        }
      } else {
        //need to show error page
      }
    }
  }
  showLoader = () => {
    this.props.showSecondaryLoader();
  };
  hideLoader = () => {
    this.props.hideSecondaryLoader();
  };
  renderRootCategory = datumType => {
    let pdpToRender = typeComponentMapping[datumType];
    if (!pdpToRender) {
      pdpToRender = typeComponentMapping["Clothing"];
    }

    return <React.Fragment>{pdpToRender({ ...this.props })}</React.Fragment>;
  };
  renderLoader() {
    return (
      <div className={styles.loadingIndicator}>
        <MDSpinner />
      </div>
    );
  }

  render() {
    if (this.props.loading) {
      this.showLoader();
    } else {
      this.hideLoader();
    }
    if (this.props.productDetails) {
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
