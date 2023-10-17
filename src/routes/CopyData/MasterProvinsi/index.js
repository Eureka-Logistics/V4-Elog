import React, { useEffect, useState } from "react";
import { Card, Table } from "antd";
import { httpClient } from "../../../Api/Api";

const SamplePage = () => {
  const [data, setData] = useState([]);
  const [loadingState, setLoadingState] = useState(true); // Add the loading state variable
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    httpClient
      .get(`wilayah/get-provinsi?limit=${limit}&page=${page}&keyword=`)
      .then(({ data }) => {
        if (data.status.code === 200) {
          setData(data.data.order);
          setLoadingState(false); // Update the loading state
          setTotal(data.data.totalData);
        }
      })
      .catch(function (error) {
        setLoadingState(false);
        console.log(error.message);
      });
  }, [limit, page]);

  const columns = [
    {
      title: "No.",
      dataIndex: "no",
      key: "no",
      render: (text) => <a>{text}</a>,
    },
    // {
    //   title: "Kode",
    //   dataIndex: "idProv",
    //   key: "idProv",
    // },
    {
      title: "Nama Provinsi",
      dataIndex: "provinsi",
      key: "provinsi",
    },
    // Add other columns as needed
  ];

  return (
    <div>
      <Card>
        <h5 style={{color: '#1a5cbf'}}>Tabel Data Provinsi</h5>
        <hr/>
        <Table
        dataSource={data}
        columns={columns}
        style={{ marginTop: 10 }}
        loading={loadingState} // Pass the loading state to the Table component
        pagination={{ total, current: page, pageSize: limit }}
        onChange={(pagination) => setPage(pagination.current)}
      />
      </Card>
    
    </div>
  );
};

export default SamplePage;
