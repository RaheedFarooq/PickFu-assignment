import React, { Fragment } from "react";
import { FormControl } from "react-bootstrap";
import PropTypes from "prop-types";
import "./styles.scss";

function InputField({ className, type, changeHandler, error, ...restProps }) {
  return (
    <Fragment>
      <FormControl
        onChange={changeHandler}
        className={className}
        type={type}
        {...restProps}
      />
      {error && <small className="position-absolute url-error">{error}</small>}
    </Fragment>
  );
}

InputField.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
  changeHandler: PropTypes.func.isRequired,
  error: PropTypes.string,
};

export default InputField;
