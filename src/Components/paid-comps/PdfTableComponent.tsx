import {IMetadata} from "../../Interfaces.ts";

interface props{
    metadata:IMetadata
}

const PdfTableComponent:React.FC<props> = ({metadata}) => {
    console.log(metadata)
  return (
    <div className={"border border-gray-40000 rounded-xl bg-gray-700 p-4 m-1 flex"}>
        <div>
            <img className={"h-28"} alt={"book cover"} src={"/images.jpg"}/>
        </div>
        <div className={"text-white text-2xl"}>
            {metadata.title}
        </div>
    </div>
  );
};

export default PdfTableComponent;