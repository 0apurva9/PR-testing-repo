import React from "react";
import PropTypes from "prop-types";
import MediaQuery from "react-responsive";
import styles from "./Grid.css";

export default class Grid extends React.Component {
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
          if (this.props.banners && this.props.banners.heroBanners) {
            banner = this.props.banners.heroBanners.find(b => {
              // if (this.props.view === LIST) {
              //   return b.plpBannerPosition === (i / 2) + 1;
              // } else if (this.props.view === GRID) {

              return b.plpBannerPosition === i / 4;
              // }
              // return false;
            });
          }

          str.push(
            <React.Fragment>
              <MediaQuery query="(min-device-width: 1025px)">
                <div className={displayClass}>
                  {banner && banner.plpBannerImage ? (
                    <a href={banner.redirectionURL}>
                      <img
                        alt="bannerimg"
                        src={banner && banner.plpBannerImage}
                        key={i + 161}
                        style={{
                          width: "100%",
                          margin:
                            banner && banner.plpBannerImage ? "10px 0" : "",
                          maxHeight: "250px"

                          // marginLeft: this.props.view === LIST ? "0" : "-100%"
                        }}
                      />
                    </a>
                  ) : null}
                  {child ? (
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
                  ) : null}
                  {child1 ? (
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
                  ) : null}
                  {child2 ? (
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
                  ) : null}
                  {child3 ? (
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
          if (this.props.banners && this.props.banners.heroBanners) {
            banner = this.props.banners.heroBanners.find(b => {
              // if (this.props.view === LIST) {
              //   return b.plpBannerPosition === (i / 2) + 1;
              // } else if (this.props.view === GRID) {
              return b.plpBannerPosition === i / 3;
              // }
              // return false;
            });
          }

          str.push(
            <React.Fragment>
              <MediaQuery query="(min-device-width: 1025px)">
                <div className={displayClass}>
                  {banner && banner.plpBannerImage ? (
                    <a href={banner.redirectionURL}>
                      <img
                        alt="bannerimg"
                        src={banner && banner.plpBannerImage}
                        key={i + 161}
                        style={{
                          width: "100%",
                          margin:
                            banner && banner.plpBannerImage ? "10px 0" : "",
                          maxHeight: "250px"

                          // marginLeft: this.props.view === LIST ? "0" : "-100%"
                        }}
                      />
                    </a>
                  ) : null}
                  {child ? (
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
                  ) : null}
                  {child1 ? (
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
                  ) : null}
                  {child2 ? (
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
