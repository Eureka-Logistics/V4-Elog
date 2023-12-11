import { Modal, notification } from 'antd'
import React, { useEffect, useState } from 'react'
import ModalState from '../../../../../../zustand/Store/Race/StateModal/Modal'

function ModalEditAlamat({ EditAlamat, setEditAlamat, EditSekolah }) {
    console.log(`EditAlamat modals`, EditAlamat);
    const [isiPesan, setisiPesan] = useState("")
    const isidilarang = ["", "test", "test2", "test3"]

    const EditSkolah = () => {
        const containsForbiddenString = isidilarang.some(forbidden => isiPesan.includes(forbidden));
    
        if (containsForbiddenString) {
            notification.error({
                message: "Pesan Tidak Boleh Kosong / test",
            });
        } else {
            EditSekolah(isiPesan);
            setEditAlamat(false);
            setisiPesan("");
        }
    };
    
    return (
        <div>
            <Modal
                open={EditAlamat}
                title={"Edit Alamat Customer"}
                onCancel={() => {
                    setEditAlamat(false)
                    setisiPesan("")
                }}
                onOk={() => EditSkolah()}
            >
                <div>
                    <p>Tuliskan Alasan Perubahan Alamat Customer</p>
                    <textarea style={{ width: "100%" }}
                        onChange={(e) => setisiPesan(e.target.value)}
                        value={isiPesan}
                    >

                    </textarea>
                </div>
            </Modal>



        </div >
    )
}

export default ModalEditAlamat