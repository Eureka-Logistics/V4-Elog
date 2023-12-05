import { UploadOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  DatePicker,
  Input,
  Modal,
  Row,
  Select,
  Upload,
} from "antd";
import React from "react";

function ModalTambahvehicle({ OpenModal, setOpenModal }) {
  return (
    <div>
    
      <Modal
      
        open={OpenModal}
        onCancel={() => {
          setOpenModal(false);
        }}
        width={1200}
        style={{
          top: 20,
        }}
      >
        <h4>
            Create Vehicle
        </h4>
        <hr/>
        <Row gutter={[16, 16]} style={{ backgroundColor: "" }}>
          <Col xs={24} sm={12} md={8} lg={8}>
            <div
              style={{
                backgroundColor: "",
                maxHeight: "200px",
                minHeight: "200px",
                border: "1px solid black",
              }}
            >
              <div className="d-flex justify-content-center">Ini Gambar</div>
            </div>
            <div className="mt-4 mb-2">Upload Gambar Kendaraan</div>
            <Upload>
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
            <div className="mt-3 mb-2">Tanggal Masuk</div>
            <DatePicker />
            <div className="mt-3 mb-2">Tanggal SIM</div>
            <DatePicker />
            <div className="mt-3 mb-2">Tanggal Lahir</div>
            <DatePicker />
          </Col>
          <Col xs={24} sm={12} md={8} lg={8}>
            <div className="  mb-2">Vehicle Code</div>
            <Input placeholder="automatic" />
            <div className="mb-2 mt-2">Jenis Kepemilikan</div>
            <Select
              style={{ width: "100%" }}
              placeholder="Masukkan Jenis Kepemilikan"
            />
            <div className="mb-2 mt-2"> Kode Kendaraan</div>
            <Input placeholder="Masukkan Kode Kendaraan" />
            <div className="mb-2 mt-2"> No Polisi</div>
            <Input placeholder="Masukkan Nomor Polisi" />
            <div className="mb-2 mt-2">Jenis Kendaraan</div>
            <Select
              style={{ width: "100%" }}
              placeholder="Masukkan Jenis Kendaraan"
            />
            <div className="mb-2 mt-2"> Nama Driver</div>
            <Input placeholder="Masukkan Nama Driver" />
            <div className="mb-2 mt-2">Warna Plat</div>
            <Select style={{ width: "100%" }} placeholder="Pilih Warna Plat" />
            <div className="mb-2 mt-2">Merk Mobil</div>
            <Input
              style={{ width: "100%" }}
              placeholder="Masukkan Merk Mobil"
            />
          </Col>
          <Col xs={24} sm={12} md={8} lg={8}>
            <div className="mb-2">Tahun Mobil</div>
            <Input placeholder="Masukkan Tahun mobil" />
            <Row gutter={[16, 16]} >
              <Col xs={24} sm={12} md={8} lg={8}>
                <div className="mt-2 mb-2">Panjang (m)</div>
                <Input placeholder="Masukkan panjang" />
              </Col>
              <Col xs={24} sm={12} md={8} lg={8}>
                <div className="mt-2 mb-2">Lebar (m)</div>
                <Input placeholder="Masukkan lebar" />
              </Col>
              <Col xs={24} sm={12} md={8} lg={8}>
                <div className="mt-2 mb-2">Tinggi (m)</div>
                <Input placeholder="Masukkan tinggi" />
              </Col>
            </Row>

            <div className="mt-2 mb-2">
              Kubikasikan (Penjumlahan dari <b>P x L x T</b>)
            </div>
            <Input placeholder="Kubikasi Otomatis" />

            <div className="mt-2 mb-2">No BPKB</div>
            <Input placeholder="Masukkan No BPKB" />
            <div className="mt-2 mb-2">Kapasitas (KG)</div>
            <Input placeholder="Masukkan Kapasitas (Kg)" />
            <div className="mt-2 mb-2">Kapasitas Max (KG)</div>
            <Input placeholder="Masukkan Kapasitas Max (Kg)" />
            <div className="mt-2 mb-2">Cabang</div>
            <Input placeholder="Masukkan Cabang" />
          </Col>
        </Row>
      </Modal>
    </div>
  );
}

export default ModalTambahvehicle;
