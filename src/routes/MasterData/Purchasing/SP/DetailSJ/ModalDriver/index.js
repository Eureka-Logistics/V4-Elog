import { Input, Modal } from 'antd'
import React from 'react'
import DriverTableBaru from '../../../../Driver/DriverTableBaru'
// import "./style.css"
function ModalDriverPurchasing({ setShow, ModalDriverPurch, setModalDriverPurch }) {
    return (
        <Modal
            width={1500}
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
            <DriverTableBaru />
        </Modal>
    )
}

export default ModalDriverPurchasing