import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import useBanksStore from "../../../../zustand/Store/NamaNamaBank";
import axios from "axios";
import Baseurl from "../../../../Api/BaseUrl";
import Swal from "sweetalert2";

function DetailEditMitraCabang() {
  const { idmitra } = useParams();
  const [semuaEdit, setsemuaEdit] = useState("");
  const [DataBank, setDataBank] = useState("");
  const [DataAccountName, setDataAccountName] = useState("");
  const [DataAccountNumber, setDataAccountNumber] = useState("");
  const [DataCabangPIC, setDataCabangPIC] = useState("");
  const [DataCabangEmail, setDataCabangEmail] = useState("");
  const [DataCabangTelp, setDataCabangTelp] = useState("");
  const { banks } = useBanksStore();
  const [DataCabang, setDataCabang] = useState("");
  const [DataEditMitraCabang, setDataMitraCabang] = useState("");
  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useState(10);

  const EditMitraPIC = async () => {
    try {
      const data = {
        id: parseInt(semuaEdit.id),
        id_mitra: parseInt(idmitra),
        bank: DataBank === null ? semuaEdit.bank : DataBank ,
        account_name: DataAccountName === null ? semuaEdit.account_name : DataAccountName,
        account_number: DataAccountNumber === null ? semuaEdit.account_number : DataAccountNumber,
        cabang_pic: DataCabangPIC === null ? semuaEdit.cabang_pic : DataCabangPIC,
        cabang_email: DataCabangEmail === null ? semuaEdit.cabang_email : DataCabangEmail,
        cabang_telp: DataCabangTelp === null ? semuaEdit.cabang_telp : DataCabangTelp,
      };

      const response = await axios.post(
        `${Baseurl}mitra/edit-mitra-cabangRek`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      // If you want to update the state with the edited data, you can do so here.
      // For example:
      setDataMitraCabang(response.data); // Assuming the response contains the updated data

      // Check if the save operation was successful and redirect to the desired page
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Data has been saved",
          // footer: '<a href="">Why do I have this issue?</a>'
        });
        fetchDataDetail();
        // setShowModal(false);
      } else if (response.status === 500) {
        // Swal.fire({
        //     icon: 'error',
        //     title: 'Oops...',
        //     text: 'Something went wrong!',
        //     // footer: '<a href="">Why do I have this issue?</a>'
        //   })
        console.log(`error`);
      }
    } catch (error) {
      console.log(`ini error`);
      console.error(`ini errorr`, error);
    }
  };

   const fetchDataDetail = async (pages = 1) => {
    try {
      const response = await axios.get(
        `${Baseurl}mitra/get-mitra-cabangRek?limit=${limit}&page=${pages}&id_mitra=${idmitra.idmitra }`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      console.log("Ini data  Cabang ", response.data.data.order);
      setDataCabang(response.data.data.order);
    //   setTotal(response.data.data.order.totalData);
      // Jumlah data pagination
    } catch (error) {
      console.error(error);
    }
  };

  console.log(`mitraId`, idmitra);

  useEffect(() => {
    fetchDataDetail();
  }, []);

  return <div>Detail Mitra Cabang</div>;
}

export default DetailEditMitraCabang;
