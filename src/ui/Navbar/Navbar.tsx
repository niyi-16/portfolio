import './Navbar.scss'
import {Dropdown} from "../Dropdown/Dropdown.tsx";
import type {Contact} from "../../model/Contact.ts";
import {svgPath} from "../../../icons.tsx";
import {Link} from "react-router-dom";
import {BASE} from "../../../env.ts";

const platforms: Contact[] = [
    {
        id: 1,
        name: "LinkedIn",
        url: "www.linkedin.com/in/dasil-adam",
        logo: svgPath.linkedin
    },
    {
        id: 2,
        name: "Github",
        url: "https://github.com/niyi-16",
        logo: svgPath.github
    },
    {
        id: 3,
        name: "Email",
        url: "mailto:dasil.adam@gmail.com",
        logo: svgPath.email
    },
    {
        id: 4,
        name: "Resume",
        url: BASE+"Dasil_Resume_2026_03.pdf",
        logo: svgPath.document
    }
]

function Navbar() {

    return (
        <div className={"nav-container"}>
            <div className={"main-nav"}>
                <div id="email-container">
                    <div className="email-content">
                        <Dropdown main={"Dasil Adam"} content={platforms} className={"header-link"}/>
                    </div>

                </div>
                <div id="nav-links-container">
                    <div className="nav-links-content">
                            <Link className="header-link" to="/" title="Home page">Home</Link>
                            <Link className="header-link" to="/projects" title="My projects">Projects</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar