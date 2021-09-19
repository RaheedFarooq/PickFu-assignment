import React, { memo } from "react";
import { Col, Row, Spinner } from "react-bootstrap";
import { ReactComponent as ReloadSvg } from "../../assets/arrow-clockwise.svg";
import PropTypes from "prop-types";

function SectionHeader({ loading, heading, reloadHandler }) {
  return (
    <Row className=" px-32 text-tertiary font-weight-bold text-start justify-content-between">
      <Col xs="auto">
        <h2>{heading}</h2>
      </Col>
      <Col xs="auto" className="my-auto">
        {loading ? (
          <Spinner animation="grow" />
        ) : (
          <ReloadSvg
            width="calc(12px + 2vw)"
            height="calc(12px + 2vw)"
            className="refresh-button"
            onClick={reloadHandler}
          />
        )}
      </Col>
    </Row>
  );
}

SectionHeader.propTypes = {
  loading: PropTypes.bool,
  heading: PropTypes.string,
  reloadHandler: PropTypes.func,
};

export default memo(SectionHeader);
