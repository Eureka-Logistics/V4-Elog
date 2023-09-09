import React from "react";
import { Avatar, Col, Menu, Row } from "antd";
import { Link, useHistory } from "react-router-dom";
import CustomScrollbars from "util/CustomScrollbars";
import "./SidebarStyles.css";
import SidebarLogo from "./SidebarLogo";
import UserProfile from "./UserProfile";
import AppsNavigation from "./AppsNavigation";
import {
  LIGHT_PURPLE,
  NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR,
  NAV_STYLE_NO_HEADER_MINI_SIDEBAR,
  THEME_TYPE_LITE,
} from "../../constants/ThemeSetting";
import IntlMessages from "../../util/IntlMessages";
import { useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import {
  CarTwoTone,
  SmileTwoTone,
  ScheduleTwoTone,
  ProfileTwoTone,
  CheckSquareTwoTone,
  PieChartOutlined,
  UserOutlined,
  ExceptionOutlined,
  FileExcelOutlined,
  FileTextOutlined,
  ProfileOutlined,
  FileProtectOutlined,
  DollarOutlined,
  VideoCameraOutlined,
  GlobalOutlined,
  CarOutlined,
  EnvironmentTwoTone,
  FolderOpenOutlined,
  ShopOutlined,
  FundViewOutlined,
  AppstoreOutlined,
  AppstoreTwoTone,
  HourglassTwoTone,
} from "@ant-design/icons";
const { SubMenu } = Menu;

const SidebarContent = ({ sidebarCollapsed, setSidebarCollapsed }) => {
  const { navStyle, themeType } = useSelector(({ settings }) => settings);
  const pathname = useSelector(({ common }) => common.pathname);
  const history = useHistory();

  const getNoHeaderClass = (navStyle) => {
    if (
      navStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR ||
      navStyle === NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR
    ) {
      return "gx-no-header-notifications";
    }
    return "";
  };
  const MenuItemGroup = Menu.ItemGroup;

  const selectedKeys = pathname.substr(1);
  const defaultOpenKeys = selectedKeys.split("/")[1];

  const jobdesk = localStorage.getItem("jobdesk");
  const fullname = localStorage.getItem(`fullname`);
  console.log(`jobdeks`, jobdesk);

  const createsp = () => {
    history.push(`/masterdata/marketing/createsp`);
  };
  const createar = () => {
    history.push(`/createar`);
  };
  const createap = () => {
    history.push(`/akunting/tambahdataap`);
  };

  return (
    <>
      <SidebarLogo
        sidebarCollapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
      />
      <div className="gx-sidebar-content">
        <div
          className={`gx-sidebar-notifications ${getNoHeaderClass(navStyle)}`}
        >

          <Row>
            <Col span={24} className="d-flex justify-content-center">
              <Avatar
                src={`https://avatars.githubusercontent.com/u/130539563?s=200&v=4`}
                className="gx-size-60 gx-pointer gx-mr-3"
                alt=""
              />
            </Col>
            <Col span={24} className="d-flex justify-content-center">
              <b style={{ color: "white" }} className="mt-3">
                {" "}
                {jobdesk} , {fullname}
              </b>
            </Col>
          </Row>
        </div>
        <CustomScrollbars className="gx-layout-sider-scrollbar">
          <Menu
            defaultOpenKeys={[defaultOpenKeys]}
            selectedKeys={[selectedKeys]}
            style={{ backgroundColor: "#1a5cbf" }}
            theme={themeType === LIGHT_PURPLE ? "lite" : "dark"}
            mode="inline"
          >
            <MenuItemGroup key="main">
              {jobdesk === "sales" ? (
                <div className="d-flex justify-content-center gx-sidebar-content w-100  text-center ">
                  <Button
                    size="lg"
                    style={{ width: 180 }}
                    className="d-flex align-items-center justify-content-center"
                    onClick={() => createsp()}
                    variant="danger"
                  >
                    Tambah SP
                  </Button>
                </div>
              ) : (
                <></>
              )}
              {jobdesk === "akunting" ? (
                <>
                  <div className="d-flex justify-content-center gx-sidebar-content w-100  text-center ">
                    <Button
                      size="lg"
                      style={{
                        width: 180,
                        backgroundColor: "#00a65a",
                        color: "white",
                      }}
                      className="d-flex align-items-center justify-content-center"
                      onClick={() => createar()}
                      variant="#00a65a"
                    >
                      ADD AR
                    </Button>
                  </div>
                  <div className="d-flex justify-content-center gx-sidebar-content w-100 mt-5 text-center ">
                    <Button
                      size="lg"
                      style={{ width: 180, color: "white", marginTop: "-35px" }}
                      className="d-flex align-items-center justify-content-center"
                      onClick={() => createap()}
                      variant="warning"
                    >
                      ADD AP
                    </Button>
                  </div>
                </>
              ) : (
                <></>
              )}

              {jobdesk == "sales" && (
                <MenuItemGroup key="main">
                  <Menu.Item key="Dashboard">
                    <Link to="/dashboard" style={{ textDecoration: "none" }}>

                      <AppstoreOutlined style={{ fontSize: "20px" }} />
                      <span style={{ fontWeight: "bold", color: "white" }}>
                        <IntlMessages id="Dashboard" />
                      </span>
                    </Link>
                  </Menu.Item>
                  <div
                    className="d-flex justify-content-center"
                    style={{ backgroundColor: "#0c2197", height: "20%" }}
                  >
                    <h6 style={{ color: "white" }} className="mt-1">
                      Pesanan
                    </h6>
                  </div>
                  <Menu.Item key="SP List">
                    <Link
                      to="/masterdata/marketing/splist"
                      style={{ textDecoration: "none" }}
                    >
                      <FileTextOutlined style={{ fontSize: "20px" }} />
                      <span style={{ fontWeight: "bold", color: "white" }}>
                        <IntlMessages id="SP List" />
                      </span>
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="Cancel SP List">
                    <Link
                      to="/masterdata/marketing/cancelsplist"
                      style={{ textDecoration: "none" }}
                    >
                      <FileExcelOutlined style={{ fontSize: "20px" }} />
                      <span style={{ fontWeight: "bold", color: "white" }}>
                        <IntlMessages id="Cancel SP List" />
                      </span>
                    </Link>
                  </Menu.Item>
                  <div
                    className="d-flex justify-content-center"
                    style={{ backgroundColor: "#0c2197", height: "20%" }}
                  >
                    <h6 style={{ color: "white" }} className="mt-1">
                      Master
                    </h6>
                  </div>
                  <Menu.Item key="Data Wilayah">
                    <Link
                      to="/mastercustomersss"
                      style={{ textDecoration: "none" }}
                    >
                      <UserOutlined style={{ fontSize: "20px" }} />
                      <span style={{ fontWeight: "bold", color: "white" }}>
                        Customer
                      </span>
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="Alamat Customer">
                    <Link
                      to="/alamatcustomer"
                      style={{ textDecoration: "none" }}
                    >
                      <ProfileOutlined style={{ fontSize: "20px" }} />
                      <span style={{ fontWeight: "bold", color: "white" }}>
                        Alamat Customer
                      </span>
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="Alamat Invoice">
                    <Link
                      to="/invoicecustomer"
                      style={{ textDecoration: "none" }}
                    >
                      <FileProtectOutlined style={{ fontSize: "20px" }} />
                      <span style={{ fontWeight: "bold", color: "white" }}>
                      Alamat Invoice
                      </span>
                      {/* <span style={{ fontWeight: "bold",  color: 'white' }}>Data Alamat All</span> */}
                    </Link>
                  </Menu.Item>
                  <div
                    className="d-flex justify-content-center"
                    style={{ backgroundColor: "#0c2197", height: "20%" }}
                  >
                    <h6 style={{ color: "white" }} className="mt-1">
                      Tarif
                    </h6>
                  </div>
                  <Menu.Item key="Tarif Customer">
                    <Link
                      to="/pelanggantarif"
                      style={{ textDecoration: "none" }}
                    >
                      <DollarOutlined style={{ fontSize: "20px" }} />
                      <span style={{ fontWeight: "bold", color: "white" }}>
                        Tarif Customer
                      </span>
                    </Link>
                  </Menu.Item> <Menu.Item key="Tarif Eureka" disabled>
                    <Link to="/tarif_eureka" style={{ textDecoration: "none" }}>
                      {/* <i className="icon icon-widgets" /> */}
                      <DollarOutlined style={{ fontSize: "20px" }} />
                      <span style={{ fontWeight: "bold", color: "white" }}>
                        Tarif Eureka
                      </span>
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="Tarif Mitra" disabled>
                    
                    <Link to="/tarifmitra" style={{ textDecoration: "none" }}>
                      {/* <i className="icon icon-widgets" />
                       */}
                      <DollarOutlined style={{ fontSize: "20px" }} />
                      <span style={{ fontWeight: "bold", color: "white" }}>
                        Tarif Mitra
                      </span>
                    </Link>
                  </Menu.Item>
                  <div
                    className="d-flex justify-content-center"
                    style={{ backgroundColor: "#0c2197", height: "20%" }}
                  >
                    <h6 style={{ color: "white" }} className="mt-1">
                      Lain - Lain
                    </h6>
                  </div>
                  <Menu.Item key="monitoringVehicle" >
                    <Link
                      to="/masterdata/monitoring"
                      style={{ textDecoration: "none" }}
                    >
                      <VideoCameraOutlined style={{ fontSize: "20px" }} />
                      <span style={{ fontWeight: "bold", color: "white" }}>
                        <IntlMessages id="Monitoring Vehicle" />
                      </span>
                    </Link>
                  </Menu.Item>
                </MenuItemGroup>
              )}
              {jobdesk == "operasional" && (
                <Menu.ItemGroup key="master">
                  <div
                    className="d-flex justify-content-center"
                    style={{ backgroundColor: "#0c2197", height: "20%" }}
                  >
                    <h6 style={{ color: "white" }} className="mt-1">
                      Driver
                    </h6>
                  </div>
                  <Menu.Item key="driver">
                    <Link
                      to="/masterdata/purchasing/driver"
                      style={{ textDecoration: "none" }}
                    >
                      {/* <i className="icon icon-widgets" /> */}
                      <SmileTwoTone
                        style={{ fontSize: "20px", color: "white" }}
                      />
                      <span style={{ fontWeight: "bold", color: "white" }}>
                        <IntlMessages id="sidebar.driver" />
                      </span>
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="DriverMap">
                    <Link
                      to="/masterdata/monitoring"
                      style={{ textDecoration: "none" }}
                    >
                      <CarTwoTone style={{ fontSize: "20px" }} />
                      <span style={{ fontWeight: "bold", color: "white" }}>
                        <IntlMessages id="Driver Map" />
                      </span>
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="DriverEmc">
                    <Link
                      to="/masterdata/monitoring"
                      style={{ textDecoration: "none" }}
                    >
                      {/* <i className="icon icon-widgets" /> */}
                      <CarTwoTone style={{ fontSize: "20px" }} />
                      <span style={{ fontWeight: "bold", color: "white" }}>
                        <IntlMessages id="Driver Emc" />
                      </span>
                    </Link>
                  </Menu.Item>
                  <div
                    className="d-flex justify-content-center"
                    style={{ backgroundColor: "#0c2197", height: "20%" }}
                  >
                    <h6 style={{ color: "white" }} className="mt-1">
                      Menu SP
                    </h6>
                  </div>
                  <Menu.Item key="waiting SP List">
                    <Link
                      to="/masterdata/newsplist"
                      style={{ textDecoration: "none" }}
                    >
                      <ProfileTwoTone style={{ fontSize: "20px" }} />
                      <span style={{ fontWeight: "bold", color: "white" }}>
                        <IntlMessages id="Waiting SP" />
                      </span>
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="New SP">
                    <Link
                      to="/masterdata/newsplist"
                      style={{ textDecoration: "none" }}
                    >
                      <CheckSquareTwoTone style={{ fontSize: "20px" }} />
                      <span style={{ fontWeight: "bold", color: "white" }}>
                        <IntlMessages id="Approve SP" />
                      </span>
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="SP List">
                    <Link
                      to="/masterdata/splist"
                      style={{ textDecoration: "none" }}
                    >
                      <ProfileTwoTone style={{ fontSize: "20px" }} />
                      <span style={{ fontWeight: "bold", color: "white" }}>
                        <IntlMessages id="SP List" />
                      </span>
                    </Link>
                  </Menu.Item>
                  <div
                    className="d-flex justify-content-center"
                    style={{ backgroundColor: "#0c2197", height: "20%" }}
                  >
                    <h6 style={{ color: "white" }} className="mt-1">
                      Vehicle
                    </h6>
                  </div>

                  <Menu.Item key="VehicleMap">
                    <Link
                      to="/masterdata/monitoring"
                      style={{ textDecoration: "none" }}
                    >
                      {/* <i className="icon icon-widgets" /> */}
                      <EnvironmentTwoTone style={{ fontSize: "20px" }} />
                      <span style={{ fontWeight: "bold", color: "white" }}>
                        <IntlMessages id="Vehicle Map" />
                      </span>
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="vehicle">
                    <Link
                      to="/masterdata/vehicle"
                      style={{ textDecoration: "none" }}
                    >
                      <CarTwoTone style={{ fontSize: "20px" }} />
                      <span style={{ fontWeight: "bold", color: "white" }}>
                        <IntlMessages id="sidebar.vehicle" />
                      </span>
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="monitoringVehicle">
                    <Link
                      to="/masterdata/monitoring"
                      style={{ textDecoration: "none" }}
                    >
                      <ScheduleTwoTone style={{ fontSize: "20px" }} />
                      <span style={{ fontWeight: "bold", color: "white" }}>
                        <IntlMessages id="Monitoring Vehicle" />
                      </span>
                    </Link>
                  </Menu.Item>
                </Menu.ItemGroup>
              )}
              {/* {jobdesk == "operasional" && (
                <Menu.ItemGroup key="monitorings">
                  <Menu.Item key="monitoringVehicle" >
                    <Link to="/masterdata/monitoring">
                      <i className="icon icon-widgets" />
                      <span style={{ fontWeight: "bold",  color: 'white' }}>
                        <IntlMessages id="Vehicle Map" />
                      </span>
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="monitoringDriver">
                    <Link to="/masterdata/monitoring">
                      <i className="icon icon-widgets" />
                      <span style={{ fontWeight: "bold",  color: 'white' }}>
                        <IntlMessages id="Driver Map" />
                      </span>
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="DriverEmc">
                    <Link to="/masterdata/monitoring">
                      <i className="icon icon-widgets" />
                      <span style={{ fontWeight: "bold",  color: 'white' }}>
                        <IntlMessages id="Driver Emc" />
                      </span>
                    </Link>
                  </Menu.Item>
                </Menu.ItemGroup>
              )} */}
              {jobdesk.toLowerCase() === "akunting" ? (
                <>
                  <Menu.ItemGroup key="akuntingg">
                    <Menu.Item key="Dashboard">
                      <Link to="/dashboard" style={{ textDecoration: "none" }}>
                        {/* <i className="icon icon-widgets" />
                         */}
                        <AppstoreOutlined style={{ fontSize: "20px" }} />
                        {/* <AppstoreTwoTone style={{ fontSize: '20px' }} /> */}
                        <span style={{ fontWeight: "bold", color: "white" }}>
                          <IntlMessages id="Dashboard" />
                        </span>
                      </Link>
                    </Menu.Item>
                    <div
                      className="d-flex justify-content-center"
                      style={{ backgroundColor: "#0c2197", height: "20%" }}
                    >
                      <h6 style={{ color: "white" }} className="mt-1">
                        Menu SP
                      </h6>
                    </div>
                    <Menu.Item key="SP Lists">
                      <Link
                        to="/akunting/splistwaitingakunting"
                        style={{ textDecoration: "none" }}
                      >
                        <FileProtectOutlined style={{ fontSize: "20px" }} />
                        {/* <HourglassTwoTone style={{ fontSize: '20px' }} /> */}
                        <span style={{ fontWeight: "bold", color: "white" }}>
                          Waiting Approve SP
                        </span>
                      </Link>
                    </Menu.Item>
                    <Menu.Item key="SP Lists All">
                      <Link
                        to="/akunting/splistakuntingbaru"
                        style={{ textDecoration: "none" }}
                      >
                        <FileProtectOutlined style={{ fontSize: "20px" }} />
                        <span style={{ fontWeight: "bold", color: "white" }}>
                          SP List All
                        </span>
                      </Link>
                    </Menu.Item>

                    <Menu.Item key="Approve SP">
                      <Link
                        to="/approvesplistall"
                        style={{ textDecoration: "none" }}
                      >
                        <FileProtectOutlined style={{ fontSize: "20px" }} />
                        <span style={{ fontWeight: "bold", color: "white" }}>
                          List Approve All SP
                        </span>
                      </Link>
                    </Menu.Item>
                  </Menu.ItemGroup>
                  {/* <SubMenu key="monitoring" title="Monitoring">
                    <Menu.Item key="Data Pesanan Customer">
                      <Link to="/akunting/detaildatacustomer" style={{ textDecoration: "none" }}>
                        <i className="icon icon-widgets" />
                        <span style={{ fontWeight: "bold",  color: 'white' }}>Data Customer</span>
                      </Link>
                    </Menu.Item>
                  </SubMenu> */}
                  {/* <div
                    className="d-flex justify-content-center"
                    style={{ backgroundColor: "#0c2197", height: "20%" }}
                  >
                    <h6 style={{ color: "white" }} className="mt-1">
                      Menu AR
                    </h6>
                  </div>
                  <Menu.Item key="AR List ALL">
                    <Link
                      to="/akunting/ar/ar"
                      style={{ textDecoration: "none" }}
                    >
                      <i className="icon icon-widgets" />
                      <span style={{ fontWeight: "bold", color: "white" }}>
                        AR List ALL
                      </span>
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="List Invoice AR">
                    <Link
                      to="/akunting/ar/ar"
                      style={{ textDecoration: "none" }}
                    >
                      <i className="icon icon-widgets" />
                      <span style={{ fontWeight: "bold", color: "white" }}>
                        List Invoice AR
                      </span>
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="SJ no AR">
                    <Link
                      to="/akunting/ar/ar"
                      style={{ textDecoration: "none" }}
                    >
                      <i className="icon icon-widgets" />
                      <span style={{ fontWeight: "bold", color: "white" }}>
                        SJ no AR
                      </span>
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="Penerimaan SJ">
                    <Link
                      to="/akunting/ar/ar"
                      style={{ textDecoration: "none" }}
                    >
                      <i className="icon icon-widgets" />
                      <span style={{ fontWeight: "bold", color: "white" }}>
                        Penerimaan SJ
                      </span>
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="Report Pembayaran Customer">
                    <Link
                      to="/akunting/ar/ar"
                      style={{ textDecoration: "none" }}
                    >
                      <i className="icon icon-widgets" />
                      <span style={{ fontWeight: "bold", color: "white" }}>
                        Report Pembayaran Customer
                      </span>
                    </Link>
                  </Menu.Item> */}

                  <div
                    className="d-flex justify-content-center"
                    style={{ backgroundColor: "#0c2197", height: "20%" }}
                  >
                    <h6 style={{ color: "white" }} className="mt-1">
                      Payment
                    </h6>
                  </div>

                  <Menu.Item key="Penerimaan INV">
                    <Link
                      to="/akunting/ar/reportpartners/reportpenerimaaninvoice"
                      style={{ textDecoration: "none" }}
                    >
                      <i className="icon icon-widgets" />
                      <span style={{ fontWeight: "bold", color: "white" }}>
                        Penerimaan INV
                      </span>
                    </Link>
                  </Menu.Item>

                  <div
                    className="d-flex justify-content-center"
                    style={{ backgroundColor: "#0c2197", height: "20%" }}
                  >
                    <h6 style={{ color: "white" }} className="mt-1">
                      Data Wilayah
                    </h6>
                  </div>

                  <Menu.Item key="Master Kecamatan">
                    <Link
                      to="/masterkecamatan"
                      style={{ textDecoration: "none" }}
                    >
                      <i className="icon icon-widgets" />
                      <span style={{ fontWeight: "bold", color: "white" }}>
                        Data Kecamatan
                      </span>
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="Master Kota">
                    <Link to="/masterkota" style={{ textDecoration: "none" }}>
                      <i className="icon icon-widgets" />
                      <span style={{ fontWeight: "bold", color: "white" }}>
                        Data Kota
                      </span>
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="Master Provinsi">
                    <Link
                      to="/masterprovinsi"
                      style={{ textDecoration: "none" }}
                    >
                      <i className="icon icon-widgets" />
                      <span style={{ fontWeight: "bold", color: "white" }}>
                        Data Provinsi
                      </span>
                    </Link>
                  </Menu.Item>

                  {/* <SubMenu key="AP List" title="AP List">
                      <Menu.Item key="SP_AP_LIST">
                        <Link to="/akunting/ap/">
                          <i className="icon icon-widgets" />
                          <span style={{ fontWeight: "bold",  color: 'white' }}>AP List ALL</span>
                        </Link>
                      </Menu.Item>


                    </SubMenu> */}
                  <div
                    className="d-flex justify-content-center"
                    style={{ backgroundColor: "#0c2197", height: "20%" }}
                  >
                    <h6 style={{ color: "white" }} className="mt-1">
                      Data Tarif
                    </h6>
                  </div>

                  <Menu.Item key="Cari Tarifs">
                    <Link to="/CariTarif" style={{ textDecoration: "none" }}>
                      {/* <i className="icon icon-widgets" /> */}
                      <DollarOutlined style={{ fontSize: "20px" }} />
                      <span style={{ fontWeight: "bold", color: "white" }}>
                       Cari Tarif
                      </span>
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="Tarif Eureka">
                    <Link to="/tarif_eureka" style={{ textDecoration: "none" }}>
                      {/* <i className="icon icon-widgets" /> */}
                      <DollarOutlined style={{ fontSize: "20px" }} />
                      <span style={{ fontWeight: "bold", color: "white" }}>
                        Tarif Eureka
                      </span>
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="Tarif Mitra" disabled>
                    
                    <Link to="/tarifmitra" style={{ textDecoration: "none" }}>
                      {/* <i className="icon icon-widgets" />
                       */}
                      <DollarOutlined style={{ fontSize: "20px" }} />
                      <span style={{ fontWeight: "bold", color: "white" }}>
                        Tarif Mitra
                      </span>
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="Tarif Customer" disabled>
                    <Link
                      to="/pelanggantarif"
                      style={{ textDecoration: "none" }}
                    >
                      <DollarOutlined style={{ fontSize: "20px" }} />
                      <span style={{ fontWeight: "bold", color: "white" }}>
                        Tarif Customer
                      </span>
                    </Link>
                  </Menu.Item>

                  <div
                    className="d-flex justify-content-center"
                    style={{ backgroundColor: "#0c2197", height: "20%" }}
                  >
                    <h6 style={{ color: "white" }} className="mt-1">
                      Bisnis Employee
                    </h6>
                  </div>

                  <Menu.Item key="Data BU">
                    <Link to="/DataBUIndex" style={{ textDecoration: "none" }}>
                      <i className="icon icon-widgets" />
                      <span style={{ fontWeight: "bold", color: "white" }}>
                        Data BU
                      </span>
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="Data BU Employee">
                    <Link
                      to="/DataBuEmployee"
                      style={{ textDecoration: "none" }}
                    >
                      <i className="icon icon-widgets" />
                      <span style={{ fontWeight: "bold", color: "white" }}>
                        Data BU Employee
                      </span>
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="Data BU Brench">
                    <Link to="/DataBuBrench" style={{ textDecoration: "none" }}>
                      <i className="icon icon-widgets" />
                      <span style={{ fontWeight: "bold", color: "white" }}>
                        Data BU Brench
                      </span>
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="Data Employee Position">
                    <Link
                      to="/DataBuEmployeePosition"
                      style={{ textDecoration: "none" }}
                    >
                      <i className="icon icon-widgets" />
                      <span style={{ fontWeight: "bold", color: "white" }}>
                        Data Employee Position
                      </span>
                    </Link>
                  </Menu.Item>
                </>
              ) : null}

              {jobdesk === "purchasing" ? (
                <Menu.ItemGroup key="monitorings">
                  <Menu.Item key="Dashboard">
                    <Link to="/dashboard" style={{ textDecoration: "none" }}>
                      {/* <i className="icon icon-widgets" />
                       */}
                      <AppstoreOutlined style={{ fontSize: "20px" }} />
                      <span style={{ fontWeight: "bold", color: "white" }}>
                        <IntlMessages id="Dashboard" />
                      </span>
                    </Link>
                  </Menu.Item>
                  <div
                    className="d-flex justify-content-center"
                    style={{ backgroundColor: "#0c2197", height: "20%" }}
                  >
                    <h6 style={{ color: "white" }} className="mt-1">
                      Menu SP
                    </h6>
                  </div>
                  <Menu.Item key="New SP">
                    <Link
                      to="/purchasing/newsplist"
                      style={{ textDecoration: "none" }}
                    >
                      {/* <i className="icon icon-widgets" />
                       */}
                      <FileProtectOutlined style={{ fontSize: "20px" }} />
                      <span style={{ fontWeight: "bold", color: "white" }}>
                        <IntlMessages id="Approve SP" />
                      </span>
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="SP List">
                    <Link
                      to="/masterdata/splist"
                      style={{ textDecoration: "none" }}
                    >
                      {/* <i className="icon icon-widgets" />
                       */}
                      <FileTextOutlined style={{ fontSize: "20px" }} />
                      <span style={{ fontWeight: "bold", color: "white" }}>
                        <IntlMessages id="SP List" />
                      </span>
                    </Link>
                  </Menu.Item>
                  <div
                    className="d-flex justify-content-center"
                    style={{ backgroundColor: "#0c2197", height: "20%" }}
                  >
                    <h6 style={{ color: "white" }} className="mt-1">
                      Menu SJ
                    </h6>
                  </div>
                  <Menu.Item key="SJ List">
                    <Link
                      to="/masterdata/sjlist"
                      style={{ textDecoration: "none" }}
                    >
                      {/* <i className="icon icon-widgets" />
                       */}
                      <FolderOpenOutlined style={{ fontSize: "20px" }} />
                      <span style={{ fontWeight: "bold", color: "white" }}>
                        <IntlMessages id="SJ List" />
                      </span>
                    </Link>
                  </Menu.Item>
                  <div
                    className="d-flex justify-content-center"
                    style={{ backgroundColor: "#0c2197", height: "20%" }}
                  >
                    <h6 style={{ color: "white" }} className="mt-1">
                      Master
                    </h6>
                  </div>
                  <Menu.Item key="driverpurch">
                    <Link
                      to="/masterdata/purchasing/driver"
                      style={{ textDecoration: "none" }}
                    >
                      {/* <i className="icon icon-widgets" />
                       */}
                      <CarOutlined style={{ fontSize: "20px" }} />
                      <span style={{ fontWeight: "bold", color: "white" }}>
                        <IntlMessages id="Master Driver" />
                      </span>
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="Master Mitra">
                    <Link to="/mastermitra" style={{ textDecoration: "none" }}>
                      {/* <i className="icon icon-widgets" />
                       */}
                      <ShopOutlined style={{ fontSize: "20px" }} />
                      <span style={{ fontWeight: "bold", color: "white" }}>
                        Master Mitra
                      </span>
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="vehiclepurch">
                    <Link
                      to="/masterdata/purchasing/vehicle"
                      style={{ textDecoration: "none" }}
                    >
                      {/* <i className="icon icon-heart" /> */}
                      <FundViewOutlined style={{ fontSize: "20px" }} />
                      <span style={{ fontWeight: "bold", color: "white" }}>
                        <IntlMessages id="Master Vehicle" />
                      </span>
                    </Link>
                  </Menu.Item>
                  <div
                    className="d-flex justify-content-center"
                    style={{ backgroundColor: "#0c2197", height: "20%" }}
                  >
                    <h6 style={{ color: "white" }} className="mt-1">
                      Tarif
                    </h6>
                  </div>
                  <Menu.Item key="Tarif Mitra">
                    <Link to="/tarifmitra" style={{ textDecoration: "none" }}>
                      {/* <i className="icon icon-widgets" />
                       */}
                      <DollarOutlined style={{ fontSize: "20px" }} />
                      <span style={{ fontWeight: "bold", color: "white" }}>
                        Tarif Mitra
                      </span>
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="Tarif Eureka" disabled>
                    <Link to="/tarif_eureka" style={{ textDecoration: "none" }}>
                      {/* <i className="icon icon-widgets" /> */}
                      <DollarOutlined style={{ fontSize: "20px" }} />
                      <span style={{ fontWeight: "bold", color: "white" }}>
                        Tarif Eureka
                      </span>
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="Tarif Customer" disabled>
                    <Link
                      to="/pelanggantarif"
                      style={{ textDecoration: "none" }}
                    >
                      <DollarOutlined style={{ fontSize: "20px" }} />
                      <span style={{ fontWeight: "bold", color: "white" }}>
                        Tarif Customer
                      </span>
                    </Link>
                  </Menu.Item>
                </Menu.ItemGroup>
              ) : null}


              {/* ////Login Race///// */}
              {jobdesk == "emc" && (
                <Menu.Item key="Dashboard">
                  <Link to="/admin/race" style={{ textDecoration: "none" }}>
                    {/* <i className="icon icon-widgets" />
                       */}
                    <AppstoreOutlined style={{ fontSize: "20px" }} />
                    <span style={{ fontWeight: "bold", color: "white" }}>
                    Dashboard
                    </span>
                  </Link>
                </Menu.Item>
              )}
              {/* ////Login Race///// */}
              {jobdesk == "rcadmin" && (
                <Menu.Item key="Dashboard">
                  <Link to="/admin/race" style={{ textDecoration: "none" }}>
                    {/* <i className="icon icon-widgets" />
                       */}
                    <AppstoreOutlined style={{ fontSize: "20px" }} />
                    <span style={{ fontWeight: "bold", color: "white" }}>
                    Dashboard 
                    </span>
                  </Link>
                </Menu.Item>
              )}
            </MenuItemGroup>
          </Menu>
        </CustomScrollbars>
      </div>
    </>
  );
};

export default React.memo(SidebarContent);
