import React, {ChangeEvent, Dispatch, SetStateAction, useEffect, useState} from "react";
import {useMyUserContext} from "../contexts/UserContext.tsx";
import {IUser} from "../Interfaces.ts";
import {useNavigate} from "react-router-dom";

const SignUp=()=>{
    const [email,setEmail]=useState<string>("")
    const [password,setPassword]=useState<string>("")
    const {signUp,secret}=useMyUserContext()
    const navigate=useNavigate()
    const handleChange=(e:ChangeEvent<HTMLInputElement>,set:Dispatch<SetStateAction<string>>)=>{
        set(e.target.value)
    }
    useEffect(() => {
        console.log(email)
    }, [email]);

    const submit=async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        console.log("WAP")
        const user: IUser = {email, password}
        const response:boolean = await signUp(user)
        console.log(response)
        if (response) navigate("/dashboard")
    }
    return(
        <div>
            signup
            <div>
                <form onSubmit={(e: React.FormEvent<HTMLFormElement>)=>submit(e)}>
                    <input className={"border p-2 bg-gray-100"} type={"email"} value={email}
                           onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e, setEmail)}/>
                    <input className={"border p-2 bg-gray-100"} type={"password"} value={password}
                           onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e, setPassword)}/>
                    <button className={"p-2 bg-blue-700 text-white"}>Sign Up</button>
                </form>
            </div>
            <button className={"p-2 bg-blue-700 text-white"} onClick={secret}>Submit</button>
        </div>
    )
}
export default SignUp