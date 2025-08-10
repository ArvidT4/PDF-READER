import { ReactNode, createContext, useContext } from "react";
import * as React from "react";
import { pageNavigationPlugin  } from "@react-pdf-viewer/page-navigation";
import {zoomPlugin} from "@react-pdf-viewer/zoom";
import { rotatePlugin } from '@react-pdf-viewer/rotate';
import { thumbnailPlugin } from '@react-pdf-viewer/thumbnail';
import { fullScreenPlugin } from '@react-pdf-viewer/full-screen';
import { bookmarkPlugin } from '@react-pdf-viewer/bookmark';


interface IPluginContext {
    pageNavigationPluginInstance: ReturnType<typeof pageNavigationPlugin>;
    zoomPluginInstance: ReturnType<typeof zoomPlugin>;
    rotatePluginInstance:ReturnType<typeof rotatePlugin>;
    thumbnailPluginInstance:ReturnType<typeof thumbnailPlugin>;
    fullScreenPluginInstance:ReturnType<typeof fullScreenPlugin>;
    bookmarkPluginInstance:ReturnType<typeof bookmarkPlugin>;
}

const MyContext = createContext<IPluginContext | undefined>(undefined);

const MyPaidPluginContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const pageNavigationPluginInstance = pageNavigationPlugin();
    const zoomPluginInstance = zoomPlugin()
    const rotatePluginInstance = rotatePlugin();
    const bookmarkPluginInstance = bookmarkPlugin();

    const fullScreenPluginInstance = fullScreenPlugin({
        renderExitFullScreenButton: (props) => (
            <div
                style={{
                    bottom: '1rem',
                    position: 'fixed',
                    right: '1rem',
                    // Otherwise, the button will be hidden
                    zIndex: 1,
                }}
            >
                <button className={"bg-blue-700 text-white p-2 rounded-lg hover:bg-blue-600 duration-300"} onClick={props.onClick}>Exit fullscreen</button>
            </div>
        ),
    });
    const thumbnailPluginInstance = thumbnailPlugin({
        thumbnailWidth: 150,
    });

    return (
        <MyContext.Provider value={{ pageNavigationPluginInstance,zoomPluginInstance,rotatePluginInstance,thumbnailPluginInstance,fullScreenPluginInstance,bookmarkPluginInstance }}>
            {children}
        </MyContext.Provider>
    );
};

const usePaidPluginContext = () => {
    const context = useContext(MyContext);
    if (!context) {
        throw new Error("usePluginContext must be used within a MyPluginContextProvider");
    }
    return context;
};

export { MyPaidPluginContextProvider, usePaidPluginContext };
