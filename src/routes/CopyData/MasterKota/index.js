import React, { useEffect, useState } from "react";
import { Card, Table, Select } from "antd";
import { httpClient } from "../../../Api/Api";

const { Option } = Select;

const SamplePage = () => {
  const [kota, setKota] = useState([]);
  const [limit, setLimit] = useState(100);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [selectedProvinsi, setSelectedProvinsi] = useState("");
  const [provinsiOptions, setProvinsiOptions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await httpClient.get(
          `wilayah/get-kota?page=${page}&limit=${limit}&keyword&idprovinsi=${
            selectedProvinsi || ""
          }`
        );
        const { data } = response;
        if (data && data.status && data.status.code === 200) {
          setKota(data.data.order);
          setTotal(data.data.totalData);
        }
        httpClient
          .get("wilayah/get-provinsi?limit=100&page=1&keyword=")
          .then(({ data }) => {
            if (data.status.code === 200) {
              setProvinsiOptions(
                data.data.order.map((x) => ({
                  label: x.provinsi,
                  value: x.idProv,
                }))
              );
            }
          })
          .catch(function (error) {
            console.log(error.message);
          });
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, [limit, page, selectedProvinsi]);

  const handleProvinsiChange = (value) => {
    setSelectedProvinsi(value);
    setPage(1); // Reset page to 1 when changing the selected provinsi
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
  ];

  const dataSource = kota.map((item) => ({
    key: item.no,
    no: item.no,
    idProv: item.idProv,
    idKota: item.idKota,
    provName: item.provName,
    kotaName: item.kotaName,
  }));

  const fetchKotaOptions = async () => {
    try {
      const response = await httpClient.get(
        `wilayah/get-kota?page=1&limit=10&keyword&idprovinsi=`
      );
      const { data } = response;
      if (data && data.status && data.status.code === 200) {
        setKota(data.data.order);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchKotaOptions();
  }, []);

  return (
    <div>
      <Card>
        <h5 style={{color: '#1a5cbf'}}>Data Tabel Kota</h5>
      <hr/>
      <label style={{width: '100%', fontFamily: 'NoirPro'}} className="mb-2">
        Search Provinsi :
      </label>
      <Select
        style={{ width: 200 }}
        placeholder="Select Provinsi"
        value={selectedProvinsi}
        onChange={handleProvinsiChange}
        showSearch // Enable search functionality
        optionFilterProp="children"
      >
        <Option value="">All</Option>
        {provinsiOptions.map((item) => (
          <Option key={item.value} value={item.value}>
            {item.label}
          </Option>
        ))}
      </Select>
      <hr/>
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={{ total, current: page, pageSize: limit }}
        onChange={(pagination) => setPage(pagination.current)}
      />
      </Card>
    </div>
    
  );
};

export default SamplePage;
