import {useState} from "react";
import DBClear from "./DBClear.tsx";

const RemovePDFAndNotes = () => {
    const [show,setShow]=useState<boolean>(false);
  return (
    <div>
        <button onClick={()=>setShow(true)} className={"border rounded-md p-2 m-2 hover:bg-gray-200 duration-300"}>Clear PDF and notes</button>
        {show&&<DBClear setShow={setShow}/>}
    </div>
  );
};

export default RemovePDFAndNotes;