import Footer from "./Footer.tsx";
import NavigationBar from "./NavigationBar.tsx";

const Layout:React.FC = ({children}) => {
  return (
    <div className={"flex flex-col min-h-screen"}>

        <div className={"flex-1"}>
            <NavigationBar/>
            {children}
        </div>
        <Footer/>
    </div>
  );
};

export default Layout;