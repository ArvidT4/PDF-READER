import {HighlightArea} from "@react-pdf-viewer/highlight";

export interface Note {
    id: number;
    content: string;
    highlightAreas: HighlightArea[];
    quote: string;
}