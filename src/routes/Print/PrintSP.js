import React from "react";
import { Card } from "antd";
import OrderTable from "./OrderTable";
import ApprovalTable from "./ApprovalTable";
import CommentsTable from "./CommentsTable";
import MarketingApprovalBox from "./MarketingApprovalBox ";
import Header from "./Header";

function PrintSP() {
  return (
    <div style={{overflow: "scroll", maxHeight: "100%"}}>
      <Card>
        <Header />
        <OrderTable />
        <ApprovalTable />
        <CommentsTable />
        <MarketingApprovalBox />
      </Card>
    </div>
  );
}

export default PrintSP;
