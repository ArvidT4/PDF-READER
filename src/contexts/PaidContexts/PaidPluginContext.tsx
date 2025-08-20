import {ReactNode, createContext, useContext, useState} from "react";
import * as React from "react";
import { pageNavigationPlugin  } from "@react-pdf-viewer/page-navigation";
import {zoomPlugin} from "@react-pdf-viewer/zoom";
import { rotatePlugin } from '@react-pdf-viewer/rotate';
import { thumbnailPlugin } from '@react-pdf-viewer/thumbnail';
import { fullScreenPlugin } from '@react-pdf-viewer/full-screen';
import { bookmarkPlugin } from '@react-pdf-viewer/bookmark';
import { searchPlugin } from '@react-pdf-viewer/search';
import {Note} from "../../Interfaces.ts";
import {
    HighlightArea,
    highlightPlugin,
    MessageIcon,
    RenderHighlightContentProps,
    RenderHighlightsProps,
    RenderHighlightTargetProps
} from "@react-pdf-viewer/highlight";
import {Button, Position, PrimaryButton, Tooltip} from "@react-pdf-viewer/core";
import RenderHighlight from "../../Components/paid-comps/PDF-Viewer/RenderHighlight.tsx";
import axios, {AxiosResponse} from "axios";
import {useNotesTableContext} from "./NotesTableContext.tsx";



interface IPluginContext {
    pageNavigationPluginInstance: ReturnType<typeof pageNavigationPlugin>;
    zoomPluginInstance: ReturnType<typeof zoomPlugin>;
    rotatePluginInstance:ReturnType<typeof rotatePlugin>;
    thumbnailPluginInstance:ReturnType<typeof thumbnailPlugin>;
    fullScreenPluginInstance:ReturnType<typeof fullScreenPlugin>;
    bookmarkPluginInstance:ReturnType<typeof bookmarkPlugin>;
    searchPluginInstance:ReturnType<typeof searchPlugin>;
    highlightPluginInstance:ReturnType<typeof highlightPlugin>,

    jumpToHighlightArea:(area:HighlightArea)=>void,
    //removeHighlight:(note:Note)=>void
}

const MyContext = createContext<IPluginContext | undefined>(undefined);

const MyPaidPluginContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

    const {notes,setNotes}=useNotesTableContext()
    const pageNavigationPluginInstance = pageNavigationPlugin();
    const zoomPluginInstance = zoomPlugin()
    const rotatePluginInstance = rotatePlugin();
    const bookmarkPluginInstance = bookmarkPlugin();

    const fullScreenPluginInstance = fullScreenPlugin({
        renderExitFullScreenButton: (props) => (
            <div
                style={{
                    bottom: '1rem',
                    position: 'fixed',
                    right: '1rem',
                    // Otherwise, the button will be hidden
                    zIndex: 1,
                }}
            >
                <button className={"bg-blue-700 text-white p-2 rounded-lg hover:bg-blue-600 duration-300"} onClick={props.onClick}>Exit fullscreen</button>
            </div>
        ),
    });
    const thumbnailPluginInstance = thumbnailPlugin({
        thumbnailWidth: 150,
    });
    const searchPluginInstance = searchPlugin();

    const noteEles: Map<number, HTMLElement> = new Map();



    const renderHighlightTarget = (props: RenderHighlightTargetProps) => (
        <div
            style={{
                background: '#eee',
                display: 'flex',
                position: 'absolute',
                left: `${props.selectionRegion.left}%`,
                top: `${props.selectionRegion.top + props.selectionRegion.height}%`,
                transform: 'translate(0, 8px)',
                zIndex: 1,
            }}
        >
            <Tooltip
                position={Position.TopCenter}
                target={
                    <Button onClick={props.toggle}>
                        <MessageIcon />
                    </Button>
                }
                content={() => <div style={{ width: '100px' }}>Add a note</div>}
                offset={{ left: 0, top: -8 }}
            />
        </div>
    );
    const renderHighlightContent = (props: RenderHighlightContentProps) => (
        <RenderHighlight {...props} setNotes={setNotes} />
    );
    const jumpToNote = (note: Note) => {
        if (note.highlight_areas && note.highlight_areas.length > 0) {
            highlightPluginInstance.jumpToHighlightArea(note.highlight_areas[0]);
        }
    };
    // const removeHighlight=(note:Note)=>{
    //     deleteNote(note.id).then((success:boolean)=>{
    //         console.log("test", success)
    //         if(success) setNotes(prevNotes => prevNotes.filter(n => n.id !== note.id));
    //     })
    // }

    const renderHighlights = (props: RenderHighlightsProps) => (
        <div>
            {notes.map((note) => (
                <React.Fragment key={note.id}>
                    {note.highlight_areas
                        .filter((area) => area.pageIndex === props.pageIndex)
                        .map((area, idx) => (
                            <div
                                key={idx}
                                style={{
                                    background: 'yellow',
                                    opacity: 0.4,
                                    ...props.getCssProperties(area, props.rotation),
                                }}
                                onClick={() => jumpToNote(note)}  // Använd jumpToNote istället för scrollIntoView
                                ref={(ref): void => {
                                    noteEles.set(note.id, ref as HTMLElement);
                                }}
                            />
                        ))}
                </React.Fragment>
            ))}
        </div>
    );


    const highlightPluginInstance = highlightPlugin({
        renderHighlightTarget,
        renderHighlightContent,
        renderHighlights,
    });
    const { jumpToHighlightArea } = highlightPluginInstance;

    return (
        <MyContext.Provider value={{
            pageNavigationPluginInstance,
            zoomPluginInstance,
            rotatePluginInstance,
            thumbnailPluginInstance,
            fullScreenPluginInstance,
            bookmarkPluginInstance,
            searchPluginInstance,
            highlightPluginInstance,
            notes,
            setNotes,
            jumpToHighlightArea,
            //removeHighlight
        }}>
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
