import {useState, useEffect} from 'react'
import './Projects.scss'
import {API_URL, PROJECTS} from "../../../env.ts"
import ProjectCard from "../../ui/ProjectCard/ProjectCard.tsx";
import type {ProjectType} from "../../model/ProjectType.ts";
import LoadingIcon from "../../ui/LoadingIcon/LoadingIcon.tsx";
import {useNavigate} from "react-router-dom"
import {SideBarCard} from "../../ui/ProjectCard/SideBarCard.tsx";
import BigDisplay from "../../ui/ProjectCard/BigDisplay.tsx";
import ScrollArea from "../../ui/ScrollArea.tsx";

function Project() {
    const navigate = useNavigate()
    const [devWidth, setDevWidth] = useState(window.innerWidth);
    const [search, setSearch] = useState("")
    const [projects, setProjects] = useState<ProjectType[]>([])
    const [selectedProject, setSelectedProject] = useState<ProjectType | null>(null)
    const [loading, setLoading] = useState(false)

    const views = ["default", "expanded"]
    const [view, setView] = useState(views[0])
    /*Get Projects from API*/
    useEffect(() => {
        const getProjects = async () => {
            setLoading(true)
            const response = await fetch(API_URL + PROJECTS + `?show=${1}`)
            return response.json()
        }

        getProjects().then((data) => {
            setProjects(data)
            setLoading(false)
        })
    }, [])

    /*Filter Projects*/
    const filteredProjects = projects.filter(project => {
        const searchable = [
            ...(project.keywords || []),
            ...(project.stack || [])
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

    // @ts-ignore
    return (

        <div className={"project-page"}>

            <div className={"filter-container " + ((selectedProject ? " justify-between": " justify-end"))}>

                {selectedProject && <h1 className={"text-2xl font-bold"}>{selectedProject.name}</h1>}
                <input type="text"
                       placeholder="Search Projects"
                       className={"filter-form"}
                       value={search}
                       onChange={(e) => setSearch(e.target.value)}
                />


            </div>

            <section className={view === "default" ? "" : "expanded-view"}>

                {/*becomes sidebar when project card is clicked*/}
                <div className={view === "default" ? "project-container" : "bg-amber-300 project-sidebar min-w-1/9 max-w-1/5"}>
                    {loading ?
                        (<LoadingIcon cls={"col-span-3"}/>)
                        :
                        (filteredProjects.length > 0 ?
                                filteredProjects.map((project: ProjectType) =>
                                    <div key={project._id}>
                                        {/*Default view*/}
                                        {view === "default" &&
                                            <>
                                                <ProjectCard
                                                    name={project.name}
                                                    short_desc={project.short_desc}
                                                    stack={project.stack}
                                                    links={project.links}
                                                    images={project.images}
                                                    onClick={() => {
                                                        if (devWidth < 768) {
                                                            navigate(`/projects/details/${project._id}`, {state: {project}})
                                                        } else {
                                                            setView("expanded")
                                                            setSelectedProject(project)
                                                        }
                                                    }}
                                                />

                                                {/* {selectedProject && selectedProject._id === project._id && (
                                                    <ProjectModal project={selectedProject}
                                                                  onOpenChange={(open: unknown) => {
                                                                      if (!open) setSelectedProject(null)
                                                                  }} open={!!selectedProject}/>
                                                )}*/}
                                            </>}

                                        {view === "expanded" &&
                                            <>
                                                <SideBarCard
                                                    name={project.name}
                                                    short_desc={project.short_desc}
                                                    stack={project.stack}
                                                    links={project.links}
                                                    images={project.images}
                                                    onClick={() => setSelectedProject(project)}
                                                />
                                            </>
                                        }

                                    </div>
                                )
                                :
                                <p style={{color: 'white'}}>Unfortunately don't think i have worked with such just yet,
                                    but
                                    I am always open to new challenges </p>

                        )}
                </div>

                {/*Becomes Middle section when project card is clicked*/}
                <aside className={"big-display overflow-y-scroll bg-blue-600 max-w-2/3 p-3"}>
                    {selectedProject && (
                        <BigDisplay project={selectedProject}/>
                    )}
                </aside>

                <aside className={"stack max-w-1/3 p-3 bg-teal-300"}>
                    {selectedProject && (<div className="col-span-3 h-full">
                        <ScrollArea className="h-full pl-2">
                            {selectedProject && (
                                <div className="space-y-6">

                                    {/*Stack*/}
                                    <section>
                                        <h2 className="text-sm font-semibold mb-2">Stack</h2>
                                        <div className="project-card__tech" aria-label="Tech stack">
                                            {selectedProject.stack?.map((t) => (
                                                <span key={t} className="project-card__techItem">
                                                    {t}
                                                </span>
                                            ))}
                                        </div>
                                    </section>

                                    {selectedProject.features && (
                                        <section>
                                            <h2 className="text-lg font-semibold mb-2">Features</h2>
                                            <ul className="list-disc list-inside text-sm text-neutral-300 space-y-1">
                                                {selectedProject.features.map((f, i) => (
                                                    <li key={i}>{f}</li>
                                                ))}
                                            </ul>
                                        </section>
                                    )}

                                    {selectedProject.lessons && (
                                        <section>
                                            <h2 className="text-lg font-semibold mb-2">Lessons</h2>
                                            <ul className="list-disc list-inside text-sm text-neutral-300 space-y-1">
                                                {selectedProject.lessons.map((l, i) => (
                                                    <li key={i}>{l}</li>
                                                ))}
                                            </ul>
                                        </section>
                                    )}

                                    {selectedProject.links && (
                                        <section>
                                            <h2 className="text-lg font-semibold mb-2">Links</h2>
                                            <div className="flex flex-col gap-2 text-sm">
                                                {Object.entries(selectedProject.links).map(([key, value]) => (
                                                    <a key={key} href={value} className="text-blue-400 hover:underline"
                                                       target="_blank">
                                                        {key}
                                                    </a>
                                                ))}
                                            </div>
                                        </section>
                                    )}
                                </div>
                            )}
                        </ScrollArea>
                    </div>)}
                </aside>
            </section>

        </div>
    )
}

export {Project}
