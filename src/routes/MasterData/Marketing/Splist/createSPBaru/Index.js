import { Card, Select as SelectAntd } from "antd";
import React, { useEffect, useState } from "react";
import { Row, Form, FormGroup, Col, Button } from "react-bootstrap";
import Baseurl from "../../../../../Api/BaseUrl";
import axios from "axios";
import { useHistory } from "react-router-dom";
import mobil from "../../../../redux toolkit/store/ZustandStore";
import Select from 'react-select';
import { DatePicker } from 'antd';
import Swal from "sweetalert2";
import { notification } from 'antd';
import EditSP from "../EditSP";
import gambarloading from "../../../../../assets/Loader_Elogs1.gif"

function Index() {
  const { RangePicker } = DatePicker;
  // const { Item: FormItem } = Form;
  const { phZustand, setPHZustand } = mobil((state) => ({
    setPHZustand: state.setPHZustand,
    phZustand: state.phZustand
  }));
  const [ButtonDisable, setButtonDisable] = useState(false)
  const [getawalSP, setgetAwalSP] = useState([]);
  const [noPH, setnoPH] = useState("");
  const [noSPawal, setnogetAwalSP] = useState("");
  const [namaMarketing, setNamaMarketing] = useState("");
  const [namaPerusahaan, setnamaPerusahaan] = useState("");
  const [CompanyID, setCompanyID] = useState("");
  const [alamatInvoice, setAlamatInvoice] = useState([]);
  const [alamatInvoiceBaru, setAlamatInvoiceBaru] = useState("");
  const [AlamatInvoiceValue, setAlamatInvoiceValue] = useState([]);
  const [diskonselect, setDiskonSelect] = useState("");
  const [diskonselectValue, setDiskonSelectValue] = useState("");
  const [serviceSelect, setServiceSelect] = useState("");
  const [serviceSelectValue, setServiceSelectValue] = useState("Charter");
  const [insuranceSelect, setInsuranceSelect] = useState("");
  const [insuranceSelects, setInsuranceSelects] = useState("N");
  const [packingValue, setpackingValue] = useState("");
  const [packingValues, setpackingValues] = useState("");
  const [tgl_pickup, setTgl_pickup] = useState("");
  const [tgl_bongkar, setTgl_bongkar] = useState("");
  const [memoValue, setMemoValue] = useState("");
  const [JenisBarang, setJenisBarang] = useState("");
  const [TypeMobilSelect, setTypeMobilSelect] = useState("");
  const [MultiChange, setMultiChange] = useState(0);
  const [id_gl, setid_gl] = useState("")
  const [id_asm, setid_asm] = useState("")
  const [id_mgr, setid_mgr] = useState("")
  const [id_kacab, setid_kacab] = useState("")
  const [id_amd, setid_amd] = useState("")
  const [IdSales, SetIdSales] = useState(0);
  const history = useHistory();
  const dapetinnosp = async () => {
    try {
      const data = await axios.get(
        `${Baseurl}sp/get-SP-select-create?keyword=&companyId=${CompanyID}&kode_cabang=JKT&divisi=sales`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      const noSP = data.data.data;
      setgetAwalSP(noSP);
      setnogetAwalSP(data.data.data.noSP);
      setnoPH(data.data.data.noPH);
      setPHZustand(data.data.data.noPH)
      setNamaMarketing(data.data.data.marketing);
      setnamaPerusahaan(data.data.data.company);
      setAlamatInvoice(data.data.data.address);
      setAlamatInvoiceBaru(data.data.data.invoiceAddress?.[0]?.invoiceAddress || data.data.data.invoiceAddress?.[0]?.invoiceAddress?.[0]?.adddress);
      setDiskonSelect(data.data.data.discount);
      setServiceSelect(data.data.data.service);
      setInsuranceSelect(data.data.data.insurance);
      setTypeMobilSelect(data.data.data.type)
      setpackingValue(data.data.data.packing);
    } catch (error) {
      console.log(error);
      notification.error({
        message : "Ada Kesalahan dalam mendapatkan data"
      })
    }


  };
  useEffect(() => {
    dapetinnosp();
  }, [CompanyID]);

  const createspAwal = async () => {
    try {
      setButtonDisable(true)
      const response = await axios.post(
        `${Baseurl}sp/create-SP`,
        {
          ph: noPH,
          msp: noSPawal,
          memo: memoValue,
          id_customer: CompanyID,
          jenis_barang: JenisBarang,
          packing: packingValues,
          asuransi: insuranceSelects,
          tgl_pickup: tgl_pickup,
          tgl_bongkar: tgl_bongkar,
          service: serviceSelectValue,
          alamat_invoice: AlamatInvoiceValue,
          diskon: diskonselectValue,
          asuransi_fee: 0,
          total_keseluruhan: 0,
          is_multi: MultiChange,
          is_tarif_multidrop: MultiChange,
          id_sales: parseInt(IdSales),
          id_gl: id_gl,
          id_asm: id_asm,
          id_mgr: id_mgr,
          id_kacab: id_kacab,
          id_amd: id_amd,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      console.log(response);
      setButtonDisable(false)
      if (response.data) {
        const idmp = response.data.idmp;
        notification.success({
          message: 'Success',
          description: 'SP berhasil dibuat',
          placement: 'topRight',
        });
        // history.push(`/masterdata/edit-spNew/${idmp}`);
        history.push(`/masterdata/edit-sp/${idmp}`);
      }
    } catch (error) {
      setButtonDisable(false)
      if (error.response.data.errors) {
        console.error(error.response.data.errors);
        const errornya = error.response.data.errors.map((item) => ({
          message: item.message
        }))
        errornya.forEach((errorMsg) => {
          notification.error({
            message: 'Error',
            description: errorMsg.message,
            placement: 'topRight',
          });
          console.log(errorMsg);
        })
      }
      console.error(error);
    }
  };

  const handleDatesChange = (dates, dateStrings) => {
    setTgl_pickup(dateStrings[0]); // nilai pertama untuk tgl_pickup
    setTgl_bongkar(dateStrings[1]); // nilai kedua untuk tgl_bongkar
  };

  if (!noSPawal) {
    return <img src={gambarloading} alt="gambarloading"></img>
  }

  return (
    <div>
      <Card>
        <h3>Buat SP</h3>
        <Form>
          <Row>
            <Col sm={6}>
              <FormGroup>
                <Form.Label>No. SP</Form.Label>
                <Form.Control disabled value={noSPawal}></Form.Control>
              </FormGroup>
            </Col>
            <Col sm={6}>
              <FormGroup>
                <Form.Label>Marketing</Form.Label>
                {/* <Form.Select

                  onChange={(e, key) => {
                    console.log(key);
                    SetIdSales(e.target.value)

                  }}>
                  <option>Select Marketing</option>
                  {namaMarketing &&
                    namaMarketing.map((item) => (
                      <option key={item.id} value={item.id}>{item?.fullname} ({item?.nik}) - {item?.divisi}</option>
                    ))}
                </Form.Select> */}
                <SelectAntd style={{ width: "100%" }}
                  placeholder="Select Marketing"
                  onChange={(e, idgl, key, idasm, id_amd, id_kacab, id_mgr) => {
                    console.log(idgl);
                    setid_gl(idgl.idgl)
                    setid_asm(idgl.idasm)
                    setid_mgr(idgl.id_mgr)
                    setid_kacab(idgl.id_kacab)
                    setid_amd(idgl.idAmd)
                    SetIdSales(idgl.value)

                  }}
                >
                  {namaMarketing &&
                    namaMarketing.map((item) => (
                      <option key={item.idKacab} idAmd={item.idAmd} id_kacab={item.idKacab} idgl={item.idGl} idasm={item.idasm} id_mgr={item.idMgr} value={item.id}>{item?.fullname} ({item?.nik}) - {item?.divisi}</option>
                      // <option option={item.id} value={item.id}>{item?.fullname} ({item?.nik}) - {item?.divisi}</option>
                    ))}
                </SelectAntd>
              </FormGroup>
            </Col>
          </Row>
          <Row className="mt-2">
            <Col sm={6}>
              <FormGroup>
                <Form.Label>Nama Pelanggan</Form.Label>
                <Select
                  placeholder="Select Nama Pelanggan"
                  options={namaPerusahaan && namaPerusahaan.map(item => ({ label: item.companyName, value: item.id, item }))}
                  onChange={selectedOption => {
                    // dapetinnosp(selectedOption.value);
                    // dapetinnosp(selectedOption.value);
                    setCompanyID(selectedOption.value);
                    setJenisBarang(selectedOption.item.companyStuff);
                    console.log(selectedOption.value);
                  }}
                />
              </FormGroup>
            </Col>

            <Col sm>
              <Form.Label>Tanggal Pickup - Tanggal Bongkar</Form.Label>
              <br />
              <RangePicker style={{ width: "100%" }} onChange={handleDatesChange} />
            </Col>
            {/* <Col sm={3}>
        <Form.Label label="Type Vehicle">
        
        </Form.Label>
      </Col> */}
          </Row>
          <Row className="mt-2">
            <Col sm={6}>
              <FormGroup>
                <Form.Label>Alamat Invoice</Form.Label>
                <Select
                  placeholder="Alamat Invoice"
                  options={Array.isArray(alamatInvoiceBaru) ? alamatInvoiceBaru.map(item => ({ label: item.adddress, value: item.adddress })) : []}
                  onChange={selectedOption => setAlamatInvoiceValue(selectedOption.value)}
                />
              </FormGroup>
            </Col>

            <Col sm>
              <FormGroup>
                <Form.Label>Jenis Barang</Form.Label>
                <Form.Control
                  value={JenisBarang}
                  type="text"
                  onChange={(e) => setJenisBarang(e.target.value)}
                ></Form.Control>
              </FormGroup>
            </Col>
            {/* <Col sm={2}>
              <FormGroup>
                <Form.Label>Diskon %</Form.Label>
                <Form.Select
                  onChange={(e) => setDiskonSelectValue(e.target.value)}
                  type="text"
                >
                  <option>Pilih discount</option>
                  {diskonselect &&
                    diskonselect.map((item) => (
                      <option value={item.value}>{item.discount}</option>
                    ))}
                </Form.Select>
              </FormGroup>
            </Col>
            <Col sm={2}>
              <FormGroup>
                <Form.Label>Diskon Amount</Form.Label>
                <Form.Control

                  type="text"></Form.Control>
              </FormGroup>
            </Col> */}
          </Row>
          <Row className="mt-2">
            <Col sm={3}>
              <FormGroup>
                <Form.Label>Service</Form.Label>
                <Form.Select onChange={(e) => setServiceSelectValue(e.target.value)} type="text">
                  <option value={"Charter"}>Charter</option>
                  <option value={"Retail"}>Retail</option>
                  {/* {serviceSelect &&
                    serviceSelect.map((item) => <option value={item.tipe}>{item.tipe}</option>)} */}
                </Form.Select>
              </FormGroup>
            </Col>
            <Col sm={3}>
              <FormGroup>
                <Form.Label>Insurance</Form.Label>
                <Form.Select
                  onChange={(e) => setInsuranceSelects(e.target.value)}
                  type="text"
                >
                  <option value={"N"}>Tidak Menggunakan Asuransi</option>
                  <option value={"Y"}>Menggunakan Asuransi</option>
                  {/* {insuranceSelect &&
                    insuranceSelect.map((item) => (
                      <option value={item.value}>{item.tipe}</option>
                    ))} */}
                </Form.Select>
              </FormGroup>
            </Col>
            <Col sm={3}>
              <FormGroup>
                <Form.Label>Packing Request</Form.Label>
                <SelectAntd
                  optionFilterProp="children"
                  showSearch
                  style={{ width: "100%" }}
                  placeholder="Pilih Packing"
                  onChange={(e) => { console.log(e); setpackingValues(e) }}
                >
                  {packingValue && [...packingValue].reverse().map((item) => (
                    <option key={item.id} value={item.id}>{item.packing}</option>
                  ))}
                </SelectAntd>
              </FormGroup>
            </Col>

            <Col sm={3}>
              <FormGroup>
                <Form.Label>Multi Drop</Form.Label>
                <Form.Select
                  onChange={(e) => { setMultiChange(e.target.value); console.log(e.target.value) }}
                  type="text"
                >
                  <option value={0}>Tidak Multi</option>
                  <option value={1}>Multi</option>
                </Form.Select>
              </FormGroup>
            </Col>
          </Row>
          <Row className="mt-2">
            <Col sm={12}>
              <Form.Group>
                <Form.Label style={{ fontWeight: "bold" }}>Isi Memo</Form.Label>
                <Form.Control
                  onChange={(e) => setMemoValue(e.target.value)}
                  type="text"
                  style={{ height: "100px" }}
                />
              </Form.Group>
            </Col>
          </Row>
        </Form>
        <Button onClick={createspAwal} className="mt-5" size="md" disabled={ButtonDisable}>
          Submit
        </Button>
      </Card>
      {/* <EditSP alamatInvoice={alamatInvoice}/> */}
    </div>

  );
}

export default Index;