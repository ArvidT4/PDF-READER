
// PdfViewer.tsx
import { Viewer } from '@react-pdf-viewer/core';
import * as React from 'react';
import { useMyPluginContextContext } from '../contexts/PluginContext.tsx';

interface Props {
    pdf: string;
    highlightPlug:any
}

const DemoViewer: React.FC<Props> = ({ pdf,highlightPlug }) => {
    const {
        defaultLayoutPluginInstance,
    } = useMyPluginContextContext();

    console.log(pdf);
    console.log("test")
    if (!defaultLayoutPluginInstance || !highlightPlug) {
        return <div>Error: One or more plugin instances are not properly initialized.</div>;
    }
    console.log("test")
    return (
        <div  style={{height:"60vh"}}>
            {pdf && (
                <Viewer
                    fileUrl={pdf}
                    plugins={[
                        highlightPlug,
                        defaultLayoutPluginInstance,
                    ]}
                />
            )}
        </div>
    );
};

export default DemoViewer;
