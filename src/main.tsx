import { StrictMode} from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter as Router, Routes,  Route} from 'react-router-dom'

//Style Sheet
import './main.scss'

//Components
import App from './pages/Home/App.tsx'
import Navbar from "../src/ui/Navbar/Navbar.tsx"
import {Project} from "./pages/Projects/Project.tsx";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Navbar/>
        <div className={"main-content"}>
            <Router>
                <Routes>
                    <Route path="/" element={<App/>}></Route>
                    <Route path="/projects" element={<Project/>}></Route>
                    <Route path="/details" element={<Project/>}></Route>
                </Routes>
            </Router>
        </div>
        {/*<Footer/>*/}
    </StrictMode>,
)
