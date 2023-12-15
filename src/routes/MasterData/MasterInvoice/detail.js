import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Baseurl from "../../../Api/BaseUrl";
import { Card, Col, Row, Input, Button } from "antd";
import Swal from "sweetalert2";

function Detail() {
  const { invoiceAddressId } = useParams();
  const [DataInvoice, setDataInvoice] = useState("");
  const [Customer, setCustomer] = useState("");
  const [DataPIC, setDataPIC] = useState("");
  const [DataPositions, setDataPositions] = useState("");
  const [DataPhone, setDataPhone] = useState("");
  const [DataNumber, setDataNumber] = useState("");
  const [DataEmail, setDataEmail] = useState("");
  const [DataFax, setDataFax] = useState("");
  const [DataNPWP, setDataNPWP] = useState("");
  const [DataAddressNPWP, setDataAddressNPWP] = useState("");
  const [DataFormatNPWP, setDataFormatNPWP] = useState("");
  const [DataAddressOffice, setDataAddressOffice] = useState("");
  const [DataAddressGoogle, setDataAddressGoogle] = useState("");
  const [DataEditInvoice, setDataEditInvoice] = useState("");
  const [CustomerID, setCustomerID] = useState("");

  console.log(Customer);

  const fetchData = async () => {
    try {
      const respons = await axios.get(
        `${Baseurl}customer/get-customer-invoice-address-detail?npwp_id=${invoiceAddressId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      console.log("response", respons?.data?.data[0]);
      setDataInvoice(respons?.data?.data[0]);
      setCustomer(respons?.data?.data[0].customer || "");
      setCustomerID(respons?.data?.data[0].customerId);
      setDataPIC(respons?.data?.data[0].picName || "");
      setDataPositions(respons?.data?.data[0].picPosition || "");
      setDataPhone(respons?.data?.data[0].picPhone || "");
      setDataNumber(respons?.data?.data[0].picNumber || "");
      setDataEmail(respons?.data?.data[0].picEmail || "");
      setDataFax(respons?.data?.data[0].picFax || "");
      setDataNPWP(respons?.data?.data[0].npwp || "");
      setDataAddressOffice(respons?.data?.data[0].addressOffice || "");
      setDataAddressGoogle(respons?.data?.data[0].addressGoogle || "");
      setDataAddressNPWP(respons?.data?.data[0].addressNpwp || "");
      setDataFormatNPWP(respons?.data?.data[0].formatNpwp || "");
    } catch (error) {}
  };

  const EditData = async () => {
    try {
      const data = {
        invoice_address_id: invoiceAddressId,
        customer_id: CustomerID,
        pic_name: DataPIC,
        pic_position: DataPositions,
        pic_phone: DataPhone,
        pic_number: DataNumber,
        pic_email: DataEmail,
        pic_fax: DataFax,
        npwp: DataNPWP,
        address_npwp: DataAddressNPWP,
        format_npwp: DataFormatNPWP,
        address_office: DataAddressOffice,
        address_google: DataAddressGoogle,
      };

      const response = await axios.post(
        `${Baseurl}customer/edit-customer-invoice`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      );
  
      if (response.status === 200) {
        const updatedData = response.data; // Assuming the response contains the updated data
        setDataInvoice(updatedData);
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Edit Address has been saved",
        });
      } else {
        // Handle other status codes here if needed
        console.log(`Server returned status code: ${response.status}`);
      }
    } catch (error) {
      console.error("Error occurred during API call", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred while saving the data. Please try again later.",
      });
    }
  };

 

  useEffect(() => {
    fetchData();
    // GetSelectData();
  }, [invoiceAddressId]);

  return (
    <div>
      <Card>
        <h4>Data Detail Invoice Address Customer</h4>
        <hr />
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <label style={{ fontWeight: "bold" }}>Customer Name :</label>
            <Input
              className="mt-2 mb-2"
              placeholder={DataInvoice?.customer}
              value={Customer}
              disabled
              onChange={(e) => {
                console.log(e.target.value);
                setCustomer(e.target.value);
              }}
            />
          </Col>
          {/* <Col span={24}>
            <label style={{ fontWeight: "bold" }}>Customer ID :</label>
            <Input
              className="mt-2 mb-2"
              placeholder={DataInvoice?.customerId}
              value={CustomerID}
              disabled
              onChange={(e) => {
                console.log(e.target.value);
                setCustomerID(e.target.value);
              }}
            />
          </Col> */}
        </Row>
        <Row>
          <Col span={24}>
            <label style={{ fontWeight: "bold" }}>Address Office :</label>
            <Input.TextArea
              className="mt-2 mb-2"
              placeholder={DataInvoice?.addressOffice}
              value={DataAddressOffice}
              onChange={(e) => {
                console.log(e.target.value);
                setDataAddressOffice(e.target.value);
              }}
            />
          </Col>
          <Col span={24}>
            <label style={{ fontWeight: "bold" }}>Address Google :</label>
            <Input.TextArea
              className="mt-2 mb-2"
              placeholder={DataInvoice?.addressGoogle}
              value={DataAddressGoogle}
              onChange={(e) => {
                console.log(e.target.value);
                setDataAddressGoogle(e.target.value);
              }}
            />
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={12} lg={12}>
            <label style={{ fontWeight: "bold" }}>PIC Name :</label>
            <Input
              className="mt-2 mb-2"
              placeholder={DataInvoice?.picName}
              value={DataPIC}
              onChange={(e) => {
                console.log(e.target.value);
                setDataPIC(e.target.value);
              }}
            />
          </Col>
          <Col xs={24} sm={12} md={12} lg={12}>
            <label style={{ fontWeight: "bold" }}>PIC Position :</label>
            <Input
              className="mt-2 mb-2"
              placeholder={DataInvoice?.picPosition}
              value={DataPositions}
              onChange={(e) => {
                console.log(e.target.value);
                setDataPositions(e.target.value);
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={24} sm={12} md={12} lg={12}>
            <label style={{ fontWeight: "bold" }}>PIC Phone :</label>
            <Input
              className="mt-2 mb-2"
              placeholder={DataInvoice?.picPhone}
              value={DataPhone}
              onChange={(e) => {
                console.log(e.target.value);
                setDataPhone(e.target.value);
              }}
            />
          </Col>
          <Col xs={24} sm={12} md={12} lg={12}>
            <label style={{ fontWeight: "bold" }}>PIC Number :</label>
            <Input
              className="mt-2 mb-2"
              placeholder={DataInvoice?.picNumber}
              value={DataNumber}
              onChange={(e) => {
                console.log(e.target.value);
                setDataNumber(e.target.value);
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={24} sm={12} md={12} lg={12}>
            <label style={{ fontWeight: "bold" }}>Address NPWP :</label>
            <Input.TextArea
              className="mt-2 mb-2"
              placeholder={DataInvoice?.addressNpwp}
              value={DataAddressNPWP}
              onChange={(e) => {
                console.log(e.target.value);
                setDataAddressNPWP(e.target.value);
              }}
            />
          </Col>
          <Col xs={24} sm={12} md={12} lg={12}>
            <label style={{ fontWeight: "bold" }}>Format NPWP :</label>
            <Input
              className="mt-2 mb-2"
              placeholder={DataInvoice?.formatNpwp}
              value={DataFormatNPWP}
              onChange={(e) => {
                console.log(e.target.value);
                setDataFormatNPWP(e.target.value);
              }}
            />
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8} lg={8}>
            <label style={{ fontWeight: "bold" }}>PIC Email :</label>
            <Input
              className="mt-2 mb-2"
              placeholder={DataInvoice?.picEmail}
              value={DataEmail}
              onChange={(e) => {
                console.log(e.target.value);
                setDataEmail(e.target.value);
              }}
            />
          </Col>
          <Col xs={24} sm={12} md={8} lg={8}>
            <label style={{ fontWeight: "bold" }}>PIC Fax :</label>
            <Input
              className="mt-2 mb-2"
              placeholder={DataInvoice?.picFax}
              value={DataFax}
              onChange={(e) => {
                console.log(e.target.value);
                setDataFax(e.target.value);
              }}
            />
          </Col>
          <Col xs={24} sm={12} md={8} lg={8}>
            <label style={{ fontWeight: "bold" }}>NPWP Number:</label>
            <Input
              className="mt-2 mb-2"
              placeholder={DataInvoice?.npwp}
              value={DataNPWP}
              onChange={(e) => {
                console.log(e.target.value);
                setDataNPWP(e.target.value);
              }}
            />
          </Col>
        </Row>
        <Row className="mt-4">
          <Col span={24} className="d-flex justify-content-end">
            <Button type="primary">
              <span onClick={EditData}>Save</span>
            </Button>
          </Col>
        </Row>
      </Card>
    </div>
  );
}

export default Detail;
