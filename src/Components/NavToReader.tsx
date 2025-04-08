import {useRef} from "react";
import {useMyNavigatorContextContext} from "../contexts/NavigatorContext.tsx";

const NavToReader = () => {
    const {scrollToSection}=useMyNavigatorContextContext()
  return (
    <div className={" m-auto "}>
        <button onClick={scrollToSection} className={"border border-black text-black p-2 bg-white rounded-lg"}>Navigate to the reader</button>
    </div>
  );
};

export default NavToReader;