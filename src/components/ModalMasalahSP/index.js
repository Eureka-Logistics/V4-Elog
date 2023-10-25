import { Button, Input, Modal } from 'antd';
import { Row } from 'react-bootstrap';
export function ModalMasalahSO({ ModalMasalahSOFunc, title, setModalMasalahSOFunc }) {
    return (
        <Modal
            title={title}
            style={{
                top: 20,
            }}
            open={ModalMasalahSOFunc}
            onOk={() => setModalMasalahSOFunc(false)}
            onCancel={() => setModalMasalahSOFunc(false)}
        >
            <Row>
                <Input placeholder='laporkan masalah'/>
            </Row>

        </Modal>
    )
}