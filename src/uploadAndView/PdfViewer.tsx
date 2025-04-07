// PdfViewer.tsx
import { Viewer } from '@react-pdf-viewer/core';
import * as React from 'react';
import { useMyPluginContextContext } from '../contexts/PluginContext.tsx';

interface Props {
    pdf: string;
}

const PdfViewer: React.FC<Props> = ({ pdf }) => {
    const {
        defaultLayoutPluginInstance,
        highlightPluginInstance,
    } = useMyPluginContextContext();

    // Debugging: Log plugin instances to make sure they're initialized
    React.useEffect(() => {
        console.log( defaultLayoutPluginInstance, highlightPluginInstance);
    }, [ defaultLayoutPluginInstance, highlightPluginInstance]);

    if (!defaultLayoutPluginInstance || !highlightPluginInstance) {
        return <div>Error: One or more plugin instances are not properly initialized.</div>;
    }
    console.log("test")
    return (
        <div  style={{height:"90vh"}}>
            {pdf && (
                <Viewer
                    fileUrl={pdf}
                    plugins={[
                        highlightPluginInstance,
                        defaultLayoutPluginInstance,
                    ]}
                />
            )}
        </div>
    );
};

export default PdfViewer;
