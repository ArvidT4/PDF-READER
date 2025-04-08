import ViewUpload from "./uploadAndView/ViewUpload.tsx";
import {MyPluginContextProvider} from "./contexts/PluginContext.tsx";
import {MyHandlePdfContextProvider} from "./contexts/HandlePdfContext.tsx";
import "./index.css"
import Wrap from "./Components/Wrap.tsx";
import {MyNavigatorContextProvider} from "./contexts/NavigatorContext.tsx";

function App() {

  return (
    <div>
        <MyPluginContextProvider>
            <MyHandlePdfContextProvider>
                <MyNavigatorContextProvider>
                    <Wrap>
                        <ViewUpload/>
                    </Wrap>
                </MyNavigatorContextProvider>
            </MyHandlePdfContextProvider>
        </MyPluginContextProvider>
    </div>
  )
}

export default App
