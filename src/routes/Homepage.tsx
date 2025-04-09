import Banner from "../Components/Banner.tsx";
import PdfWorker from "../uploadAndView/PdfWorker.tsx";
import pdf from "../../public/utbildningsplan_DSPPG.pdf"
import DemoWorker from "../Demo/DemoWorker.tsx";
import DemoWrap from "../Demo/DemoWrap.tsx";
import DemoPicture from "../Components/DemoPicture.tsx";
import NavigationBar from "../Components/NavigationBar.tsx";
import NavToReader from "../Components/NavToReader.tsx";
import ViewUpload from "../uploadAndView/ViewUpload.tsx";
import Gradient from "../Components/Gradient.tsx";
import Footer from "../Components/Footer.tsx";
import Layout from "../Components/Layout.tsx";
const Homepage=()=>{
  console.log(pdf)
  return (
        <Layout>
            <div className={"grid grid-rows-2"}>
                <Gradient>
                    <div>
                        <Banner/>
                        <div className={"grid grid-cols-2 mt-20"}>
                            <NavToReader/>
                            <DemoPicture/>
                        </div>
                    </div>
                    <DemoWrap/>
                </Gradient>
                <div className={"w-screen"}>
                    <ViewUpload/>
                </div>
            </div>
        </Layout>
  );
};

export default Homepage;