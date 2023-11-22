import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ElogLogo from "./elog logo.png";
import sideBarLogo from "./sideBarLogo.css";
import {
  NAV_STYLE_DRAWER,
  NAV_STYLE_FIXED,
  NAV_STYLE_MINI_SIDEBAR,
  NAV_STYLE_NO_HEADER_MINI_SIDEBAR,
  TAB_SIZE,
  THEME_TYPE_LITE,
} from "../../constants/ThemeSetting";
import gambar from "../../containers/Sidebar/elogs_white.png";

const SidebarLogo = ({ sidebarCollapsed, setSidebarCollapsed }) => {
  const { width, themeType } = useSelector(({ settings }) => settings);
  let navStyle = useSelector(({ settings }) => settings.navStyle);
  if (width < TAB_SIZE && navStyle === NAV_STYLE_FIXED) {
    navStyle = NAV_STYLE_DRAWER;
  }
  const jobdesk = localStorage.getItem("jobdesk");
  return (
    <>
      {jobdesk != "rcadmin" && !localStorage.getItem("loginBu") ? (
        <>
          <div className="gx-layout-sider-header">
            {navStyle === NAV_STYLE_FIXED ||
            navStyle === NAV_STYLE_MINI_SIDEBAR ? (
              <div className="gx-linebar">
                <i
                  className={`gx-icon-btn icon icon-${
                    !sidebarCollapsed ? "menu-unfold" : "menu-fold"
                  } ${themeType !== THEME_TYPE_LITE ? "black" : ""}`}
                  onClick={() => {
                    setSidebarCollapsed(!sidebarCollapsed);
                  }}
                />
              </div>
            ) : null}

            <Link to="/" className="gx-site-logo">
              {navStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR &&
              width >= TAB_SIZE ? (
                <img
                  alt="lo"
                  src={`https://avatars.githubusercontent.com/u/130539563?s=200&v=4`}
                />
              ) : themeType === THEME_TYPE_LITE ? (
                <img alt="logo1" src={ElogLogo} />
              ) : (
                <img
                  className="gx-site-logo"
                  alt="logo2"
                  width="80%"
                  src={ElogLogo}
                />
              )}
            </Link>
          </div>
        </>
      ) : null}
    </>
  );
};

export default SidebarLogo;
