import { Card } from "antd";
import React from "react";
import HeaderPrintSP from "./HeaderPrintSP";
import SuratPesanan from "./SuratPesanan";
import PersetujuanBarangMuat from "./PersetujuanBarangMuat";
import Comment from "./Comment";
import MarketingApprovalBox from "../MarketingApprovalBox ";

function PrintSPNew() {
  return (
    <div style={{ overflow: "scroll", maxHeight: "100%" }}>
      <Card>
        <HeaderPrintSP />
        <SuratPesanan />
        <PersetujuanBarangMuat />
        <MarketingApprovalBox/>
      </Card>
    </div>
  );
}

export default PrintSPNew;
