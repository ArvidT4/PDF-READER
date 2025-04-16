import Banner from "../Components/Banner.tsx";
import DemoWrap from "../Demo/DemoWrap.tsx";
import DemoPicture from "../Components/DemoPicture.tsx";
import NavToReader from "../Components/NavToReader.tsx";
import ViewUpload from "../uploadAndView/ViewUpload.tsx";
import Gradient from "../Components/Gradient.tsx";
import Layout from "../Components/Layout.tsx";
const Homepage=()=>{
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
                <div>
                    <ViewUpload/>
                </div>
            </div>
        </Layout>
  );
};

export default Homepage;