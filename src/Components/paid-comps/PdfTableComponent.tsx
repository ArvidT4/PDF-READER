import {IMetadata} from "../../Interfaces.ts";
import {useNavigate} from "react-router-dom";

interface props{
    metadata:IMetadata
}

const PdfTableComponent:React.FC<props> = ({metadata}) => {

    const navigate=useNavigate()
    const navToWorker=()=>{
        navigate("/dashboard/view/"+metadata.filepath)
    }
  return (
    <div onClick={navToWorker} className={"border border-gray-40000 rounded-xl bg-gray-700 p-4 m-1 flex"}>
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