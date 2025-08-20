import {ReactNode, createContext, useContext, useState, useRef, useEffect} from "react"
import * as React from "react";
import axios, {AxiosResponse} from "axios";
import {Note} from "../../Interfaces.ts";


interface INotesTableContext{
    notes:Note[],
    setNotes:React.Dispatch<React.SetStateAction<Note[]>>,
    fetchNote:(note:Note)=>void,
    selectNotesTable:()=>void
}

const MyContext = createContext<INotesTableContext|undefined>(undefined)

const MyNotesTableContextProvider: React.FC<{children:ReactNode}> = ({children})=>{

    const [notes, setNotes] = React.useState<Note[]>([]);
    const fetchNote = async (note:Note) => {
        const response:AxiosResponse = await axios.post(
            "http://localhost:3000/notes/insertNote",
            {
                user_id:note.user_id,
                filepath:note.filepath,
                content:note.content,
                highlight_areas:note.highlight_areas
            },
            {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        return response.data;
    };
    const selectNotesTable=async (filepath:string)=>{
        try{
            const response:AxiosResponse=await axios.get('http://localhost:3000/notes/selectNotes', {
                params: { filepath },
                withCredentials: true,
            });
            if(response.status==200)setNotes(response.data)
            console.log(response)
        }catch(err){
            console.log(err)
        }

    }
    return (
        <MyContext.Provider value={{
            notes,
            setNotes,
            fetchNote,
            selectNotesTable
        }}>
            {children}
        </MyContext.Provider>
    )
}

const useNotesTableContext=()=> {
    const context = useContext(MyContext);
    if (!context) {
        throw new Error("useMyContext must be used within a provider");
    }
    return context;
};
export{MyNotesTableContextProvider, useNotesTableContext}
