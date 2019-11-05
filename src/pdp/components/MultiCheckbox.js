import React from "react";
import PropTypes from "prop-types";

const MultiCheckbox = ({
  type = "checkbox",
  name,
  checked,
  onChange,
  className,
  id,
  value
}) => (
  <input
    className={className}
    type={type}
    name={name}
    id={id}
    checked={checked}
    value={value}
    onChange={onChange}
  />
);

MultiCheckbox.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.func.className,
  id: PropTypes.string,
  value: PropTypes.object
};

export default MultiCheckbox;
