import './Navbar.scss'

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
                        <a className="header-link" href="/contact" title="Contact me">Contact Me</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar