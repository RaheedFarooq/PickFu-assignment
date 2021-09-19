import React, { Fragment, useCallback, useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { minifyURLService } from "../../services";
import CustomButton from "../../common/CustomButton";
import InputField from "../../common/CustomInput";
import { validUrl } from "../../utils";
import "./styles.scss";
import { BASE_PATH } from "../../services/constants";

import AlertComponent from "../../common/AlertComponent";

function Main() {
  const [error, setError] = useState("");
  const [input, setInput] = useState("");
  const [url, setUrl] = useState("");
  const [copy, setCopy] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (url) {
      setUrl("");
      setInput("");
      setError("");
    } else {
      if (validUrl(input)) {
        minifyURLService(input)
          .then((res) => setUrl(`${BASE_PATH}/${res.shortened_url}`))
          .catch((err) => setError(JSON.parse(err.message).message));
      } else setError("Input is not a valid URL");
    }
  };

  useEffect(() => {
    if (error || copy)
      setTimeout(() => {
        setError("");
        setCopy(false);
      }, 1000);
  }, [error, copy]);

  return (
    <Row
      as="section"
      className="main d-flex flex-column align-items-center justify-content-center text-center m-0"
    >
      <Col xs="full">
        <h1>PickFu URL Shortener</h1>
      </Col>
      <Col xs={9} lg={7} className="position-relative">
        {url ? (
          <InputField // Component Shown on URL creation
            className="bg-background url-input text-lowercase url-response-text"
            readOnly
            value={url}
            onClick={() => {
              navigator.clipboard.writeText(url);
              setCopy(true);
            }}
          />
        ) : (
          <InputField // Input component that takes the original URL
            name="url"
            value={input}
            className="bg-background url-input text-lowercase"
            error={error}
            changeHandler={(e) => setInput(e.target.value.toLowerCase())}
          />
        )}
      </Col>
      <Col xs="auto">
        <CustomButton // Submit Button
          className="align-self-center"
          text={url ? "Go Back" : "Generate"}
          disabled={!input}
          variant={"tertiary"}
          className=" my-4"
          clickHandler={submitHandler}
        />
      </Col>
      {copy && (
        <AlertComponent variant={"tertiary"} message="Copied to Clipboard" />
      )}
    </Row>
  );
}

export default Main;
