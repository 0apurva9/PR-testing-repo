import React from "react";
import FeedBackRate from "./FeedBackRate";
import PropTypes from "prop-types";
import styles from "./ExperienceRateGrid.css";
export default class FeedBackRateGrid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: this.props.selected,
        };
    }

    onSelect(val, i) {
        this.setState({
            selected: i,
        });
        if (this.props.onSelect) {
            this.props.onSelect(val);
        }
    }

    componentWillReceiveProps(props) {
        if (props.isReset) {
            this.setState({ selected: props.selected });
        }
    }

    render() {
        const dataLength = [
            { ratingText: "1" },
            { ratingText: "2" },
            { ratingText: "3" },
            { ratingText: "4" },
            { ratingText: "5" },
        ];
        return (
            <div className={styles.base}>
                {dataLength &&
                    dataLength.map((val, i) => {
                        return (
                            <FeedBackRate
                                key={i}
                                selected={this.state.selected === i}
                                ratingText={val.ratingText}
                                selectItem={() => this.onSelect(val.ratingText, i)}
                            />
                        );
                    })}
            </div>
        );
    }
}
FeedBackRateGrid.propTypes = {
    onSelect: PropTypes.func,
    selected: PropTypes.number,
    isReset: PropTypes.bool,
};
