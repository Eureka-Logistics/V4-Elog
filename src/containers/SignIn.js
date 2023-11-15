import React, { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  Col,
  Form,
  Image,
  Input,
  Row,
  Select,
  Switch,
  message,
  notification,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import backgroundImage from "../assets/img/BackGround_Login.png";
import loginPage from "../assets/img/LoginPage.jpg";
import LogoEureka from "../assets/img/LogoEureka.png";
import "../../src/assets/style.css";
import "./StyleLogin.css";

import { hideMessage, showAuthLoader, userSignIn } from "../appRedux/actions";

import IntlMessages from "util/IntlMessages";
import CircularProgress from "../components/CircularProgress";
const SignIn = () => {
  const [SelectLogin, setSelectLogin] = useState(1);
  const dispatch = useDispatch();
  const { loader, alertMessage, showMessage, authUser } = useSelector(
    ({ auth }) => auth
  );
  const history = useHistory();

  useEffect(() => {
    if (showMessage) {
      setTimeout(() => {
        dispatch(hideMessage());
      }, 100);
    }
    if (authUser !== null) {
      history.push("/");
    }
  });

  const onFinishFailed = (errorInfo) => {};

  const onFinish = (values) => {
    dispatch(showAuthLoader());
    dispatch(
      userSignIn(
        {
          username: values.username,
          password: values.password,
        },
        SelectLogin
      )
    );
  };

  function validasilogin() {
    if (SelectLogin === "")
      notification.error({
        message: "Harus memilih Login dulu",
      });
  }

  return (
    <div
      className="gx-app-login-wrap"
      style={{
        width: "100%",
        // backgroundImage: `url(${loginPage})`,
        backgroundSize: "cover", // Adjust the background size based on your requirement
        backgroundRepeat: "no-repeat", // Adjust the repeat property based on your requirement
        backgroundPosition: "center", // Adjust the position property based on your requirement
      }}
    >
      <Row gutter={[16, 16]} style={{ marginTop: "-5%", marginBottom: "-5%" }}>
        <Col
          sm={2}
          md={16}
          className="d-flex justify-content-center ini-gambar align-items-center"
        >
          <Image width={"90%"} src={loginPage} />
        </Col>
        <Col className="" xs={24} sm={12} md={8} lg={8}>
          <div
            style={{
              backgroundColor: "",
              width: "100%",
              height: "105vh",
              boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)", // Atur sesuai preferensi Anda
            }}
            className="gx-app-login-container"
          >
            <div className="gx-app-login">
              <Row gutter={[16, 16]}>
                <Col
                  sm={12}
                  md={24}
                  xs={24}
                  className="d-flex justify-content-center mb-3 inigambar"
                  style={{ marginTop: "30%" }}
                >
                  <Image width={"45%"} src={LogoEureka} className="mt-5" />
                </Col>
              </Row>

              <Row gutter={[16, 16]}>
                <Col
                  xs={24}
                  sm={12}
                  md={12}
                  lg={12}
                  className="d-flex justify-content-center text-data"
                >
                  <div
                    style={{
                      color: "#1A5CBF",
                      fontWeight: "bold",
                      textAlign: "center",
                      fontSize: "100%",
                    }}
                  >
                    {/* Hello, Welcome ! */}
                  </div>
                </Col>
              </Row>
              <Row
                gutter={[16, 16]}
                style={{ backgroundColor: "" }}
                className="d-flex justify-content-center text-data mt-4"
              >
                <Col
                  style={{ backgroundColor: "" }}
                  className="d-flex justify-content-center text-data"
                >
                  <Select
                    placeholder="Login Elogs"
                    onChange={(e) => setSelectLogin(e)}
                    style={{ width: "100%" }}
                  >
                    <option value={1}>Login Elogs</option>
                    <option value={2}>Login Race</option>
                    <option value={3}>Login Cabang</option>
                  </Select>
                </Col>
              </Row>
              <div style={{ paddingLeft: "10%", paddingRight: "5%" }}>
                <Form
                  style={{ maxWidth: 800 }}
                  initialValues={{ remember: true }}
                  name="basic"
                  onFinish={onFinish}
                  // disabled={!SelectLogin}
                  onFinishFailed={onFinishFailed}
                  className="gx-signin-form gx-form-row0 mt-4"
                  labelCol={{
                    span: 24,
                  }}
                  wrapperCol={{
                    span: 24,
                  }}
                >
                  <label
                    style={{
                      color: "#1A5CBF",
                      fontWeight: "bold",
                      paddingLeft: "5%",
                    }}
                  >
                    Username
                  </label>
                  <Form.Item
                    className="mt-2"
                    initialValue=""
                    rules={[{ required: true, message: "Masukkan UserName!" }]}
                    name="username"
                  >
                    <Input type="text" placeholder="Username" />
                  </Form.Item>
                  <label
                    style={{
                      color: "#1A5CBF",
                      fontWeight: "bold",
                      paddingLeft: "5%",
                    }}
                  >
                    Password
                  </label>
                  <Form.Item
                    className="mt-2"
                    initialValue=""
                    placeholder="password"
                    rules={[{ required: true, message: "Masukkan Password!" }]}
                    name="password"
                  >
                    <Input type="password" placeholder="Password" />
                  </Form.Item>

                  <Form.Item>
                    <Button
                      type="primary"
                      className="gx-mb-5"
                      htmlType="submit"
                      style={{ width: "100%" }}
                    >
                      <IntlMessages id="app.userAuth.signIn" />
                    </Button>
                  </Form.Item>
                </Form>
              </div>
              {/* <div className="gx-app-logo-content">
            <div className="gx-app-logo-content-bg">
              <img
                src={
                  "https://eurekalogistics.files.wordpress.com/2015/04/wpid-mtf_sbeqo_410.jpg?w=648"
                }
                alt="Neature"
              />
            </div>
            <div className="gx-app-logo-wid">
              <h1>
                <IntlMessages id="app.userAuth.signIn" />
              </h1>
            </div>
          </div> */}
              {loader ? (
                <div className="gx-loader-view">
                  <CircularProgress />
                </div>
              ) : null}
              {showMessage ? message.error(alertMessage.toString()) : null}
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default SignIn;
