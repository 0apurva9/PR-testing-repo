import React from "react";
import PropTypes from "prop-types";
import MediaQuery from "react-responsive";
import styles from "./Grid.css";
import PlpBannerFeed from "../../home/components/PlpBannerFeed";

export default class Grid extends React.Component {
  recordScreenScroll = () => {
    if (this.props.banners) {
      localStorage.setItem("gridScroll", window.pageYOffset);
    }
  };

  componentDidMount() {
    let banner = localStorage.getItem("gridScroll");
    if (this.props.banners && this.props.banners.length !== 0) {
      window.scroll(0, banner);
      localStorage.removeItem("gridScroll");
    } else {
      window.scroll(0, 0);
    }
  }
  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.banners) {
  //   }
  // }
  renderPlpBanner(index) {
    let plpBannerDetails =
      this.props.plpBannerData &&
      this.props.plpBannerData.filter(data => {
        return (
          data &&
          data.items &&
          data.items[0] &&
          data.items[0].hexCode &&
          parseInt(data.items[0].hexCode) === index
        );
      });
    return (
      plpBannerDetails && (
        <PlpBannerFeed
          plpFeedData={plpBannerDetails}
          index={index}
          firstBanner={index === 0 ? true : false}
        />
      )
    );
  }
  renderEachPlpItem() {
    let str = [];
    let displayClass =
      this.props.elementWidthDesktop === 25
        ? styles.displayInline
        : styles.displayInline;

    let banner = null;
    if (this.props.children) {
      if (this.props.elementWidthDesktop === 25) {
        for (let i = 0; i < this.props.children.length; i = i + 4) {
          let child = this.props.children[i];
          let child1 = this.props.children[i + 1];
          let child2 = this.props.children[i + 2];
          let child3 = this.props.children[i + 3];
          // let child4 = this.props.children[i + 4];
          // let child5 = this.props.children[i + 5];
          let bannerImage = "";
          let bannerUrl = "";
          if (this.props.banners && this.props.banners.heroBanners) {
            banner = this.props.banners.heroBanners.find(b => {
              // if (this.props.view === LIST) {
              //   return b.plpBannerPosition === (i / 2) + 1;
              // } else if (this.props.view === GRID) {

              return b.plpBannerPosition === i / 4;
              // }
              // return false;
            });

            let newbanner = this.props.banners.heroBanners.find(indexObj => {
              return (
                indexObj.plpBannerTitle && indexObj.plpBannerTitle === "desktop"
              );
            });

            if (newbanner) {
              bannerImage = newbanner.plpBannerImage;
              bannerUrl = newbanner.redirectionURL;
            } else {
              if (this.props.banners.heroBanners[1]) {
                if (this.props.banners.heroBanners[1].plpBannerImage) {
                  bannerImage = this.props.banners.heroBanners[1]
                    .plpBannerImage;
                }
                if (this.props.banners.heroBanners[1].redirectionURL) {
                  bannerUrl = this.props.banners.heroBanners[1].redirectionURL;
                }
              }
            }
          }

          str.push(
            <React.Fragment>
              <MediaQuery query="(min-device-width: 1025px)">
                <div
                  className={displayClass}
                  onClick={() => {
                    this.recordScreenScroll();
                  }}
                >
                  {banner && banner.plpBannerImage ? (
                    <a href={bannerUrl}>
                      <img
                        alt="bannerimg"
                        src={bannerImage}
                        key={i + 161}
                        style={{
                          width: "100%",
                          margin:
                            banner && banner.plpBannerImage ? "10px 0" : "",
                          maxHeight: "180px"

                          // marginLeft: this.props.view === LIST ? "0" : "-100%"
                        }}
                      />
                    </a>
                  ) : null}
                  {child ? (
                    <React.Fragment>
                      {this.renderPlpBanner(i)}
                      <div
                        className={
                          this.props.electronicView
                            ? styles.electronicViewElement
                            : styles.element
                        }
                        style={{
                          width: this.props.electronicView
                            ? { width: "100%" }
                            : child.props && child.props.gridWidthDesktop
                            ? `${child.props.gridWidthDesktop}%`
                            : `${this.props.elementWidthDesktop}%`,

                          padding: `${this.props.offset / 2}px`
                        }}
                      >
                        {child}
                      </div>
                    </React.Fragment>
                  ) : null}
                  {child1 ? (
                    <React.Fragment>
                      {this.renderPlpBanner(i + 1)}
                      <div
                        className={
                          this.props.electronicView
                            ? styles.electronicViewElement
                            : styles.element
                        }
                        style={{
                          width: this.props.electronicView
                            ? { width: "100%" }
                            : child1.props && child1.props.gridWidthDesktop
                            ? `${child1.props.gridWidthDesktop}%`
                            : `${this.props.elementWidthDesktop}%`,

                          padding: `${this.props.offset / 2}px`
                        }}
                      >
                        {child1}
                      </div>
                    </React.Fragment>
                  ) : null}
                  {child2 ? (
                    <React.Fragment>
                      {this.renderPlpBanner(i + 2)}
                      <div
                        className={
                          this.props.electronicView
                            ? styles.electronicViewElement
                            : styles.element
                        }
                        style={{
                          width: this.props.electronicView
                            ? { width: "100%" }
                            : child2.props && child2.props.gridWidthDesktop
                            ? `${child1.props.gridWidthDesktop}%`
                            : `${this.props.elementWidthDesktop}%`,

                          padding: `${this.props.offset / 2}px`
                        }}
                      >
                        {child2}
                      </div>
                    </React.Fragment>
                  ) : null}
                  {child3 ? (
                    <React.Fragment>
                      {this.renderPlpBanner(i + 3)}
                      <div
                        className={
                          this.props.electronicView
                            ? styles.electronicViewElement
                            : styles.element
                        }
                        style={{
                          width: this.props.electronicView
                            ? { width: "100%" }
                            : child3.props && child3.props.gridWidthDesktop
                            ? `${child1.props.gridWidthDesktop}%`
                            : `${this.props.elementWidthDesktop}%`,

                          padding: `${this.props.offset / 2}px`
                        }}
                      >
                        {child3}
                      </div>
                    </React.Fragment>
                  ) : null}
                  {/* {child4 ? (
                    <div
                      className={
                        this.props.electronicView
                          ? styles.electronicViewElement
                          : styles.element
                      }
                      style={{
                        width: this.props.electronicView
                          ? { width: "100%" }
                          : child4.props && child4.props.gridWidthDesktop
                            ? `${child1.props.gridWidthDesktop}%`
                            : `${this.props.elementWidthDesktop}%`,

                        padding: `${this.props.offset / 2}px`
                      }}
                    >
                      {child4}
                    </div>
                  ) : null}
                  {child5 ? (
                    <div
                      className={
                        this.props.electronicView
                          ? styles.electronicViewElement
                          : styles.element
                      }
                      style={{
                        width: this.props.electronicView
                          ? { width: "100%" }
                          : child5.props && child5.props.gridWidthDesktop
                            ? `${child1.props.gridWidthDesktop}%`
                            : `${this.props.elementWidthDesktop}%`,

                        padding: `${this.props.offset / 2}px`
                      }}
                    >
                      {child5}
                    </div>
                  ) : null} */}
                </div>
              </MediaQuery>
            </React.Fragment>
          );
        }
      } else if (this.props.elementWidthDesktop === 33.33) {
        for (let i = 0; i < this.props.children.length; i = i + 3) {
          let child = this.props.children[i];
          let child1 = this.props.children[i + 1];
          let child2 = this.props.children[i + 2];
          let child3 = this.props.children[i + 3];
          // let child4 = this.props.children[i + 4];
          // let child5 = this.props.children[i + 5];
          let bannerImage = "";
          let bannerUrl = "";
          if (this.props.banners && this.props.banners.heroBanners) {
            banner = this.props.banners.heroBanners.find(b => {
              // if (this.props.view === LIST) {
              //   return b.plpBannerPosition === (i / 2) + 1;
              // } else if (this.props.view === GRID) {
              return b.plpBannerPosition === i / 3;
              // }
              // return false;
            });

            let newbanner = this.props.banners.heroBanners.find(indexObj => {
              return (
                indexObj.plpBannerTitle && indexObj.plpBannerTitle === "desktop"
              );
            });

            if (newbanner) {
              bannerImage = newbanner.plpBannerImage;
              bannerUrl = newbanner.redirectionURL;
            } else {
              if (this.props.banners.heroBanners[1]) {
                if (this.props.banners.heroBanners[1].plpBannerImage) {
                  bannerImage = this.props.banners.heroBanners[1]
                    .plpBannerImage;
                }
                if (this.props.banners.heroBanners[1].redirectionURL) {
                  bannerUrl = this.props.banners.heroBanners[1].redirectionURL;
                }
              }
            }
          }

          str.push(
            <React.Fragment>
              <MediaQuery query="(min-device-width: 1025px)">
                <div
                  className={displayClass}
                  onClick={() => {
                    this.recordScreenScroll();
                  }}
                >
                  {banner && banner.plpBannerImage ? (
                    <a
                      href={bannerUrl}
                      // onClick={this.recordScreenScroll()}
                    >
                      <img
                        alt="bannerimg"
                        src={bannerImage}
                        key={i + 161}
                        style={{
                          width: "100%",
                          margin:
                            banner && banner.plpBannerImage ? "10px 0" : "",
                          maxHeight: "180px"

                          // marginLeft: this.props.view === LIST ? "0" : "-100%"
                        }}
                      />
                    </a>
                  ) : null}
                  {child ? (
                    <React.Fragment>
                      {this.renderPlpBanner(i)}
                      <div
                        className={
                          this.props.electronicView
                            ? styles.electronicViewElement
                            : styles.element
                        }
                        style={{
                          width:
                            child.props && child.props.gridWidthDesktop
                              ? `${child.props.gridWidthDesktop}%`
                              : `${this.props.elementWidthDesktop}%`,

                          padding: `${this.props.offset / 2}px`
                        }}
                      >
                        {child}
                      </div>
                    </React.Fragment>
                  ) : null}
                  {child1 ? (
                    <React.Fragment>
                      {this.renderPlpBanner(i + 1)}
                      <div
                        className={
                          this.props.electronicView
                            ? styles.electronicViewElement
                            : styles.element
                        }
                        style={{
                          width:
                            child1.props && child1.props.gridWidthDesktop
                              ? `${child1.props.gridWidthDesktop}%`
                              : `${this.props.elementWidthDesktop}%`,

                          padding: `${this.props.offset / 2}px`
                        }}
                      >
                        {child1}
                      </div>
                    </React.Fragment>
                  ) : null}
                  {child2 ? (
                    <React.Fragment>
                      {this.renderPlpBanner(i + 2)}
                      <div
                        className={
                          this.props.electronicView
                            ? styles.electronicViewElement
                            : styles.element
                        }
                        style={{
                          width:
                            child1.props && child1.props.gridWidthDesktop
                              ? `${child1.props.gridWidthDesktop}%`
                              : `${this.props.elementWidthDesktop}%`,

                          padding: `${this.props.offset / 2}px`
                        }}
                      >
                        {child2}
                      </div>
                    </React.Fragment>
                  ) : null}
                  {/* comment............ */}
                  {/* {child3 ? (
                    <div
                      className={
                        this.props.electronicView
                          ? styles.electronicViewElement
                          : styles.element
                      }
                      style={{
                        width:
                          child1.props && child1.props.gridWidthDesktop
                            ? `${child1.props.gridWidthDesktop}%`
                            : `${this.props.elementWidthDesktop}%`,

                        padding: `${this.props.offset / 2}px`
                      }}
                    >
                      {child3}
                    </div>
                  ) : null} */}
                  {/* {child4 ? (
                    <div
                      className={
                        this.props.electronicView
                          ? styles.electronicViewElement
                          : styles.element
                      }
                      style={{
                        width:
                          child1.props && child1.props.gridWidthDesktop
                            ? `${child1.props.gridWidthDesktop}%`
                            : `${this.props.elementWidthDesktop}%`,

                        padding: `${this.props.offset / 2}px`
                      }}
                    >
                      {child4}
                    </div>
                  ) : null} */}
                  {/* {child5 ? (
                    <div
                      className={
                        this.props.electronicView
                          ? styles.electronicViewElement
                          : styles.element
                      }
                      style={{
                        width:
                          child1.props && child1.props.gridWidthDesktop
                            ? `${child1.props.gridWidthDesktop}%`
                            : `${this.props.elementWidthDesktop}%`,

                        padding: `${this.props.offset / 2}px`
                      }}
                    >
                      {child5}
                    </div>
                  ) : null} */}

                  {/* comment............ */}
                </div>
              </MediaQuery>
            </React.Fragment>
          );
        }
      }
    }
    return str;
  }
  render() {
    return (
      <div className={styles.base}>
        <div
          className={styles.gridHolder}
          style={{
            padding: `${this.props.offset / 2}px`
          }}
        >
          {this.renderEachPlpItem()}
        </div>
      </div>
    );
  }
}
Grid.propTypes = {
  elementWidthDesktop: PropTypes.number,
  elementWidthMobile: PropTypes.number,
  offset: PropTypes.number
};

Grid.defaultProps = {
  elementWidthDesktop: 25,
  elementWidthMobile: 50,
  offset: 10
};
