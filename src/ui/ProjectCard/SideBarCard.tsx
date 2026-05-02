import {svg, icons} from "../../../icons.tsx"

type SideBarCardProps = {
    name: string
    short_desc: string
    stack: string[]
    links?: Record<string, string>,
    images?: { default?: string, showcase?: string[] },
};
function SideBarCard({project, onClick}: {project: SideBarCardProps, onClick: () => void }) {
    const {name, short_desc, stack, images} = project;

    return (
        //item start
        <div className="group cursor-pointer flex flex-col max-w-37.5 max-h-37.5 rounded-lg shadow-md overflow-hidden bg-[#12131a]
        hover:border hover:border-[#12131a] hover:scale-105 transition-all duration-300 ease"
             onClick={onClick}>

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
                    <div className={"absolute inset-0 flex items-center justify-center p-3.5 opacity-0 " +
                        "transition-opacity duration-200 ease-in-out pointer-events-none group-hover:opacity-100"}>

                        <div className={"backdrop-filter-none text-left text-white max-w-[90%] leading-[1.35] [text-shadow:0_2px_6px_rgba(0,0,0,0.5)]"}>
                            <div className={"text-[0.9rem] opacity-95 mb-1.5"}>{short_desc}</div>

                            <div className={"text-[0.85rem] opacity-95"}>
                                <div className={"flex flex-wrap flex-row gap-1"}>
                                    {stack.map((t, index) => (
                                        <span key={index} className={"font-semibold"}>
                                            {t}
                                        </span>
                                    ))}
                                </div>
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