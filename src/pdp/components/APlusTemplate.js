import React from "react";
import APlusTemplate1 from "./APlusTemplate1";
import APlusTemplate2 from "./APlusTemplate2";
import APlusTemplate3 from "./APlusTemplate3";
export default class APlusTemplate extends React.Component {
  render() {
    const data = {};
    this.props.productContent
      .sort((a, b) => {
        if (a.key < b.key) {
          return -1;
        }
        if (a.key > b.key) {
          return 1;
        }
        return 0;
      })
      .map(val => {
        return val;
      })
      .forEach((val, i) => {
        if (val.key.slice(0, -1) in data) {
          data[val.key.slice(0, -1)].push(val);
        } else {
          data[val.key.slice(0, -1)] = [];
          data[val.key.slice(0, -1)].push(val);
        }
      });
    let APlusContentType =
      this.props.template && this.props.template.split("_")[2];

    return (
      <div>
        {data && APlusContentType === "1" && <APlusTemplate1 data={data} />}
        {data && APlusContentType === "2" && <APlusTemplate2 data={data} />}
        {data && APlusContentType === "3" && <APlusTemplate3 data={data} />}
      </div>
    );
  }
}
