import React, { Component } from "react";
import styles from "./SizeTable.css";
const RenderRow = props => {
  return props.keys.map((key, index) => {
    return <td key={props.data[key]}>{props.data[key]}</td>;
  });
};
export default class SizeTableForEyeWearChangedJson extends Component {
  constructor(props) {
    super(props);
    this.state = {
      header: null,
      details: null,
      sizeGuide: null
    };
    // this.getHeader = this.getHeader.bind(this);
    // this.getRowsData = this.getRowsData.bind(this);
    // this.getKeys = this.getKeys.bind(this);
  }
  getHeader = data => {
    let header = [];
    data &&
      data.sizeGuideList &&
      data.sizeGuideList.dimensionList.map(val => {
        if (val.dimensionSize) {
          header.push("FRAME SIZE");
        }
      });
    data &&
      data.sizeGuideList &&
      data.sizeGuideList.dimensionList &&
      data.sizeGuideList.dimensionList.map(val => {
        header.push(val.dimension);
        return val.dimension;
      });

    const sizelist = [...new Set([].concat.apply([], header))];
    if (sizelist) {
      header = [...sizelist];
    }
    this.setState({ header });
    console.log("header==>", header);
  };
  // getHeader = function(){
  //     var keys = this.getKeys();
  //     console.log("keys ===", keys);
  //     return keys.map((key, index)=>{
  //     return <th key={key}>{key.toUpperCase()}</th>
  //     })
  //     }
  // getKeys = function(){
  //     return Object.keys(this.props.data.sizeGuideList.dimensionList[0]);
  //     }
  // getRowsData = function(){
  //     var items = this.props.data.sizeGuideList.dimensionList;
  //     var keys = this.getKeys();
  //     return items.map((row, index)=>{
  //     return <tr key={index}><RenderRow key={index} data={row} keys={keys}/></tr>
  //     })
  //     }
  getSizeHeader() {
    let dimensionLargeSize = [];
    let dimensionSmallSize = [];
    let dimensionMediumSize = [];
    this.props.data.sizeGuideList.dimensionList.map(val => {
      console.log("val===>", val);
      if (val.dimensionSize === "small") {
        dimensionSmallSize.push(val);
      } else if (val.dimensionSize === "medium") {
        dimensionMediumSize.push(val);
      } else if (val.dimensionSize === "large") {
        dimensionLargeSize.push(val);
      }
    });
    // dimensionSize = [...new Set(dimensionSize)];
    console.log(
      "=====",
      dimensionSmallSize,
      dimensionMediumSize,
      dimensionLargeSize
    );
    let tableDimensionSize = [
      {
        dimensionList: dimensionSmallSize
      },
      {
        dimensionList: dimensionMediumSize
      },
      {
        dimensionList: dimensionLargeSize
      }
    ];
    console.log("=== new arresy", tableDimensionSize);
  }
  componentDidMount() {
    this.getHeader(this.props.data);
  }
  componentWillReceiveProps(nextProps) {
    this.getHeader(nextProps.data);
  }

  render() {
    var details = "";
    let sizeGuide = [];

    console.log("details====render>", details);
    return (
      //             <div>
      //  <table>
      //  <thead>
      //  <tr>{this.getHeader()}</tr>
      //  </thead>
      //  <tbody>
      //  {this.getRowsData()}
      //  </tbody>
      //  </table>
      //  </div>
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
              {this.state.header.map(val => {
                return (
                  <div className={styles.headerLabelHolder}>
                    {val.toUpperCase()}
                    {/* {val.charAt(0).toUpperCase() + val.slice(1).toLowerCase()} */}
                  </div>
                );
              })}
            </div>
            <div className={styles.tableHolder}>
              {/* {this.props.data &&
                this.props.data.sizeGuideList &&
                this.props.data.sizeGuideList.dimensionList.map(val => {
					sizeGuide = [... new set(val.dimensionSize)];
                
                  return ( */}
              <div
                className={
                  this.state.header.length > 3
                    ? styles.tableRow
                    : styles.shortTableRow
                }
              >
                {this.getSizeHeader()}

                {/* {details &&
                        details.map((data, i) => {
                          return <div className={styles.tableData}>{data}</div>;
                        })} */}
              </div>
              {/* );
                })} */}
            </div>
          </div>
        )}
      </div>
    );
  }
}
