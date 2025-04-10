import {useMyZipContextContext} from "../contexts/ZipContext.tsx";
import {useMyHandlePdfContextContext} from "../contexts/HandlePdfContext.tsx";
import {useEffect} from "react";
import {Note} from "../Interfaces.ts";

interface note{
    notes:Note[]
}
const DownloadZip:React.FC<note> = ({notes}) => {
    const {downloadFolder}=useMyZipContextContext();
    const {pdfFile}=useMyHandlePdfContextContext();

    const downloadFolderClient=()=>{
        if(pdfFile&&notes){
            downloadFolder(pdfFile);
        }

    }
    return (
    <div>
        <button className={"p-3 border"} onClick={downloadFolderClient}>Save PDF</button>
    </div>
  );
};

export default DownloadZip;