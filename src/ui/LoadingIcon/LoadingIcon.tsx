import "./LoadingIcon.scss"
function LoadingIcon({cls}: {cls: string}) {

    return (
        <div className={"loader-container " + `${cls}`}>
            <div className="loader"></div>
        </div>
    )
}

export default LoadingIcon