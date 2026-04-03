import './Navbar.scss'
import {Dropdown} from "../Dropdown/Dropdown.tsx";
import type {Contact} from "../../model/Contact.ts";
import {svgPath} from "../../../icons.tsx";
import {Link} from "react-router-dom";
import {BASE} from "../../../env.ts";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const platforms: Contact[] = [
    {
        id: 1,
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/dasil-adam",
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
    const [devWidth, setDevWidth] = useState(window.innerWidth);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleResize = () => setDevWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Close menu when resizing to desktop
    useEffect(() => {
        if (devWidth >= 768 && isMenuOpen) {
            setIsMenuOpen(false);
        }
    }, [devWidth, isMenuOpen]);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    //Mobile Nav
    if (devWidth < 768) {
        return (
            <div className={"nav-container"}>
                <div className={"main-nav"}>
                    <div className="email-container">

                            <Dropdown main={"Dasil Adam"} content={platforms} className={"header-link"}/>


                    </div>
                    <div id="nav-links-container">
                        {!isMenuOpen && (
                            <button 
                                className="nav-toggle-button" 
                                aria-label="Open navigation"
                                onClick={toggleMenu}
                            >
                                <Menu size={28} />
                            </button>
                        )}
                    </div>
                </div>

                {/* Sidebar Overlay */}
                <div className={`mobile-sidebar ${isMenuOpen ? 'open' : ''}`}>
                    <div className="sidebar-header">
                        <button 
                            className="nav-close-button" 
                            aria-label="Close navigation"
                            onClick={toggleMenu}
                        >
                            <X size={28} />
                        </button>
                    </div>
                    <nav className="mobile-nav-links">
                        <Link 
                            className="mobile-header-link" 
                            to="/" 
                            title="Home page"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Home
                        </Link>
                        <Link 
                            className="mobile-header-link" 
                            to="/projects" 
                            title="My projects"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Projects
                        </Link>
                        <Dropdown main={"Contact"} content={platforms} className={"mobile-header-link"}/>
                    </nav>
                </div>
                {/* Backdrop */}
                {isMenuOpen && (
                    <div className="sidebar-backdrop" onClick={() => setIsMenuOpen(false)}></div>
                )}
            </div>
        )
    }

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