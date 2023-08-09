import React, { useEffect, useState } from "react";
import Baseurl from "../../../Api/BaseUrl";
import axios from "axios";
import { Button, Card, Col, Input, Row, Select } from "antd";
import Swal from "sweetalert2";

function NewTarifMitra() {
  const [IDMuatKota, setIDMuatKota] = useState(0);
  const [IDBongkarKota, setIDBongkarKota] = useState(0);
  const [IDJenisKendaraan, setIDJenisKendaraan] = useState(0);
  const [IDServiceType, setIDServiceType] = useState(0);
  const [IDTambahData, setIDTambahData] = useState("");
  const [IDCustomer, setIDCustomer] = useState("");
  const [IDVia, setIDVia] = useState("");
  const [DataMuatKota, setDataMuatKota] = useState("");
  const [DataBongkarKota, setDataBongkarKota] = useState("");
  const [DataJenisKendaraan, setDataJenisKendaraan] = useState("");
  const [DataServiceType, setDataServiceType] = useState("");
  const [DataJenisKiriman, setDataJenisKiriman] = useState("");
  const [DataTarifKatalog, setDataTarifKatalog] = useState("");
  const [DataDiskon, setDataDiskon] = useState("");
  const [DataDiskonType, setDataDiskonType] = useState("");
  const [DataBiayaJalan, setDataBiayaJalan] = useState("");
  const [DataBiayaMuat, setDataBiayaMuat] = useState("");
  const [DataBiayaBongkar, setDataBiayaBongkar] = useState("");
  const [DataBiayaOvertonase, setDataBiayaOvertonase] = useState("");
  const [DataBiayaMultimuat, setDataBiayaMultimuat] = useState("");
  const [DataBiayaMultiDrop, setDataBiayaMultiDrop] = useState("");
  const [DataBiayaTambahan, setDataBiayaTambahan] = useState("");
  const [DataBiayaMel, setDataBiayaMel] = useState("");
  const [DataBiayaLain, setDataBiayaLain] = useState("");
  const [TotalBiaya, setTotalBiaya] = useState("");

  
  const GetSelectData = async () => {
    try {
      const respons = await axios.get(
        `${Baseurl}tarif/get-select?idMuat=${IDMuatKota}&idBogkar=${IDBongkarKota}&idJenisKendaraan=${IDJenisKendaraan}&service_type=${IDServiceType}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      console.log("response", respons.data);
      setIDTambahData(respons.data);
      setDataTarifKatalog(respons.data.getPrice);
      console.log(respons.data.getPrice);
    } catch (error) {}
  };

  const TambahData = async () => {
    try {
      const respons = await axios.post(
        `${Baseurl}tarif/create-tarifCustomer`,
        {
          id_muat_kota: parseInt(IDMuatKota),
          id_tujuan_kota: parseInt(IDBongkarKota),
          id_customer: parseInt(IDCustomer),
          id_kendaraan_jenis: parseInt(IDJenisKendaraan),
          service_type: IDServiceType,
          jenis_kiriman: DataJenisKiriman,
          diskon: DataDiskon,
          diskon_type: DataDiskonType,
          biaya_jalan: TotalBiaya,
          biaya_muat: DataBiayaMuat,
          biaya_bongkar: DataBiayaBongkar,
          biaya_overtonase: DataBiayaOvertonase,
          biaya_multimuat: DataBiayaMultimuat,
          biaya_multidrop: DataBiayaMultiDrop,
          biaya_tambahan: DataBiayaTambahan,
          biaya_mel: DataBiayaMel,
          biaya_lain: DataBiayaLain,
          via: IDVia,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      console.log("response", respons.data);
      setIDTambahData(respons.data);

      // Show SweetAlert2 success message
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Data has been added successfully!",
      }).then(() => {
        // Reload the window after the success message is closed
        // window.location.reload();
      });
    } catch (error) {
      // Handle error if needed
    }
  };

  useEffect(() => {
    // fetchData();
    GetSelectData();
  }, []);

  return <div>tarif mitra</div>;
}

export default NewTarifMitra;
