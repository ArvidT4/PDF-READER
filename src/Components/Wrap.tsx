import Banner from "./Banner.tsx";
import PdfWorker from "../uploadAndView/PdfWorker.tsx";
import pdf from "../../public/utbildningsplan_DSPPG.pdf"
import DemoWorker from "../Demo/DemoWorker.tsx";
import DemoWrap from "../Demo/DemoWrap.tsx";
import DemoPicture from "./DemoPicture.tsx";
import NavigationBar from "./NavigationBar.tsx";
import NavToReader from "./NavToReader.tsx";
const Wrap: React.FC<{ children: React.ReactNode }> = ({ children })=>{
  console.log(pdf)
  return (
    <div>
        <NavigationBar/>
        <div className={"grid grid-rows-2"}>
            <div className={"w-screen h-50 p-10 bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% bg-blur grid grid-cols-2"}>
              <div>
                  <Banner/>
                  <div className={"grid grid-cols-2 mt-20"}>
                      <NavToReader/>
                      <DemoPicture/>

                  </div>
              </div>
            <DemoWrap/>
            </div>

            <div className={"w-screen"}>
            {children}
            </div>
        </div>
    </div>
  );
};

export default Wrap;