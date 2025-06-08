import React, {useState} from "react";
import {Note} from "../Interfaces.ts";
import SavePDF from "./SavePDF.tsx";

interface note{
    notes:Note[]
}
const DownloadZip:React.FC<note> = ({notes}) => {
    const [show,setShow]=useState<boolean>(false);

    return (
    <div>
        <button className={"border rounded-md p-2 m-2 hover:bg-gray-200 duration-300"} onClick={()=>setShow(true)}>Save PDF</button>
        {show&&<SavePDF setShow={setShow} notes={notes}/>}
    </div>
  );
};

export default DownloadZip;