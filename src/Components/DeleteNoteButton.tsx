import {useMyPluginContextContext} from "../contexts/PluginContext.tsx";
import React from "react";
import {Note} from "../Interfaces.ts";

interface props{
    note:Note
}
const DeleteNoteButton:React.FC<props> = ({note}) => {
    const {removeHighlight}=useMyPluginContextContext()
  return (
      <div>
          <button className={"border rounded-md p-1 m-2 hover:bg-gray-200 duration-300"} onClick={()=>removeHighlight(note)}>
              Remove
          </button>
      </div>

  );
};

export default DeleteNoteButton;