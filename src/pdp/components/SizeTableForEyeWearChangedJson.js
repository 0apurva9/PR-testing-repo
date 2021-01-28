import React, { Component } from "react";
import styles from "./SizeTableForEyeWear.css";
// import styles from "./SizeTable.css";

export default class SizeTableForEyeWearChangedJson extends Component {
  constructor(props) {
    super(props);
    this.state = {
      header: null,
      details: null,
      sizeGuide: null,
      tableDimensionSize: null
    };
  }

  getHeader = data => {
    let header = [];
    data &&
      data.sizeGuideList &&
      data.sizeGuideList[0].dimensionList.map(val => {
        if (val.dimensionSize) {
          header.push("FRAME SIZE");
        }
      });
    data &&
      data.sizeGuideList &&
      data.sizeGuideList[0].dimensionList &&
      data.sizeGuideList[0].dimensionList.map(val => {
        header.push(val.dimension);
        return val.dimension;
      });

    const sizelist = [...new Set([].concat.apply([], header))];
    if (sizelist) {
      header = [...sizelist];
    }
    this.setState({ header });
  };

  getSizeHeader() {
    let dimensionLargeSize = [];
    let dimensionSmallSize = [];
    let dimensionMediumSize = [];
    this.props &&
      this.props.data &&
      this.props.data.sizeGuideList &&
      this.props.data.sizeGuideList[0].dimensionList.map(val => {
        if (val.dimensionSize === "small") {
          dimensionSmallSize.push(val);
        } else if (val.dimensionSize === "medium") {
          dimensionMediumSize.push(val);
        } else if (val.dimensionSize === "large") {
          dimensionLargeSize.push(val);
        }
      });
    // dimensionSize = [...new Set(dimensionSize)];
    let tableDimensionSize = [
      {
        dimensionList: dimensionSmallSize,
        dimensionSize: "Small"
      },
      {
        dimensionList: dimensionMediumSize,
        dimensionSize: "Medium"
      },
      {
        dimensionList: dimensionLargeSize,
        dimensionSize: "Large"
      }
    ];
    this.setState({ tableDimensionSize: tableDimensionSize });
  }

  componentDidMount() {
    this.getHeader(this.props.data);
    this.getSizeHeader();
  }

  componentWillReceiveProps(nextProps) {
    this.getHeader(nextProps.data);
  }

  getdata(data) {
    let value = [];
    value.length = this.state.header && this.state.header.length;
    value.fill("-");

    this.state.header &&
      this.state.header.map((header, key) => {
        data &&
          data.map(val => {
            if (header == val.dimension) {
              return (value[key] = val.dimensionValue);
            }
          });
      });

    return value.slice(1);
  }

  render() {
    var details = "";

    return (
      <div className={styles.tablebase}>
        {this.state.header && (
          <div className={styles.base}>
            <div
              className={
                this.state.header.length > 3
                  ? styles.header
                  : styles.shortHeader
              }
            >
              {this.state.header.map((val, i) => {
                return (
                  <div className={styles.headerLabelHolder} key={i}>
                    {val.toUpperCase()}
                  </div>
                );
              })}
            </div>
            <div className={styles.tableHolder}>
              {this.state.tableDimensionSize &&
                this.state.tableDimensionSize.map((val, index) => {
                  details = this.getdata(val.dimensionList);
                  return (
                    <div
                    key={index}
                      className={
                        this.state.header.length > 3
                          ? styles.tableRow
                          : styles.shortTableRow
                      }
                    >
                      <div className={styles.tableData}>
                        {val.dimensionSize}
                      </div>

                      {details &&
                        details.map((data, i) => {
                          return <div className={styles.tableData} key={i}>{data}</div>;
                        })}
                    </div>
                  );
                })}
            </div>
          </div>
        )}
      </div>
    );
  }
}
