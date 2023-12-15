import React, { useEffect, useState } from "react";
import { Button, Drawer, Row, Table } from "antd";
import styled from "styled-components";
import MapsGoogle from "../MapsGoole";
import MapsContainerMapping from "./Mapcontainer";
import { getCoordinates } from "../../Api/Geocode";
import JarakWaktuStore from "../../zustand/Store/coordinateMapRace/StoreJarakWaktuGooglemap";
import { Col } from "react-bootstrap";
function DrawerMapping({
  setOpenDrawer,
  OpenDrawer,
  DataPerClickDrawlMapping,
}) {
  const { JarakWaktu } = JarakWaktuStore((state) => ({
    JarakWaktu: state.JarakWaktu,
  }));

    const onClose = () => {
        setOpenDrawer(false);
    };
    const [totals, setTotals] = useState({ berat: 0, ikat: 0, koli: 0, qty: 0 });

    useEffect(() => {
        let totalBerat = 0,
            totalIkat = 0,
            totalKoli = 0,
            totalQty = 0;

        DataPerClickDrawlMapping?.dataSm?.forEach((item) => {
            totalBerat += item?.berat;
            totalIkat += item?.ikat;
            totalKoli += item?.koli;
            totalQty += item?.qty;
        });

        setTotals({
            berat: totalBerat,
            ikat: totalIkat,
            koli: totalKoli,
            qty: totalQty,
        });
    }, [DataPerClickDrawlMapping]);
    const columns = [
        {
            title: "No",
            dataIndex: "number",
            render: (text, record, index) => index + 1,
        },
        {
            title: "SM",
            dataIndex: "sm",
            key: "sm",
        },
        {
            title: "Jenis Kendaraan",
            dataIndex: "jenisKendaraan",
            key: "jenisKendaraan",
        },
        {
            title: "Penerima",
            dataIndex: "penerima",
            key: "penerima",
        },
        {
            title: "berat",
            dataIndex: "berat",
            key: "berat",
        },
        {
            title: "ikat",
            dataIndex: "ikat",
            key: "ikat",
        },
        {
            title: "koli",
            dataIndex: "koli",
            key: "koli",
        },
        {
            title: "Qty",
            dataIndex: "qty",
            key: "qty",
        },
    ];

    const CustomDrawer = styled(Drawer)`
    .ant-drawer-content-wrapper {
      width: auto !important;
      padding: 15px;
      background: #1a3368;
    }
    ,
    .ant-drawer-content {
      width: 100%;
      height: 100%;
      overflow: auto;
      background: #1a3368;
      pointer-events: auto;
      color: white;
    }
    ,
    .ant-drawer-title {
      flex: 1 1;
      margin: 0;
      color: #f2ecec;
      font-weight: 500;
      font-size: 16px;
      line-height: 22px;
    }
  `;
    // const ambilCoordinate = async () => {
    //     getCoordinates()
    // }
    console.log(`DataPerClickDrawlMapping`, DataPerClickDrawlMapping);
    const [mapLocations, setMapLocations] = useState([]);
    useEffect(() => {
        if (DataPerClickDrawlMapping) {
            // console.log("mulai");
            const loop = DataPerClickDrawlMapping?.dataSm?.map((i) => ({
                muat: i?.muat,
                bongkar: i?.alamatPenerima,
            }));
            console.log(`DataPerClickDrawlMapping?.dataSm`, loop);

            const fetchCoordinates = async () => {
                if (DataPerClickDrawlMapping?.dataSm) {
                    console.log("mulai");
                    const loop = DataPerClickDrawlMapping.dataSm.map((i) => ({
                        muat: i.muat,
                        bongkar: i.alamatPenerima,
                    }));

                    try {
                        const muatnih = await getCoordinates(loop[0]?.muat);
                        console.log(`muat`, muatnih);
                        const locations = [];
                        for (const item of loop) {
                            const coordinates = await getCoordinates(
                                item?.bongkar?.slice(item?.bongkar?.indexOf("-") + 2)
                            );
                            console.log(coordinates);
                            locations.push({
                                bongkar: muatnih,
                                muat: coordinates,
                            });
                        }
                        setMapLocations(locations);
                    } catch (error) {
                        console.error("Error fetching coordinates:", error);
                    }
                } else {
                    console.log(`Belum ada`);
                }
            };

            fetchCoordinates();
        }
        console.log(`Belom ada`);
    }, [DataPerClickDrawlMapping]);


    const renderFooter = () => {
        return (
            <Row style={{ backgroundColor: "" }}>
                <div className="totals" style={{ display: 'flex', justifyContent: 'flex-start', width: "100%" }}>
                    <Col>
                        <p style={{ margin: '0 10px' }}>Total Berat: {totals.berat}</p>
                    </Col>
                    <Col>
                        <p style={{ margin: '0 10px' }}>Total Ikat: {totals.ikat}</p>
                    </Col>
                    <Col>
                        <p style={{ margin: '0 10px' }}>Total Koli: {totals.koli}</p>
                    </Col>
                    <Col>
                        <p style={{ margin: '0 10px' }}>Total Qty: {totals.qty}</p>
                    </Col>
                </div>
            </Row>
        );
    };
    return (
        <>
            <CustomDrawer
                title="Traking Harian"
                placement="right"
                onClose={onClose}
                open={OpenDrawer}
            >
                <div
                    style={{
                        height: 550,
                        width: "auto",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                    }}
                >
                    <MapsContainerMapping
                        locations={mapLocations}
                        width={"auto"}
                        height={550}
                        DataPerClickDrawlMapping={DataPerClickDrawlMapping}
                    />
                </div>
                <div>
                    <div>
                        {/* {JarakWaktu?.distance && <p>Total Distance: {JarakWaktu.distance.toFixed(2)} km</p>}
                {JarakWaktu?.duration && <p>Total Duration: {Math.floor(JarakWaktu.duration / 60)} hours {Math.floor(JarakWaktu.duration % 60)} minutes</p>} */}
                    </div>
                </div>
                <Table className='mt-3' columns={columns} dataSource={DataPerClickDrawlMapping?.dataSm} pagination={false}
                    footer={renderFooter} />
            </CustomDrawer>
        </>
    )
};

export default DrawerMapping;
