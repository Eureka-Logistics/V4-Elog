import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom";
import DataProfile from "./Form/DataProfile";
import { notification, Modal } from "antd";
import { httpClient } from "../../../Api/Api";
import axios from "axios";
import Baseurl from "../../../Api/BaseUrl";
function SamplePage({ isiValues }) {
  const [show, setShow] = useState(false);
  const history = useHistory();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const router = useHistory();

  const handleSubmit = (values) => {
    httpClient
      .post("mitra/create-mitra-pic", values)
      .then((response) => {
        const { data } = response;
        notification.success({
          message: "Success",
          description: data.message,
        });
        // setTimeout(() => history.push("/tarifmitra"), 1000);
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
    console.log(`ini values`, isiValues);
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
      <Button
        style={{
          backgroundColor: "#1A5CBF",
          color: "#FFFFFF",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.3)",
          borderColor: "#1A5CBF",
        }}
        size="sm"
        onClick={handleShow}
      >
        Tambah Mitra
      </Button>

      <Modal
        title="New Master Mitra"
        visible={show}
        width={1200}
        onCancel={handleClose}
        footer={
          [
            // Uncomment this if you want the Save button
            // <Button key="submit" type="primary" onClick={datatest}>
            //     Save
            // </Button>,
            // <Button key="back" onClick={handleClose}>
            //     Close
            // </Button>
          ]
        }
        className="modal-xl"
        style={{ color: "#1A5CBF" }}
      >
        <DataProfile onSubmit={handleSubmit} />
      </Modal>
    </>
  );
}

export default SamplePage;
