import React from "react";
import styles from "./ProductDescriptionPage.css";

export default class FlixMediaContainer extends React.Component {
  scripts = [];

  constructor(props) {
    super(props);
    this.state = {
      flixModelNo: null
    };
  }

  componentDidMount() {
    let flixModelNo = this.props.flixModelNo.value;
    let brandName = this.props.brandName.toUpperCase();

    let headID = document.getElementsByTagName("head")[0];
    let flixScript = document.createElement("script");
    let distributor = "13308";
    let language = "in";
    let fallback_language = "";
    flixScript.type = "text/javascript";
    flixScript.async = true;
    flixScript.src = "//media.flixfacts.com/js/loader.js";
    flixScript.setAttribute("data-flix-distributor", distributor);
    flixScript.setAttribute("data-flix-language", language);
    flixScript.setAttribute("data-flix-fallback-language", fallback_language);
    flixScript.setAttribute("data-flix-brand", brandName);
    flixScript.setAttribute("data-flix-mpn", flixModelNo);
    flixScript.setAttribute("data-flix-inpage", "flixinpage");
    flixScript.setAttribute("data-flix-price", "");
    headID.appendChild(flixScript);
    this.setState({ flixModelNo: flixModelNo });
  }

  render() {
    return <div id="flixinpage" className={styles.flixInpage} />;
  }
}
