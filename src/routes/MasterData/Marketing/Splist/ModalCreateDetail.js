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
function ModalCreateDetail({ AlamatInvoiceOptions, DetailSemua, idmp, DetailSP, JenisBarangFormik, detailData, refreshtable }) {
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
    const [detailalamatbenran, setdetailalamatbenran] = useState("")

    const [modal1Open1, setModal1Open1] = useState(false);
    const [imdpperklik, setimdpperklik] = useState("")
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
    const [focused, setFocused] = useState(false); /// format idr

    const [id_price_customer, setid_price_customer] = useState("")
    const [GetTarifOptions, setGetTarifOptions] = useState([])
    const formik = useFormik({
        initialValues: {
            alamatmuat: '',
            alamatbongkar: "",
            kendaraan: "",
            via: "",
            alamatrute: '',
            berat: ""

        },
        validationSchema: Yup.object({
            alamatmuat: Yup.string().required('Alamat Muat Harus Di Isi'),
            alamatbongkar: Yup.string().required('Alamat Bongkar Harus Di Isi'),
            berat: Yup.string().required('Berat Harus Diisi'),
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

    const ColBiaya = () => {
        if (DetailSemua?.service === "Retail") {
            return 3
        } else {
            return 3
        }
    }

    // console.log(`AlamatInvoiceOptions`, AlamatInvoiceOptions);

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
                    berat: formik.values.berat,
                    qty: formik.values.qty,
                    koli: formik.values.koli,
                    id_price_customer: id_price_customer,
                    // harga: formik.values.totalCreate,
                    harga: formik.values.biayajalan,
                    total: formik.values.totalCreate,
                    harga_bongkar: formik.values.bongkar,
                    harga_muat: formik.values.biayamuat,
                    id_kota_muat: IDMuatKota,
                    id_kota_bongkar: IDKotaBongkar,
                    biaya_overtonase: formik.values.overtonase,
                    biaya_multimuat: formik.values.biayamultimuat,
                    biaya_multidrop: formik.values.biayamultidrop,
                    biaya_mel: formik.values.biayamel,
                    biaya_tambahan: formik.values.tambahan,
                    biaya_lain: formik.values.lain,
                    max_tonase: formik.values.biayamaxtonase === undefined ? 0 : formik.values.biayamaxtonase,
                    harga_selanjutnya: formik.values.biayaselanjutnya === undefined ? 0 : formik.values.biayaselanjutnya,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: localStorage.getItem("token"),
                    },
                }
            )
            refreshtable()

            DetailSP()
            // refreshtable()
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
            setdetailalamatbenran(response.data.data?.destination);
            console.log(response.data.data?.destination);
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
            IDalamatmuat: DetailSemuaTemp?.pickupId,
            IDalamatbongkar: DetailSemuaTemp?.destinationId,
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
            // bongkar: DetailSemuaTemp?.biaya_bongkar,
            overtonase: DetailSemuaTemp?.biaya_overtonase,
            bongkar: DetailSemuaTemp?.harga_bongkar,
            biayamultimuat: DetailSemuaTemp?.biaya_multimuat,
            biayamuat: DetailSemuaTemp?.harga_muat,
            biayamultidrop: DetailSemuaTemp?.biaya_multi_drop,
            biayamel: DetailSemuaTemp?.biayaMel,
            biayaselanjutnya: DetailSemuaTemp?.harga_selanjutnya,
            lain: DetailSemuaTemp?.biayaLain,
            // biayajalan: DetailSemuaTemp?.biaya_jalan,
            biayajalan: DetailSemuaTemp?.Price,
            tambahan: DetailSemuaTemp?.biaya_tambahan,
            id_kota_muat: DetailSemuaTemp?.id_kota_muat,
            id_kota_bongkar: DetailSemuaTemp?.id_kota_bongkar,
            shipmentID: DetailSemuaTemp?.shipmentID,
            biaya_jalan: DetailSemuaTemp?.biaya_jalan,
            // total: DetailSemuaTemp?.Price,
            total: DetailSemuaTemp?.totalBiayaRetail,

        })
    ), [DetailSemuaTemp])

    useEffect(() => {

        if (formik.values.via) {
            const filteredShipments = SelectShipment.filter(
                (item) => item?.via === formik.values.via
            );
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
    const EditSJ = async (asw) => {
        try {
            const data = await axios.post(`${Baseurl}sp/edit-SP-detail`,
                {
                    id_mpd: imdpperklik,
                    via: formik.values.via,
                    shipment: formik.values.shipmentID,
                    kendaraan: formik.values.kendaraan,
                    id_almuat: formik.values.IDalamatmuat,
                    id_albongkar: formik.values.IDalamatbongkar,
                    nama_barang: formik.values.namabarang,
                    // volume: formik.values.shipment ,
                    volume: formik.values.berat,
                    berat: formik.values.berat,
                    qty: formik.values.qty,
                    koli: formik.values.koli,
                    harga_muat: formik.values.biayamuat,
                    harga_bongkar: formik.values.bongkar,
                    // harga: HasilTarif,
                    max_tonase: formik.values.biayamaxtonase,
                    biaya_mel: formik.values.biayamel,
                    harga_selanjutnya: formik.values.biayaselanjutnya,
                    biaya_lain: formik.values.lain,
                    biaya_tambahan: formik.values.tambahan,
                    biaya_multidrop: formik.values.biayamultidrop,
                    biaya_multimuat: formik.values.biayamultimuat,
                    biaya_overtonase: formik.values.overtonase,
                    harga: formik.values.biayajalan,
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
            formik.setFieldValue("alamatmuat", ""); // set alamatmuat state to option's children
            formik.setFieldValue("IDalamatmuat", ""); // set IDalamatmuat state to option's value
            formik.setFieldValue("IdKotaMuat", "");
            formik.setFieldValue("alamatbongkar", ""); // set alamatbongkar state to option's children
            formik.setFieldValue("IDKotaBongkar", ""); // set IDalamatbongkar state to option's value
            formik.setFieldValue("IDalamatbongkar", "");  // se
            // getDetails()
            setModal1Open1(false)
            message.success('Data berhasil Diubah!');
        } catch (error) {
            message.error(error.response.data.status.message)

        } finally {
            refreshtable()
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
                refreshtable()
                DetailSP()
            } else if (result.isDenied) {
                Swal.fire("Changes are not saved", "", "info");
            }
        });
    };

    const service = GetTarifOptions.map((i) => (
        i?.service_type
    ))
    // console.log(`DetailSemua?.service`, DetailSemua?.service);

    const formatToIDR = (value) => {
        // Pastikan value adalah number sebelum di-format
        const numberValue = Number(value);
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(numberValue);
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
    function tarifberat() {
        return formik.values.berat || 0;
    }
    const getTarifRute = async () => {
        const berat = tarifberat();
        const data = await axios.get(`${Baseurl}tarif/get-tarifCustomer?limit=&page=&id_muat_kota=${IDMuatKota === "" ? formik.values?.id_kota_muat : IDMuatKota}&id_tujuan_kota=${IDKotaBongkar === "" ? formik.values?.id_kota_bongkar : IDKotaBongkar}&id_kendaraan_jenis=${formik.values.idkendaraan === undefined ? "" : formik.values.idkendaraan}&id_price=&berat=${berat}&id_customer=${DetailSemua.idcustomer}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: localStorage.getItem("token"),
                },
            });
        setGetTarifOptions(data.data.data.order);
    }
    useEffect(() => {
        // Pastikan berat tidak undefined atau null sebelum memanggil getTarifRute
        if (formik.values.berat != null) {
            getTarifRute();
        }
    }, [formik.values.berat]);
    useEffect(() => {
        // Pastikan berat tidak undefined atau null sebelum memanggil getTarifRute
        if (formik.values.kendaraan != null) {
            getTarifRute();
        }
    }, [formik.values.kendaraan]);

    let nomorr = 1
    const calculateTotal = (shipmentType, kilogram, tarif) => {
        const biayaBongkar = Number(formik.values.bongkar) || 0;
        const biayaMuat = Number(formik.values.biayamuat) || 0;
        const biayamultimuat = Number(formik.values.biayamultimuat) || 0;
        const biayamultidrop = Number(formik.values.biayamultidrop) || 0;
        const biayamel = Number(formik.values.biayamel) || 0;
        // const berat = Number(formik.values.berat) || 1;
        const berat = Number(formik.values.berat);
        // const HasilTarifNumerik =Number(formik.values.biayajalan) ||  Number(HasilTarif) ;
        const HasilTarifNumerik = Number(formik.values.biayajalan);
        const overtonase = Number(formik.values.overtonase) || 0;
        const tambahan = Number(formik.values.tambahan) || 0;
        const biayajalan = Number(formik.values.biayajalan) || 0;
        const lain = Number(formik.values.lain) || 0;
        const biayamaxtonase = Number(formik.values.biayamaxtonase) || 0;
        const biayaselanjutnya = Number(formik.values.biayaselanjutnya) || 0;

        const totalBiayaTambahan = biayaBongkar + biayaMuat + biayamultimuat + biayamultidrop + biayamel + overtonase + tambahan + lain + biayamaxtonase + biayaselanjutnya;

        if (DetailSemua?.service?.toLowerCase() === 'retail' || DetailSemua?.service?.toLowerCase() === 'retailer' && formik.values.via != "laut") {
            return (HasilTarifNumerik * berat) + totalBiayaTambahan;
        } else if (formik.values.kapalcepat === "Kapal Cepat" && formik.values.via === "laut" && DetailSemua?.service?.toLowerCase() === 'retail' || DetailSemua?.service?.toLowerCase() === 'retailer') {
            return HasilTarifNumerik * berat;
        } else if (DetailSemua?.service?.toLowerCase() === 'charter') {
            return HasilTarifNumerik + totalBiayaTambahan;
        } else if (formik.values.via === "laut" && DetailSemua?.service?.toLowerCase() === 'retail' || DetailSemua?.service?.toLowerCase() === 'retailer') {
            return HasilTarifNumerik + totalBiayaTambahan;
        }
    };
    console.log(`formik.values.via `, formik.values.via);
    useEffect(() => {
        const total = calculateTotal(formik.values.shipment, formik.values.berat, formik.values.biayajalan);
        formik.setFieldValue("total", total);

        const totalCreate = calculateTotal(formik.values.shipment, formik.values.berat, formik.values.biayajalan);
        formik.setFieldValue("totalCreate", totalCreate);
    }, [HasilTarif, formik.values.lain, formik.values.biayaselanjutnya, formik.values.biayamaxtonase, formik.values.biayajalan, formik.values.tambahan, formik.values.overtonase, formik.values.totalCreate, formik.values.shipment, formik.values.kapalcepat, formik.values.berat, formik.values.bongkar, formik.values.biayamuat, formik.values.biayamultimuat, formik.values.biayamultidrop, formik.values.biayamel,formik?.values?.via  ]);


    console.log(`DetailSemua?.service?`, DetailSemua?.service);

    const labelpilihan = () => {
        if (formik.values.pilihanberat === 1) {
            return "Kilo (KG)"
        } else if (formik.values.pilihanberat === 2) {
            return "Qyt"
        } else if (formik.values.pilihanberat === 3) {
            return "KOLI"
        }
    }


    return (
        <div className='mt-3'>
            <div className='d-flex justify-content-end'>
                <Button type='primary' onClick={() => {
                    formik.resetForm();
                    setModal1Open(true);
                    getTarifRute()
                }}>Create Detail SO</Button>
            </div>


            <Modal
                title="Create Detail SO"
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
                    name="Edit Detail SO"
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
                        <Row>
                            <Col >
                                <Form.Item
                                    // label={"Berat (KG)"}
                                    label={"Berat Kilo"}
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
                                            formik.setFieldValue('berat', Number(e.target.value));
                                            console.log(`berat`, e.target.value);
                                        }}


                                        value={formik.values.berat}

                                        onBlur={formik.handleBlur}
                                    />
                                </Form.Item>
                            </Col>
                            <Col >
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
                                        showSearch
                                        optionFilterProp="value"
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
                        </Row>
                        <Col sm={12}>
                            <Form.Item
                                required
                                label={"Pilih Rute " + DetailSemua?.service}
                                // help={formik.touched.pilihrute && formik.errors.pilihrute}
                                // validateStatus={
                                //     formik.touched.pilihrute && formik.errors.pilihrute
                                //         ? 'error'
                                //         : 'success'
                                // }
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
                                        formik.setFieldValue("bongkar", option.biaya_bongkar)
                                        formik.setFieldValue("biayamuat", option.biaya_muat)
                                        formik.setFieldValue("biayamultimuat", option.biaya_multimuat)
                                        formik.setFieldValue("biayamultidrop", option.biaya_multidrop)
                                        formik.setFieldValue("biayamel", option.biaya_mel)
                                        formik.setFieldValue("overtonase", option.biaya_overtonase)
                                        formik.setFieldValue("tambahan", option.biaya_tambahan)
                                        formik.setFieldValue("biayajalan", option.biaya_jalan)
                                        formik.setFieldValue("lain", option.biaya_lain)
                                        formik.setFieldValue("id_kendaraan_jenis", option.id_kendaraan_jenis)
                                        formik.setFieldValue("jenisKiriman", option.jenisKiriman)
                                        setid_price_customer(value)
                                        console.log(`ini options`, option);
                                        setTarifAsli(option?.biaya)
                                    }}
                                    value={"Kendaraan :" + " " + formik.values.kendaraan + " | | " + "Via :" + " " + formik.values.via + " | | " + "Shipment : " + formik.values.shipment + " || " + "Tarif : " + formik.values.biayajalan}
                                    onBlur={formik.handleBlur}
                                >
                                    {GetTarifOptions && GetTarifOptions
                                        // .filter(item => item.service_type.toLowerCase() === DetailSemua?.service.toLowerCase())
                                        .map((item) => (
                                            <Select.Option id_kendaraan_jenis={item?.id_kendaraan_jenis} biaya_overtonase={item?.biaya_overtonase} biaya_tambahan={item?.biaya_tambahan} biaya_lain={item?.biaya_lain} biaya_jalan={item?.biaya_jalan} biaya_mel={item?.biaya_mel} biaya_multidrop={item?.biaya_multidrop} key={item?.kotaTujuan} biaya_muat={item?.biaya_muat} biaya_multimuat={item?.biaya_multimuat} biaya_bongkar={item?.biaya_bongkar} value={item?.id_price}>
                                                Kendaraan:<Tag color='blue'>{item?.kendaraanJenis}</Tag>
                                                via:<Tag color='gold'>{item?.via}</Tag>
                                                Shipment:{item?.service_type.toLowerCase() === "retailer" || item?.service_type.toLowerCase() === "retail" ? <Tag color='red'>{item?.service_type}</Tag> : <Tag color='purple'>{item?.service_type}</Tag>}
                                                Tarif:<Tag color='green'>
                                                    {item?.biaya_jalan}
                                                </Tag>
                                                Jenis Kiriman : <Tag color='blue'>{item?.jenisKiriman}</Tag>
                                            </Select.Option>
                                        ))
                                    }
                                </Select>
                            </Form.Item>

                        </Col>
                        <Col sm={12}>
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
                                        console.log(`test`, option);
                                    }}
                                    value={formik.values.alamatmuat}
                                    onBlur={formik.handleBlur}
                                >
                                    {detailalamatbenran && detailalamatbenran.map((item) => (
                                        <Select.Option key={item?.id} value={item?.address}>
                                            {item?.address}
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
                        <Col sm={12}>
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
                                    {detailalamatbenran && detailalamatbenran.map((item) => (
                                        <Select.Option key={item.id} value={item.address}>
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
                        {/* <Col sm={3}>
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
                        </Col> */}
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
                                    onChange={(e) => {console.log(`ini dari form`,e);formik.setFieldValue("via", e)}}
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
                                    onChange={(e, data) => {
                                        formik.setFieldValue("shipmentBaru", e)
                                        formik.setFieldValue("shipmentIDBaru", e)
                                        formik.setFieldValue("kapalcepat", data.data.shipment)
                                        console.log(`kapalcepat`, data.data.shipment);
                                    }}
                                    value={formik.values.shipmentBaru}
                                    onBlur={formik.handleBlur}
                                >
                                    {shipmentOptions && shipmentOptions.map((item) => (
                                        <Select.Option data={item} value={item.id}>{item.shipment + " - " + formik.values.via}</Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        {/* <Col sm={3}>
                            <Form.Item
                                required
                                label="pilihanberat"
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
                                        formik.setFieldValue("pilihanberat", e)
                                        // formik.setFieldValue("shipmentIDBaru", e)
                                        console.log(e);
                                    }}
                                    value={formik.values.pilihanberat}
                                    onBlur={formik.handleBlur}
                                >
                                    <option value={1}>KG</option>
                                    <option value={2}>QTY</option>
                                    <option value={3}>KOLI</option>
                                </Select>
                            </Form.Item>
                        </Col> */}


                        <Col >
                            <Form.Item
                                required
                                label="Service"
                                help={formik.touched.alamatmuat && formik.errors.alamatmuat}
                                validateStatus={
                                    formik.touched.shipment && formik.errors.shipment
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
                        {/* <Col sm={3}>
                            <Form.Item
                                // label={"Berat (KG)"}
                                label={labelpilihan() || "Satuan yang di pilih"}
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
                                        formik.setFieldValue('berat', Number(e.target.value));
                                        console.log(`berat`, e.target.value);
                                    }}


                                    value={formik.values.berat}

                                    onBlur={formik.handleBlur}
                                />
                            </Form.Item>
                        </Col> */}
                        {/* <Col sm={3}>
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
                        </Col> */}
                        <Col >
                            <Form.Item
                                label="Qty"
                                help={formik.touched.alamatmuat && formik.errors.alamatmuat}
                                validateStatus={
                                    formik.touched.qyt && formik.errors.qyt
                                        ? 'error'
                                        : 'success'
                                }
                                style={{ marginBottom: 2 }}
                            >
                                <Input
                                    id="qty"
                                    name="qty"
                                    type="number"
                                    onChange={formik.handleChange}
                                    value={formik.values.qty}
                                    onBlur={formik.handleBlur}
                                />
                            </Form.Item>
                        </Col>
                        <Col >
                            <Form.Item
                                label="Koli"
                                help={formik.touched.alamatmuat && formik.errors.alamatmuat}
                                validateStatus={
                                    formik.touched.koli && formik.errors.koli
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
                        <Col >
                            <Form.Item
                                label="Nama Barang"
                                help={formik.touched.alamatmuat && formik.errors.alamatmuat}
                                validateStatus={
                                    formik.touched.namabarang && formik.errors.namabarang
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
                    {/* <Row>
                        <Col sm={4}>
                            <Form.Item
                                label="Panjang"
                                help={formik.touched.alamatmuat && formik.errors.alamatmuat}
                                validateStatus={
                                    formik.touched.panjang && formik.errors.panjang
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
                                    formik.touched.lebar && formik.errors.lebar
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
                                    formik.touched.tinggi && formik.errors.tinggi
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
                    </Row> */}
                    <hr />
                    <Row>
                        <Col sm={3}>
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
                                    disabled
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
                        <Col sm={3}>

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
                                    disabled={!HasilTarif}
                                    id="bongkar"
                                    name="bongkar"
                                    type="text"
                                    onChange={e => {
                                        // Hapus semua karakter non-angka, ubah ke number, lalu simpan ke formik
                                        formik.setFieldValue("bongkar", Number(e.target.value.replace(/\D/g, '')))
                                    }}

                                    value={formik.values.bongkar === undefined ? 0 : formik.values.bongkar.toLocaleString('id-ID')}
                                    onBlur={formik.handleBlur}
                                />
                            </Form.Item>

                        </Col>
                        <Col sm={3}>

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
                                    disabled={!HasilTarif}
                                    id="biayamuat"
                                    name="biayamuat"
                                    type="text"
                                    onChange={e => {
                                        // Hapus semua karakter non-angka, ubah ke number, lalu simpan ke formik
                                        formik.setFieldValue("biayamuat", Number(e.target.value.replace(/\D/g, '')))
                                    }}
                                    value={formik.values.biayamuat === undefined ? 0 : formik.values.biayamuat.toLocaleString('id-ID')}
                                    onBlur={formik.handleBlur}
                                />
                            </Form.Item>
                        </Col>
                        <Col sm={3}>
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
                                    disabled={!HasilTarif}
                                    id="biayamultimuat"
                                    name="biayamultimuat"
                                    type="text"
                                    onChange={e => {
                                        // Hapus semua karakter non-angka, ubah ke number, lalu simpan ke formik
                                        formik.setFieldValue("biayamultimuat", Number(e.target.value.replace(/\D/g, '')))
                                    }}
                                    value={formik.values.biayamultimuat === undefined ? 0 : formik.values.biayamultimuat.toLocaleString('id-ID')}
                                    // value={formik.values.biayamultimuat }
                                    onBlur={formik.handleBlur}
                                />
                            </Form.Item>

                        </Col>
                        {/* Biaya overtonase  - biaya tambahan*/}
                        <Row>
                            <Col sm={3}>
                                <Form.Item
                                    label="Biaya overtonase"
                                    help={formik.touched.overtonase && formik.errors.overtonase}
                                    validateStatus={
                                        formik.touched.overtonase && formik.errors.overtonase
                                            ? 'error'
                                            : 'success'
                                    }
                                    style={{ marginBottom: 2 }}
                                >
                                    <Input
                                        disabled={!HasilTarif}
                                        id="overtonase"
                                        name="overtonase"
                                        type="text"
                                        onChange={e => {
                                            formik.setFieldValue("overtonase", Number(e.target.value.replace(/\D/g, '')))
                                        }}
                                        value={formik.values.overtonase === undefined ? 0 : formik.values.overtonase.toLocaleString('id-ID')}
                                        onBlur={formik.handleBlur}
                                    />
                                </Form.Item>
                            </Col>
                            <Col sm={3}>
                                <Form.Item
                                    label="Biaya multidrop"
                                    help={formik.touched.biayamultidrop && formik.errors.biayamultidrop}
                                    validateStatus={
                                        formik.touched.biayamultidrop && formik.errors.biayamultidrop
                                            ? 'error'
                                            : 'success'
                                    }
                                    style={{ marginBottom: 2 }}
                                >
                                    <Input
                                        disabled={!HasilTarif}
                                        id="biayamultidrop"
                                        name="biayamultidrop"
                                        type="text"
                                        onChange={e => {
                                            // Hapus semua karakter non-angka, ubah ke number, lalu simpan ke formik
                                            formik.setFieldValue("biayamultidrop", Number(e.target.value.replace(/\D/g, '')))
                                        }}
                                        value={formik.values.biayamultidrop === undefined ? 0 : formik.values.biayamultidrop.toLocaleString('id-ID')}
                                        // value={formik.values.biayamultimuat }
                                        onBlur={formik.handleBlur}
                                    />
                                </Form.Item>
                            </Col>
                            <Col sm={3}>
                                <Form.Item
                                    label="Biaya mel"
                                    help={formik.touched.biayamel && formik.errors.biayamel}
                                    validateStatus={
                                        formik.touched.biayamel && formik.errors.biayamel
                                            ? 'error'
                                            : 'success'
                                    }
                                    style={{ marginBottom: 2 }}
                                >
                                    <Input
                                        disabled={!HasilTarif}
                                        id="biayamel"
                                        name="biayamel"
                                        type="text"
                                        onChange={e => {
                                            // Hapus semua karakter non-angka, ubah ke number, lalu simpan ke formik
                                            formik.setFieldValue("biayamel", Number(e.target.value.replace(/\D/g, '')))
                                        }}
                                        value={formik.values.biayamel === undefined ? 0 : formik.values.biayamel.toLocaleString('id-ID')}
                                        // value={formik.values.biayamultimuat }
                                        onBlur={formik.handleBlur}
                                    />
                                </Form.Item>
                            </Col>
                            <Col sm={3}>
                                <Form.Item
                                    label="Biaya tambahan"
                                    help={formik.touched.tambahan && formik.errors.tambahan}
                                    validateStatus={
                                        formik.touched.tambahan && formik.errors.tambahan
                                            ? 'error'
                                            : 'success'
                                    }
                                    style={{ marginBottom: 2 }}
                                >
                                    <Input
                                        disabled={!HasilTarif}
                                        id="tambahan"
                                        name="tambahan"
                                        type="text"
                                        onChange={e => {
                                            // Hapus semua karakter non-angka, ubah ke number, lalu simpan ke formik
                                            formik.setFieldValue("tambahan", Number(e.target.value.replace(/\D/g, '')))
                                        }}
                                        value={formik.values.tambahan === undefined ? 0 : formik.values.tambahan.toLocaleString('id-ID')}
                                        // value={formik.values.biayamultimuat }
                                        onBlur={formik.handleBlur}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={6}>
                                <Form.Item
                                    label="Biaya jalan"
                                    help={formik.touched.biayajalan && formik.errors.biayajalan}
                                    validateStatus={
                                        formik.touched.biayajalan && formik.errors.biayajalan
                                            ? 'error'
                                            : 'success'
                                    }
                                    style={{ marginBottom: 2 }}
                                >
                                    <Input
                                        disabled={!HasilTarif}
                                        id="biayajalan"
                                        name="biayajalan"
                                        type="text"
                                        onChange={e => {
                                            // Hapus semua karakter non-angka, ubah ke number, lalu simpan ke formik
                                            formik.setFieldValue("biayajalan", Number(e.target.value.replace(/\D/g, '')))
                                        }}

                                        // value={formik.values.biayajalan === undefined ? 0 : formik.values.biayajalan.toLocaleString('id-ID')}
                                        value={formik.values.biayajalan}

                                        // value={formik.values.biayajalan === undefined ? HasilTarif : 0}
                                        // value={formik.values.biayamultimuat }
                                        onBlur={formik.handleBlur}
                                    />
                                </Form.Item>
                            </Col>
                            <Col sm={6}>
                                <Form.Item
                                    label="Biaya lain"
                                    help={formik.touched.lain && formik.errors.lain}
                                    validateStatus={
                                        formik.touched.lain && formik.errors.lain
                                            ? 'error'
                                            : 'success'
                                    }
                                    style={{ marginBottom: 2 }}
                                >
                                    <Input
                                        disabled={!HasilTarif}
                                        id="lain"
                                        name="lain"
                                        type="text"
                                        onChange={e => {
                                            // Hapus semua karakter non-angka, ubah ke number, lalu simpan ke formik
                                            formik.setFieldValue("lain", Number(e.target.value.replace(/\D/g, '')))
                                        }}
                                        value={formik.values.lain === undefined ? 0 : formik.values.lain.toLocaleString('id-ID')}
                                        // value={formik.values.biayamultimuat }
                                        onBlur={formik.handleBlur}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        {DetailSemua?.service === "Retail" && (
                            <Col sm={3}>
                                <Form.Item
                                    label="Max Tonase"
                                    help={formik.touched.biayamaxtonase && formik.errors.biayamaxtonase}
                                    validateStatus={
                                        formik.touched.biayamaxtonase && formik.errors.biayamaxtonase
                                            ? 'error'
                                            : 'success'
                                    }
                                    style={{ marginBottom: 2 }}
                                >
                                    <Input
                                        id="biayamaxtonase"
                                        name="biayamaxtonase"
                                        type="text"
                                        onChange={e => {
                                            // Hapus semua karakter non-angka, ubah ke number, lalu simpan ke formik
                                            formik.setFieldValue("biayamaxtonase", Number(e.target.value.replace(/\D/g, '')))
                                        }}
                                        value={formik.values.biayamaxtonase === undefined ? 0 : formik.values.biayamaxtonase.toLocaleString('id-ID')}
                                        onBlur={formik.handleBlur}
                                    />
                                </Form.Item>
                            </Col>
                        )}

                        {DetailSemua?.service?.toLowerCase() === "retail" || DetailSemua?.service?.toLowerCase() === "retailer" && (
                            <>
                                <Col sm={3}>
                                    <Form.Item
                                        label="Harga Selanjutnya"
                                        help={formik.touched.biayaselanjutnya && formik.errors.biayaselanjutnya}
                                        validateStatus={
                                            formik.touched.biayaselanjutnya && formik.errors.biayaselanjutnya
                                                ? 'error'
                                                : 'success'
                                        }
                                        style={{ marginBottom: 2 }}
                                    >
                                        <Input
                                            id="biayaselanjutnya"
                                            name="biayaselanjutnya"
                                            type="text"
                                            onChange={e => {
                                                // Hapus semua karakter non-angka, ubah ke number, lalu simpan ke formik
                                                formik.setFieldValue("biayaselanjutnya", Number(e.target.value.replace(/\D/g, '')))
                                            }}
                                            value={formik.values.biayaselanjutnya === undefined ? 0 : formik.values.biayaselanjutnya.toLocaleString('id-ID')}
                                            // value={formik.values.biayamel }
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
                            </>
                        )}
                    </Row>
                    <Row>
                        {/* {DetailSemua?.service === "Retail" && (
                            <Col sm={3}>
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
                                        // value={formik.values.biayamultimuat }
                                        onBlur={formik.handleBlur}
                                    />
                                </Form.Item>

                            </Col>
                        )} */}
                        {/* <Col sm={3}>
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
                                    // value={formik.values.biayamultidrop }
                                    onBlur={formik.handleBlur}
                                />
                            </Form.Item>

                        </Col>
                        <Col sm={3}>
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
                                    // value={formik.values.biayamel }
                                    onBlur={formik.handleBlur}
                                />
                            </Form.Item>

                        </Col> */}

                        {DetailSemua?.service?.toLowerCase() === "charter" && (
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
                        )}
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
                                    {/* <td colSpan={10}> */}
                                    {/* <hr />
                                        <br />{" "} */}
                                    {/* <br /> */}
                                    {/* </td> */}
                                </tr>
                                <tr
                                    style={{
                                        fontWeight: "bold",
                                        backgroundColor: "#dff0d8",
                                    }}
                                >
                                    <td style={{ backgroundColor: "transparent" }}>No. {index + 1} </td>
                                    <td style={{ backgroundColor: "transparent" }} colSpan={10}>Alamat Muat</td>
                                </tr>

                                <tr key={index}>
                                    <td >
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
                                    <td colSpan={2}>{data.pickup}</td>
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
                                                <td style={{ backgroundColor: "transparent" }}>Aksi</td>
                                                <td style={{ backgroundColor: "transparent" }}>Alamat Bongkar</td>
                                                <td style={{ backgroundColor: "transparent" }} >NO SJ</td>
                                                <td style={{ backgroundColor: "transparent" }}>Service</td>
                                                <td style={{ backgroundColor: "transparent" }}>Qty</td>
                                                <td style={{ backgroundColor: "transparent" }}>Berat</td>
                                                <td style={{ backgroundColor: "transparent" }} width="150px">Biaya Jalan</td>
                                                <td style={{ backgroundColor: "transparent", textAlign: "right" }} width="250px">Jumlah ({data?.service[0]})</td>

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

                                                        <Button
                                                            size="md"
                                                            type="primary"
                                                            onClick={() => {
                                                                console.log(`ini log`, data);
                                                                setDetailSemuaTemp(data)
                                                                apidetailidmpd(data.idmpd)
                                                                handleOpenModal(data)
                                                                setDetailSemuaTemp(asw => ({ ...asw, idmpd: null }));
                                                                setimdpperklik(data.idmpd)

                                                            }}
                                                            className="mt-2"
                                                        >
                                                            Edit
                                                        </Button>

                                                    </span>
                                                </td>
                                                <td >{data.destination}</td>
                                                <td>
                                                    <Tag color="cyan">{data.noSJ}</Tag> <br /> {/* Contoh warna cyan */}
                                                    <Tag color="magenta">{data.kendaraan}</Tag> {/* Contoh warna magenta */}
                                                    <Tag color="green">{data.item}</Tag> {/* Contoh warna hijau */}
                                                </td>
                                                <td>
                                                    <Tag color="red">{data?.service}</Tag><br /> {/* Contoh warna merah */}
                                                    <Tag color="volcano">{data.shipmentName}</Tag> {/* Contoh warna volcano */}
                                                    <Tag color="blue">{data?.via}</Tag> {/* Contoh warna biru */}
                                                </td>


                                                <td>{data.qty}</td>
                                                <td>{data.berat}</td>
                                                <td >{data.Price?.toLocaleString("id-ID", {
                                                    style: "currency",
                                                    currency: "IDR",
                                                })}</td>




                                                {(data.via.toLowerCase() === "darat" && (data?.service[0].toLowerCase() === "retail" || data?.service[0].toLowerCase() === "retailer"))
                                                    ?
                                                    <td style={{ textAlign: "right", fontWeight: "bold" }}>
                                                        {/* {data?.service[0]} */}
                                                        {
                                                            (data.berat * data.Price).toLocaleString("id-ID", {
                                                                style: "currency",
                                                                currency: "IDR",
                                                            })}
                                                    </td> :
                                                    <td style={{ textAlign: "right", fontWeight: "bold" }}>
                                                        {(data.Price).toLocaleString("id-ID", {
                                                            style: "currency",
                                                            currency: "IDR",
                                                        })}
                                                    </td>
                                                }







                                                {/* <td>{data.Price?.toLocaleString("id-ID", {
                                style: "currency",
                                currency: "IDR",
                            })}</td> */}


                                            </tr>

                                            {data.harga_muat != 0 && (
                                                <tr>
                                                    <td colSpan={6}></td>
                                                    <td style={{ backgroundColor: "transparent", fontWeight: "bold" }} width="150px">Harga Muat</td>
                                                    <td style={{ textAlign: "right", fontWeight: "bold" }}>
                                                        {data.harga_muat.toLocaleString("id-ID", {
                                                            style: "currency",
                                                            currency: "IDR",
                                                        })}
                                                    </td>
                                                </tr>
                                            )}
                                            {data.biayaMel != 0 && (
                                                <tr>
                                                    <td colSpan={6}></td>
                                                    <td style={{ backgroundColor: "transparent", fontWeight: "bold" }} width="150px">Biaya Mel</td>
                                                    <td style={{ textAlign: "right", fontWeight: "bold" }}>
                                                        {data.biayaMel.toLocaleString("id-ID", {
                                                            style: "currency",
                                                            currency: "IDR",
                                                        })}
                                                    </td>
                                                </tr>
                                            )}
                                            {data.biayaLain != 0 && (
                                                <tr>
                                                    <td colSpan={6}></td>
                                                    <td style={{ backgroundColor: "transparent", fontWeight: "bold" }} width="150px">Biaya Lain</td>
                                                    <td style={{ textAlign: "right", fontWeight: "bold" }}>
                                                        {data.biayaLain.toLocaleString("id-ID", {
                                                            style: "currency",
                                                            currency: "IDR",
                                                        })}
                                                    </td>
                                                </tr>
                                            )}

                                            {data.harga_bongkar !== 0 && (
                                                <tr>
                                                    <td colSpan={6}></td>
                                                    <td style={{ backgroundColor: "transparent", fontWeight: "bold" }} width="150px">Biaya Bongkar</td>
                                                    <td style={{ textAlign: "right", fontWeight: "bold" }}>{data.harga_bongkar.toLocaleString("id-ID", {
                                                        style: "currency",
                                                        currency: "IDR",
                                                    })}</td>
                                                </tr>
                                            )}
                                            {data.biaya_multi_drop !== 0 && (
                                                <tr>
                                                    <td colSpan={6}></td>
                                                    <td style={{ backgroundColor: "transparent", fontWeight: "bold" }} width="150px">Biaya Multi Drop</td>
                                                    <td style={{ textAlign: "right", fontWeight: "bold" }}>{data.biaya_multi_drop.toLocaleString("id-ID", {
                                                        style: "currency",
                                                        currency: "IDR",
                                                    })}</td>
                                                </tr>
                                            )}
                                            {data.biaya_multimuat !== 0 && (
                                                <tr>
                                                    <td colSpan={6}></td>
                                                    <td style={{ backgroundColor: "transparent", fontWeight: "bold" }} width="150px">Biaya Multi Muat</td>
                                                    <td style={{ textAlign: "right", fontWeight: "bold" }}>{data.biaya_multimuat.toLocaleString("id-ID", {
                                                        style: "currency",
                                                        currency: "IDR",
                                                    })}</td>
                                                </tr>
                                            )}
                                            {data.biaya_overtonase !== 0 && (
                                                <tr>
                                                    <td colSpan={6}></td>
                                                    <td style={{ backgroundColor: "transparent", fontWeight: "bold" }} width="150px">Biaya Over Tonase</td>
                                                    <td style={{ textAlign: "right", fontWeight: "bold" }}>{data.biaya_overtonase.toLocaleString("id-ID", {
                                                        style: "currency",
                                                        currency: "IDR",
                                                    })}</td>
                                                </tr>
                                            )}
                                            {data.biaya_tambahan !== 0 && (
                                                <tr>
                                                    <td colSpan={6}></td>
                                                    <td style={{ backgroundColor: "transparent", fontWeight: "bold" }} width="150px">Biaya Tambahan</td>
                                                    <td style={{ textAlign: "right", fontWeight: "bold" }}>{data.biaya_tambahan.toLocaleString("id-ID", {
                                                        style: "currency",
                                                        currency: "IDR",
                                                    })}</td>
                                                </tr>
                                            )}
                                            {data.total !== 0 && (
                                                <tr>
                                                    <td colSpan={6}></td>
                                                    <td style={{ backgroundColor: "transparent", fontWeight: "bold" }} width="150px">Total SJ</td>
                                                    <td style={{ textAlign: "right", fontWeight: "bold" }}>{data.total.toLocaleString("id-ID", {
                                                        style: "currency",
                                                        currency: "IDR",
                                                    })}</td>
                                                </tr>
                                            )}

                                            <br />
                                        </>
                                    ))}
                            </>
                        ))}
                </tbody>
            </Table>




            <Modal
                title={`Edit Detail SO`}
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
                    name="Edit Detail SO"
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
                                    // disabled
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
                                    // disabled
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
                                label={"Pilih Rute " + DetailSemua?.service}
                                // help={formik.touched.pilihrute && formik.errors.pilihrute}
                                // validateStatus={
                                //     formik.touched.pilihrute && formik.errors.pilihrute
                                //         ? 'error'
                                //         : 'success'
                                // }
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
                                        formik.setFieldValue("bongkar", option.biaya_bongkar)
                                        formik.setFieldValue("biayamuat", option.biaya_muat)
                                        formik.setFieldValue("biayamultimuat", option.biaya_multimuat)
                                        formik.setFieldValue("biayamultidrop", option.biaya_multidrop)
                                        formik.setFieldValue("biayamel", option.biaya_mel)
                                        formik.setFieldValue("overtonase", option.biaya_overtonase)
                                        formik.setFieldValue("tambahan", option.biaya_tambahan)
                                        formik.setFieldValue("biayajalan", option.biaya_jalan)
                                        formik.setFieldValue("lain", option.biaya_lain)
                                        setid_price_customer(value)
                                        console.log(`id_price`, option);
                                        setTarifAsli(option?.biaya)
                                    }}
                                    value={"Kendaraan :" + " " + formik.values.kendaraan + " | | " + "Via :" + " " + formik.values.via + " | | " + "Shipment : " + formik.values.shipment}
                                    onBlur={formik.handleBlur}
                                >
                                    {GetTarifOptions && GetTarifOptions
                                        .filter(item => item?.service_type === DetailSemua?.service)
                                        .map((item) => (
                                            <Select.Option biaya_overtonase={item.biaya_overtonase} biaya_tambahan={item.biaya_tambahan} biaya_lain={item.biaya_lain} biaya_jalan={item.biaya_jalan} biaya_mel={item.biaya_mel} biaya_multidrop={item.biaya_multidrop} key={item.kotaTujuan} biaya_muat={item.biaya_muat} biaya_multimuat={item.biaya_multimuat} biaya_bongkar={item.biaya_bongkar} value={item.id_price}>
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
                                        console.log(`key`, option);
                                    }}
                                    value={formik.values.alamatmuat}
                                    // value={data?.pickup}
                                    onBlur={formik.handleBlur}
                                >
                                    {AlamatInvoiceOptions && AlamatInvoiceOptions.map((item) => (
                                        <Select.Option key={item.addressId} value={item.address}>
                                            {item.address}
                                        </Select.Option>
                                    ))}
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
                                    type="text"
                                    onChange={(value, option) => {
                                        formik.setFieldValue("alamatbongkar", option.children); // set alamatbongkar state to option's children
                                        formik.setFieldValue("IDKotaBongkar", value); // set IDalamatbongkar state to option's value
                                        formik.setFieldValue("IDalamatbongkar", option.key); // set IDalamatbongkar state to option's value
                                        console.log("children", option);
                                    }}
                                    // value={data?.destination}
                                    value={formik.values.alamatbongkar}
                                    onBlur={formik.handleBlur}
                                >
                                    {AlamatInvoiceOptions && AlamatInvoiceOptions.map((item) => (
                                        <Select.Option key={item.addressId} value={item.address}>
                                            {item.address}
                                        </Select.Option>
                                    ))}
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
                                help={formik.touched.shipment && formik.errors.shipment}
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
                                    disabled
                                    type="text"
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
                    {/* <Row>
                        <Col sm={4}>
                            <Form.Item
                                label="Panjang"
                                help={formik.touched.panjang && formik.errors.panjang}
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
                                help={formik.touched.lebar && formik.errors.lebar}
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
                                help={formik.touched.tinggi && formik.errors.tinggi}
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
                    </Row> */}
                    <hr />
                    <Row>
                        <Col sm={3}>
                            <Form.Item

                                label="Tarif"
                                help={formik.touched.tarif && formik.errors.tarif}
                                // validateStatus={
                                //     formik.touched.alamatmuat && formik.errors.alamatmuat
                                //         ? 'error'
                                //         : 'success'
                                // }
                                style={{ marginBottom: 2 }}
                            >
                                <Input
                                    disabled
                                    id="tarif"
                                    name="tarif"
                                    type="number"
                                    onChange={(e) => setasilTarif(e.target.value)}
                                    value={HasilTarif}
                                    onBlur={formik.handleBlur}
                                />
                            </Form.Item>
                        </Col>
                        <Col sm={3}>
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
                                    onFocus={() => setFocused(true)}
                                    onBlur={() => {
                                        setFocused(false);
                                        formik.handleBlur('bongkar');
                                    }}
                                    onChange={e => {
                                        formik.setFieldValue("bongkar", Number(e.target.value.replace(/\D/g, '')))
                                    }}
                                    value={focused ? formik.values.bongkar : formatToIDR(formik.values.bongkar)}
                                />
                            </Form.Item>


                        </Col>
                        <Col sm={3}>
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
                                    // value={formatToIDR(formik.values.biayamuat)}
                                    value={focused ? formik.values.biayamuat : formatToIDR(formik.values.biayamuat)}
                                    onFocus={() => setFocused(true)}
                                    onBlur={() => {
                                        setFocused(false);
                                        formik.handleBlur('biayamuat');
                                    }}
                                />
                            </Form.Item>

                        </Col>
                        {DetailSemua?.service === "Charter" && (
                            <Col sm={ColBiaya()}>
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
                        )}
                        {DetailSemua?.service === "Retail" && (
                            <Col sm={3}>
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
                        )}
                        <Col sm={3}>
                            <Form.Item
                                label="Biaya overtonase"
                                help={formik.touched.overtonase && formik.errors.overtonase}
                                validateStatus={
                                    formik.touched.overtonase && formik.errors.overtonase
                                        ? 'error'
                                        : 'success'
                                }
                                style={{ marginBottom: 2 }}
                            >
                                <Input
                                    disabled={!HasilTarif}
                                    id="overtonase"
                                    name="overtonase"
                                    type="text"
                                    onChange={e => {
                                        formik.setFieldValue("overtonase", Number(e.target.value.replace(/\D/g, '')))
                                    }}
                                    value={formik.values.overtonase === undefined ? 0 : formik.values.overtonase.toLocaleString('id-ID')}
                                    onBlur={formik.handleBlur}
                                />
                            </Form.Item>
                        </Col>
                        <Col sm={3}>
                            <Form.Item
                                label="Biaya multidrop"
                                help={formik.touched.biayamultidrop && formik.errors.biayamultidrop}
                                validateStatus={
                                    formik.touched.biayamultidrop && formik.errors.biayamultidrop
                                        ? 'error'
                                        : 'success'
                                }
                                style={{ marginBottom: 2 }}
                            >
                                <Input
                                    disabled={!HasilTarif}
                                    id="biayamultidrop"
                                    name="biayamultidrop"
                                    type="text"
                                    onChange={e => {
                                        // Hapus semua karakter non-angka, ubah ke number, lalu simpan ke formik
                                        formik.setFieldValue("biayamultidrop", Number(e.target.value.replace(/\D/g, '')))
                                    }}
                                    value={formik.values.biayamultidrop === undefined ? 0 : formik.values.biayamultidrop.toLocaleString('id-ID')}
                                    // value={formik.values.biayamultimuat }
                                    onBlur={formik.handleBlur}
                                />
                            </Form.Item>
                        </Col>
                        <Col sm={ColBiaya()}>
                            <Form.Item
                                label="Biaya mel"
                                help={formik.touched.biayamel && formik.errors.biayamel}
                                validateStatus={
                                    formik.touched.biayamel && formik.errors.biayamel
                                        ? 'error'
                                        : 'success'
                                }
                                style={{ marginBottom: 2 }}
                            >
                                <Input
                                    disabled={!HasilTarif}
                                    id="biayamel"
                                    name="biayamel"
                                    type="text"
                                    onChange={e => {
                                        // Hapus semua karakter non-angka, ubah ke number, lalu simpan ke formik
                                        formik.setFieldValue("biayamel", Number(e.target.value.replace(/\D/g, '')))
                                    }}
                                    value={formik.values.biayamel === undefined ? 0 : formik.values.biayamel.toLocaleString('id-ID')}
                                    // value={formik.values.biayamultimuat }
                                    onBlur={formik.handleBlur}
                                />
                            </Form.Item>

                        </Col>
                        <Col sm={3}>
                            <Form.Item
                                label="Biaya tambahan"
                                help={formik.touched.tambahan && formik.errors.tambahan}
                                validateStatus={
                                    formik.touched.tambahan && formik.errors.tambahan
                                        ? 'error'
                                        : 'success'
                                }
                                style={{ marginBottom: 2 }}
                            >
                                <Input
                                    disabled={!HasilTarif}
                                    id="tambahan"
                                    name="tambahan"
                                    type="text"
                                    onChange={e => {
                                        // Hapus semua karakter non-angka, ubah ke number, lalu simpan ke formik
                                        formik.setFieldValue("tambahan", Number(e.target.value.replace(/\D/g, '')))
                                    }}
                                    value={formik.values.tambahan === undefined ? 0 : formik.values.tambahan.toLocaleString('id-ID')}
                                    // value={formik.values.biayamultimuat }
                                    onBlur={formik.handleBlur}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col >
                            <Form.Item
                                label="Biaya jalan"
                                help={formik.touched.biayajalan && formik.errors.biayajalan}
                                validateStatus={
                                    formik.touched.biayajalan && formik.errors.biayajalan
                                        ? 'error'
                                        : 'success'
                                }
                                style={{ marginBottom: 2 }}
                            >
                                <Input
                                    disabled={!HasilTarif}
                                    id="biayajalan"
                                    name="biayajalan"
                                    type="text"
                                    onChange={e => {
                                        // Hapus semua karakter non-angka, ubah ke number, lalu simpan ke formik
                                        formik.setFieldValue("biayajalan", Number(e.target.value.replace(/\D/g, '')))
                                    }}

                                    // value={formik.values.biayajalan === undefined ? 0 : formik.values.biayajalan.toLocaleString('id-ID')}
                                    value={formik.values.biayajalan}

                                    // value={formik.values.biayajalan === undefined ? HasilTarif : 0}
                                    // value={formik.values.biayamultimuat }
                                    onBlur={formik.handleBlur}
                                />
                            </Form.Item>

                        </Col>
                        <Col >
                            <Form.Item
                                label="Biaya lain"
                                help={formik.touched.lain && formik.errors.lain}
                                validateStatus={
                                    formik.touched.lain && formik.errors.lain
                                        ? 'error'
                                        : 'success'
                                }
                                style={{ marginBottom: 2 }}
                            >
                                <Input
                                    disabled={!HasilTarif}
                                    id="lain"
                                    name="lain"
                                    type="text"
                                    onChange={e => {
                                        // Hapus semua karakter non-angka, ubah ke number, lalu simpan ke formik
                                        formik.setFieldValue("lain", Number(e.target.value.replace(/\D/g, '')))
                                    }}
                                    value={formik.values.lain === undefined ? 0 : formik.values.lain.toLocaleString('id-ID')}
                                    // value={formik.values.biayamultimuat }
                                    onBlur={formik.handleBlur}
                                />
                            </Form.Item>

                        </Col>
                    </Row>
                    <Row>



                        {DetailSemua?.service === "Retail" && (
                            <>
                                <Col sm={3}>
                                    <Form.Item
                                        label="Max Tonase"
                                        help={formik.touched.biayamaxtonase && formik.errors.biayamaxtonase}
                                        validateStatus={
                                            formik.touched.biayamaxtonase && formik.errors.biayamaxtonase
                                                ? 'error'
                                                : 'success'
                                        }
                                        style={{ marginBottom: 2 }}
                                    >
                                        <Input
                                            id="biayamaxtonase"
                                            name="biayamaxtonase"
                                            type="text"
                                            onChange={e => {
                                                // Hapus semua karakter non-angka, ubah ke number, lalu simpan ke formik
                                                formik.setFieldValue("biayamaxtonase", Number(e.target.value.replace(/\D/g, '')))
                                            }}
                                            value={formik.values.biayamaxtonase === undefined ? 0 : formik.values.biayamaxtonase.toLocaleString('id-ID')}
                                            onBlur={formik.handleBlur}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col sm={3}>
                                    <Form.Item
                                        label="Harga Selanjutnya"
                                        help={formik.touched.biayaselanjutnya && formik.errors.biayaselanjutnya}
                                        validateStatus={
                                            formik.touched.biayaselanjutnya && formik.errors.biayaselanjutnya
                                                ? 'error'
                                                : 'success'
                                        }
                                        style={{ marginBottom: 2 }}
                                    >
                                        <Input
                                            id="biayaselanjutnya"
                                            name="biayaselanjutnya"
                                            type="text"
                                            onChange={e => {
                                                // Hapus semua karakter non-angka, ubah ke number, lalu simpan ke formik
                                                formik.setFieldValue("biayaselanjutnya", Number(e.target.value.replace(/\D/g, '')))
                                            }}
                                            value={formik.values.biayaselanjutnya === undefined ? 0 : formik.values.biayaselanjutnya.toLocaleString('id-ID')}
                                            // value={formik.values.biayamel }
                                            onBlur={formik.handleBlur}
                                        />
                                    </Form.Item>

                                </Col>
                            </>
                        )}
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
                                    // value={formatToIDR(formik.values.total)}
                                    placeholder={formatToIDR(formik.values.totalCreate) || 0}
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