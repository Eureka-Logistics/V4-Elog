import React from 'react'
import { useState } from 'react';

function EditDetailMitra() {
    const [DataSelect, setDataSelect] = useState("");
    
    const fetchData = async () => {
        try {
          const respons = await axios.get(`${Baseurl}mitra/get-select-mitraPic`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: localStorage.getItem("token"),
            },
          });
          //   console.log("responssssscarismid", respons.data.data);
    
          setDataSelect(respons.data);
          //   setSJList(respons.data?.data?.sj);
        } catch (error) {}
      };
    
  return (
    <div>
      
    </div>
  )
}

export default EditDetailMitra
