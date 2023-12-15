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
            {/* <div
              style={{
                textAlign: "center",
                backgroundColor: "#007bff",
                color: "white",
                width: "100%",
              }}
            >
            </div> */}
            <table style={{ border: "1px solid black" }}>
              <tr
                style={{
                  backgroundColor: "#007bff",
                  border: "1px solid black",
                }}
              >
                <th
                  colspan="5"
                  style={{
                    color: "white",
                    padding: "10px 0 10px 0",
                    textAlign: "center",
                  }}
                >
                  Transaksi #SP02706/10/23/SBY
                </th>
              </tr>
              <tr>
                <th style={{ border: "1px solid black", textAlign: "center" }}>
                  Customer
                </th>
                <th style={{ border: "1px solid black", textAlign: "center" }}>
                  Sales
                </th>
                <th style={{ border: "1px solid black", textAlign: "center" }}>
                  Service
                </th>
                <th style={{ border: "1px solid black", textAlign: "center" }}>
                  Jenis Barang
                </th>
                <th style={{ border: "1px solid black", textAlign: "center" }}>
                  Tgl Pickup
                </th>
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>
                  PT. Mega Surya Eratama
                </td>
                <td style={{ border: "1px solid black" }}>
                  Warsi Hadi S Maulana
                </td>
                <td style={{ border: "1px solid black" }}>retailer</td>
                <td style={{ border: "1px solid black" }}>Paper Roll</td>
                <td style={{ border: "1px solid black" }}>
                  2023-10-23 11:26:38
                </td>
              </tr>
              <tr>
                <td colspan="5" style={{ border: "1px solid black" }}>
                  <br />
                </td>
              </tr>
              <tr>
                <th style={{ border: "1px solid black", textAlign: "center" }}>
                  Penginput
                </th>
                <td colspan="4" style={{ border: "1px solid black" }}>
                  Rachel
                </td>
              </tr>
              <tr>
                <th style={{ border: "1px solid black", textAlign: "center" }}>
                  Tgl Pesan
                </th>
                <td colspan="4" style={{ border: "1px solid black" }}>
                  2023-10-23 11:27:07
                </td>
              </tr>
              <tr>
                <th style={{ border: "1px solid black", textAlign: "center" }}>
                  Memo
                </th>
                <td colspan="4" style={{ border: "1px solid black" }}></td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
     <table width={`100%`} className="mb-5 mt-2">
     <tr style={{background: `#ecf9ff`, paddingBottom: "10px"}}>
        <td>
          <div style={{textAlign: `center`}}>
            <p>Menuju halaman detail SP</p>
            <div style={{paddingBottom: "10px"}}>
              <a
                href="https://elogs.eurekalogistics.co.id/operasional/myreq/detail/165229"
                style={{padding: "5px 12px 5px 12px", background: "#ffc107", color: "black", borderRadius: `10px`, fontWeight: "700"}}
              >
                Let's Go
              </a>
            </div>
          </div>
        </td>
      </tr>
      <br/>
      <tr>
            <td  style={{
                backgroundColor: "#fafafa",
                textAlign: "center",
                padding: `0 2.5em 0 2.5em`,
              }}>
                <div >
                    <span>If you have any enquiries, please email us at</span><br/>
                    <span>info@eurekalogistics.co.id or visit our FAQs.</span><br/>
                    <span>You have received this email as a registered user of elogs.eurekalogistics.co.id</span><br/>
                    <span>Jl. H.Baping Raya No.100 Ciracas - Jakarta Timur</span><br/>
                </div>
            </td>
        </tr>
     </table>
    </div>
  );
}

export default sm;
