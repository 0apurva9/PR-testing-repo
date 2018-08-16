import React from "react";
import Logo from "../../general/components/Logo";
import styles from "./JewelleryCertification.css";
import PropTypes from "prop-types";
import caratLane from "./img/star-fill.svg";
import egl from "./img/star-fill.svg";
import gia from "./img/star-fill.svg";
import gsi from "./img/star-fill.svg";
import igi from "./img/star-fill.svg";
import orra from "./img/star-fill.svg";
import platinum from "./img/star-fill.svg";
import sgl from "./img/star-fill.svg";
import tanishq from "./img/star-fill.svg";
import ibja from "./img/star-fill.svg";
import igl from "./img/star-fill.svg";
import agl from "./img/star-fill.svg";
import ags from "./img/star-fill.svg";
import agta from "./img/star-fill.svg";
import dgla from "./img/star-fill.svg";
import gii from "./img/star-fill.svg";
import gubelin from "./img/star-fill.svg";
import hrd from "./img/star-fill.svg";
import pgi from "./img/star-fill.svg";
import bis from "./img/star-fill.svg";
import idl from "./img/star-fill.svg";
import jagdamba from "./img/star-fill.svg";
import nibr from "./img/star-fill.svg";

export default class JewelleryCertification extends React.Component {
  getCertificationImage = val => {
    let image = "";
    switch (val) {
      case "AGL":
        image = agl;
        break;
      case "AGS":
        image = ags;
        break;
      case "AGTA":
        image = agta;
        break;
      case "BIS":
        image = bis;
        break;
      case "DGLA":
        image = dgla;
        break;
      case "EGL":
        image = egl;
        break;
      case "GIA":
        image = gia;
        break;
      case "GII":
        image = gii;
        break;
      case "GSI":
        image = gsi;
        break;
      case "Gubelin":
        image = gubelin;
        break;
      case "HRD":
        image = hrd;
        break;
      case "IBJA":
        image = ibja;
        break;
      case "IDL":
        image = idl;
        break;
      case "IGI":
        image = igi;
        break;
      case "IGL":
        image = igl;
        break;
      case "NIBR":
        image = nibr;
        break;
      case "ORRA":
        image = orra;
        break;
      case "PGI":
        image = pgi;
        break;
      case "SGL":
        image = sgl;
        break;
      case "Tanishq":
        image = tanishq;
        break;
      case "Sri Jagdamba Pearls":
        image = jagdamba;
        break;
      case "CaratLane":
        image = caratLane;
        break;
      default:
        image = "";
        break;
    }
    return image;
  };
  render() {
    return (
      <div className={styles.base}>
        <div className={styles.header}>Certified by -</div>
        <div className={styles.logo}>
          {this.props.certifications.map(val => {
            return (
              <div className={styles.logoHolder}>
                <Logo image={this.getCertificationImage(val)} />{" "}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

JewelleryCertification.propTypes = {
  certifications: PropTypes.arrayOf(
    PropTypes.oneOf([
      "AGL",
      "AGS",
      "AGTA",
      "BIS",
      "DGLA",
      "EGL",
      "GSI",
      "GIA",
      "GII",
      "Gubelin",
      "HRD",
      "IBJA",
      "IGI",
      "IGL",
      "ORRA",
      "PGI",
      "SGL",
      "CaratLane",
      "Tanishq",
      "Sri Jagdamba Pearls",
      "NIBR",
      "IDL"
    ])
  )
};
