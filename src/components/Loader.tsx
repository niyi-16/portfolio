import LoadingIcon from "./LoadingIcon.tsx";

function Loader({children, loading} : {children: React.ReactNode, loading: boolean}) {


    return (
        loading ?
            <div className={"h-dvh w-dvw flex flex-1 items-center justify-center"}>
                <LoadingIcon/>
            </div>
            :
            <>
                {children}
            </>
    )
}

export default Loader