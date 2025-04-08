// PdfViewer.tsx
import { Viewer } from '@react-pdf-viewer/core';
import * as React from 'react';
import { useMyPluginContextContext } from '../contexts/PluginContext.tsx';

interface Props {
    pdf: string;
    highlightPlug:any
}

const PdfViewer: React.FC<Props> = ({ pdf,highlightPlug }) => {
    const {
        defaultLayoutPluginInstance,
    } = useMyPluginContextContext();

    // Debugging: Log plugin instances to make sure they're initialized
    React.useEffect(() => {
        console.log( defaultLayoutPluginInstance, highlightPlug);
    }, [ defaultLayoutPluginInstance, highlightPlug]);

    if (!defaultLayoutPluginInstance || !highlightPlug) {
        return <div>Error: One or more plugin instances are not properly initialized.</div>;
    }
    console.log("test")
    return (
        <div  style={{height:"90vh"}}>
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

export default PdfViewer;
