import {MyPluginContextProvider} from "./PluginContext.tsx";
import {MyHandlePdfContextProvider} from "./HandlePdfContext.tsx";
import {MyNavigatorContextProvider} from "./NavigatorContext.tsx";
import {MyZipContextProvider} from "./ZipContext.tsx";
import {MyIndexedDbContextProvider} from "./IndexedDbContext.tsx";
import {ReactNode} from "react";
import {MyUserContextProvider} from "./UserContext.tsx";
import {MyPdfTableContextProvider} from "./PaidContexts/PdfTableContext.tsx";
import {MyPaidPluginContextProvider} from "./PaidContexts/PaidPluginContext.tsx";
interface Props {
    children: ReactNode;
}
const ContextProvider:React.FC<Props> = ({children}) => {
  return (
    <div>
        <MyIndexedDbContextProvider>
            <MyUserContextProvider>
                <MyPdfTableContextProvider>
                    <MyPluginContextProvider>
                        <MyZipContextProvider>
                            <MyHandlePdfContextProvider>
                                <MyNavigatorContextProvider>
                                    <MyPaidPluginContextProvider>
                                        {children}
                                    </MyPaidPluginContextProvider>
                                </MyNavigatorContextProvider>
                            </MyHandlePdfContextProvider>
                        </MyZipContextProvider>
                    </MyPluginContextProvider>
                </MyPdfTableContextProvider>
            </MyUserContextProvider>
        </MyIndexedDbContextProvider>

    </div>
  );
};

export default ContextProvider;