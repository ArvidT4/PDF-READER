import {ReactNode, createContext, useContext, useState, useRef, FormEvent} from "react"

interface IHandlePdfContextContext{
    handleFile:(e:FormEvent<HTMLInputElement>)=>void,
    handle:(file: File)=>void,
    pdfFile:string,
}

const MyContext = createContext<IHandlePdfContextContext|undefined>(undefined)

const MyHandlePdfContextProvider: React.FC<{children:ReactNode}> = ({children})=>{
    const [pdfFile,setPdfFile]=useState<string>("");
    const allowedFiles=['application/pdf'];
    const selectedRef=useRef<File|null>(null)
    const handleFile=(e:FormEvent<HTMLInputElement>)=>{
        const target =  e.target as HTMLInputElement & { files: FileList };
        console.log(target);
        if(target && target.files && target.files[0]){

            selectedRef.current=target.files[0]
            console.log(selectedRef.current)

            if(selectedRef.current && allowedFiles.includes(selectedRef.current?.type as string)){
                let reader = new FileReader();
                reader.readAsDataURL(target.files[0])

                reader.onloadend=(e)=>{
                    console.log(reader.result);
                    setPdfFile(reader.result as string);
                }
            }
        }



        else console.log("nono")
    }

    const handle=(file: File)=>{
        console.log(file);
        if(file && file){

            selectedRef.current=file
            console.log(selectedRef.current)

            if(selectedRef.current && allowedFiles.includes(selectedRef.current?.type as string)){
                let reader = new FileReader();
                reader.readAsDataURL(file)

                reader.onloadend=(e)=>{
                    console.log(reader.result);
                    setPdfFile(reader.result as string);
                }
            }
        }



        else console.log("nono")
    }

    return (
        <MyContext.Provider value={{
            handleFile,
            handle,
            pdfFile}}>
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