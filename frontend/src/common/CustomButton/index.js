import React from "react";
import { Button } from "react-bootstrap";
import PropTypes from "prop-types";

function CustomButton({ text, clickHandler, type, ...restProps }) {
  return (
    <Button onClick={clickHandler} type={type || "button"} {...restProps}>
      {text}
    </Button>
  );
}

CustomButton.propTypes = {
  text: PropTypes.string,
  type: PropTypes.string,
  clickHandler: PropTypes.func.isRequired,
};

export default CustomButton;
