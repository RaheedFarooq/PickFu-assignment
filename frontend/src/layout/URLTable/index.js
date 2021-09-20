import React, { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import CustomTable from "../../common/CustomTable";
import { getPopularLinks } from "../../services";
import { tableDataParser } from "../../utils";
import "./styles.scss";
import SectionHeader from "./SectionHeader";

function URLTable() {
  const [tableData, setTableData] = useState(null);
  const [dataRequested, setDataRequested] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getPopularLinks().then((res) => {
      setTableData(tableDataParser(res));
      setLoading(false);
    });
  }, [dataRequested]);

  return (
    <Row
      as="section"
      className="d-flex flex-column align-items-center justify-content-center text-center m-0 py-5"
    >
      <Col xs="full" md={11} lg={7}>
        <SectionHeader
          loading={loading}
          heading="Popular Links"
          reloadHandler={setDataRequested}
        />
        {tableData?.length ? (
          <CustomTable data={tableData} />
        ) : (
          <div className="text-primary">
            No Data to show, please click the refresh icon after creating your
            url.
          </div>
        )}
      </Col>
    </Row>
  );
}

export default URLTable;
