import React, { useState } from "react";
import { Button, Card, Col, Layout, Popover, Row } from "antd";
import { Link } from "react-router-dom";

import CustomScrollbars from "util/CustomScrollbars";
import languageData from "./languageData";
import { switchLanguage, toggleCollapsedSideNav } from "../../appRedux/actions";
import SearchBox from "../../components/SearchBox";
import UserInfo from "../../components/UserInfo";
import AppNotification from "../../components/AppNotification";
import MailNotification from "../../components/MailNotification";
import Auxiliary from "util/Auxiliary";
import elogpng from "../Sidebar/elog logo.png";

import "./style.css";
import {
  NAV_STYLE_DRAWER,
  NAV_STYLE_FIXED,
  NAV_STYLE_MINI_SIDEBAR,
  TAB_SIZE,
} from "../../constants/ThemeSetting";
import { useDispatch, useSelector } from "react-redux";
import UserProfile from "../Sidebar/UserProfile";
import { Modal } from 'antd';
const { Header } = Layout;

const Topbar = () => {
  const [open, setOpen] = useState(false);
  const { locale, navStyle } = useSelector(({ settings }) => settings);
  const navCollapsed = useSelector(({ common }) => common.navCollapsed);
  const width = useSelector(({ common }) => common.width);
  const [searchText, setSearchText] = useState("");
  const dispatch = useDispatch();
  const jobdeks = localStorage.getItem("jobdeks");
  const languageMenu = () => (
    <CustomScrollbars className="gx-popover-lang-scroll">
      <ul className="gx-sub-popover">
        {languageData.map((language) => (
          <li
            className="gx-media gx-pointer"
            key={JSON.stringify(language)}
            onClick={() => dispatch(switchLanguage(language))}
          >
            <i className={`flag flag-24 gx-mr-2 flag-${language.icon}`} />
            <span className="gx-language-text">{language.name}</span>
          </li>
        ))}
      </ul>
    </CustomScrollbars>
  );

  const updateSearchChatUser = (evt) => {
    setSearchText(evt.target.value);
  };
  const namaRole = localStorage.getItem(`jobdesk`);
  const cabang = localStorage.getItem(`cabang`);
  const fullname = localStorage.getItem(`fullname`);
  return (
    <Header>
      {navStyle === NAV_STYLE_DRAWER ||
        ((navStyle === NAV_STYLE_FIXED || navStyle === NAV_STYLE_MINI_SIDEBAR) &&
          width < TAB_SIZE) ? (
        <div className="gx-linebar gx-mr-3">
          <i
            className="gx-icon-btn icon icon-menu "
            onClick={() => {
              dispatch(toggleCollapsedSideNav(!navCollapsed));
            }}
          />
        </div>
      ) : null}
      <Link to="/" className="gx-d-block gx-d-lg-none gx-pointer">
        <img alt="" width="80px" src={elogpng} />
      </Link>

      {/* <div className="gx-d-none gx-d-lg-block d-flex justify-content-end gx-lt-icon-search-bar-lg gx-move-right-to-left">Halo👋 {fullname} || {namaRole} || cabang {cabang}</div> */}
      {jobdeks != "rcadmin" ? (
        <Row >
          
          <Col >
            {" "}
            <h5 style={{ color: "blue" , marginLeft : "30px"}} className="mt-1">
            👋 Halo, Selamat Datang! {fullname} 
            </h5>
          </Col>
        </Row>
      ) :
        <Row style={{ marginLeft: '2%' }}>
          <Col span={24} >
            {" "}
            <Button style={{ backgroundColor: "#1a5cbf" }}>
              <h6 style={{ color: "white" }} className="mt-1">
                Welcome, {fullname}👋
              </h6>
            </Button>
          </Col>
        </Row>}

      {/* <Col className="ms-3">
        <Button type="primary" onClick={() => setOpen(true)}>
          Buka What'sApp
        </Button>
      </Col> */}
      {/* <div style={{ marginLeft: "5%", backgroundColor: 'GrayText' }} className="mt-2">
       
      </div>
      <div style={{ marginLeft: "5%" , backgroundColor: 'purple'}} className="mt-2 d-flex justify-content-end">
       
      </div> */}
      <ul className="gx-header-notifications gx-ml-auto">
        {/* <li className="gx-notify gx-notify-search gx-d-inline-block gx-d-lg-none">
          <Popover
            overlayClassName="gx-popover-horizantal"
            placement="bottomRight"
            content={
              <SearchBox
                styleName="gx-popover-search-bar"
                placeholder="Search in app..."
                onChange={updateSearchChatUser}
                value={searchText}
              />
            }
            trigger="click"
          >
            <span className="gx-pointer gx-d-block">
              <i className="icon icon-search-new" />
            </span>
          </Popover>
        </li> */}
        {/* {width >= TAB_SIZE ? null : (
          <Auxiliary>
            <li className="gx-notify">
              <Popover
                overlayClassName="gx-popover-horizantal"
                placement="bottomRight"
                content={<AppNotification />}
                trigger="click"
              >
                <span className="gx-pointer gx-d-block">
                  <i className="icon icon-notification" />
                </span>
              </Popover>
            </li>

            <li className="gx-msg">
              <Popover
                overlayClassName="gx-popover-horizantal"
                placement="bottomRight"
                content={<MailNotification />}
                trigger="click"
              >
                <span className="gx-pointer gx-status-pos gx-d-block">
                  <i className="icon icon-chat-new" />
                  <span className="gx-status gx-status-rtl gx-small gx-orange" />
                </span>
              </Popover>
            </li>
          </Auxiliary>
        )} */}
        {/* <li className="gx-language"> */}
        {/* <Popover overlayClassName="gx-popover-horizantal" placement="bottomRight" content={languageMenu()} */}
        {/* //  trigger="click"> */}
        {/* <span className="gx-pointer gx-flex-row gx-align-items-center">
                  <i className={`flag flag-24 flag-${locale.icon}`}/> */}
        {/* <span className="gx-pl-2 gx-language-name">{locale.name}</span> */}
        {/* <i className="icon icon-chevron-down gx-pl-2"/> */}
        {/* </span> */}
        {/* </Popover> */}
        {/* </li> */}
        {/* {width >= TAB_SIZE ? null : (
          <Auxiliary>
            <li className="gx-user-nav">
              <UserInfo />
            </li>
          </Auxiliary>
        )} */}

      </ul>
      {/* <Modal
        title="WhatsApp Web"
        centered
        visible={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={1000}
      >
        <iframe
          src="https://google.com/"
          width="100%"
          height="600px"
          frameborder="0"
          allowfullscreen>
        </iframe>
      </Modal> */}

      <Row className="mt-1">
        <Col span={24}>
          {" "}
          <UserProfile />
        </Col>
      </Row>
    </Header>
  );
};

export default Topbar;
