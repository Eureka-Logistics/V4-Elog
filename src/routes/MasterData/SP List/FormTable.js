// FormTable.js
import React from "react";
import { Col, Row, Form, Button, Table, Modal } from "react-bootstrap";
import {
  Card,
  Checkbox,
  Select as SelectAntd,
  Tag,
  Spin,
  Input,
  Modal as ModalAntd,
  Form as AntForm,
  DatePicker,
  Upload,
  notification,
} from "antd";
import { useState, useEffect } from "react";
import Baseurl from "../../../Api/BaseUrl";
import Swal from "sweetalert2";
import Select from "react-select";
import axios from "axios";
import Token from "../../../Api/Token";
import mobil from "../../redux toolkit/store/ZustandStore";
import { Alert, Space } from "antd";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import ZustandStore from "../../../zustand/Store/JenisKepemilikanOptions";
import moment from "moment";
import { UploadOutlined } from "@ant-design/icons";
import * as Yup from "yup";
import { useFormik } from "formik";
import useMitraStore from "../../../zustand/Store/MitraStore";
import ModalCreatePO from "./ModalCreatePO/Index";
import ModalDetailMarketing from "../Marketing/Splist/ModalDetailMarketing/Index";
import RefreshMitra123 from "../../../zustand/Store/RefreshMitra123/RefreshMitra123";
import ModalDriverPurchasing from "../Purchasing/SP/DetailSJ/ModalDriver";

