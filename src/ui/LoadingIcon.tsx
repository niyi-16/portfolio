function LoadingIcon({cls}: {cls: string}) {

    return (
        <div className={"flex justify-center items-center " + `${cls}`}>
            <div className="border-4 border-[rgba(255,255,255, 0.1)]
                border-t-4 border-t-[#4f46e5] animate-spin h-10 w-10 rounded-[50%]"></div>
        </div>
    )
}

export default LoadingIcon