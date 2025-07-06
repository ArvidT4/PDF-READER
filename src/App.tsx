import "./index.css"
import Homepage from "./routes/Homepage.tsx";
import ContextProvider from "./contexts/ContextProvider.tsx";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import About from "./routes/About.tsx";
import Contact from "./routes/Contact.tsx";
import SignIn from "./routes/SignIn.tsx";

function App() {

  return (
    <div className={"min-h-screen bg-gray-900"}>
        <ContextProvider>
            <Router>
                <Routes>
                    <Route path={"/"} element={<Homepage/>}></Route>
                    <Route path={"/about"} element={<About/>}></Route>
                    <Route path={"/contact"} element={<Contact/>}></Route>
                    <Route path={"/signIn"} element={<SignIn/>}></Route>
                    <Route path={"*"} element={<Homepage/>}></Route>
                </Routes>
            </Router>
        </ContextProvider>
    </div>
  )
}

export default App
