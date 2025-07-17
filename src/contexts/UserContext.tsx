import React, {
    ReactNode,
    createContext,
    useContext,
    useCallback,
} from "react";
import {IUser} from "../Interfaces.ts";
import axios, {AxiosResponse} from "axios";
import {createClient, SupabaseClient} from '@supabase/supabase-js';

interface IUserContext {
    signUp:(user:IUser)=>Promise<boolean>,
    secret:()=>void,
    googleSignUp:()=>void,
    supabase:SupabaseClient,
    checkSession:()=>Promise<boolean>,
    signIn:(user:IUser)=>Promise<boolean>,
}

const MyContext = createContext<IUserContext | undefined>(undefined);

const MyUserContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const supabaseUrl = 'https://vtpkvfzmkayjbwwrlmtp.supabase.co';
    const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ0cGt2Znpta2F5amJ3d3JsbXRwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk3NDM0NTEsImV4cCI6MjA2NTMxOTQ1MX0.nx-hRn9JCFNOAM9bmCr9OMRNfqkzIV7ggXVlaOZTtl8\n';

    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    const googleSignUp= async ()=>{
        await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: 'http://localhost:5173/login' // <-- this is your app’s URL
            }
        });
    }
    const checkSession = async (): Promise<boolean> => {
        const { data } = await supabase.auth.getSession();
        const token = data.session?.access_token;

        if (token) {
            try {
                const response:AxiosResponse=await axios.post(
                    "http://localhost:3000/users/auth",
                    {},
                    {
                        headers: { Authorization: `Bearer ${token}` },
                        withCredentials: true,
                    }
                );
                console.log(response)
                return true;
            } catch (err) {
                console.error("Token verification failed:", err);
                return false
            }
        }
        return false;
    };
    const signIn = useCallback(async (user:IUser):Promise<boolean> => {
        try{
            const response:AxiosResponse = await axios.post('http://localhost:3000/users/signIn', {
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
                return false
            }
            else if(response.data.success){
                console.log("success")

                console.log(response)

                return true
            }
            return false
        }
        catch(error){
            console.log(error)
            return false
        }
    }, []);

    const signUp = useCallback(async (user:IUser):Promise<boolean> => {
        try{
            const response:AxiosResponse = await axios.post('http://localhost:3000/users/signUp', {
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
                return false
            }
            else if(response.data.success){
                console.log("success")

                console.log(response)

                return true
            }
            return false
        }
        catch(error){
            console.log(error)
            return false
        }
    }, []);
    const secret = async () => {
        try {
            const response = await axios.get('http://localhost:3000/users/secret', {
                withCredentials: true,
            });

            console.log(response.data); // or response.status, etc.
        } catch (error) {
            console.error("❌ Error fetching secret:", error.response?.data || error.message);
        }
    };
    return (
        <MyContext.Provider value={{signUp ,secret,googleSignUp,supabase,checkSession,signIn}}>
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
