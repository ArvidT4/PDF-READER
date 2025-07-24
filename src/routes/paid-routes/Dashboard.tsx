import {usePdfTableContext} from "../../contexts/PaidContexts/PdfTableContext.tsx";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import InsertPdf from "../../Components/paid-comps/InsertPdf.tsx";
import {b} from "vite/dist/node/moduleRunnerTransport.d-CXw_Ws6P";
import {IMetadata} from "../../Interfaces.ts";
import PdfTableComponent from "../../Components/paid-comps/PdfTableComponent.tsx";

const Dashboard = () => {
    const [showInsert,setShowInsert]=useState<boolean>(false)
    const {selectPdfsTable,pdfs}=usePdfTableContext();
    useEffect(() => {
        const fetchPdfs = async () => {
            if (!pdfs || pdfs.length === 0) {
                await selectPdfsTable();
            }
        };

        fetchPdfs();
    }, []);
  return (
    <div className={"text-white"}>
        <div className={"p-3"}>
            <h1 className={"text-3xl font-bold"}>Dashboard</h1>
        </div>
        <div>
            <button onClick={()=>setShowInsert(!showInsert)} className={"border rounded-lg bg-gray-600 border-gray-400 p-1"}>Insert pdf +</button>
            {showInsert&&<InsertPdf/>}
        </div>
        {pdfs ?<div>
            {pdfs?.length == 0 ? <div>No pdfs uploaded</div> : <div className={"m-3 grid-cols-4 grid"}>
                {pdfs.map((metadata:IMetadata,key)=>{
                    return <PdfTableComponent key={key} metadata={metadata}/>
                })}
            </div>}
        </div>: <div>loading...</div>}


    </div>
  );
};

export default Dashboard;