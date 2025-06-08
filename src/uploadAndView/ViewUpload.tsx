import '@react-pdf-viewer/highlight/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import '@react-pdf-viewer/page-navigation/lib/styles/index.css';
import '@react-pdf-viewer/core/lib/styles/index.css';
import {useMyHandlePdfContextContext} from "../contexts/HandlePdfContext.tsx";
import DropComp from "./DropComp.tsx";
import PdfWorker from "./PdfWorker.tsx";
import {useMyNavigatorContextContext} from "../contexts/NavigatorContext.tsx";

const ViewUpload = () => {


    const {targetRef} = useMyNavigatorContextContext()
    const {pdfFile}=useMyHandlePdfContextContext()


  return (
    <div ref={targetRef}>
        {pdfFile?<div className={"mt-10 mb-10"} ><PdfWorker/></div>:<DropComp/>}

    </div>
  )
};

export default ViewUpload;