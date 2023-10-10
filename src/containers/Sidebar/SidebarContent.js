import React, { useEffect, useState } from "react";
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
import logorace from "../../assets/img/locorace.png";
import logodashboard from "../../assets/img/icondashoardrace.png";
import historyrace from "../../assets/img/historyrace.png";
import splistrace from "../../assets/img/sprace.png";
import perbaikanrace from "../../assets/img/perbaikanrace.png";
import vehiclerace from "../../assets/img/vehicle.png";
import emergencyrace from "../../assets/img/emergencyrace.png";
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
  UsergroupAddOutlined,
  UserSwitchOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
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
  const createuserbaru = () => {
    history.push(`/akunting/usernew`);
  };
  const menuBackgroundColor = jobdesk === "rcadmin" ? "#F05423" : "#BAD6FF";
  const location = useLocation();
  const [activeMenu, setActiveMenu] = useState(location.pathname);

  useEffect(() => {
    setActiveMenu(location.pathname);
  }, [location]);
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
            {jobdesk != "rcadmin" ? (
              <Col span={24} className="d-flex justify-content-center">
                <Avatar
                  src={`https://avatars.githubusercontent.com/u/130539563?s=200&v=4`}
                  className="gx-size-60 gx-pointer gx-mr-3"
                  alt=""
                />
                <div >
                  <b style={{ color: "black" }}>
                    {jobdesk}
                  </b>
                  <p style={{ color: "black", fontWeight: 'bold' }}>{fullname}</p>
                </div>
              </Col>
            ) : (
              <Col span={24} className="d-flex justify-content-center">
                <img
                  src={logorace}
                  // style={{ width: '100%' }}
                  className=" gx-pointer gx-mr-3"
                  alt=""
                />
              </Col>
            )}
            {/* {jobdesk != "rcadmin" && (
              <Col span={24} className="d-flex justify-content-center">
                <b style={{ color: "black" }} className="mt-3">
                  {" "}
                  {jobdesk} , {fullname}
                </b>
              </Col>
            )} */}
          </Row>
        </div>
        <CustomScrollbars className="gx-layout-sider-scrollbar">
          <Menu
            defaultOpenKeys={[defaultOpenKeys]}
            selectedKeys={[selectedKeys]}
            style={{ backgroundColor: menuBackgroundColor }}
            theme={themeType === LIGHT_PURPLE ? "lite" : "dark"}
            mode="inline"
          >
            <MenuItemGroup key="main">
              {jobdesk === "sales" ? (
                <div className="d-flex justify-content-center gx-sidebar-content w-100  text-center ">
                  <Button
                    size="lg"
                    style={{
                      width: 180,
                      backgroundColor: "#113D7F",
                      color: "white",
                    }}
                    className="d-flex align-items-center justify-content-center"
                    onClick={() => createsp()}
                  >
                    Tambah SP
                  </Button>
                </div>
              ) : (
                <></>
              )}
              {jobdesk === "akunting" ? (
                <>
                  {/* <div className="d-flex justify-content-center gx-sidebar-content w-100  text-center ">
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
                  </div> */}
                  <div className="d-flex justify-content-center gx-sidebar-content w-100 mt-5 text-center ">
                    <Button
                      size="lg"
                      style={{
                        width: 180,
                        color: "white",
                        marginTop: "-35px",
                        backgroundColor: "#113D7F",
                        color: "white",
                      }}
                      className="d-flex align-items-center justify-content-center"
                      onClick={() => createuserbaru()}
                    >
                      ADD USER BARU
                    </Button>
                  </div>
                </>
              ) : (
                <></>
              )}

              {/* {jobdesk == "webmaster" && (
                <MenuItemGroup key="main" >
                  <Menu.Item key="Dashboard" className={activeMenu === "/dashboard" ? "menu-item-active menu-item-hover" : "menu-item-hover"}>
                    <Link to="/dashboard" style={{ textDecoration: "none" }}>

                      <AppstoreOutlined style={{ fontSize: "30px", color: 'white', marginBottom: '8px' }} />
                      <span style={{ fontWeight: "bold", color: "black" }}>
                        <IntlMessages id="Dashboard" />
                      </span>
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="List User" className={activeMenu === "/ListDataUsersss" ? "menu-item-active menu-item-hover" : "menu-item-hover"}>
                    <Link to="/ListDataUsersss" style={{ textDecoration: "none" }}>

                      <UsergroupAddOutlined style={{ fontSize: "30px", color: 'white', marginBottom: '8px' }} />
                      <span style={{ fontWeight: "bold", color: "black" }}>
                        <IntlMessages id="List User" />
                      </span>
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="Data User" className={activeMenu === "/DataMenu" ? "menu-item-active menu-item-hover" : "menu-item-hover"}>
                    <Link to="/DataMenu" style={{ textDecoration: "none" }}>

                      <UserOutlined style={{ fontSize: "30px", color: 'white', marginBottom: '8px' }} />
                      <span style={{ fontWeight: "bold", color: "black" }}>
                        <IntlMessages id="Data User" />
                      </span>
                    </Link>
                  </Menu.Item>
                </MenuItemGroup>
              )} */}

              {jobdesk == "sales" && (
                <MenuItemGroup key="main">
                  <Menu.Item
                    key="Dashboard"
                    className={
                      activeMenu === "/dashboard"
                        ? "menu-item-active menu-item-hover"
                        : "menu-item-hover"
                    }
                  >
                    <Link to="/dashboard" style={{ textDecoration: "none" }}>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <AppstoreOutlined
                          style={{
                            fontSize: "30px",
                            color: "black",
                            marginBottom: "8px",
                            marginTop: "10px",
                          }}
                        />
                        <span
                          style={{
                            fontWeight: "bold",
                            color: "black",
                            marginLeft: "8px",
                          }}
                        >
                          <IntlMessages id="Dashboard" />
                        </span>
                      </div>
                    </Link>
                  </Menu.Item>
                  <div
                    className="d-flex justify-content-start"
                  // style={{
                  //   backgroundColor: "#0c2197",
                  //   height: "20%",
                  //   marginRight: "20px",
                  //   marginLeft: "20px",
                  //   borderRadius: "10px",
                  // }}
                  >
                    <h6
                      style={{
                        color: "#0c2197",
                        textDecoration: "underline",
                        paddingLeft: "40px",
                      }}
                      className="mt-3 mb-3"
                    >
                      Pesanan
                    </h6>
                  </div>
                  <Menu.Item
                    key="SP List"
                    className={
                      activeMenu === "/masterdata/marketing/splist"
                        ? "menu-item-active menu-item-hover"
                        : "menu-item-hover"
                    }
                  >
                    <Link

                      to="/masterdata/marketing/splist"
                      style={{ textDecoration: "none" }}
                    >
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <FileTextOutlined
                          style={{
                            fontSize: "30px",
                            color: "black",
                            marginBottom: "8px",
                            marginTop: "10px",
                          }}
                        />
                        <span
                          style={{
                            fontWeight: "bold",
                            color: "black",
                            marginLeft: "8px",
                          }}
                        >
                          <IntlMessages id="SP List" />
                        </span>
                      </div>
                    </Link>
                  </Menu.Item>
                  <Menu.Item
                    key="Cancel SP List"
                    className={
                      activeMenu === "/masterdata/marketing/cancelsplist"
                        ? "menu-item-active menu-item-hover"
                        : "menu-item-hover"
                    }
                  >
                    <Link
                      to="/masterdata/marketing/cancelsplist"
                      style={{ textDecoration: "none" }}
                    >
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <FileExcelOutlined
                          style={{
                            fontSize: "30px",
                            color: "black",
                            marginBottom: "8px",
                            marginTop: "10px",
                          }}
                        />
                        <span
                          style={{
                            fontWeight: "bold",
                            color: "black",
                            marginLeft: "8px",
                          }}
                        >
                          <IntlMessages id="Cancel SP List" />
                        </span>
                      </div>
                    </Link>
                  </Menu.Item>
                  <div
                    className="d-flex justify-content-start"
                  // style={{
                  //   backgroundColor: "#0c2197",
                  //   height: "20%",
                  //   marginRight: "20px",
                  //   marginLeft: "20px",
                  //   borderRadius: "10px",
                  // }}
                  >
                    <h6
                      style={{
                        color: "#0c2197",
                        textDecoration: "underline",
                        paddingLeft: "40px",
                      }}
                      className="mt-3 mb-3 "
                    >
                      Master
                    </h6>
                  </div>
                  <Menu.Item
                    key="MasterCustomer"
                    className={
                      activeMenu === "/ReportCustomer"
                        ? "menu-item-active menu-item-hover"
                        : "menu-item-hover"
                    }
                  >
                    <Link
                      to="/ReportCustomer"
                      style={{ textDecoration: "none" }}
                    >
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <UserSwitchOutlined
                          style={{
                            fontSize: "30px",
                            color: "black",
                            marginBottom: "8px",
                            marginTop: "10px",
                          }}
                        />
                        <span
                          style={{
                            fontWeight: "bold",
                            color: "black",
                            marginLeft: "8px",
                          }}
                        >
                          Report Customer
                        </span>
                      </div>
                    </Link>
                  </Menu.Item>
                  <Menu.Item
                    key="Data Wilayah"
                    className={
                      activeMenu === "/mastercustomersss"
                        ? "menu-item-active menu-item-hover"
                        : "menu-item-hover"
                    }
                  >
                    <Link
                      to="/mastercustomersss"
                      style={{ textDecoration: "none" }}
                    >
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <UserOutlined
                          style={{
                            fontSize: "30px",
                            color: "black",
                            marginBottom: "8px",
                            marginTop: "10px",
                          }}
                        />
                        <span
                          style={{
                            fontWeight: "bold",
                            color: "black",
                            marginLeft: "8px",
                          }}
                        >
                          Customer
                        </span>
                      </div>
                    </Link>
                  </Menu.Item>
                  <Menu.Item
                    key="Alamat Customer"
                    className={
                      activeMenu === "/alamatcustomer"
                        ? "menu-item-active menu-item-hover"
                        : "menu-item-hover"
                    }
                  >
                    <Link
                      to="/alamatcustomer"
                      style={{ textDecoration: "none" }}
                    >
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <ProfileOutlined
                          style={{
                            fontSize: "30px",
                            color: "black",
                            marginBottom: "8px",
                            marginTop: "10px",
                          }}
                        />
                        <span
                          style={{
                            fontWeight: "bold",
                            color: "black",
                            marginLeft: "8px",
                          }}
                        >
                          Alamat Customer
                        </span>
                      </div>
                    </Link>
                  </Menu.Item>
                  <Menu.Item
                    key="Alamat Invoice"
                    className={
                      activeMenu === "/invoicecustomer"
                        ? "menu-item-active menu-item-hover"
                        : "menu-item-hover"
                    }
                  >
                    <Link
                      to="/invoicecustomer"
                      style={{ textDecoration: "none" }}
                    >
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <FileProtectOutlined
                          style={{
                            fontSize: "30px",
                            color: "black",
                            marginBottom: "8px",
                            marginTop: "10px",
                          }}
                        />
                        <span
                          style={{
                            fontWeight: "bold",
                            color: "black",
                            marginLeft: "8px",
                          }}
                        >
                          Alamat Invoice
                        </span>
                      </div>
                      {/* <span style={{ fontWeight: "bold",  color: 'white' }}>Data Alamat All</span> */}
                    </Link>
                  </Menu.Item>
                  <Menu.Item
                    key="Cari Tarif"
                    className={
                      activeMenu === "/CariTarif"
                        ? "menu-item-active menu-item-hover"
                        : "menu-item-hover"
                    }
                  >
                    <Link to="/CariTarif" style={{ textDecoration: "none" }}>
                      {/* <i className="icon icon-widgets" /> */}
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <DollarOutlined
                          style={{
                            fontSize: "30px",
                            color: "black",
                            marginBottom: "8px",
                            marginTop: "10px",
                          }}
                        />
                        <span
                          style={{
                            fontWeight: "bold",
                            color: "black",
                            marginLeft: "8px",
                          }}
                        >
                          Cari Tarif
                        </span>
                      </div>
                    </Link>
                  </Menu.Item>
                  <Menu.Item
                    key="Tarif Customer"
                    className={
                      activeMenu === "/pelanggantarif"
                        ? "menu-item-active menu-item-hover"
                        : "menu-item-hover"
                    }
                  >
                    <Link
                      to="/pelanggantarif"
                      style={{ textDecoration: "none" }}
                    >
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <DollarOutlined
                          style={{
                            fontSize: "30px",
                            color: "black",
                            marginBottom: "8px",
                            marginTop: "10px",
                          }}
                        />
                        <span
                          style={{
                            fontWeight: "bold",
                            color: "black",
                            marginLeft: "8px",
                          }}
                        >
                          Tarif Customer
                        </span>
                      </div>
                    </Link>
                  </Menu.Item>
                  <div
                    className="d-flex justify-content-start"
                  // style={{
                  //   backgroundColor: "#0c2197",
                  //   height: "20%",
                  //   marginRight: "20px",
                  //   marginLeft: "20px",
                  //   borderRadius: "10px",
                  // }}
                  >
                    <h6
                      style={{
                        color: "#0c2197",
                        textDecoration: "underline",
                        paddingLeft: "40px",
                      }}
                      className="mt-3 mb-3 "
                    >
                      Lain - Lain
                    </h6>
                  </div>
                  <Menu.Item
                    disabled
                    key="monitoringVehicle"
                    className={
                      activeMenu === "/masterdata/monitoring"
                        ? "menu-item-active menu-item-hover"
                        : "menu-item-hover"
                    }
                  >
                    <Link
                      to="/masterdata/monitoring"
                      style={{ textDecoration: "none" }}
                    >
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <VideoCameraOutlined
                          style={{
                            fontSize: "30px",
                            color: "black",
                            marginBottom: "8px",
                            marginTop: "10px",
                          }}
                        />
                        <span
                          style={{
                            fontWeight: "bold",
                            color: "black",
                            marginLeft: "8px",
                          }}
                        >
                          <IntlMessages id="Monitoring Vehicle" />
                        </span>
                      </div>
                    </Link>
                  </Menu.Item>
                </MenuItemGroup>
              )}
              {jobdesk == "operasional" && (
                <Menu.ItemGroup key="master">
                  <Menu.Item
                    key="Dashboard"
                    className={
                      activeMenu === "/dashboard"
                        ? "menu-item-active menu-item-hover"
                        : "menu-item-hover"
                    }
                  >
                    <Link to="/dashboard" style={{ textDecoration: "none" }}>
                      {/* <i className="icon icon-widgets" />
                       */}
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <AppstoreOutlined
                          style={{
                            fontSize: "30px",
                            color: "black",
                            marginBottom: "8px",
                            marginTop: "10px",
                          }}
                        />
                        <span
                          style={{
                            fontWeight: "bold",
                            color: "black",
                            marginLeft: "8px",
                          }}
                        >
                          <IntlMessages id="Dashboard" />
                        </span>
                      </div>
                    </Link>
                  </Menu.Item>
                  <div
                    className="d-flex justify-content-start"
                    style={{
                      height: "20%",
                      marginRight: "20px",
                      marginLeft: "40px",
                      borderRadius: "10px",
                    }}
                  >
                    <h6
                      style={{ color: "#0c2197", textDecoration: "underline" }}
                      className="mt-3 mb-3"
                    >
                      Driver
                    </h6>
                  </div>
                  <Menu.Item
                    key="driver"
                    className={
                      activeMenu === "/masterdata/purchasing/driver"
                        ? "menu-item-active menu-item-hover"
                        : "menu-item-hover"
                    }
                  >
                    <Link
                      to="/masterdata/purchasing/driver"
                      style={{ textDecoration: "none" }}
                    >
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <SmileTwoTone
                          style={{
                            fontSize: "30px",
                            color: "black",
                            marginBottom: "8px",
                            marginTop: "10px",
                          }}
                        />
                        <span
                          style={{
                            fontWeight: "bold",
                            color: "black",
                            marginLeft: "8px",
                          }}
                        >
                          <IntlMessages id="sidebar.driver" />
                        </span>
                      </div>
                    </Link>
                  </Menu.Item>
                  <Menu.Item
                    disabled
                    key="DriverMap"
                    className={
                      activeMenu === "/masterdata/monitoring"
                        ? "menu-item-active menu-item-hover"
                        : "menu-item-hover"
                    }
                  >
                    <Link
                      to="/masterdata/monitoring"
                      style={{ textDecoration: "none" }}
                    >
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <CarTwoTone
                          style={{
                            fontSize: "30px",
                            color: "black",
                            marginBottom: "8px",
                            marginTop: "10px",
                          }}
                        />
                        <span
                          style={{
                            fontWeight: "bold",
                            color: "black",
                            marginLeft: "8px",
                          }}
                        >
                          <IntlMessages id="Driver Map" />
                        </span>
                      </div>
                    </Link>
                  </Menu.Item>
                  <Menu.Item
                    disabled
                    key="DriverEmc"
                    className={
                      activeMenu === "/masterdata/monitoring"
                        ? "menu-item-active menu-item-hover"
                        : "menu-item-hover"
                    }
                  >
                    <Link
                      to="/masterdata/monitoring"
                      style={{ textDecoration: "none" }}
                    >
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <CarTwoTone
                          style={{
                            fontSize: "30px",
                            color: "black",
                            marginBottom: "8px",
                            marginTop: "10px",
                          }}
                        />
                        <span
                          style={{
                            fontWeight: "bold",
                            color: "black",
                            marginLeft: "8px",
                          }}
                        >
                          <IntlMessages id="Driver Emc" />
                        </span>
                      </div>
                      {/* <i className="icon icon-widgets" /> */}
                    </Link>
                  </Menu.Item>
                  <div
                    className="d-flex justify-content-start"
                    style={{
                      height: "20%",
                      marginRight: "20px",
                      marginLeft: "20px",
                      borderRadius: "10px",
                    }}
                  >
                    <h6
                      style={{ color: "#0c2197", textDecoration: "underline" }}
                      className="mt-3 mb-3 mx-4"
                    >
                      Menu SP
                    </h6>
                  </div>
                  <Menu.Item

                    key="waiting SP List"
                    className={
                      activeMenu === "/masterdata/newsplist"
                        ? "menu-item-active menu-item-hover"
                        : "menu-item-hover"
                    }
                  >
                    <Link
                      to="/masterdata/newsplist"
                      style={{ textDecoration: "none" }}
                    >
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <ProfileTwoTone
                          style={{
                            fontSize: "30px",
                            color: "black",
                            marginBottom: "8px",
                            marginTop: "10px",
                          }}
                        />
                        <span
                          style={{
                            fontWeight: "bold",
                            color: "black",
                            marginLeft: "8px",
                          }}
                        >
                          <IntlMessages id="Waiting SP" />
                        </span>
                      </div>
                    </Link>
                  </Menu.Item>
                  {/* <Menu.Item key="New SP" className={activeMenu === "/masterdata/newsplist" ? "menu-item-active menu-item-hover" : "menu-item-hover"} >
                    <Link
                      to="/masterdata/newsplist"
                      style={{ textDecoration: "none" }}
                    >
                      <CheckSquareTwoTone style={{ fontSize: "30px", color: 'white',  marginBottom: '7px' }} />
                      <span style={{ fontWeight: "bold", color: "black" }}>
                        <IntlMessages id="Approve SP" />
                      </span>
                    </Link>
                  </Menu.Item> */}
                  <Menu.Item
                    key="SP List"
                    className={
                      activeMenu === "/masterdata/splist"
                        ? "menu-item-active menu-item-hover"
                        : "menu-item-hover"
                    }
                  >
                    <Link
                      to="/masterdata/splist"
                      style={{ textDecoration: "none" }}
                    >
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <ProfileTwoTone
                          style={{
                            fontSize: "30px",
                            color: "black",
                            marginBottom: "8px",
                            marginTop: "10px",
                          }}
                        />
                        <span
                          style={{
                            fontWeight: "bold",
                            color: "black",
                            marginLeft: "8px",
                          }}
                        >
                          <IntlMessages id="SP List" />
                        </span>
                      </div>
                    </Link>
                  </Menu.Item>
                  <div
                    className="d-flex justify-content-start"
                    style={{
                      height: "20%",
                      marginRight: "20px",
                      marginLeft: "20px",
                      borderRadius: "10px",
                    }}
                  >
                    <h6
                      style={{ color: "#0c2197", textDecoration: "underline" }}
                      className="mt-3 mb-3 mx-4"
                    >
                      Vehicle
                    </h6>
                  </div>

                  <Menu.Item
                    key="VehicleMap"
                    disabled
                    className={
                      activeMenu === "/masterdata/monitoring"
                        ? "menu-item-active menu-item-hover"
                        : "menu-item-hover"
                    }
                  >
                    <Link
                      to="/masterdata/monitoring"
                      style={{ textDecoration: "none" }}
                    >
                      {/* <i className="icon icon-widgets" /> */}
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <EnvironmentTwoTone
                          style={{
                            fontSize: "30px",
                            color: "black",
                            marginBottom: "8px",
                            marginTop: "10px",
                          }}
                        />
                        <span
                          style={{
                            fontWeight: "bold",
                            color: "black",
                            marginLeft: "8px",
                          }}
                        >
                          <IntlMessages id="Vehicle Map" />
                        </span>
                      </div>
                    </Link>
                  </Menu.Item>
                  <Menu.Item
                    key="vehicle"
                    className={
                      activeMenu === "/masterdata/vehicle"
                        ? "menu-item-active menu-item-hover"
                        : "menu-item-hover"
                    }
                  >
                    <Link
                      to="/masterdata/vehicle"
                      style={{ textDecoration: "none" }}
                    >
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <CarTwoTone
                          style={{
                            fontSize: "30px",
                            color: "black",
                            marginBottom: "8px",
                            marginTop: "10px",
                          }}
                        />
                        <span
                          style={{
                            fontWeight: "bold",
                            color: "black",
                            marginLeft: "8px",
                          }}
                        >
                          <IntlMessages id="sidebar.vehicle" />
                        </span>
                      </div>
                    </Link>
                  </Menu.Item>
                  <Menu.Item
                    disabled
                    key="monitoringVehicle"
                    className={
                      activeMenu === "/masterdata/monitoring"
                        ? "menu-item-active menu-item-hover"
                        : "menu-item-hover"
                    }
                  >
                    <Link
                      to="/masterdata/monitoring"
                      style={{ textDecoration: "none" }}
                    >
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <ScheduleTwoTone
                          style={{
                            fontSize: "30px",
                            color: "black",
                            marginBottom: "8px",
                            marginTop: "10px",
                          }}
                        />
                        <span
                          style={{
                            fontWeight: "bold",
                            color: "black",
                            marginLeft: "8px",
                          }}
                        >
                          <IntlMessages id="Monitoring Vehicle" />
                        </span>
                      </div>
                    </Link>
                  </Menu.Item>
                  <Menu.Item
                    key="monitoring"
                    className={
                      activeMenu === "/monitoringSJ"
                        ? "menu-item-active menu-item-hover"
                        : "menu-item-hover"
                    }
                  >
                    <Link to="/monitoringSJ" style={{ textDecoration: "none" }}>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <ScheduleTwoTone
                          style={{
                            fontSize: "30px",
                            color: "black",
                            marginBottom: "8px",
                            marginTop: "10px",
                          }}
                        />
                        <span
                          style={{
                            fontWeight: "bold",
                            color: "black",
                            marginLeft: "8px",
                          }}
                        >
                          <IntlMessages id="Monitoring SJ" />
                        </span>
                      </div>
                    </Link>
                  </Menu.Item>
                  <Menu.Item
                    key="monitoringKiriman"
                    className={
                      activeMenu === "/monitoringReportKiriman"
                        ? "menu-item-active menu-item-hover"
                        : "menu-item-hover"
                    }
                  >
                    <Link
                      to="/monitoringReportKiriman"
                      style={{ textDecoration: "none" }}
                    >
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <ScheduleTwoTone
                          style={{
                            fontSize: "30px",
                            color: "black",
                            marginBottom: "8px",
                            marginTop: "10px",
                          }}
                        />
                        <span
                          style={{
                            fontWeight: "bold",
                            color: "black",
                            marginLeft: "8px",
                          }}
                        >
                          <IntlMessages id="Report Kiriman" />
                        </span>
                      </div>
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
                    <Menu.Item
                      key="Dashboard"
                      className={
                        activeMenu === "/dashboard"
                          ? "menu-item-active menu-item-hover"
                          : "menu-item-hover"
                      }
                    >
                      <Link to="/dashboard" style={{ textDecoration: "none" }}>
                        {/* <i className="icon icon-widgets" />
                         */}
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <AppstoreOutlined
                            style={{
                              fontSize: "30px",
                              color: "black",
                              marginBottom: "8px",
                              marginTop: "10px",
                            }}
                          />
                          <span
                            style={{
                              fontWeight: "bold",
                              color: "black",
                              marginLeft: "8px",
                            }}
                          >
                            <IntlMessages id="Dashboard" />
                          </span>
                        </div>
                      </Link>
                    </Menu.Item>
                    <div
                      className="d-flex justify-content-start"
                      style={{
                        height: "20%",
                        marginRight: "20px",
                        marginLeft: "20px",
                        borderRadius: "10px",
                      }}
                    >
                      <h6
                        style={{
                          color: "#0c2197",
                          textDecoration: "underline",
                        }}
                        className="mt-3 mb-3 mx-4"
                      >
                        Menu SP
                      </h6>
                    </div>
                    <Menu.Item
                      key="SP Lists"
                      className={
                        activeMenu === "/akunting/splistwaitingakunting"
                          ? "menu-item-active menu-item-hover"
                          : "menu-item-hover"
                      }
                    >
                      <Link
                        to="/akunting/splistwaitingakunting"
                        style={{ textDecoration: "none" }}
                      >
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <FileProtectOutlined
                            style={{
                              fontSize: "30px",
                              color: "black",
                              marginBottom: "8px",
                              marginTop: "10px",
                            }}
                          />
                          <span
                            style={{
                              fontWeight: "bold",
                              color: "black",
                              marginLeft: "8px",
                            }}
                          >
                            Waiting Approve SP
                          </span>
                        </div>
                      </Link>
                    </Menu.Item>
                    <Menu.Item
                      key="SP Lists All"
                      className={
                        activeMenu === "/akunting/splistakuntingbaru"
                          ? "menu-item-active menu-item-hover"
                          : "menu-item-hover"
                      }
                    >
                      <Link
                        to="/akunting/splistakuntingbaru"
                        style={{ textDecoration: "none" }}
                      >
                        {" "}
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <FileProtectOutlined
                            style={{
                              fontSize: "30px",
                              color: "black",
                              marginBottom: "8px",
                              marginTop: "10px",
                            }}
                          />
                          <span
                            style={{
                              fontWeight: "bold",
                              color: "black",
                              marginLeft: "8px",
                            }}
                          >
                            SP List All
                          </span>
                        </div>
                      </Link>
                    </Menu.Item>

                    <Menu.Item
                      key="Approve SP"
                      className={
                        activeMenu === "/approvesplistall"
                          ? "menu-item-active menu-item-hover"
                          : "menu-item-hover"
                      }
                    >
                      <Link
                        to="/approvesplistall"
                        style={{ textDecoration: "none" }}
                      >
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <FileProtectOutlined
                            style={{
                              fontSize: "30px",
                              color: "black",
                              marginBottom: "8px",
                              marginTop: "10px",
                            }}
                          />
                          <span
                            style={{
                              fontWeight: "bold",
                              color: "black",
                              marginLeft: "8px",
                            }}
                          >
                            List Approve All SP
                          </span>
                        </div>
                      </Link>
                    </Menu.Item>
                  </Menu.ItemGroup>
                  {/* <div
                    className="d-flex justify-content-start"
                    style={{ backgroundColor: "#0c2197", height: "20%", marginRight: '20px', marginLeft: '20px' , borderRadius: '10px' }}
                  >
                    <h6 style={{ color: "white" }} className="mt-3 mb-3 mx-4" >
                      Tarif
                    </h6>
                  </div>
                  <Menu.Item key="Tarif Customer" className={activeMenu === "/pelanggantarif" ? "menu-item-active menu-item-hover" : "menu-item-hover"}>
                    <Link
                      to="/pelanggantarif"
                      style={{ textDecoration: "none" }}
                    >
                      <DollarOutlined style={{ fontSize: "30px", color: 'white',  marginBottom: '8px' }} />
                      <span style={{ fontWeight: "bold", color: "black" }}>
                        Tarif Customer
                      </span>
                    </Link>
                  </Menu.Item> 
                  <Menu.Item disabled key="Tarif Eureka" >
                    <Link to="/tarif_eureka" style={{ textDecoration: "none" }}>
                      <DollarOutlined style={{ fontSize: "30px", color: 'white',  marginBottom: '7px' }} />
                      <span style={{ fontWeight: "bold", color: "black" }}>
                        Tarif Eureka
                      </span>
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="Tarif Mitra" disabled>

                    <Link to="/tarifmitra" style={{ textDecoration: "none" }}>
                      <DollarOutlined style={{ fontSize: "30px", color: 'white',  marginBottom: '7px' }} />
                      <span style={{ fontWeight: "bold", color: "black" }}>
                        Tarif Mitra
                      </span>
                    </Link>
                  </Menu.Item> */}
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
                    style={{ backgroundColor: "#0c2197", height: "20%", marginRight: '20px', marginLeft: '20px' , borderRadius: '10px' }}
                  >
                    <h6 style={{ color: "white" }} className="mt-3 mb-3 mx-4" >
                      Menu AR
                    </h6>
                  </div>
                  <Menu.Item key="AR List ALL">
                    <Link
                      to="/akunting/ar/ar"
                      style={{ textDecoration: "none" }}
                    >
                      <i className="icon icon-widgets" />
                      <span style={{ fontWeight: "bold", color: "black" }}>
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
                      <span style={{ fontWeight: "bold", color: "black" }}>
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
                      <span style={{ fontWeight: "bold", color: "black" }}>
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
                      <span style={{ fontWeight: "bold", color: "black" }}>
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
                      <span style={{ fontWeight: "bold", color: "black" }}>
                        Report Pembayaran Customer
                      </span>
                    </Link>
                  </Menu.Item> */}

                  <div
                    className="d-flex justify-content-start"
                    style={{
                      height: "20%",
                      marginRight: "20px",
                      marginLeft: "20px",
                      borderRadius: "10px",
                    }}
                  >
                    <h6
                      style={{ color: "#0c2197", textDecoration: "underline" }}
                      className="mt-3 mb-3 mx-4"
                    >
                      Payment
                    </h6>
                  </div>

                  <Menu.Item
                    disabled
                    key="Penerimaan INV"
                    className={
                      activeMenu ===
                        "/akunting/ar/reportpartners/reportpenerimaaninvoice"
                        ? "menu-item-active menu-item-hover"
                        : "menu-item-hover"
                    }
                  >
                    <Link
                      to="/akunting/ar/reportpartners/reportpenerimaaninvoice"
                      style={{ textDecoration: "none" }}
                    >
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <AppstoreOutlined
                          style={{
                            fontSize: "30px",
                            color: "black",
                            marginBottom: "8px",
                            marginTop: "10px",
                          }}
                        />
                        <span
                          style={{
                            fontWeight: "bold",
                            color: "black",
                            marginLeft: "8px",
                          }}
                        >
                          Penerimaan INV
                        </span>
                      </div>
                    </Link>
                  </Menu.Item>

                  <div
                    className="d-flex justify-content-start"
                    style={{
                      backgroundColor: "",
                      height: "20%",
                      marginRight: "20px",
                      marginLeft: "20px",
                      borderRadius: "10px",
                    }}
                  >
                    <h6
                      style={{ color: "#0c2197", textDecoration: "underline" }}
                      className="mt-3 mb-3 mx-4"
                    >
                      Data Wilayah
                    </h6>
                  </div>

                  <Menu.Item
                    key="Master Kecamatan"
                    className={
                      activeMenu === "/masterkecamatan"
                        ? "menu-item-active menu-item-hover"
                        : "menu-item-hover"
                    }
                  >
                    <Link
                      to="/masterkecamatan"
                      style={{ textDecoration: "none" }}
                    >
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <AppstoreOutlined
                          style={{
                            fontSize: "30px",
                            color: "black",
                            marginBottom: "8px",
                            marginTop: "10px",
                          }}
                        />
                        <span
                          style={{
                            fontWeight: "bold",
                            color: "black",
                            marginLeft: "8px",
                          }}
                        >
                          Data Kecamatan
                        </span>
                      </div>
                    </Link>
                  </Menu.Item>
                  <Menu.Item
                    key="Master Kota"
                    className={
                      activeMenu === "/masterkota"
                        ? "menu-item-active menu-item-hover"
                        : "menu-item-hover"
                    }
                  >
                    <Link to="/masterkota" style={{ textDecoration: "none" }}>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <AppstoreOutlined
                          style={{
                            fontSize: "30px",
                            color: "black",
                            marginBottom: "8px",
                            marginTop: "10px",
                          }}
                        />
                        <span
                          style={{
                            fontWeight: "bold",
                            color: "black",
                            marginLeft: "8px",
                          }}
                        >
                          Data Kota
                        </span>
                      </div>
                    </Link>
                  </Menu.Item>
                  <Menu.Item
                    key="Master Provinsi"
                    className={
                      activeMenu === "/masterprovinsi"
                        ? "menu-item-active menu-item-hover"
                        : "menu-item-hover"
                    }
                  >
                    <Link
                      to="/masterprovinsi"
                      style={{ textDecoration: "none" }}
                    >
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <AppstoreOutlined
                          style={{
                            fontSize: "30px",
                            color: "black",
                            marginBottom: "8px",
                            marginTop: "10px",
                          }}
                        />
                        <span
                          style={{
                            fontWeight: "bold",
                            color: "black",
                            marginLeft: "8px",
                          }}
                        >
                          Data Provinsi
                        </span>
                      </div>
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
                    className="d-flex justify-content-start"
                    style={{
                      height: "20%",
                      marginRight: "20px",
                      marginLeft: "20px",
                      borderRadius: "10px",
                    }}
                  >
                    <h6
                      style={{ color: "#0c2197", textDecoration: "underline" }}
                      className="mt-3 mb-3 mx-4"
                    >
                      Data Tarif
                    </h6>
                  </div>

                  <Menu.Item
                    key="Cari Tarif"
                    className={
                      activeMenu === "/CariTarif"
                        ? "menu-item-active menu-item-hover"
                        : "menu-item-hover"
                    }
                  >
                    <Link to="/CariTarif" style={{ textDecoration: "none" }}>
                      {/* <i className="icon icon-widgets" /> */}
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <DollarOutlined
                          style={{
                            fontSize: "30px",
                            color: "black",
                            marginBottom: "8px",
                            marginTop: "10px",
                          }}
                        />
                        <span
                          style={{
                            fontWeight: "bold",
                            color: "black",
                            marginLeft: "8px",
                          }}
                        >
                          Cari Tarif
                        </span>
                      </div>
                    </Link>
                  </Menu.Item>
                  <Menu.Item
                    key="Tarif Eureka"
                    className={
                      activeMenu === "/tarif_eureka"
                        ? "menu-item-active menu-item-hover"
                        : "menu-item-hover"
                    }
                  >
                    <Link to="/tarif_eureka" style={{ textDecoration: "none" }}>
                      {/* <i className="icon icon-widgets" /> */}
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <DollarOutlined
                          style={{
                            fontSize: "30px",
                            color: "black",
                            marginBottom: "8px",
                            marginTop: "10px",
                          }}
                        />
                        <span
                          style={{
                            fontWeight: "bold",
                            color: "black",
                            marginLeft: "8px",
                          }}
                        >
                          Tarif Eureka
                        </span>
                      </div>
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="Tarif Mitra" disabled>
                    <Link to="/tarifmitra" style={{ textDecoration: "none" }}>
                      {/* <i className="icon icon-widgets" />
                       */}
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <DollarOutlined
                          style={{
                            fontSize: "30px",
                            color: "black",
                            marginBottom: "8px",
                            marginTop: "10px",
                          }}
                        />
                        <span
                          style={{
                            fontWeight: "bold",
                            color: "black",
                            marginLeft: "8px",
                          }}
                        >
                          Tarif Mitra
                        </span>
                      </div>
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="Tarif Customer" disabled>
                    <Link
                      to="/pelanggantarif"
                      style={{ textDecoration: "none" }}
                    >
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <DollarOutlined
                          style={{
                            fontSize: "30px",
                            color: "black",
                            marginBottom: "8px",
                            marginTop: "10px",
                          }}
                        />
                        <span
                          style={{
                            fontWeight: "bold",
                            color: "black",
                            marginLeft: "8px",
                          }}
                        >
                          Tarif Customer
                        </span>
                      </div>
                    </Link>
                  </Menu.Item>

                  <div
                    className="d-flex justify-content-start"
                    style={{
                      height: "20%",
                      marginRight: "20px",
                      marginLeft: "20px",
                      borderRadius: "10px",
                    }}
                  >
                    <h6
                      style={{ color: "#0c2197", textDecoration: "underline" }}
                      className="mt-3 mb-3 mx-4"
                    >
                      Bisnis Employee
                    </h6>
                  </div>

                  <Menu.Item
                    key="Data BU"
                    className={
                      activeMenu === "/DataBUIndex"
                        ? "menu-item-active menu-item-hover"
                        : "menu-item-hover"
                    }
                  >
                    <Link to="/DataBUIndex" style={{ textDecoration: "none" }}>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <UsergroupAddOutlined
                          style={{
                            fontSize: "30px",
                            color: "black",
                            marginBottom: "8px",
                            marginTop: "10px",
                          }}
                        />
                        <span
                          style={{
                            fontWeight: "bold",
                            color: "black",
                            marginLeft: "8px",
                          }}
                        >
                          Data BU
                        </span>
                      </div>
                    </Link>
                  </Menu.Item>
                  <Menu.Item
                    key="Data BU Employee"
                    className={
                      activeMenu === "/DataBuEmployee"
                        ? "menu-item-active menu-item-hover"
                        : "menu-item-hover"
                    }
                  >
                    <Link
                      to="/DataBuEmployee"
                      style={{ textDecoration: "none" }}
                    >
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <UserSwitchOutlined
                          style={{
                            fontSize: "30px",
                            color: "black",
                            marginBottom: "8px",
                            marginTop: "10px",
                          }}
                        />
                        <span
                          style={{
                            fontWeight: "bold",
                            color: "black",
                            marginLeft: "8px",
                          }}
                        >
                          Data BU Employee
                        </span>
                      </div>
                    </Link>
                  </Menu.Item>
                  <Menu.Item
                    key="Data BU Brench"
                    className={
                      activeMenu === "/DataBuBrench"
                        ? "menu-item-active menu-item-hover"
                        : "menu-item-hover"
                    }
                  >
                    <Link to="/DataBuBrench" style={{ textDecoration: "none" }}>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <UserAddOutlined
                          style={{
                            fontSize: "30px",
                            color: "black",
                            marginBottom: "8px",
                            marginTop: "10px",
                          }}
                        />
                        <span
                          style={{
                            fontWeight: "bold",
                            color: "black",
                            marginLeft: "8px",
                          }}
                        >
                          Data BU Brench
                        </span>
                      </div>
                    </Link>
                  </Menu.Item>
                  <Menu.Item
                    key="Data Employee Position"
                    className={
                      activeMenu === "/DataBuEmployeePosition"
                        ? "menu-item-active menu-item-hover"
                        : "menu-item-hover"
                    }
                  >
                    <Link
                      to="/DataBuEmployeePosition"
                      style={{ textDecoration: "none" }}
                    >
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <UserOutlined
                          style={{
                            fontSize: "30px",
                            color: "black",
                            marginBottom: "8px",
                            marginTop: "10px",
                          }}
                        />
                        <span
                          style={{
                            fontWeight: "bold",
                            color: "black",
                            marginLeft: "8px",
                          }}
                        >
                          Data Employee Position
                        </span>
                      </div>
                    </Link>
                  </Menu.Item>
                </>
              ) : null}

              {jobdesk === "purchasing" ? (
                <Menu.ItemGroup key="monitorings">
                  <Menu.Item
                    key="Dashboard"
                    className={
                      activeMenu === "/dashboard"
                        ? "menu-item-active menu-item-hover"
                        : "menu-item-hover"
                    }
                  >
                    <Link to="/dashboard" style={{ textDecoration: "none" }}>
                      {/* <i className="icon icon-widgets" />
                       */}
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <AppstoreOutlined
                          style={{
                            fontSize: "30px",
                            color: "black",
                            marginBottom: "8px",
                            marginTop: "10px",
                          }}
                        />
                        <span
                          style={{
                            fontWeight: "bold",
                            color: "black",
                            marginLeft: "8px",
                          }}
                        >
                          <IntlMessages id="Dashboard" />
                        </span>
                      </div>
                    </Link>
                  </Menu.Item>
                  <div
                    className="d-flex justify-content-start"
                    style={{
                      height: "30%",
                      marginRight: "20px",
                      marginLeft: "20px",
                      borderRadius: "10px",
                    }}
                  >
                    <h6
                      style={{ color: "#0c2197", textDecoration: "underline" }}
                      className="mt-3 mb-3 mx-4"
                    >
                      Menu SP
                    </h6>
                  </div>
                  <Menu.Item
                    key="New SP"
                    className={
                      activeMenu === "/purchasing/newsplist"
                        ? "menu-item-active menu-item-hover"
                        : "menu-item-hover"
                    }
                  >
                    <Link
                      to="/purchasing/newsplist"
                      style={{ textDecoration: "none" }}
                    >
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <FileProtectOutlined
                          style={{
                            fontSize: "30px",
                            color: "black",
                            marginBottom: "8px",
                            marginTop: "10px",
                          }}
                        />
                        <span
                          style={{
                            fontWeight: "bold",
                            color: "black",
                            marginLeft: "8px",
                          }}
                        >
                          <IntlMessages id="Approve SP" />
                        </span>
                      </div>
                    </Link>
                  </Menu.Item>
                  <Menu.Item
                    key="SP List"
                    className={
                      activeMenu === "/masterdata/splist"
                        ? "menu-item-active menu-item-hover"
                        : "menu-item-hover"
                    }
                  >
                    <Link
                      to="/masterdata/splist"
                      style={{ textDecoration: "none" }}
                    >
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <FileTextOutlined
                          style={{
                            fontSize: "30px",
                            color: "black",
                            marginBottom: "8px",
                            marginTop: "10px",
                          }}
                        />
                        <span
                          style={{
                            fontWeight: "bold",
                            color: "black",
                            marginLeft: "8px",
                          }}
                        >
                          <IntlMessages id="SP List" />
                        </span>
                      </div>
                    </Link>
                  </Menu.Item>
                  <Menu.Item
                    key="SO List"
                    className={
                      activeMenu === "/purchasing/solist"
                        ? "menu-item-active menu-item-hover"
                        : "menu-item-hover"
                    }
                  >
                    <Link
                      to="/purchasing/solist"
                      style={{ textDecoration: "none" }}
                    >
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <FileTextOutlined
                          style={{
                            fontSize: "30px",
                            color: "black",
                            marginBottom: "8px",
                            marginTop: "10px",
                          }}
                        />
                        <span
                          style={{
                            fontWeight: "bold",
                            color: "black",
                            marginLeft: "8px",
                          }}
                        >
                          <IntlMessages id="PO List" />
                        </span>
                      </div>
                    </Link>
                  </Menu.Item>
                  <div
                    className="d-flex justify-content-start"
                    style={{
                      height: "20%",
                      marginRight: "20px",
                      marginLeft: "20px",
                      borderRadius: "10px",
                    }}
                  >
                    <h6
                      style={{ color: "#0c2197", textDecoration: "underline" }}
                      className="mt-3 mb-3 mx-4"
                    >
                      Menu SJ
                    </h6>
                  </div>
                  <Menu.Item
                    key="SJ List"
                    className={
                      activeMenu === "/masterdata/sjlist"
                        ? "menu-item-active menu-item-hover"
                        : "menu-item-hover"
                    }
                  >
                    <Link
                      to="/masterdata/sjlist"
                      style={{ textDecoration: "none" }}
                    >
                      {/* <i className="icon icon-widgets" />
                       */}
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <FolderOpenOutlined
                          style={{
                            fontSize: "30px",
                            color: "black",
                            marginBottom: "8px",
                            marginTop: "10px",
                          }}
                        />
                        <span
                          style={{
                            fontWeight: "bold",
                            color: "black",
                            marginLeft: "8px",
                          }}
                        >
                          <IntlMessages id="SJ List" />
                        </span>
                      </div>
                    </Link>
                  </Menu.Item>
                  <div
                    className="d-flex justify-content-start"
                    style={{
                      height: "20%",
                      marginRight: "20px",
                      marginLeft: "20px",
                      borderRadius: "10px",
                    }}
                  >
                    <h6
                      style={{ color: "#0c2197", textDecoration: "underline" }}
                      className="mt-3 mb-3 mx-4"
                    >
                      Master
                    </h6>
                  </div>
                  <Menu.Item
                    key="driverpurch"
                    className={
                      activeMenu === "/masterdata/purchasing/driver"
                        ? "menu-item-active menu-item-hover"
                        : "menu-item-hover"
                    }
                  >
                    <Link
                      to="/masterdata/purchasing/driver"
                      style={{ textDecoration: "none" }}
                    >
                      {/* <i className="icon icon-widgets" />
                       */}
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <CarOutlined
                          style={{
                            fontSize: "30px",
                            color: "black",
                            marginBottom: "8px",
                            marginTop: "10px",
                          }}
                        />
                        <span
                          style={{
                            fontWeight: "bold",
                            color: "black",
                            marginLeft: "8px",
                          }}
                        >
                          <IntlMessages id="Master Driver" />
                        </span>
                      </div>
                    </Link>
                  </Menu.Item>
                  <Menu.Item
                    key="Master Mitra"
                    className={
                      activeMenu === "/mastermitra"
                        ? "menu-item-active menu-item-hover"
                        : "menu-item-hover"
                    }
                  >
                    <Link to="/mastermitra" style={{ textDecoration: "none" }}>
                      {/* <i className="icon icon-widgets" />
                       */}
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <ShopOutlined
                          style={{
                            fontSize: "30px",
                            color: "black",
                            marginBottom: "8px",
                            marginTop: "10px",
                          }}
                        />
                        <span
                          style={{
                            fontWeight: "bold",
                            color: "black",
                            marginLeft: "8px",
                          }}
                        >
                          Master Mitra
                        </span>
                      </div>
                    </Link>
                  </Menu.Item>
                  <Menu.Item
                    key="vehiclepurch"
                    className={
                      activeMenu === "/masterdata/purchasing/vehicle"
                        ? "menu-item-active menu-item-hover"
                        : "menu-item-hover"
                    }
                  >
                    <Link
                      to="/masterdata/purchasing/vehicle"
                      style={{ textDecoration: "none" }}
                    >
                      {/* <i className="icon icon-heart" /> */}
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <FundViewOutlined
                          style={{
                            fontSize: "30px",
                            color: "black",
                            marginBottom: "8px",
                            marginTop: "10px",
                          }}
                        />
                        <span
                          style={{
                            fontWeight: "bold",
                            color: "black",
                            marginLeft: "8px",
                          }}
                        >
                          <IntlMessages id="Master Vehicle" />
                        </span>
                      </div>
                    </Link>
                  </Menu.Item>
                  <div
                    className="d-flex justify-content-start"
                    style={{
                      height: "20%",
                      marginRight: "20px",
                      marginLeft: "20px",
                      borderRadius: "10px",
                    }}
                  >
                    <h6
                      style={{ color: "#0c2197", textDecoration: "underline" }}
                      className="mt-3 mb-3 mx-4"
                    >
                      Tarif
                    </h6>
                  </div>
                  <Menu.Item
                    key="Cari Tarif"
                    className={
                      activeMenu === "/CariTarif"
                        ? "menu-item-active menu-item-hover"
                        : "menu-item-hover"
                    }
                  >
                    <Link to="/CariTarif" style={{ textDecoration: "none" }}>
                      {/* <i className="icon icon-widgets" /> */}
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <DollarOutlined
                          style={{
                            fontSize: "30px",
                            color: "black",
                            marginBottom: "8px",
                            marginTop: "10px",
                          }}
                        />
                        <span
                          style={{
                            fontWeight: "bold",
                            color: "black",
                            marginLeft: "8px",
                          }}
                        >
                          Cari Tarif
                        </span>
                      </div>
                    </Link>
                  </Menu.Item>
                  <Menu.Item
                    key="Tarif Mitra"
                    className={
                      activeMenu === "/tarifmitra"
                        ? "menu-item-active menu-item-hover"
                        : "menu-item-hover"
                    }
                  >
                    <Link to="/tarifmitra" style={{ textDecoration: "none" }}>
                      {/* <i className="icon icon-widgets" />
                       */}
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <DollarOutlined
                          style={{
                            fontSize: "30px",
                            color: "black",
                            marginBottom: "8px",
                            marginTop: "10px",
                          }}
                        />
                        <span
                          style={{
                            fontWeight: "bold",
                            color: "black",
                            marginLeft: "8px",
                          }}
                        >
                          Tarif Mitra
                        </span>
                      </div>
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="Tarif Eureka" disabled>
                    <Link to="/tarif_eureka" style={{ textDecoration: "none" }}>
                      {/* <i className="icon icon-widgets" /> */}
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <DollarOutlined
                          style={{
                            fontSize: "30px",
                            color: "black",
                            marginBottom: "8px",
                            marginTop: "10px",
                          }}
                        />
                        <span
                          style={{
                            fontWeight: "bold",
                            color: "black",
                            marginLeft: "8px",
                          }}
                        >
                          Tarif Eureka
                        </span>
                      </div>
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="Tarif Customer" disabled>
                    <Link
                      to="/pelanggantarif"
                      style={{ textDecoration: "none" }}
                    >
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <DollarOutlined
                          style={{
                            fontSize: "30px",
                            color: "black",
                            marginBottom: "8px",
                            marginTop: "10px",
                          }}
                        />
                        <span
                          style={{
                            fontWeight: "bold",
                            color: "black",
                            marginLeft: "8px",
                          }}
                        >
                          Tarif Customer
                        </span>
                      </div>
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
                    <AppstoreOutlined
                      style={{
                        fontSize: "30px",
                        color: "white",
                        marginBottom: "7px",
                      }}
                    />
                    <span style={{ fontWeight: "bold", color: "black" }}>
                      Dashboard
                    </span>
                  </Link>
                </Menu.Item>
              )}
              {/* ////Login Race///// */}
              {jobdesk == "rcadmin" && (
                <>
                  <div className="mt-3">
                    <Menu.Item
                      className={
                        activeMenu === "/Dashboard"
                          ? "menu-item-active menu-item-hover"
                          : "menu-item-hover"
                      }
                      key="Dashboard"
                    >
                      <Link to="/Dashboard" style={{ textDecoration: "none" }}>
                        {/* <i className="icon icon-widgets" />
                         */}

                        <img
                          src={logodashboard}
                          style={{
                            fontSize: "30px",
                            color: "white",
                            marginTop: "7px",
                          }}
                        />
                        <span
                          className="mx-3"
                          style={{ fontWeight: "bold", color: "white" }}
                        >
                          Dashboard
                        </span>
                      </Link>
                    </Menu.Item>
                  </div>
                  <div className="mt-4">
                    <Menu.Item
                      className={
                        activeMenu === "/race/splist"
                          ? "menu-item-active menu-item-hover"
                          : "menu-item-hover"
                      }
                      key="SPList"
                    >
                      <Link
                        to="/race/splist"
                        style={{ textDecoration: "none" }}
                      >
                        {/* <i className="icon icon-widgets" />
                         */}

                        <img
                          src={splistrace}
                          style={{
                            fontSize: "30px",
                            color: "white",
                            marginTop: "7px",
                          }}
                        />
                        <span
                          className="mx-3"
                          style={{ fontWeight: "bold", color: "white" }}
                        >
                          SP List
                        </span>
                      </Link>
                    </Menu.Item>
                  </div>
                  <div className="mt-4">
                    <Menu.Item
                      className={
                        activeMenu === "/mapping"
                          ? "menu-item-active menu-item-hover"
                          : "menu-item-hover"
                      }
                      key="mapping"
                    >
                      <Link to="/mapping" style={{ textDecoration: "none" }}>
                        {/* <i className="icon icon-widgets" />
                         */}

                        <img
                          src={historyrace}
                          style={{
                            fontSize: "30px",
                            color: "white",
                            marginTop: "7px",
                          }}
                        />
                        <span
                          className="mx-3"
                          style={{ fontWeight: "bold", color: "white" }}
                        >
                          Map Pengiriman
                        </span>
                      </Link>
                    </Menu.Item>
                  </div>
                  <div className="mt-4">
                    <Menu.Item
                      className={
                        activeMenu === "/race/cod"
                          ? "menu-item-active menu-item-hover"
                          : "menu-item-hover"
                      }
                      key="cod"
                    >
                      <Link to="/race/cod" style={{ textDecoration: "none" }}>
                        {/* <i className="icon icon-widgets" />
                         */}

                        <img
                          src={perbaikanrace}
                          style={{
                            fontSize: "30px",
                            color: "white",
                            marginTop: "7px",
                          }}
                        />
                        <span
                          className="mx-3"
                          style={{ fontWeight: "bold", color: "white" }}
                        >
                          Cash On Delivery
                        </span>
                      </Link>
                    </Menu.Item>
                  </div>
                  <div className="mt-4">
                    <Menu.Item key="Vehicle">
                      <Link to="/Dashboard" style={{ textDecoration: "none" }}>
                        {/* <i className="icon icon-widgets" />
                         */}

                        <img
                          src={vehiclerace}
                          style={{
                            fontSize: "30px",
                            color: "white",
                            marginTop: "7px",
                          }}
                        />
                        <span
                          className="mx-3"
                          style={{ fontWeight: "bold", color: "white" }}
                        >
                          Vehicle
                        </span>
                      </Link>
                    </Menu.Item>
                  </div>
                  <div className="mt-4">
                    <Menu.Item key="Emergency">
                      <Link to="/Dashboard" style={{ textDecoration: "none" }}>
                        {/* <i className="icon icon-widgets" />
                         */}

                        <img
                          src={emergencyrace}
                          style={{
                            fontSize: "30px",
                            color: "white",
                            marginTop: "7px",
                          }}
                        />
                        <span
                          className="mx-3"
                          style={{ fontWeight: "bold", color: "white" }}
                        >
                          Emergency
                        </span>
                      </Link>
                    </Menu.Item>
                  </div>
                </>
              )}

              {jobdesk == "webmaster" && (
                <MenuItemGroup key="main">
                  <Menu.Item
                    key="Dashboard"
                    className={
                      activeMenu === "/dashboard"
                        ? "menu-item-active menu-item-hover"
                        : "menu-item-hover"
                    }
                  >
                    <Link to="/dashboard" style={{ textDecoration: "none" }}>
                      <AppstoreOutlined
                        style={{
                          fontSize: "30px",
                          color: "white",
                          marginBottom: "8px",
                        }}
                      />
                      <span style={{ fontWeight: "bold", color: "black" }}>
                        <IntlMessages id="Dashboard" />
                      </span>
                    </Link>
                  </Menu.Item>
                  <Menu.Item
                    key="List User"
                    className={
                      activeMenu === "/admin/user/menu"
                        ? "menu-item-active menu-item-hover"
                        : "menu-item-hover"
                    }
                  >
                    <Link
                      to="/admin/user/menu"
                      style={{ textDecoration: "none" }}
                    >
                      <UsergroupAddOutlined
                        style={{
                          fontSize: "30px",
                          color: "white",
                          marginBottom: "8px",
                        }}
                      />
                      <span style={{ fontWeight: "bold", color: "black" }}>
                        <IntlMessages id="List User" />
                      </span>
                    </Link>
                  </Menu.Item>
                  <Menu.Item
                    key="Data User"
                    className={
                      activeMenu === "/DataMenu"
                        ? "menu-item-active menu-item-hover"
                        : "menu-item-hover"
                    }
                  >
                    <Link to="/DataMenu" style={{ textDecoration: "none" }}>
                      <UserOutlined
                        style={{
                          fontSize: "30px",
                          color: "white",
                          marginBottom: "8px",
                        }}
                      />
                      <span style={{ fontWeight: "bold", color: "black" }}>
                        <IntlMessages id="Data User" />
                      </span>
                    </Link>
                  </Menu.Item>
                </MenuItemGroup>
              )}

              {jobdesk == "monitoring" && (
                <>
                  <Menu.Item
                    key="List User"
                    className={
                      activeMenu === "/monitoring/report-kiriman"
                        ? "menu-item-active menu-item-hover"
                        : "menu-item-hover"
                    }
                  >
                    <Link
                      to="/monitoring/report-kiriman"
                      style={{ textDecoration: "none" }}
                    >
                      <span
                        className="mx-3"
                        style={{ fontWeight: "bold", color: "white" }}
                      >
                        Report Kiriman
                      </span>
                    </Link>
                  </Menu.Item>
                </>
              )}
            </MenuItemGroup>
          </Menu>
        </CustomScrollbars>
      </div>
    </>
  );
};

export default React.memo(SidebarContent);
