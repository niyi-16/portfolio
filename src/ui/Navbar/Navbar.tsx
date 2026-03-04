import './Navbar.scss'
import {Dropdown} from "../Dropdown/Dropdown.tsx";
import type {Contact} from "../../model/Contact.ts";


    const platforms:Contact[] = [
        {
            id: 1,
            name: "LinkedIn",
            url: "https://www.linkedin.com/in/dasil-adam-2000/",
            logo: "src/assets/png/linkedin_logo.png"
        },
        {
            id: 2,
            name: "Github",
            url: "https://github.com/niyi-16",
            logo: "src/assets/png/github.png"
        },
        {
            id: 3,
            name: "Instagram",
            url: "www.instagram.com/",
            logo: "src/assets/png/instagram_logo.png"
        }
    ]
function Navbar() {

    return (
        <div className={"nav-container"}>
            <div className={"main-nav"}>
                <div id="email-container">
                    <div className="email-content">
                        <a className="header-link" href="mailto:W0509891@nscc.ca" target="_blank"
                           title="My email">Dasil Adam</a>
                    </div>

                </div>
                <div id="nav-links-container">
                    <div className="nav-links-content">
                        <a className="header-link" href="/" title="Home page">Home</a>
                        <a className="header-link" href="/projects" title="My projects">Projects</a>
                        <Dropdown className={"header-link"} main={"Contact"} content={platforms}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar