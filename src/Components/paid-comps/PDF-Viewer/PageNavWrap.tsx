import {ReactNode} from "react";
import {usePaidPluginContext} from "../../../contexts/PaidContexts/PaidPluginContext.tsx";
import { RenderCurrentPageLabelProps } from '@react-pdf-viewer/page-navigation';
import {BOOKMARKS, THUMBNAILS} from "../../../CONSTANTS.ts";

interface Props {
    handleClick:(type:string)=>void
    children: ReactNode;
}
const PageNavWrap:React.FC<Props>=({children,handleClick})=> {
    const {pageNavigationPluginInstance,zoomPluginInstance,rotatePluginInstance,fullScreenPluginInstance,searchPluginInstance}=usePaidPluginContext();
    const { ZoomInButton, ZoomOutButton, } = zoomPluginInstance;
    const { RotateBackwardButton, RotateForwardButton } = rotatePluginInstance;
    const { CurrentPageInput, GoToFirstPageButton, GoToLastPageButton, GoToNextPageButton, GoToPreviousPage,CurrentPageLabel } =
        pageNavigationPluginInstance;
    const {EnterFullScreen}=fullScreenPluginInstance
    const {ShowSearchPopoverButton }=searchPluginInstance;
    return (
        <div>
            <div
                style={{
                    alignItems: 'center',
                    backgroundColor: '#eeeeee',
                    borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '4px 8px',
                }}
            >
                {/* Left section */}
                <div>
                    <div>
                        <button onClick={() => handleClick(THUMBNAILS)}>Thumbnails</button>
                    </div>
                    <div>
                        <button onClick={() => handleClick(BOOKMARKS)}>bookmarks</button>
                    </div>
                    <div>
                        <ShowSearchPopoverButton/>
                    </div>
                </div>
                {/* Center section */}
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <div style={{padding: '0px 2px'}}>
                        <RotateBackwardButton/>
                    </div>
                    <div style={{ padding: '0px 2px' }}>
                        <ZoomOutButton />
                    </div>
                    <div style={{ padding: '0px 2px' }}>
                        <GoToFirstPageButton />
                    </div>
                    <div style={{ padding: '0px 2px' }}>
                        <GoToPreviousPage />
                    </div>
                    <div style={{ padding: '0px 2px' }} className="flex">
                        <div><CurrentPageInput /></div>
                        <div className="pl-2 p-1">
                            <CurrentPageLabel>
                                {(props: RenderCurrentPageLabelProps) => (
                                    <span>{`/ ${props.numberOfPages}`}</span>
                                )}
                            </CurrentPageLabel>
                        </div>
                    </div>
                    <div style={{ padding: '0px 2px' }}>
                        <GoToNextPageButton />
                    </div>
                    <div style={{ padding: '0px 2px' }}>
                        <GoToLastPageButton />
                    </div>
                    <div style={{ padding: '0px 2px' }}>
                        <ZoomInButton />
                    </div>
                    <div style={{ padding: '0px 2px' }}>
                        <RotateForwardButton />
                    </div>

                </div>

                {/* Right section (empty, balances the center) */}
                <div style={{ width: '40px' }}>
                    <div style={{ padding: '0px 2px' }}>
                        <EnterFullScreen/>
                    </div>
                </div>
            </div>
            {children}
        </div>
    );



}
export default PageNavWrap