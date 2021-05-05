import React from "react";
import PropTypes from "prop-types";
import styles from "../../general/components/BannerDesktop.css";
export default class BannerDesktopNew extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            juke: this.props.val2 && this.props.val2.length ? this.props.val2.length : 0,
            position: 0,
        };
    }

    changePosition(i) {
        if (i !== undefined) {
            this.setState({ juke: this.props.val2.length }, () => {
                this.setState({ position: i });
            });
        }
    }

    autoRun = () => {
        setTimeout(() => {
            this.goForward();
            this.autoRun();
        }, this.props.interval * 1000);
    };

    componentDidMount() {
        if (this.props.interval) {
            this.autoRun();
        }
    }

    goForward = () => {
        const childCount = this.props.val2.length;
        if ((Math.abs(this.state.position) + 1) % childCount === 0) {
            this.setState(
                {
                    juke: this.state.juke - this.props.val2.length,
                },
                () => {
                    this.setState({ position: this.state.position + 1 });
                }
            );
        } else {
            this.setState({ position: this.state.position + 1 });
        }
    };

    goBack = () => {
        const childCount = this.props.val2.length;
        if (Math.abs(this.state.position) === Math.abs(this.state.juke)) {
            this.setState(
                {
                    juke: this.state.juke + childCount,
                },
                () => {
                    this.setState({ position: this.state.position - 1 });
                }
            );
        } else {
            this.setState({ position: this.state.position - 1 });
        }
    };

    render() {
        const translationAmount = -(100 * this.state.position);
        const transform = `translateX(${translationAmount}%)`;
        const style = {
            transform: transform,
        };
        const jukeTranslationAmount = -(100 * this.state.juke);
        const jukeTransform = `translateX(${jukeTranslationAmount}%)`;
        const jukeStyle = {
            transform: jukeTransform,
        };
        return (
            <div className={styles.base}>
                <div className={styles.rightArrow} onClick={() => this.goForward()} />
                <div className={styles.leftArrow} onClick={() => this.goBack()} />
                <div className={styles.slider} style={jukeStyle}>
                    <div style={style} className={styles.imageHolder}>
                        {this.props.val2.map((datum, i) => {
                            return (
                                <div className={styles.item} key={i}>
                                    <div className={styles.anchor}>
                                        <a href={datum[0].webURL} className={styles.newslidelink}>
                                            <img
                                                src={datum[0].imageURL}
                                                alt="slider"
                                                className={styles.newSlideImg}
                                            ></img>
                                        </a>
                                        <a href={datum[1].webURL} className={styles.newslidelink}>
                                            <img
                                                src={datum[1].imageURL}
                                                alt="slider"
                                                className={styles.newSlideImg}
                                            ></img>
                                        </a>
                                    </div>
                                </div>
                            );
                        })}

                        {this.props.val2.map((datum, i) => {
                            return (
                                <div className={styles.item} key={i}>
                                    <a href={datum[0].webURL} className={styles.newslidelink}>
                                        <img src={datum[0].imageURL} alt="slider" className={styles.newSlideImg}></img>
                                    </a>
                                    <a href={datum[1].webURL} className={styles.newslidelink}>
                                        <img src={datum[1].imageURL} alt="slider" className={styles.newSlideImg}></img>
                                    </a>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className={styles.maxWidth}>
                    <div className={styles.nav}>
                        {this.props.val2.map((val, i) => {
                            return (
                                <div
                                    className={
                                        (this.state.position + this.state.juke) % this.props.val2.length === i
                                            ? styles.active
                                            : styles.navButton
                                    }
                                    key={i}
                                    onClick={() => {
                                        this.changePosition(i);
                                    }}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    }
}

BannerDesktopNew.propTypes = {
    interval: PropTypes.number,
    children: PropTypes.node,
    val2: PropTypes.array,
};
BannerDesktopNew.defaultProps = {
    interval: 3,
};
