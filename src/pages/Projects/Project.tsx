import {useState, useEffect} from 'react'
import './Projects.scss'
import {API_URL, PROJECTS, API_TRACKER, VISITOR_KEY} from "../../../env.ts"
import ProjectCard from "../../components/ProjectCard/ProjectCard.tsx";
import type {ProjectType, ProjectTypeExtended} from "../../types/ProjectType.ts";
import {useNavigate} from "react-router-dom"
import BigDisplay from "../../components/ProjectCard/BigDisplay.tsx";
import {CollapsibleSection} from "../../components/Dom.tsx";
import {icons, svg} from "../../../icons.tsx";
import Cookie from "js-cookie";
import {logEvent, wakeDB} from "../../lib/utils.ts";
import Loader from "../../components/Loader.tsx";

function Project() {
    const navigate = useNavigate()
    const [devWidth, setDevWidth] = useState(window.innerWidth);
    const [search, setSearch] = useState("")
    const [projects, setProjects] = useState<ProjectTypeExtended[]>([])
    const [selectedProject, setSelectedProject] = useState<ProjectTypeExtended | null>(null)


    const [loading, setLoading] = useState(true);

    const isExpanded = !!selectedProject
    const [tracker, setTracker] = useState({
        features: false,
        lessons: false,
        links: true,
        timeline: false,
        keywords: false,
        metadata: false,
    })
    const session = sessionStorage.getItem("session")
    /*Get Projects from API*/
    useEffect(() => {
        const getProjects = async () => {
            const response = await fetch(API_URL + PROJECTS + `?show=${1}`)
            return response.json()
        }

        getProjects().then((data) => {
            setProjects(data)
            setLoading(false)
        })
    }, [setLoading])

    /*Filter Projects*/
    const filteredProjects = projects.filter(project => {
        const searchable = [
            ...(project.keywords ?? []),
            ...(project.stack ?? [])
        ];
        return searchable.some(item =>
            item.toLowerCase().includes(search.toLowerCase())
        );
    })

    useEffect(() => {
        const handleResize = () => setDevWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [])

    const toggleTracker = (key: keyof typeof tracker) =>
        setTracker(prev => ({...prev, [key]: !prev[key]}));


    const logClick = async (project_id: string) => {
        await fetch(API_TRACKER + "/project_viewed", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + session
            },
            body: JSON.stringify({
                project_id: project_id,
                visitor_id: Cookie.get(VISITOR_KEY)
            })
        }).then(res => res.json())
    }
    const sp = selectedProject;
    const linksSafe = sp?.links || {};
    const linkList = Object.keys(linksSafe);


    return (
        <Loader loading={loading}>
            <div className={"project-page"}>
                <div className={"filter-container " + ((isExpanded ? " justify-between" : " justify-end"))}>
                    {selectedProject && <h1 className={"text-2xl font-bold"}>{selectedProject.name}</h1>}
                    <input type="text"
                           placeholder="Search Projects"
                           className={"filter-form"}
                           value={search}
                           onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <section className={(isExpanded ? "expanded-view " : "project-container")}>
                    {/* Left Column - Project List */}
                    <div className={isExpanded ? "project-sidebar" : "contents contents-container"}>
                        {isExpanded &&
                            <div className="stroke-white z-70 p-1 w-fit h-fit rounded-2xl bg-white/10
                         border-teal-500 cursor-pointer hover:bg-white/20 transition-color"
                                 onClick={() => setSelectedProject(null)}>
                                <svg className="w-6 h-6" transform={"translate(1.5,1)"}>
                                    <use href="x.svg#icon"/>
                                </svg>
                            </div>}
                        {filteredProjects.length > 0 ?
                            filteredProjects.map((project: ProjectType) => (
                                <div key={project._id}>
                                    {!isExpanded ? (
                                        <ProjectCard
                                            project={{
                                                name: project.name,
                                                short_desc: project.short_desc,
                                                stack: project.stack,
                                                links: project.links,
                                                images: project.images
                                            }}
                                            onClick={async () => {
                                                if (devWidth < 768) {
                                                    navigate(`/projects/details/${project._id}`, {state: {project}})
                                                } else {
                                                    setSelectedProject(project as ProjectTypeExtended)
                                                }
                                                if (session) {
                                                    logClick(project._id)
                                                    logEvent("click", `clicked on project ${project.name}`)
                                                }
                                            }}
                                            onHover={async () => {
                                                if (project._id === "698ea6a2b194d7762c465b8d") {
                                                    await wakeDB()
                                                }
                                            }}


                                        />
                                    ) : (
                                        <div
                                            className={`compact-sidebar-item ${selectedProject?._id === project._id ? 'active' : ''}`}
                                            onClick={async () => {
                                                setSelectedProject(project as ProjectTypeExtended)
                                                if (session) {
                                                    logClick(project._id)
                                                    logEvent("click", `clicked on project ${project.name} in compact view`)
                                                }
                                            }}
                                        >
                                            <div className="compact-sidebar-thumb">
                                                {project.images?.default ? (
                                                    <img src={project.images.default} alt={project.name}/>
                                                ) : (
                                                    <div className="compact-sidebar-placeholder"/>
                                                )}
                                            </div>
                                            <div className="compact-sidebar-info">
                                                <span className="compact-sidebar-name">{project.name}</span>
                                                <span className="compact-sidebar-stack">
                                                {project.stack?.slice(0, 3).join(' · ')}
                                            </span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))
                            :
                            <p style={{color: 'white', display: loading ? "none" : ""}}
                               className="col-span-3 text-center text-xl">
                                Unfortunately don't think I have worked with such just yet,
                                but I am always open to new challenges
                            </p>
                        }
                    </div>

                    {/* Center Column - Primary Project Details */}
                    <div className={isExpanded ? "center-display" : "hidden"}>
                        {sp && <BigDisplay project={sp}/>}
                    </div>

                    {/* Right Column - Secondary / Collapsible Info */}
                    <aside className={isExpanded ? "right-panel" : "hidden"}>
                        {sp && (
                            <div className="right-panel-inner">

                                {/* Status */}
                                {sp.status && (
                                    <div className="pt-3 border-t border-border/20">
                                        <div className="flex items-center gap-2">
                                            <div
                                                className={`w-2 h-2 rounded-full ${sp.status === 'active' ? 'bg-green-500' : sp.status === 'in-progress' ? 'bg-yellow-500' : 'bg-muted-foreground/50'}`}/>
                                            <span
                                                className="text-xs text-muted-foreground capitalize">{sp.status}</span>
                                        </div>
                                    </div>
                                )}

                                {/* Links - default open */}
                                {linkList.length > 0 && (
                                    <CollapsibleSection title="Links" onClick={() => toggleTracker('links')}
                                                        watcher={tracker.links}>
                                        <div className="flex flex-wrap gap-2">
                                            {linkList.map((link, index) => (
                                                <a key={index} href={linksSafe[link]} target="_blank" rel="noreferrer"
                                                   className="flex flex-col items-center gap-1 text-sm  text-foreground/80 hover:text-accent transition-colors">
                                                    {svg({icon: link, size: 24}) ??
                                                        <img src={icons[link]} alt={link} width={16} height={16}/>}
                                                    <span className="capitalize">{link}</span>
                                                </a>
                                            ))}
                                        </div>
                                    </CollapsibleSection>
                                )}

                                {/* Features */}
                                {sp.features && sp.features.length > 0 && (
                                    <CollapsibleSection title="Features" onClick={() => toggleTracker("features")}
                                                        watcher={tracker.features}>
                                        <ul className="list-disc list-outside pl-4 space-y-1 text-[10.5pt] text-foreground/80 ">
                                            {sp.features.map((f: string, i: number) => (
                                                <li key={i}
                                                    className={"hover:text-accent hover:brightness-150 transition-colors duration-200"}>{f}</li>
                                            ))}
                                        </ul>
                                    </CollapsibleSection>
                                )}

                                {/* Lessons */}
                                {sp.lessons && sp.lessons.length > 0 && (
                                    <CollapsibleSection title="Lessons Learned" watcher={tracker.lessons}
                                                        onClick={() => toggleTracker("lessons")}>
                                        <ul className="list-disc list-outside pl-4 text-[10.5pt] text-foreground/70 space-y-1">
                                            {sp.lessons.map((l, i) => (
                                                <li key={i}
                                                    className={"hover:text-accent hover:brightness-150 transition-colors duration-200"}>{l}</li>
                                            ))}
                                        </ul>
                                    </CollapsibleSection>
                                )}

                                {/*/!* Timeline *!/*/}
                                {/*{sp.timeline && sp.timeline.length > 0 && (*/}
                                {/*    <CollapsibleSection title="Timeline" watcher={tracker.timeline} onClick={() => toggleTracker("timeline")}>*/}
                                {/*        <Timeline timeline={sp.timeline} />*/}
                                {/*    </CollapsibleSection>*/}
                                {/*)}*/}

                            </div>
                        )}
                    </aside>
                </section>

            </div>
        </Loader>

    )
}

export {Project}
