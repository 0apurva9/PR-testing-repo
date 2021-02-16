import React from "react";
import Loadable from "react-loadable";
import PropTypes from "prop-types";
const ReactPlayer = Loadable({
    loader: () => import("react-player"),
    loading() {
        return <div />;
    },
});
export default class Video extends React.Component {
    render() {
        return (
            <ReactPlayer
                url={this.props.url}
                playing={this.props.playing}
                width="100%"
                height="100%"
                controls={this.props.controls}
                onEnded={this.props.onEnded}
                onPlay={this.props.onPlay}
                light={this.props.light}
            />
        );
    }
}
Video.propTypes = {
    url: PropTypes.string,
    playing: PropTypes.bool,
    controls: PropTypes.bool,
    onEnded: PropTypes.func,
    onPlay: PropTypes.func,
    light: PropTypes.string,
};
