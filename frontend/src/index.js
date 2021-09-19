import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import ReactDOM from "react-dom";
import CustomTable from "./common/CustomTable";
import Header from "./layout/Header";
import Main from "./layout/Main";
import URLTable from "./layout/URLTable";
import "./styles.scss";

ReactDOM.render(
  <React.StrictMode>
    <Header />
    <Container as={"article"} fluid className="p-0">
      <Main />
      <URLTable />
    </Container>
  </React.StrictMode>,
  document.getElementById("root")
);
