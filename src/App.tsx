import ViewUpload from "./uploadAndView/ViewUpload.tsx";
import {MyPluginContextProvider} from "./contexts/PluginContext.tsx";
import {MyHandlePdfContextProvider} from "./contexts/HandlePdfContext.tsx";
import "./index.css"
import Wrap from "./Components/Wrap.tsx";

function App() {

  return (
    <div>
        <MyPluginContextProvider>
            <MyHandlePdfContextProvider>
                <Wrap>
                    <ViewUpload/>
                </Wrap>
            </MyHandlePdfContextProvider>
        </MyPluginContextProvider>
    </div>
  )
}

export default App
