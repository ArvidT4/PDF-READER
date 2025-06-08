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