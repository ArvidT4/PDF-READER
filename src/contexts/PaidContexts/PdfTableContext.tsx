import {ReactNode, createContext, useContext, useState, useRef, useEffect} from "react"
import * as React from "react";
import axios, {AxiosResponse} from "axios";
import {IMetadata, IPdfs} from "../../Interfaces.ts";


interface IPdfTableContext{
    selectPdfsTable:()=>void
    pdfs:IMetadata[]|undefined
    setPdfs: React.Dispatch<React.SetStateAction<IMetadata[]>>
    handle:(file:File)=>void
    insertPdfTable:(title:string)=>void
}

const MyContext = createContext<IPdfTableContext|undefined>(undefined)

const MyPdfTableContextProvider: React.FC<{children:ReactNode}> = ({children})=>{
    const [pdfs,setPdfs]=useState<IMetadata[]|undefined>(undefined)

    const [pdfFile,setPdfFile]=useState<File|undefined>(undefined);
    const allowedFiles=['application/pdf','application/zip','application/x-zip-compressed'];
    const selectedRef=useRef<File|null>(null)

    const readFile=(file:File)=>{
        let reader = new FileReader();
        reader.readAsDataURL(file)

        reader.onloadend=()=>{
            //setPdfFile(reader.result as string);
        }
    }
    const handle=async (file: File)=>{
        if(file && file){
            selectedRef.current=file
            if(selectedRef.current && allowedFiles.includes(selectedRef.current?.type as string)){
                if(selectedRef.current?.type as string===allowedFiles[0]) setPdfFile(file);
            }
        }
        else console.log("nono")
    }
    const insertPdfTable = async (title: string) => {
        try {
            if (pdfFile && title) {
                console.log(title)
                const formData = new FormData();
                formData.append("pdf", pdfFile); // 👈 match this name to `upload.single('pdf')`
                formData.append("title", title);

                const response = await axios.post(
                    'http://localhost:3000/pdf/insertPdf',
                    formData,
                    {
                        withCredentials: true,
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    }
                );
                console.log(response);
            }
        } catch (err) {
            console.log(err);
        }
    };


    const selectPdfsTable=async ()=>{
        try{
            console.log("2")

            const response:AxiosResponse=await axios.get('http://localhost:3000/pdf/selectPdfs', {
                withCredentials: true,
            });
            if(response.status==200)setPdfs(response.data)
            console.log(response)
        }catch(err){
            console.log(err)
        }

    }

    return (
        <MyContext.Provider value={{
            selectPdfsTable,
            pdfs,
            setPdfs,
            handle,
            insertPdfTable
        }}>
            {children}
        </MyContext.Provider>
    )
}

const usePdfTableContext=()=> {
    const context = useContext(MyContext);
    if (!context) {
        throw new Error("useMyContext must be used within a provider");
    }
    return context;
};
export{MyPdfTableContextProvider, usePdfTableContext}
