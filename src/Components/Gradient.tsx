import Banner from "./Banner.tsx";
import NavToReader from "./NavToReader.tsx";
import DemoPicture from "./DemoPicture.tsx";
import DemoWrap from "../Demo/DemoWrap.tsx";
import ViewUpload from "../uploadAndView/ViewUpload.tsx";

const Gradient:React.FC = ({children}) => {
  return (
      <div className={"w-screen h-50 p-10 bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% bg-blur grid grid-cols-2"}>
        {children}
      </div>
  );
};

export default Gradient;