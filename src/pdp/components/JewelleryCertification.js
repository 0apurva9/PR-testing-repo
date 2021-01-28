import React from "react";
import Logo from "../../general/components/Logo";
import styles from "./JewelleryCertification.css";
import PropTypes from "prop-types";
const IMG_URL = "https://assets.tatacliq.com/medias/sys_master/pwaImg/";
const caratLane = `${IMG_URL}caratlane.png`;
const egl = `${IMG_URL}egl.png`;
const gia = `${IMG_URL}gia.png`;
const gsi = `${IMG_URL}gsi.png`;
const igi = `${IMG_URL}igi.png`;
const orra = `${IMG_URL}orra.png`;
const sgl = `${IMG_URL}sgl.png`;
const tanishq = `${IMG_URL}tanishq.png`;
const ibja = `${IMG_URL}ibja.png`;
const igl = `${IMG_URL}igl.png`;
const agl = `${IMG_URL}agl.png`;
const ags = `${IMG_URL}ags.png`;
const agta = `${IMG_URL}agta.png`;
const dgla = `${IMG_URL}dgla.png`;
const gii = `${IMG_URL}gii.png`;
const gubelin = `${IMG_URL}gubelin.png`;
const hrd = `${IMG_URL}hrd.png`;
const pgi = `${IMG_URL}pgi.png`;
const bis = `${IMG_URL}bis.png`;
const idl = `${IMG_URL}idl.png`;
const jagdamba = `${IMG_URL}jagdamba.png`;
const nibr = `${IMG_URL}nibr.png`;

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
          {this.props.certifications.map((val, i) => {
            return (
              <div className={styles.logoHolder} key = {i}>
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
