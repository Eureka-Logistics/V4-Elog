import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import Baseurl from '../../../Api/BaseUrl'

function DetailKendaraanSOdiSemuaSO({ idmpd }) {
    const [Detail, setDetail] = useState("")
    const ambildata = async () => {
        try {
            const data = await axios.get(
                `${Baseurl}sm/get-sm-detail?id_mpd=${idmpd}&id_msm=`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: localStorage.getItem('token'),
                    },
                }
            );
            setDetail(data?.data?.data[0]);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        ambildata(); // Memanggil ambildata
    }, [idmpd]); // idmpd sebagai dependency
    return (
        <div>
            <Table responsive bordered>
                <thead>
                    <tr style={{ fontWeight: "bold", backgroundColor: "#dff0d8" }}>
                        <td style={{ backgroundColor: "#b7d1f8" }}>Mitra 1</td>
                        <td style={{ backgroundColor: "#b7d1f8" }}>Driver 1</td>
                        <td>Mitra 2</td>
                        <td>Driver 2</td>
                        <td style={{ backgroundColor: "#BBF6EE" }}>Mitra 3</td>
                        <td style={{ backgroundColor: "#BBF6EE" }}>Driver 3</td>
                    </tr>
                </thead>
                <tbody>
                    <tr >
                        <td>{Detail?.mitraPickup}</td>
                        <td>{Detail?.driver1} {Detail?.unit1} ({Detail.kendaraanPickup})</td>
                        <td>{Detail?.mitra1}</td>
                        <td>{Detail?.driver2} {Detail?.unit2} ({Detail.kendaraanMitra1})</td>
                        <td>{Detail?.mitra2}</td>
                        <td>{Detail?.driver3} {Detail?.unit3} ({Detail.kendaraanMitra2})</td>
                    </tr>
                </tbody>
            </Table>
        </div>

    )
}

export default DetailKendaraanSOdiSemuaSO