import {Button, PrimaryButton} from "@react-pdf-viewer/core";
import {RenderHighlightContentProps} from "@react-pdf-viewer/highlight";
import {Note} from "../../../Interfaces.ts";
import {useEffect, useRef, useState} from "react";
import axios from "axios";
import {usePdfTableContext} from "../../../contexts/PaidContexts/PdfTableContext.tsx";
import {useNotesTableContext} from "../../../contexts/PaidContexts/NotesTableContext.tsx";

const HighlightPopup: React.FC<RenderHighlightContentProps & { setNotes: React.Dispatch<React.SetStateAction<Note[]>> }> = (props) => {
    const [localMessage, setLocalMessage] = useState('');
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    const {pdfs,path}=usePdfTableContext()
    const {fetchNote}=useNotesTableContext()
    useEffect(() => {
        // Use a tiny delay so it runs *after* viewer finishes its internal focus logic
        const timer = setTimeout(() => {
            textareaRef.current?.focus();
        }, 0);

        return () => clearTimeout(timer);
    }, []);


    const addNote = async () => {
        const parts: string = path.split(/[/.]/)[0];

        //console.log(parts)
        if (localMessage.trim() !== '') {
            const note: Note = {
                id: 0,
                user_id: parts,
                filepath: path,
                content: localMessage,
                highlight_areas: props.highlightAreas,
            };
            props.setNotes((prev) => prev.concat([note]));
            console.log(await fetchNote(note))
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
                zIndex: 9999, // 👈 make sure popup sits on top
            }}
        >
            <div>
                <textarea
                    ref={textareaRef}
                    rows={3}
                    style={{
                        border: '1px solid rgba(0, 0, 0, .3)',
                        width: '200px',
                        outline: 'none',
                    }}
                    value={localMessage}
                    onChange={(e) => setLocalMessage(e.target.value)}
                />
            </div>
            <div style={{ display: 'flex', marginTop: '8px' }}>
                <div style={{ marginRight: '8px' }}>
                    <PrimaryButton onClick={addNote}>Add</PrimaryButton>
                </div>
                <Button onClick={props.cancel}>Cancel</Button>
            </div>
        </div>
    );
};
export default HighlightPopup