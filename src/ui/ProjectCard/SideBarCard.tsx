import {svg, icons} from "../../../icons.tsx"

type SideBarCardProps = {
    name: string
    short_desc: string
    stack: string[]
    links?: Record<string, string>,
    images?: { default?: string, showcase?: string[] },
    onClick: () => void;
};
function SideBarCard({images, stack, links, name, short_desc, onClick}: SideBarCardProps) {

    return (
        //item start
        <div className="group flex flex-col max-w-37.5 max-h-37.5 rounded-lg shadow-md overflow-hidden bg-[#12131a]
        hover:border hover:border-[#12131a] hover:-translate-1 transition-all duration-300 ease"
             onClick={onClick}
             style={{ cursor: onClick ? "pointer" : undefined }}>

            {/*blur overlay*/}
            <div className={"relative z-1 flex flex-col text-decoration-none"}>

                {/*Image wrapper*/}
                <div className={"relative overflow-hidden"}>

                    {/*Actual image*/}
                    <img className={"block w-full h-full object-cover aspect-4/3" +
                        " transition-all duration-200 ease-in-out" +
                        " origin-center group-hover:blur-[6px] group-hover:brightness-85 group-hover:scale-[1.02]"}
                         src={images?.default} alt={"Event Image"}/>

                    {/*Details overlay*/}
                    <div className={"absolute inset-0 flex items-center justify-center p-[14px] opacity-0 " +
                        "transition-opacity duration-200 ease-in-out pointer-events-none group-hover:opacity-100"}>
                        <div className={"backdrop-filter-none text-left text-white max-w-[90%] leading-[1.35] [text-shadow:0_2px_6px_rgba(0,0,0,0.5)]"}>
                            <div className={"text-[0.9rem] opacity-95 mb-1.5"}>{short_desc}</div>

                            <div className={"text-[0.85rem] opacity-95"}>
                                <span className={"opacity-85 font-semibold"}>2024-01-01</span>
                            </div>

                            <div className={"text-[0.85rem] opacity-95"}>
                                <span className={"opacity-85 font-semibold"}>
                                    stacked by:
                                    {stack.map((t, index) => (
                                        <span key={index} className={"opacity-85 font-semibold ml-1"}>
                                            {t}
                                        </span>
                                    ))}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={"p-3 text-[1rem] font-semibold text-white text-center mt-auto"}>{name}</div>

        </div>

    )
}
export {SideBarCard}