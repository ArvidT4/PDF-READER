import {IMetadata, ISignedUrl} from "../../Interfaces.ts";
import {usePdfTableContext} from "../../contexts/PaidContexts/PdfTableContext.tsx";
import {useState} from "react";

interface props{
    metadata:IMetadata
}

const PdfTableComponent:React.FC<props> = ({metadata}) => {
    const {generatePdfFile}=usePdfTableContext()
    const [signedUrl,setSigned]=useState<ISignedUrl|undefined>()
    const genPdf=async ()=>{
        const signed:ISignedUrl|undefined= await generatePdfFile(metadata.filepath)
        console.log(signedUrl)
        setSigned(signed)
    }
  return (
    <div onClick={genPdf} className={"border border-gray-40000 rounded-xl bg-gray-700 p-4 m-1 flex"}>
        <div>
            <img className={"h-28"} alt={"book cover"} src={"/images.jpg"}/>
        </div>
        <div className={"text-white text-2xl"}>
            {metadata.title}
        </div>
        {signedUrl&&<iframe   src={signedUrl.signedUrl}
                                       style={{ width: '100%', height: '90vh', border: 'none' }}
                                       title="PDF Preview">

        </iframe>}
    </div>
  );
};

export default PdfTableComponent;