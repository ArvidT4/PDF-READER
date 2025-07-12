import React, {ChangeEvent, Dispatch, SetStateAction, useEffect, useState} from "react";
import {useMyUserContext} from "../contexts/UserContext.tsx";
import {IUser} from "../Interfaces.ts";

const SignUp=()=>{
    const [email,setEmail]=useState<string>("")
    const [password,setPassword]=useState<string>("")
    const {signUp,secret}=useMyUserContext()
    const handleChange=(e:ChangeEvent<HTMLInputElement>,set:Dispatch<SetStateAction<string>>)=>{
        set(e.target.value)
    }
    useEffect(() => {
        console.log(email)
    }, [email]);

    const submit=(event: React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault()
        console.log("WAP")
        const user:IUser = {email,password}
        signUp(user)
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