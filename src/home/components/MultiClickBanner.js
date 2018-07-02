import React from "react";
import MultiClickProduct from "./MultiClickProduct";
import { TATA_CLIQ_ROOT } from "../../lib/apiRequest.js";
import styles from "./MultiClickBanner.css";
const data = [
  {
    backgroundImage:
      "https://www.appliancesonline.com.au/public/images/product/eqe6207sd/external/620L-Electrolux-4-Door-Fridge-EQE6207SD-Hero-Image-high.jpeg",
    yAxis: 50,
    xAxis: 100,
    brandName: "Philips",
    description: "Fridge HD7447/20",
    price: "2,400",
    url:
      "https://www.tatacliq.com/samsung-rh62k6007s8-674l-refrigerator-elegant-inox/p-mp000000001641288"
  },
  {
    backgroundImage:
      "http://storage.torontosun.com/v1/blogs-prod-photos/8/2/d/d/7/82dd762da57fa9de6d492c0c5221eb3f.jpg",
    yAxis: 30,
    xAxis: 5,
    brandName: "Philips",
    description: "Coffee maker HD7447/20",
    price: "2,400",
    url:
      "https://www.tatacliq.com/samsung-rh62k6007s8-674l-refrigerator-elegant-inox/p-mp000000001641288"
  },
  {
    backgroundImage:
      "https://images.philips.com/is/image/PhilipsConsumer/HD7431_20-IMS-en_IN?$jpglarge$&wid=1250",
    yAxis: 0,
    xAxis: 100,
    brandName: "Philips",
    description: "Toaster HD7447/20",
    price: "2,400",
    url:
      "https://www.tatacliq.com/samsung-rh62k6007s8-674l-refrigerator-elegant-inox/p-mp000000001641288"
  },
  {
    backgroundImage:
      "http://storage.torontosun.com/v1/blogs-prod-photos/8/2/d/d/7/82dd762da57fa9de6d492c0c5221eb3f.jpg",
    yAxis: 47.5,
    xAxis: 94,
    brandName: "Philips",
    description: "Coffee maker HD7447/20",
    price: "2,400",

    url:
      "https://www.tatacliq.com/samsung-rh62k6007s8-674l-refrigerator-elegant-inox/p-mp000000001641288"
  }
];
export default class MultiClickBanner extends React.Component {
  goToUrl(url) {
    const urlSuffix = url.replace(TATA_CLIQ_ROOT, "$1");
    if (url.includes("/que")) {
      window.open(urlSuffix, "_blank");
      window.focus();
    }
    if (url.includes("/luxury.tatacliq.com")) {
      window.open(url, "_blank");
      window.focus();
    } else {
      this.props.history.push(urlSuffix);
      if (this.props.setClickedElementId) {
        this.props.setClickedElementId();
      }
    }
  }
  render() {
    return (
      <div
        className={
          this.props.positionInFeed === 1 ? styles.firstItemBase : styles.base
        }
      >
        <div className={styles.content}>
          {data.map(val => {
            return (
              <div
                className={styles.section}
                style={{
                  backgroundColor: val.backgroundColor,
                  backgroundImage: `url(${val.backgroundImage})`
                }}
              >
                <div
                  className={styles.details}
                  style={{
                    top: `${val.yAxis}%`,
                    left: `${val.xAxis}%`
                  }}
                >
                  <MultiClickProduct
                    brandName={val.brandName}
                    description={val.description}
                    price={val.price}
                    onClick={() => this.goToUrl(val.url)}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
