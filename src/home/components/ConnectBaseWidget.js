import React from "react";
import styles from "./ConnectBaseWidget.css";
import MediaQuery from "react-responsive";
import ConnectDescription from "./ConnectDescription";
import ImageFlexible from "../../general/components/ImageFlexible";
import Icon from "../../xelpmoc-core/Icon";
import PropTypes from "prop-types";
export default class ConnectBaseWidget extends React.Component {
  handleClick = () => {
    if (this.props.onClick) {
      this.props.onClick();
    }
  };

  handleClickOnLink = event => {
    event.preventDefault();
  };

  render() {
    let data = this.props;

    return (
      <div className={styles.base}>
        <ImageFlexible image={data.backgroundImageURL} />
        <div className={styles.content}>
          <React.Fragment>
            <MediaQuery query="(max-device-width: 1024px)">
              <div className={styles.header}>
                <div className={styles.iconBase}>
                  <div className={styles.iconHolder}>
                    <Icon image={data.imageURL} size={50} />
                  </div>
                  <div className={styles.text}>Connect</div>
                </div>
                <div className={styles.heading}>{data.description}</div>
              </div>
              {data.items &&
                data.items.map((datum, i) => {
                  return (
                    <ConnectDescription
                      key={i}
                      title={datum.title}
                      description={datum.description}
                      imageURL={datum.imageURL}
                    />
                  );
                })}
              <div className={styles.buttonBox}>
                <div
                  className={styles.button}
                  onClick={() => {
                    this.handleClick();
                  }}
                >
                  know more
                </div>
              </div>
            </MediaQuery>
            <MediaQuery query="(min-device-width: 1025px)">
              <a
                href={data.webURL}
                target="_blank"
                rel="noreferrer"
                onClick={event => this.handleClickOnLink(event)}
              >
                <div className={styles.dataHolder}>
                  <div className={styles.textAndDescription}>
                    <div className={styles.header}>
                      <div className={styles.iconBase}>
                        {data.iconImageURL && (
                          <div className={styles.iconHolder}>
                            <Icon image={data.iconImageURL} size={50} />
                          </div>
                        )}
                      </div>
                      {this.props.heading &&
                        !this.props.heading === "" && (
                          <div className={styles.heading}>
                            {this.props.heading}
                          </div>
                        )}

                      <div className={styles.descriptionHolder}>
                        {data.description}
                      </div>
                    </div>
                    {data.btnText && (
                      <div className={styles.buttonBox}>
                        <div
                          className={styles.button}
                          onClick={() => {
                            this.handleClick();
                          }}
                        >
                          {data.btnText}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </a>
            </MediaQuery>
          </React.Fragment>
        </div>
      </div>
    );
  }
}
ConnectBaseWidget.propTypes = {
  data: PropTypes.shape({
    backgroundImageURL: PropTypes.string,
    description: PropTypes.string.apply,
    imageURL: PropTypes.string,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        imageURL: PropTypes.string,
        title: PropTypes.string,
        description: PropTypes.string
      })
    )
  }),
  onClick: PropTypes.func,
  backgroundImageURL: PropTypes.string,
  imageURL: PropTypes.string,
  description: PropTypes.string,
  items: PropTypes.array,
  iconImageURL: PropTypes.string,
  heading: PropTypes.string,
  btnText: PropTypes.string,
  webURL: PropTypes.string
};
ConnectBaseWidget.defaultProps = {
  heading: "Sample desc for connect banner comp"
};
