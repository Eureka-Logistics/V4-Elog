import { Input, Modal } from 'antd'
import React, { useState } from 'react'
import DriverTableBaru from '../../../../Driver/DriverTableBaru'
// import "./style.css"
function ModalDriverPurchasing({ setShow, ModalDriverPurch, setModalDriverPurch }) {
    const [ValidasiTombol ,setValidasiTombol] = useState(false)
    return (
        <Modal
            width={1700}
            title="Add Driver dan Vehicle"
            style={{
                top: 20,
            }}
            open={ModalDriverPurch}
            onOk={() => {setModalDriverPurch(false)
                setShow(true)}}
            onCancel={() => {
                setModalDriverPurch(false)
                setShow(true)
            }}
        >
            <DriverTableBaru ValidasiTombol={ValidasiTombol} setValidasiTombol={setValidasiTombol}/>
        </Modal>
    )
}

export default ModalDriverPurchasing