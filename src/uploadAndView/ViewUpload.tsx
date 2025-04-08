import { Worker  } from '@react-pdf-viewer/core';
import * as React from 'react';

import '@react-pdf-viewer/highlight/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import '@react-pdf-viewer/page-navigation/lib/styles/index.css';

import '@react-pdf-viewer/core/lib/styles/index.css';
import react from "@vitejs/plugin-react";
import {useMyPluginContextContext} from "../contexts/PluginContext.tsx";
import {Note} from "../Interfaces.ts";
import PdfViewer from "./PdfViewer.tsx";
import {useMyHandlePdfContextContext} from "../contexts/HandlePdfContext.tsx";
import DropComp from "./DropComp.tsx";
import PdfWorker from "./PdfWorker.tsx";
import Banner from "../Components/Banner.tsx";
import {useMyNavigatorContextContext} from "../contexts/NavigatorContext.tsx";

const ViewUpload = () => {

    const {notes,jumpToHighlightArea} = useMyPluginContextContext();

    const {targetRef} = useMyNavigatorContextContext()
    const {pdfFile}=useMyHandlePdfContextContext()


  return (
    <div ref={targetRef} className={"viewerWrap"}>
        {pdfFile?<div className={"m-10"} ><PdfWorker/></div>:<DropComp/>}

    </div>
  )
};

export default ViewUpload;