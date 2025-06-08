import * as React from "react";
import {useMyHandlePdfContextContext} from "../contexts/HandlePdfContext.tsx";
import {useMyZipContextContext} from "../contexts/ZipContext.tsx";
import {Note} from "../Interfaces.ts";
import {ChangeEvent, useState} from "react";
interface props{
    setShow:React.Dispatch<React.SetStateAction<any>>,
    notes:Note[]
}
const SavePDF:React.FC<props> = ({setShow,notes}) => {
    const {pdfFile}=useMyHandlePdfContextContext();
    const {downloadFolder}=useMyZipContextContext();
    const [name,setName]=useState<string>("");
    const downloadFolderClient=()=>{
        if(pdfFile&&notes){
            downloadFolder(pdfFile,name);
        }

    }
    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            setShow(false);
        }
    };
    const handleInput=(e:ChangeEvent<HTMLInputElement>)=>{
        setName(e.target.value)
    }
    return (
        <div onClick={handleOverlayClick} className={"fixed inset-1 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30"}>
            <div className={"border bg-white w-60 rounded-md"}>
                <div className={"flex p-4"}>
                    <div className={"font-bold m-1 ml-2"}>Download PDF and notes as ZIP</div>
                    <div className={"flex-1"}>
                        <div  className={" place-self-end"}>
                            <button onClick={()=>setShow(false)} className={"border place-self-end mr-3 h-7 text-center w-7 rounded-md"}>
                                X
                            </button>

                        </div>

                    </div>
                </div>
                <div className={"place-content-center flex"}>
                    <input onChange={(e:ChangeEvent<HTMLInputElement>)=>handleInput(e)} placeholder={"Folder name"} className={"border p-1 rounded-md"}/>
                </div>
                <div className={"m-4 p-3"}>
                    <button onClick={downloadFolderClient} className={"border w-full p-2 rounded-md place-self-center"}>Download PDF</button>
                </div>
            </div>

        </div>
    );
};

export default SavePDF;