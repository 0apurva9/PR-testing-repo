import React from "react";
import Loadable from "react-loadable";
import MobileOnly from "../../general/components/MobileOnly";
import DesktopOnly from "../../general/components/DesktopOnly";
import Helmet from "react-helmet";
import styles from "./ProductDescriptionPageWrapper.css";
import SecondaryLoader from "../../general/components/SecondaryLoader";
import {
  PRODUCT_DESCRIPTION_PRODUCT_CODE,
  PRODUCT_DESCRIPTION_SLUG_PRODUCT_CODE,
  DEFAULT_PIN_CODE_LOCAL_STORAGE,
  AMP_PRODUCT_CODE_REG_EX
} from "../../lib/constants";
import {
  renderMetaTags,
  renderMetaTagsWithoutSeoObject
} from "../../lib/seoUtils.js";
import PdpElectronics from "./PdpElectronics";
import PdpJewellery from "./PdpJewellery";
import PdpApparel from "./PdpApparel";
import PdpHome from "./PdpHome";
import PdpDesktop from "./PdpDesktop";
import { checkUserAgentIsMobile } from "../../lib/UserAgent.js";
// prettier-ignore
import queryString, { parse } from "query-string";
const PiqPageForPdp = Loadable({
  loader: () => import("./PiqPageForPdp"),
  loading() {
    return (
      <div className={styles.loadingIndicator}>
        <Loader />
      </div>
    );
  }
});

const typeComponentMapping = {
  Electronics: props => <PdpElectronics {...props} />,
  Watches: props => <PdpElectronics {...props} />,
  FashionJewellery: props => <PdpJewellery {...props} />,
  Clothing: props => <PdpApparel {...props} />,
  Footwear: props => <PdpApparel {...props} />,
  HomeFurnishing: props => <PdpHome {...props} />,
  FineJewellery: props => <PdpJewellery {...props} />
};

const Loader = () => {
  return (
    <div>
      <SecondaryLoader />
    </div>
  );
};

const defaultPinCode = localStorage.getItem(DEFAULT_PIN_CODE_LOCAL_STORAGE);

export default class ProductDescriptionPageWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showPiqPage: false };
  }
  componentDidMount = async () => {
    if (this.props.match.path === PRODUCT_DESCRIPTION_PRODUCT_CODE) {
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 0);
      await this.props.getProductDescription(this.props.match.params[0]);
    } else if (
      this.props.match.path === PRODUCT_DESCRIPTION_SLUG_PRODUCT_CODE
    ) {
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 0);
      this.props.getProductDescription(this.props.match.params[1]);
    } else {
      //need to show error page
    }

    const parsedQueryString = queryString.parse(this.props.location.search);

    //show the pinCodeModal if showAmpPincode is true
    if (parsedQueryString.showAmpPincode === "true") {
      if (this.props.match.path === PRODUCT_DESCRIPTION_PRODUCT_CODE) {
        this.props.showPincodeModal(this.props.match.params[0]);
      } else if (
        this.props.match.path === PRODUCT_DESCRIPTION_SLUG_PRODUCT_CODE
      ) {
        this.props.showPincodeModal(this.props.match.params[1]);
      }
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.props.productDetails && this.props.productDetails !== "null") {
      this.props.setHeaderText(this.props.productDetails.productName);
    }

    if (prevProps.location.pathname !== this.props.location.pathname) {
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 0);

      if (this.props.match.path === PRODUCT_DESCRIPTION_PRODUCT_CODE) {
        this.props.getProductDescription(this.props.match.params[0]);
        // this.props.getMsdRequest(this.props.match.params[0]);
      } else if (
        this.props.match.path === PRODUCT_DESCRIPTION_SLUG_PRODUCT_CODE
      ) {
        setTimeout(() => {
          window.scrollTo(0, 0);
        }, 0);
        this.props.getProductDescription(this.props.match.params[1]);
        // this.props.getMsdRequest(this.props.match.params[1]);
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
  renderAmpTags = () => {
    if (AMP_PRODUCT_CODE_REG_EX.test(this.props.history.location.pathname)) {
      let productCode = /mp[0-9]+/i.test(this.props.match.params[0])
        ? this.props.match.params[0]
        : this.props.match.params[1];
      return (
        <Helmet>
          <link rel="amphtml" href={`/amp/p-${productCode}`} />
          <link rel="canonical" href={`/amp/p-${productCode}`} />
        </Helmet>
      );
    }
  };
  renderLoader() {
    return (
      <div className={styles.loadingIndicator}>
        <SecondaryLoader />
      </div>
    );
  }
  /*

  */

  render() {
    if (this.props.loading) {
      this.showLoader();
    } else {
      this.hideLoader();
    }
    if (
      !checkUserAgentIsMobile() &&
      this.props.showPiqPage &&
      this.props.stores &&
      this.props.stores.length > 0
    ) {
      let cliqAndPiqDetails = {};
      cliqAndPiqDetails.loadingForCliqAndPiq = this.props.loadingForCliqAndPiq;
      cliqAndPiqDetails.stores = this.props.stores;
      cliqAndPiqDetails.productDetails = this.props.productDetails;
      cliqAndPiqDetails.pinCodeUpdateDisabled = true;
      this.props.showPdpCliqAndPiqPage(cliqAndPiqDetails);
    }
    if (this.props.productDetails) {
      if (!this.props.showPiqPage || !checkUserAgentIsMobile()) {
        return (
          <div itemScope itemType="http://schema.org/Product">
            <MobileOnly>
              {this.renderAmpTags()}
              {this.props.productDetails.seo
                ? renderMetaTags(this.props.productDetails)
                : renderMetaTagsWithoutSeoObject(this.props.productDetails)}
              {this.renderRootCategory(this.props.productDetails.rootCategory)}
            </MobileOnly>
            <DesktopOnly>
              <PdpDesktop {...this.props} />
            </DesktopOnly>
          </div>
        );
      } else {
        return (
          <div>
            <MobileOnly>
              <PiqPageForPdp
                loadingForCliqAndPiq={this.props.loadingForCliqAndPiq}
                productDetails={this.props.productDetails}
                stores={this.props.stores}
                displayToast={this.props.displayToast}
                getAllStoresForCliqAndPiq={this.props.getAllStoresForCliqAndPiq}
                removeCliqAndPiq={() => this.removeCliqAndPiq()}
                hidePdpPiqPage={this.props.hidePdpPiqPage}
              />
            </MobileOnly>
          </div>
        );
      }
    } else {
      return this.renderLoader();
    }
  }
}
