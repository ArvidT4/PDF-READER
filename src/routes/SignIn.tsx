import {useMyUserContext} from "../contexts/UserContext.tsx";
import GoogleButton from "../Components/GoogleButton.tsx";

const SignIn = () => {

  return (
    <div>
        <div className={"flex w-2/4 m-auto h-[30rem]"}>
            <div className={"w-2/4 h-full bg-white rounded-l-md mt-20"}>
                <div className={"h-full m-1 p-5"}>
                    <div className={"mt-5"}>
                        <h1 className={"font-mono text-center font-bold text-xl"}>Sign in</h1>
                    </div>
                    <div className={"grid gap-2"}>
                        <div className={"flex flex-col"}>
                            <label>Email</label>
                            <input type={"email"} src={""} placeholder={"email@address.com"} className={"border p-4 h-2 rounded-xl"}/>
                        </div>
                        <div className={"flex flex-col"}>
                            <label>Password</label>
                            <input type={"password"} src={""} placeholder={"*********"} className={"border p-4 h-2 rounded-xl"}/>
                        </div>
                        <div className={"mt-5"}>
                            <button className={"bg-blue-700 text-white w-full p-1 rounded-xl"}>Sign in</button>
                        </div>
                        <div className={"mt-3 text-center"}>
                            <p className={"cursor-pointer hover:text-gray-600"}>Forgot your password?</p>
                        </div>
                        <div className={"w-full border"}></div> {/*line spacing*/}
                        <div className={"mt-5"}>
                            <GoogleButton></GoogleButton>
                        </div>
                    </div>
                </div>
            </div>
            <div className={"w-2/4 h-full bg-blue-700 rounded-r-md mt-20"}>
                <div className={"text-white p-5"}>
                    <h2 className={"font-bold text-center text-2xl mt-5"}>Welcome Back!</h2>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. </p>
                </div>
            </div>
        </div>
    </div>
  );
};

export default SignIn;