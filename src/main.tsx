import { StrictMode} from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter as Router, Routes,  Route} from 'react-router-dom'

import './main.scss'
import App from './routes/Home/App.tsx'
import Navbar from "../src/ui/Navbar/Navbar.tsx"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <Navbar/>
      <Router>
          <Routes>
              <Route path="/" element={<App/>}></Route>
              <Route path="/Projects" element={<App/>}></Route>
          </Routes>
      </Router>
  </StrictMode>,
)
