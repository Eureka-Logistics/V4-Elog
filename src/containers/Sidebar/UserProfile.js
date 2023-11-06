import React from "react";
import { useDispatch } from "react-redux";
import { Avatar, Button, Col, Popover, Row } from "antd";
import { userSignOut } from "../../appRedux/actions";
import gambar from "./elogs_white.png";
import { PoweroffOutlined } from "@ant-design/icons";

const UserProfile = () => {
  const dispatch = useDispatch();
  const jobdesk = localStorage.getItem("jobdesk");
  const fullname = localStorage.getItem(`fullname`);
  const userMenuOptions = (
    // <ul className="gx-user-popover">
    //   <li>My Account</li>
    //   <li>Connections</li>
    //   <li onClick={() => dispatch(userSignOut())}>Logout
    //   </li>
    // </ul>
    <div style={{ width: "200px", height: "auto" }}>
      <Row>
        <Col span={24} className="d-flex justify-content-center">
          <Avatar
            src={`https://avatars.githubusercontent.com/u/130539563?s=200&v=4`}
            className="gx-size-60 gx-pointer "
            alt=""
          />
        </Col>
        <Col span={24} className="d-flex justify-content-center mt-2">
          <b style={{ color: "#113D7F", fontWeight: "bold", fontSize: "20px" }}>
            {fullname}
          </b>
        </Col>
        <Col span={24} className="d-flex justify-content-center">
          <di style={{ color: "#113D7F" }}>{jobdesk}</di>
        </Col>
      </Row>
      <hr />
      <Row>
        <Col span={12} className="d-flex justify-content-end mt-2">
          {/* <Button
            size="small"
            style={{
              backgroundColor: "#1A5CBF",
              color: "white",
              height: "30px",
              borderRadius: "10px",
             
            }}
            onClick={() => dispatch(userSignOut())}
          >
            <span style={{ display: "flex", alignItems: "center" }}>
              Edit Porfile
            </span>
          </Button> */}
        </Col>
        <Col span={12} className="d-flex justify-content-end mt-2">
          <Button
            size="small"
            style={{
              backgroundColor: "#DB260E",
              color: "white",
              height: "30px",
              borderRadius: "10px",
            }}
            onClick={() => dispatch(userSignOut())}
          >
            <span style={{ display: "flex", alignItems: "center" }}>
              <PoweroffOutlined style={{ marginRight: "5px" }} /> Sign Out
            </span>
          </Button>
        </Col>
      </Row>
    </div>
  );

  return (
    <div className="gx-flex-row gx-align-items-center gx-avatar-row">
      <Popover
        placement="bottomRight"
        content={userMenuOptions}
        trigger="click"
      >
        <Row style={{ verticalAlign: "middle" }}>
          <Col span={6} className="avatars">
            <Avatar
              src={`https://avatars.githubusercontent.com/u/130539563?s=200&v=4`}
              className="gx-size-40 gx-pointer gx-mr-3 avatars"
              alt=""
            />
          </Col>
          <Col
            span={18}
            className="d-flex justify-content-center align-items-center paddingAja"
          >
            <h6 className="gx-avatar-name">
              <span className="admin-text">Admin {jobdesk}</span>{" "}
              {/* <span className="jobdesk">{jobdesk}</span> */}
            </h6>
            <i className="icon icon-chevron-down gx-fs-xs gx-ml-1 icons" />
          </Col>
        </Row>
      </Popover>
    </div>
  );
};

export default UserProfile;
