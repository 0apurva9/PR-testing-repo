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
            image={this.props.data[0].imageURL}
            logo={this.props.data[0].brandLogo}
            label={this.props.data[0].title}
            follow={this.props.data[0].isFollowing}
            key={this.props.data[0].id}
            webUrl={this.props.data[0].webURL}
            brandId={this.props.data[0].id}
            isFollowing={this.props.data[0].isFollowing}
            onClick={val => this.onClick(val)}
          />
        </div>
        <div className={styles.rightSection}>
          <div className={styles.rowFirst}>
            <div className={styles.smallCardHolder}>
              <NewBrand
                image={this.props.data[1].imageURL}
                logo={this.props.data[1].brandLogo}
                label={this.props.data[1].title}
                key={this.props.data[1].id}
                webUrl={this.props.data[1].webURL}
                brandId={this.props.data[1].id}
                isFollowing={this.props.data[1].isFollowing}
                onClick={val => this.onClick(val)}
              />
            </div>
            <div className={styles.smallCardHolder}>
              <NewBrand
                image={this.props.data[2].imageURL}
                logo={this.props.data[2].brandLogo}
                label={this.props.data[2].title}
                key={this.props.data[2].id}
                webUrl={this.props.data[2].webURL}
                brandId={this.props.data[2].id}
                isFollowing={this.props.data[2].isFollowing}
                onClick={val => this.onClick(val)}
              />
            </div>
          </div>
          <div className={styles.rowFirst}>
            <div className={styles.smallCardHolder}>
              <NewBrand
                image={this.props.data[3].imageURL}
                logo={this.props.data[3].brandLogo}
                label={this.props.data[3].title}
                key={this.props.data[3].id}
                webUrl={this.props.data[3].webURL}
                brandId={this.props.data[3].id}
                isFollowing={this.props.data[3].isFollowing}
                onClick={val => this.onClick(val)}
              />
            </div>
            <div className={styles.smallCardHolder}>
              <NewBrand
                image={this.props.data[4].imageURL}
                logo={this.props.data[4].brandLogo}
                label={this.props.data[4].title}
                key={this.props.data[4].id}
                webUrl={this.props.data[4].webURL}
                brandId={this.props.data[4].id}
                isFollowing={this.props.data[4].isFollowing}
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
