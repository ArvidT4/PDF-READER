import "./index.css"
import Homepage from "./routes/Homepage.tsx";
import ContextProvider from "./contexts/ContextProvider.tsx";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import About from "./routes/About.tsx";
import Contact from "./routes/Contact.tsx";

function App() {

  return (
    <div>
        <ContextProvider>
            <Router>
                <Routes>
                    <Route path={"/"} element={<Homepage/>}></Route>
                    <Route path={"/about"} element={<About/>}></Route>
                    <Route path={"/contact"} element={<Contact/>}></Route>
                    <Route path={"*"} element={<Homepage/>}></Route>
                </Routes>
            </Router>
        </ContextProvider>
    </div>
  )
}

export default App
