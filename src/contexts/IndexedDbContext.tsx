import {ReactNode, createContext, useContext, useRef} from "react"
import {DBNote, DBPDF, Note} from "../Interfaces.ts";
import {HighlightArea} from "@react-pdf-viewer/highlight";
import {qunit} from "globals";

interface IIndexedDbContext{
    addNoteToDb:(note:Note)=>void,
    getAllNotes:()=>Promise<Note[]>,
    deleteNote:(note:number)=>Promise<boolean>,
    addPDFToDb:(pdf:string)=>void,
    getPDF:()=>Promise<string>,
    clearIndexedDB:(dbName: string, storeName: string)=>void,
}

const MyContext = createContext<IIndexedDbContext|undefined>(undefined)

const MyIndexedDbContextProvider: React.FC<{children:ReactNode}> = ({children})=>{
    const NOTES_DB_NAME="notes";
    const PDF_DB_NAME="pdf";
    const INDEXED_DB_NAME:string[]=["NotesDB","PDF"];
    const getDB=(indexedDBName:string,DBName:string):Promise<IDBDatabase>=>{
        return  new Promise<IDBDatabase>((resolve,reject)=>{
            const request = indexedDB.open(indexedDBName,1);
            request.onupgradeneeded=function(event){

                const db=request.result;
                if(!db.objectStoreNames.contains(indexedDBName)){
                    db.createObjectStore(DBName,{ keyPath: "id", autoIncrement: true })
                }
            }
            request.onsuccess=function (event){
                resolve(request.result);
            }
            request.onerror=function (event){
                reject(request.result);
            }

        })
    }
    const addPDFToDb=async (pdf:string)=>{
        const db = await getDB(INDEXED_DB_NAME[1],PDF_DB_NAME);
        const tx = db.transaction(PDF_DB_NAME, "readwrite");
        const store = tx.objectStore(PDF_DB_NAME);
        console.log("test")
        await store.add({
            pdf:pdf
        });
    }
    const getPDF = async (): Promise<string> => {
        const db = await getDB(INDEXED_DB_NAME[1], PDF_DB_NAME);
        const tx = db.transaction(PDF_DB_NAME, "readonly");
        const store = tx.objectStore(PDF_DB_NAME);
        const request = store.getAll();

        return new Promise<string>((resolve, reject) => {
            request.onsuccess = () => {
                const result = request.result as DBPDF[];
                if (result.length > 0) {
                    resolve(result[0].pdf);
                } else {
                    reject("No PDF found in IndexedDB");
                }
            };
            request.onerror = () => reject(request.error);
        });
    };
    const addNoteToDb=async (note:Note)=>{
        const db = await getDB(INDEXED_DB_NAME[0],NOTES_DB_NAME);
        const tx = db.transaction(NOTES_DB_NAME, "readwrite");
        const store = tx.objectStore(NOTES_DB_NAME);

        await store.add({
            note:note
        });
    }
    const deleteNote = async (id: number): Promise<boolean> => {
        try {
            const db = await getDB(INDEXED_DB_NAME[0],NOTES_DB_NAME);
            const tx = db.transaction(NOTES_DB_NAME, "readwrite");
            const store = tx.objectStore(NOTES_DB_NAME);

            return new Promise<boolean>((resolve, reject) => {
                const getAllRequest = store.getAll();

                getAllRequest.onsuccess = () => {
                    const result = getAllRequest.result as DBNote[];
                    const noteToDelete = result.find((obj) => obj.note.id === id);

                    if (!noteToDelete) {
                        console.log("Note not found!");
                        resolve(false);
                        return;
                    }

                    const deleteRequest = store.delete(noteToDelete.id);

                    deleteRequest.onsuccess = () => {
                        console.log(`Note with ID ${noteToDelete.id} has been deleted.`);
                        resolve(true);
                    };

                    deleteRequest.onerror = (e) => {
                        console.error(`Error deleting note with ID ${noteToDelete.id}:`, e);
                        resolve(false);
                    };
                };

                getAllRequest.onerror = (e) => {
                    console.error("Error retrieving notes:", e);
                    resolve(false);
                };

                tx.onerror = (e) => {
                    console.error("Transaction failed:", e);
                    resolve(false);
                };
            });
        } catch (error) {
            console.error("Error deleting note:", error);
            return false;
        }
    };

    async function getAllNotes(): Promise<Note[]> {
        const db = await getDB(INDEXED_DB_NAME[0],NOTES_DB_NAME);
        const tx = db.transaction(NOTES_DB_NAME, "readonly");
        const store = tx.objectStore(NOTES_DB_NAME);
        const request = store.getAll();


        return new Promise<Note[]>((resolve, reject) => {
            request.onsuccess = () => {
                const result = request.result as DBNote[];
                const notes:Note[]=[];
                result.forEach((obj)=>{notes.push(obj.note)})
                resolve(notes);
            };
            request.onerror = () => reject(request.error);
        });
    }
    async function getAllNotesAsDB(): Promise<DBNote[]> {
        const db = await getDB(INDEXED_DB_NAME[0],NOTES_DB_NAME);
        const tx = db.transaction("notes", "readonly");
        const store = tx.objectStore("notes");
        const request = store.getAll();


        return new Promise<DBNote[]>((resolve, reject) => {
            request.onsuccess = () => {
                const result = request.result as DBNote[];
                resolve(result);
            };
            request.onerror = () => reject(request.error);
        });
    }
    const clearIndexedDB = async (dbName: string, storeName: string): Promise<void> => {
        const db = await getDB(dbName, storeName);
        const tx = db.transaction(storeName, "readwrite");
        const store = tx.objectStore(storeName);
        const clearRequest = store.clear();

        return new Promise<void>((resolve, reject) => {
            clearRequest.onsuccess = () => {
                console.log(`Cleared all data from ${storeName}`);
                resolve();
            };
            clearRequest.onerror = () => {
                console.error(`Failed to clear data from ${storeName}`);
                reject(clearRequest.error);
            };
        });
    };
    return (
        <MyContext.Provider value={{addNoteToDb,getAllNotes,deleteNote,addPDFToDb ,getPDF,clearIndexedDB}}>
            {children}
        </MyContext.Provider>
    )
}

const useMyIndexedDbContext=()=> {
    const context = useContext(MyContext);
    if (!context) {
        throw new Error("useMyContext must be used within a provider");
    }
    return context;
};
export{MyIndexedDbContextProvider, useMyIndexedDbContext}