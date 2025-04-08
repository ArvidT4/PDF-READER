import React, {FormEvent, useCallback, useRef, useState} from 'react'
import dropStyle from "../CSS/drop.module.css"
import {useDropzone} from 'react-dropzone'
import {useMyPluginContextContext} from "../contexts/PluginContext.tsx";
import {useMyHandlePdfContextContext} from "../contexts/HandlePdfContext.tsx";
import drop from "../pictures/drop.png"
const DropComp = () => {
    const {pdfFile,handle}=useMyHandlePdfContextContext()
    const onDrop = useCallback(acceptedFiles => {
        console.log(acceptedFiles)
        handle(acceptedFiles[0])
    }, [])
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})



    return (
    <div>

        <div className={"w-80 h-80 border border-black bg-gray-100 rounded-lg text-center m-auto drop-shadow mt-10"} {...getRootProps()}>
            <input {...getInputProps()}/>
            <div className={"place-content-center h-full"}>
                <img className={"w-20 m-auto pointer-events-none select-none focus:outline-none"} src={drop} alt={"test"}/>
            {
                isDragActive ?
                        <p>Drop the files here ...</p>:
                        <p>Drag 'n' drop some files here, or click to select files</p>
            }
            </div>
        </div>
    </div>
  );
};

export default DropComp;