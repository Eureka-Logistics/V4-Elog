import React, { useEffect, useState } from 'react'
import { Button, Modal, Form, Input, Select, message, Alert, Tag, notification } from 'antd'
import { useFormik } from 'formik'
import * as Yup from 'yup';
import { Col, Row, Table } from 'react-bootstrap';
import Baseurl from '../../../../Api/BaseUrl';
import axios from 'axios';
import Swal from 'sweetalert2';
import NumberFormat from 'react-number-format';
import ZustandStore from '../../../../zustand/Store/GetSelectKota';
import ModalEditSPDetail from './EditModalSPDetail/ModalEditSPDetail';
import EditDetailSPModal from '../../../../zustand/Store/EditDetailSPModal';
import useServiceStatusStore from '../../../../zustand/Store/StatusService';
function ModalCreateDetail({ AlamatInvoiceOptions, DetailSemua, idmp, DetailSP, JenisBarangFormik, detailData, }) {
    const [modal1Open, setModal1Open] = useState(false);
    const [modal2Open, setModal2Open] = useState(false);
    const [selectVia, setSelectVia] = useState("");
    const [SelectTypeMobil, setSelectTypeMobil] = useState("");
    const [SelectShipment, setSelectShipment] = useState("");
    const [shipmentOptions, setShipmentOptions] = useState([]);
    const [data, setdatass] = useState("")
    const [Loding, setLoding] = useState(false)
    const [DetailSemuaTemp, setDetailSemuaTemp] = useState("")
    const [IDMuatKota, setIDMuatKota] = useState("")
    const [IDKotaBongkar, setIDKotaBongkar] = useState("")
    const [HasilTarif, setasilTarif] = useState("")
    const [PenjumlahanTotal, setPenjumlahanTotal] = useState(0);
    const [TarifAsli, setTarifAsli] = useState(0);
    const { NamaKotaGlobal, setNamaKotaGlobal } = ZustandStore((i) => ({
        NamaKotaGlobal: i.NamaKotaGlobal,
        setNamaKotaGlobal: i.setNamaKotaGlobal
    }))
    const { serviceStatus, setServiceStatus } = useServiceStatusStore();
    const setData = EditDetailSPModal(state => state.setData);

    const [modal1Open1, setModal1Open1] = useState(false);
    const handleOpenModal = (data) => {
        setModal1Open1(true);
        console.log(`ini data dari modal`, data);
        setData(data)
        setdatass(data)
        setasilTarif(data?.biaya_jalan)
    };

    const handleCloseModal = () => {
        setModal1Open1(false);
    };

    const [id_price_customer, setid_price_customer] = useState("")
    const [GetTarifOptions, setGetTarifOptions] = useState([])
    const formik = useFormik({
        initialValues: {
            alamatmuat: '',
            alamatbongkar: "",
            kendaraan: "",
            via: "",
            alamatrute: '',

        },
        validationSchema: Yup.object({
            alamatmuat: Yup.string().required('Alamat Muat Harus Di Isi'),
            alamatbongkar: Yup.string().required('Alamat Bongkar Harus Di Isi'),
            kendaraan: Yup.string().required('Kendaraan Harus Di Isi'),
            via: Yup.string().required('Via Harus Di Isi'),

        }),
        onSubmit: (values) => {
            console.log(values);
            setModal1Open(false)
            if (DetailSemuaTemp?.idmpd == null) {
                CreateDetailSP()
            } else {
                EditSJ()
            }
        },
    });


    var counter = 1
    const CreateDetailSP = async () => {
        try {
            setLoding(true)
            const data = await axios.post(`${Baseurl}sp/create-SP-detail`,
                {
                    idMp: idmp,
                    idcustomer: DetailSemua?.idcustomer,
                    ph: DetailSemua?.sp,
                    via: formik.values.via,
                    shipment: formik.values.shipmentIDBaru,
                    kendaraan: formik.values.kendaraan,
                    id_almuat: formik.values.IDalamatmuat,
                    id_albongkar: formik.values.IDalamatbongkar,
                    // nama_barang: formik.values.namabarang,
                    nama_barang: JenisBarangFormik,
                    berat: parseInt(formik.values.berat),
                    qty: formik.values.qty,
                    koli: formik.values.koli,
                    id_price_customer: id_price_customer,
                    // harga: formik.values.totalCreate,
                    harga: TarifAsli,
                    total: formik.values.totalCreate,
                    harga_bongkar: formik.values.bongkar,
                    harga_muat: formik.values.biayamuat,
                    id_kota_muat: IDMuatKota,
                    id_kota_bongkar: IDKotaBongkar
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: localStorage.getItem("token"),
                    },
                }
            )
            DetailSP()
            // getDetails()
            message.success('Data berhasil ditambahkan!');
        } catch (error) {
            message.error(error.response.data.status.message)
            setModal1Open(true)
        } finally {
            setLoding(false); // akan dipanggil baik ada error maupun tidak
        }
    }




    const apidetailidmpd = async (idmpd) => {
        try {
            const data = await axios.get(`${Baseurl}sp/get-SP-detail-purch-idmpd?id_mpd=${idmpd}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: localStorage.getItem("token"),
                },
            })
            console.log(`ini dari modal editspdetail`, data);
        } catch (error) {

        }
    }


    const getDetailModal = async () => {
        try {
            const response = await axios.get(
                `${Baseurl}sp/get-SP-select-detail?keyword=&companyId=${DetailSemua?.idcustomer}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: localStorage.getItem("token"),
                    },
                }
            );
            setSelectVia(response.data.data.via)
            setSelectTypeMobil(response.data.data.type)
            setSelectShipment(response.data.data.shipment)

        } catch (error) {
            console.error("Failed to fetch detail data:", error);
        }
    };
    useEffect(() => {
        setServiceStatus(DetailSemua?.service);
        getDetailModal();
        setNamaKotaGlobal()
    }, [DetailSemua, detailData]);
    useEffect(() => (
        formik.setValues({
            via: DetailSemuaTemp?.via,
            alamatmuat: DetailSemuaTemp?.pickup,
            alamatbongkar: DetailSemuaTemp?.destination,
            IDalamatmuat: DetailSemuaTemp?.destinationId,
            IDalamatbongkar: DetailSemuaTemp?.pickupId,
            kendaraan: DetailSemuaTemp?.kendaraan,
            shipment: DetailSemuaTemp?.shipmentName,
            berat: DetailSemuaTemp?.berat,
            qty: DetailSemuaTemp?.qty,
            koli: DetailSemuaTemp?.koli == null ? 0 : DetailSemuaTemp?.koli,
            namabarang: DetailSemuaTemp?.item,
            item: DetailSemuaTemp?.item,
            panjang: DetailSemuaTemp?.panjang,
            lebar: DetailSemuaTemp?.lebar,
            tinggi: DetailSemuaTemp?.tinggi,
            bongkar: DetailSemuaTemp?.harga_bongkar,
            biayamultimuat: DetailSemuaTemp?.biayamultimuat,
            biayamuat: DetailSemuaTemp?.harga_muat,
            biayamultidrop: DetailSemuaTemp?.harga_multidrop,
            biayamel: DetailSemuaTemp?.biayamel,
            total: DetailSemuaTemp?.harga,
            id_kota_muat: DetailSemuaTemp?.id_kota_muat,
            id_kota_bongkar: DetailSemuaTemp?.id_kota_bongkar,
            shipmentID: DetailSemuaTemp?.shipmentID,
            biaya_jalan: DetailSemuaTemp?.biaya_jalan,
            total: DetailSemuaTemp?.Price,

        })
    ), [DetailSemuaTemp])

    useEffect(() => {

        if (formik.values.via) {
            const filteredShipments = SelectShipment.filter(
                (item) => item?.via === formik.values.via
            );
            console.log(`filteredShipments`, filteredShipments);
            setShipmentOptions(filteredShipments);
        }
        else {
            setShipmentOptions([]);
            getTarifRute()
        }
        getDetail()

    }, [formik.values.via, SelectShipment, IDMuatKota, IDKotaBongkar]);

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };


    // Edit sj
    const EditSJ = async () => {
        try {
            const data = await axios.post(`${Baseurl}sp/edit-SP-detail`,
                {
                    id_mpd: DetailSemuaTemp?.idmpd,
                    via: formik.values.via,
                    shipment: formik.values.shipmentID,
                    kendaraan: formik.values.kendaraan,
                    id_almuat: formik.values.IDalamatmuat,
                    id_albongkar: formik.values.IDalamatbongkar,
                    nama_barang: formik.values.namabarang,
                    // volume: formik.values.shipment ,
                    volume: formik.values.berat,
                    berat: formik.values.berat,
                    qty: formik.values.qyt,
                    koli: formik.values.koli,
                    harga_muat: formik.values.biayamuat,
                    harga_bongkar: formik.values.bongkar,
                    harga: HasilTarif,
                    total: formik.values.total

                },

                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: localStorage.getItem("token"),
                    },
                }
            )
            DetailSP()
            // getDetails()
            setModal1Open1(false)
            message.success('Data berhasil Diubah!');
        } catch (error) {
            message.error(error.response.data.status.message)

        }
    }

    // delete sj
    const deltebutton = async (idmpd) => {
        Swal.fire({
            title: "Ingin Menghapus SJ?",
            showDenyButton: true,
            denyButtonText: `Tidak`,
            confirmButtonText: "Iya?",
        }).then(async (result) => {
            if (result.isConfirmed) {
                const data = await axios.post(
                    `${Baseurl}sp/delete-SP-detail`,
                    {
                        id: idmpd,
                    },
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: localStorage.getItem("token"),
                        },
                    }
                );
                Swal.fire("Data Berhasil Di hapus", "success");
                DetailSP()
            } else if (result.isDenied) {
                Swal.fire("Changes are not saved", "", "info");
            }
        });
    };

    // const Hitung = () => {
    //     let total = 0;

    //     // Daftar semua field yang ingin dijumlahkan
    //     const fields = ['biayamel', 'biayamultidrop', 'biayamultimuat', 'biayamuat', 'bongkar'];

    //     for (let field of fields) {
    //         let value = Number(formik.values[field] * 1);

    //         if (!value || isNaN(value)) {
    //             value = 0;
    //         }

    //         total += Number(value);
    //     }

    //     /// Ini itungan kalau dia adalah retail
    //     if (formik.values.shipment === "Retail") {
    //         total += formik.values.berat * HasilTarif;

    //     } else if (formik.values.shipment !== "Charter") {
    //         const fields = ['biayamel', 'biayamultidrop', 'biayamultimuat', 'biayamuat', 'bongkar'];
    //         console.log("HasilTarif:", HasilTarif);

    //         for (let field of fields) {
    //             let value = Number(formik.values[field]);

    //             if (!value || isNaN(value)) {
    //                 value = 0;
    //             }

    //             total += Number(value); // tambahkan HasilTarif setelah loop berakhir
    //         }

    //     }

    //     return total;
    // }
    const service = GetTarifOptions.map((i) => (
        i.service_type
    ))
    console.log(`GetTarifOptions`, service);

    const formatToIDR = (value) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(value);
    };

    const getDetail = async () => {
        try {
            const response = await axios.get(
                `${Baseurl}sp/get-SP-all-detail?keyword=&idmp=${idmp}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: localStorage.getItem("token"),
                    },
                }
            );
            console.log(response.data.idcustomer);
            localStorage.setItem("idcustomer", response.data.idcustomer)
        } catch (error) {
            console.error("Failed to fetch detail data:", error);
        }
    };


    const getTarifRute = async () => {
        const data = await axios.get(`${Baseurl}tarif/get-tarifCustomer?limit=&page=&id_muat_kota=${IDMuatKota === "" ? formik.values?.id_kota_muat : IDMuatKota}&id_tujuan_kota=${IDKotaBongkar === "" ? formik.values?.id_kota_bongkar : IDKotaBongkar}&id_kendaraan_jenis=&id_price=&id_customer=${localStorage.getItem("idcustomer")}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: localStorage.getItem("token"),
                },
            })
        setGetTarifOptions(data.data.data.order)
    }

    let nomorr = 1

    const calculateTotal = (shipmentType, kilogram, tarif) => {
        const biayaBongkar = Number(formik.values.bongkar) || 0;
        const biayaMuat = Number(formik.values.biayamuat) || 0;
        const berat = Number(formik.values.berat) || 0;
        const HasilTarifNumerik = Number(HasilTarif) || 0;

        if (DetailSemua?.service === 'Retail') {
            return berat * HasilTarifNumerik + biayaBongkar + biayaMuat;
        } else if (DetailSemua?.service === 'Charter') {
            return HasilTarifNumerik + biayaBongkar + biayaMuat;
        } else {
            return 0; // atau pesan error jika tipe pengiriman tidak dikenal
        }
    };

    useEffect(() => {
        const total = calculateTotal(formik.values.shipment, formik.values.berat, HasilTarif);
        formik.setFieldValue("total", total);
        const totalCreate = calculateTotal(formik.values.shipment, formik.values.berat, HasilTarif);
        formik.setFieldValue("totalCreate", totalCreate);
    }, [HasilTarif, formik.values.totalCreate, formik.values.shipment, formik.values.berat, formik.values.bongkar, formik.values.biayamuat]);


    console.log(`GetTarifOptions`, GetTarifOptions);
    // const calculateTotalCreate = (shipmentType, kilogram, tarif) => {
    //     const biayaBongkar = Number(formik.values.bongkar);
    //     const biayaMuat = Number(formik.values.biayamuat);

    //     if (DetailSemua?.service === 'Retailer') {
    //         return Number(formik.values.berat) * Number(HasilTarif) + biayaBongkar + biayaMuat;
    //     } else if (DetailSemua?.service === 'Charter') {
    //         return Number(tarif) + biayaBongkar + biayaMuat;
    //     } else {
    //         return 0; // atau pesan error jika tipe pengiriman tidak dikenal
    //     }
    // }

    return (
        <div className='mt-3'>
            <div className='d-flex justify-content-end'>
                <Button type='primary' onClick={() => {
                    formik.resetForm();
                    setModal1Open(true);
                    getTarifRute()
                }}>Create Detail SP</Button>
            </div>


            <Modal
                title="Create Detail SP"
                style={{
                    top: 20,
                }}
                open={modal1Open}
                onOk={formik.handleSubmit}
                onCancel={() => setModal1Open(false)}
                width="800px"
                confirmLoading={Loding}
            >

                <Form
                    // onFinish={formik.handleSubmit}
                    onFinish={CreateDetailSP}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    name="Edit Detail SP"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                >
                    <Row>
                        <Col sm={6}>
                            <Form.Item
                                label="nama kota muat"
                                help={formik.touched.IDNamaKotaMuat && formik.errors.IDNamaKotaMuat}
                                validateStatus={
                                    formik.touched.IDNamaKotaMuat && formik.errors.IDNamaKotaMuat
                                        ? 'error'
                                        : 'success'
                                }
                                style={{ marginBottom: 2 }}
                            >
                                <Select
                                    showSearch
                                    optionFilterProp="children"
                                    id="IDNamaKotaMuat"
                                    NamaKotaMuat type="text"
                                    value={formik.values?.id_kota_muat}
                                    onChange={(value, option) => {
                                        formik.setFieldValue("IDNamaKotaMuat", option.key);
                                        setIDMuatKota(option.key) // set alamatmuat state to option's children
                                        // formik.setFieldValue("IDalamatmuat", option.key); // set IDalamatmuat state to option's value
                                        // formik.setFieldValue("IdKotaMuat", value); // set IDalamatmuat state to option's value
                                        console.log(`IDNamaKotaMuat`, option.key);
                                    }}
                                    onBlur={formik.handleBlur}
                                >
                                    {NamaKotaGlobal && NamaKotaGlobal?.muatKota?.map((item) => (
                                        <Select.Option key={item.idKota} value={item.idKota}>
                                            {item.namaKota}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col sm={6}>
                            <Form.Item
                                label="nama kota bongkar"
                                help={formik.touched.IDNamaKotaBongkar && formik.errors.IDNamaKotaBongkar}
                                validateStatus={
                                    formik.touched.IDNamaKotaBongkar && formik.errors.IDNamaKotaBongkar
                                        ? 'error'
                                        : 'success'
                                }
                                style={{ marginBottom: 2 }}
                            >
                                <Select
                                    // disabled
                                    showSearch
                                    optionFilterProp="children"
                                    id="IDNamaKotaBongkar"
                                    name="IDNamaKotaBongkar"
                                    type="text"
                                    onChange={(value, option) => {
                                        formik.setFieldValue("IDNamaKotaBongkar", option.key);
                                        setIDKotaBongkar(option.key)// set alamatmuat state to option's children
                                        // formik.setFieldValue("IDalamatmuat", option.key); // set IDalamatmuat state to option's value
                                        // formik.setFieldValue("IdKotaMuat", value); // set IDalamatmuat state to option's value
                                        console.log(`IDNamaKotaBongkar`, option.key);
                                    }}
                                    value={formik.values?.id_kota_bongkar}
                                    onBlur={formik.handleBlur}
                                >
                                    {NamaKotaGlobal && NamaKotaGlobal?.tujuanKota?.map((item) => (
                                        <Select.Option key={item.idKota} value={item.idKota}>
                                            {item.namaKota}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col sm={12}>
                            <Form.Item
                                required
                                label={"Pilih Rute " + DetailSemua?.service}
                                help={formik.touched.alamatbongkar && formik.errors.alamatbongkar}
                                validateStatus={
                                    formik.touched.alamatbongkar && formik.errors.alamatbongkar
                                        ? 'error'
                                        : 'success'
                                }
                                style={{ marginBottom: 2 }}
                            >
                                <Select
                                    required
                                    showSearch
                                    optionFilterProp="key"
                                    id="pilihrute"
                                    name="pilihrute"
                                    type="text"
                                    onChange={(value, option, biaya) => {
                                        formik.setFieldValue("alamatrute", option);
                                        formik.setFieldValue("kendaraan", option.children[1].props.children);
                                        formik.setFieldValue("via", option.children[3].props.children);
                                        formik.setFieldValue("shipment", option.children[5].props.children);
                                        setasilTarif(option.children[7].props.children)
                                        setid_price_customer(value)
                                        console.log(`id_price`, option);
                                        setTarifAsli(option?.biaya)
                                    }}
                                    value={"Kendaraan :" + " " + formik.values.kendaraan + " | | " + "Via :" + " " + formik.values.via + " | | " + "Shipment : " + formik.values.shipment}
                                    onBlur={formik.handleBlur}
                                >
                                    {GetTarifOptions && GetTarifOptions
                                        .filter(item => item.service_type === DetailSemua?.service)
                                        .map((item) => (
                                            <Select.Option biaya={item.biaya_jalan} key={item.kotaTujuan} value={item.id_price}>
                                                Kendaraan:<Tag color='blue'>{item.kendaraanJenis}</Tag>via:<Tag color='gold'>{item.via}</Tag>Shipment:<Tag color='cyan'>{item.service_type}</Tag>Tarif:<Tag color='green'>{item.biaya_jalan}</Tag>
                                            </Select.Option>
                                        ))
                                    }
                                </Select>
                            </Form.Item>

                        </Col>
                        <Col sm={8}>
                            <Form.Item
                                required
                                label="Alamat Muat"
                                help={formik.touched.alamatmuat && formik.errors.alamatmuat}
                                validateStatus={
                                    formik.touched.alamatmuat && formik.errors.alamatmuat
                                        ? 'error'
                                        : 'success'
                                }
                                style={{ marginBottom: 2 }}
                            >
                                <Select
                                    required
                                    showSearch
                                    optionFilterProp="children"
                                    id="alamatmuat"
                                    name="alamatmuat"
                                    type="text"
                                    onChange={(value, option) => {
                                        formik.setFieldValue("alamatmuat", option.children); // set alamatmuat state to option's children
                                        formik.setFieldValue("IDalamatmuat", option.key); // set IDalamatmuat state to option's value
                                        formik.setFieldValue("IdKotaMuat", value); // set IDalamatmuat state to option's value
                                        console.log(`key`, option.key);
                                    }}
                                    value={formik.values.alamatmuat}
                                    onBlur={formik.handleBlur}
                                >
                                    {AlamatInvoiceOptions && AlamatInvoiceOptions.map((item) => (
                                        <Select.Option key={item.addressId} value={item.id_kota}>
                                            {item.address}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        {/* <Col sm={4}>
                            <Form.Item
                                label="nama kota muat"
                                help={formik.touched.alamatmuat && formik.errors.alamatmuat}
                                validateStatus={
                                    formik.touched.alamatmuat && formik.errors.alamatmuat
                                        ? 'error'
                                        : 'success'
                                }
                                style={{ marginBottom: 2 }}
                            >
                                <Select
                                    disabled
                                    showSearch
                                    optionFilterProp="children"
                                    id="alamatmuat"
                                    name="alamatmuat"
                                    type="text"
                                    value={AlamatInvoiceOptions?.nama_kota}
                                    onBlur={formik.handleBlur}
                                >
                                    {AlamatInvoiceOptions && AlamatInvoiceOptions.map((item) => (
                                        <Select.Option key={item.addressId} value={item.id_kota}>
                                            {item.nama_kota}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col> */}
                        <Col sm={8}>
                            <Form.Item
                                required
                                label="Alamat Bongkar"
                                help={formik.touched.alamatbongkar && formik.errors.alamatbongkar}
                                validateStatus={
                                    formik.touched.alamatbongkar && formik.errors.alamatbongkar
                                        ? 'error'
                                        : 'success'
                                }
                                style={{ marginBottom: 2 }}
                            >
                                <Select
                                    required
                                    showSearch
                                    optionFilterProp="children"
                                    id="alamatbongkar"
                                    name="alamatbongkar"
                                    type="text"
                                    onChange={(value, option) => {
                                        formik.setFieldValue("alamatbongkar", option.children); // set alamatbongkar state to option's children
                                        formik.setFieldValue("IDKotaBongkar", value); // set IDalamatbongkar state to option's value
                                        formik.setFieldValue("IDalamatbongkar", option.key); // set IDalamatbongkar state to option's value
                                    }}
                                    value={formik.values.alamatbongkar}
                                    onBlur={formik.handleBlur}
                                >
                                    {AlamatInvoiceOptions && AlamatInvoiceOptions.map((item) => (
                                        <Select.Option key={item.addressId} value={item.id_kota}>
                                            {item.address}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        {/* <Col sm={4}>
                            <Form.Item
                                label="nama kota bongkar"
                                help={formik.touched.alamatmuat && formik.errors.alamatmuat}
                                validateStatus={
                                    formik.touched.alamatmuat && formik.errors.alamatmuat
                                        ? 'error'
                                        : 'success'
                                }
                                style={{ marginBottom: 2 }}
                            >
                                <Select
                                    disabled
                                    showSearch
                                    optionFilterProp="children"
                                    id="alamatmuat"
                                    name="alamatmuat"
                                    type="text"
                                    onChange={(value, option) => {
                                        formik.setFieldValue("alamatmuat", option.children); // set alamatmuat state to option's children
                                        formik.setFieldValue("IDalamatmuat", option.key); // set IDalamatmuat state to option's value
                                        formik.setFieldValue("IdKotaMuat", value); // set IDalamatmuat state to option's value
                                        console.log(`key`, option.key);
                                    }}
                                    value={AlamatInvoiceOptions?.nama_kota}
                                    onBlur={formik.handleBlur}
                                >
                                    {AlamatInvoiceOptions && AlamatInvoiceOptions.map((item) => (
                                        <Select.Option key={item.addressId} value={item.id_kota}>
                                            {item.address}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col> */}

                    </Row>
                    <br />
                    <hr />
                    <Row>
                        <Col sm={3}>
                            <Form.Item
                                required
                                label="Kendaraan"
                                help={formik.touched.kendaraan && formik.errors.kendaraan}
                                validateStatus={
                                    formik.touched.kendaraan && formik.errors.kendaraan
                                        ? 'error'
                                        : 'success'
                                }
                                style={{ marginBottom: 2 }}
                            >
                                <Select
                                    required
                                    id="noSP"
                                    name="kendaraan"
                                    type="kendaraan"
                                    labelInValue
                                    onChange={(e) => {
                                        formik.setFieldValue("kendaraan", e.value)
                                        formik.setFieldValue("idkendaraan", e.key)
                                        console.log(`ini id kendaraan`, e.key);
                                    }}
                                    value={formik.values.kendaraan}
                                    onBlur={formik.handleBlur}
                                >
                                    {SelectTypeMobil && SelectTypeMobil.map((item) => (
                                        <Select.Option key={item.id} value={item.type}>
                                            {item.address}
                                        </Select.Option>

                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col sm={3}>
                            <Form.Item
                                required
                                label="Via"
                                help={formik.touched.via && formik.errors.via}
                                validateStatus={
                                    formik.touched.via && formik.errors.via
                                        ? 'error'
                                        : 'success'
                                }
                                style={{ marginBottom: 2 }}
                            >
                                <Select
                                    required
                                    id="via"
                                    name="via"
                                    type="via"
                                    onChange={(e) => formik.setFieldValue("via", e)}
                                    value={formik.values.via}
                                    onBlur={formik.handleBlur}
                                >
                                    {selectVia && selectVia.map((item) => (
                                        <Select.Option value={item.via}>{item.via}</Select.Option>
                                    ))}

                                </Select>
                            </Form.Item>
                        </Col>
                        <Col sm={3}>
                            <Form.Item
                                required
                                label="Shipment"
                                help={formik.touched.shipment && formik.errors.shipment}
                                validateStatus={
                                    formik.touched.shipment && formik.errors.shipment
                                        ? 'error'
                                        : 'success'
                                }
                                style={{ marginBottom: 2 }}
                            >
                                <Select
                                    required
                                    id="shipment"
                                    name="shipment"
                                    type="text"
                                    onChange={(e) => {
                                        formik.setFieldValue("shipmentBaru", e)
                                        formik.setFieldValue("shipmentIDBaru", e)
                                        console.log(e);
                                    }}
                                    value={formik.values.shipmentBaru}
                                    onBlur={formik.handleBlur}
                                >
                                    {shipmentOptions && shipmentOptions.map((item) => (
                                        <Select.Option value={item.id}>{item.shipment + " - " + formik.values.via}</Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col sm={3}>
                            <Form.Item
                                required
                                label="Service"
                                help={formik.touched.alamatmuat && formik.errors.alamatmuat}
                                validateStatus={
                                    formik.touched.alamatmuat && formik.errors.alamatmuat
                                        ? 'error'
                                        : 'success'
                                }
                                style={{ marginBottom: 2 }}
                            >
                                <Select
                                disabled
                                    required
                                    id="shipment"
                                    name="shipment"
                                    type="text"
                                    onChange={(e) => {
                                        formik.setFieldValue("shipment", e)
                                        formik.setFieldValue("shipmentID", e)
                                        console.log(e);
                                    }}
                                    value={formik.values.shipment}
                                    onBlur={formik.handleBlur}
                                >
                                    {/* {shipmentOptions && shipmentOptions.map((item) => (
                                        <Select.Option value={item.id}>{item.shipment + " - " + formik.values.via}</Select.Option>
                                    ))} */}
                                    <Select.Option value={"Charter"}>Charter</Select.Option>
                                    <Select.Option value={"Retail"}>Retail</Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={3}>
                            <Form.Item
                                label={"Berat (KG)"}
                                help={formik.touched.berat && formik.errors.berat}
                                validateStatus={
                                    formik.touched.berat && formik.errors.berat
                                        ? 'error'
                                        : 'success'
                                }
                                style={{ marginBottom: 2 }}
                                required
                            >
                                <Input
                                required
                                    id="berat"
                                    name="berat"
                                    type="number"
                                    onChange={(e) => {
                                        formik.setFieldValue('berat', e.target.value)
                                        console.log(e.target.value);
                                    }}
                                    value={formik.values.berat}
                                    onBlur={formik.handleBlur}
                                />
                            </Form.Item>
                        </Col>
                        <Col sm={3}>
                            <Form.Item
                                label="Qty"
                                help={formik.touched.alamatmuat && formik.errors.alamatmuat}
                                validateStatus={
                                    formik.touched.alamatmuat && formik.errors.alamatmuat
                                        ? 'error'
                                        : 'success'
                                }
                                style={{ marginBottom: 2 }}
                            >
                                <Input
                                    id="qyt"
                                    name="qyt"
                                    type="number"
                                    onChange={formik.handleChange}
                                    value={formik.values.qyt}
                                    onBlur={formik.handleBlur}
                                />
                            </Form.Item>
                        </Col>
                        <Col sm={3}>
                            <Form.Item
                                label="Koli"
                                help={formik.touched.alamatmuat && formik.errors.alamatmuat}
                                validateStatus={
                                    formik.touched.alamatmuat && formik.errors.alamatmuat
                                        ? 'error'
                                        : 'success'
                                }
                                style={{ marginBottom: 2 }}
                            >
                                <Input
                                    id="koli"
                                    name="koli"
                                    type="number"
                                    onChange={formik.handleChange}
                                    value={formik.values.koli}
                                    onBlur={formik.handleBlur}
                                />
                            </Form.Item>
                        </Col>
                        <Col sm={3}>
                            <Form.Item
                                label="Nama Barang"
                                help={formik.touched.alamatmuat && formik.errors.alamatmuat}
                                validateStatus={
                                    formik.touched.alamatmuat && formik.errors.alamatmuat
                                        ? 'error'
                                        : 'success'
                                }
                                style={{ marginBottom: 2 }}
                            >
                                <Input
                                    id="namabarang"
                                    name="namabarang"
                                    type="text"
                                    placeholder={JenisBarangFormik}
                                    onChange={formik.handleChange}
                                    value={formik.values.namabarang === null ? JenisBarangFormik : formik.values.namabarang}
                                    onBlur={formik.handleBlur}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={4}>
                            <Form.Item
                                label="Panjang"
                                help={formik.touched.alamatmuat && formik.errors.alamatmuat}
                                validateStatus={
                                    formik.touched.alamatmuat && formik.errors.alamatmuat
                                        ? 'error'
                                        : 'success'
                                }
                                style={{ marginBottom: 2 }}
                            >
                                <Input
                                    id="panjang"
                                    name="panjang"
                                    type="number"
                                    onChange={formik.handleChange}
                                    value={formik.values.panjang}
                                    onBlur={formik.handleBlur}
                                />
                            </Form.Item>
                        </Col>
                        <Col sm={4}>
                            <Form.Item
                                label="Lebar"
                                help={formik.touched.alamatmuat && formik.errors.alamatmuat}
                                validateStatus={
                                    formik.touched.alamatmuat && formik.errors.alamatmuat
                                        ? 'error'
                                        : 'success'
                                }
                                style={{ marginBottom: 2 }}
                            >
                                <Input
                                    id="lebar"
                                    name="lebar"
                                    type="number"
                                    onChange={formik.handleChange}
                                    value={formik.values.lebar}
                                    onBlur={formik.handleBlur}
                                />
                            </Form.Item>
                        </Col>
                        <Col sm={4}>
                            <Form.Item
                                label="Tinggi"
                                help={formik.touched.alamatmuat && formik.errors.alamatmuat}
                                validateStatus={
                                    formik.touched.alamatmuat && formik.errors.alamatmuat
                                        ? 'error'
                                        : 'success'
                                }
                                style={{ marginBottom: 2 }}
                            >
                                <Input
                                    id="tinggi"
                                    name="tinggi"
                                    type="number"
                                    onChange={formik.handleChange}
                                    value={formik.values.tinggi}
                                    onBlur={formik.handleBlur}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <hr />
                    <Row>
                        <Col sm={4}>
                            <Form.Item

                                label="Tarif"
                                help={formik.touched.alamatmuat && formik.errors.alamatmuat}
                                validateStatus={
                                    formik.touched.alamatmuat && formik.errors.alamatmuat
                                        ? 'error'
                                        : 'success'
                                }
                                style={{ marginBottom: 2 }}
                            >
                                <Input

                                    id="tarif"
                                    name="tarif"
                                    type="number"
                                    onChange={(e) => {
                                        setasilTarif(e.target.value)
                                    }}
                                    // value={formik.values.tarif === null ? true : false}
                                    value={HasilTarif}
                                    onBlur={formik.handleBlur}
                                />
                                {/* <Button onClick={tarifalamat} className='mt-2' type='primary'>Cek Tarif</Button> */}
                            </Form.Item>
                        </Col>
                        <Col sm={4}>
                            {/* <Form.Item
                                label="Bongkar"
                                help={formik.touched.tarif && formik.errors.tarif}
                                validateStatus={
                                    formik.touched.tarif && formik.errors.tarif
                                        ? 'error'
                                        : 'success'
                                }
                                style={{ marginBottom: 2 }}
                            >
                                <Input
                                    id="bongkar"
                                    name="bongkar"
                                    type="number"
                                    onChange={formik.handleChange}
                                    value={formik.values.bongkar === undefined ? '0' : formik.values.bongkar}
                                    onBlur={formik.handleBlur}
                                />
                            </Form.Item> */}
                            <Form.Item
                                label="Biaya Bongkar"
                                help={formik.touched.bongkar && formik.errors.bongkar}
                                validateStatus={
                                    formik.touched.bongkar && formik.errors.bongkar
                                        ? 'error'
                                        : 'success'
                                }
                                style={{ marginBottom: 2 }}
                            >
                                <Input
                                    id="bongkar"
                                    name="bongkar"
                                    type="text"
                                    onChange={e => {
                                        // Hapus semua karakter non-angka, ubah ke number, lalu simpan ke formik
                                        formik.setFieldValue("bongkar", Number(e.target.value.replace(/\D/g, '')))
                                    }}

                                    value={formik.values.bongkar}
                                    onBlur={formik.handleBlur}
                                />
                            </Form.Item>

                        </Col>
                        <Col sm={4}>
                            {/* <Form.Item
                                label="Biaya Muat"
                                help={formik.touched.alamatmuat && formik.errors.alamatmuat}
                                validateStatus={
                                    formik.touched.alamatmuat && formik.errors.alamatmuat
                                        ? 'error'
                                        : 'success'
                                }
                                style={{ marginBottom: 2 }}
                            >
                                <Input
                                    id="biayamuat"
                                    name="biayamuat"
                                    type="number"
                                    onChange={formik.handleChange}
                                    value={formik.values.biayamuat}
                                    onBlur={formik.handleBlur}
                                />
                            </Form.Item> */}
                            <Form.Item
                                label="Biaya Muat"
                                help={formik.touched.biayamuat && formik.errors.biayamuat}
                                validateStatus={
                                    formik.touched.biayamuat && formik.errors.biayamuat
                                        ? 'error'
                                        : 'success'
                                }
                                style={{ marginBottom: 2 }}
                            >
                                <Input
                                    id="biayamuat"
                                    name="biayamuat"
                                    type="text"
                                    onChange={e => {
                                        // Hapus semua karakter non-angka, ubah ke number, lalu simpan ke formik
                                        formik.setFieldValue("biayamuat", Number(e.target.value.replace(/\D/g, '')))
                                    }}
                                    value={formik.values.biayamuat}
                                    onBlur={formik.handleBlur}
                                />
                            </Form.Item>

                        </Col>
                    </Row>
                    <Row>
                        <Col sm={4}>
                            <Form.Item
                                label="Biaya Multimuat"
                                help={formik.touched.biayamultimuat && formik.errors.biayamultimuat}
                                validateStatus={
                                    formik.touched.biayamultimuat && formik.errors.biayamultimuat
                                        ? 'error'
                                        : 'success'
                                }
                                style={{ marginBottom: 2 }}
                            >
                                <Input
                                    id="biayamultimuat"
                                    name="biayamultimuat"
                                    type="text"
                                    onChange={e => {
                                        // Hapus semua karakter non-angka, ubah ke number, lalu simpan ke formik
                                        formik.setFieldValue("biayamultimuat", Number(e.target.value.replace(/\D/g, '')))
                                    }}
                                    value={formik.values.biayamultimuat === undefined ? 0 : formik.values.biayamultimuat.toLocaleString('id-ID')}
                                    onBlur={formik.handleBlur}
                                />
                            </Form.Item>

                        </Col>
                        <Col sm={4}>
                            {/* <Form.Item
                                label="Biaya Multidrop"
                                help={formik.touched.alamatmuat && formik.errors.alamatmuat}
                                validateStatus={
                                    formik.touched.alamatmuat && formik.errors.alamatmuat
                                        ? 'error'
                                        : 'success'
                                }
                                style={{ marginBottom: 2 }}
                            >
                                <Input
                                    id="noSP"
                                    name="biayamultidrop"
                                    type="number"
                                    onChange={formik.handleChange}
                                    value={formik.values.biayamultidrop === undefined ? 0 : formik.values.biayamultidrop}
                                    onBlur={formik.handleBlur}
                                />
                            </Form.Item> */}
                            <Form.Item
                                label="Biaya Multidrop"
                                help={formik.touched.biayamultidrop && formik.errors.biayamultidrop}
                                validateStatus={
                                    formik.touched.biayamultidrop && formik.errors.biayamultidrop
                                        ? 'error'
                                        : 'success'
                                }
                                style={{ marginBottom: 2 }}
                            >
                                <Input
                                    id="biayamultidrop"
                                    name="biayamultidrop"
                                    type="text"
                                    onChange={e => {
                                        // Hapus semua karakter non-angka, ubah ke number, lalu simpan ke formik
                                        formik.setFieldValue("biayamultidrop", Number(e.target.value.replace(/\D/g, '')))
                                    }}
                                    value={formik.values.biayamultidrop === undefined ? 0 : formik.values.biayamultidrop.toLocaleString('id-ID')}
                                    onBlur={formik.handleBlur}
                                />
                            </Form.Item>

                        </Col>
                        <Col sm={4}>
                            {/* <Form.Item
                                label="Biaya Mel"
                                help={formik.touched.alamatmuat && formik.errors.alamatmuat}
                                validateStatus={
                                    formik.touched.alamatmuat && formik.errors.alamatmuat
                                        ? 'error'
                                        : 'success'
                                }
                                style={{ marginBottom: 2 }}
                            >
                                <Input
                                    id="noSP"
                                    name="biayamel"
                                    type="number"
                                    onChange={formik.handleChange}
                                    value={formik.values.biayamel === undefined ? 0 : formik.values.biayamel}
                                    onBlur={formik.handleBlur}
                                />
                            </Form.Item> */}
                            <Form.Item
                                label="Biaya Mel"
                                help={formik.touched.biayamel && formik.errors.biayamel}
                                validateStatus={
                                    formik.touched.biayamel && formik.errors.biayamel
                                        ? 'error'
                                        : 'success'
                                }
                                style={{ marginBottom: 2 }}
                            >
                                <Input
                                    id="biayamel"
                                    name="biayamel"
                                    type="text"
                                    onChange={e => {
                                        // Hapus semua karakter non-angka, ubah ke number, lalu simpan ke formik
                                        formik.setFieldValue("biayamel", Number(e.target.value.replace(/\D/g, '')))
                                    }}
                                    value={formik.values.biayamel === undefined ? 0 : formik.values.biayamel.toLocaleString('id-ID')}
                                    onBlur={formik.handleBlur}
                                />
                            </Form.Item>

                        </Col>
                        <Col>
                            <Form.Item
                                label={`TOTAL ${DetailSemua?.service?.toUpperCase()}`}
                                help={formik.touched.alamatmuat && formik.errors.alamatmuat}
                                validateStatus={
                                    formik.touched.alamatmuat && formik.errors.alamatmuat
                                        ? 'error'
                                        : 'success'
                                }
                                style={{ marginBottom: 2 }}
                            >
                                <Input
                                    disabled
                                    id="total"
                                    name="total"
                                    type="number"
                                    onChange={e => {
                                        formik.handleChange(e);
                                        setPenjumlahanTotal(e.target.value);
                                    }}
                                    placeholder={formatToIDR(formik.values.totalCreate) || 0}
                                    // value={formatToIDR(formik.values.totalCreate)}
                                    onBlur={formik.handleBlur}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>

            <Table responsive bordered >
                <thead></thead>
                <tbody>
                    {DetailSemua &&
                        DetailSemua.detail &&
                        DetailSemua.detail.map((data, index) => (
                            <>
                                <tr style={{ fontWeight: "bold" }}>
                                    <td colSpan={10}>
                                        {/* <hr />
                                        <br />{" "} */}
                                        <br />
                                    </td>
                                </tr>
                                <tr
                                    style={{
                                        fontWeight: "bold",
                                        backgroundColor: "#dff0d8",
                                    }}
                                >
                                    <td>No. {index + 1} </td>
                                    <td colSpan={12}>Alamat Muat</td>
                                </tr>

                                <tr key={index}>
                                    <td>
                                        {/* {index + 1}
                            <span>
                              <Button
                                size="md"
                                variant="danger"
                                onClick={() => deltebutton(data.idmpd)}
                                className="mt-2"
                              >
                                X
                              </Button>
                            </span> */}
                                    </td>
                                    <td colSpan={9}>{data.pickup}</td>
                                </tr>
                                {DetailSemua &&
                                    DetailSemua.detail[index].tujuan &&
                                    DetailSemua.detail[index].tujuan.map((data, index2) => (
                                        <>
                                            <tr
                                                style={{
                                                    fontWeight: "bold",
                                                    backgroundColor: "#b7d1f8",
                                                }}
                                            >
                                                <td>No. {index + 1}</td>
                                                <td>Alamat Bongkar</td>
                                                <td width="100px">NO SJ</td>
                                                <td>Kendaraan</td>
                                                <td>Service</td>
                                                <td>Via</td>
                                                <td>Item</td>
                                                <td>Shipment</td>
                                                <td>Berat</td>
                                                <td>Qty</td>
                                                <td width="150px">Tarif</td>
                                                <td width="150px">Biaya Muat</td>
                                                <td width="150px">Biaya Bongkar</td>
                                                <td width="150px">Total</td>
                                            </tr>

                                            <tr key={index}>
                                                <td>

                                                    <span >
                                                        <Button
                                                            size="md"
                                                            type="danger"
                                                            onClick={() => deltebutton(data.idmpd)}
                                                            className="mt-2"
                                                        >
                                                            X
                                                        </Button>
                                                        {/* <Button
                                                            size="md"
                                                            type="primary"
                                                            onClick={() => {
                                                                //   setIdmpdPerstate(data.idmpd);
                                                                //   handleShowSP(data.idmpd, data.noSJ);
                                                                setDetailSemuaTemp(data)
                                                                setModal1Open(true, data)
                                                                getTarifRute()
                                                            }}
                                                            className="mt-2"
                                                        >
                                                            Edit
                                                        </Button> */}
                                                        <Button
                                                            size="md"
                                                            type="primary"
                                                            onClick={() => {
                                                                console.log(`ini log`, data);
                                                                setDetailSemuaTemp(data)
                                                                apidetailidmpd(data.idmpd)
                                                                handleOpenModal(data)
                                                            }}
                                                            className="mt-2"
                                                        >
                                                            Edit
                                                        </Button>
                                                        {/* <ModalEditSPDetail
                                                            datasemua={dataas}
                                                            data={dataas}
                                                            isOpen={modal1Open1}
                                                            handleOpenModal={() => handleOpenModal(data)}
                                                            idkotamuat={formik.values?.id_kota_muat}
                                                            NamaKotaGlobal={NamaKotaGlobal}
                                                            onClose={handleCloseModal}
                                                        /> */}
                                                    </span>
                                                </td>
                                                <td>{data.destination}</td>
                                                <td>{data.noSJ}</td>
                                                <td>{data.kendaraan}</td>
                                                <td>{DetailSemua?.service}</td>
                                                <td>{data?.via}</td>
                                                <td>{data.item}</td>
                                                <td>{data.shipmentName}</td>
                                                <td>{data.berat}</td>
                                                <td>{data.qty}</td>
                                                <td>{data.Price?.toLocaleString("id-ID", {
                                                    style: "currency",
                                                    currency: "IDR",
                                                })}</td>
                                                <td>{data.harga_muat?.toLocaleString("id-ID", {
                                                    style: "currency",
                                                    currency: "IDR",
                                                })}</td>
                                                {/* <td>{data.Price?.toLocaleString("id-ID", {
                                style: "currency",
                                currency: "IDR",
                            })}</td> */}
                                                <td>{data.harga_bongkar?.toLocaleString("id-ID", {
                                                    style: "currency",
                                                    currency: "IDR",
                                                })}</td>
                                                {serviceStatus === "Charter" ?
                                                    <>
                                                        <td>{data.totalBiayaCharter?.toLocaleString("id-ID", {
                                                            style: "currency",
                                                            currency: "IDR",
                                                        })}</td>
                                                    </> : <>
                                                        <td>{data.totalBiayaRetail?.toLocaleString("id-ID", {
                                                            style: "currency",
                                                            currency: "IDR",
                                                        })}</td>
                                                    </>}


                                            </tr>
                                            <br />
                                        </>
                                    ))}
                            </>
                        ))}
                </tbody>
                <tfoot>
                    <tr style={{ fontWeight: "bold" }}>
                        <td colSpan={13} width="150px" className="text-right">
                            Sub Total
                        </td>
                        <td width="150px">{DetailSemua?.subTotal?.toLocaleString("id-ID", {
                            style: "currency",
                            currency: "IDR",
                        })}</td>
                    </tr>
                </tfoot>
            </Table>




            <Modal
                title={`Edit Detail SP`}
                style={{ top: 20 }}
                open={modal1Open1}
                onOk={EditSJ}
                onCancel={handleCloseModal}
                width="800px"
            >

                <Form
                    onFinish={formik.handleSubmit}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    name="Edit Detail SP"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                >
                    <Row>
                        <Col sm={6}>
                            <Form.Item
                                label="nama kota muat"
                                help={formik.touched.alamatmuat && formik.errors.alamatmuat}

                                style={{ marginBottom: 2 }}
                            >
                                <Select
                                    showSearch
                                    optionFilterProp="children"
                                    id="IDNamaKotaMuat"
                                    disabled
                                    NamaKotaMuat type="text"
                                    value={data?.id_kota_muat}
                                    onChange={(value, option) => {
                                        formik.setFieldValue("IDNamaKotaMuat", option.key);
                                        // setIDMuatKota(option.key) // set alamatmuat state to option's children
                                        console.log(`IDNamaKotaMuat`, option.key);
                                    }}
                                    onBlur={formik.handleBlur}
                                >
                                    {NamaKotaGlobal && NamaKotaGlobal?.muatKota?.map((item) => (
                                        <Select.Option key={item.idKota} value={item.idKota}>
                                            {item.namaKota}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col sm={6}>
                            <Form.Item
                                label="nama kota bongkar"
                                help={formik.touched.alamatmuat && formik.errors.alamatmuat}

                                style={{ marginBottom: 2 }}
                            >
                                <Select
                                    showSearch
                                    optionFilterProp="children"
                                    id="IDNamaKotaBongkar"
                                    name="IDNamaKotaBongkar"
                                    disabled
                                    type="text"
                                    onChange={(value, option) => {
                                        formik.setFieldValue("IDNamaKotaBongkar", option.key);
                                        // setIDKotaBongkar(option.key)// set alamatmuat state to option's children
                                        console.log(`IDNamaKotaBongkar`, option.key);
                                    }}
                                    value={data.id_kota_bongkar}
                                    onBlur={formik.handleBlur}
                                >
                                    {NamaKotaGlobal && NamaKotaGlobal?.tujuanKota?.map((item) => (
                                        <Select.Option key={item.idKota} value={item.idKota}>
                                            {item.namaKota}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col sm={12}>
                            <Form.Item
                                required
                                label={`Pilih Rute ${DetailSemua?.service?.toUpperCase()}`}
                                help={formik.touched.alamatbongkar && formik.errors.alamatbongkar}

                                style={{ marginBottom: 2 }}
                            >
                                <Select
                                    required
                                    showSearch
                                    optionFilterProp="key"
                                    id="pilihrute"
                                    disabled
                                    name="pilihrute"
                                    type="text"
                                    onChange={(value, option) => {
                                        formik.setFieldValue("alamatrute", option);
                                        formik.setFieldValue("kendaraan", option.children[1].props.children);
                                        formik.setFieldValue("via", option.children[3].props.children);
                                        formik.setFieldValue("shipment", option.children[5].props.children);
                                        // setasilTarif(option.children[7].props.children)
                                        // setid_price_customer(value)
                                        console.log(`id_price`, value);
                                    }}
                                    value={`Kendaraan : ${data?.kendaraan} || Via : ${data?.via} || Shipment : ${data?.via} || Tarif : ${data?.biaya_jalan}`}

                                    onBlur={formik.handleBlur}
                                >
                                    {NamaKotaGlobal && NamaKotaGlobal?.muatKota?.map((item) => (
                                        <Select.Option key={item.idKota} value={item.idKota}>
                                            {item.namaKota}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col sm={8}>
                            <Form.Item
                                required
                                label="Alamat Muat"
                                help={formik.touched.alamatmuat && formik.errors.alamatmuat}

                                style={{ marginBottom: 2 }}
                            >
                                <Select
                                    required
                                    showSearch
                                    optionFilterProp="children"
                                    id="alamatmuat"
                                    disabled
                                    name="alamatmuat"
                                    type="text"
                                    onChange={(value, option) => {
                                        formik.setFieldValue("alamatmuat", option.children); // set alamatmuat state to option's children
                                        formik.setFieldValue("IDalamatmuat", option.key); // set IDalamatmuat state to option's value
                                        formik.setFieldValue("IdKotaMuat", value); // set IDalamatmuat state to option's value
                                        console.log(`key`, option.key);
                                    }}
                                    value={data?.pickup}
                                    onBlur={formik.handleBlur}
                                >
                                    {/* {AlamatInvoiceOptions && AlamatInvoiceOptions.map((item) => (
                                        <Select.Option key={item.addressId} value={item.id_kota}>
                                            {item.address}
                                        </Select.Option>
                                    ))} */}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col sm={8}>
                            <Form.Item
                                required
                                label="Alamat Bongkar"
                                help={formik.touched.alamatbongkar && formik.errors.alamatbongkar}

                                style={{ marginBottom: 2 }}
                            >
                                <Select
                                    required
                                    showSearch
                                    optionFilterProp="children"
                                    id="alamatbongkar"
                                    name="alamatbongkar"
                                    disabled
                                    type="text"
                                    onChange={(value, option) => {
                                        formik.setFieldValue("alamatbongkar", option.children); // set alamatbongkar state to option's children
                                        formik.setFieldValue("IDKotaBongkar", value); // set IDalamatbongkar state to option's value
                                        formik.setFieldValue("IDalamatbongkar", option.key); // set IDalamatbongkar state to option's value
                                    }}
                                    value={data?.destination}
                                    onBlur={formik.handleBlur}
                                >
                                    {/* {AlamatInvoiceOptions && AlamatInvoiceOptions.map((item) => (
                                        <Select.Option key={item.addressId} value={item.id_kota}>
                                            {item.address}
                                        </Select.Option>
                                    ))} */}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <br />
                    <hr />
                    <Row>
                        <Col sm={3}>
                            <Form.Item
                                required
                                label="Kendaraan"
                                help={formik.touched.kendaraan && formik.errors.kendaraan}

                                style={{ marginBottom: 2 }}
                            >
                                <Select
                                    required
                                    id="noSP"
                                    name="kendaraan"
                                    disabled
                                    type="kendaraan"
                                    labelInValue
                                    onChange={(e) => {
                                        formik.setFieldValue("kendaraan", e.value)
                                        formik.setFieldValue("idkendaraan", e.key)
                                        console.log(`ini id kendaraan`, e.key);
                                    }}
                                    value={data?.kendaraan}
                                    onBlur={formik.handleBlur}
                                >
                                    {/* {SelectTypeMobil && SelectTypeMobil.map((item) => (
                                        <Select.Option key={item.id} value={item.type}>
                                            {item.address}
                                        </Select.Option>

                                    ))} */}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col sm={3}>
                            <Form.Item
                                required
                                label="Via"
                                help={formik.touched.via && formik.errors.via}
                                // validateStatus={
                                //     formik.touched.via && formik.errors.via
                                //         ? 'error'
                                //         : 'success'
                                // }
                                style={{ marginBottom: 2 }}
                            >
                                <Select
                                    required
                                    id="via"
                                    disabled
                                    name="via"
                                    type="via"
                                    onChange={(e) => formik.setFieldValue("via", e)}
                                    value={data?.via}
                                    onBlur={formik.handleBlur}
                                >
                                    {/* {selectVia && selectVia.map((item) => (
                                        <Select.Option value={item.via}>{item.via}</Select.Option>
                                    ))} */}

                                </Select>
                            </Form.Item>
                        </Col>
                        <Col sm={3}>
                            <Form.Item
                                required
                                label="Shipment"
                                help={formik.touched.via && formik.errors.via}
                                // validateStatus={
                                //     formik.touched.via && formik.errors.via
                                //         ? 'error'
                                //         : 'success'
                                // }
                                style={{ marginBottom: 2 }}
                            >
                                <Select
                                    required
                                    id="via"
                                    disabled
                                    name="via"
                                    type="via"
                                    onChange={(e) => formik.setFieldValue("via", e)}
                                    value={data?.shipmentName}
                                    onBlur={formik.handleBlur}
                                >
                                    {/* {selectVia && selectVia.map((item) => (
                                        <Select.Option value={item.via}>{item.via}</Select.Option>
                                    ))} */}

                                </Select>
                            </Form.Item>
                        </Col>
                        <Col sm={3}>
                            <Form.Item
                                required
                                label="Service"
                                help={formik.touched.alamatmuat && formik.errors.alamatmuat}
                                // validateStatus={
                                //     formik.touched.alamatmuat && formik.errors.alamatmuat
                                //         ? 'error'
                                //         : 'success'
                                // }
                                style={{ marginBottom: 2 }}
                            >
                                <Select
                                    required
                                    id="shipment"
                                    name="shipment"
                                    type="text"
                                    disabled
                                    onChange={(e) => {
                                        formik.setFieldValue("shipment", e)
                                        formik.setFieldValue("shipmentID", e)
                                        console.log(e);
                                    }}
                                    value={data?.service}
                                    onBlur={formik.handleBlur}
                                >
                                    {/* {shipmentOptions && shipmentOptions.map((item) => (
                                        <Select.Option value={item.id}>{item.shipment + " - " + formik.values.via}</Select.Option>
                                    ))} */}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={3}>
                            <Form.Item
                                label={"Berat (KG)"}
                                help={formik.touched.berat && formik.errors.berat}
                                // validateStatus={
                                //     formik.touched.berat && formik.errors.berat
                                //         ? 'error'
                                //         : 'success'
                                // }
                                style={{ marginBottom: 2 }}
                                required
                            >
                                <Input
                                    required
                                    id="berat"
                                    name="berat"
                                    type="number"
                                    onChange={(e) => {
                                        formik.setFieldValue('berat', e.target.value)
                                        console.log(e.target.value);
                                    }}
                                    value={formik.values.berat}
                                    onBlur={formik.handleBlur}
                                />
                            </Form.Item>
                        </Col>
                        <Col sm={3}>
                            <Form.Item
                                label="Qty"
                                help={formik.touched.alamatmuat && formik.errors.alamatmuat}
                                // validateStatus={
                                //     formik.touched.alamatmuat && formik.errors.alamatmuat
                                //         ? 'error'
                                //         : 'success'
                                // }
                                style={{ marginBottom: 2 }}
                            >
                                <Input
                                    id="qty"
                                    name="qty"
                                    type="number"
                                    onChange={(e) => {
                                        formik.setFieldValue('qty', e.target.value)
                                    }}
                                    value={formik.values.qty}
                                    onBlur={formik.handleBlur}
                                />
                            </Form.Item>
                        </Col>
                        <Col sm={3}>
                            <Form.Item
                                label="Koli"
                                help={formik.touched.alamatmuat && formik.errors.alamatmuat}
                                // validateStatus={
                                //     formik.touched.alamatmuat && formik.errors.alamatmuat
                                //         ? 'error'
                                //         : 'success'
                                // }
                                style={{ marginBottom: 2 }}
                            >
                                <Input
                                    id="koli"
                                    name="koli"
                                    type="number"
                                    onChange={formik.handleChange}
                                    value={formik.values.koli}
                                    onBlur={formik.handleBlur}
                                />
                            </Form.Item>
                        </Col>
                        <Col sm={3}>
                            <Form.Item
                                label="Nama Barang"
                                help={formik.touched.alamatmuat && formik.errors.alamatmuat}
                                // validateStatus={
                                //     formik.touched.alamatmuat && formik.errors.alamatmuat
                                //         ? 'error'
                                //         : 'success'
                                // }
                                style={{ marginBottom: 2 }}
                            >
                                <Input
                                    id="item"
                                    name="item"
                                    type="text"
                                    onChange={(e) => {
                                        formik.setFieldValue('item', e.target.value)
                                        console.log(e.target.value);
                                    }}
                                    value={formik.values.item}
                                    onBlur={formik.handleBlur}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={4}>
                            <Form.Item
                                label="Panjang"
                                help={formik.touched.alamatmuat && formik.errors.alamatmuat}
                                // validateStatus={
                                //     formik.touched.alamatmuat && formik.errors.alamatmuat
                                //         ? 'error'
                                //         : 'success'
                                // }
                                style={{ marginBottom: 2 }}
                            >
                                <Input
                                    id="panjang"
                                    name="panjang"
                                    type="number"
                                    onChange={formik.handleChange}
                                    value={formik.values.panjang}
                                    onBlur={formik.handleBlur}
                                />
                            </Form.Item>
                        </Col>
                        <Col sm={4}>
                            <Form.Item
                                label="Lebar"
                                help={formik.touched.alamatmuat && formik.errors.alamatmuat}
                                // validateStatus={
                                //     formik.touched.alamatmuat && formik.errors.alamatmuat
                                //         ? 'error'
                                //         : 'success'
                                // }
                                style={{ marginBottom: 2 }}
                            >
                                <Input
                                    id="lebar"
                                    name="lebar"
                                    type="number"
                                    onChange={formik.handleChange}
                                    value={formik.values.lebar}
                                    onBlur={formik.handleBlur}
                                />
                            </Form.Item>
                        </Col>
                        <Col sm={4}>
                            <Form.Item
                                label="Tinggi"
                                help={formik.touched.alamatmuat && formik.errors.alamatmuat}
                                // validateStatus={
                                //     formik.touched.alamatmuat && formik.errors.alamatmuat
                                //         ? 'error'
                                //         : 'success'
                                // }
                                style={{ marginBottom: 2 }}
                            >
                                <Input
                                    id="tinggi"
                                    name="tinggi"
                                    type="number"
                                    onChange={formik.handleChange}
                                    value={formik.values.tinggi}
                                    onBlur={formik.handleBlur}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <hr />
                    <Row>
                        <Col sm={4}>
                            <Form.Item

                                label="Tarif"
                                help={formik.touched.alamatmuat && formik.errors.alamatmuat}
                                // validateStatus={
                                //     formik.touched.alamatmuat && formik.errors.alamatmuat
                                //         ? 'error'
                                //         : 'success'
                                // }
                                style={{ marginBottom: 2 }}
                            >
                                <Input

                                    id="tarif"
                                    name="tarif"
                                    type="number"
                                    onChange={(e) => setasilTarif(e.target.value)}
                                    value={HasilTarif}
                                    onBlur={formik.handleBlur}
                                />
                            </Form.Item>
                        </Col>
                        <Col sm={4}>
                            <Form.Item
                                label="Biaya Bongkar"
                                help={formik.touched.bongkar && formik.errors.bongkar}
                                validateStatus={
                                    formik.touched.bongkar && formik.errors.bongkar
                                        ? 'error'
                                        : 'success'
                                }
                                style={{ marginBottom: 2 }}
                            >
                                <Input
                                    id="bongkar"
                                    name="bongkar"
                                    type="text"
                                    onChange={e => {
                                        formik.setFieldValue("bongkar", Number(e.target.value.replace(/\D/g, '')))
                                    }}

                                    value={formatToIDR(formik.values.bongkar)}
                                    onBlur={formik.handleBlur}
                                />
                            </Form.Item>

                        </Col>
                        <Col sm={4}>
                            <Form.Item
                                label="Biaya Muat"
                                help={formik.touched.biayamuat && formik.errors.biayamuat}
                                validateStatus={
                                    formik.touched.biayamuat && formik.errors.biayamuat
                                        ? 'error'
                                        : 'success'
                                }
                                style={{ marginBottom: 2 }}
                            >
                                <Input
                                    id="biayamuat"
                                    name="biayamuat"
                                    type="text"
                                    onChange={e => {
                                        formik.setFieldValue("biayamuat", Number(e.target.value.replace(/\D/g, '')))
                                    }}
                                    value={formatToIDR(formik.values.biayamuat)}
                                    onBlur={formik.handleBlur}
                                />
                            </Form.Item>

                        </Col>
                    </Row>
                    <Row>
                        <Col sm={4}>
                            <Form.Item
                                label="Biaya Multimuat"
                                help={formik.touched.biayamultimuat && formik.errors.biayamultimuat}
                                validateStatus={
                                    formik.touched.biayamultimuat && formik.errors.biayamultimuat
                                        ? 'error'
                                        : 'success'
                                }
                                style={{ marginBottom: 2 }}
                            >
                                <Input
                                    id="biayamultimuat"
                                    name="biayamultimuat"
                                    type="text"
                                    onChange={e => {
                                        formik.setFieldValue("biayamultimuat", Number(e.target.value.replace(/\D/g, '')))
                                    }}
                                    value={(formik.values.biayamultimuat) === undefined ? 0 : (formik.values.biayamultimuat)}
                                    onBlur={formik.handleBlur}
                                />
                            </Form.Item>

                        </Col>
                        <Col sm={4}>
                            <Form.Item
                                label="Biaya Multidrop"
                                help={formik.touched.biayamultidrop && formik.errors.biayamultidrop}
                                validateStatus={
                                    formik.touched.biayamultidrop && formik.errors.biayamultidrop
                                        ? 'error'
                                        : 'success'
                                }
                                style={{ marginBottom: 2 }}
                            >
                                <Input
                                    id="biayamultidrop"
                                    name="biayamultidrop"
                                    type="text"
                                    onChange={e => {
                                        // Hapus semua karakter non-angka, ubah ke number, lalu simpan ke formik
                                        formik.setFieldValue("biayamultidrop", Number(e.target.value.replace(/\D/g, '')))
                                    }}
                                    value={(formik.values.biayamultidrop) === undefined ? 0 : (formik.values.biayamultidrop)}
                                    onBlur={formik.handleBlur}
                                />
                            </Form.Item>

                        </Col>
                        <Col sm={4}>
                            <Form.Item
                                label="Biaya Mel"
                                help={formik.touched.biayamel && formik.errors.biayamel}

                                style={{ marginBottom: 2 }}
                            >
                                <Input
                                    id="biayamel"
                                    name="biayamel"
                                    type="text"
                                    onChange={e => {
                                        // Hapus semua karakter non-angka, ubah ke number, lalu simpan ke formik
                                        formik.setFieldValue("biayamel", Number(e.target.value.replace(/\D/g, '')))
                                    }}
                                    value={(formik.values.biayamel) === null ? 0 : (formik.values.biayamel)}
                                    onBlur={formik.handleBlur}
                                />
                            </Form.Item>

                        </Col>
                        <Col>
                            <Form.Item
                                label={`TOTAL ${DetailSemua?.service?.toUpperCase()}`}
                                help={formik.touched.total && formik.errors.total}
                                validateStatus={
                                    formik.touched.total && formik.errors.total
                                        ? 'error'
                                        : 'success'
                                }
                                style={{ marginBottom: 2 }}
                            >
                                <Input
                                    id="total"
                                    name="total"
                                    disabled
                                    type="text"  // Change type from "number" to "text" since formatted values will contain non-numeric characters.
                                    onChange={e => {
                                        const value = e.target.value.replace(/[^0-9]/g, ""); // Remove all non-numeric characters
                                        formik.handleChange(e);
                                        formik.setFieldValue("total", Number(value));
                                    }}
                                    value={formatToIDR(formik.values.total)}
                                    onBlur={formik.handleBlur}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>

        </div>
    )
}

export default ModalCreateDetail