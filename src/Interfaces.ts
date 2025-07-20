import {HighlightArea} from "@react-pdf-viewer/highlight";

export interface Note {
    id: number;
    content: string;
    highlightAreas: HighlightArea[];
    quote: string;
}
export interface DBNote{
    id:number,
    note:Note
}
export interface DBPDF{
    id:number,
    pdf:string
}
export interface IUser{
    email:string,
    password:string
}
export interface IMetadata{
    id:string,
    created_at:Date|string,
    user_id:string
    title:string,
    filepath:string
}