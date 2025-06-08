import "../css/BurgerAnimations.css"
import {useEffect, useState} from "react";
import * as React from "react";
interface props{
    setClicked:React.Dispatch<React.SetStateAction<any>>,
    clicked:boolean
}
const BurgerTwoAnimation:React.FC<props>=({clicked,setClicked})=>{

    const [top,setTop]=useState("top");
    const [center,setCenter]=useState("center");
    const [bot,setBot]=useState("bot");
    const click=()=>{
        setClicked(!clicked);
    }
    useEffect(()=>{
        if(clicked){
            setTop("durTop")
            setCenter("durCenter")
            setBot("durBot")
            setTimeout(()=>{
                setTop("lineTop")
                setCenter("lineCenter")
                setBot("lineBot")
            },300);

        }
        else{
            setTop("durTop")
            setCenter("durCenter")
            setBot("durBot")
            setTimeout(()=>{
                setTop("top")
                setCenter("center")
                setBot("bot")
            },300);
        }
    },[clicked])
    return(
        <div className={"wrap"}>
            <div className={"lineWrap"} onClick={click}>
                <div className={top}></div>
                <div className={center}></div>
                <div className={bot}></div>
            </div>

        </div>
    )
}
export default BurgerTwoAnimation