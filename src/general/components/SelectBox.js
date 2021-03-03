import React from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import "react-select/dist/react-select.css";
export default class SelectBox extends React.Component {
  onChange(val) {
    if (this.props.onChange) {
      this.props.onChange(val.value);
    }
  }

  render() {
    let className = "SelectBoxBase";
    if (this.props.borderNone) {
      className = `${className} borderNone`;
    }
    if (this.props.borderBlack) {
      className = `${className} borderBlack`;
    }
    return (
      <div className={className}>
        <Select
          options={this.props.options}
          value={this.props.selected && this.props.selected}
          placeholder={this.props.placeholder}
          disabled={this.props.disabled}
          searchable={this.props.searchable}
          clearable={this.props.clearable}
          onChange={val => this.onChange(val)}
        />
      </div>
    );
  }
}
SelectBox.propTypes = {
  selected: PropTypes.any,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  searchable: PropTypes.bool,
  clearable: PropTypes.bool,
  borderNone: PropTypes.bool,
  borderBlack: PropTypes.bool,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    })
  )
};
SelectBox.defaultProps = {
  selected: null,
  disabled: false,
  searchable: false,
  clearable: false,
  placeholder: "Select"
};
