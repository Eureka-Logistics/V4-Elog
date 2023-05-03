import React from "react";
import { Table } from "react-bootstrap";

function IsiItungan({destination , via , item , berat ,qty ,exp}) {
  return (
    <div>
      <Table responsive>
        <thead>
          <tr style={{ fontWeight: "bold", backgroundColor: "#dff0d8" }}>
            <td>No</td>
            <td>Destination 1</td>
            <td>Via</td>
            <td>Item</td>
            <td>Berat</td>
            <td>Qyt</td>
            <td>Exp</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>{destination}</td>
            <td>{via}</td>
            <td>{item}</td>
            <td>{berat}</td>
            <td>{qty}</td>
            <td>-</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

export default IsiItungan;
