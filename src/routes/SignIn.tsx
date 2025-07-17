import {useMyUserContext} from "../contexts/UserContext.tsx";
import GoogleButton from "../Components/GoogleButton.tsx";
import {ChangeEvent, Dispatch, FormEvent, SetStateAction, useState} from "react";
import {useNavigate} from "react-router-dom";
import {IUser} from "../Interfaces.ts";

const SignIn = () => {
    const [email,setEmail]=useState<string>("")
    const [password,setPassword]=useState<string>("")
    const navigate=useNavigate()
    const handleChange=(e:ChangeEvent<HTMLInputElement>,set:Dispatch<SetStateAction<string>>)=>{
        set(e.target.value)
    }
    const {signIn}=useMyUserContext();
    const signInSubmit=async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const user: IUser = {email, password}
        const response:boolean = await signIn(user);
        if(response) navigate("/dashboard")
        console.log(response)
    }
    const NavToSignUp=()=>navigate("/signUp")
  return (
    <div>
        <div className={"flex w-2/4 m-auto h-[30rem]"}>
            <div className={"w-2/4 h-full bg-white rounded-l-md mt-20"}>
                <div className={"h-full m-1 p-5"}>
                    <div className={"mt-5"}>
                        <h1 className={"font-mono text-center font-bold text-xl"}>Sign in</h1>
                    </div>
                    <div className={"grid gap-2"}>
                        <form onSubmit={(e: FormEvent<HTMLFormElement>) => signInSubmit(e)}>
                            <div className={"flex flex-col"}>
                                <label>Email</label>
                                <input
                                    onChange={(event: ChangeEvent<HTMLInputElement>) => handleChange(event, setEmail)}
                                    type={"email"} src={""} placeholder={"email@address.com"}
                                    className={"border p-4 h-2 rounded-xl"}/>
                            </div>
                            <div className={"flex flex-col"}>
                                <label>Password</label>
                                <input
                                    onChange={(event: ChangeEvent<HTMLInputElement>) => handleChange(event, setPassword)}
                                    type={"password"} src={""} placeholder={"*********"}
                                    className={"border p-4 h-2 rounded-xl"}/>
                            </div>
                            <div className={"mt-5"}>
                                <button className={"bg-blue-700 text-white w-full p-1 rounded-xl"}>Sign in</button>
                            </div>
                        </form>
                        <div className={"mt-3 text-center"}>
                            <p className={"cursor-pointer hover:text-gray-600"}>Forgot your password?</p>
                        </div>
                        <div className={"w-full border"}></div>
                        {/*line spacing*/}
                        <div className={"mt-5"}>
                            <GoogleButton></GoogleButton>
                        </div>
                    </div>
                </div>
            </div>
            <div className={"w-2/4 h-full bg-blue-700 rounded-r-md mt-20"}>
                <div className={"text-white p-5"}>
                    <h2 className={"font-bold text-center text-2xl mt-5"}>Welcome Back!</h2>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
                        the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley
                        of type and scrambled it to make a type specimen book. </p>
                    <div className={"text-center mt-5"}>
                        <label>New here? Create an account!</label>
                        <button onClick={NavToSignUp} className={"bg-white text-blue-700 w-full p-1 rounded-xl"}>Sign up</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default SignIn;