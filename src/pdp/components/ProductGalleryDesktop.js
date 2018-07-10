import React from "react";
import Image from "../../xelpmoc-core/Image";
import styles from "./ProductGalleryDesktop.css";
const data = [
  "https://i.pinimg.com/564x/eb/3a/2c/eb3a2c2b981176de7a5c83024c1f0614.jpg",
  "https://i.pinimg.com/564x/8d/0a/14/8d0a1416ff5bb5f91c745560323c3dd2.jpg",
  "https://i.pinimg.com/564x/2b/a4/37/2ba4372c8829cb44b66ad65a7eabe784.jpg",
  "https://i.pinimg.com/564x/f3/b2/61/f3b261b5e3911b5a1f2c062cc4a12414.jpg",
  "https://i.pinimg.com/564x/3d/bc/92/3dbc92f28e29c04805efcf6bc398ae8b.jpg"
];
export default class ProductGalleryDesktop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      position: 0,
      previousPage: null,
      nextPage: null
    };
  }
  swapViews(prev, next) {
    if (prev > -1 && next > -1 && next < data.length && prev !== next) {
      this.setState({
        previousPage: prev,
        nextPage: next,
        position: next
      });
    }
  }
  render() {
    return (
      <div className={styles.base}>
        <div className={styles.content}>
          {data.map((val, i) => {
            let imageClass = styles.image;
            if (
              this.state.position === i ||
              this.state.previousPage === i ||
              this.state.nextPage === i
            ) {
              if (this.state.previousPage === i) {
                if (this.state.previousPage < this.state.nextPage) {
                  imageClass = styles.slideOutLeft;
                } else {
                  imageClass = styles.slideOutRight;
                }
              } else if (this.state.nextPage === i) {
                if (this.state.previousPage < this.state.nextPage) {
                  imageClass = styles.slideInRight;
                } else {
                  imageClass = styles.slideInLeft;
                }
              }

              return (
                <div className={imageClass}>
                  <Image image={val} />
                </div>
              );
            } else {
              return null;
            }
          })}
        </div>
        <div className={styles.nav}>
          {data.map((val, i) => {
            const position = this.state.position;
            return (
              <div
                className={position === i ? styles.navActive : styles.navImage}
                onClick={() => {
                  this.swapViews(position, i);
                }}
              >
                <Image image={val} />
              </div>
            );
          })}
        </div>
        <div
          className={styles.navArrow}
          onClick={() => {
            this.swapViews(this.state.position, this.state.position + 1);
          }}
        />
        <div
          className={styles.navArrowBack}
          onClick={() => {
            this.swapViews(this.state.position, this.state.position - 1);
          }}
        />
      </div>
    );
  }
}
