import {FormEvent, SyntheticEvent, useRef, useState} from "react";
import { Worker ,Viewer,Button, Position, Tooltip,PrimaryButton } from '@react-pdf-viewer/core';
import * as React from 'react';
import {DefaultLayoutPlugin, defaultLayoutPlugin} from '@react-pdf-viewer/default-layout';
import { pageNavigationPlugin } from '@react-pdf-viewer/page-navigation';

import {
    highlightPlugin,
    HighlightArea,
    MessageIcon,
    RenderHighlightContentProps,
    RenderHighlightsProps,
    RenderHighlightTargetProps,

} from '@react-pdf-viewer/highlight';
// Import styles
import '@react-pdf-viewer/highlight/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import '@react-pdf-viewer/page-navigation/lib/styles/index.css';

import '@react-pdf-viewer/core/lib/styles/index.css';
import react from "@vitejs/plugin-react";
import {useMyPluginContextContext} from "../PluginContext.tsx";
import {Note} from "../Interfaces.ts";
import PdfViewer from "./PdfViewer.tsx";

const ViewUpload = () => {

    const {notes,jumpToHighlightArea} = useMyPluginContextContext();


    const [pdfFile,setPdfFile]=useState<string>("");
    const allowedFiles=['application/pdf'];
    const selectedRef=useRef<File|null>(null)
    const handeFile=(e:FormEvent<HTMLInputElement>)=>{
        const target =  e.target as HTMLInputElement & { files: FileList };

        if(target && target.files && target.files[0]){

            selectedRef.current=target.files[0]
            console.log(selectedRef.current)

            if(selectedRef.current && allowedFiles.includes(selectedRef.current?.type as string)){
                console.log("blasp")
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


  return (
    <div className={"viewerWrap"}>
        <form>
            <input type={"file"} required={true} onChange={handeFile}/>
            <button type={"submit"}>Submit</button>
        </form>
        <h4>View PDF</h4>
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
                        width: '25%',
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
                            {pdfFile&&<PdfViewer pdf={pdfFile}/>}
                        </div>
                        </div>

                    </Worker>
                </div>
            </div>

        </div>
    </div>
  )
};

export default ViewUpload;