import { Button } from 'antd';
import React from 'react';

const MarketingApprovalBox = () => {
  const handleClick = (spkId) => {
    // Handle click event (e.g., send approval request to the server)
    console.log(`Approving SPK with ID ${spkId}`);
  };

  return (
    
    <div className="row">
      <div className="col-md-3 text-center" style={{ textAlign: 'center', border: '2px dashed #000000', fontSize: '10pt', padding: '6px', fontWeight: 'bold' }}>
        <div className="form-group">
          <label>( <u>&nbsp;&nbsp; Marketing &nbsp;&nbsp;</u>)</label>
          <br /> <br /> <br />
          <img className="img-responsive center-block" src="https://elogs.eurekalogistics.co.id/assets/admin/img/approved.png" alt="Photo Office" width="150" style={{ height: '72px' }} />
          <br />
          <b>26-September-2023 10:22:51</b>
        </div>
      </div>

      {/* operasional */}
      <div className="col-md-3 text-center" style={{ textAlign: 'center', border: '2px dashed #000000', fontSize: '10pt', padding: '6px', fontWeight: 'bold' }}>
        <div className="form-group">
          <label>( <u>&nbsp;&nbsp; Operasional &nbsp;&nbsp;</u>)</label>
          <br /> <br /> <br />
          <img className="img-responsive center-block" src="https://elogs.eurekalogistics.co.id/assets/admin/img/approved.png" alt="Photo Office" width="150" style={{ height: '73px' }} />
          <br />
          <b>27-September-2023 08:20:14</b>
        </div>
      </div>
      {/* end operasional */}

      {/* Purchasing */}
      <div className="col-md-3 text-center" style={{ textAlign: 'center', border: '2px dashed #000000', fontSize: '10pt', padding: '6px', fontWeight: 'bold' }}>
        <div className="form-group">
          <label>( <u>&nbsp;&nbsp; Purchasing &nbsp;&nbsp;</u>)</label>
          <br /> <br /> <br />
          <Button style={{color: 'white', backgroundColor: 'green'}} disabled>Approve</Button>
          <Button  style={{color: 'white', backgroundColor: 'red'}}  disabled>Reject</Button>
          <br /><br />
          <b>-</b>
        </div>
      </div>
      {/* end Purchasing */}

      {/* Akunting */}
      <div className="col-md-3 text-center" style={{ textAlign: 'center', border: '2px dashed #000000', fontSize: '10pt', padding: '6px', fontWeight: 'bold' }}>
        <div className="form-group">
          <label>( <u>&nbsp;&nbsp; Akunting &nbsp;&nbsp;</u>)</label>
          <br /> <br /> <br />
          <Button style={{color: 'white', backgroundColor: 'green'}} >Approve</Button>
          <Button  style={{color: 'white', backgroundColor: 'red'}} data-toggle="modal" data-target="#exampleModal">Reject</Button>
          <br /><br />
          <b>-</b>
        </div>
      </div>
      {/* end Akunting */}
    </div>
    
  );
};

export default MarketingApprovalBox;
