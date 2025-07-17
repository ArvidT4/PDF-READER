import {ReactNode, createContext, useContext, useState, useRef, useEffect} from "react"
import * as React from "react";
import axios, {AxiosResponse} from "axios";
import {IPdfs} from "../../Interfaces.ts";


interface IPdfTableContext{
    selectPdfsTable:()=>void
    pdfs:IPdfs[]|undefined
    setPdfs: React.Dispatch<React.SetStateAction<IPdfs[]>>
}

const MyContext = createContext<IPdfTableContext|undefined>(undefined)

const MyPdfTableContextProvider: React.FC<{children:ReactNode}> = ({children})=>{
    const [pdfs,setPdfs]=useState<IPdfs[]|undefined>(undefined)
    const insertPdfTable=async (pdf:File,title:string)=>{
        try{
            const formData = new FormData();
            formData.append("file",pdf);
            formData.append("title",title);
            const response:Promise<AxiosResponse>=axios.post('http://localhost:3000/pdf/insertPdf',{
                body:formData
            } ,{
                withCredentials: true,
            })
            console.log(response)
        }
        catch(err){
            console.log(err)
        }
    }


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
            setPdfs
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
