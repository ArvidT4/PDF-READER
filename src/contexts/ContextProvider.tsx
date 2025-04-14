import {MyPluginContextProvider} from "./PluginContext.tsx";
import {MyHandlePdfContextProvider} from "./HandlePdfContext.tsx";
import {MyNavigatorContextProvider} from "./NavigatorContext.tsx";
import Homepage from "../routes/Homepage.tsx";
import ViewUpload from "../uploadAndView/ViewUpload.tsx";
import {MyZipContextProvider} from "./ZipContext.tsx";
import {MyIndexedDbContextProvider} from "./IndexedDbContext.tsx";

const ContextProvider:React.FC = ({children}) => {
  return (
    <div>
        <MyIndexedDbContextProvider>
            <MyPluginContextProvider>
                <MyZipContextProvider>
                    <MyHandlePdfContextProvider>
                        <MyNavigatorContextProvider>
                            {children}
                        </MyNavigatorContextProvider>
                    </MyHandlePdfContextProvider>
                </MyZipContextProvider>
            </MyPluginContextProvider>
        </MyIndexedDbContextProvider>

    </div>
  );
};

export default ContextProvider;