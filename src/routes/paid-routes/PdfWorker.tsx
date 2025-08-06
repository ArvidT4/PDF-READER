import { useLocation } from 'react-router-dom';
import { Viewer, Worker } from '@react-pdf-viewer/core';

import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/zoom/lib/styles/index.css';
import { useEffect, useState } from 'react';
import { usePdfTableContext } from '../../contexts/PaidContexts/PdfTableContext';
import PageNavWrap from "../../Components/paid-comps/PDF-Viewer/PageNavWrap.tsx";
import {usePaidPluginContext} from "../../contexts/PaidContexts/PaidPluginContext.tsx";

const PdfWorker = () => {
    const location = useLocation();
    const filePath = location.pathname.replace("/dashboard/view/", "");
    const { generatePdfFile } = usePdfTableContext();
    const [signedUrl, setSigned] = useState<string | undefined>();
    const {pageNavigationPluginInstance,zoomPluginInstance}=usePaidPluginContext();

    useEffect(() => {
        const genPdf = async () => {
            if (filePath) {
                const signed = await generatePdfFile(filePath);
                console.log(signed);
                setSigned(signed);
            }
        };
        if (filePath) genPdf();
    }, [filePath]);

    // ✅ MEMOIZE the plugin instance (important for render stability)


    return (
        <div>
            {signedUrl && (
                <div >
                    <div className="flex gap-2 p-2 bg-gray-100">
                    </div>

                    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
                        <div>
                            <PageNavWrap >
                                <Viewer  fileUrl={signedUrl} plugins={[zoomPluginInstance,pageNavigationPluginInstance]} />
                            </PageNavWrap>
                        </div>
                    </Worker>
                </div>
            )}
        </div>
    );
};

export default PdfWorker;
