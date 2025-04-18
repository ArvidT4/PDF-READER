import BurgerTwoAnimation from "../burger/Burger.tsx";
import {useState} from "react";
import BurgerContent from "../burger/BurgerContent.tsx";

const NavigationBar = () => {
    const [clicked,setClicked]=useState(false);

    return (
      <div className={"grid grid-cols-4 sm:grid-cols-2"}>
          <div className={"grid sm:grid-cols-6 col-span-3 sm:col-span-1 focus:outline-none"}>
              <img className={"h-12 m-auto select-none pointer-events-none"} src={"/Aculubaliba.png"}/>
              <h1 className={"sm:text-2xl  m-auto col-start-2 col-end-5 hover:text-gray-600 duration-300 cursor-pointer"}>
                  <a href={"/"}>PDF Highlight Hero - PDF Reader</a>
              </h1>
          </div>
          <div className={"sm:block hidden"}>
              <ul className={"grid grid-cols-6 h-full"}>
                  <li className={"m-auto col-start-5 col-end-5 hover:text-gray-600 duration-300 cursor-pointer"}>
                      <a href={"/contact"}>Contact</a>
                  </li>
                  <li className={"m-auto col-start-6 col-end-6 hover:text-gray-600 duration-300 cursor-pointer"}>
                      <a href={"/about"}>About</a>
                  </li>
              </ul>
          </div>
          <div className={"sm:hidden block m-2"}>
              <BurgerTwoAnimation clicked={clicked} setClicked={setClicked}/>

          </div>
          <div className={"sm:hidden"}>
              <BurgerContent clicked={clicked}/>
          </div>

      </div>

  );
};

export default NavigationBar;