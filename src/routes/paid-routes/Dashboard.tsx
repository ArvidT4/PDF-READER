import {usePdfTableContext} from "../../contexts/PaidContexts/PdfTableContext.tsx";
import {useEffect} from "react";

const Dashboard = () => {
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
        {pdfs ?<div>
            {pdfs?.length == 0 ? <div>No pdfs uploaded</div> : <div></div>}
        </div>: <div>loading...</div>}


    </div>
  );
};

export default Dashboard;