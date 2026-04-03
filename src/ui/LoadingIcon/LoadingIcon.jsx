import "./LoadingIcon.scss"
function LoadingIcon({cls}) {

    return (
        <div className={"loader-container " + `${cls}`}>
            <div className="loader"></div>
        </div>
    )
}

export default LoadingIcon