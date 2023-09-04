import React from "react";
import { useDispatch } from "react-redux";
import { Avatar, Button, Col, Popover, Row } from "antd";
import { userSignOut } from "../../appRedux/actions";
import gambar from "./elogs_white.png";
import { PoweroffOutlined } from "@ant-design/icons";

const UserProfile = () => {
  const dispatch = useDispatch();
  const jobdesk = localStorage.getItem("jobdesk");
  const userMenuOptions = (
    // <ul className="gx-user-popover">
    //   <li>My Account</li>
    //   <li>Connections</li>
    //   <li onClick={() => dispatch(userSignOut())}>Logout
    //   </li>
    // </ul>
    <div style={{ width: "200px" }}>
      <Row>
        <Col span={24} className="d-flex justify-content-center mt-2" style={{marginBottom: "-10px"}}>
          <Avatar
            src={`https://avatars.githubusercontent.com/u/130539563?s=200&v=4`}
            className="gx-size-50 gx-pointer gx-mr-3"
            alt=""
          />
          <div className="mt-2" >
            <b>Admin {jobdesk}</b>
          </div>
        </Col>
      </Row>
      <hr />
      <Row>
        <Col span={24} className="d-flex justify-content-end ">
          <Button
            style={{ backgroundColor: "#bf1d2d", color: "white" }}
            size="small"
            onClick={() => dispatch(userSignOut())}
          >
            <span
              style={{
                display: "flex",
                alignItems: "center",
                // paddingBottom: "10px",
              }}
            >
              <PoweroffOutlined style={{ marginRight: "5px" }} /> Logout
            </span>
          </Button>
        </Col>
      </Row>
    </div>
  );

  return (
    <div className="gx-flex-row gx-align-items-center gx-mb-4 gx-avatar-row">
      <Popover
        placement="bottomRight"
        content={userMenuOptions}
        trigger="click"
      >
        <Row style={{ marginTop: "2%" }}>
          <Col span={6}>
            <Avatar
              src={`https://avatars.githubusercontent.com/u/130539563?s=200&v=4`}
              className="gx-size-50 gx-pointer gx-mr-3"
              alt=""
            />
          </Col>
          <Col span={18} style={{ marginTop: "4%" }}>
            <h6 className="gx-avatar-name">
              Admin {jobdesk}
              <i className="icon icon-chevron-down gx-fs-xxs gx-ml-2" />
            </h6>
          </Col>
        </Row>
      </Popover>
    </div>
  );
};

export default UserProfile;
