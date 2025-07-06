const SignIn = () => {
  return (
    <div>
        <div className={"flex w-2/4 m-auto h-[30rem]"}>
            <div className={"w-2/4 h-full bg-white rounded-l-md mt-20"}>
                <div className={"h-full m-1"}>
                    <div>
                        <h1 className={"font-mono text-center font-bold text-xl"}>Sign in</h1>
                    </div>
                    <div className={"grid gap-2 "}>
                        <div className={"flex flex-col"}>
                            <label className={"mr-1"}>Email</label>
                            <input src={""} placeholder={"email@address.com"} className={"border p-4 h-2 rounded-xl"}/>
                        </div>
                        <div className={"flex flex-col"}>
                            <label className={"mr-1"}>Password</label>
                            <input src={""} placeholder={"*********"} className={"border p-4 h-2 rounded-xl"}/>
                        </div>
                        <div>
                            <button>Sign in</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className={"w-2/4 h-full bg-blue-700 rounded-r-md mt-20"}>

            </div>
        </div>
    </div>
  );
};

export default SignIn;