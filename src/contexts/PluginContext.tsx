import {ReactNode, createContext, useContext, useEffect} from "react"
import {Button, Position, Tooltip,PrimaryButton } from '@react-pdf-viewer/core';
import * as React from 'react';
import {defaultLayoutPlugin} from '@react-pdf-viewer/default-layout';
import { dropPlugin } from '@react-pdf-viewer/drop';


import {
    highlightPlugin,
    HighlightArea,
    MessageIcon,
    RenderHighlightContentProps,
    RenderHighlightsProps,
    RenderHighlightTargetProps,

} from '@react-pdf-viewer/highlight';

import '@react-pdf-viewer/highlight/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import '@react-pdf-viewer/drop/lib/styles/index.css';
import '@react-pdf-viewer/core/lib/styles/index.css';
import {Note} from "../Interfaces.ts";
import {useMyIndexedDbContext} from "./IndexedDbContext.tsx";

interface IPluginContextContext{
    highlightPluginInstance:any,
    defaultLayoutPluginInstance:any,
    dropPluginInstance:any,
    notes:Note[],
    setNotes:React.Dispatch<React.SetStateAction<any>>,
    jumpToHighlightArea:(area:HighlightArea)=>void,
    removeHighlight:(note:Note)=>void
}

const MyContext = createContext<IPluginContextContext|undefined>(undefined)

const MyPluginContextProvider: React.FC<{children:ReactNode}> = ({children})=>{

    const [message, setMessage] = React.useState('');
    const [notes, setNotes] = React.useState<Note[]>([]);
    let noteId = notes.length;
    const {addNoteToDb,getAllNotes,deleteNote}=useMyIndexedDbContext()

    useEffect(() => {
        getAllNotes().then(objects=>{
            setNotes(objects);
        })
    }, []);
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
    const renderHighlightContent = (props: RenderHighlightContentProps) => {
        const addNote = () => {
            if (message !== '') {
                const note: Note = {
                    id: ++noteId,
                    content: message,
                    highlightAreas: props.highlightAreas,
                    quote: props.selectedText,
                };
                setNotes(notes.concat([note]));
                addNoteToDb(note)
                props.cancel();
            }
        };

        return (
            <div
                style={{
                    background: '#fff',
                    border: '1px solid rgba(0, 0, 0, .3)',
                    borderRadius: '2px',
                    padding: '8px',
                    position: 'absolute',
                    left: `${props.selectionRegion.left}%`,
                    top: `${props.selectionRegion.top + props.selectionRegion.height}%`,
                    zIndex: 1,
                }}
            >
                <div>
                    <textarea
                        rows={3}
                        style={{
                            border: '1px solid rgba(0, 0, 0, .3)',
                        }}
                        onChange={(e) => setMessage(e.target.value)}
                    ></textarea>
                </div>
                <div
                    style={{
                        display: 'flex',
                        marginTop: '8px',
                    }}
                >
                    <div style={{ marginRight: '8px' }}>
                        <PrimaryButton onClick={addNote}>Add</PrimaryButton>
                    </div>
                    <Button onClick={props.cancel}>Cancel</Button>
                </div>
            </div>
        );
    };
    const jumpToNote = (note: Note) => {
        if (note.highlightAreas && note.highlightAreas.length > 0) {
            highlightPluginInstance.jumpToHighlightArea(note.highlightAreas[0]);
        }
    };
    const removeHighlight=(note:Note)=>{
        deleteNote(note.id).then((success:boolean)=>{
            console.log("test", success)
            if(success) setNotes(prevNotes => prevNotes.filter(n => n.id !== note.id));
        })
    }

    const renderHighlights = (props: RenderHighlightsProps) => (
        <div>
            {notes.map((note) => (
                <React.Fragment key={note.id}>
                    {note.highlightAreas
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
    const dropPluginInstance = dropPlugin();

    const { jumpToHighlightArea } = highlightPluginInstance;
    const defaultLayoutPluginInstance=defaultLayoutPlugin();

    return (
        <MyContext.Provider value={{
            highlightPluginInstance,
            defaultLayoutPluginInstance,
            dropPluginInstance,
            notes,
            setNotes,
            jumpToHighlightArea,
            removeHighlight
        }}>
            {children}
        </MyContext.Provider>
    )
}

const useMyPluginContextContext=()=> {
    const context = useContext(MyContext);
    if (!context) {
        throw new Error("useMyContext must be used within a provider");
    }
    return context;
};
export{MyPluginContextProvider, useMyPluginContextContext}