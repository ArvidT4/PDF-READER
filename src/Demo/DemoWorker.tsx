import {Note} from "../Interfaces.ts";
import {Worker} from "@react-pdf-viewer/core";
import * as React from "react";
import {Button, Position, Tooltip,PrimaryButton } from '@react-pdf-viewer/core';

import {
    highlightPlugin,
    MessageIcon,
    RenderHighlightContentProps,
    RenderHighlightsProps,
    RenderHighlightTargetProps,

} from '@react-pdf-viewer/highlight';
import DemoViewer from "./DemoViewer.tsx";
const PdfWorker= () => {
    const pdf = ' /pdf-placeholder.pdf';  // String path to the PDF in the public folder
    const [message, setMessage] = React.useState('');
    const [notes, setNotes] = React.useState<Note[]>([]);
    let noteId = notes.length;

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
        // Om vi har en referens till highlight-området
        if (note.highlightAreas && note.highlightAreas.length > 0) {
            highlightPluginInstance.jumpToHighlightArea(note.highlightAreas[0]);
        }
    };

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
    const { jumpToHighlightArea } = highlightPluginInstance;

    return (
        <div>
            <div
                style={{
                    border: '1px solid rgba(0, 0, 0, 0.3)',
                    display: 'flex',
                    height: '50%',
                    overflow: 'hidden',
                    width:"100%",
                }}
            >
                <div
                    style={{
                        borderRight: '1px solid rgba(0, 0, 0, 0.3)',
                        width: '15%',
                        background:"white",
                        overflow: 'auto',
                    }}
                >
                    {notes.length === 0 && <div style={{ textAlign: 'center' }}>There is no note</div>}
                    {notes.map((note:Note) => {
                        return (
                            <div
                                key={note.id}
                                style={{
                                    borderBottom: '1px solid rgba(0, 0, 0, .3)',
                                    cursor: 'pointer',
                                    padding: '8px',
                                }}
                                // Jump to the associated highlight area
                                onClick={() => jumpToHighlightArea(note.highlightAreas[0])}
                            >
                                <blockquote
                                    style={{
                                        borderLeft: '2px solid rgba(0, 0, 0, 0.2)',
                                        fontSize: '.75rem',
                                        lineHeight: 1.5,
                                        margin: '0 0 8px 0',
                                        paddingLeft: '8px',
                                        textAlign: 'justify',
                                    }}
                                >
                                    {note.quote}
                                </blockquote>
                                {note.content}
                                <div>Ta bort</div>
                            </div>

                        );
                    })}
                </div>
                <div
                    style={{
                        flex: '1 1 0',
                        overflow: 'auto',
                    }}
                >
                    <Worker workerUrl={"https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js"}>


                        <div
                            style={{
                                border: '1px solid rgba(0, 0, 0, 0.3)',
                                height: '100%',
                                overflow: 'hidden',
                            }}
                        ><div style={{ border: '1px solid rgba(0, 0, 0, 0.3)', height: '100%', overflow: 'hidden' }}>
                            {pdf&&<DemoViewer pdf={pdf} highlightPlug={highlightPluginInstance}/>}
                        </div>
                        </div>

                    </Worker>
                </div>
            </div>

        </div>
    );
};

export default PdfWorker;