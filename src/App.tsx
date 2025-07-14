import "./index.css"
import Homepage from "./routes/Homepage.tsx";
import ContextProvider from "./contexts/ContextProvider.tsx";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import About from "./routes/About.tsx";
import Contact from "./routes/Contact.tsx";
import SignUp from "./routes/SignUp.tsx";
import SignIn from "./routes/SignIn.tsx";
import Login from "./routes/Login.tsx";
import Dashboard from "./routes/Dashboard.tsx";

function App() {

  return (
    <div className={"min-h-screen bg-black"}>
        <ContextProvider>
            <Router>
                <Routes>
                    <Route path={"/"} element={<Homepage/>}></Route>
                    <Route path={"/about"} element={<About/>}></Route>
                    <Route path={"/contact"} element={<Contact/>}></Route>
                    <Route path={"/signUp"} element={<SignUp/>}></Route>
                    <Route path={"/signIn"} element={<SignIn/>}></Route>
                    <Route path={"/login"} element={<Login/>}></Route>
                    <Route path={"/dashboard"} element={<Dashboard/>}></Route>
                    <Route path={"*"} element={<Homepage/>}></Route>
                </Routes>
            </Router>
        </ContextProvider>
    </div>
  )
}

export default App
