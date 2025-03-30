// PdfViewer.tsx
import { Viewer } from '@react-pdf-viewer/core';
import * as React from 'react';
import { useMyPluginContextContext } from '../PluginContext.tsx';

interface Props {
    pdf: string;
}

const PdfViewer: React.FC<Props> = ({ pdf }) => {
    const {
        pageNavigationPluginInstance,
        defaultLayoutPluginInstance,
        highlightPluginInstance,
    } = useMyPluginContextContext();

    // Debugging: Log plugin instances to make sure they're initialized
    React.useEffect(() => {
        console.log(pageNavigationPluginInstance, defaultLayoutPluginInstance, highlightPluginInstance);
    }, [pageNavigationPluginInstance, defaultLayoutPluginInstance, highlightPluginInstance]);

    if (!pageNavigationPluginInstance || !defaultLayoutPluginInstance || !highlightPluginInstance) {
        return <div>Error: One or more plugin instances are not properly initialized.</div>;
    }

    return (
        <div>
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
