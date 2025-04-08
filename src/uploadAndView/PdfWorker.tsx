import {Note} from "../Interfaces.ts";
import {Worker} from "@react-pdf-viewer/core";
import PdfViewer from "./PdfViewer.tsx";
import * as React from "react";
import {useMyPluginContextContext} from "../contexts/PluginContext.tsx";
import {useMyHandlePdfContextContext} from "../contexts/HandlePdfContext.tsx";



const PdfWorker= () => {

    const {pdfFile}=useMyHandlePdfContextContext()
    const {notes,jumpToHighlightArea, highlightPluginInstance} = useMyPluginContextContext();

  return (
      <div>
          <div
              style={{
                  border: '1px solid rgba(0, 0, 0, 0.3)',
                  display: 'flex',
                  height: '100%',
                  overflow: 'hidden',
              }}
          >
              <div
                  style={{
                      borderRight: '1px solid rgba(0, 0, 0, 0.3)',
                      width: '15%',
                      overflow: 'auto',
                  }}
              >
                  {notes.length === 0 && <div style={{ textAlign: 'center' }}>There is no note</div>}
                  {notes.map((note:Note) => {
                      return (
                          <div
                              key={note.id}
                              style={{
                                  borderBottom: '1px solid rgba(0, 0, 0, .3)',
                                  cursor: 'pointer',
                                  padding: '8px',
                              }}
                              // Jump to the associated highlight area
                              onClick={() => jumpToHighlightArea(note.highlightAreas[0])}
                          >
                              <blockquote
                                  style={{
                                      borderLeft: '2px solid rgba(0, 0, 0, 0.2)',
                                      fontSize: '.75rem',
                                      lineHeight: 1.5,
                                      margin: '0 0 8px 0',
                                      paddingLeft: '8px',
                                      textAlign: 'justify',
                                  }}
                              >
                                  {note.quote}
                              </blockquote>
                              {note.content}
                              <div>Ta bort</div>
                          </div>

                      );
                  })}
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