import {createRoot} from 'react-dom/client'
import {HashRouter as Router, Routes, Route} from 'react-router-dom'
import {LoadingProvider} from "./context/LoadingContext.tsx";
//Style Sheet
import './main.scss'

//Components
import App from './pages/App.tsx'
import Navbar from "../src/components/Navbar/Navbar.tsx"
import {Project} from "./pages/Projects/Project.tsx";

// import {BASE} from "../env.ts";
import Details from "./pages/Details.tsx";
import Loader from "./components/Loader.tsx";


createRoot(document.getElementById('root')!).render(
    <LoadingProvider>
        <Router basename={"/"}>
            <Navbar/>
            <div className={"main-content"}>
                <Routes>
                    <Route path="/" element={<Loader><App/></Loader>}></Route>
                    <Route path="/projects" element={<Loader><Project/></Loader>}></Route>
                    <Route path="/projects/details/:id" element={<Details/>}></Route>
                </Routes>
            </div>
        </Router>
    </LoadingProvider>

)
