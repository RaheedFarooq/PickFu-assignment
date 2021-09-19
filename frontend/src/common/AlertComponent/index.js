import React, { Fragment } from "react";
import Alert from "react-bootstrap/Alert";
import PropTypes from "prop-types";
import "./styles.scss";

function AlertComponent({ variant, message }) {
  return (
    <Fragment>
      <div className="alert-message">
        <Alert variant={variant}>{message}</Alert>
      </div>
    </Fragment>
  );
}

AlertComponent.propTypes = {
  variant: PropTypes.string,
  message: PropTypes.string,
};

export default AlertComponent;
