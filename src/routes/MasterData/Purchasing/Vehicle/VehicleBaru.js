import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import Baseurl from "../../../../Api/BaseUrl";
import axios from "axios";
import {
  Button,
  Modal,
  notification,
  Input,
  Form as AntForm,
  DatePicker,
  Card,
  Select,
  Upload,
  Pagination,
  Switch,
  Tag,
} from "antd";
import moment from "moment";
import { UploadOutlined } from "@ant-design/icons";
import * as Yup from "yup";
import { FormikConsumer, useFormik } from "formik";
import Swal from "sweetalert2";
import { Col, Row } from "react-bootstrap";
import useMitraStore from "../../../../zustand/Store/MitraStore";
import ZustandStore from "../../../../zustand/Store/JenisKepemilikanOptions";
import { CheckSquareFilled, CloseSquareFilled } from "@ant-design/icons";
function VehicleBaru({
  ShowVehicleModal,
  setShowVehicleModal,
  ValidasiTombol,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [IdDriver, setIdDriver] = useState("");
  const [FotoDriver, setFotoDriver] = useState("");
  const [NamaSupir, setNamaSupir] = useState("");
  const [CariNoKendaraan, setCariNoKendaraan] = useState("");
  const [CariJenisKepemilikan, setCariJenisKepemilikan] = useState("");
  const [CariDriverAktif, setCariDriverAktif] = useState("");
  const { NamaMitra, fetchMitra } = useMitraStore((item) => ({
    NamaMitra: item.NamaMitra,
    fetchMitra: item.fetchMitra,
  }));
  const { DriverType, setDriverType } = ZustandStore((item) => ({
    DriverType: item.DriverType,
    setDriverType: item.setDriverType,
  }));
  const { WarnaPlat, setWarnaPlat } = ZustandStore((item) => ({
    WarnaPlat: item.WarnaPlat,
    setWarnaPlat: item.setWarnaPlat,
  }));
  const { JenisSim, setJenisSim } = ZustandStore((item) => ({
    JenisSim: item.JenisSim,
    setJenisSim: item.setJenisSim,
  }));
  const { jenisKepemilikan, setjenisKepemilikan } = ZustandStore((item) => ({
    jenisKepemilikan: item.jenisKepemilikan,
    setjenisKepemilikan: item.setjenisKepemilikan,
  }));
  const { StatusDriverAktif, setStatusDriverAktif } = ZustandStore((item) => ({
    StatusDriverAktif: item.StatusDriverAktif,
    setStatusDriverAktif: item.setStatusDriverAktif,
  }));

  const NamaMitraOptions = NamaMitra.map((item) => ({
    label: item.NamaMitra,
    value: item.mitraId,
  }));
  const JenisSimOptions = JenisSim.map((item) => ({
    label: item.Jenis,
    value: item.mitraId,
  }));
  const jenisKepemilikanOptions = jenisKepemilikan.map((item) => ({
    label: item.jenis,
  }));
  const [CodeVehicle, setCodeVehicle] = useState("");
  const [Loading, setLoading] = useState(false);
  const validationSchema = Yup.object().shape({
    kode_kendaraan: Yup.string()
      .required("Kode Kendaraan wajib diisi")
      .max(7, "Kode Kendaraan tidak boleh lebih dari 7 karakter")
      .uppercase("Kode Kendaraan harus dalam huruf besar")
      .matches(/^[^\s]*$/, "Kode Kendaraan tidak boleh mengandung spasi"),
    no_polisi: Yup.string()
      .required("No Polisi wajib diisi")
      .max(11, "No Polisi tidak boleh lebih dari 11 karakter"),
    // tgl_stnk: Yup.date().required('Tanggal STNK wajib diisi'),
    jenis_kepemilikan: Yup.string().required("Jenis Kepemilikan wajib diisi"),
    jenis_kendaraan: Yup.string().required("Jenis Kendaraan wajib diisi"),
    vendor: Yup.string().required("Vendor Kendaraan wajib diisi"),
    // nama_driver: Yup.string().required('Nama Driver wajib diisi') ,
    // .matches('A-Z', "Nama tidak boleh menggunakan symbol dan angka"),
    // jenis_SIM: Yup.string().required('Jenis SIM wajib diisi'),
    // warna_plat: Yup.string().required('Warna Plat wajib diisi'),
    // merk_mobil: Yup.string().required('Merk Mobil wajib diisi')
    //     .transform(value => (value ? value.toUpperCase() : '')),
    // tahun_mobil: Yup.string()
    // .required('Tahun Mobil wajib diisi')
    // .max(4, 'Tahun Mobil Tidak Boleh Lebih dari 4 Digit'),
    // kendaraan: Yup.string()
    //     .required('Foto Kendaraan wajib diisi'),
    // panjang: Yup.number().required('Panjang Kendaraan wajib diisi').integer('Panjang Kendaraan harus berupa angka'),
    // lebar: Yup.number().required('Lebar Kendaraan wajib diisi').integer('Lebar Kendaraan harus berupa angka'),
    // tinggi: Yup.number().required('Tinggi Kendaraan wajib diisi').integer('Tinggi Kendaraan harus berupa angka'),
    // no_bpkb: Yup.string().required('No BPKB wajib diisi'),
    // stnk: Yup.string().required('STNK wajib diisi')
    //     .max(8, "No STNK Tidak Boleh Lebih dari 8 Karakter"),
    // tgl_kir: Yup.date().required('Tanggal KIR wajib diisi'),
    // tgl_beli: Yup.date().required('Tanggal Pembelian wajib diisi'),
    // kapasitas: Yup.number().required('Kapasitas wajib diisi').integer('Kapasitas harus berupa angka'),
    // kapasitas_maks: Yup.number().required('Kapasitas Maks wajib diisi').integer('Kapasitas Maks harus berupa angka'),
    // kubikasi: Yup.number().required('Kubikasi wajib diisi').integer('Kubikasi harus berupa angka'),
    // location: Yup.string().required('Lokasi wajib diisi'),
    id_driver: Yup.string().required("Nama Driver wajib diisi"),
    // id_kendaraan_jenis: Yup.string().required('ID Jenis Kendaraan wajib diisi')
  });

  const onShowSizeChange = (page, pageSize) => {
    ApiAwal(page);
  };

  const formik = useFormik({
    initialValues: {
      tgl_stnk: 0,
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
      kendaraan: "",
      warna_plat: "",
      panjang: "1",
      lebar: "1",
      tinggi: "1",
      no_bpkb: "",
      stnk: "",
      tgl_kir: 0,
      tgl_beli: 0,
      kapasitas: "",
      kapasitas_maks: "",
      // kubikasi: "",
      location: "",
      id_driver: "",
      id_kendaraan_jenis: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (IdDriver == null) {
        BuatVehicle(values);
      } else {
        EditVehicle(values);
        UploadFoto(FotoDriver);
        ApiAwal();
      }
      console.log(formik.errors);
      console.log(values);
    },
  });
  const perhitunganVolume = () => {
    const panjang =
      Number(!formik.values.panjang ? 1 : formik.values.panjang) || 1;
    const lebar = Number(!formik.values.lebar ? 1 : formik.values.lebar) || 1;
    const tinggi =
      Number(!formik.values.tinggi ? 1 : formik.values.tinggi) || 1;

    const volume = panjang * lebar * tinggi;
    console.log(volume);

    // formik.setFieldValue('kubikasi', volume);

    return volume;
  };

  const showModal = () => {
    setIsModalOpen(true);
    formik.resetForm();
  };

  const UploadFoto = async () => {
    try {
      const formData = new FormData();
      formData.append("cover", FotoDriver);
      formData.append("id", IdDriver);
      const data = await axios.post(
        `${Baseurl}vehicle/upload-vehicle-photo`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      ApiAwal();
    } catch (error) {
      // console.error(error);
      // Swal.fire({
      //     icon: 'error',
      //     title: 'Error',
      //     text: `Failed to upload photo: ${error.message}`,
      // });
    }
  };

  const ModalOFFVehicle = async (vehicleId) => {
    try {
      const data = await axios.post(
        `${Baseurl}vehicle/off-vehicle`,
        {
          id_vehicle: vehicleId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      // Tampilkan notifikasi sukses dari antd setelah API call berhasil
      notification.success({
        message: "Sukses",
        description: 'Status kendaraan telah diubah menjadi "OFF".',
        placement: "topRight", // ini akan menempatkan notifikasi di pojok kanan atas
      });

      ApiAwal();
    } catch (error) {
      // Handle error
      notification.error({
        message: "Error",
        description: "Terjadi kesalahan saat mengubah status kendaraan.",
        placement: "topRight", // ini akan menempatkan notifikasi di pojok kanan atas
      });
    }
  };

  const ModalONVehicle = async (vehicleId) => {
    try {
      // Swal.fire({
      //     title: 'Konfirmasi',
      //     text: 'Apakah Anda yakin ingin mengubah status driver menjadi "Ready"?',
      //     icon: 'warning',
      //     showCancelButton: true,
      //     confirmButtonText: 'Ya',
      //     cancelButtonText: 'Tidak',
      // }).then(async (result) => {
      //     if (result.isConfirmed) {
      const data = await axios.post(
        `${Baseurl}vehicle/on-vehicle`,
        {
          id_vehicle: vehicleId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      notification.success({
        message: "Sukses",
        description: 'Status kendaraan telah diubah menjadi "ON".',
        placement: "topRight", // ini akan menempatkan notifikasi di pojok kanan atas
      });

      ApiAwal();
    } catch (error) {
      // Handle error
      notification.error({
        message: "Error",
        description: "Terjadi kesalahan saat mengubah status kendaraan.",
        placement: "topRight", // ini akan menempatkan notifikasi di pojok kanan atas
      });
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const [DataAwal, setDataAwal] = useState("");
  const columns = [
    {
      name: "No",
      selector: (row) => row.no,
      width: "80px",
    },
    {
      name: "Image",
      selector: (row) => <img src={row.vehicleImage} width="80px"></img>,
    },
    {
      name: "Kode Kendaraan",
      selector: (row) => row.vehicleCode,
    },
    {
      name: "No Polisi",
      selector: (row) => row.policeNumber,
    },
    {
      name: "Pemilik Kendaraan",
      selector: (row) => row.jenisKepemilikan,
    },
    {
      name: "Jenis Kendaraan",
      selector: (row) => row.vehicleType,
    },
    {
      name: "Tanggal STNK",
      selector: (row) => row.stnkDate,
    },
    {
      name: "Nama Supir",
      selector: (row) => row.driverName,
    },
    {
      name: "Aksi",
      selector: (row) => (row.status === "1" ? "Aktif" : "Tidak Aktif"),
      cell: (row) => (
        <div>
          <Switch
            checked={row.status === "1" ? true : false}
            checkedChildren="ON"
            unCheckedChildren="OFF"
            onChange={(checked) =>
              checked
                ? ModalONVehicle(row.vehicleId)
                : ModalOFFVehicle(row.vehicleId)
            }
          />
        </div>
      ),
    },
  ];
  const [TotalPage, setTotalPage] = useState("");

  const ApiAwal = async (page = 1) => {
    try {
      setLoading(true);
      const data = await axios.get(
        `${Baseurl}vehicle/get-vehicle?limit=10&page=${page}&keyword=${CariNoKendaraan}&jenisKepemilikan=${CariJenisKepemilikan}&status=${CariDriverAktif}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      setDataAwal(data.data.data.order);
      setTotalPage(data.data.data?.totalData);
      setLoading(false);
    } catch (error) {}
  };

  useEffect(() => {
    ApiAwal();
    fetchMitra();
    setjenisKepemilikan();
    setJenisSim();
    setDriverType();
    setWarnaPlat();
    setStatusDriverAktif();
    DriverName();
  }, [
    CariNoKendaraan,
    CariJenisKepemilikan,
    CariDriverAktif,
    formik.values.panjang,
    formik.values.lebar,
    formik.values.tinggi,
    perhitunganVolume(),
  ]);

  const EditVehicle = async (values) => {
    setLoading(true);
    try {
      const data = await axios.post(
        `${Baseurl}vehicle/edit-vehicle`,
        {
          ...values,
          id: IdDriver,
          id_driver: formik.values.id_driver,
          id_vendor: formik.values.id_vendor,
          // id_jenis_kendaraan: formik.values.id_jenis_kendaraan
        },
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
        text: "Data berhasil diedit",
      });
      ApiAwal();
      setIsModalOpen(false);
      setLoading(false);
    } catch (error) {
      if (error.response.data.status) {
        error.response.data.errors.forEach((i) => {
          let errrrr = i.message;
          notification.error({
            message: "ADA KESALAHAN DI FORM INPUT",
            description: errrrr,
          });
        });
      }

      // Tampilkan SweetAlert untuk error
      console.log(error.response.data.status.message);
    }
  };

  const handleRowClick = (row) => {
    showModal(row.vehicleId);
    setIdDriver(row.vehicleId);
    DetailVehicle(row.vehicleId);
  };

  // const validationSchema = Yup.object().shape({
  //     kode_kendaraan: Yup.string()
  //         .required('Kode Kendaraan wajib diisi'),
  //     //... Add other field validations here
  // });

  const DetailVehicle = async (vehicleId) => {
    try {
      const data = await axios.get(
        `${Baseurl}vehicle/get-vehicle-detail?id=${vehicleId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      console.log(`ini baru`, data.data.data[0]);
      setFotoDriver(data.data.data[0].vehicleImage);
      setCodeVehicle(data.data.data[0]?.vehicleCode);
      formik.setValues({
        vehicleCode: data.data.data[0].vehicleCode,
        kode_kendaraan: data.data.data[0].vehicleCode,
        no_polisi: data.data.data[0].policeNumber,
        jenis_kepemilikan: data.data.data[0].jenisKepemilikan,
        jenis_kendaraan: data.data.data[0].vehicleType,
        warna_plat: data.data.data[0].platColor,
        merk_mobil: data.data.data[0].vehicleMerk,
        tahun_mobil: data.data.data[0].vehilceYear,
        setFotoDriver: data.data.data[0].vehicleImage,
        vendor: data.data.data[0].vendor,
        id_vendor: data.data.data[0].id_vendor,
        id_driver: data.data.data[0].driverId,
        jenis_SIM: data.data.data[0]?.jenis_SIM,
        no_bpkb: data.data.data[0]?.bpkbNumber,
        stnk: data.data.data[0]?.stnk,
        tgl_stnk: data.data.data[0]?.stnkDate,
        tgl_kir: data.data.data[0]?.kirDate,
        tgl_beli: data.data.data[0]?.buyDate,
        tgl_plat_nomor: data.data.data[0]?.expiredPlat,
        kapasitas: data.data.data[0]?.capacity,
        kubikasi: data.data.data[0]?.cubication,
        panjang: data.data.data[0]?.vehicleLentgth,
        lebar: data.data.data[0]?.vehicleWidth,
        tinggi: data.data.data[0]?.vehicleHeight,
        kapasitas_maks: data.data.data[0]?.maxCapacity,
        id_jenis_kendaraan: data.data.data[0]?.id_jenis_kendaraan,
        driverName: data.data.data[0]?.driverName,
      });
    } catch (error) {}
  };

  const BuatVehicle = async (values, newFileList) => {
    setLoading(true);
    try {
      const formData = new FormData();
      Object.keys(values).forEach((key) => formData.append(key, values[key]));
      formData.append("cover", FotoDriver);
      formData.append("kubikasi", perhitunganVolume());

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
      ApiAwal();
      setLoading(false);
      setIsModalOpen(false);
    } catch (error) {
      if (error.response.data.errors) {
        error.response.data.errors.forEach((err) => {
          let customMessage;

          if (err.message === "ID driver Tidak Boleh Kosong") {
            customMessage = "Nama Driver Harus Di isi";
          } else {
            customMessage = err.message;
          }

          notification.error({
            message: "ADA KESALAHAN DI FORM INPUT",
            description: customMessage,
          });
        });
      } else if (error.response.data.status) {
        // alert("error else")
        notification.error({
          message: error.response.data.status.message,
        });
      }
    }
  };

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
      setCodeVehicle(data.data.data.code);
    } catch (error) {}
  };

  const title = () => {
    if (formik.values.jenis_kepemilikan === "") {
      return "Create Vehicle";
    } else {
      return "Edit Vehicle";
    }
  };

  return (
    <div>
      <Card>
        <>
          <Col>
            <h5 style={{ color: "#1A5CBF", fontWeight: "bold" }}>
              Master Vehicle
            </h5>
          </Col>
          <Row>
            <Col sm={2}>
              <Input
                style={{
                  width: "150px",
                  border: "1px solid #1A5CBF",
                  borderRadius: "5px",
                  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.3)",
                }}
                value={CariNoKendaraan}
                onChange={(e) => setCariNoKendaraan(e.target.value)}
                placeholder="Cari No Kendaraan"
              />
            </Col>
            <Col sm={2}>
              <Select
                showSearch
                placeholder="Jenis Kepemilikan"
                optionFilterProp="children"
                style={{
                  width: "150px",
                  border: "1px solid #1A5CBF",
                  borderRadius: "5px",
                  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.3)",
                }}
                // value={CariJenisKepemilikan}
                onChange={(value) => setCariJenisKepemilikan(value)}
              >
                <Select.Option value="">-</Select.Option>
                {jenisKepemilikan.map((option) => (
                  <Select.Option key={option.label} value={option.jenis}>
                    {option.jenis}
                  </Select.Option>
                ))}
              </Select>
            </Col>
            <Col sm={4}>
              <Select
                showSearch
                placeholder="Status"
                optionFilterProp="children"
                style={{
                  width: "150px",
                  border: "1px solid #1A5CBF",
                  borderRadius: "5px",
                  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.3)",
                }}
                // value={CariJenisKepemilikan}
                onChange={(value) => setCariDriverAktif(value)}
              >
                <Select.Option value="">-</Select.Option>
                {StatusDriverAktif.map((option) => (
                  <Select.Option key={option.label} value={option.value}>
                    {option.status}
                  </Select.Option>
                ))}
              </Select>
            </Col>
            <Col sm={2}>
              <Button
                style={{
                  backgroundColor: "#1A5CBF",
                  color: "#FFFFFF",
                  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.3)",
                  borderColor: "#1A5CBF",
                }}
                type="primary"
                onClick={() => {
                  showModal();
                  setIdDriver(null);
                  setFotoDriver(null);
                  DriverName();
                }}
              >
                Tambah Vehicle
              </Button>
            </Col>
            {localStorage.getItem("jobdesk") && ValidasiTombol === false && (
              <Col sm={2}>
                <Button
                  style={{
                    backgroundColor: "red",
                    color: "#FFFFFF",
                    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.3)",
                    borderColor: "#1A5CBF",
                  }}
                  type="danger"
                  onClick={() => {
                    setShowVehicleModal(false);
                    // showModal()
                    // setIdDriver(null)
                    // setFotoDriver(null)
                    // DriverName()
                  }}
                >
                  Halaman Tambah Driver
                </Button>
              </Col>
            )}
          </Row>

          <Modal
            title={title()}
            style={{ top: 10 }}
            visible={isModalOpen}
            onOk={formik.handleSubmit}
            width={1000}
            // confirmLoading={Loading}
            onCancel={() => {
              handleCancel();
            }}
          >
            <AntForm>
              <Row>
                <Col sm={4}>
                  <Card>
                    <img
                      src={
                        FotoDriver instanceof File
                          ? URL.createObjectURL(FotoDriver)
                          : FotoDriver
                      }
                    />
                  </Card>
                  <AntForm.Item
                    label="Upload Foto Kendaraan"
                    // required
                    name="kendaraan"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    help={formik.touched.kendaraan && formik.errors.kendaraan}
                    validateStatus={
                      formik.touched.kendaraan && formik.errors.kendaraan
                        ? "error"
                        : "success"
                    }
                    style={{ marginBottom: 2 }}
                  >
                    <Upload
                      accept=".png,.jpg,.jpeg"
                      beforeUpload={(file) => {
                        setFotoDriver(file);
                        // Mencegah upload default
                        return false;
                      }}
                      onChange={({ fileList }) => {
                        // Ambil file asli dari fileList terakhir dan simpan dalam state
                        if (fileList.length > 0) {
                          const { originFileObj } =
                            fileList[fileList.length - 1];
                          setFotoDriver(originFileObj);
                        } else {
                          setFotoDriver(null);
                        }
                      }}
                    >
                      <Button icon={<UploadOutlined />}>Click to Upload</Button>
                    </Upload>
                  </AntForm.Item>
                  <AntForm.Item
                    label="Tgl EXP STNK"
                    // required
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    help={formik.touched.tgl_stnk && formik.errors.tgl_stnk}
                    validateStatus={
                      formik.touched.tgl_stnk && formik.errors.tgl_stnk
                        ? "error"
                        : "success"
                    }
                    style={{ marginBottom: 2 }}
                  >
                    <DatePicker
                      format="DD-MM-YYYY"
                      id="tgl_stnk"
                      name="tgl_stnk"
                      onChange={(date) => {
                        formik.setFieldValue(
                          "tgl_stnk",
                          date ? date.format("YYYY-MM-DD") : 0
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
                    // required
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    // help={formik.touched.jenis_kendaraan && formik.errors.jenis_kendaraan}
                    // validateStatus={formik.touched.jenis_kendaraan && formik.errors.jenis_kendaraan ? 'error' : 'success'}
                    style={{ marginBottom: 2 }}
                  >
                    <DatePicker
                      format="DD-MM-YYYY"
                      id="tgl_plat_nomor"
                      name="tgl_plat_nomor"
                      onChange={(date) => {
                        formik.setFieldValue(
                          "tgl_plat_nomor",
                          date ? date.format("YYYY-MM-DD") : 0
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
                    // required
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
                      format="DD-MM-YYYY"
                      id="tgl_kir"
                      name="tgl_kir"
                      onChange={(date) => {
                        formik.setFieldValue(
                          "tgl_kir",
                          date ? date.format("YYYY-MM-DD") : 0
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
                    // required
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    // help={formik.touched.jenis_kendaraan && formik.errors.jenis_kendaraan}
                    // validateStatus={formik.touched.jenis_kendaraan && formik.errors.jenis_kendaraan ? 'error' : 'success'}
                    style={{ marginBottom: 2 }}
                  >
                    <DatePicker
                      format="DD-MM-YYYY"
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
                    label="Vehicle Code"
                    required
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    style={{ marginBottom: 2 }}
                  >
                    <Input
                      disabled
                      showSearch
                      optionFilterProp="children"
                      id="jenis_kepemilikan"
                      name="jenis_kepemilikan"
                      onChange={(value) =>
                        formik.setFieldValue("vehicleCode", value)
                      }
                      value={CodeVehicle}
                      // onBlur={formik.handleBlur}
                    ></Input>
                  </AntForm.Item>
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
                    <Select
                      showSearch
                      optionFilterProp="children"
                      id="jenis_kepemilikan"
                      name="jenis_kepemilikan"
                      onChange={(value) =>
                        formik.setFieldValue("jenis_kepemilikan", value)
                      }
                      value={
                        formik.values.jenis_kepemilikan ||
                        jenisKepemilikan[0]?.jenis ||
                        ""
                      }
                      onBlur={formik.handleBlur}
                    >
                      {jenisKepemilikan.map((option) => (
                        <Select.Option key={option.label} value={option.jenis}>
                          {option.jenis}
                        </Select.Option>
                      ))}
                    </Select>
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
                      onChange={(e) => {
                        // Mengubah input menjadi huruf kapital
                        formik.setFieldValue(
                          "kode_kendaraan",
                          e.target.value.toUpperCase()
                        );
                      }}
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
                      onChange={(e) => {
                        // Mengubah input menjadi huruf kapital
                        formik.setFieldValue(
                          "no_polisi",
                          e.target.value.toUpperCase()
                        );
                      }}
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
                    <Select
                      showSearch
                      optionFilterProp="children"
                      id="vendor"
                      name="vendor"
                      onChange={(value, option) => {
                        formik.setFieldValue("vendor", option.children); // mengambil label (children dari option)
                        formik.setFieldValue("id_vendor", value); // mengambil value dari option yang dipilih
                      }}
                      onBlur={formik.handleBlur}
                      value={
                        formik.values.vendor ||
                        (NamaMitraOptions.length > 0
                          ? NamaMitraOptions[0]?.value
                          : "")
                      }
                    >
                      {NamaMitraOptions.map((option) => (
                        <Select.Option key={option.value} value={option.value}>
                          {option.label}

                          {/* + " " + "(" + option.type + ")" */}
                        </Select.Option>
                      ))}
                    </Select>
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
                    <Select
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
                      value={
                        formik.values.jenis_kendaraan ||
                        (DriverType.length > 0 ? DriverType[0]?.tipe : "")
                      }
                      onBlur={formik.handleBlur}
                    >
                      {DriverType.map((item) => (
                        <Select.Option key={item.id} value={item.tipe}>
                          {item.tipe}
                        </Select.Option>
                      ))}
                    </Select>
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
                    <Select
                      showSearch
                      optionFilterProp="children"
                      id="id_driver"
                      name="id_driver"
                      type="text"
                      onChange={(value) => {
                        formik.setFieldValue("id_driver", value);
                        formik.setFieldValue("driverName", value);
                      }}
                      // value={formik.values.id_driver}
                      value={formik.values.driverName}
                      onBlur={formik.handleBlur}
                    >
                      {NamaSupir &&
                        NamaSupir.map((item) => (
                          <Select.Option key={item.tipe} value={item.driverId}>
                            {item.driverName}
                          </Select.Option>
                        ))}
                    </Select>
                  </AntForm.Item>
                  {/* <AntForm.Item
                                        label="Jenis SIM"
                                        showSearch
                                        optionFilterProp="children"
                                        required
                                        labelCol={{ span: 24 }}
                                        wrapperCol={{ span: 24 }}
                                        help={formik.touched.jenis_kendaraan && formik.errors.jenis_kendaraan}
                                        validateStatus={formik.touched.jenis_kendaraan && formik.errors.jenis_kendaraan ? 'error' : 'success'}
                                        style={{ marginBottom: 2 }}
                                    >
                                        <Select
                                            showSearch
                                            optionFilterProp="children"
                                            id="jenis_SIM"
                                            name="jenis_SIM"
                                            type="text"
                                            // onChange={formik.handleChange}
                                            onChange={(value) => formik.setFieldValue('jenis_SIM', value)}
                                            value={formik.values.jenis_SIM}
                                            onBlur={formik.handleBlur}

                                        >
                                            {JenisSimOptions.map((option) => (
                                                <Select.Option key={option.label} value={option.jenis}>
                                                    {option.jenis}
                                                </Select.Option>
                                            ))}

                                        </Select>
                                    </AntForm.Item> */}

                  <AntForm.Item
                    label="Warna Plat"
                    // required
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
                    <Select
                      id="warna_plat"
                      name="warna_plat"
                      type="text"
                      onChange={(value) =>
                        formik.setFieldValue("warna_plat", value)
                      }
                      value={formik.values.warna_plat}
                      onBlur={formik.handleBlur}
                    >
                      {WarnaPlat &&
                        WarnaPlat.map((item) => (
                          <Select.Option key={item.warna} value={item.warna}>
                            {item.warna}
                          </Select.Option>
                        ))}
                    </Select>
                  </AntForm.Item>
                  <AntForm.Item
                    label="Merk Mobil"
                    // required
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
                      onChange={(e) => {
                        e.target.value = e.target.value.toUpperCase();
                        formik.handleChange(e);
                      }}
                      value={formik.values.merk_mobil}
                      onBlur={formik.handleBlur}
                    />
                  </AntForm.Item>
                </Col>
                <Col sm={4}>
                  <AntForm.Item
                    label="Tahun Mobil"
                    // required
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    help={
                      formik.touched.tahun_mobil && formik.errors.tahun_mobil
                    }
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
                      type="number"
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
                        label="Panjang (m)"
                        // required
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
                        label="Lebar (m)"
                        // required
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
                        label="Tinggi (m)"
                        // required
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
                    label={
                      <span>
                        Kubikasi (Penjumlahan Dari <strong>P x L x T</strong>)
                      </span>
                    }
                    // required
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
                      type="number"
                      onChange={formik.handleChange}
                      // value={`${perhitunganVolume()}m`}
                      value={`${perhitunganVolume()}`}
                      onBlur={formik.handleBlur}
                    />
                  </AntForm.Item>
                  <AntForm.Item
                    label="No BPKB"
                    // required
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
                    // required
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
                    label="Kapasitas (KG)"
                    // required
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    help={formik.touched.kapasitas && formik.errors.kapasitas}
                    validateStatus={
                      formik.touched.kapasitas && formik.errors.kapasitas
                        ? "error"
                        : "success"
                    }
                    style={{ marginBottom: 2 }}
                  >
                    <Input
                      id="kapasitas"
                      name="kapasitas"
                      type="number"
                      onChange={formik.handleChange}
                      value={formik.values.kapasitas}
                      onBlur={formik.handleBlur}
                    />
                  </AntForm.Item>
                  <AntForm.Item
                    label="Kapasitas Max (KG)"
                    // required
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
                      type="number"
                      onChange={formik.handleChange}
                      value={formik.values.kapasitas_maks}
                      onBlur={formik.handleBlur}
                    />
                  </AntForm.Item>

                  <AntForm.Item
                    label="Cabang"
                    // required
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
          </Modal>
        </>
        <style>
          {`
          .rdt_TableBody .rdt_TableRow:hover {
            cursor: pointer;
            background-color: #C7E1FB;
          }
          
        `}
        </style>
        <DataTable
          columns={columns}
          data={DataAwal}
          onRowClicked={handleRowClick}
          customStyles={{
            headCells: {
              style: {
                backgroundColor: "#1a5cbf",
                color: "#fff",
                width: "100%",
              },
            },
          }}
        />

        <div className="d-flex justify-content-end mt-3">
          <Pagination
            showSizeChanger
            onChange={onShowSizeChange}
            defaultCurrent={1}
            total={TotalPage}
          />
        </div>
      </Card>
    </div>
  );
}

export default VehicleBaru;
