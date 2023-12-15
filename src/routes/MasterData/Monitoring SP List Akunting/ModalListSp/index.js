import { Modal } from 'antd'
import React from 'react'
import SPListlama from '../../SP List/Splistlama'

function ModalListSPLama({ setShowModalListSPLama, ShowModalListSPLama }) {
    return (
        <div>
            <Modal
                width={1200}
                style={{
                    top: 20,
                }}
                open={ShowModalListSPLama}
                onOk={() => setShowModalListSPLama(false)}
                onCancel={() => setShowModalListSPLama(false)}
            >
                <SPListlama />
            </Modal>
        </div>
    )
}

export default ModalListSPLama