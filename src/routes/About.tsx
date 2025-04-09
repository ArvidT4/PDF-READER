import NavigationBar from "../Components/NavigationBar.tsx";
import Gradient from "../Components/Gradient.tsx";
import Footer from "../Components/Footer.tsx";
import Layout from "../Components/Layout.tsx";

const About = () => {
  return (
        <Layout>
            <Gradient>
                <h1 className={"text-2xl text-white col-span-2 m-auto font-mono"}>About</h1>
            </Gradient>
            <div className={"w-6/12 m-auto mt-20"}>
                Hello! This application is designed for students to take notes directly in E-books and PDFs. Choosing digital E-books over physical copies can save you money and make traveling easier — no need to carry around heavy course literature.
            </div>
            <div className={"w-6/12 m-auto mt-10"}>
                If you would like to contribute to keep this website running you could donate.
            </div>
            <div className={"w-6/12 m-auto mt-40"}>
                Webmaster: Arvid.P@bahnhof.se
            </div>
        </Layout>
  );
};

export default About;