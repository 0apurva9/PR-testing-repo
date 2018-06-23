import React from "react";
import NewBrand from "./NewBrand.js";
import styles from "./NewBrandDesktop.css";
import PropTypes from "prop-types";
export default class NewBrandDesktop extends React.Component {
  onClick(val) {
    if (this.props.onClick) {
      this.props.onClick(val);
    }
  }
  render() {
    return (
      <div className={styles.base}>
        <div className={styles.leftSection}>
          <NewBrand
            image={this.props[0].imageURL}
            logo={this.props[0].brandLogo}
            label={this.props[0].title}
            follow={this.props[0].isFollowing}
            key={this.props[0].id}
            webUrl={this.props[0].webURL}
            brandId={this.props[0].id}
            isFollowing={this.props[0].isFollowing}
            onClick={val => this.onClick(val)}
          />
        </div>
        <div className={styles.rightSection}>
          <div className={styles.rowFirst}>
            <div className={styles.smallCardHolder}>
              <NewBrand
                image={this.props[1].imageURL}
                logo={this.props[1].brandLogo}
                label={this.props[1].title}
                key={this.props[1].id}
                webUrl={this.props[1].webURL}
                brandId={this.props[1].id}
                isFollowing={this.props[1].isFollowing}
                onClick={val => this.onClick(val)}
              />
            </div>
            <div className={styles.smallCardHolder}>
              <NewBrand
                image={this.props[2].imageURL}
                logo={this.props[2].brandLogo}
                label={this.props[2].title}
                key={this.props[2].id}
                webUrl={this.props[2].webURL}
                brandId={this.props[2].id}
                isFollowing={this.props[2].isFollowing}
                onClick={val => this.onClick(val)}
              />
            </div>
          </div>
          <div className={styles.rowFirst}>
            <div className={styles.smallCardHolder}>
              <NewBrand
                image={this.props[3].imageURL}
                logo={this.props[3].brandLogo}
                label={this.props[3].title}
                key={this.props[3].id}
                webUrl={this.props[3].webURL}
                brandId={this.props[3].id}
                isFollowing={this.props[3].isFollowing}
                onClick={val => this.onClick(val)}
              />
            </div>
            <div className={styles.smallCardHolder}>
              <NewBrand
                image={this.props[4].imageURL}
                logo={this.props[4].brandLogo}
                label={this.props[4].title}
                key={this.props[4].id}
                webUrl={this.props[4].webURL}
                brandId={this.props[4].id}
                isFollowing={this.props[4].isFollowing}
                onClick={val => this.onClick(val)}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
NewBrandDesktop.propTypes = {
  onClick: PropTypes.func,
  imageURL: PropTypes.string,
  brandLogo: PropTypes.string,
  title: PropTypes.string,
  webURL: PropTypes.string
};
