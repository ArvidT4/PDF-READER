import Banner from "./Banner.tsx";
import PdfWorker from "../uploadAndView/PdfWorker.tsx";
import pdf from "../../public/utbildningsplan_DSPPG.pdf"
import DemoWorker from "../Demo/DemoWorker.tsx";
const Wrap: React.FC<{ children: React.ReactNode }> = ({ children })=>{
  console.log(pdf)
  return (
    <div className={"grid grid-rows-2"}>
      <div className={"w-screen h-50 p-10 bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% bg-blur"}>
        <Banner/>
      </div>
      <DemoWorker/>
      <div className={"w-screen"}>
        {children}
      </div>
    </div>
  );
};

export default Wrap;