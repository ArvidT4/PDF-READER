import { useLocation } from 'react-router-dom';
import { Viewer, Worker } from '@react-pdf-viewer/core';

import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/zoom/lib/styles/index.css';
import '@react-pdf-viewer/page-navigation/lib/styles/index.css';
import '@react-pdf-viewer/thumbnail/lib/styles/index.css';
import '@react-pdf-viewer/bookmark/lib/styles/index.css';
import '@react-pdf-viewer/search/lib/styles/index.css';
import '@react-pdf-viewer/highlight/lib/styles/index.css';

import { useEffect, useState } from 'react';
import { usePdfTableContext } from '../../contexts/PaidContexts/PdfTableContext';
import PageNavWrap from "../../Components/paid-comps/PDF-Viewer/PageNavWrap.tsx";
import {usePaidPluginContext} from "../../contexts/PaidContexts/PaidPluginContext.tsx";
import {ACTIVATED, BOOKMARKS, NOT_ACTIVATED, THUMBNAILS} from "../../CONSTANTS.ts";

const PdfWorker = () => {
    const {
        pageNavigationPluginInstance,
        zoomPluginInstance,
        rotatePluginInstance,
        thumbnailPluginInstance,
        fullScreenPluginInstance,
        bookmarkPluginInstance,
        searchPluginInstance,
        highlightPluginInstance
    } = usePaidPluginContext();

    const location = useLocation();
    const filePath = location.pathname.replace("/dashboard/view/", "");
    const { generatePdfFile } = usePdfTableContext();
    const [signedUrl, setSigned] = useState<string | undefined>();
    const [thumbnail,setThumbnail]=useState<string>(NOT_ACTIVATED)
    const [bookmark,setBookmark]=useState<string>(NOT_ACTIVATED)
    useEffect(() => {
        const genPdf = async () => {
            if (filePath) {
                const signed = await generatePdfFile(filePath);
                console.log("wtf" + signed);
                setSigned(signed);
            }
        };
        if (filePath) genPdf();
    }, [filePath]);
    const handleClick = (type: string) => {
        if (type === THUMBNAILS) {
            setThumbnail(prev =>
                prev === ACTIVATED ? NOT_ACTIVATED : ACTIVATED
            );
            setBookmark(NOT_ACTIVATED);
        }
        else if (type === BOOKMARKS) {
            setBookmark(prev =>
                prev === ACTIVATED ? NOT_ACTIVATED : ACTIVATED
            );
            setThumbnail(NOT_ACTIVATED);
        }
    };
    // ✅ MEMOIZE the plugin instance (important for render stability)
    const { Thumbnails } = thumbnailPluginInstance;
    const { Bookmarks } = bookmarkPluginInstance;

    return (
        <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
            {signedUrl && (
                <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
                    <PageNavWrap handleClick={handleClick}>
                        <div style={{
                            border: '1px solid rgba(0, 0, 0, 0.3)',
                            display: 'flex',
                            flex: 1,
                            height: '100%',
                        }}>
                                <div className={thumbnail}>
                                    <Thumbnails />
                                </div>
                            <div className={bookmark}>
                                <Bookmarks/>

                            </div>
                            <div style={{ height:"90vh" , flex: 1 }}>
                                <Viewer
                                    fileUrl={signedUrl}
                                    plugins={[
                                        zoomPluginInstance,
                                        pageNavigationPluginInstance,
                                        rotatePluginInstance,
                                        thumbnailPluginInstance,
                                        fullScreenPluginInstance,
                                        bookmarkPluginInstance,
                                        searchPluginInstance,
                                        highlightPluginInstance
                                    ]}
                                />
                            </div>
                        </div>
                    </PageNavWrap>
                </Worker>
            )}
        </div>
    );
};

export default PdfWorker;
