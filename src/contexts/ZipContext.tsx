import {createContext, ReactNode, useContext} from "react"
import {useMyPluginContextContext} from "./PluginContext.tsx";
import JSZip from "jszip";
import {saveAs} from "file-saver";
import {useMyIndexedDbContext} from "./IndexedDbContext.tsx";
import {Note} from "../Interfaces.ts";

interface IZipContextContext{
    downloadFolder:(pdf:string,folder:string)=>void
    openFolder:(file:File)=>Promise<string>
}

const MyContext = createContext<IZipContextContext|undefined>(undefined)

const MyZipContextProvider: React.FC<{children:ReactNode}> = ({children})=>{
    const {notes,setNotes} =useMyPluginContextContext()
    const convertPdfToBlob = (pdf: string): Blob => {
        const base64 = pdf.replace(/^data:application\/[a-zA-Z0-9+.-]+;base64,/, "");
        const cleanBase64 = base64.replace(/\s/g, "");
        const isValidBase64 = /^[A-Za-z0-9+/=]+$/.test(cleanBase64);

        if (!isValidBase64) {
            throw new Error("Invalid base64 string");
        }

        const byteCharacters = atob(cleanBase64);
        const byteNumbers = new Array(byteCharacters.length);

        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);
        return new Blob([byteArray], { type: "application/pdf" });
    };

    const downloadFolder=(pdf:string,folder:string)=>{
        if(notes&&pdf) {
            const zip = new JSZip();
            const jsonString:string = JSON.stringify(notes,null,2);
            zip.file("data.json",jsonString)

            zip.file("book.pdf",convertPdfToBlob(pdf))
            zip.generateAsync({type:"blob"}).then((content)=>{
                saveAs(content,folder);

            })
        }

    }
    const {addNoteToDb}=useMyIndexedDbContext()
    const openFolder = async (file: File): Promise<string> => {
        const zip: JSZip = await JSZip.loadAsync(file);


        const jsonText = await zip.file("data.json")?.async("string");
        if (jsonText) {
            const jsonData = JSON.parse(await jsonText);
            await setNotes(jsonData);
            jsonData.forEach((obj:Note)=>{ addNoteToDb(obj)})
        }

        const pdfBlob = await zip.file("book.pdf")?.async("blob");
        if (pdfBlob) {
            const reader = new FileReader();
            return new Promise<string>(async (resolve, reject) => {
                reader.onloadend = () => {
                    const base64Pdf = reader.result as string;
                    resolve(base64Pdf);
                };

                reader.onerror = (error) => {
                    reject(error);
                };

                reader.readAsDataURL(await pdfBlob);
            });
        }

        return "";
    };



    return (
        <MyContext.Provider value={{downloadFolder,openFolder}}>
            {children}
        </MyContext.Provider>
    )
}

const useMyZipContextContext=()=> {
    const context = useContext(MyContext);
    if (!context) {
        throw new Error("useMyContext must be used within a provider");
    }
    return context;
};
export{MyZipContextProvider, useMyZipContextContext}