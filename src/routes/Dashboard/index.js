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
const SamplePage = () => {


  const { jobdesk, setJobdesk } = mobil((state) => ({
    jobdesk: state.jobdesk,
    setJobdesk: state.setJobdesk
  }))
  const [namaJobdesk, setNamaJobdesk] = useState('');
  const [inform, setinform] = useState('');
  const history = useHistory()
  useEffect(() => {
    const jobdesk = localStorage.getItem('jobdesk');
    if (Token === "") {
      history.push('/signin')
    }
    setJobdesk(jobdesk)
    setNamaJobdesk(jobdesk);

  }, []);

  console.log(`ini zustand`, jobdesk);

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
               <DashboardPurchasing/>
              </>
            )}
          {jobdesk === "sales" &&
            (
              <>
                <h5>ini dashboard {jobdesk}</h5>
              </>
            )}
          {jobdesk === "akunting" &&
            (
              <>
                <h5>ini dashboard {jobdesk}</h5>
              </>
            )}

        </Row>

    </div>
  );
};

export default SamplePage;