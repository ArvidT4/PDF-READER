import DropComp from "../../uploadAndView/DropComp.tsx";
import {ChangeEvent, Dispatch, FormEvent, SetStateAction, useState} from "react";
import {usePdfTableContext} from "../../contexts/PaidContexts/PdfTableContext.tsx";

const InsertPdf=()=>{
    const [title,setTitle]=useState<string>("")
    const {insertPdfTable,handle}=usePdfTableContext()
    const handleChange=(e:ChangeEvent<HTMLInputElement>,set:Dispatch<SetStateAction<string>>)=>{
        set(e.target.value)
    }
    const uploadPdf=async (e)=>{
        e.preventDefault()
        await insertPdfTable(title)
    }
    return(
        <div className={"border border-gray-400 border-xl bg-gray-600 flex-1 flex place-content-center p-5"}>
            <form onSubmit={(e:FormEvent<HTMLFormElement>)=>uploadPdf(e)}>
                <div className={"m-auto"}>
                    <label>Pdf title: </label>
                    <input onChange={(e:ChangeEvent<HTMLInputElement>)=>handleChange(e,setTitle)} className={"border rounded-md bg-gray-300"}/>
                </div>

                <DropComp handleFunction={handle}/>
                <button>Upload pdf</button>
            </form>

        </div>
    )
}
export default InsertPdf