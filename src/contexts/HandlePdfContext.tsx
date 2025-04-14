import {ReactNode, createContext, useContext, useState, useRef, FormEvent, useEffect} from "react"
import {Note} from "../Interfaces.ts";
import * as React from "react";
import JSZip from "jszip";
import {useMyZipContextContext} from "./ZipContext.tsx";
import {useMyPluginContextContext} from "./PluginContext.tsx";
import {saveAs} from "file-saver";
import {useMyIndexedDbContext} from "./IndexedDbContext.tsx";

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
    const {addPDFToDb ,getPDF}=useMyIndexedDbContext()
    useEffect(() => {
        getPDF().then((pdf:string)=>{
            if(pdf!="No PDF found in IndexedDB")setPdfFile(pdf);
        })
    }, []);
    const readFile=(file:File)=>{
        let reader = new FileReader();
        reader.readAsDataURL(file)

        reader.onloadend=(e)=>{
            addPDFToDb(reader.result as string);
            setPdfFile(reader.result as string);
        }
    }
    const {openFolder}=useMyZipContextContext()
    const handle=async (file: File)=>{
        if(file && file){
            selectedRef.current=file
            if(selectedRef.current && allowedFiles.includes(selectedRef.current?.type as string)){
                if(selectedRef.current?.type as string===allowedFiles[0]) readFile(file);
                else {
                    const pdf:string=await openFolder(file);
                    if(pdf!=""){
                        addPDFToDb(pdf as string);
                        setPdfFile(pdf);

                    }
                }

            }
        }



        else console.log("nono")
    }



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