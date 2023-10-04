import { Card } from "antd";
import React, { useState } from "react";
import { Col, Row, Tab, Tabs } from "react-bootstrap";
import { useParams } from "react-router-dom";
import FormDataDetailMitra from "./Form/DataProfile";
import DataReferensi from "./Form/DataReferensi";
import DataKeuangan from "./Form/DataKeuangan";
import PIC from "./Form/PIC";
import DataBaru from "./Form/Databaru";
import GetMitraCabang from "./MasterCabang/GetMitraCabang";

// import Report from "./Form/Report";
export default function DetailMitra() {
  const url = window.location.href;
  const mitraId = url.substring(url.lastIndexOf("/") + 1);
  const [activeTab, setActiveTab] = useState('home');
  return (
    <div>
      <Card>
        <Row className="d-flex justify-content-end">
          <Col>
            <Tabs
              defaultActiveKey="home"
              transition={false}
              id="noanim-tab-example"
              className="mb-3 d-flex justify-content-end"
              activeKey={activeTab} // Gunakan state activeTab sebagai activeKey
              onSelect={(k) => setActiveTab(k)}
            >
              {/* <Tab  eventKey="home" title="DATA PROFILE">
                <FormDataDetailMitra mitraId={mitraId} />
              </Tab> */}
              <Tab eventKey="home" title="DATA PROFILE">
                <DataBaru mitraId={mitraId} setActiveTab={setActiveTab} />
              </Tab>
              <Tab eventKey="profile" title="DATA REFERENSI">
                <DataReferensi setActiveTab={setActiveTab} mitraId={mitraId} />
              </Tab>
              {/* <Tab eventKey="keuangan" title="DATA KEUANGAN">
                <DataKeuangan setActiveTab={setActiveTab} mitraId={mitraId} />
              </Tab> */}
              <Tab eventKey="longer-tab" title="DATA CABANG">
                <GetMitraCabang mitraId={mitraId} />
              </Tab>
              <Tab eventKey="contact" title="PIC">
                <PIC mitraId={mitraId} />


                {/* <PIC namaMitra={namaMitra}/> */}

              </Tab>
              {/* <Tab eventKey="contacts" title="Report">
                <Report mitraId={mitraId} />
              </Tab> */}
            </Tabs>
          </Col>
        </Row>
      </Card>
    </div>
  );
}
