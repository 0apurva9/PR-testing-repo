import React, { Component } from "react";
import Carousel from "../../general/components/Carousel";
import CategoryWithName from "../../general/components/CategoryWithName";
import styles from "./SearchresultNullpage.css";
import { TATA_CLIQ_ROOT } from "../../lib/apiRequest.js";
import ProductModule from "../../general/components/ProductModule";
import { RUPEE_SYMBOL, HOME_ROUTER } from "../../lib/constants.js";
import DiscoverMoreComponentDesktop from "../../home/components/DiscoverMoreComponentDesktop.js";
import DesktopOnly from "../../general/components/DesktopOnly.js";
import CommonCenter from "../../general/components/CommonCenter.js";
import Button from "../../general/components/Button";
import propTypes from "prop-types";
export default class SearchresultNullpage extends Component {
  handleOnContinue() {
    this.props.history.push(HOME_ROUTER);
  }
  redirectToPlp(webUrl) {
    const urlSuffix = webUrl.replace(TATA_CLIQ_ROOT, "$1");
    this.props.history.push(urlSuffix);
  }
  dicountPrice(discountedPrice, price) {
    const mrpInteger = parseInt(price.replace(RUPEE_SYMBOL, ""), 10);
    const discount = Math.floor(
      (mrpInteger - parseInt(discountedPrice.replace(RUPEE_SYMBOL, ""), 10)) /
        mrpInteger *
        100
    );

    return discount;
  }
  render() {
    return (
      <React.Fragment>
        <DesktopOnly>
          {this.props &&
            this.props.feeds &&
            this.props.feeds[0] && (
              <div className={styles.base}>
                <div className={styles.headingHolder}>
                  We couldn’t find anything matching your search term. Please
                  try searching for something else.
                </div>
                <div className={styles.orText}>Or</div>
                <div className={styles.buttonHolder}>
                  <div className={styles.button}>
                    <Button
                      type="primary"
                      backgroundColor="#ff1744"
                      height={42}
                      label="Continue Shopping"
                      width={204}
                      textStyle={{ color: "#FFF", fontSize: 14 }}
                      onClick={() => this.handleOnContinue()}
                    />
                  </div>
                </div>

                <CommonCenter>
                  <div className={styles.nullPageData}>
                    <div className={styles.TopPicksCenter}>
                      {this.props &&
                        this.props.feeds &&
                        this.props.feeds[0] && (
                          <Carousel
                            header="Browse Category"
                            elementWidthDesktop={33.33}
                          >
                            {this.props &&
                              this.props.feeds &&
                              this.props.feeds[0] &&
                              this.props.feeds[0].discoverMore.data[0].map(
                                (datum, i) => {
                                  return (
                                    <DiscoverMoreComponentDesktop
                                      imageURL={
                                        datum.L1_metadata &&
                                        datum.L1_metadata.imageURL
                                      }
                                      title={datum.L1}
                                      webURL={
                                        datum.L1_metadata &&
                                        datum.L1_metadata.webURL
                                      }
                                      btnText={datum.btnText}
                                      items={datum.L3_list}
                                      history={this.props.history}
                                      setClickedElementId={
                                        this.props.setClickedElementId
                                      }
                                      key={i}
                                    />
                                  );
                                }
                              )}
                          </Carousel>
                        )}
                    </div>
                    {this.props &&
                      this.props.feeds &&
                      this.props.feeds.map((data, i) => {
                        return (
                          <div className={styles.dataAndLabelHolder} key={i}>
                            <div className={styles.browseCategory}>
                              <div className={styles.TopPicksCenter}>
                                {data.trendingProducts &&
                                  data.trendingProducts.data && (
                                    <div className={styles.dataAndLabelHolder}>
                                      <div
                                        className={
                                          styles.categoryCarouselHolderForTopPicks
                                        }
                                      >
                                        <Carousel
                                          elementWidthMobile={45}
                                          header="Top picks for you"
                                        >
                                          {data.trendingProducts &&
                                            data.trendingProducts.data &&
                                            data.trendingProducts.data.map(
                                              val => {
                                                return (
                                                  <ProductModule
                                                    productImage={val.imageUrl}
                                                    onClick={() =>
                                                      this.redirectToPlp(
                                                        val.webURL
                                                      )
                                                    }
                                                    productId={
                                                      val.productListingId
                                                    }
                                                    price={val.mrp}
                                                    title={val.productName}
                                                    discountPercent={this.dicountPrice(
                                                      val.winningSellerMOP,
                                                      val.mrp
                                                    )}
                                                    searchresultNullpage={true}
                                                    description={
                                                      val.description
                                                    }
                                                    discountPrice={
                                                      val.winningSellerMOP
                                                    }
                                                    noBrace={true}
                                                    key={val.productName}
                                                  />
                                                );
                                              }
                                            )}
                                        </Carousel>
                                      </div>
                                    </div>
                                  )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </CommonCenter>
              </div>
            )}
        </DesktopOnly>
      </React.Fragment>
    );
  }
}

SearchresultNullpage.propTypes = {
  imageURL: propTypes.string,
  title: propTypes.string,
  data: propTypes.arrayOf(
    propTypes.shape({
      imageURL: propTypes.string,
      title: propTypes.string,
      webURL: propTypes.string,
      btnText: propTypes.string,
      items: propTypes.string
    })
  )
};
