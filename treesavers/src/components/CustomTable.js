import React from "react";
import { Table } from "react-bootstrap";
import moment from "moment";

const CustomTHead = [
  "Date",
  "Time",
  "Location",
  "Noise",
  "Angle (deg)",
  "Temp",
];

const CustomTable = ({ THead = CustomTHead, data = {} }) => {
  const TBody = [];
  let keys = Object.keys(data);
  for (let i = keys.length - 1; i >= 0; --i) {
    //since sorting is expensive, this one will take care of that.
    //latest entries will be first
    let key = keys[i];
    //data[key].date is unix epoch in seconds
    let date = new Date(parseInt(data[key].date) * 1000).getTime()/1000;
    TBody.push([
      moment.unix(date).format("D-M-YYYY"),
      moment.unix(date).format("h:m A"),
      data[key].location,
      data[key].noise ? "Detected" : "Normal",
      data[key].angle,
      data[key].temp ? "High" : "Normal",
    ]);
  }
  return (
    <div
      //  padding: "2rem", backgroundColor: "white",borderRadius:"1rem"
      style={{ marginTop: "1rem", maxHeight: 500, overflowY: "auto" }}
    >
      <div className="table-above-radius" />
      <Table responsive borderless striped hover className="text-center">
        <thead style={{ color: "#3b3b3b" }}>
          <tr>
            {THead.map((val, idx) => (
              <th key={val + idx} className="text-nowrap">
                {val}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="table--border">
          {TBody.map((row, idx) => (
            <tr
              className="text-nowrap"
              key={idx}
              id={row[3] > 100 ? "device-danger" : null}
            >
              {row.map((cellValue, idx) => (
                <td key={`${idx}1`}>{cellValue}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="table-below-radius" />
    </div>
  );
};

export default CustomTable;
