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
            <div className={"grid sm:grid-rows-2"}>
                <Gradient>
                    <div>
                        <Banner/>
                        <div className={"sm:grid sm:grid-cols-2 mt-20"}>

                            <div className={"sm:block hidden"}>
                                <NavToReader/>
                                <DemoPicture/>
                            </div>
                        </div>
                    </div>
                    <div className={"sm:block hidden"}>
                        <DemoWrap/>
                    </div>
                </Gradient>
                <div>
                    <ViewUpload/>
                </div>
            </div>
        </Layout>
  );
};

export default Homepage;