import React, { Component } from "react";
import styles from "./SizeTable.css";
export default class SizeTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      header: null,
      details: null
    };
  }

  getHeader = data => {
    let header = [];
    data &&
      data.sizeGuideList &&
      data.sizeGuideList.map(val => {
        if (val.dimensionSize) {
          header.push("SIZE");
        }
      });
    data &&
      data.sizeGuideList &&
      data.sizeGuideList.map(val => {
        return val.dimensionList.map(value => {
          header.push(value.dimension);
          if (value.columnPosition && value.columnPosition != null) {
            var temp = header[value.columnPosition];
            header[value.columnPosition] = value.dimension;
            header[header.length] = temp;
          }
          return value.dimension;
        });
      });

    const sizelist = [...new Set([].concat.apply([], header))];
    if (sizelist) {
      header = [...sizelist];
    }
    this.setState({ header });
  };

  componentDidMount() {
    this.getHeader(this.props.data);
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
                    {/* {val.charAt(0).toUpperCase() + val.slice(1).toLowerCase()} */}
                  </div>
                );
              })}
            </div>
            <div className={styles.tableHolder}>
              {this.props.data &&
                this.props.data.sizeGuideList &&
                this.props.data.sizeGuideList.map((val, index) => {
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
