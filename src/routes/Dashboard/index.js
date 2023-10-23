import React, { useState, useEffect } from "react";
import mobil from "../redux toolkit/store/ZustandStore";
import IntlMessages from "util/IntlMessages";
import { useHistory } from "react-router-dom";
import Token from "../../Api/Token";
import axios from "axios";
import Baseurl from "../../Api/BaseUrl";
import Swal from "sweetalert2";
import Card from "antd/lib/card/Card";
import { Row, Col } from "react-bootstrap";
import DashboardOperasional from "./DashboardOperasional/index"
import DashboardPurchasing from "./DashboardPurchasing/index"
import DetailUserLoginZustand from "../../zustand/Store/DetailUserLogin/Index";
import { useSelector } from "react-redux";
import Index from "../Race/WebAdmin/Index";
import DashboardSales from "./DashboardSales/Index";
const SamplePage = () => {

  const { jobdesk, setJobdesk } = mobil((state) => ({
    jobdesk: state.jobdesk,
    setJobdesk: state.setJobdesk
  }))
  const [namaJobdesk, setNamaJobdesk] = useState('');
  const [inform, setinform] = useState('');
  const history = useHistory()
  const { userProfileZustand, setuserProfileZustand } = DetailUserLoginZustand((i) => ({
    userProfileZustand: i.DetailUserLoginZustandState,
    setuserProfileZustand: i.setDetailUserLoginZustand,
  }))
  
  localStorage.setItem(`level`,userProfileZustand?.level)

  useEffect(() => {
    const jobdesk = localStorage.getItem('jobdesk');
    if (Token === "") {
      history.push('/signin')
    }
    setJobdesk(jobdesk)
    setNamaJobdesk(jobdesk);


  }, []);

  console.log(`ini DetailUserLoginZustand`, userProfileZustand);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${Baseurl}information/get-inform-ops`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      });
      if (response.status === 200) {
        const data = response.data?.operasional?.[0];
        console.log(response.data?.operasional?.[0]);
        setinform(data);
        console.log(response.status);
      } else if (response.status === 401) {
        localStorage.removeItem('token');
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Error Login, Silahkan Login Kembali '
        });
        setTimeout(() => {
          window.location.reload()
        }, 2000);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        localStorage.removeItem('token');
        if (localStorage.getItem('token') === null) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Error Login, Silahkan Login Kembali '
          });
          setTimeout(() => {
            window.location.reload()
          }, 2000);
          // history.push('/signin');
        }
      } else {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    fetchData();
    // setDetailUserLoginZustand()
    setuserProfileZustand()
  }, []);



  return (
    <div>
      <Row>
        {jobdesk === "operasional" &&
          (
            <>
              <DashboardOperasional />
            </>
          )}
        {jobdesk === "purchasing" &&
          (
            <>
              <DashboardPurchasing />
            </>
          )}
        {jobdesk === "sales" &&
          (
            <>
            <DashboardSales/>
            </>
          )}
        {jobdesk === "rcadmin" &&
          (
            <Index />
          )}

      </Row>

    </div>
  );
};

export default SamplePage;
