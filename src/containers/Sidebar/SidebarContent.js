import React from "react";
import { Menu } from "antd";
import { Link, useHistory } from "react-router-dom";
import CustomScrollbars from "util/CustomScrollbars";
import './SidebarStyles.css';
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
           {/* {jobdesk === "sales" ? (
                <div className="d-flex justify-content-center gx-sidebar-content w-100  text-center ">
                  <Button
                    size="lg"
                    style={{ width: 180 }}
                    className="d-flex align-items-center justify-content-center"
                    onClick={() => createsp()}
                    variant="warning"
                  >
                    ADD SP
                  </Button>
                </div>
              ) : (
                <>
                <hr/></>
              )} */}
          {/* <UserProfile /> */}
          {/* <AppsNavigation /> */}
        </div>
        <CustomScrollbars className="gx-layout-sider-scrollbar">
          <Menu
            defaultOpenKeys={[defaultOpenKeys]}
            selectedKeys={[selectedKeys]}
            style={{ backgroundColor: "#BAD6FF" }}
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
                    variant="warning"
                  >
                    ADD SP
                  </Button>
                </div>
              ) : (
                <>
                <hr/></>
              )}
              {jobdesk === "akunting" ? (
                <>
                  <div className="d-flex justify-content-center gx-sidebar-content w-100  text-center ">
                    <Button
                      size="lg"
                      // style={{
                      //   width: 180,
                      //   backgroundColor: "#00a65a",
                      //   color: "white",

                      // }}
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
                    <Link
                      to="/dashboard"
                      style={{ textDecoration: "none" }}
                    >
                      {/* <i className="icon icon-widgets" />
                       */}
                      <AppstoreOutlined style={{ fontSize: '20px' }} />
                      <span style={{ fontWeight: "bold" }}>
                        <IntlMessages id="Dashboard" />
                      </span>
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="SP List">
                    <Link
                      to="/masterdata/marketing/splist"
                      style={{ textDecoration: "none" }}
                    >
                      <FileTextOutlined style={{ fontSize: "20px" }} />
                      <span style={{ fontWeight: "bold" }}>
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
                      <span style={{ fontWeight: "bold" }}>
                        <IntlMessages id="Cancel SP List" />
                      </span>
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="Data Wilayah">
                    <Link
                      to="/mastercustomersss"
                      style={{ textDecoration: "none" }}
                    >
                      <UserOutlined style={{ fontSize: "20px" }} />
                      <span style={{ fontWeight: "bold" }}>Customer</span>
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="Alamat Customer">
                    <Link
                      to="/alamatcustomer"
                      style={{ textDecoration: "none" }}
                    >
                      <ProfileOutlined style={{ fontSize: "20px" }} />
                      {/* <i className="icon icon-widgets" /> */}
                      <span style={{ fontWeight: "bold" }}>
                        Alamat Customer
                      </span>
                      {/* <span style={{ fontWeight: "bold" }}>Data Alamat All</span> */}
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="Invoice Customer">
                    <Link
                      to="/invoicecustomer"
                      style={{ textDecoration: "none" }}
                    >
                      <FileProtectOutlined style={{ fontSize: "20px" }} />
                      <span style={{ fontWeight: "bold" }}>
                        Invoice Customer
                      </span>
                      {/* <span style={{ fontWeight: "bold" }}>Data Alamat All</span> */}
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="Tarif Customer">
                    <Link
                      to="/pelanggantarif"
                      style={{ textDecoration: "none" }}
                    >
                      <DollarOutlined style={{ fontSize: "20px" }} />
                      <span style={{ fontWeight: "bold" }}>Tarif Customer</span>
                    </Link>
                  </Menu.Item>

                  <Menu.Item key="monitoringVehicle">
                    <Link
                      to="/masterdata/monitoring"
                      style={{ textDecoration: "none" }}
                    >
                      <VideoCameraOutlined style={{ fontSize: "20px" }} />
                      <span style={{ fontWeight: "bold" }}>
                        <IntlMessages id="Monitoring Vehicle" />
                      </span>
                    </Link>
                  </Menu.Item>
                </MenuItemGroup>
              )}
              {jobdesk == "operasional" && (
                <Menu.ItemGroup key="master">
                  <Menu.Item key="driver">
                    <Link
                      to="/masterdata/purchasing/driver"
                      style={{ textDecoration: "none" }}
                    >
                      {/* <i className="icon icon-widgets" /> */}
                      <SmileTwoTone style={{ fontSize: "20px" }} />
                      <span style={{ fontWeight: "bold" }}>
                        <IntlMessages id="sidebar.driver" />
                      </span>
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="vehicle">
                    <Link
                      to="/masterdata/vehicle"
                      style={{ textDecoration: "none" }}
                    >
                      <CarTwoTone style={{ fontSize: "20px" }} />
                      <span style={{ fontWeight: "bold" }}>
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
                      <span style={{ fontWeight: "bold" }}>
                        <IntlMessages id="Monitoring Vehicle" />
                      </span>
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="waiting SP List">
                    <Link
                      to="/masterdata/newsplist"
                      style={{ textDecoration: "none" }}
                    >
                      <ProfileTwoTone style={{ fontSize: "20px" }} />
                      <span style={{ fontWeight: "bold" }}>
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
                      <span style={{ fontWeight: "bold" }}>
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
                      <span style={{ fontWeight: "bold" }}>
                        <IntlMessages id="SP List" />
                      </span>
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="VehicleMap">
                    <Link
                      to="/masterdata/monitoring"
                      style={{ textDecoration: "none" }}
                    >
                      {/* <i className="icon icon-widgets" /> */}
                      <EnvironmentTwoTone style={{ fontSize: "20px" }} />
                      <span style={{ fontWeight: "bold" }}>
                        <IntlMessages id="Vehicle Map" />
                      </span>
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="DriverMap">
                    <Link
                      to="/masterdata/monitoring"
                      style={{ textDecoration: "none" }}
                    >
                      <CarTwoTone style={{ fontSize: "20px" }} />
                      <span style={{ fontWeight: "bold" }}>
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
                      <span style={{ fontWeight: "bold" }}>
                        <IntlMessages id="Driver Emc" />
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
                      <span style={{ fontWeight: "bold" }}>
                        <IntlMessages id="Vehicle Map" />
                      </span>
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="monitoringDriver">
                    <Link to="/masterdata/monitoring">
                      <i className="icon icon-widgets" />
                      <span style={{ fontWeight: "bold" }}>
                        <IntlMessages id="Driver Map" />
                      </span>
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="DriverEmc">
                    <Link to="/masterdata/monitoring">
                      <i className="icon icon-widgets" />
                      <span style={{ fontWeight: "bold" }}>
                        <IntlMessages id="Driver Emc" />
                      </span>
                    </Link>
                  </Menu.Item>
                </Menu.ItemGroup>
              )} */}
              {jobdesk.toLowerCase() === "akunting" ? (
                <>
                  <Menu.ItemGroup key="akuntingg" title="Menu SP">
                  <Menu.Item key="Dashboard">
                    <Link
                      to="/dashboard"
                      style={{ textDecoration: "none" }}
                    >
                      {/* <i className="icon icon-widgets" />
                   */}
                      <AppstoreOutlined style={{ fontSize: '20px' }} />
                      <span style={{ fontWeight: "bold" }}>
                        <IntlMessages id="Dashboard" />
                      </span>
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="SP Lists">
                      <Link
                        to="/akunting/splistwaitingakunting"
                        style={{ textDecoration: "none" }}
                      >
                        <FileProtectOutlined style={{ fontSize: '20px' }} />
                        <span style={{ fontWeight: "bold" }}>
                          Waiting Approve SP
                        </span>
                      </Link>
                    </Menu.Item>
                    <Menu.Item key="SP Lists All">
                      <Link
                        to="/akunting/splistakuntingbaru"
                        style={{ textDecoration: "none" }}
                      >
                        <FileProtectOutlined style={{ fontSize: '20px' }} />
                        <span style={{ fontWeight: "bold" }}>SP List All</span>
                      </Link>
                    </Menu.Item>
                    
                    <Menu.Item key="Approve SP">
                      <Link
                        to="/approvesplistall"
                        style={{ textDecoration: "none" }}
                      >
                        <FileProtectOutlined style={{ fontSize: '20px' }} />
                        <span style={{ fontWeight: "bold" }}>
                        List Approve All SP 
                        </span>
                      </Link>
                    </Menu.Item>
                  </Menu.ItemGroup>
                  {/* <SubMenu key="monitoring" title="Monitoring">
                    <Menu.Item key="Data Pesanan Customer">
                      <Link to="/akunting/detaildatacustomer" style={{ textDecoration: "none" }}>
                        <i className="icon icon-widgets" />
                        <span style={{ fontWeight: "bold" }}>Data Customer</span>
                      </Link>
                    </Menu.Item>
                  </SubMenu> */}
                  <Menu.ItemGroup key="ArList" title="Menu AR">
                    <Menu.Item key="SP Lists All">
                      <Link
                        to="/akunting/ar/ar"
                        style={{ textDecoration: "none" }}
                      >
                        <i className="icon icon-widgets" />
                        <span style={{ fontWeight: "bold" }}>AR List ALL</span>
                      </Link>
                    </Menu.Item>
                    <Menu.Item key="SP Lists All">
                      <Link
                        to="/akunting/ar/ar"
                        style={{ textDecoration: "none" }}
                      >
                        <i className="icon icon-widgets" />
                        <span style={{ fontWeight: "bold" }}>
                          List Invoice AR
                        </span>
                      </Link>
                    </Menu.Item>
                    <Menu.Item key="SP Lists All">
                      <Link
                        to="/akunting/ar/ar"
                        style={{ textDecoration: "none" }}
                      >
                        <i className="icon icon-widgets" />
                        <span style={{ fontWeight: "bold" }}>SJ no AR</span>
                      </Link>
                    </Menu.Item>
                    <Menu.Item key="SP Lists All">
                      <Link
                        to="/akunting/ar/ar"
                        style={{ textDecoration: "none" }}
                      >
                        <i className="icon icon-widgets" />
                        <span style={{ fontWeight: "bold" }}>
                          Penerimaan SJ
                        </span>
                      </Link>
                    </Menu.Item>
                    <Menu.Item key="SP Lists All">
                      <Link
                        to="/akunting/ar/ar"
                        style={{ textDecoration: "none" }}
                      >
                        <i className="icon icon-widgets" />
                        <span style={{ fontWeight: "bold" }}>
                          Report Pembayaran Customer
                        </span>
                      </Link>
                    </Menu.Item>
                  </Menu.ItemGroup>

                  <Menu.ItemGroup key="Payment" title="Menu Payment">
                    <Menu.Item key="Payment">
                      <Link
                        to="/akunting/ar/reportpartners/reportpenerimaaninvoice"
                        style={{ textDecoration: "none" }}
                      >
                        <i className="icon icon-widgets" />
                        <span style={{ fontWeight: "bold" }}>
                          Penerimaan INV
                        </span>
                      </Link>
                    </Menu.Item>
                  </Menu.ItemGroup>

                  <Menu.ItemGroup key="Data Wilayah" title="Menu Data Wilayah">
                    <Menu.Item key="Master Kecamatan">
                      <Link
                        to="/masterkecamatan"
                        style={{ textDecoration: "none" }}
                      >
                        <i className="icon icon-widgets" />
                        <span style={{ fontWeight: "bold" }}>
                          Data Kecamatan
                        </span>
                      </Link>
                    </Menu.Item>
                    <Menu.Item key="Master Kota">
                      <Link to="/masterkota" style={{ textDecoration: "none" }}>
                        <i className="icon icon-widgets" />
                        <span style={{ fontWeight: "bold" }}>Data Kota</span>
                      </Link>
                    </Menu.Item>
                    <Menu.Item key="Master Provinsi">
                      <Link
                        to="/masterprovinsi"
                        style={{ textDecoration: "none" }}
                      >
                        <i className="icon icon-widgets" />
                        <span style={{ fontWeight: "bold" }}>
                          Data Provinsi
                        </span>
                      </Link>
                    </Menu.Item>
                  </Menu.ItemGroup>

                  {/* <SubMenu key="AP List" title="AP List">
                      <Menu.Item key="SP_AP_LIST">
                        <Link to="/akunting/ap/">
                          <i className="icon icon-widgets" />
                          <span style={{ fontWeight: "bold" }}>AP List ALL</span>
                        </Link>
                      </Menu.Item>


                    </SubMenu> */}
                  <Menu.ItemGroup key="Tarif" title="Menu Tarif">
                    <Menu.Item key="Tarif Eureka">
                      <Link
                        to="/tarif_eureka"
                        style={{ textDecoration: "none" }}
                      >
                        <i className="icon icon-widgets" />
                        <span style={{ fontWeight: "bold" }}>Tarif Eureka</span>
                      </Link>
                    </Menu.Item>
                  </Menu.ItemGroup>
                </>
              ) : null}

              {jobdesk === "purchasing" ? (
                <Menu.ItemGroup key="monitorings">
                  <Menu.Item key="Dashboard">
                    <Link
                      to="/dashboard"
                      style={{ textDecoration: "none" }}
                    >
                      {/* <i className="icon icon-widgets" />
                       */}
                      <AppstoreOutlined style={{ fontSize: '20px' }} />
                      <span style={{ fontWeight: "bold" }}>
                        <IntlMessages id="Dashboard" />
                      </span>
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="New SP">
                    <Link
                      to="/purchasing/newsplist"
                      style={{ textDecoration: "none" }}
                    >
                      {/* <i className="icon icon-widgets" />
                       */}
                      <FileProtectOutlined style={{ fontSize: '20px' }} />
                      <span style={{ fontWeight: "bold" }}>
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
                      <FileTextOutlined style={{ fontSize: '20px' }} />
                      <span style={{ fontWeight: "bold" }}>
                        <IntlMessages id="SP List" />
                      </span>
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="SJ List">
                    <Link
                      to="/masterdata/sjlist"
                      style={{ textDecoration: "none" }}
                    >
                      {/* <i className="icon icon-widgets" />
                       */}
                      <FolderOpenOutlined style={{ fontSize: '20px' }} />
                      <span style={{ fontWeight: "bold" }}>
                        <IntlMessages id="SJ List" />
                      </span>
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="driverpurch">
                    <Link
                      to="/masterdata/purchasing/driver"
                      style={{ textDecoration: "none" }}
                    >
                      {/* <i className="icon icon-widgets" />
                       */}
                      <CarOutlined style={{ fontSize: '20px' }} />
                      <span style={{ fontWeight: "bold" }}>
                        <IntlMessages id="Master Driver" />
                      </span>
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="Master Mitra">
                    <Link to="/mastermitra" style={{ textDecoration: "none" }}>
                      {/* <i className="icon icon-widgets" />
                       */}
                      <ShopOutlined style={{ fontSize: '20px' }} />
                      <span style={{ fontWeight: "bold" }}>Master Mitra</span>
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="Tarif Mitra">
                    <Link to="/tarifmitra" style={{ textDecoration: "none" }}>
                      {/* <i className="icon icon-widgets" />
                       */}
                      <DollarOutlined style={{ fontSize: '20px' }} />
                      <span style={{ fontWeight: "bold" }}>Tarif Mitra</span>
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="vehiclepurch">
                    <Link
                      to="/masterdata/purchasing/vehicle"
                      style={{ textDecoration: "none" }}
                    >
                      {/* <i className="icon icon-heart" /> */}
                      <FundViewOutlined style={{ fontSize: '20px' }} />
                      <span style={{ fontWeight: "bold" }}>
                        <IntlMessages id="Master Vehicle" />
                      </span>
                    </Link>
                  </Menu.Item>
                </Menu.ItemGroup>
              ) : null}
            </MenuItemGroup>
          </Menu>
        </CustomScrollbars>
      </div>
    </>
  );
};

export default React.memo(SidebarContent);