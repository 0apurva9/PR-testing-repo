import React from "react";
import ExperienceRate from "./ExperienceRate";
import withMultiSelect from "../../higherOrderComponents/withMultiSelect";
import styles from "./ExperienceRateGrid.css";
import ExperienceRatingone from "./img/bad.svg";
import ExperienceRatingTwo from "./img/Bad_Red.svg";
import ExperienceRatingThree from "./img/Ok.svg";
import ExperienceRatingFour from "./img/Ok_red.svg";
import ExperienceRatingFive from "./img/Review.svg";
import ExperienceRatingSix from "./img/Review_Red.svg";
import ExperienceRatingSaven from "./img/good.svg";
import ExperienceRatingEight from "./img/Good_Red.svg";
import ExperienceRatingNine from "./img/love_Red.svg";
import ExperienceRatingTen from "./img/love.svg";
const ExperienceRateGridSelect = class ExperienceRateGrid extends React.Component {
  render() {
    return <div className={styles.base}>{this.props.children}</div>;
  }
};
const ExperienceRateGridWithSelect = withMultiSelect(ExperienceRateGridSelect);
export default class ExperienceRateGrid extends React.Component {
  render() {
    return (
      <ExperienceRateGridWithSelect limit={1}>
        <ExperienceRate
          value="1"
          defaultImage={ExperienceRatingone}
          activeImage={ExperienceRatingTwo}
        />
        <ExperienceRate
          value="2"
          defaultImage={ExperienceRatingThree}
          activeImage={ExperienceRatingFour}
        />
        <ExperienceRate
          value="3"
          defaultImage={ExperienceRatingFive}
          activeImage={ExperienceRatingSix}
        />
        <ExperienceRate
          value="4"
          defaultImage={ExperienceRatingSaven}
          activeImage={ExperienceRatingEight}
        />
        <ExperienceRate
          value="5"
          defaultImage={ExperienceRatingTen}
          activeImage={ExperienceRatingNine}
        />
      </ExperienceRateGridWithSelect>
    );
  }
}
