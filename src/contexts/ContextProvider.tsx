import {MyPluginContextProvider} from "./PluginContext.tsx";
import {MyHandlePdfContextProvider} from "./HandlePdfContext.tsx";
import {MyNavigatorContextProvider} from "./NavigatorContext.tsx";
import Homepage from "../routes/Homepage.tsx";
import ViewUpload from "../uploadAndView/ViewUpload.tsx";

const ContextProvider:React.FC = ({children}) => {
  return (
    <div>
        <MyPluginContextProvider>
            <MyHandlePdfContextProvider>
                <MyNavigatorContextProvider>
                    {children}
                </MyNavigatorContextProvider>
            </MyHandlePdfContextProvider>
        </MyPluginContextProvider>
    </div>
  );
};

export default ContextProvider;