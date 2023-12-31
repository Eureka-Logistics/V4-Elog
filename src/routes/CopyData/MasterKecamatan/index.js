import React, { useEffect, useState } from "react";
import { Card, Col, Row, Table, Form, Input } from "antd";
import Select from "react-select";
import { httpClient } from "../../../Api/Api";

const { Option } = Select;

const SamplePage = () => {
  const [kecamatan, setKecamatan] = useState([]);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [provinsi, setProvinsi] = useState("");
  const [provinsiOptions, setProvinsiOptions] = useState([]);
  const [kota, setKota] = useState("");
  const [kotaOptions, setKotaOptions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = `wilayah/get-kecamatan?limit=${limit}&page=${page}&keyword=`;
        if (provinsi?.value) url += `&provinsi=${provinsi?.value}`;
        if (kota?.value) url += `&idkota=${kota?.value}`;
        const response = await httpClient.get(url);
        const { data } = response;
        if (data && data.status && data.status.code === 200) {
          setKecamatan(data.data.order);
          setTotal(data.data.totalData);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    // fetchKota();
    fetchData();
  }, [limit, page, kota, provinsi]);

  useEffect(() => {
    const fetchProvinsi = async () => {
      try {
        const response = await httpClient.get("wilayah/get-provinsi");
        const { data } = response;
        if (data && data.status && data.status.code === 200) {
          setProvinsiOptions(
            data.data.order.map((x) => ({
              label: x.provinsi,
              value: x.idProv,
            }))
          );
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchProvinsi();
  }, []);

  const fetchKota = async () => {
    let query = "";
    if (provinsi) {
      query += `idprovinsi=${provinsi.value}`;
    }
    httpClient
      .get(`wilayah/get-kota?${query}`)
      .then(({ data }) => {
        if (data.status.code === 200) {
          setKotaOptions(
            data.data.order.map((x) => ({
              label: x.kotaName,
              value: x.idKota,
            }))
          );
        }
      })
      .catch(function (error) {
        console.log(error.message);
      });
  };

  const columns = [
    {
      title: "No.",
      dataIndex: "no",
      key: "no",
    },
    // {
    //   title: "ID Provinsi",
    //   dataIndex: "idProv",
    //   key: "idProv",
    // },
    // {
    //   title: "ID Kota",
    //   dataIndex: "idKota",
    //   key: "idKota",
    // },
    // {
    //   title: "ID Kecamatan",
    //   dataIndex: "idKecamatan",
    //   key: "idKecamatan",
    // },
    {
      title: "Provinsi",
      dataIndex: "provName",
      key: "provName",
    },
    {
      title: "Kota",
      dataIndex: "kotaName",
      key: "kotaName",
    },
    {
      title: "Kecamatan",
      dataIndex: "kecamatanName",
      key: "kecamatanName",
    },
  ];

  const dataSource = kecamatan.map((item) => ({
    key: item.no,
    no: item.no,
    idProv: item.idProv,
    idKota: item.idKota,
    idKecamatan: item.idKecamatan,
    provName: item.provName,
    kotaName: item.kotaName,
    kecamatanName: item.kecamatanName,
  }));

  const customStylesReactSelect = {
    container: (provided) => ({
      ...provided,
      width: "100%",
    }),
    menuPortal: (base) => ({
      ...base,
      zIndex: 9999,
    }),
    menu: (provided) => ({
      ...provided,
      zIndex: 9999,
      width: "100%",
      minWidth: "100%",
    }),
  };

  const onSelectChange = (value, e) => {
    if (e.name === "provinsi") {
      setProvinsi(value);
      httpClient
        .get(`wilayah/get-kota?idprovinsi=${value.value}`)
        .then(({ data }) => {
          if (data.status.code === 200) {
            setKotaOptions(
              data.data.order.map((x) => ({
                label: x.kotaName,
                value: x.idKota,
              }))
            );
          }
        })
        .catch(function (error) {
          console.log(error.message);
        });
      httpClient
        .get(
          `wilayah/get-kecamatan?limit=${limit}&page=1&keyword=&provinsi=${value.value}`
        )
        .then(({ data }) => {
          if (data && data.status && data.status.code === 200) {
            setKecamatan(data.data.order);
            setTotal(data.data.totalData);
          }
        })
        .catch(function (error) {
          console.log(error.message);
        });
    } else if (e.name === "kota") {
      setKota(value);
    }
  };

  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Card>
        <h5 style={{color: '#1A5CBF'}}>Tabel Data Kecamatan</h5>
        <hr/>
        <br/>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={12} lg={12}>
              <label style={{fontWeight: 'bold'}} className="mb-2">
                Search Provinsi : 
              </label>
              <Select
                style={{ width: 200, marginRight: 8 }}
                options={[{ value: "", label: "All" }, ...provinsiOptions]}
                value={provinsi}
                isSearchable
                placeholder="Select Provinsi"
                name="provinsi"
                styles={customStylesReactSelect}
                onChange={onSelectChange}
                autoFocus
              />
            </Col>
            <Col xs={24} sm={12} md={12} lg={12}>
            <label style={{fontWeight: 'bold'}} className="mb-2">
                Search Kota :
              </label>
              <Select
                style={{ width: 200 }}
                options={[{ value: "", label: "All" }, ...kotaOptions]}
                // options={kotaOptions}
                value={kota}
                isSearchable
                placeholder="Select Kota"
                name="kota"
                styles={customStylesReactSelect}
                onChange={onSelectChange}
              />
            </Col>
          </Row>
          <br/>
          <hr/>
          <Table
           style={{ overflowX: "auto" }}
            className="mt-4"
            columns={columns}
            dataSource={dataSource}
            pagination={{ total, current: page, pageSize: limit }}
            onChange={(pagination) => setPage(pagination.current)}
          />
        </Card>
      </div>
    </div>
  );
};

export default SamplePage;
