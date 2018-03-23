import React from "react";
import styles from "./BrandEdit.css";
import FollowedBrand from "./FollowedBrand";
import BrandsToolTip from "./BrandsToolTip";
import PropTypes from "prop-types";
export default class BrandEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      onDelete: false,
      label: this.props.btnText
    };
  }
  onClickButton(brandId, followStatus) {
    if (this.props.onClick) {
      this.props.onClick(brandId, followStatus);
    }
  }
  onShowDelete() {
    this.setState({ onDelete: !this.state.onDelete });
    if (this.state.label === "Edit") {
      this.setState({ label: "Done" });
    } else {
      this.setState({ label: "Edit" });
    }
  }
  render() {
    return (
      <div className={styles.base}>
        <div className={styles.followedBrand}>
          <FollowedBrand
            header={this.props.header}
            onClick={() => this.onShowDelete()}
            btnText={this.state.label}
          />
        </div>
        <div className={styles.iconHolder}>
          {this.props.data.map((val, i) => {
            return (
              <BrandsToolTip
                logo={val.imageURL}
                onDelete={this.state.onDelete}
                key={i}
                onClick={() => this.onClickButton(val.id, val.isFollowing)}
              />
            );
          })}
        </div>
      </div>
    );
  }
}
BrandEdit.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      logo: PropTypes.string,
      value: PropTypes.string
    })
  ),
  btnText: PropTypes.string,
  header: PropTypes.string,
  onClick: PropTypes.func
};
BrandEdit.defaultProps = {
  btnText: "Edit",
  header: "Followed Brands"
};
