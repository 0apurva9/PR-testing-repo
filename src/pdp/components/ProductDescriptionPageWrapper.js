import React from "react";
import PdpElectronics from "./PdpElectronics";
import PdpApparel from "./PdpApparel";
import PdpJewellery from "./PdpJewellery";
import PdpHome from "./PdpHome";

import styles from "./ProductDescriptionPageWrapper.css";
import SecondaryLoader from "../../general/components/SecondaryLoader";
import MetaTags from "react-meta-tags";
import {
  PRODUCT_DESCRIPTION_PRODUCT_CODE,
  PRODUCT_DESCRIPTION_SLUG_PRODUCT_CODE,
  UPDATE_PDP_REDUCER_FOR_DELIVERY_OPTION,
  DEFAULT_PIN_CODE_LOCAL_STORAGE,
  GOOGLE_TAG_TITLE_DEFAULT,
  GOOGLE_TAG_IMAGE_DEFAULT
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
        <SecondaryLoader />
      </div>
    );
  }
  /*

<meta name="description" content="Free Web tutorials">
  <meta name="keywords" content="HTML,CSS,XML,JavaScript">
  */

  /*
<link rel=“canonical” href="https://www.tatacliq.com/utsa-by-westside-yellow-pure-cotton-kurta-set/p-mp000000002644543" hreflang="en-in">


<meta itemprop="name" content="SEO Title">
<meta itemprop="description" content="SEO Description">
<meta itemprop="image" content="https://www.tatacliq.com/image.jpg">
  */
  renderMetaTags = () => {
    const productDetails = this.props.productDetails;
    console.log(productDetails);
    const canonicalUrl = productDetails.seo.canonicalURL
      ? productDetails.seo.canonicalURL
      : window.location.href;
    const alternateUrl = productDetails.seo.alternateURL
      ? productDetails.seo.alternateURL
      : window.location.href;
    const googleTitle = productDetails.seo.title
      ? productDetails.seo.title
      : GOOGLE_TAG_TITLE_DEFAULT;
    const googleDescription = productDetails.seo.description;
    const googleImageUrl = productDetails.seo.imageURL
      ? productDetails.seo.imageURL
      : GOOGLE_TAG_IMAGE_DEFAULT;
    return (
      <MetaTags>
        <title> {productDetails.seo.title}</title>
        <meta name="description" content={productDetails.seo.description} />
        <meta name="keywords" content={productDetails.seo.keywords} />
        <link rel="canonical" href={canonicalUrl} hreflang="en-in" />
        <link rel="alternate" href={alternateUrl} hreflang="en-in" />
        <meta itemprop="name" content={googleTitle} />
        {googleDescription && (
          <meta itemprop="description" content={googleDescription} />
        )}
        <meta itemprop="image" content={googleImageUrl} />
      </MetaTags>
    );
  };

  render() {
    if (this.props.loading) {
      this.showLoader();
    } else {
      this.hideLoader();
    }
    if (this.props.productDetails) {
      return (
        <div>
          {this.renderMetaTags()}
          {this.renderRootCategory(this.props.productDetails.rootCategory)}
        </div>
      );
    } else {
      return this.renderLoader();
    }
  }
}
