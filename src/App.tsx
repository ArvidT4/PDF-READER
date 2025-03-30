import InputUpload from "./uploader/inputUpload.tsx";
import ViewUpload from "./uploadAndView/ViewUpload.tsx";
import {MyPluginContextProvider} from "./PluginContext.tsx";
import WorkerElement from "./uploader/WorkerElement.tsx";
import ChatGPT from "./uploader/ChatGPT.tsx";

function App() {

  return (
    <>
        <MyPluginContextProvider>
            <ViewUpload/>
        </MyPluginContextProvider>
    </>
  )
}

export default App
