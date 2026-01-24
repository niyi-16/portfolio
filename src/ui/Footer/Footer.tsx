import './Footer.scss'

function Footer() {

    return (
            <div className="footer-container">
                <div className="f-content">

                    <div className="copyright-info">
                        <p>Copyright 2025 &copy; Dasil Adam</p> {/*<!-- copyright info -->*/}
                    </div>


                    <div className="social-icons">

                        <div><a href="mailto:w0509891@nscc.ca" target="_blank"><img src="src/assets/png/email_logo.png"
                                                                                    alt="Email logo"/></a>
                            <a href="https://github.com/" target="_blank"><img src="src/assets/png/github_logo.png"
                                                                               alt="Github logo"/></a>
                            <a href="https://www.linkedin.com/" target="_blank"><img
                                src="/src/assets/png/linkedin_logo.png"
                                alt="LinkedIn logo"/></a></div>

                    </div>


                </div>
            </div>
    )
}

export default Footer