import React from "react";
import BannerDesktopNew from "./BannerDesktopNew";
import PropTypes from "prop-types";
import HomeSkeleton from "../../general/components/HomeSkeleton.js";
import styles from "./HeroBanner.css";
export default class LuxeHeroBannerCarousel extends React.Component {
    renderBanner = val2 => {
        const { feedComponentData } = this.props;
        if (!this.props.loading) {
            if (val2 && val2.length >= 1) {
                return <BannerDesktopNew {...feedComponentData} val2={val2} />;
            }
        } else {
            return <HomeSkeleton />;
        }
    };

    render() {
        let val =
            this.props.feedComponentData &&
            this.props.feedComponentData.items &&
            this.props.feedComponentData.items.length > 0 &&
            this.props.feedComponentData.items;
        // construct an array of arrays where each array at a given position holds 2 images
        let val2 = val.reduce(function(accumulator, currentValue, currentIndex, val) {
            if (currentIndex % 2 === 0) accumulator.push(val.slice(currentIndex, currentIndex + 2));
            return accumulator;
        }, []);

        return (
            <div className={this.props.positionInFeed === 0 ? styles.base : styles.marginTopWithBase}>
                {this.renderBanner(val2)}
            </div>
        );
    }
}
LuxeHeroBannerCarousel.propTypes = {
    loading: PropTypes.bool,
    positionInFeed: PropTypes.number,
    feedComponentData: PropTypes.shape({
        items: PropTypes.array,
        dimension: PropTypes.string,
        data: PropTypes.shape({
            items: PropTypes.arrayOf(
                PropTypes.shape({
                    brandLogo: PropTypes.string,
                    title: PropTypes.string,
                    imageURL: PropTypes.string,
                })
            ),
        }),
    }),
};
