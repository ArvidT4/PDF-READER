import Footer from "./Footer.tsx";
import NavigationBar from "./NavigationBar.tsx";
import React, {ReactNode} from "react";
interface Props {
    children: ReactNode;
}
const Layout:React.FC<Props>= ({children}) => {
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