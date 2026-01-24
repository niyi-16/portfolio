import { StrictMode} from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter as Router, Routes,  Route} from 'react-router-dom'

//Style Sheet
import './main.scss'

//Components
import App from './routes/Home/App.tsx'
import Navbar from "../src/ui/Navbar/Navbar.tsx"
import Footer from "../src/ui/Footer/Footer.tsx"
import Project from "./routes/Projects/Project.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <Navbar/>
      <Router>
          <Routes>
              <Route path="/" element={<App/>}></Route>
              <Route path="/Projects" element={<Project/>}></Route>
          </Routes>
      </Router>
      {/*<Footer/>*/}
  </StrictMode>,
)
