import {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import {useMyHandlePdfContextContext} from "../contexts/HandlePdfContext.tsx";
import drop from "../pictures/drop.png"
const DropComp = () => {
    const {handle}=useMyHandlePdfContextContext()
    const onDrop = useCallback((acceptedFiles: File[]) => {
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