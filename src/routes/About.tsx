import Gradient from "../Components/Gradient.tsx";
import Layout from "../Components/Layout.tsx";

const About = () => {
    const coffee="/buyMeACoffee.png"
    const navToCoffee=()=>{
        window.location.href = "https://buymeacoffee.com/arvidpettersson";
    }
  return (
        <Layout>
            <Gradient>
                <h1 className={"text-2xl text-white col-span-2 m-auto font-mono"}>About</h1>
            </Gradient>
            <div className={"w-6/12 m-auto mt-20"}>
                Hello! This application is designed for students to take notes directly in E-books and PDFs. Choosing digital E-books over physical copies can save you money and make traveling easier — no need to carry around heavy course literature.
            </div>
            <div className={"w-6/12 m-auto mt-10"}>
                If you would like to contribute to keep this website running you could buy me a coffee.
            </div>
            <div className={"w-6/12 m-auto mt-2"}>
                    <img onClick={navToCoffee} src={coffee} alt={""} className={"w-60 cursor-pointer"}/>
            </div>
            <div className={"w-6/12 m-auto mt-40"}>
                Webmaster: Arvid.P@bahnhof.se
            </div>
        </Layout>
  );
};

export default About;