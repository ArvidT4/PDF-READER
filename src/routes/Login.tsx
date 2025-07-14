import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {useMyUserContext} from "../contexts/UserContext.tsx";

const Login = () => {
    const { checkSession } = useMyUserContext();
    const navigate = useNavigate();
    useEffect(() => {
        const check = async () => {
            const loggedIn = await checkSession();
            if (loggedIn) {
                navigate("/dashboard");
            }
        };
        check();

    }, []);
  return (
    <div>
        Logging in user.....
    </div>
  );
};

export default Login;