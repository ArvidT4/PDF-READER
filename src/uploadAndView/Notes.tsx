import {Note} from "../Interfaces.ts";
import DeleteNoteButton from "../Components/DeleteNoteButton.tsx";
import {HighlightArea} from "@react-pdf-viewer/highlight";
import "../css/Highlights.css"
interface props{
    noteClass:string,
    notes:Note[],
    jumpToHighlightArea:(area:HighlightArea)=>void,}
const Notes:React.FC<props> = ({noteClass,notes,jumpToHighlightArea}) => {
  return (
      <div
          className={noteClass}
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
                      <DeleteNoteButton note={note}/>
                  </div>

              );
          })}
      </div>
  );
};

export default Notes;