import {useLoad} from "../context/LoadingContext";
import LoadingIcon from "./LoadingIcon.tsx";

function Loader({children} : {children: React.ReactNode}) {

    const {loading} = useLoad();

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