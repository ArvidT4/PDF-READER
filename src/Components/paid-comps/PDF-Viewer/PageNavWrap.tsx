import {ReactNode} from "react";
import {usePaidPluginContext} from "../../../contexts/PaidContexts/PaidPluginContext.tsx";
import { RenderCurrentPageLabelProps } from '@react-pdf-viewer/page-navigation';

interface Props {
    children: ReactNode;
}
const PageNavWrap:React.FC<Props>=({children})=> {
    const {pageNavigationPluginInstance,zoomPluginInstance,}=usePaidPluginContext();
    const { ZoomInButton, ZoomOutButton, } = zoomPluginInstance;

    const { CurrentPageInput, GoToFirstPageButton, GoToLastPageButton, GoToNextPageButton, GoToPreviousPage,CurrentPageLabel } =
        pageNavigationPluginInstance;
    return(<div>
        <div
            style={{
                alignItems: 'center',
                backgroundColor: '#eeeeee',
                borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
                display: 'flex',
                justifyContent: 'center',
                padding: '4px',
            }}
        >
            <div style={{padding: '0px 2px'}}>
                <ZoomOutButton/>
            </div>
            <div style={{padding: '0px 2px'}}>
                <GoToFirstPageButton/>
            </div>
            <div style={{padding: '0px 2px'}}>
                <GoToPreviousPage/>
            </div>
            <div style={{padding: '0px 2px'}} className={"flex"}>
                <div><CurrentPageInput/></div>
                <div className={"pl-2 p-1"}><CurrentPageLabel>
                    {(props: RenderCurrentPageLabelProps) => (
                        <span>{`/ ${props.numberOfPages}`}</span>
                    )}
                </CurrentPageLabel></div>

            </div>
            <div style={{padding: '0px 2px'}}>
                <GoToNextPageButton/>
            </div>
            <div style={{padding: '0px 2px'}}>
                <GoToLastPageButton/>
            </div>
            <div style={{padding: '0px 2px'}}>
                <ZoomInButton/>
            </div>
        </div>
        <div
            style={{
                flex: 1,
                overflow: 'hidden',
                height:"90vh"
            }}
        >
            {children}
        </div>
    </div>)


}
export default PageNavWrap