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
import React, { useEffect } from "react";
import { ListVehicleZustand } from "../../../../../zustand/Store/Race/fetch/List Vehicle/ListVehicle";
import moment from "moment";
import ListDriverZustand from "../../../../../zustand/Store/Race/fetch/List Driver/ListDriver";

function ModalTambahvehicle({ OpenModal, setOpenModal }) {
  const { vehicleId, DetailVehicle, EditDriver, VehicleType, OptionsSelectType, BuatDriver, GetSelect, codeVehicle, selectGetSelect } = ListVehicleZustand();
  const { getFilterOptions, filteroptionsjenisKepemilikanDanStatus } = ListDriverZustand()

  function NamaModal() {
    if (vehicleId != null) {
      return "Edit Detail Vehicle";
    } else {
      return "Buat Vehicle";
    }
  }

  function gantivalue(e) {
    const { id, value } = e.target;
    ListVehicleZustand.setState(prevState => ({
      ...prevState,
      DetailVehicle: {
        ...prevState.DetailVehicle,
        [id]: value
      }
    }));
  }
  useEffect(() => {
    VehicleType()
    GetSelect()
  }, [])
  function memilihCreteAtauEdit() {
    if (vehicleId != null) {
      EditDriver(vehicleId, DetailVehicle)

    } else {
      BuatDriver(DetailVehicle)
    }
  }

  return (
    <div>

      <Modal
        title={NamaModal()}
        open={OpenModal}
        onOk={() => {
          memilihCreteAtauEdit()
          setOpenModal(false)
        }}
        onCancel={() => {
          ListVehicleZustand.setState({ vehicleId: null, DetailVehicle: null })
          setOpenModal(false)
        }}
        width={1200}
        style={{
          top: 20,
        }}
      >
        <hr />
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
            <DatePicker
              id="stnkDate"
              onChange={(date, dateString) => gantivalue(date, dateString, 'stnkDate')}
              value={DetailVehicle?.stnkDate ? moment(DetailVehicle?.stnkDate, "YYYY-MM-DD") : null}
            />
            <div className="mt-3 mb-2">Tanggal Beli</div>
            <DatePicker
              id="buyDate"
              onChange={(date, dateString) => gantivalue(date, dateString, 'buyDate')}
              value={DetailVehicle?.buyDate ? moment(DetailVehicle?.buyDate, "YYYY-MM-DD") : null}
            />
            <div className="mt-3 mb-2">Tanggal Expired</div>
            <DatePicker
              id="expiredPlat"
              onChange={(date, dateString) => gantivalue(date, dateString, 'expiredPlat')}
              value={DetailVehicle?.expiredPlat ? moment(DetailVehicle?.expiredPlat, "YYYY-MM-DD") : null}
            />
          </Col>
          <Col xs={24} sm={12} md={8} lg={8}>
            <div className="  mb-2">Vehicle Code</div>
            <Input disabled value={vehicleId != null ? DetailVehicle?.vehicleCode : codeVehicle} placeholder="-" />
            <div className="mb-2 mt-2">Jenis Kepemilikan</div>
            <Select
              id="jenisKepemilikan"
              value={DetailVehicle?.jenisKepemilikan}
              style={{ width: "100%" }}
              placeholder="Masukkan Jenis Kepemilikan"
              onChange={(e) => { gantivalue({ target: { id: 'jenisKepemilikan', value: e } }) }}
            >
              <Select.Option value={""}>
                -
              </Select.Option>
              {filteroptionsjenisKepemilikanDanStatus && filteroptionsjenisKepemilikanDanStatus?.filterKepemilikan.map((item, index) => (
                <Select.Option value={item?.jenis}>
                  {item?.jenis}
                </Select.Option>
              ))}

            </Select>
            <div className="mb-2 mt-2">Vendor</div>
            <Input
              id="vendor"
              onChange={gantivalue}
              value={DetailVehicle?.vendor}
              placeholder="Masukkan Kode Kendaraan"
            />
            <div className="mb-2 mt-2">No Polisi</div>
            <Input
              id="policeNumber"
              onChange={gantivalue}
              value={DetailVehicle?.policeNumber}
              placeholder="Masukkan Nomor Polisi"
            />
            <div className="mb-2 mt-2">Jenis Kendaraan</div>
            <Select
              id="vehicleType"
              onChange={(e) => {
                GetSelect(e)
                gantivalue({ target: { id: 'vehicleType', value: e } })
              }}
              value={DetailVehicle?.vehicleType}
              style={{ width: "100%" }}
              placeholder="Masukkan Jenis Kendaraan"
              showSearch
              optionFilterProp="children"
            >
              {OptionsSelectType && OptionsSelectType.map((item, index) => (
                <Select.Option value={item.type}>
                  {item.type}
                </Select.Option>
              ))}

            </Select>
            <div className="mb-2 mt-2">Nama Driver</div>
            <Select
              style={{ width: "100%" }}
              id="driverName"
              value={DetailVehicle?.driverName}
              placeholder="Masukkan Nama Driver"
              onChange={(e) => {
                gantivalue({ target: { id: 'driverIDName', value: e } })
              }}
            >
              {selectGetSelect && selectGetSelect.driverName.map((item, index) => (
                <Select.Option value={item.driverId}>
                  {item.driverName}
                </Select.Option>
              ))}

            </Select>
            <div className="mb-2 mt-2">Warna Plat</div>
            <Select
              id="platColor"
              onChange={(e) => gantivalue({ target: { id: 'platColor', value: e } })}
              value={DetailVehicle?.platColor}
              style={{ width: "100%" }}
              placeholder="Pilih Warna Plat"
            >
              {selectGetSelect && selectGetSelect.warnaPlat.map((item, index) => (
                <Select.Option value={item.warna}>
                  {item.warna}
                </Select.Option>
              ))}

            </Select>
            <div className="mb-2 mt-2">Merk Mobil</div>
            <Input
              id="vehicleMerk"
              onChange={gantivalue}
              value={DetailVehicle?.vehicleMerk}
              style={{ width: "100%" }}
              placeholder="Masukkan Merk Mobil"
            />
          </Col>
          <Col xs={24} sm={12} md={8} lg={8}>
            <div className="mb-2">Tahun Mobil</div>
            <Input
              id="vehicleYear"
              onChange={gantivalue}
              value={DetailVehicle?.vehicleYear}
              placeholder="Masukkan Tahun mobil"
            />
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={12} md={8} lg={8}>
                <div className="mt-2 mb-2">Panjang (m)</div>
                <Input
                  id="vehicleLength"
                  onChange={gantivalue}
                  value={DetailVehicle?.vehicleLength}
                  placeholder="Masukkan panjang"
                />
              </Col>
              <Col xs={24} sm={12} md={8} lg={8}>
                <div className="mt-2 mb-2">Lebar (m)</div>
                <Input
                  id="vehicleWidth"
                  onChange={gantivalue}
                  value={DetailVehicle?.vehicleWidth}
                  placeholder="Masukkan lebar"
                />
              </Col>
              <Col xs={24} sm={12} md={8} lg={8}>
                <div className="mt-2 mb-2">Tinggi (m)</div>
                <Input
                  id="vehicleHeight"
                  onChange={gantivalue}
                  value={DetailVehicle?.vehicleHeight}
                  placeholder="Masukkan tinggi"
                />
              </Col>
            </Row>

            <div className="mt-2 mb-2">
              Kubikasikan (Penjumlahan dari <b>P x L x T</b>)
            </div>
            <Input
              id="vehicleCubication"
              onChange={gantivalue}
              value={DetailVehicle?.vehicleLength * DetailVehicle?.vehicleWidth * DetailVehicle?.vehicleHeight}
              placeholder="Kubikasi Otomatis"
            />

            <div className="mt-2 mb-2">No BPKB</div>
            <Input
              id="bpkbNumber"
              onChange={gantivalue}
              value={DetailVehicle?.bpkbNumber}
              placeholder="Masukkan No BPKB"
            />
            <div className="mt-2 mb-2">Kapasitas (KG)</div>
            <Input
              id="capacity"
              onChange={gantivalue}
              value={DetailVehicle?.capacity}
              placeholder="Masukkan Kapasitas (Kg)"
            />
            <div className="mt-2 mb-2">Kapasitas Max (KG)</div>
            <Input
              id="maxCapacity"
              onChange={gantivalue}
              value={DetailVehicle?.maxCapacity}
              placeholder="Masukkan Kapasitas Max (Kg)"
            />
            <div className="mt-2 mb-2">Cabang</div>
            <Select
              id="branch"
              onChange={(e) => gantivalue({ target: { id: 'branch', value: e } })}
              value={DetailVehicle?.branch}
              placeholder="Masukkan Cabang"
              style={{ width: "100%" }}
            >
              {selectGetSelect && selectGetSelect.cabang.map((item, index) => (
                <Select.Option value={item.idbuBrench}>
                  {item.cabang}
                </Select.Option>
              ))}

            </Select>
          </Col>
        </Row>
      </Modal>
    </div>
  );
}

export default ModalTambahvehicle;
