import React from 'react'

function DataPerpajakan() {
  return (
    <div>
        <tr style={{ textAlign: "center" }}>
              <td colSpan="6">
                {" "}
                <b>
                  {" "}
                  DATA PERPAJAKAN (<i>Tax Information</i>){" "}
                </b>
              </td>
            </tr>
            <tr>
              <td width="100px">NO NPWP </td>{" "}
              <td width="250px"> 94.519.736.6-413.000</td>
              <td width="100px">NAMA NPWP</td>{" "}
              <td align="left" colSpan={3}>
                {" "}
                PT. Adhi Lintas Nusa
              </td>
            </tr>
            <tr>
              <td width="100px">TEMPAT & JALAN</td>{" "}
              <td align="left" colspan="4">
                {" "}
                Jalan Selayar Blok B2 Nomor 1, Kawasan Industri MM2100,
                Mekarwangi, Cikarang Barat, Kab Bekasi, Jawa Barat,17530
              </td>
            </tr>
            <tr>
              <td width="100px">BLOK </td> <td width="250px"> B2</td>
              <td width="100px">NOMOR</td> <td align="left"> 1</td>
            </tr>
            <tr>
              <td width="100px">RT </td> <td width="250px"> -</td>
              <td width="100px">RW</td> <td align="left"> -</td>
            </tr>
    </div>
  )
}

export default DataPerpajakan
