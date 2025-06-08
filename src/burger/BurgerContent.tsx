import {useEffect, useState} from "react";
import * as React from "react";
interface props{
    clicked:boolean
}
const BurgerContent:React.FC<props>=({clicked}) => {
    const [divClass, setDivClass]=useState<string>("contentHide");
    useEffect(() => {
        setDivClass(clicked ? "contentShow" : "contentHide");

    }, [clicked]);
  return (
    <div className={divClass}>
        <ul>
            <li className={"p-2"}>
                <a href={"/"}>Reader</a>
            </li>
            <li className={"p-2"}>
                <a href={"/contact"}>Contact</a>
            </li>
            <li className={"p-2"}>
                <a href={"/about"}>About</a>
            </li>
        </ul>
    </div>
  );
};

export default BurgerContent;