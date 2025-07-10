import React, {
    ReactNode,
    createContext,
    useContext,
    useRef,
    RefObject,
    useCallback,
} from "react";
import {IUser} from "../Interfaces.ts";
import axios, {AxiosResponse} from "axios";

interface IUserContext {
    signUp:(user:IUser)=>void,
    secret:()=>void
}

const MyContext = createContext<IUserContext | undefined>(undefined);

const MyUserContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

    const signUp = useCallback(async (user:IUser) => {
        try{
            const response:AxiosResponse = await axios.post('http://localhost:3000/signUp', {
                email: user.email,
                password: user.password,
            }, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            });
            if(response.data.code==='user_already_exists'){
                console.log("not good email already used")
            }
            else if(response.data.success){
                console.log("success")
            }
            console.log(response)
        }
        catch(error){
            console.log(error)
        }
    }, []);
    const secret=async ()=>{
        const response=axios.get('http://localhost:3000/secret', {
            withCredentials: true
        });
        console.log(response)
    }
    return (
        <MyContext.Provider value={{signUp ,secret}}>
            {children}
        </MyContext.Provider>
    );
};

const useMyUserContext = () => {
    const context = useContext(MyContext);
    if (!context) {
        throw new Error("useMyUserContext must be used within a provider");
    }
    return context;
};

export { MyUserContextProvider, useMyUserContext };
