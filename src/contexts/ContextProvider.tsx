import {MyPluginContextProvider} from "./PluginContext.tsx";
import {MyHandlePdfContextProvider} from "./HandlePdfContext.tsx";
import {MyNavigatorContextProvider} from "./NavigatorContext.tsx";
import {MyZipContextProvider} from "./ZipContext.tsx";
import {MyIndexedDbContextProvider} from "./IndexedDbContext.tsx";
import {ReactNode} from "react";
interface Props {
    children: ReactNode;
}
const ContextProvider:React.FC<Props> = ({children}) => {
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