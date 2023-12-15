import React from "react";

function sm() {
  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "0 auto",
        border: "1px solid #d9d9d9",
        padding: "20px",
        overflow: "scroll",
        maxHeight: "750px",
        height: "auto", // Hide the scrollbars
      }}
      className="email-container"
    >
      <table
        align="center"
        width="100%"
        style={{ margin: "auto", marginTop: "2%" }}
      >
        <tr>
          <td width="100%" style={{ textAlign: "center" }}>
            <img
              className="mt-2"
              src="https://elogs.eurekalogistics.co.id/assets/admin/dist/img/logo-eurekalogistics.png"
              class="img-circle"
              width="60%"
            />
          </td>
        </tr>
      </table>
      <table style={{ width: "100%" }}>
        <tr>
          <td>
            <div class="heading-section" className="mt-4 ms-2">
              <p>Pesanan berhasil dibuat. Berikut detail transaksinya:</p>
            </div>
            <div
              style={{
                textAlign: "center",
                backgroundColor: "#007bff",
                color: "white",
                width: "100%",
              }}
            >
              <div style={{ padding: "10px 0 10px 0" }}>
                <b>Transaksi #JKT23-010909</b>
              </div>
            </div>
            <div style={{ textAlign: "center" }}>
              <span>No SP: SP23418/10/23/JKT</span>
            </div>
            <br />
          </td>
        </tr>
      </table>
      {/* CUSTOMER */}
      <>
        <table style={{ width: "100%" }}>
          <tr style={{ border: "1px solid black" }}>
            <th
              style={{
                backgroundColor: "#9acbff",
                border: "1px solid black",
                padding: "10px",
                textAlign: "center",
              }}
            >
              Customer
            </th>
            <td colspan="3">Sari Agrotama Persada,PT</td>
          </tr>
          <tr style={{ border: "1px solid black" }}>
            <th
              style={{
                backgroundColor: "#9acbff",
                border: "1px solid black",
                padding: "10px",
                textAlign: "center",
              }}
            >
              Tgl Muat
            </th>
            <td>22 Oct 2023</td>
            <th
              style={{
                border: "1px solid black",
                backgroundColor: "#9acbff",
                textAlign: "center",
              }}
            >
              Berat
            </th>
            <td>20000</td>
          </tr>
          <tr style={{ border: "1px solid black" }}>
            <th
              style={{
                backgroundColor: "#9acbff",
                border: "1px solid black",
                padding: "10px",
                textAlign: "center",
              }}
            >
              Sales
            </th>
            <td>Andyka JKT</td>
            <th
              style={{
                border: "1px solid black",
                backgroundColor: "#9acbff",
                textAlign: "center",
              }}
            >
              Muatan
            </th>
            <td>Makanan</td>
          </tr>
        </table>
      </>
      <br />
      {/* MUAT DAN BONGKAR */}
      <>
        <table width="100%">
          <tr style={{ border: "1px solid black" }}>
            <th
              style={{
                border: "1px solid black",
                backgroundColor: "#9acbff",
                padding: "30px",
                textAlign: "center",
              }}
            >
              Muat
            </th>
            <td colspan="2">
              Jl.Pulo Kambing Raya Kav.II E No.7 Kawasan Industri Pulo Gadung
              Jakarta Timur
            </td>
            <td style={{ border: "1px solid black" }}>Jakarta Timur</td>
          </tr>
          <tr style={{ border: "1px solid black" }}>
            <th
              style={{
                border: "1px solid black",
                backgroundColor: "#9acbff",
                padding: "30px",
                textAlign: "center",
              }}
            >
              Bongkar
            </th>
            <td colspan="2">
              {" "}
              Plan Majalengka Jalan Raya Cirebon - Bandung KM. 24, Majalengka
            </td>
            <td style={{ border: "1px solid black" }}>Majalengka</td>
          </tr>
        </table>
      </>
      <br />
      {/* MITRA */}
      <>
        <table width={"100%"}>
          <tr>
            <th
              style={{
                backgroundColor: "#9acbff",
                padding: "20px",
                border: "1px solid black ",
                textAlign: "center",
              }}
            >
              Mitra
            </th>
            <th
              style={{
                backgroundColor: "#9acbff",
                padding: "20px",
                border: "1px solid black ",
                textAlign: "center",
              }}
            >
              Unit 1
            </th>
            <th
              style={{
                backgroundColor: "#9acbff",
                padding: "20px",
                border: "1px solid black ",
                textAlign: "center",
              }}
            >
              Unit 2
            </th>
            <th
              style={{
                backgroundColor: "#9acbff",
                padding: "20px",
                border: "1px solid black ",
                textAlign: "center",
              }}
            >
              Unit 3
            </th>
          </tr>
          <tr style={{ border: "1px solid black" }}>
            <th
              style={{
                padding: "20px",
                textAlign: "center",
                border: "1px solid black",
              }}
            >
              Nama Mitra
            </th>
            <td style={{ border: "1px solid black" }}>
              PT. EUREKA LOGISTICS (EL)
            </td>
            <td style={{ border: "1px solid black" }}>
              PT. EUREKA LOGISTICS (EL)
            </td>
            <td style={{ border: "1px solid black" }}>
              PT. EUREKA LOGISTICS (EL)
            </td>
          </tr>
          <tr style={{ border: "1px solid black" }}>
            <th
              style={{
                padding: "20px",
                textAlign: "center",
                border: "1px solid black",
              }}
            >
              Kendaraan
            </th>
            <td style={{ border: "1px solid black" }}>Wingbox</td>
            <td style={{ border: "1px solid black" }}>Wingbox</td>
            <td style={{ border: "1px solid black" }}></td>
          </tr>
          <tr style={{ border: "1px solid black" }}>
            <th
              style={{
                padding: "20px",
                textAlign: "center",
                border: "1px solid black",
              }}
            >
              Nopol
            </th>
            <td style={{ border: "1px solid black" }}>B 9120 NEU</td>
            <td style={{ border: "1px solid black" }}>B 9120 NEU</td>
            <td style={{ border: "1px solid black" }}></td>
          </tr>
          <tr style={{ border: "1px solid black" }}>
            <th
              style={{
                padding: "20px",
                textAlign: "center",
                border: "1px solid black",
              }}
            >
              Driver
            </th>
            <td style={{ border: "1px solid black" }}>Sandi</td>
            <td style={{ border: "1px solid black" }}></td>
            <td style={{ border: "1px solid black" }}></td>
          </tr>
          <tr style={{ border: "1px solid black" }}>
            <th
              style={{
                padding: "20px",
                textAlign: "center",
                border: "1px solid black",
              }}
            >
              Telp
            </th>
            <td style={{ border: "1px solid black" }}></td>
            <td style={{ border: "1px solid black" }}></td>
            <td style={{ border: "1px solid black" }}></td>
          </tr>
        </table>
      </>
      {/* HARGA */}
      <>
        <br />
        <div
          style={{
            textAlign: "center",
            backgroundColor: "#007bff",
            color: "white",
            width: "100%",
          }}
        >
          <div style={{ padding: "10px 0 10px 0" }}>
            <b>Harga Rp0</b>
          </div>
        </div>
      </>

      {/* Penginput */}
      <br />
      <>
        <table style={{ width: "100%" }}>
          <tr style={{ border: "1px solid black" }}>
            <th
              style={{
                backgroundColor: "#9acbff",
                padding: "10px",
                border: "1px solid black ",
                textAlign: "center",
              }}
            >
              Penginput
            </th>
            <td style={{ border: "1px solid black" }}>Adinda Putri R</td>
            <td style={{ border: "1px solid black" }}>2023-10-23 09:33:12</td>
          </tr>
          <tr style={{ border: "1px solid black" }}>
            <th
              style={{
                backgroundColor: "#9acbff",
                padding: "10px",
                border: "1px solid black ",
                textAlign: "center",
              }}
            >
              Cabang
            </th>
            <td style={{ border: "1px solid black" }}>11</td>
            <td style={{ border: "1px solid black" }}>1101</td>
          </tr>
        </table>
      </>

      {/* menuju halaman detail SP */}
      <>
        <br />
        <table style={{ width: "100%" }} className="mb-5">
          <tr style={{ backgroundColor: "#ecf9ff", paddingBottom: "20px" }}>
            <td>
              <div style={{ textAlign: "center" }}>
                <p>Menuju halaman detail SP</p>
                <div style={{ paddingBottom: "20px" }}>
                  <a
                    href="https://elogsv4.eurekalogistics.co.id/signin"
                    style={{
                      padding: `5px 12px 5px 12px`,
                      backgroundColor: "#ffc107",
                      color: "black",
                      borderRadius: "10px",
                      fontWeight: `700`,
                    }}
                  >
                    Klik disini
                  </a>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td
              style={{
                backgroundColor: "#fafafa",
                textAlign: "center",
                padding: `0 2.5em 0 2.5em`,
              }}
            >
              <div>
                <span>If you have any enquiries, please email us at</span>
                <br />
                <span>info@eurekalogistics.co.id or visit our FAQs.</span>
                <br />
                <span>
                  You have received this email as a registered user of
                  <a style={{marginLeft: '5px'}} href="mailto:elog@eurekalogistics.co.id" target="_blank">
                    elogs.eurekalogistics.co.id
                  </a>
                </span>
                <br />
                <span>Jl. H.Baping Raya No.100 Ciracas - Jakarta Timur</span>
                <br />
              </div>
            </td>
          </tr>
        </table>
      </>
    </div>
  );
}

export default sm;
