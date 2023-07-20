import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useHistory } from "react-router-dom";
import DataProfile from "./Form/DataProfile";
import {notification } from "antd";
import { httpClient } from "../../../Api/Api";
import axios from "axios";
import Baseurl from "../../../Api/BaseUrl";
function SamplePage({isiValues}) {
  const [show, setShow] = useState(false);
  const history = useHistory();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (values) => {
    httpClient
      .post("mitra/create-mitra-pic", values)
      .then((response) => {
        const { data } = response;
        notification.success({
          message: "Success",
          description: data.message,
        });
        setTimeout(() => history.push("/tarifmitra"), 1000);
      })
      .catch((error) => {
        notification.error({
          message: "Error",
          description: error.message,
        });
        console.log(error.message);
      });
  };

  const halamantambahmitra = () => {
    history.push(`/mastermitraold/tambahmitra/`);
  };
const datatest = () => {
  console.log(`ini values`,isiValues);

};

const OptionsData = async () => {
  const data = await axios.get(
    `${Baseurl}mitra/get-select-mitraPic`,

    {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem(`token`),
      },
    }
  );
  console.log(data.data, "ini data options");
};

useEffect(() => {
  OptionsData();
}, []);

  return (
    <>
      <Button variant="primary" size="sm" onClick={handleShow}>
        Tambah Mitra
      </Button>

      <Modal show={show} onHide={handleClose} className="modal-xl">
        <Modal.Header closeButton>
          <Modal.Title>New Master Mitra</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DataProfile onSubmit={handleSubmit} />
        </Modal.Body>
       <Modal.Footer>
          {/* <Button type="submit" onClick={datatest}>
            Save
          </Button> */}
          <Button style={{backgroundColor: "grey"}} onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer> 
      </Modal>
    </>
  );
}

export default SamplePage;