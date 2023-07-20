import React, { useState, useEffect } from "react";
import { Button, Card, Col, Input, Row, Select } from "antd";
import axios from "axios";
import Baseurl from "../../../Api/BaseUrl";
import { useParams } from "react-router";

const { Option } = Select;

function EditDetail() {
  const [DataTambah, setDataTambah] = useState("");
  const [DetailDataTarif, setDetailDataTarif] = useState("");
  const [KotaYangDiTuju, setKotaYangDiTuju] = useState("");
  const [jenisKendaraan, setJenisKendaraan] = useState("");
  const [ViaData, setDataVia] = useState("");
  const [mitraId, setmitraId] = useState("");
  const [keywordSj, setKeywordSj] = useState("");
  const [SJList, setSJList] = useState([]);
  const [formData, setFormData] = useState(null);
  const { id_price } = useParams();
  const [viaData, setViaData] = useState([]);

  const fetchData = async () => {
    try {
      const respons = await axios.get(`${Baseurl}tarif/get-select`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      });
      console.log("response", respons.data);
      //   console.log("responssssscarismid", respons.data.data);

      setDataTambah(respons.data);
      //   setSJList(respons.data?.data?.sj);
    } catch (error) {}
  };

  const DetailTarifEureka = async (id_price) => {
    try {
      const respons = await axios.get(
        `${Baseurl}tarif/get-detail-tarifEureka?id_price=${id_price}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      console.log("response", respons.data.data[0]);
      setDetailDataTarif(respons.data.data[0]);
      setDataVia(respons.data);
      //   console.log("responssssscarismid", respons.data.data);

      //   setDataTambah(respons.data);
      //   setSJList(respons.data?.data?.sj);
    } catch (error) {}
  };

  useEffect(() => {
    fetchData();
    DetailTarifEureka(id_price);
  }, []);

  const handleChange = (value) => {
    console.log(`Selected option: ${value}`);
  };

  return (
    <div>
      <Card>
        <h4>Edit dan Detail Tarif Eureka</h4>
        <Row>
          <Col className="mt-2" span={8}>
            <label>Kota Muat :</label>
            <Select
              showSearch
              placeholder={DetailDataTarif.kotaAsal}
              optionFilterProp="children"
              style={{ width: "90%" }}
              onChange={(e) => setmitraId(e)}
            >
              {DataTambah &&
                DataTambah.muatKota.map((KotaItem) => (
                  <Select.Option value={KotaItem.namaKota}>
                    {KotaItem.muatKota}
                  </Select.Option>
                ))}
            </Select>
          </Col>

          <Col className="mt-2" span={8}>
            <label>Kota Tujuan :</label>
            <Select
              showSearch
              placeholder={DetailDataTarif.kotaTujuan}
              optionFilterProp="children"
              style={{ width: "90%" }}
              onChange={(e) => setKotaYangDiTuju(e)}
            >
              {DataTambah &&
                DataTambah.muatKota.map((TujuanItem) => (
                  <Select.Option value={TujuanItem.namaKota}>
                    {TujuanItem.muatKota}
                  </Select.Option>
                ))}
            </Select>
          </Col>
          <Col className="mt-2" span={8}>
            <label>Jenis Kendaraan :</label>
            <Select
              showSearch
              placeholder={DetailDataTarif.kendaraanJenis}
              optionFilterProp="children"
              style={{ width: "90%" }}
              onChange={(e) => setJenisKendaraan(e)}
            >
              {DataTambah &&
                DataTambah.jenisKendaraan.map((KendaraanItem) => (
                  <Select.Option value={KendaraanItem.jenisKendaraan}>
                    {KendaraanItem.jenisKendaraan}
                  </Select.Option>
                ))}
            </Select>
          </Col>
        </Row>
        <Row>
          <Col className="mt-2" span={8}>
            <label>Service Type :</label>
            <Select
              className="mt-2"
              showSearch
              placeholder={DetailDataTarif.service_type}
              optionFilterProp="children"
              style={{ width: "90%" }}
              onChange={(e) => setJenisKendaraan(e)}
            >
              {DataTambah &&
                DataTambah.jenisKendaraan.map((KendaraanItem) => (
                  <Select.Option value={KendaraanItem.jenisKendaraan}>
                    {KendaraanItem.jenisKendaraan}
                  </Select.Option>
                ))}
            </Select>
          </Col>
          <Col className="mt-2" span={8}>
            <label>Jenis Kiriman :</label>
            <Select
              placeholder={DetailDataTarif.jenis_kiriman}
              className="mt-2"
              style={{ width: "90%" }}
              onChange={handleChange}
            >
              {/* Pilihan dari DataTambah */}
             
              {/* Tambahkan pilihan manual untuk Retail dan Charter */}
              <Option value="Retail">Retail</Option>
              <Option value="Charter">Charter</Option>
            </Select>
          </Col>
          <Col className="mt-2" span={7}>
            <label>Via :</label>
            <Select
              placeholder="---"
              // placeholder={DataTambah.via}
              className="mt-2"
              style={{ width: "100%" }}
              onChange={handleChange}
            >
              {DataTambah &&
                DataTambah.via.map((ViaItem) => (
                  <Select.Option value={ViaItem.via}>
                    {ViaItem.via}
                  </Select.Option>
                ))}
              {/* {viaData.map((viaItem, index) => (
                <Option key={index} value={viaItem.via}>
                  {viaItem.via}
                </Option>
              ))} */}
            </Select>
          </Col>
        </Row>
        <br />
        <hr />

        <h4>Biaya Penanganan</h4>
        <Row>
          <Col className="mt-2" span={8}>
            <label>Tarif :</label>
            <Input placeholder={DetailDataTarif.tarif} />
          </Col>
        </Row>
        <br />
        <Row>
          <Col span={24} className="d-flex justify-content-end">
            <Button>
              <span>Save</span>
            </Button>
          </Col>
        </Row>
      </Card>
    </div>
  );
}

export default EditDetail;
