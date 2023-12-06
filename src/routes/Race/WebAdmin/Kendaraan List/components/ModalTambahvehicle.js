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
import { ListVehicleZustand } from "../../../../../zustand/Store/Race/fetch/List Vehicle/ListVehicle";
import moment from "moment";

function ModalTambahvehicle({ OpenModal, setOpenModal }) {
  const { vehicleId, DetailVehicle } = ListVehicleZustand();
  function NamaModal() {
    if (vehicleId != null) {
      return "Edit Detail Vehicle";
    } else {
      return "Buat Vehicle";
    }
  }
  return (
    <div>

      <Modal
        title={NamaModal()}
        open={OpenModal}
        onCancel={() => {
          ListVehicleZustand.setState({ vehicleId: null })
          setOpenModal(false)
        }}
        width={1200}
        style={{
          top: 20,
        }}
      >
        {/* <h4>
          Create Vehicle
        </h4>
        <hr /> */}
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
            <div className="mt-3 mb-2">STNK Date</div>
            <DatePicker value={DetailVehicle?.stnkDate ? moment(DetailVehicle?.stnkDate, "YYYY-MM-DD") : null} />
            <div className="mt-3 mb-2">Tanggal Beli</div>
            <DatePicker  value={DetailVehicle?.buyDate ? moment(DetailVehicle?.buyDate, "YYYY-MM-DD"): null}/>
            <div className="mt-3 mb-2">Tanggal Expired</div>
            <DatePicker value={DetailVehicle?.expiredPlat ? moment(DetailVehicle?.expiredPlat, "YYYY-MM-DD"): null}/>
          </Col>
          <Col xs={24} sm={12} md={8} lg={8}>
            <div className="  mb-2">Vehicle Code</div>
            <Input disabled value={DetailVehicle?.vehicleCode} placeholder="automatic" />
            <div className="mb-2 mt-2">Jenis Kepemilikan</div>
            <Select
              value={DetailVehicle?.jenisKepemilikan}
              style={{ width: "100%" }}
              placeholder="Masukkan Jenis Kepemilikan"
            />
            <div className="mb-2 mt-2">Vendor</div>
            <Input value={DetailVehicle?.vendor} placeholder="Masukkan Kode Kendaraan" />
            <div className="mb-2 mt-2"> No Polisi</div>
            <Input value={DetailVehicle?.policeNumber} placeholder="Masukkan Nomor Polisi" />
            <div className="mb-2 mt-2">Jenis Kendaraan</div>
            <Select
              value={DetailVehicle?.vehicleType}
              style={{ width: "100%" }}
              placeholder="Masukkan Jenis Kendaraan"
            />
            <div className="mb-2 mt-2"> Nama Driver</div>
            <Input value={DetailVehicle?.driverName} placeholder="Masukkan Nama Driver" />
            <div className="mb-2 mt-2">Warna Plat</div>
            <Select value={DetailVehicle?.platColor} style={{ width: "100%" }} placeholder="Pilih Warna Plat" />
            <div className="mb-2 mt-2">Merk Mobil</div>
            <Input value={DetailVehicle?.vehicleMerk}
              style={{ width: "100%" }}
              placeholder="Masukkan Merk Mobil"
            />
          </Col>
          <Col xs={24} sm={12} md={8} lg={8}>
            <div className="mb-2">Tahun Mobil</div>
            <Input value={DetailVehicle?.vehilceYear} placeholder="Masukkan Tahun mobil" />
            <Row gutter={[16, 16]} >
              <Col xs={24} sm={12} md={8} lg={8}>
                <div className="mt-2 mb-2">Panjang (m)</div>
                <Input value={DetailVehicle?.vehicleLentgth} placeholder="Masukkan panjang" />
              </Col>
              <Col xs={24} sm={12} md={8} lg={8}>
                <div className="mt-2 mb-2">Lebar (m)</div>
                <Input value={DetailVehicle?.vehicleWidth} placeholder="Masukkan lebar" />
              </Col>
              <Col xs={24} sm={12} md={8} lg={8}>
                <div className="mt-2 mb-2">Tinggi (m)</div>
                <Input value={DetailVehicle?.vehicleHeight} placeholder="Masukkan tinggi" />
              </Col>
            </Row>

            <div className="mt-2 mb-2">
              Kubikasikan (Penjumlahan dari <b>P x L x T</b>)
            </div>
            <Input value={DetailVehicle?.vehicleLentgth * DetailVehicle?.vehicleWidth * DetailVehicle?.vehicleHeight} placeholder="Kubikasi Otomatis" />

            <div className="mt-2 mb-2">No BPKB</div>
            <Input value={DetailVehicle?.bpkbNumber} placeholder="Masukkan No BPKB" />
            <div className="mt-2 mb-2">Kapasitas (KG)</div>
            <Input value={DetailVehicle?.capacity} placeholder="Masukkan Kapasitas (Kg)" />
            <div className="mt-2 mb-2">Kapasitas Max (KG)</div>
            <Input value={DetailVehicle?.maxCapacity} placeholder="Masukkan Kapasitas Max (Kg)" />
            <div className="mt-2 mb-2">Cabang</div>
            <Input placeholder="Masukkan Cabang" />
          </Col>
        </Row>
      </Modal>
    </div>
  );
}

export default ModalTambahvehicle;
