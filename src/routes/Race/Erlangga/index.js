import { Card, Col, DatePicker, Row } from 'antd'
import React from 'react'

function Erlangga() {
    const { RangePicker } = DatePicker;
    const datenya = (date, datanggal) => {
        console.log(`ini date`, date);
        console.log(`ini string`, datanggal);
    }
    return (
        <div>
            <Card>
                <Col>
                <div style={{backgroundColor :"yellow" , width :"100%" , height : "50px" , display :"flex"}}>
                    <p>test</p>
                    <RangePicker
                    style={{backgroundColor :"red" }}
                    onChange={datenya} />
                    </div>
                </Col>
            </Card>
        </div>
    )
}

export default Erlangga