import {Worker} from "@react-pdf-viewer/core";
import PdfViewer from "./PdfViewer.tsx";
import {useMyPluginContextContext} from "../contexts/PluginContext.tsx";
import {useMyHandlePdfContextContext} from "../contexts/HandlePdfContext.tsx";
import DownloadZip from "../Components/DownloadZip.tsx";
import RemovePDFAndNotes from "../Components/RemovePDFAndNotes.tsx";
import {useEffect, useState} from "react";
import Notes from "./Notes.tsx";



const PdfWorker= () => {

    const {pdfFile}=useMyHandlePdfContextContext()
    const {notes,jumpToHighlightArea, highlightPluginInstance} = useMyPluginContextContext();
    const [show,setShow]=useState<boolean>(false);
    const [noteClass,setNoteClass]=useState<string>("notesHide");
    useEffect(() => {
        setNoteClass(show ? "notesShow" : "notesHide");
    }, [show]);
  return (
      <div>
          <div className={"grid grid-cols-2"}>
              <div className={"sm:hidden block"}>
                  <button onClick={()=>setShow(!show)} className={"border p-2 rounded-md"}>Notes</button>
              </div>
              <div className={"col-start-2 sm:flex sm:place-self-end grid grid-cols-2"}>
                  <DownloadZip notes={notes}/>
                  <RemovePDFAndNotes/>
              </div>

          </div>
          <div
              style={{
                  border: '1px solid rgba(0, 0, 0, 0.3)',
                  display: 'flex',
                  height: '100%',
                  overflow: 'hidden',
              }}
          >

              {/*Phone*/}
              <div className={"sm:hidden block"}>
                  <Notes notes={notes} noteClass={noteClass} jumpToHighlightArea={jumpToHighlightArea}/>
              </div>
              {/*Computer*/}
              <div className={"hidden sm:block"}>
                  <Notes notes={notes} noteClass={"w-40 overflow-auto border-r"} jumpToHighlightArea={jumpToHighlightArea}/>
              </div>
              <div
                  style={{
                      flex: '1 1 0',
                      overflow: 'auto',
                  }}
              >
                  <Worker workerUrl={"https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js"}>


                      <div
                          style={{
                              border: '1px solid rgba(0, 0, 0, 0.3)',
                              height: '100%',
                              overflow: 'hidden',
                          }}
                      ><div style={{ border: '1px solid rgba(0, 0, 0, 0.3)', height: '100%', overflow: 'hidden' }}>
                          {pdfFile&&<PdfViewer pdf={pdfFile} highlightPlug={highlightPluginInstance}/>}
                      </div>
                      </div>

                  </Worker>
              </div>
          </div>

      </div>
  );
};

export default PdfWorker;