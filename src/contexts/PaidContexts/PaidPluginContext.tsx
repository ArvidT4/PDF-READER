import { ReactNode, createContext, useContext } from "react";
import * as React from "react";
import { pageNavigationPlugin  } from "@react-pdf-viewer/page-navigation";
import {zoomPlugin} from "@react-pdf-viewer/zoom";
import { rotatePlugin } from '@react-pdf-viewer/rotate';

interface IPluginContext {
    pageNavigationPluginInstance: ReturnType<typeof pageNavigationPlugin>;
    zoomPluginInstance: ReturnType<typeof zoomPlugin>;
    rotatePluginInstance:ReturnType<typeof rotatePlugin>
}

const MyContext = createContext<IPluginContext | undefined>(undefined);

const MyPaidPluginContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const pageNavigationPluginInstance = pageNavigationPlugin();
    const zoomPluginInstance = zoomPlugin()
    const rotatePluginInstance = rotatePlugin();

    return (
        <MyContext.Provider value={{ pageNavigationPluginInstance,zoomPluginInstance,rotatePluginInstance }}>
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
