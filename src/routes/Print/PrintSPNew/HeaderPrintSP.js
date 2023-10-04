import React from "react";

function HeaderPrintSP() {
  return (
    <div>
      <div>
        <div className="row">
          <div className="col-md-12">
          
            <div className=" d-flex">
            <div className="col-md-6 justify-content-start">
              <img
                src="https://elogs.eurekalogistics.co.id/assets/admin/dist/img/logo-eurekalogistics.png"
                height="55px"
                alt="Eureka Logistics Logo"
              />
            </div>
              <div
                className="col-md-6 justify-content-end "
                style={{
                  textAlign: "center",
                  border: "3px dashed #000000",
                  fontSize: "10pt",
                  padding: "7px",
                  fontWeight: "bold",
                }}
              >
                SURAT PERINTAH KERJA <br />
                SPK :
              </div>
            </div>
            <div className="col-md-12  d-flex justify-content-end">
              <div className="col-md-24">
                <small className="pull-right">Ref.SP: SP00199/09/23/JOG</small>
                <br />
                <small className="pull-right">Ref.SP: QJOG23-0199</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeaderPrintSP;
