import {useMyIndexedDbContext} from "../contexts/IndexedDbContext.tsx";
import {useMyHandlePdfContextContext} from "../contexts/HandlePdfContext.tsx";
import {useMyPluginContextContext} from "../contexts/PluginContext.tsx";
import * as React from "react";

interface props{
    setShow:React.Dispatch<React.SetStateAction<any>>,
}
const DBClear:React.FC<props> = ({setShow}) => {
    const {clearIndexedDB}=useMyIndexedDbContext()
    const {setPdfFile}=useMyHandlePdfContextContext()
    const {setNotes}=useMyPluginContextContext()
    const clear=()=>{
        const NOTES_DB_NAME="notes";
        const PDF_DB_NAME="pdf";
        const INDEXED_DB_NAME:string[]=["NotesDB","PDF"];
        clearIndexedDB(INDEXED_DB_NAME[0],NOTES_DB_NAME)
        clearIndexedDB(INDEXED_DB_NAME[1],PDF_DB_NAME)
        setNotes([]);
        setPdfFile("");
        setShow(false);
    }
    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            setShow(false);
        }
    };
  return (
    <div onClick={handleOverlayClick} className={"fixed inset-1 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30"}>
        <div className={"border bg-white w-60 rounded-md"}>
            <div className={"flex p-4"}>
                <div className={"font-bold m-1 ml-2"}>Are you sure?</div>
                <div className={"flex-1"}>
                    <div  className={" place-self-end"}>
                        <button onClick={()=>setShow(false)} className={"border place-self-end mr-3 h-7 text-center w-7 rounded-md"}>
                            X
                        </button>

                    </div>

                </div>
            </div>

            <div className={"m-4 p-3"}>
                <button onClick={clear} className={"border w-full p-2 rounded-md place-self-center"}>Clear PDF and Notes</button>
            </div>
        </div>

    </div>
  );
};

export default DBClear;