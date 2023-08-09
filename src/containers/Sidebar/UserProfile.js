import React from "react";
import {useDispatch} from "react-redux";
import {Avatar, Col, Popover, Row} from "antd";
import {userSignOut} from "../../appRedux/actions";
import gambar from "./elogs_white.png"

const UserProfile = () => {
  const dispatch = useDispatch();
  const jobdesk = localStorage.getItem("jobdesk");
  const userMenuOptions = (
    <ul className="gx-user-popover">
      <li>My Account</li>
      <li>Connections</li>
      <li onClick={() => dispatch(userSignOut())}>Logout
      </li>
    </ul>
  );

  return (
    <div className="gx-flex-row gx-align-items-center gx-mb-4 gx-avatar-row">
      <Popover placement="bottomRight" content={userMenuOptions} trigger="click">
        <Row style={{marginTop: '2%'}} >
          <Col span={6}  >
          <Avatar src={(`https://avatars.githubusercontent.com/u/130539563?s=200&v=4`)} className="gx-size-50 gx-pointer gx-mr-3" alt=""/>
          </Col>
          <Col span={18} style={{marginTop: '4%'}} >
          <h6 className="gx-avatar-name">Admin {jobdesk}<i className="icon icon-chevron-down gx-fs-xxs gx-ml-2"/></h6>
          </Col>
        </Row>
      
        
      </Popover>
    </div>
  )
};

export default UserProfile;