function FormTable({
  isidata,
  totalPrice,
  idmp,
  IsiDataSPSemua,
  NamaMarketing,
  JenisBarang,
  messagedetail,
  datarefresh,
}) {
  const [ModalDriverPurch, setModalDriverPurch] = useState(false);
  const [modal1Open, setModal1Open] = useState(false);
  const [jobdesk, setJobdesk] = useState(localStorage.getItem("jobdesk"));
  const [mitraVehicle, setMitraVehicle] = useState([]);
  const [types, setType] = useState([]);
  const [nomorpolisi, setNomorPolisi] = useState([]);
  const [NamaSupir, setNamaSupir] = useState("");
  const [NomorPolisi2, setNomorPolisi2] = useState([]);
  const [isidaSementara, setIsidaSementara] = useState([]);
  const [selectnomor, setSelectnomor] = useState("");
  const [selectnomor2, setSelectnomor2] = useState("");
  const [selectnopol, setSelectNopol] = useState("");
  const [selectMitra, setSelectMitra] = useState("");
  const [selectMitra2, setSelectMitra2] = useState("");
  const [approved, setApproved] = useState("");
  const [selectDriver, setselectDriver] = useState("");
  const [selectDriver2, setselectDriver2] = useState([]);
  const [idsupir, setIdsupir] = useState("");
  const [idUnit, setIdunit] = useState("");
  const [idUnit2, setIdunit2] = useState("");
  const [idUnit3, setIdunit3] = useState("");
  const [bukaanother, setBukaanother] = useState(false);
  const [LoadingMuterMuter, setLoadingMuterMuter] = useState(false);
  const [driveranother, setDriveranother] = useState("");
  const [selectanotherrvalue, setSelectanotherrvalue] = useState([]);
  const [modal1OpenDetail, setmodal1OpenDetail] = useState(false);
  const { Option } = SelectAntd;
  const { NamaMitra, fetchMitra } = useMitraStore((item) => ({
    NamaMitra: item.NamaMitra,
    fetchMitra: item.fetchMitra,
  }));
  const NamaMitraOptions = NamaMitra.map((item) => ({
    label: item.NamaMitra,
    value: item.mitraId,
  }));
  const { DriverType, setDriverType } = ZustandStore((item) => ({
    DriverType: item.DriverType,
    setDriverType: item.setDriverType,
  }));
  const { jenisKepemilikan, setjenisKepemilikan } = ZustandStore((item) => ({
    jenisKepemilikan: item.jenisKepemilikan,
    setjenisKepemilikan: item.setjenisKepemilikan,
  }));
  const { WarnaPlat, setWarnaPlat } = ZustandStore((item) => ({
    WarnaPlat: item.WarnaPlat,
    setWarnaPlat: item.setWarnaPlat,
  }));
  const { isidetail, setSpDetail } = mobil((state) => ({
    isidetail: state.isidetail,
    setSpDetail: state.setSpDetail,
  }));
  const { isiduit, setDuit } = mobil((state) => ({
    isiduit: state.isiduit,
    setDuit: state.setDuit,
  }));
  const { custumer, setCustumer } = mobil((state) => ({
    custumer: state.custumer,
    setCustumer: state.setCustumer,
  }));
  const { jenisBarang, setjenisBarang } = mobil((state) => ({
    jenisBarang: state.jenisBarang,
    setjenisBarang: state.setjenisBarang,
  }));
  const { kodekendaraan1, setkodekendaraan1 } = mobil((state) => ({
    kodekendaraan1: state.kodekendaraan1,
    setkodekendaraan1: state.setkodekendaraan1,
  }));
  const { IsiKomenRejectSP, setIsiKomenRejectSP } = mobil((state) => ({
    IsiKomenRejectSP: state.IsiKomenRejectSP,
    setIsiKomenRejectSP: state.setIsiKomenRejectSP,
  }));
  const { orderdate, setOrderdate, asuransi, setAsuransi } = mobil();

  const [spdetailsemuanyasekarang, setspdetailsemuanyasekarang] = useState("");
  const [serviceState, setserviceState] = useState("");

  const setSpDetailZustand = async () => {
    try {
      const data = await axios.get(
        `${Baseurl}sp/get-SP-all-detail?limit=10&page=1&keyword=&idmp=${idmp}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      setspdetailsemuanyasekarang(data.data);
      setserviceState(data.data?.service);
      console.log(`asuuuu`, data.data);
    } catch (error) {
      console.error("Error fetching data:", error.response.data);
    }
  };

  console.log(`idUnit`, idUnit);

  useEffect(() => {
    setType(isidetail.map((item) => item?.kendaraan));
  }, [isidetail]);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [IDMPD, setIDMPD] = useState([]);
  const [checkboxValue, setCheckboxValue] = useState(0);

  const { mitra1, setmitra1 } = mobil((state) => ({
    mitra1: state.mitra1,
    setmitra1: state.setmitra1,
  }));
  const [mitra1Purchasing, setmitra1Purchasing] = useState("");
  const { mitra2, setmitra2 } = mobil((state) => ({
    mitra2: state.mitra2,
    setmitra2: state.setmitra2,
  }));
  const [mitra2Purchasing, setmitra2Purchasing] = useState("");
  const [idmitraini, setidmitraini] = useState([]);
  const [idmitraini2, setidmitraini2] = useState([]);
  const [mitraFix, setMitraFix] = useState([]);
  const [NomorFix, setNomorFix] = useState([]);
  const [NomorFix2, setNomorFix2] = useState([]);
  const [NamaDriverFix, setNamaDriverFix] = useState([]);
  const [NamaDriverFix2, setNamaDriverFix2] = useState([]);
  const [KodeKendaraanOps, setKodeKendaraanOps] = useState([]);
  const { SJKosongModal, setSJKosongModal } = mobil((state) => ({
    SJKosongModal: state.SJKosongModal,
    setSJKosongModal: state.setSJKosongModal,
  }));
  const { TipeKendaraan, FetchTipeKendaraan } = ZustandStore((state) => ({
    TipeKendaraan: state.TipeKendaraan,
    FetchTipeKendaraan: state.FetchTipeKendaraan,
  }));
  const [SelectNamaKendaraan3, setSelectNamaKendaraa3] = useState("");
  const [FotoDriver, setFotoDriver] = useState("");
  const [Mitra1Multi, setMitra1Multi] = useState("");
  const [StatusApproveAct, setStatusApproveAct] = useState("");
  const [TanggalACT3, setTanggalACT3] = useState("");
  const [TanggalACT4, setTanggalACT4] = useState("");
  const [TanggalACT5, setTanggalACT5] = useState("");
  const [StatusApproveOpt, setStatusApproveActOpt] = useState("");
  const [Kendaraan_operasionalStatus, setKendaraanOperasionalStatus] = useState(
    {}
  );
  const [NamaMobilDariTable, setNamaMobilDariTable] = useState("");
  const [StatusPurchasing, setStatusPurchasing] = useState("");
  const history = useHistory();
  const [selectTypeMobil, setselectTypeMobil] = useState("");
  const [selectTypeMobil2, setselectTypeMobil2] = useState("");
  const [DataUntukPurchsingDanApprovenya, setDataUntukPurchsingDanApprovenya] =
    useState("");
  ////checkbox multi
  const handleCheckboxChange = (event) => {
    setCheckboxValue(event.target.checked ? 1 : 0);
  };

  ///select driver
  const [SelectMitraPertama, setSelectMitraPertama] = useState("");
  const [VehicleType1, setVehicleType1] = useState("");
  const [KodeKendaraanPurc1, setKodeKendaraanPurc1] = useState("");
  const [AmbilIdKendaraanPurch1, setAmbilIdKendaraanPurch1] = useState("");
  const [AmbilIDriverPucrh1, setAmbilIDriverPucrh1] = useState("");
  const [AmbilKodeKendaraanPurch1, setAmbilKodeKendaraanPurch1] = useState("");
  const [AmbilIdUnitPurch1, setAmbilIdUnitPurch1] = useState("");

  const vehiclePurch1 = async () => {
    let url = `${Baseurl}sp/get-SP-select-2?vehicleType=${VehicleType1}&mitra=${SelectMitraPertama}&id=${AmbilIdKendaraanPurch1}`;

    const sleet = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    });
    setKodeKendaraanPurc1(sleet?.data?.data?.vehicle);
  };

  useEffect(() => {
    vehiclePurch1();
  }, [VehicleType1, SelectMitraPertama, AmbilIdKendaraanPurch1]);
  let KodeKendaraanPurc1s = Array.isArray(KodeKendaraanPurc1)
    ? KodeKendaraanPurc1
    : [];
  const KodeKendaraanPurc1ss = KodeKendaraanPurc1s.map((item) => ({
    label: item.no_polisi,
    value: item.driverId,
    id: item.id,
  }));

  const vehicle = async () => {
    let url = `${Baseurl}sp/get-SP-select-2?vehicleType=${selectTypeMobil}&mitra=${mitra1Purchasing}&id=${selectnomor}`;

    const sleet = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    });
    const nomorpolisis = sleet.data.data.vehicle;
    const drivernya = sleet.data.data.Driver;
    setMitraFix(sleet.data.data.mitra);
    setNomorFix(sleet.data.data.vehicle);
    setNamaDriverFix(sleet.data.data.Driver);
    // console.log(`ini driver`, sleet.data.data);
    setselectDriver(drivernya);
    setNomorPolisi(nomorpolisis);
  };
  useEffect(() => {
    if (types.length > 0) {
      vehicle();
    }
  }, [
    types,
    selectnomor,
    mitra1,
    selectnomor2,
    selectTypeMobil,
    mitra1Purchasing,
  ]); // pastikan Anda memasukkan semua variabel yang Anda gunakan sebagai dependensi useEffect

  useEffect(() => {
    const vehicle = async () => {
      let url = `${Baseurl}sp/get-SP-select-2?vehicleType=${selectTypeMobil2}&mitra=${mitra2Purchasing}&id=${selectnomor2}`;

      const sleet = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      });
      setNomorFix2(sleet.data.data.vehicle);
      setNamaDriverFix2(sleet.data.data.Driver);
      // const nomorpolisis = sleet.data.data.vehicle;
      // const drivernya = s  leet.data.data.Driver;
      FetchTipeKendaraan();
    };

    if (types.length > 0) {
      vehicle();
    }
  }, [
    types,
    selectnomor,
    mitra2,
    selectnomor2,
    selectTypeMobil2,
    mitra2Purchasing,
  ]); // pastikan Anda memasukkan semua variabel yang Anda gunakan sebagai dependensi useEffect
  // console.log(`ini NamaDriverFix2`, NamaDriverFix2);
  ///// approve op operasional
  useEffect(() => {
    const vehicle = async () => {
      let url = `${Baseurl}sp/get-SP-select-2?vehicleType=${NamaMobilDariTable}&mitra=1&id=${selectnomor}`;

      const sleet = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      });
      setKodeKendaraanOps(sleet.data?.data.vehicle);
    };

    if (types.length > 0) {
      vehicle();
    }
  }, [
    types,
    selectnomor,
    NamaMobilDariTable,
    mitra1,
    selectnomor2,
    selectTypeMobil2,
    mitra1Purchasing,
  ]);

  const anotherdriver = async () => {
    const another = await axios.get(`${Baseurl}sp/another-driver`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem(`token`),
      },
    });
    const driveranotders = another.data.data;
    setDriveranother(driveranotders);
    setIsiKomenRejectSP();
  };
  useEffect(() => {
    anotherdriver();
    setSpDetailZustand();
  }, []);

  const PindahVehicle = () => {
    history.push(`/masterdata/purchasing/vehicle`);
  };
  // console.log(`another`, driveranother);
  // console.log(`selectnomor`, selectnomor);
  // console.log(`idUnit`, idUnit);
  // console.log(`selectDriver[0]?.name`, selectDriver[0]?.name);
  // ///tombol approve
  // console.log(`selectDriver[0]?.idUnit`, selectDriver[0]?.idUnit);
  const [NameDriverOperasionalAnother, setNameDriverOperasionalAnother] =
    useState(selectDriver[0]?.name);
  const [IDDriverOperasionalAnother, setIdDriverOperasionalAnother] =
    useState(selectnomor);
  // console.log(`NameDriverOperasionalAnother`, NameDriverOperasionalAnother); /// ambil nama dari another driver

  const GantiNamaDriverAnother = (selectedOption) => {
    setNameDriverOperasionalAnother(selectedOption);
  };
  const GantiIDDriverAnother = (selectedOption) => {
    setIdDriverOperasionalAnother(selectedOption);
  };

  const HandleApproveOPS = (idmpd) => {
    try {
      setLoadingMuterMuter(true);
      const body = {
        id_mpd: IDMPD,
        id_mp: idmp,
        // id_supir: IDDriverOperasionalAnother || selectnomor,
        id_supir: IDDriverOperasionalAnother || selectnomor,
        // id_unit: selectnomor,
        id_unit: selectDriver[0]?.idUnit ? selectDriver[0]?.idUnit : idUnit,
        // nama_supir: selectDriver[0]?.name ? selectDriver[0]?.name : NameDriverOperasionalAnother,
        nama_supir: NameDriverOperasionalAnother,
        id_mitra: 1,
        id_mitra_pickup: 1,
        id_mitra_2: 1,
        plat_nomor: selectnopol,
        merk: NamaMobilDariTable,
        is_multi: checkboxValue,

        pickup_kendaraan: NamaMobilDariTable || "",
        pickup_nopol: selectnopol,
        pickup_supir: NameDriverOperasionalAnother,
      };

      if (selectnopol === "") {
        notification.error({
          message: "Nopol Polisi Harus Diisi",
        });
        setLoadingMuterMuter(false);
        // setLoadingMuterMuter(true);
      }
      axios
        .post(`${Baseurl}sp/approve-SP`, body, {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((response) => {
          const isidata = response.data.status;
          console.log(`ini adlaah`, isidata);
          setApproved(isidata);
          setSelectnomor("");
          setIdDriverOperasionalAnother("");
          datarefresh();
          // Display success alert
          setSpDetailZustand();
          AmbilStatusApprove();
          messagedetail();
          Swal.fire({
            icon: "success",
            title: "Approval Successful",
            text: "The approval process has been completed successfully.",
          });
          setLoadingMuterMuter(false);
          // window.location.reload();
          handleClose();
        })
        .catch((error) => console.error(`Error: ${error}`));
    } catch (error) {
      console.log(`ini error`);
      if (error.response.data.status && error.response.data.status.message) {
        notification.error({
          icon: "error",
          message: error.response.data.status.message,
        });
      } else if (
        error.response.data.errors &&
        error.response.data.errors.message
      ) {
        notification.error({
          icon: "error",
          message: error.response.data.errors.message,
        });
      }
    }
  };

  // console.log(`VehicleType1:  `, VehicleType1 );
  // console.log(`SelectMitraPertama:  `, SelectMitraPertama);
  console.log(`KodeKendaraanPurc1ss `, KodeKendaraanPurc1s);
  ///tombol approve
  const id_mitra_pickup = SelectMitraPertama
    ? SelectMitraPertama
    : Mitra1Multi?.mitraId === "-"
    ? null
    : Mitra1Multi?.mitraId;
  const id_mitra = mitra1Purchasing === "" ? id_mitra_pickup : mitra1Purchasing;
  const pickup_kendaraan = VehicleType1
    ? VehicleType1
    : DataUntukPurchsingDanApprovenya?.kendaraan === "-"
    ? null
    : DataUntukPurchsingDanApprovenya?.kendaraan;
  const kendaraan = selectTypeMobil === "" ? pickup_kendaraan : selectTypeMobil;
  const pickup_nopol = AmbilKodeKendaraanPurch1
    ? AmbilKodeKendaraanPurch1
    : Mitra1Multi?.unit === "-"
    ? null
    : Mitra1Multi?.unit;
  const nopol = selectnopol === "" ? pickup_nopol : selectnopol;
  const pickup_supir = AmbilIDriverPucrh1
    ? AmbilIDriverPucrh1
    : Mitra1Multi?.driverId === "-"
    ? null
    : Mitra1Multi?.driverId;
  const supir = idUnit === "" ? pickup_supir : idUnit;
  const id_unit = AmbilIdUnitPurch1
    ? AmbilIdUnitPurch1
    : selectDriver[0]?.idUnit === "-"
    ? null
    : selectDriver[0]?.idUnit;
  const id_unit_2 = selectnomor === "" ? id_unit : selectnomor;
  const HandleApprovePURCH = async (idmpd) => {
    try {
      const body = {
        // id_mp: idmp,
        // id_mpd: IDMPD,
        // id_unit: selectDriver[0]?.idUnit,
        // id_supir: selectnomor,
        // id_mitra: selectMitra,
        // id_mitra_pickup: ``,
        // id_mitra_2: ``,
        // plat_nomor: selectnopol,
        // merk: types[0],
        id_mp: parseInt(idmp),
        id_mpd: IDMPD,
        id_mitra_pickup: SelectMitraPertama
          ? SelectMitraPertama
          : Mitra1Multi?.mitraId === "-"
          ? null
          : Mitra1Multi?.mitraId,
        id_unit: id_unit,
        pickup_kendaraan: pickup_kendaraan,
        pickup_nopol: pickup_nopol,
        pickup_supir: pickup_supir,
        id_driver: pickup_supir,

        id_mitra: id_mitra,
        id_unit_2: id_unit_2,
        id_driver_2: supir,
        kendaraan: kendaraan,
        nopol: nopol,
        supir: supir,

        id_mitra_2: mitra2Purchasing === "" ? id_mitra : mitra2Purchasing,
        id_unit_3: selectnomor2 === "" ? id_unit_2 : selectnomor2,
        id_driver_3: idUnit2 === "" ? supir : idUnit2,
        kendaraan_2: selectTypeMobil2 === "" ? kendaraan : selectTypeMobil2,
        nopol_2: SelectNamaKendaraan3 === "" ? nopol : SelectNamaKendaraan3,
        supir_2: idUnit2 === "" ? supir : idUnit2,
      };

      const response = await axios.post(`${Baseurl}sp/approve-SP-purch`, body, {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      });
      const isidata = await response?.data?.status;
      setApproved(isidata);
      setSpDetailZustand();
      Swal.fire({
        icon: "success",
        title: "Approve Sukses",
        text: "The approval process has been completed successfully.",
      });
      await messagedetail();
      handleClose();
    } catch (error) {
      console.log(error);
      notification.error({
        message: "Error",
        description: error.response.data.status.message,
      });
      handleClose();
    }
  };
  const handleAnotherDriverClick = () => {
    setBukaanother(true);
    setBukaanother(!bukaanother);
  };

  const rejectsppurch = async () => {
    Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Anda tidak akan dapat mengembalikan ini!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya",
      cancelButtonText: "Batal",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const body = {
            id_mp: idmp,
          };
          const data = await axios.post(`${Baseurl}sp/reject-purch`, body, {
            headers: {
              "Content-Type": "application/json",
              Authorization: localStorage.getItem("token"),
            },
          });
          Swal.fire({
            icon: "success",
            title: "Berhasil",
            text: "Data telah di reject",
          });
          AmbilStatusApprove();
          setSpDetailZustand();
        } catch (error) {
          console.log(error.response.data.status.message);
          Swal.fire({
            icon: "error",
            title: "Gagal",
            text: error.response.data.status.message,
          });
          console.error(error);
        }
      }
    });
  };

  ///sp reject operasional
  const rejectsp = async () => {
    Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Anda tidak akan dapat mengembalikan ini!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya",
      cancelButtonText: "Batal",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const body = {
            id_mp: idmp,
          };
          const data = await axios.post(`${Baseurl}sp/decline-SP`, body, {
            headers: {
              "Content-Type": "application/json",
              Authorization: localStorage.getItem("token"),
            },
          });
          Swal.fire({
            icon: "success",
            title: "Berhasil",
            text: "Data telah di reject",
          });
          window.location.reload();
        } catch (error) {
          // Menampilkan SweetAlert gagal
          Swal.fire({
            icon: "error",
            title: "Gagal",
            text: "Terjadi kesalahan dalam memproses data.",
          });
          console.error(error);
        }
      }
    });
  };

  //// reject sp akunting
  const rejectspAkunting = async () => {
    Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Anda tidak akan dapat mengembalikan ini!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya",
      cancelButtonText: "Batal",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const body = {
            id_mp: idmp,
          };
          const data = await axios.post(
            `${Baseurl}sp/reject-SP-akunting`,
            body,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: localStorage.getItem("token"),
              },
            }
          );
          Swal.fire({
            icon: "success",
            title: "Berhasil",
            text: "Data telah di reject",
          });
          window.location.reload();
        } catch (error) {
          // Menampilkan SweetAlert gagal
          Swal.fire({
            icon: "error",
            title: "Gagal",
            text: "Terjadi kesalahan dalam memproses data.",
          });
          console.error(error);
        }
      }
    });
  };
  const [vehicletype, setvehicletype] = useState("");

  const mitraOptions = mitraFix.map((item) => ({
    value: item.id,
    label: item.mitra + " " + "(" + item.type + ")",
    mitraId: item.mitraId,
  }));
  const kodeKendaraanOptions = Array.isArray(NomorFix)
    ? NomorFix.map((item) => ({
        value: item.id,
        label: item.no_polisi,
        kd_kendaraan: item.kd_kendaraan,
      }))
    : [];
  const kodeKendaraanOptions2 = Array.isArray(NomorFix2)
    ? NomorFix2.map((item) => ({
        value: item.id,
        label: item.no_polisi,
        kd_kendaraan: item.kd_kendaraan,
      }))
    : [];
  const nomorpolisiOptions = Array.isArray(KodeKendaraanOps)
    ? KodeKendaraanOps.map((item) => ({
        value: item.driverId,
        no_polisi: item.no_polisi,
        label: item.kd_kendaraan + " - " + item.no_polisi + " - " + item.mitra,
        kd_kendaraan: item.kd_kendaraan,
      }))
    : [];

  const anotneroptionsdriver = Array.isArray(driveranother)
    ? driveranother.map((item) => ({
        value: item.id,
        label: item.name + " || " + item?.mitra,
        kd_kendaraan: item.kd_kendaraan,
        name: item.name,
      }))
    : [];

  // const nomorpolisiOptions = nomorpolisi.filter(item => item.mitra === mitra1).map(item => ({
  //   value: item.driverId,
  //   label: item.no_polisi,
  // }));
  // const nomorpolisiOptions2 = NomorPolisi2.filter(item => item.mitra === mitra2).map(item => ({
  //   value: item.driverId,
  //   label: item.no_polisi,
  // }));

  useEffect(() => {
    const handleStorageChange = () => {
      setJobdesk(localStorage.getItem("jobdesk"));
    };
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);
  const approvebaru = (idMpd, data) => {
    setIDMPD(idMpd);
    handleShow();
    setDataUntukPurchsingDanApprovenya(data);
    // HandleApproveOPS(idMpd)
    // HandleApprovePURCH(idMpd)
  };

  ////ini approve akunting
  const akuntingAprpove = async () => {
    Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Anda ingin menyetujui?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, setujui!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post(
            `${Baseurl}sp/approve-SP-akunting`,
            {
              id_mp: idmp,
            },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: localStorage.getItem("token"),
              },
            }
          )
          .then((response) => {
            const data = response.data;
            Swal.fire("Sukses!", "Berhasil disetujui.", "success");
          });

        setTimeout(() => {
          window.location.reload();
        }, 1500).catch((error) => {
          Swal.fire("Gagal!", "Terjadi kesalahan saat menyetujui.", "error");
        });
      }
    });
  };
  let counter = 1;

  ////select nomor polisi sama nama driver
  // const options = nomorpolisi.map(vehicle => ({
  //   value: vehicle.id,
  //   label: vehicle.no_polisi + "-" + vehicle.kd_kendaraan
  // }));
  // const options2 = NomorPolisi2.map(vehicle => ({
  //   value: vehicle.id,
  //   label: vehicle.no_polisi + "-" + vehicle.kd_kendaraan
  // }));

  const handleSelectChange = (selectedOption) => {
    if (selectedOption) {
      setSelectnomor(selectedOption.value);

      const selectedVehicle = nomorpolisi.find(
        (vehicle) => vehicle.id === selectedOption.value
      );
      if (selectedVehicle) {
        setSelectNopol(selectedVehicle.no_polisi);
      }
    }
  };

  ////// approve sp purchasing 3

  localStorage.setItem(`mitra1`, mitra1);
  localStorage.setItem(`kendaraan`, types[0]);
  localStorage.setItem(`idkodekendaraan1`, selectnomor);
  localStorage.setItem(`IdDriver`, idUnit);
  localStorage.setItem(`mitra2`, mitra2);
  localStorage.setItem(`idkodekendaraan2`, selectnomor2);
  localStorage.setItem(`IdDriver2`, idUnit2);

  // console.log(`isi Mitra1Multi?.driverName `, Mitra1Multi?.driverName);
  // const [isisp , setisisp]= useState("")
  // useEffect(()=>{
  //   if (isidata[0] ) {
  //     setisisp(isidata[0]?.sp)
  //   } else {
  //     setisisp("ksoong")
  //     Swal.fire({
  //       icon: 'error',
  //       title: 'Oops...',
  //       text: 'SP tidak tersedia!',
  //     });
  //   }
  // })

  //// ngambil mitra 1 kalau multi

  const MitraMulti = async (idmpd) => {
    try {
      const data = await axios.get(
        `${Baseurl}sp/get-SP-detail-purch?id_mpd=${idmpd}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      // console.log(`ini mitra 1`, data.data.data[0]);
      setMitra1Multi(data.data.data[0]);
    } catch (error) {}
  };
  useEffect(() => {
    MitraMulti();
    AmbilStatusApprove();
    setDriverType();
    fetchMitra();
    setWarnaPlat();
    setjenisKepemilikan();
  }, [StatusApproveAct, StatusPurchasing, Kendaraan_operasionalStatus]);

  let angkamanual = 1;

  ////ambil status approve
  const AmbilStatusApprove = async () => {
    try {
      const data = await axios.get(
        `${Baseurl}sp/get-status-approve?id_mp=${idmp}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      setStatusApproveAct(data.data.status.message.act_akunting);
      setStatusApproveActOpt(data.data.status.message.kendaraan_operasional);
      setTanggalACT3(data.data.status.message.tgl_act_3);
      setTanggalACT4(data.data.status.message.tgl_act_4);
      setTanggalACT5(data.data.status.message.tgl_act_5);
      setKendaraanOperasionalStatus(
        data.data.status.message.kendaraan_operasional
      );
      setStatusPurchasing(data.data.status.message.kendaraan_purchasing);
    } catch (error) {}
  };

  const validationSchema = Yup.object().shape({
    kode_kendaraan: Yup.string().required("Kode Kendaraan wajib diisi"),
    no_polisi: Yup.string().required("No Polisi wajib diisi"),
    tgl_stnk: Yup.date().required("Tanggal STNK wajib diisi"),
    jenis_kepemilikan: Yup.string().required("Jenis Kepemilikan wajib diisi"),
    jenis_kendaraan: Yup.string().required("Jenis Kendaraan wajib diisi"),
    vendor: Yup.string().required("Vendor Kendaraan wajib diisi"),
    // nama_driver: Yup.string().required('Nama Driver wajib diisi'),
    // tgl_plat_nomor: Yup.string().required('tgl plat nomor wajib diisi'),
    // warna_plat: Yup.string().required('Warna Plat wajib diisi'),
    // merk_mobil: Yup.string().required('Merk Mobil wajib diisi'),
    // tahun_mobil: Yup.number().required('Tahun Mobil wajib diisi').integer('Tahun Mobil harus berupa angka'),
    // panjang: Yup.number().required('Panjang Kendaraan wajib diisi').integer('Panjang Kendaraan harus berupa angka'),
    // lebar: Yup.number().required('Lebar Kendaraan wajib diisi').integer('Lebar Kendaraan harus berupa angka'),
    // tinggi: Yup.number().required('Tinggi Kendaraan wajib diisi').integer('Tinggi Kendaraan harus berupa angka'),
    // no_bpkb: Yup.string().required('No BPKB wajib diisi'),
    // stnk: Yup.string().required('STNK wajib diisi'),
    // tgl_kir: Yup.date().required('Tanggal KIR wajib diisi'),
    // tgl_beli: Yup.date().required('Tanggal Pembelian wajib diisi'),
    // kapasitas: Yup.number().required('Kapasitas wajib diisi').integer('Kapasitas harus berupa angka'),
    // kapasitas_maks: Yup.number().required('Kapasitas Maks wajib diisi').integer('Kapasitas Maks harus berupa angka'),
    // kubikasi: Yup.number().required('Kubikasi wajib diisi').integer('Kubikasi harus berupa angka'),
    // location: Yup.string().required('Lokasi wajib diisi'),
    // id_driver: Yup.string().required('ID Driver wajib diisi'),
    // id_kendaraan_jenis: Yup.string().required('ID Jenis Kendaraan wajib diisi'),
    // FotoDriver: Yup.string().required('Foto Vehicle wajib diisi')
  });
  const formik = useFormik({
    initialValues: {
      tgl_stnk: "",
      fotoVehicle: "",
      kode_kendaraan: "",
      no_polisi: "",
      jenis_kepemilikan: "",
      jenis_kendaraan: "",
      vendor: "",
      nama_driver: "",
      jenis_SIM: "",
      warna_plat: "",
      merk_mobil: "",
      tahun_mobil: "",
      warna_plat: "",
      panjang: "",
      lebar: "",
      tinggi: "",
      tgl_plat_nomor: "",
      no_bpkb: "",
      stnk: "",
      tgl_kir: "",
      tgl_beli: "",
      kapasitas: "",
      kapasitas_maks: "",
      kubikasi: "",
      location: "",
      id_driver: "",
      id_kendaraan_jenis: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      BuatVehicle(values);
      setModal1Open(false);
      handleShow();
      console.log(formik.errors);
      console.log(values);
    },
  });

  const DriverName = async (value) => {
    try {
      const data = await axios.get(
        `${Baseurl}vehicle/get-select?vehicleType=${value}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      setNamaSupir(data.data.data.driverName);
    } catch (error) {}
  };
  const DetailMarketing = () => {
    setmodal1OpenDetail(true);
  };
  const BuatVehicle = async (values, newFileList) => {
    try {
      const formData = new FormData();
      Object.keys(values).forEach((key) => formData.append(key, values[key]));
      formData.append("cover", FotoDriver);

      const data = await axios.post(
        `${Baseurl}vehicle/create-vehicle`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Data kendaraan berhasil ditambahkan",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: "Terjadi kesalahan saat menambahkan data kendaraan",
      });
    }
  };

  const [ShowModalCreatePO, setShowModalCreatePO] = useState(false);
  const [validasipurch, setvalidasipurch] = useState({
    idUnit1: "",
    idUnit2: "",
  });
  const statusvalidasipurch = async (e) => {
    try {
      const data = await axios.get(
        `${Baseurl}sm/get-status-approve-purch?id_mpd=${e}`,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      setvalidasipurch({
        idUnit1: data.data.idUnit1,
        idUnit2: data.data.idUnit2,
      });
      console.log(`validasipurch`, validasipurch);
    } catch (error) {}
  };

  const approveSemua = (idmpd) => {
    // Mengumpulkan semua ID pengadaan detail di SP
    const semuaIdPengadaan = [idmpd]; // Isi dengan ID pengadaan detail dari SP
    // contoh: const semuaIdPengadaan = [1, 2, 3]; // Ganti dengan ID yang sesuai
  
    // Tembak API update SP detail sebanyak jumlah SP detail yang ada
    semuaIdPengadaan.forEach((idmpd) => {
      HandleApproveOPS(idmpd); // Memanggil fungsi yang menyetujui detail SP
    });
  };

  return (
    <>
      <Row>
        <ModalAntd
          title="Create Vehicle"
          style={{
            width: 800,
            top: 20,
            zIndex: 99999999,
          }}
          width={800}
          open={modal1Open}
          onOk={formik.handleSubmit}
          onCancel={() => setModal1Open(false)}
        >
          <AntForm>
            <Row>
              <Col sm={4}>
                <Card>
                  <img src={FotoDriver}></img>
                </Card>
                <Upload
                  name="fotoVehicle"
                  beforeUpload={(file) => {
                    // Mencegah upload default
                    return false;
                  }}
                  onChange={({ fileList }) => {
                    // Ambil file asli dari fileList terakhir dan simpan dalam state
                    if (fileList.length > 0) {
                      const { originFileObj } = fileList[fileList.length - 1];
                      setFotoDriver(originFileObj);
                    } else {
                      setFotoDriver(null);
                    }
                  }}
                >
                  <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>
                <AntForm.Item
                  label="Tgl EXP STNK"
                  required
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  help={formik.touched.tgl_stnk && formik.errors.tgl_stnk}
                  validateStatus={
                    formik.touched.tgl_stnk && formik.errors.tgl_stnk
                      ? "error"
                      : "success"
                  }
                  style={{ marginBottom: 2, width: "100%" }}
                >
                  <DatePicker
                    id="tgl_stnk"
                    name="tgl_stnk"
                    onChange={(date) => {
                      formik.setFieldValue(
                        "tgl_stnk",
                        date ? date.format("YYYY-MM-DD") : ""
                      );
                    }}
                    value={
                      formik.values.tgl_stnk
                        ? moment(formik.values.tgl_stnk)
                        : null
                    }
                    onBlur={formik.handleBlur}
                  />
                </AntForm.Item>
                <AntForm.Item
                  label="Tgl Exp Plat Nomor"
                  required
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  help={
                    formik.touched.tgl_plat_nomor &&
                    formik.errors.tgl_plat_nomor
                  }
                  validateStatus={
                    formik.touched.tgl_plat_nomor &&
                    formik.errors.tgl_plat_nomor
                      ? "error"
                      : "success"
                  }
                  style={{ marginBottom: 2 }}
                >
                  <DatePicker
                    id="tgl_plat_nomor"
                    name="tgl_plat_nomor"
                    onChange={(date) => {
                      formik.setFieldValue(
                        "tgl_plat_nomor",
                        date ? date.format("YYYY-MM-DD") : ""
                      );
                    }}
                    value={
                      formik.values.tgl_plat_nomor
                        ? moment(formik.values.tgl_plat_nomor)
                        : null
                    }
                    onBlur={formik.handleBlur}
                  />
                </AntForm.Item>
                <AntForm.Item
                  label="Tgl Exp Kir"
                  required
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  help={formik.touched.tgl_kir && formik.errors.tgl_kir}
                  validateStatus={
                    formik.touched.tgl_kir && formik.errors.tgl_kir
                      ? "error"
                      : "success"
                  }
                  style={{ marginBottom: 2 }}
                >
                  <DatePicker
                    id="tgl_kir"
                    name="tgl_kir"
                    onChange={(date) => {
                      formik.setFieldValue(
                        "tgl_kir",
                        date ? date.format("YYYY-MM-DD") : ""
                      );
                    }}
                    value={
                      formik.values.tgl_kir
                        ? moment(formik.values.tgl_kir)
                        : null
                    }
                    onBlur={formik.handleBlur}
                  />
                </AntForm.Item>

                <AntForm.Item
                  label="Tgl Beli"
                  required
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  help={formik.touched.tgl_beli && formik.errors.tgl_beli}
                  validateStatus={
                    formik.touched.tgl_beli && formik.errors.tgl_beli
                      ? "error"
                      : "success"
                  }
                  style={{ marginBottom: 2 }}
                >
                  <DatePicker
                    id="tgl_beli"
                    name="tgl_beli"
                    onChange={(date) => {
                      formik.setFieldValue(
                        "tgl_beli",
                        date ? date.format("YYYY-MM-DD") : ""
                      );
                    }}
                    value={
                      formik.values.tgl_beli
                        ? moment(formik.values.tgl_beli)
                        : null
                    }
                    onBlur={formik.handleBlur}
                  />
                </AntForm.Item>
              </Col>
              <Col sm={4}>
                <AntForm.Item
                  label="Jenis Kepemilikan"
                  required
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  help={
                    formik.touched.jenis_kepemilikan &&
                    formik.errors.jenis_kepemilikan
                  }
                  validateStatus={
                    formik.touched.jenis_kepemilikan &&
                    formik.errors.jenis_kepemilikan
                      ? "error"
                      : "success"
                  }
                  style={{ marginBottom: 2 }}
                >
                  <SelectAntd
                    showSearch
                    optionFilterProp="children"
                    id="jenis_kepemilikan"
                    name="jenis_kepemilikan"
                    onChange={(value) =>
                      formik.setFieldValue("jenis_kepemilikan", value)
                    }
                    value={formik.values.jenis_kepemilikan || ""}
                    onBlur={formik.handleBlur}
                  >
                    {jenisKepemilikan.map((option) => (
                      <SelectAntd.Option
                        key={option.label}
                        value={option.jenis}
                      >
                        {option.jenis}
                      </SelectAntd.Option>
                    ))}
                  </SelectAntd>
                </AntForm.Item>
                <AntForm.Item
                  label="Kode Kendaraan"
                  required
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  help={
                    formik.touched.kode_kendaraan &&
                    formik.errors.kode_kendaraan
                  }
                  validateStatus={
                    formik.touched.kode_kendaraan &&
                    formik.errors.kode_kendaraan
                      ? "error"
                      : "success"
                  }
                  style={{ marginBottom: 2 }}
                >
                  <Input
                    id="kode_kendaraan"
                    name="kode_kendaraan"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.kode_kendaraan}
                    onBlur={formik.handleBlur}
                  />
                </AntForm.Item>

                <AntForm.Item
                  style={{ marginBottom: 2 }}
                  label="No Polisi"
                  required
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  help={formik.touched.no_polisi && formik.errors.no_polisi}
                  validateStatus={
                    formik.touched.no_polisi && formik.errors.no_polisi
                      ? "error"
                      : "success"
                  }
                >
                  <Input
                    id="no_polisi"
                    name="no_polisi"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.no_polisi}
                    onBlur={formik.handleBlur}
                  />
                </AntForm.Item>
                <AntForm.Item
                  style={{ marginBottom: 2 }}
                  label="Mitra"
                  required
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  help={formik.touched.vendor && formik.errors.vendor}
                  validateStatus={
                    formik.touched.vendor && formik.errors.vendor
                      ? "error"
                      : "success"
                  }
                >
                  <SelectAntd
                    showSearch
                    optionFilterProp="children"
                    id="vendor"
                    name="vendor"
                    onChange={(value, option) => {
                      formik.setFieldValue("vendor", option.children); // ini akan mengambil label (children dari option)
                      formik.setFieldValue("id_vendor", value); // ini akan mengambil value dari option yang dipilih
                    }}
                    onBlur={formik.handleBlur}
                    value={formik.values.vendor || ""}
                  >
                    {NamaMitraOptions &&
                      NamaMitraOptions.map((option) => (
                        <SelectAntd.Option
                          key={option.value}
                          value={option.value}
                        >
                          {option.label}
                        </SelectAntd.Option>
                      ))}
                  </SelectAntd>
                </AntForm.Item>

                <AntForm.Item
                  label="Jenis Kendaraan"
                  required
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  help={
                    formik.touched.jenis_kendaraan &&
                    formik.errors.jenis_kendaraan
                  }
                  validateStatus={
                    formik.touched.jenis_kendaraan &&
                    formik.errors.jenis_kendaraan
                      ? "error"
                      : "success"
                  }
                  style={{ marginBottom: 2 }}
                >
                  <SelectAntd
                    showSearch
                    optionFilterProp="children"
                    id="jenis_kendaraan"
                    name="jenis_kendaraan"
                    type="text"
                    onChange={(value, option) => {
                      formik.setFieldValue("jenis_kendaraan", value);
                      formik.setFieldValue(
                        "id_kendaraan_jenis",
                        parseInt(option.key)
                      );
                      DriverName(value);
                    }}
                    value={formik.values.jenis_kendaraan}
                    onBlur={formik.handleBlur}
                  >
                    {DriverType.map((item) => (
                      <SelectAntd.Option key={item.id} value={item.tipe}>
                        {item.tipe}
                      </SelectAntd.Option>
                    ))}
                  </SelectAntd>
                </AntForm.Item>
                <AntForm.Item
                  label="Nama Driver"
                  required
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  help={formik.touched.id_driver && formik.errors.id_driver}
                  validateStatus={
                    formik.touched.id_driver && formik.errors.id_driver
                      ? "error"
                      : "success"
                  }
                  style={{ marginBottom: 2 }}
                >
                  <SelectAntd
                    showSearch
                    optionFilterProp="children"
                    id="id_driver"
                    name="id_driver"
                    type="text"
                    onChange={(value) => {
                      formik.setFieldValue("id_driver", value);
                    }}
                    placeholder="pilih driver"
                    value={formik.values.id_driver}
                    onBlur={formik.handleBlur}
                  >
                    {NamaSupir &&
                      NamaSupir.map((item) => (
                        <SelectAntd.Option
                          key={item.tipe}
                          value={item.driverId}
                        >
                          {item.driverName}
                        </SelectAntd.Option>
                      ))}
                  </SelectAntd>
                  <a
                    href="/masterdata/purchasing/driver"
                    target="_blank"
                    style={{ color: "blue" }}
                  >
                    Tambah Driver
                  </a>
                </AntForm.Item>

                <AntForm.Item
                  label="Warna Plat"
                  placeholder="warna"
                  required
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  help={formik.touched.warna_plat && formik.errors.warna_plat}
                  validateStatus={
                    formik.touched.warna_plat && formik.errors.warna_plat
                      ? "error"
                      : "success"
                  }
                  style={{ marginBottom: 2 }}
                >
                  <SelectAntd
                    id="warna_plat"
                    name="warna_plat"
                    type="text"
                    placeholder="test"
                    onChange={(value) =>
                      formik.setFieldValue("warna_plat", value)
                    }
                    value={formik.values.warna_plat}
                    onBlur={formik.handleBlur}
                  >
                    {WarnaPlat &&
                      WarnaPlat.map((item) => (
                        <SelectAntd.Option key={item.warna} value={item.warna}>
                          {item.warna}
                        </SelectAntd.Option>
                      ))}
                  </SelectAntd>
                </AntForm.Item>
                <AntForm.Item
                  label="Merk Mobil"
                  required
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  help={formik.touched.merk_mobil && formik.errors.merk_mobil}
                  validateStatus={
                    formik.touched.merk_mobil && formik.errors.merk_mobil
                      ? "error"
                      : "success"
                  }
                  style={{ marginBottom: 2 }}
                >
                  <Input
                    id="merk_mobil"
                    name="merk_mobil"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.merk_mobil}
                    onBlur={formik.handleBlur}
                  />
                </AntForm.Item>
              </Col>
              <Col sm={4}>
                <AntForm.Item
                  label="Tahun Mobil"
                  required
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  help={formik.touched.tahun_mobil && formik.errors.tahun_mobil}
                  validateStatus={
                    formik.touched.tahun_mobil && formik.errors.tahun_mobil
                      ? "error"
                      : "success"
                  }
                  style={{ marginBottom: 2 }}
                >
                  <Input
                    id="tahun_mobil"
                    name="tahun_mobil"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.tahun_mobil}
                    onBlur={formik.handleBlur}
                  />
                </AntForm.Item>
                {/* <AntForm.Item
                                    label="Warna Plat"
                                    required
                                    labelCol={{ span: 24 }}
                                    wrapperCol={{ span: 24 }}
                                    help={formik.touched.warna_plat && formik.errors.warna_plat}
                                    validateStatus={formik.touched.warna_plat && formik.errors.warna_plat ? 'error' : 'success'}
                                    style={{ marginBottom: 2 }}
                                >
                                    <Input
                                        id="warna_plat"
                                        name="warna_plat"
                                        type="text"
                                        onChange={formik.handleChange}
                                        value={formik.values.warna_plat}
                                        onBlur={formik.handleBlur}
                                    />
                                </AntForm.Item> */}
                <Row gutter={16}>
                  <Col sm={4}>
                    <AntForm.Item
                      label="Panjang"
                      required
                      labelCol={{ span: 24 }}
                      wrapperCol={{ span: 24 }}
                      help={formik.touched.panjang && formik.errors.panjang}
                      validateStatus={
                        formik.touched.panjang && formik.errors.panjang
                          ? "error"
                          : "success"
                      }
                      style={{ marginBottom: 2 }}
                    >
                      <Input
                        id="panjang"
                        name="panjang"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.panjang}
                        onBlur={formik.handleBlur}
                      />
                    </AntForm.Item>
                  </Col>
                  <Col sm={4}>
                    <AntForm.Item
                      label="Lebar"
                      required
                      labelCol={{ span: 24 }}
                      wrapperCol={{ span: 24 }}
                      help={formik.touched.lebar && formik.errors.lebar}
                      validateStatus={
                        formik.touched.lebar && formik.errors.lebar
                          ? "error"
                          : "success"
                      }
                      style={{ marginBottom: 2 }}
                    >
                      <Input
                        id="lebar"
                        name="lebar"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.lebar}
                        onBlur={formik.handleBlur}
                      />
                    </AntForm.Item>
                  </Col>
                  <Col sm={4}>
                    <AntForm.Item
                      label="Tinggi"
                      required
                      labelCol={{ span: 24 }}
                      wrapperCol={{ span: 24 }}
                      help={formik.touched.tinggi && formik.errors.tinggi}
                      validateStatus={
                        formik.touched.tinggi && formik.errors.tinggi
                          ? "error"
                          : "success"
                      }
                      style={{ marginBottom: 2 }}
                    >
                      <Input
                        id="tinggi"
                        name="tinggi"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.tinggi}
                        onBlur={formik.handleBlur}
                      />
                    </AntForm.Item>
                  </Col>
                </Row>
                <AntForm.Item
                  label="No BPKB"
                  required
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  help={formik.touched.no_bpkb && formik.errors.no_bpkb}
                  validateStatus={
                    formik.touched.no_bpkb && formik.errors.no_bpkb
                      ? "error"
                      : "success"
                  }
                  style={{ marginBottom: 2 }}
                >
                  <Input
                    id="no_bpkb"
                    name="no_bpkb"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.no_bpkb}
                    onBlur={formik.handleBlur}
                  />
                </AntForm.Item>
                <AntForm.Item
                  label="STNK"
                  required
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  help={formik.touched.stnk && formik.errors.stnk}
                  validateStatus={
                    formik.touched.stnk && formik.errors.stnk
                      ? "error"
                      : "success"
                  }
                  style={{ marginBottom: 2 }}
                >
                  <Input
                    id="stnk"
                    name="stnk"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.stnk}
                    onBlur={formik.handleBlur}
                  />
                </AntForm.Item>

                <AntForm.Item
                  label="Kapasitas"
                  required
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  help={formik.touched.tinggi && formik.errors.tinggi}
                  validateStatus={
                    formik.touched.tinggi && formik.errors.tinggi
                      ? "error"
                      : "success"
                  }
                  style={{ marginBottom: 2 }}
                >
                  <Input
                    id="kapasitas"
                    name="kapasitas"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.kapasitas}
                    onBlur={formik.handleBlur}
                  />
                </AntForm.Item>
                <AntForm.Item
                  label="Kapasitas Max"
                  required
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  help={
                    formik.touched.kapasitas_maks &&
                    formik.errors.kapasitas_maks
                  }
                  validateStatus={
                    formik.touched.kapasitas_maks &&
                    formik.errors.kapasitas_maks
                      ? "error"
                      : "success"
                  }
                  style={{ marginBottom: 2 }}
                >
                  <Input
                    id="kapasitas_maks"
                    name="kapasitas_maks"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.kapasitas_maks}
                    onBlur={formik.handleBlur}
                  />
                </AntForm.Item>
                <AntForm.Item
                  label="Kubikasi"
                  required
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  help={formik.touched.tinggi && formik.errors.tinggi}
                  validateStatus={
                    formik.touched.tinggi && formik.errors.tinggi
                      ? "error"
                      : "success"
                  }
                  style={{ marginBottom: 2 }}
                >
                  <Input
                    id="kubikasi"
                    name="kubikasi"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.kubikasi}
                    onBlur={formik.handleBlur}
                  />
                </AntForm.Item>
                <AntForm.Item
                  label="Location"
                  required
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  help={formik.touched.tinggi && formik.errors.tinggi}
                  validateStatus={
                    formik.touched.tinggi && formik.errors.tinggi
                      ? "error"
                      : "success"
                  }
                  style={{ marginBottom: 2 }}
                >
                  <Input
                    id="location"
                    name="location"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.location}
                    onBlur={formik.handleBlur}
                  />
                </AntForm.Item>
              </Col>
            </Row>
          </AntForm>
        </ModalAntd>
        <div className="d-flex justify-content-end">
          {jobdesk == "operasional" && (
            <>
              {jobdesk != "purchasing" && jobdesk != "operasional" && (
                <>
                  <Button
                    size="sm"
                    onClick={() =>
                      jobdesk === "akunting" ? akuntingAprpove() : handleShow()
                    }
                  >
                    Approve
                  </Button>
                </>
              )}

              {/* Modal Approve Operasional */}
              <Modal show={show} onHide={handleClose} size="md">
                <Modal.Header closeButton>
                  <Modal.Title>Approve {jobdesk}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  {jobdesk == "operasional" && (
                    <>
                      <Row>
                        <Col sm={12}>
                          <Form.Label>Vehicle Type Operasional</Form.Label>
                          <Form.Select
                            type="text"
                            disabled
                            value={NamaMobilDariTable || ""}
                            onChange={(e) => {}}
                          >
                            {types.map((type, index) => (
                              <option key={index} value={type}>
                                {type}
                              </option>
                            ))}
                          </Form.Select>
                        </Col>
                      </Row>
                      <Row>
                        <Col sm={12}>
                          <Form.Label>Kode Kendaraan</Form.Label>
                          {/* <Select
                          // options={options}
                          onChange={handleSelectChange}
                        /> */}
                          <Select
                            options={nomorpolisiOptions}
                            onChange={(selectedOption) => {
                              setSelectnomor(selectedOption.value);
                              setSelectNopol(selectedOption.no_polisi);
                            }}
                          />
                          <a
                            href="/masterdata/purchasing/driver"
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => {
                              // setModal1Open(true);
                              // setShow(false);
                            }}
                            style={{ color: "blue" }}
                          >
                            Tambah Kendaraan
                          </a>
                        </Col>
                      </Row>
                      <Row>
                        <Col sm={12}>
                          <Form.Label>Select Driver</Form.Label>
                          <Form.Select
                            value={selectDriver[0]?.idUnit}
                            onChange={(e) => {
                              setIdunit(e.target.value);
                            }}
                          >
                            <option value={selectDriver[0]?.idUnit}>
                              {selectDriver[0] && selectDriver[0]?.name != ""
                                ? selectDriver[0] && selectDriver[0]?.name
                                : "tidak tersedia"}
                            </option>
                          </Form.Select>
                        </Col>
                      </Row>
                    </>
                  )}

                  {/* Bukan operasional */}
                  {jobdesk != "operasional" && (
                    <>
                      <Row>
                        <Col sm={3}>
                          {jobdesk == "purchasing" ? (
                            <>
                              <Form.Label>Select Mitra 1</Form.Label>
                              <Select
                                options={mitraOptions}
                                onChange={(mitraOptions) => {
                                  setSelectMitra(mitraOptions.value);
                                }}
                              />
                            </>
                          ) : null}
                        </Col>

                        <Col sm={3}>
                          <Form.Label>Vehicle Type</Form.Label>
                          <Form.Select
                            type="text"
                            disabled
                            value={types[0] || ""}
                            onChange={(e) => {}}
                          >
                            {types.map((type, index) => (
                              <option key={index} value={type}>
                                {type}
                              </option>
                            ))}
                          </Form.Select>
                        </Col>
                        <Col sm={3}>
                          <Form.Label>Kode Kendaraan</Form.Label>
                          <Select
                            // options={nomorpolisiOptions}
                            onChange={(selectedOption) => {
                              setSelectnomor(selectedOption.value);
                              setSelectNopol(selectedOption.label);
                            }}
                          />
                        </Col>
                        <Col sm={3}>
                          <Form.Label>Select Driver</Form.Label>
                          <Form.Select
                            value={selectDriver[0]?.id}
                            onChange={(e) => {
                              setIdunit(e.target.value);
                            }}
                          >
                            <option value={selectDriver[0]?.id}>
                              {selectDriver[0] && selectDriver[0]?.name != ""
                                ? selectDriver[0] && selectDriver[0]?.name
                                : "tidak tersedia"}
                            </option>
                          </Form.Select>
                        </Col>
                      </Row>
                      <Row>
                        <Col sm={3}>
                          {jobdesk == "purchasing" ? (
                            <>
                              <Form.Label>Select Mitra 2</Form.Label>
                              <Select
                                options={mitraOptions}
                                onChange={(mitraOptions) => {
                                  setSelectMitra(mitraOptions.value);
                                }}
                              />
                            </>
                          ) : null}
                        </Col>

                        <Col sm={3}>
                          <Form.Label>Vehicle Type</Form.Label>
                          <Form.Select
                            type="text"
                            disabled
                            value={types[0] || ""}
                            onChange={(e) => {}}
                          >
                            {types.map((type, index) => (
                              <option key={index} value={type}>
                                {type}
                              </option>
                            ))}
                          </Form.Select>
                        </Col>
                        <Col sm={3}>
                          <Form.Label>Kode Kendaraan</Form.Label>
                          <Select
                            // options={nomorpolisiOptions}
                            onChange={(selectedOption) => {
                              setSelectnomor(selectedOption.value);
                              setSelectNopol(selectedOption.label);
                            }}
                          />
                        </Col>
                        <Col sm={3}>
                          <Form.Label>Select Driver</Form.Label>
                          <Form.Select
                            value={selectDriver[0]?.id}
                            onChange={(e) => {
                              setIdunit2(e.target.value);
                            }}
                          >
                            <option value={selectDriver[0]?.id}>
                              {selectDriver[0] && selectDriver[0]?.name != ""
                                ? selectDriver[0] && selectDriver[0]?.name
                                : "tidak tersedia"}
                            </option>
                          </Form.Select>
                        </Col>
                      </Row>
                      <Row>
                        <Col sm={3}>
                          {jobdesk == "purchasing" ? (
                            <>
                              <Form.Label>Select Mitra 3</Form.Label>
                              <Select
                                options={mitraOptions}
                                onChange={(mitraOptions) => {
                                  setSelectMitra(mitraOptions.value);
                                }}
                              />
                            </>
                          ) : null}
                        </Col>

                        <Col sm={3}>
                          <Form.Label>Vehicle Type</Form.Label>
                          <Form.Select
                            type="text"
                            disabled
                            value={types[0] || ""}
                            onChange={(e) => {}}
                          >
                            {types.map((type, index) => (
                              <option key={index} value={type}>
                                {type}
                              </option>
                            ))}
                          </Form.Select>
                        </Col>
                        <Col sm={3}>
                          <Form.Label>Kode Kendaraan</Form.Label>
                          <Select
                            // options={nomorpolisiOptions}
                            onChange={(selectedOption) => {
                              setSelectnomor(selectedOption.value);
                              setSelectNopol(selectedOption.label);
                            }}
                          />
                        </Col>
                        <Col sm={3}>
                          <Form.Label>Select Driver</Form.Label>
                          <Form.Select
                            // placeholder={selectDriver[0]?.id}
                            value={selectDriver[0]?.id}
                            onChange={(e) => {
                              console.log(e.target.value);
                              setIdunit(e.target.value);
                            }}
                          >
                            <option value={selectDriver[0]?.id}>
                              {selectDriver[0] && selectDriver[0]?.name != ""
                                ? selectDriver[0] && selectDriver[0]?.name
                                : "tidak tersedia"}
                            </option>
                          </Form.Select>
                        </Col>
                      </Row>
                    </>
                  )}
                  <>
                    {jobdesk != "purchasing" ? (
                      <Checkbox
                        className="justify-content-end d-flex mt-2"
                        onChange={handleCheckboxChange}
                      >
                        Lanjut Ke Purchasing
                      </Checkbox>
                    ) : null}

                    <br />
                    <hr />

                    <Button
                      size="sm"
                      onClick={() => handleAnotherDriverClick()}
                    >
                      Pilihan Another Driver
                    </Button>
                    <br />
                    {bukaanother && (
                      <>
                        {/* <AntForm.Item
                          style={{ marginBottom: 2 }}
                          label="Select Driver"
                          required
                          labelCol={{ span: 24 }}
                          wrapperCol={{ span: 24 }}
                          help={formik.touched.vendor && formik.errors.vendor}
                          validateStatus={formik.touched.vendor && formik.errors.vendor ? 'error' : 'success'}
                        >
                          <SelectAntd
                            showSearch
                            optionFilterProp="children"
                            id="vendor"
                            name="vendor"
                            onChange={(e) => setIdunit(e.target.value)}
                            onBlur={formik.handleBlur}
                            value={idUnit}
                          >
                            {driveranother && driveranother.map((option) => (
                              <SelectAntd.Option key={option.value} value={option.id}>
                                {option.name}
                              </SelectAntd.Option>
                            ))}
                          </SelectAntd> */}

                        {/* </AntForm.Item> */}
                        <Form.Label>Select Driver Another</Form.Label>
                        {/* <Form.Select
                          onChange={(e) => {console.log(e.target.value); setIdunit(e.target.value)}}
                        >
                          <option>Select Driver</option>
                          {driveranother &&
                            driveranother.map((item, index) => (
                              <option key={index} value={item.id}>
                                {item?.name}
                              </option>
                            ))}
                        </Form.Select> */}
                        <Select
                          options={anotneroptionsdriver}
                          onChange={(selectedOption) => {
                            setIdunit(selectedOption.value);
                            GantiIDDriverAnother(selectedOption.value);
                            setNameDriverOperasionalAnother(
                              selectedOption.name
                            );
                            GantiNamaDriverAnother(selectedOption.name);
                            // setSelectnomor(selectedOption.mitra);
                            // setSelectNopol(selectedOption.no_polisi);
                          }}
                        />
                      </>
                    )}
                  </>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button
                    variant="primary"
                    onClick={() =>
                      jobdesk == "operasional"
                        ? HandleApproveOPS()
                        : HandleApprovePURCH()
                    }
                    disabled={LoadingMuterMuter}
                  >
                    {LoadingMuterMuter ? "Loading..." : "Save Changes"}
                  </Button>
                </Modal.Footer>
              </Modal>
            </>
          )}
          {IsiKomenRejectSP === "Tidak Menggunakan unit" ? (
            <Alert type="error" message="SO Sudah Di Reject" banner />
          ) : (
            <>
              {jobdesk !== "purchasing" &&
                jobdesk !== "operasional" &&
                StatusApproveAct !== "Y" &&
                TanggalACT3 == null && (
                  <Button
                    size="sm"
                    onClick={() =>
                      jobdesk === "akunting" ? akuntingAprpove() : handleShow()
                    }
                  >
                    Approve
                  </Button>
                )}
              {StatusApproveAct !== "Y" && TanggalACT3 === null && (
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() =>
                    jobdesk === "akunting" ? rejectspAkunting() : rejectsp()
                  }
                >
                  Reject SO
                </Button>
              )}

              {/* {(StatusApproveAct === 'N') &&
                <Button size="sm" variant="danger" onClick={() => jobdesk === "akunting" ? rejectspAkunting() : rejectsp()}>
                  Reject SP
                </Button> */}
              {/* } */}
              {/* {(Kendaraan_operasionalStatus === "N" && StatusApproveAct === 'Y') &&
                <Alert type="success" message="SP Telah di Approve" banner />
              } */}
              {/* {(Kendaraan_operasionalStatus === "N" && StatusApproveAct === 'Y') &&
                "" */}

              {/* {(StatusApproveAct === 'Y' || Kendaraan_operasionalStatus === "Y" && StatusPurchasing === "Y") &&
                <Alert type="success" message="SP Telah di Approve" banner />
              log} */}

              {StatusApproveAct === "Y" && TanggalACT3 != null ? (
                <Alert type="success" message="Approve Akunting" banner />
              ) : (StatusApproveAct === "N" &&
                  TanggalACT3 === "1970-01-01T00:00:00.000Z") ||
                "2023-10-09T12:50:49.000Z" ? (
                <Alert type="error" message="Reject Akunting" banner />
              ) : (StatusApproveAct === "N" &&
                  TanggalACT3 !== "1970-01-01T00:00:00.000Z") ||
                "2023-10-09T12:50:49.000Z" ? (
                <Alert type="info" message="Waiting Akunting" banner />
              ) : null}

              {Kendaraan_operasionalStatus === "Y" && TanggalACT4 != null ? (
                <Alert type="success" message="Approve Operasional" banner />
              ) : (StatusApproveOpt === "N" &&
                  TanggalACT4 === "1970-01-01T00:00:00.000Z") ||
                "2023-10-09T12:50:49.000Z" ? (
                <Alert type="error" message="Reject Operasional" banner />
              ) : (StatusApproveOpt === "N" &&
                  TanggalACT4 !== "1970-01-01T00:00:00.000Z") ||
                "2023-10-09T12:50:49.000Z" ? (
                <Alert type="info" message="Waiting Operasional" banner />
              ) : null}

              {StatusPurchasing === "Y" && TanggalACT5 != null ? (
                <Alert type="success" message="Approve Purchasing" banner />
              ) : StatusPurchasing === "N" &&
                TanggalACT5 !== "1970-01-01T00:00:00.000Z" ? (
                <Alert type="error" message="Reject Purchasing" banner />
              ) : StatusPurchasing == "N" ? (
                <Alert type="info" message="Waiting Purchasing" banner />
              ) : null}

              {jobdesk === "operasional" && (
                <Button size="sm" variant="danger" onClick={rejectsp}>
                  Reject SO
                </Button>
              )}
              {/* {jobdesk?.toLocaleLowerCase() === "purchasing" && StatusPurchasing === "N" && TanggalACT5 === null && (
                <Button onClick={rejectsppurch} size="sm" variant="danger" className="ms-2">Reject SO</Button>
              )} */}
              {jobdesk?.toLocaleLowerCase() === "purchasing" && (
                <Button
                  onClick={rejectsppurch}
                  size="sm"
                  variant="danger"
                  className="ms-2"
                >
                  Reject SO
                </Button>
              )}
              {/* {(StatusPurchasing === 'Y') &&
                <Alert type="success" message="Approve Purchasing" banner /> */}
              {/* } */}
              {/* {(Kendaraan_operasionalStatus === "Y" && StatusPurchasing === "Y") ?
                <Alert type="success" message="SP Telah di Approve" banner />
                : ""}
              {
                (Kendaraan_operasionalStatus === "Y" && (StatusPurchasing === "N" || StatusPurchasing === "Y")) ? (
                  <Alert type="success" message="SP Telah di Approve" banner />
                ) : null
              } */}

              {/* // {(StatusPurchasing === "Y") && */}
              {/* //   <Alert type="success" message="SP Telah di Approve" banner />
              // } */}
              {StatusApproveAct === "N" && TanggalACT3 !== null && (
                <Alert type="error" message="SO Sudah Di Reject" banner />
              )}
            </>
          )}
        </div>
        {jobdesk != "operasional" && (
          <>
            <Modal show={show} onHide={handleClose} size="lg">
              <Modal.Header closeButton>
                <Modal.Title>Approve {jobdesk}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {jobdesk == "operasional" && (
                  <>
                    <Row>
                      <Col sm={12}>
                        <Form.Label>Vehicle Type</Form.Label>
                        <Form.Select
                          type="text"
                          disabled
                          value={types[0] || ""}
                          onChange={(e) => {}}
                        >
                          {types.map((type, index) => (
                            <option key={index} value={type}>
                              {type}
                            </option>
                          ))}
                        </Form.Select>
                      </Col>
                    </Row>
                    <Row>
                      <Col sm={12}>
                        <Form.Label>Kode Kendaraan</Form.Label>
                        <Select
                          // options={nomorpolisiOptions}
                          onChange={(selectedOption) => {
                            setSelectnomor(selectedOption.value);
                            setSelectNopol(selectedOption.label);
                          }}
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col sm={12}>
                        <Form.Label>Select Driver</Form.Label>
                        <Form.Select
                          value={selectDriver[0]?.id}
                          onChange={(e) => {
                            setIdunit(e.target.value);
                          }}
                        >
                          <option value={selectDriver[0]?.id}>
                            {selectDriver[0] && selectDriver[0]?.name != ""
                              ? selectDriver[0] && selectDriver[0]?.name
                              : "tidak tersedia"}
                          </option>
                        </Form.Select>
                      </Col>
                    </Row>
                  </>
                )}

                {/* purchasing */}

                {jobdesk != "operasional" && (
                  <>
                    <Row>
                      <Col sm={3}>
                        {jobdesk === "purchasing" && (
                          <>
                            <Form.Label>Select Mitra 1</Form.Label>
                            <Select
                              styles={{ width: "100%" }}
                              placeholder={Mitra1Multi?.mitra || ""}
                              options={mitraOptions}
                              onChange={(mitraOptions) => {
                                console.log(
                                  `ini dari select`,
                                  mitraOptions.value
                                );
                                setSelectMitraPertama(mitraOptions.value);
                              }}
                            ></Select>
                          </>
                        )}
                      </Col>

                      <Col sm={3}>
                        <Form.Label>Vehicle Type</Form.Label>
                        <Form.Select
                          type="text"
                          // disabled
                          value={DataUntukPurchsingDanApprovenya?.kendaraan}
                          onChange={(e) => {
                            console.log(e.target.value);
                            setVehicleType1(e.target.value);
                            setDataUntukPurchsingDanApprovenya(e.target.value);
                          }}
                        >
                          {/* {types.map((type, index) => (
                            <option key={index} value={type}>
                              {type}
                            </option>
                          ))} */}
                          {TipeKendaraan &&
                            TipeKendaraan.tipe &&
                            TipeKendaraan.tipe.map((type, index) => (
                              <option key={index} value={type.id}>
                                {type.tipe}
                              </option>
                            ))}
                        </Form.Select>
                      </Col>
                      <Col sm={3}>
                        <Form.Label>Nomor Polisi</Form.Label>
                        <Select
                          placeholder={Mitra1Multi?.unit}
                          options={KodeKendaraanPurc1ss}
                          onChange={(e, key, option) => {
                            console.log(e);
                            // setAmbilIdKendaraanPurch1(e.target.value)
                            setAmbilKodeKendaraanPurch1(e.label);
                            setAmbilIDriverPucrh1(e.value);
                            setAmbilIdUnitPurch1(e.id);
                          }}
                        ></Select>
                      </Col>
                      <Col sm={3}>
                        <Form.Label>Select Drivers</Form.Label>
                        <Select
                          placeholder={Mitra1Multi?.driverName || ""}
                          onChange={(e) => {
                            console.log(e);
                            setIdunit3(e.value);
                          }}
                          options={anotneroptionsdriver}
                          // onChange={(selectedOption) => {
                          //   anotherdriver();
                          //   setIdunit(selectedOption.value);
                          //   console.log(selectedOption);
                          //   // setSelectNopol(selectedOption.label);
                          // }}
                        />
                      </Col>
                      <Col sm={3}>
                        {jobdesk == "purchasing" ? (
                          <>
                            <Form.Label>Select Mitra 2</Form.Label>
                            <Select
                              options={mitraOptions}
                              onChange={(mitraOptions) => {
                                setmitra1(mitraOptions.value);
                                setmitra1Purchasing(mitraOptions.value);
                                setidmitraini(mitraOptions.mitraId);
                              }}
                            />
                          </>
                        ) : null}
                      </Col>

                      <Col sm={3}>
                        <Form.Label>Vehicle Type</Form.Label>
                        <Form.Select
                          type="text"
                          value={selectTypeMobil}
                          onChange={(e) => {
                            vehicle();
                            setselectTypeMobil(e.target.value);
                          }}
                        >
                          <option>Select Type</option>
                          {TipeKendaraan &&
                            TipeKendaraan.tipe &&
                            TipeKendaraan.tipe.map((type, index) => (
                              <option key={index} value={type.id}>
                                {type.tipe}
                              </option>
                            ))}
                        </Form.Select>
                      </Col>
                      <Col sm={3}>
                        <Form.Label>Nomor Polisi</Form.Label>
                        <Select
                          options={kodeKendaraanOptions}
                          onChange={(selectedOption) => {
                            anotherdriver();
                            console.log(selectedOption);
                            setSelectnomor(selectedOption.value);
                            setSelectNopol(selectedOption.label);
                          }}
                        />
                      </Col>
                      <Col sm={3}>
                        <Form.Label>Select Drivers</Form.Label>
                        <Select
                          options={anotneroptionsdriver}
                          onChange={(selectedOption) => {
                            anotherdriver();
                            setIdunit(selectedOption.value);
                            console.log(selectedOption);
                            // setSelectNopol(selectedOption.label);
                          }}
                        />
                        {/* <Form.Select

                        value={selectDriver[0]?.idUnit}
                        onChange={(e) => {
                          console.log(`awo`, e.target.value);
                          setIdunit(e.target.value);
                        }}
                      >
                        <option value={selectDriver[0]?.idUnit}>
                          {selectDriver[0] && selectDriver[0]?.name != "" ? selectDriver[0] && selectDriver[0]?.name : "tidak tersedia"}
                        </option>
                      </Form.Select> */}
                      </Col>
                    </Row>
                    <Row>
                      <Col sm={3}>
                        {jobdesk == "purchasing" ? (
                          <>
                            <Form.Label>Select Mitra 3</Form.Label>
                            <Select
                              options={mitraOptions}
                              onChange={(mitraOptions) => {
                                setmitra2(mitraOptions.value);
                                setmitra2Purchasing(mitraOptions.value);
                                setidmitraini2(mitraOptions.mitraId);
                              }}
                            />
                          </>
                        ) : null}
                      </Col>

                      <Col sm={3}>
                        <Form.Label>Vehicle Type</Form.Label>
                        <Form.Select
                          type="text"
                          value={selectTypeMobil2}
                          onChange={(e) => {
                            vehicle();
                            setselectTypeMobil2(e.target.value);
                          }}
                        >
                          <option>Select Type</option>
                          {TipeKendaraan &&
                            TipeKendaraan.tipe &&
                            TipeKendaraan.tipe.map((type, index) => (
                              <option key={index} value={type.id}>
                                {type.tipe}
                              </option>
                            ))}
                        </Form.Select>
                      </Col>
                      <Col sm={3}>
                        <Form.Label>Nomor Polisi</Form.Label>
                        <Select
                          options={kodeKendaraanOptions2}
                          onChange={(selectedOption) => {
                            anotherdriver();
                            setSelectnomor2(selectedOption.value);
                            setSelectNopol(selectedOption.label);
                            setSelectNamaKendaraa3(selectedOption.label);
                          }}
                        />
                      </Col>
                      <Col sm={3}>
                        <Form.Label>Select Driver</Form.Label>
                        <Select
                          options={anotneroptionsdriver}
                          onChange={(selectedOption) => {
                            anotherdriver();
                            setIdunit2(selectedOption.value);
                            // setSelectNopol(selectedOption.label);
                          }}
                        />
                      </Col>
                    </Row>
                    <Row></Row>
                  </>
                )}
                <>
                  {jobdesk != "purchasing" ? (
                    <Checkbox className="justify-content-end d-flex">
                      Multi
                    </Checkbox>
                  ) : null}

                  <br />
                  <br />
                  {bukaanother && (
                    <>
                      <Form.Label>Select Driver</Form.Label>
                      <Form.Select
                        onChange={(e) => setIdunit(driveranother.name)}
                      >
                        <option>Select Driver</option>
                        {driveranother &&
                          driveranother.map((item, index) => (
                            <option key={index} value={item.id}>
                              {item?.name}
                            </option>
                          ))}
                      </Form.Select>
                    </>
                  )}
                </>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="danger" onClick={handleClose}>
                  Close
                </Button>
                <Button
                  onClick={() => {
                    setShow(false);
                    setModalDriverPurch(true);
                  }}
                  variant="warning"
                  // href="/masterdata/purchasing/vehicle"
                >
                  Tambah Driver dan Vehicle
                </Button>
                <Button
                  variant="primary"
                  onClick={() =>
                    jobdesk == "operasional"
                      ? HandleApproveOPS()
                      : HandleApprovePURCH()
                  }
                >
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal>
            <ModalDriverPurchasing
              setShow={setShow}
              ModalDriverPurch={ModalDriverPurch}
              setModalDriverPurch={setModalDriverPurch}
            />
          </>
        )}
        <Col sm={6}>
          <Form>
            <Form.Group>
              <Form.Label>ID SO</Form.Label>
              <Form.Control
                type="text"
                disabled
                value={spdetailsemuanyasekarang.sp}
              />

              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>
            <Form.Group>
              <Form.Label>Marketing</Form.Label>
              <div style={{ position: "relative" }}>
                <Form.Control type="text" disabled value={NamaMarketing} />
                <Tag
                  style={{
                    position: "absolute",
                    top: "50%",
                    right: "10px",
                    transform: "translateY(-50%)",
                    backgroundColor: "RGB(81 130 243)",
                    color: "white",
                    cursor: "pointer",
                  }}
                  onClick={() => DetailMarketing()}
                  type="primary"
                >
                  Lihat Detail Marketing
                </Tag>
              </div>
            </Form.Group>
            <ModalDetailMarketing
              detailsemua={spdetailsemuanyasekarang}
              modal1Open={modal1OpenDetail}
              setModal1Open={setmodal1OpenDetail}
              name={NamaMarketing}
            />
            <Form.Group>
              <Form.Label>Service</Form.Label>
              <Form.Control
                type="text"
                disabled
                value={isidata[0] ? isidata[0].service : SJKosongModal}
              />
            </Form.Group>
            <Row>
              <Col sm={6}>
                <Form.Group>
                  <Form.Label>Jenis Barang</Form.Label>
                  <Form.Control
                    type="text"
                    disabled
                    value={jenisBarang ? jenisBarang : SJKosongModal}
                  />
                </Form.Group>
              </Col>
              <Col sm={6}>
                <Form.Group>
                  <Form.Label>Jenis Barang</Form.Label>
                  <Form.Control type="text" disabled value={JenisBarang} />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Col>
        <Col sm={6}>
          <Form>
            <Form.Group>
              <Form.Label>Customer</Form.Label>
              <Form.Control type="text" disabled value={custumer} />
            </Form.Group>

            {/* <Form.Group>
              <Form.Label>Via</Form.Label>
              <Form.Control
                type="text"
                disabled
                value={isidata[0] ? isidata[0].via : SJKosongModal}
              />
              <Form.Text></Form.Text>
            </Form.Group> */}
            <Form.Group>
              <Form.Label>No Telp Customer</Form.Label>
              <Form.Control
                type="text"
                disabled
                value={spdetailsemuanyasekarang?.telpCustomer}
              />
            </Form.Group>
            <Row>
              <Col sm={6}>
                <Form.Group>
                  <Form.Label>Pickup Date</Form.Label>
                  <Form.Control
                    type="text"
                    disabled
                    value={spdetailsemuanyasekarang.pickup_date}
                  />
                </Form.Group>
              </Col>
              <Col sm={6}>
                <Form.Group>
                  <Form.Label>Tgl Bongkar</Form.Label>
                  <Form.Control
                    type="text"
                    disabled
                    value={spdetailsemuanyasekarang?.bongkar_date}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group>
              <Form.Label>Asuransi</Form.Label>
              <Form.Control
                type="text"
                disabled
                value={
                  asuransi === "Y"
                    ? "Menggunakan Asuransi"
                    : "Tidak Menggunakan Asuransi"
                }
              />
            </Form.Group>
          </Form>
        </Col>

        {/* <Form.Group>
          <Form.Label>Pickup Address</Form.Label>
          <Form.Control
            type="text"
            disabled
            value={isidata[0] ? isidata[0].pickupAddress : SJKosongModal}
          />
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group> */}
        <Row>
          <Col sm={12}>
            <Form.Group className="mt-4">
              <Form.Label>Alamat Invoice</Form.Label>
              <Form.Control
                type="text"
                disabled
                value={spdetailsemuanyasekarang?.alamatInvoice}
              />
            </Form.Group>
          </Col>
        </Row>
      </Row>
      {/* <br /> */}
      <hr/>
      
      {jobdesk === 'operasional' && (
  <Button
    size="sm"
    style={{ textAlign: 'right' }}
    variant="primary"
    className="mt-2"
    onClick={() => {
      handleShow();
      approveSemua(); // Memanggil fungsi approveSemua
      setNamaMobilDariTable();
    }}
    disabled={LoadingMuterMuter}
  >
    Approve Semua
  </Button>
)}
      <Row>
        <Col>
          <Table responsive>
            {/* <thead></thead> */}
            <tbody>
              {/* {
                jobdesk === "purchasing" &&
                IsiDataSPSemua && (
                  <>
                    <Button
                      onClick={() => setShowModalCreatePO(true)}
                      variant="danger"
                      style={{ position: "relative", top: "70px" }}
                    >
                      Buat PO
                    </Button>
                    <ModalCreatePO
                      show={ShowModalCreatePO}
                      onHide={() => setShowModalCreatePO(false)}
                    />
                  </>
                )
              } */}

              {IsiDataSPSemua &&
                IsiDataSPSemua.detail &&
                IsiDataSPSemua.detail.map((data, index) => (
                  <>
                    {/* <tr style={{ fontWeight: "bold" }}>
                      <td colSpan={10}>
                        
                        <br />{" "}
                      </td>
                    </tr> */}
                    <tr
                      style={{
                        fontWeight: "bold",
                        backgroundColor: "#dff0d8",
                      }}
                    >
                      <td style={{ backgroundColor: "transparent" }}>
                        No. {index + 1}.
                      </td>
                      <td
                        style={{ backgroundColor: "transparent" }}
                        colSpan={20}
                      >
                        Alamat Muat
                      </td>
                    </tr>

                    <tr key={index}>
                      <td colSpan={2}>{data.pickup}</td>
                    </tr>

                    {spdetailsemuanyasekarang &&
                      spdetailsemuanyasekarang.detail[index].tujuan &&
                      spdetailsemuanyasekarang.detail[index].tujuan.map(
                        (data, indesx) => (
                          <>
                            <tr
                              style={{
                                fontWeight: "bold",
                                backgroundColor: "#b7d1f8",
                              }}
                            >
                              <td style={{ backgroundColor: "transparent" }}>
                                Aksi
                              </td>
                              <td style={{ backgroundColor: "transparent" }}>
                                Alamat Bongkar
                              </td>
                              <td style={{ backgroundColor: "transparent" }}>
                                NO SJ
                              </td>
                              <td style={{ backgroundColor: "transparent" }}>
                                Service
                              </td>
                              <td style={{ backgroundColor: "transparent" }}>
                                Qty
                              </td>
                              <td style={{ backgroundColor: "transparent" }}>
                                Berat
                              </td>
                              <td
                                colSpan={1}
                                style={{ backgroundColor: "transparent" }}
                              >
                                Biaya Jalan
                              </td>
                              <td
                                style={{
                                  backgroundColor: "transparent",
                                  textAlign: "right",
                                }}
                              >
                                Jumlah ({data?.service[0]})
                              </td>
                            </tr>
                            <tr>

                              {/* button approve */}
                              <td>
                                {IsiKomenRejectSP ===
                                "Tidak Menggunakan unit" ? (
                                  <Alert
                                    type="error"
                                    message="SO Sudah Di Reject"
                                    banner
                                  />
                                ) : jobdesk === "operasional" &&
                                  data.supirId === 0 &&
                                  data.unitId === 0 ? (
                                  <Button
                                    size="sm"
                                    style={{ textAlign: "right" }}
                                    variant="primary"
                                    onClick={() => {
                                      handleShow(data.idmpd);
                                      approvebaru(data.idmpd);
                                      setNamaMobilDariTable(data.kendaraan);
                                    }}
                                    className="mt-2"
                                    disabled={LoadingMuterMuter}
                                  >
                                    Approve
                                  </Button>
                                ) : jobdesk === "operasional" &&
                                  data.supirId !== 0 &&
                                  data.unitId !== 0 ? (
                                  <Button
                                    // disabled
                                    size="sm"
                                    type="danger"
                                    variant="danger"
                                    style={{
                                      color: "white",
                                      backgroundColor: "red",
                                    }}
                                    onClick={() => {
                                      handleShow(data.idmpd);
                                      approvebaru(data.idmpd);
                                      setNamaMobilDariTable(data.kendaraan);
                                    }}
                                    className="mt-2"
                                  >
                                    Edit
                                  </Button>
                                ) : null}
                                {/* {jobdesk == "purchasing" &&
                                jobdesk != "akunting" &&
                                jobdesk != "operasional" && validasipurch.idUnit1 !== "-" && validasipurch.idUnit2 !== "-" && data?.supirSJ1 != 0 && data?.supirSJ2 !== 0 && (
                                  <>
                                    <Button
                                      size="sm"
                                      variant="primary"
                                      onClick={() => {
                                        handleShow(data.idmpd);
                                        approvebaru(data.idmpd, data);
                                        MitraMulti(data.idmpd)
                                        statusvalidasipurch(data.idmpd)
                                        // FetchTipeKendaraan()
                                      }}
                                      className="mt-2"
                                    >
                                      Approve
                                    </Button>
                                  </>
                                )} */}
                                {jobdesk.toLocaleLowerCase() === "purchasing" &&
                                data?.supirSJ1 !== 0 &&
                                data?.supirSJ2 !== 0 ? (
                                  <Button
                                    size="sm"
                                    variant="danger"
                                    onClick={() => {
                                      handleShow(data.idmpd);
                                      approvebaru(data.idmpd, data);
                                      MitraMulti(data.idmpd);
                                      statusvalidasipurch(data.idmpd);
                                      // FetchTipeKendaraan()
                                    }}
                                    className="mt-2"
                                  >
                                    Edit
                                  </Button>
                                ) : jobdesk.toLocaleLowerCase() ===
                                    "purchasing" &&
                                  data?.supirSJ1 === 0 &&
                                  data?.supirSJ2 === 0 ? (
                                  <Button
                                    size="sm"
                                    variant="primary"
                                    onClick={() => {
                                      handleShow(data.idmpd);
                                      approvebaru(data.idmpd, data);
                                      MitraMulti(data.idmpd);
                                      statusvalidasipurch(data.idmpd);
                                      // FetchTipeKendaraan()
                                    }}
                                    className="mt-2"
                                  >
                                    Approve
                                  </Button>
                                ) : null}
                              </td>
                              <td>{data.destination}</td>
                              <td>
                                <Tag color="cyan">{data.noSJ}</Tag> <br />{" "}
                                {/* Contoh warna cyan */}
                                <Tag color="magenta">{data.kendaraan}</Tag>{" "}
                                {/* Contoh warna magenta */}
                                <Tag color="green">{data.item}</Tag>{" "}
                                {/* Contoh warna hijau */}
                              </td>
                              <td>
                                <Tag color="red">{data?.service}</Tag>
                                <br /> {/* Contoh warna merah */}
                                <Tag color="volcano">
                                  {data.shipmentName}
                                </Tag>{" "}
                                {/* Contoh warna volcano */}
                                <Tag color="blue">{data?.via}</Tag>{" "}
                                {/* Contoh warna biru */}
                              </td>
                              <td>{data.qty}</td>
                              <td>{data.berat}</td>
                              <td>
                                {data.Price?.toLocaleString("id-ID", {
                                  style: "currency",
                                  currency: "IDR",
                                })}
                              </td>

                              {data?.service[0] === "Retail" ? (
                                <td
                                  style={{
                                    textAlign: "right",
                                    fontWeight: "bold",
                                  }}
                                >
                                  {(data.berat * data.Price).toLocaleString(
                                    "id-ID",
                                    {
                                      style: "currency",
                                      currency: "IDR",
                                    }
                                  )}
                                </td>
                              ) : (
                                <td
                                  style={{
                                    textAlign: "right",
                                    fontWeight: "bold",
                                  }}
                                >
                                  {data.Price.toLocaleString("id-ID", {
                                    style: "currency",
                                    currency: "IDR",
                                  })}
                                </td>
                              )}
                            </tr>
                            <tr key={index}>
                              {jobdesk !== "purchasing" && (
                                <>{/* <p className="text-center">{++}</p> */}</>
                              )}
                              <span>
                                {jobdesk != "purchasing" ||
                                  (jobdesk == "akunting" && (
                                    <>
                                      <Button
                                        size="md"
                                        variant="danger"
                                        // onClick={() => deltebutton(data.idmpd)}
                                        className="mt-2"
                                      >
                                        X
                                      </Button>
                                    </>
                                  ))}

                                {jobdesk != "purchasing" ||
                                  (jobdesk == "akunting" && (
                                    <>
                                      <Button
                                        size="md"
                                        variant="primary"
                                        onClick={() => {
                                          // setIdmpdPerstate(data.idmpd);
                                          // handleShowSP(data.idmpd, data.noSJ);
                                          // setIsiDataSPSemuaTemp(data)
                                        }}
                                        className="mt-2"
                                      >
                                        Edit
                                      </Button>
                                    </>
                                  ))}

                                {/* {(StatusPurchasing === "Y") && (
                                  <>
                                    <Button
                                      size="sm"
                                      disabled
                                      variant="primary"
                                      className="mt-2"
                                    >
                                      Approved
                                    </Button>

                                  </>)
                                } */}
                                {/* {(jobdesk == "operasional" && Kendaraan_operasionalStatus === "N") && (
                                  <>
                                    <Button
                                      size="sm"
                                      variant="primary"
                                      onClick={() => {
                                        handleShow(data.idmpd);
                                        approvebaru(data.idmpd);
                                      }}
                                      className="mt-2"
                                    >
                                      Approves
                                    </Button>
                                  </>
                                )} */}
                                {/* {(jobdesk == "operasional" && Kendaraan_operasionalStatus === "Y") && (
                                  <>
                                    <Button
                                      disabled
                                      size="sm"
                                      variant="primary"
                                      onClick={() => {
                                        handleShow(data.idmpd);
                                        approvebaru(data.idmpd);
                                      }}
                                      className="mt-2"
                                    >
                                      Approved
                                    </Button>
                                  </>
                                )} */}
                              </span>
                              {/* {angkamanual++} */}

                              {/* ///////ini approve operasional untuk drivernya////// */}
                              {/* {IsiKomenRejectSP === "Tidak Menggunakan unit" ? (
                              <Alert
                                type="error"
                                message="SO Sudah Di Reject"
                                banner
                              />
                            ) : jobdesk === "operasional" &&
                              data.supirId === 0 &&
                              data.unitId === 0 ? (
                              <Button
                                size="sm"
                                style={{ textAlign: "right" }}
                                variant="primary"
                                onClick={() => {
                                  handleShow(data.idmpd);
                                  approvebaru(data.idmpd);
                                  setNamaMobilDariTable(data.kendaraan)
                                }}
                                className="mt-2"
                                disabled={LoadingMuterMuter}
                              >
                                Approve
                              </Button>
                            ) : jobdesk === "operasional" &&
                              data.supirId !== 0 &&
                              data.unitId !== 0 ? (
                              <Button
                                // disabled
                                size="sm"
                                type="danger"
                                variant="danger"
                                style={{ color: "white", backgroundColor: "red" }}
                                onClick={() => {
                                  handleShow(data.idmpd);
                                  approvebaru(data.idmpd);
                                  setNamaMobilDariTable(data.kendaraan)
                                }}
                                className="mt-2"
                              >
                                Edit
                              </Button>
                            ) : null} */}
                              {/* ///////END ini approve operasional untuk drivernya////// */}

                              {/* 
                            {(jobdesk == "operasional" && data.supirId === 0 && data.unitId === 0
                              ? <p>belum di approve</p> : (jobdesk === "operasional" && StatusApproveOpt === "N" && ("Reject")) )
                            } */}
                              {/* {StatusApproveOpt === "N" && <p>approve</p>} */}

                              {/* {(jobdesk == "operasional" && Kendaraan_operasionalStatus === "N") && (
                                  <>
                                    <Button
                                      size="sm"
                                      variant="primary"
                                      onClick={() => {
                                        handleShow(data.idmpd);
                                        approvebaru(data.idmpd);
                                      }}
                                      className="mt-2"
                                    >
                                      Approve
                                    </Button>
                                  </>
                                    )}*/}
                              {/* {StatusPurchasing === "Y" ? (
                              <>
                                <Button
                                  size="sm"
                                  disabled
                                  variant="primary"
                                  className="mt-2"
                                >
                                  Approved
                                </Button>
                              </>
                            ) : null} */}

                              {/* Approve Purchasing */}
                            </tr>

                            {data.harga_muat !== 0 && (
                              <tr>
                                <td colSpan={6}></td>
                                <td
                                  style={{
                                    backgroundColor: "transparent",
                                    fontWeight: "bold",
                                  }}
                                  width="150px"
                                >
                                  Harga Muat
                                </td>
                                <td
                                  style={{
                                    textAlign: "right",
                                    fontWeight: "bold",
                                  }}
                                >
                                  {data.harga_muat?.toLocaleString("id-ID", {
                                    style: "currency",
                                    currency: "IDR",
                                  })}
                                </td>
                              </tr>
                            )}

                            {data.biayaMel !== 0 && (
                              <tr>
                                <td colSpan={6}></td>
                                <td
                                  style={{
                                    backgroundColor: "transparent",
                                    fontWeight: "bold",
                                  }}
                                  width="150px"
                                >
                                  Biaya Mel
                                </td>
                                <td
                                  style={{
                                    textAlign: "right",
                                    fontWeight: "bold",
                                  }}
                                >
                                  {data.biayaMel?.toLocaleString("id-ID", {
                                    style: "currency",
                                    currency: "IDR",
                                  })}
                                </td>
                              </tr>
                            )}

                            {data.biayaLain !== 0 && (
                              <tr>
                                <td colSpan={6}></td>
                                <td
                                  style={{
                                    backgroundColor: "transparent",
                                    fontWeight: "bold",
                                  }}
                                  width="150px"
                                >
                                  Biaya Lain
                                </td>
                                <td
                                  style={{
                                    textAlign: "right",
                                    fontWeight: "bold",
                                  }}
                                >
                                  {data.biayaLain?.toLocaleString("id-ID", {
                                    style: "currency",
                                    currency: "IDR",
                                  })}
                                </td>
                              </tr>
                            )}

                            {data.harga_bongkar !== 0 && (
                              <tr>
                                <td colSpan={6}></td>
                                <td
                                  style={{
                                    backgroundColor: "transparent",
                                    fontWeight: "bold",
                                  }}
                                  width="150px"
                                >
                                  Biaya Bongkar
                                </td>
                                <td
                                  style={{
                                    textAlign: "right",
                                    fontWeight: "bold",
                                  }}
                                >
                                  {data.harga_bongkar?.toLocaleString("id-ID", {
                                    style: "currency",
                                    currency: "IDR",
                                  })}
                                </td>
                              </tr>
                            )}

                            {data.biaya_multi_drop !== 0 && (
                              <tr>
                                <td colSpan={6}></td>
                                <td
                                  style={{
                                    backgroundColor: "transparent",
                                    fontWeight: "bold",
                                  }}
                                  width="150px"
                                >
                                  Biaya Multi Drop
                                </td>
                                <td
                                  style={{
                                    textAlign: "right",
                                    fontWeight: "bold",
                                  }}
                                >
                                  {data.biaya_multi_drop?.toLocaleString(
                                    "id-ID",
                                    {
                                      style: "currency",
                                      currency: "IDR",
                                    }
                                  )}
                                </td>
                              </tr>
                            )}

                            {data.biaya_multimuat !== 0 && (
                              <tr>
                                <td colSpan={6}></td>
                                <td
                                  style={{
                                    backgroundColor: "transparent",
                                    fontWeight: "bold",
                                  }}
                                  width="150px"
                                >
                                  Biaya Multi Muat
                                </td>
                                <td
                                  style={{
                                    textAlign: "right",
                                    fontWeight: "bold",
                                  }}
                                >
                                  {data.biaya_multimuat?.toLocaleString(
                                    "id-ID",
                                    {
                                      style: "currency",
                                      currency: "IDR",
                                    }
                                  )}
                                </td>
                              </tr>
                            )}

                            {data.biaya_overtonase !== 0 && (
                              <tr>
                                <td colSpan={6}></td>
                                <td
                                  style={{
                                    backgroundColor: "transparent",
                                    fontWeight: "bold",
                                  }}
                                  width="150px"
                                >
                                  Biaya Over Tonase
                                </td>
                                <td
                                  style={{
                                    textAlign: "right",
                                    fontWeight: "bold",
                                  }}
                                >
                                  {data.biaya_overtonase?.toLocaleString(
                                    "id-ID",
                                    {
                                      style: "currency",
                                      currency: "IDR",
                                    }
                                  )}
                                </td>
                              </tr>
                            )}

                            {data.biaya_tambahan !== 0 && (
                              <tr>
                                <td colSpan={6}></td>
                                <td
                                  style={{
                                    backgroundColor: "transparent",
                                    fontWeight: "bold",
                                  }}
                                  width="150px"
                                >
                                  Biaya Tambahan
                                </td>
                                <td
                                  style={{
                                    textAlign: "right",
                                    fontWeight: "bold",
                                  }}
                                >
                                  {data.biaya_tambahan?.toLocaleString(
                                    "id-ID",
                                    {
                                      style: "currency",
                                      currency: "IDR",
                                    }
                                  )}
                                </td>
                              </tr>
                            )}

                            <tr>
                              <td colSpan={6}></td>
                              <td
                                style={{
                                  backgroundColor: "transparent",
                                  fontWeight: "bold",
                                }}
                                width="150px"
                              >
                                Total SJ{" "}
                              </td>
                              <td
                                style={{
                                  textAlign: "right",
                                  fontWeight: "bold",
                                }}
                              >
                                <Tag color="blue">
                                  {data.total?.toLocaleString("id-ID", {
                                    style: "currency",
                                    currency: "IDR",
                                  })}
                                </Tag>
                              </td>
                            </tr>

                            {/* <tr>
                            <td>No</td>
                            <td>Kode Mitra</td>
                            <td>Nama Mitra</td>
                            <td>Kendaraan</td>
                            <td>Via</td>
                            <td>Supir</td>
                            <td>No Polisi</td>
                            <td>Telp Supir</td>
                            <td>Operasi</td>
                          </tr> */}
                          </>
                        )
                      )}
                  </>
                ))}
            </tbody>
          </Table>

          {/* {(jobdesk === "purchasing") && ( */}
          {IsiDataSPSemua?.totalMuat !== 0 && (
            <Row>
              <Col
                span={12}
                style={{ marginLeft: "10px" }}
                className="d-flex justify-content-end"
              >
                <div>
                  <tr style={{ fontWeight: "bold" }}>
                    <td style={{ paddingRight: "20px" }}>Total Muat</td>
                    <td style={{ paddingRight: "10px" }}>:</td>
                    <td width="150px" style={{ paddingLeft: "10px" }}>
                      {IsiDataSPSemua?.totalMuat?.toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      })}
                    </td>
                  </tr>
                </div>
              </Col>
            </Row>
          )}

          {IsiDataSPSemua?.totalBongkar !== 0 && (
            <Row>
              <Col
                span={12}
                style={{ marginLeft: "10px" }}
                className="d-flex justify-content-end"
              >
                <div>
                  <tr style={{ fontWeight: "bold" }}>
                    <td style={{ paddingRight: "20px" }}>Total Bongkar</td>
                    <td style={{ paddingRight: "10px" }}>:</td>
                    <td width="150px" style={{ paddingLeft: "10px" }}>
                      {IsiDataSPSemua?.totalBongkar?.toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      })}
                    </td>
                  </tr>
                </div>
              </Col>
            </Row>
          )}

          {IsiDataSPSemua?.biayaMultiMuat !== 0 && (
            <Row>
              <Col
                span={12}
                style={{ marginLeft: "10px" }}
                className="d-flex justify-content-end"
              >
                <div>
                  <tr style={{ fontWeight: "bold" }}>
                    <td style={{ paddingRight: "20px" }}>Biaya Multimuat</td>
                    <td style={{ paddingRight: "10px" }}>:</td>
                    <td width="150px" style={{ paddingLeft: "10px" }}>
                      {IsiDataSPSemua?.biayaMultiMuat?.toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      }) === undefined
                        ? "Rp 0,00"
                        : IsiDataSPSemua?.biayaMultiMuat?.toLocaleString(
                            "id-ID",
                            {
                              style: "currency",
                              currency: "IDR",
                            }
                          )}
                    </td>
                  </tr>
                </div>
              </Col>
            </Row>
          )}

          {IsiDataSPSemua?.biayaMel !== 0 && (
            <Row>
              <Col
                span={12}
                style={{ marginLeft: "10px" }}
                className="d-flex justify-content-end"
              >
                <div>
                  <tr style={{ fontWeight: "bold" }}>
                    <td style={{ paddingRight: "20px" }}>Biaya Mel</td>
                    <td style={{ paddingRight: "10px" }}>:</td>
                    <td width="150px" style={{ paddingLeft: "10px" }}>
                      {IsiDataSPSemua?.biayaMel?.toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      }) === undefined
                        ? "Rp 0,00"
                        : IsiDataSPSemua?.biayaMel?.toLocaleString("id-ID", {
                            style: "currency",
                            currency: "IDR",
                          })}
                    </td>
                  </tr>
                </div>
              </Col>
            </Row>
          )}

          {IsiDataSPSemua?.biayaLain !== 0 && (
            <Row>
              <Col
                span={12}
                style={{ marginLeft: "10px" }}
                className="d-flex justify-content-end"
              >
                <div>
                  <tr style={{ fontWeight: "bold" }}>
                    <td style={{ paddingRight: "20px" }}>Biaya Lain</td>
                    <td style={{ paddingRight: "10px" }}>:</td>
                    <td width="150px" style={{ paddingLeft: "10px" }}>
                      {IsiDataSPSemua?.biayaLain?.toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      }) === undefined
                        ? "Rp 0,00"
                        : IsiDataSPSemua?.biayaLain?.toLocaleString("id-ID", {
                            style: "currency",
                            currency: "IDR",
                          })}
                    </td>
                  </tr>
                </div>
              </Col>
            </Row>
          )}

          {IsiDataSPSemua?.biayaTambahan !== 0 && (
            <Row>
              <Col
                span={12}
                style={{ marginLeft: "10px" }}
                className="d-flex justify-content-end"
              >
                <div>
                  <tr style={{ fontWeight: "bold" }}>
                    <td style={{ paddingRight: "20px" }}> Biaya Tambahan</td>
                    <td style={{ paddingRight: "10px" }}>:</td>
                    <td width="150px" style={{ paddingLeft: "10px" }}>
                      {IsiDataSPSemua?.biayaTambahan?.toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      }) === undefined
                        ? "Rp 0,00"
                        : IsiDataSPSemua?.biayaTambahan?.toLocaleString(
                            "id-ID",
                            {
                              style: "currency",
                              currency: "IDR",
                            }
                          )}
                    </td>
                  </tr>
                </div>
              </Col>
            </Row>
          )}
          {IsiDataSPSemua?.hargaSelanjutnya !== 0 && (
            <Row>
              <Col
                span={12}
                style={{ marginLeft: "10px" }}
                className="d-flex justify-content-end"
              >
                <div>
                  <tr style={{ fontWeight: "bold" }}>
                    <td style={{ paddingRight: "20px" }}> Harga Selanjutnya</td>
                    <td style={{ paddingRight: "10px" }}>:</td>
                    <td width="150px" style={{ paddingLeft: "10px" }}>
                      {IsiDataSPSemua?.hargaSelanjutnya?.toLocaleString(
                        "id-ID",
                        {
                          style: "currency",
                          currency: "IDR",
                        }
                      ) === undefined
                        ? "Rp 0,00"
                        : IsiDataSPSemua?.hargaSelanjutnya?.toLocaleString(
                            "id-ID",
                            {
                              style: "currency",
                              currency: "IDR",
                            }
                          )}
                    </td>
                  </tr>
                </div>
              </Col>
            </Row>
          )}
          {IsiDataSPSemua?.totalovertonase !== 0 && (
            <Row>
              <Col
                span={12}
                style={{ marginLeft: "10px" }}
                className="d-flex justify-content-end"
              >
                <div>
                  <tr style={{ fontWeight: "bold" }}>
                    <td style={{ paddingRight: "20px" }}>Total Overtonase</td>
                    <td style={{ paddingRight: "10px" }}>:</td>
                    <td width="150px" style={{ paddingLeft: "10px" }}>
                      {IsiDataSPSemua?.totalovertonase?.toLocaleString(
                        "id-ID",
                        {
                          style: "currency",
                          currency: "IDR",
                        }
                      )}
                    </td>
                  </tr>
                </div>
              </Col>
            </Row>
          )}
          {IsiDataSPSemua?.biayaMultiDrop !== 0 && (
            <Row>
              <Col
                span={12}
                style={{ marginLeft: "10px" }}
                className="d-flex justify-content-end"
              >
                <div>
                  <tr style={{ fontWeight: "bold" }}>
                    <td style={{ paddingRight: "20px" }}> Biaya Multidrop</td>
                    <td style={{ paddingRight: "10px" }}>:</td>
                    <td width="150px" style={{ paddingLeft: "10px" }}>
                      {IsiDataSPSemua?.biayaMultiDrop?.toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      })}
                    </td>
                  </tr>
                </div>
              </Col>
            </Row>
          )}
          {IsiDataSPSemua?.tarif !== 0 && (
            <Row>
              <Col
                span={12}
                style={{ marginLeft: "10px" }}
                className="d-flex justify-content-end"
              >
                <div>
                  <tr style={{ fontWeight: "bold" }}>
                    <td style={{ paddingRight: "20px" }}> Biaya Jalan</td>
                    <td style={{ paddingRight: "10px" }}>:</td>
                    <td width="150px" style={{ paddingLeft: "10px" }}>
                      {IsiDataSPSemua?.tarif?.toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      })}
                    </td>
                  </tr>
                </div>
              </Col>
            </Row>
          )}

          <hr />
          <Row>
            <Col
              span={12}
              style={{ marginLeft: "10px" }}
              className="d-flex justify-content-end"
            >
              <div>
                <tr style={{ fontWeight: "bold" }}>
                  <td style={{ paddingRight: "20px" }}> TOTAL KESELURUHAN</td>
                  <td style={{ paddingRight: "10px" }}>:</td>
                  <td width="150px" style={{ paddingLeft: "10px" }}>
                    <Tag color="blue">
                      {" "}
                      {IsiDataSPSemua?.totalFix?.toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      })}
                    </Tag>
                  </td>
                </tr>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
}

export default FormTable;
