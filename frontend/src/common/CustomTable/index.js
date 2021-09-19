import React, { memo } from "react";
import { Table } from "react-bootstrap";
import { TABLE_KEY_MAPPINGS } from "./constants";
import PropTypes from "prop-types";
import "./styles.scss";

function CustomTable({ data }) {
  const headings = data.length ? Object.keys(data[0]) : null;
  return (
    <div className="table-responsive small">
      <Table striped bordered hover variant="secondary">
        <thead>
          <tr>
            {headings &&
              headings.map((heading) => (
                <td key={heading}>{TABLE_KEY_MAPPINGS[heading]}</td>
              ))}
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((row) => (
              <tr key={row.url}>
                {Object.entries(row).map(([key, val]) => {
                  return ["tiny", "url"].includes(key) ? (
                    <td key={val}>
                      {" "}
                      <a href={val} target="_blank" rel="noreferrer">
                        {val}
                      </a>{" "}
                    </td>
                  ) : (
                    <td key={val}> {val} </td>
                  );
                })}
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
}

CustomTable.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      tiny: PropTypes.string,
      url: PropTypes.string,
      hit_rate: PropTypes.number,
    })
  ),
};

export default memo(CustomTable);
