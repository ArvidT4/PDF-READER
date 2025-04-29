import {Note} from "../Interfaces.ts";
import DeleteNoteButton from "../Components/DeleteNoteButton.tsx";
import {HighlightArea} from "@react-pdf-viewer/highlight";
import "../css/Highlights.css"
import {useEffect, useState} from "react";
interface props{
    noteClass:string,
    notes:Note[],
    jumpToHighlightArea:(area:HighlightArea)=>void,}
const Notes:React.FC<props> = ({noteClass,notes,jumpToHighlightArea}) => {
    const [expanded,setExpanded]=useState<string>("sm:w-40");
    const [expandedButton,setExpandedButton]=useState<string>("sm:bg-white");
    const [expandText,setExpandText]=useState<string>("Expand");
    const [clicked,setClicked]=useState<boolean>(false);
    const expand=()=>{
        setClicked(!clicked)
    }
    useEffect(() => {
        if(clicked){
            setExpanded("w-full  sm:w-[80vh]")
            setExpandedButton("sm:bg-gray-200")
            setExpandText("Shrink")
        }
        else{
            setExpanded("w-30 sm:w-40")
            setExpandedButton("sm:bg-white")

            setExpandText("Expand")
        }
    }, [clicked]);
  return (
      <div
          style={{height:"90vh"}}
          className={noteClass + " " + expanded}
      >
          <div className={"sm:flex hidden"}>
              <button className={"border p-2 rounded-md flex-1 m-2 " + expandedButton} onClick={expand}>{expandText}</button>
          </div>
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