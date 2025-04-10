import {ReactNode, createContext, useContext, useState, useRef, FormEvent, useEffect} from "react"
import {Note} from "../Interfaces.ts";
import {getNotesFromSession, getPdfFromSession} from "./SessionFunctions.ts";
import * as React from "react";
import JSZip from "jszip";
import {useMyZipContextContext} from "./ZipContext.tsx";
import {useMyPluginContextContext} from "./PluginContext.tsx";
import {saveAs} from "file-saver";

interface IHandlePdfContextContext{
    handle:(file: File)=>void,
    pdfFile:string,
    setPdfFile:React.Dispatch<React.SetStateAction<any>>,
}

const MyContext = createContext<IHandlePdfContextContext|undefined>(undefined)

const MyHandlePdfContextProvider: React.FC<{children:ReactNode}> = ({children})=>{
    const [pdfFile,setPdfFile]=useState<string>("");
    const allowedFiles=['application/pdf','application/zip','application/x-zip-compressed'];
    const selectedRef=useRef<File|null>(null)

    const readFile=(file:File)=>{
        let reader = new FileReader();
        reader.readAsDataURL(file)

        reader.onloadend=(e)=>{
            console.log(reader.result);
            setPdfFile(reader.result as string);
        }
    }
    const {openFolder}=useMyZipContextContext()
    const handle=async (file: File)=>{
        console.log(file);
        if(file && file){

            selectedRef.current=file
            console.log(selectedRef.current?.type)

            if(selectedRef.current && allowedFiles.includes(selectedRef.current?.type as string)){
                if(selectedRef.current?.type as string===allowedFiles[0]) readFile(file);
                else {
                    const pdf:string=await openFolder(file);
                    if(pdf!=""){
                        setPdfFile(pdf);

                    }
                }

            }
        }



        else console.log("nono")
    }

    const {notes,setNotes} =useMyPluginContextContext()


    return (
        <MyContext.Provider value={{
            handle,
            pdfFile,
            setPdfFile,
        }}>
            {children}
        </MyContext.Provider>
    )
}

const useMyHandlePdfContextContext=()=> {
    const context = useContext(MyContext);
    if (!context) {
        throw new Error("useMyContext must be used within a provider");
    }
    return context;
};
export{MyHandlePdfContextProvider, useMyHandlePdfContextContext}