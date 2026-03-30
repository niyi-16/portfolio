import {useState, useEffect} from 'react'
import './Projects.scss'
import {API_URL, PROJECTS} from "../../../env.ts"
import ProjectCard from "../../ui/ProjectCard/ProjectCard.tsx";
import ProjectModal from "../../ui/ProjectCard/ProjectModal.tsx";
import type {ProjectType} from "../../model/ProjectType.ts";
import {useNavigate} from "react-router-dom"

function Project() {
    const navigate = useNavigate()
    const [devWidth, setDevWidth] = useState(window.innerWidth);
    const [search, setSearch] = useState("")
    const [projects, setProjects] = useState<ProjectType[]>([])
    const [selectedProject, setSelectedProject] = useState<ProjectType | null>(null)

    /*Get Projects from API*/
    useEffect(() => {
        const getProjects = async () => {
            const response = await fetch(API_URL + PROJECTS)
            return response.json()
        }

        getProjects().then((data) => {
            setProjects(data)
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

    return (

        <div className={"project-page"}>
            <div className={"filter-container"}>
                    <input type="text"
                           placeholder="Search Projects"
                           className={"filter-form"}
                           value={search}
                           onChange={(e) => setSearch(e.target.value)}
                    />


            </div>
            <div className={"project-container"}>
                {
                    filteredProjects.map((project: ProjectType) =>
                        <div key={project._id}>
                            <ProjectCard 
                                         name={project.name}
                                         short_desc={project.short_desc}
                                         stack={project.stack}
                                         links={project.links}
                                         images={project.images}
                                         onClick={()=> {
                                             if (devWidth < 768) {
                                                 navigate(`/projects/details/${project._id}`, { state: { project } })
                                             }
                                             else {
                                                 setSelectedProject(project)
                                             }
                                         }}
                            />

                            {/*TOdo: fix modal*/}
                            {selectedProject && selectedProject._id === project._id && (
                                <ProjectModal project = {selectedProject} onOpenChange={(open:unknown) => {
                                    if (!open) setSelectedProject(null)
                                }} open={!!selectedProject}/>
                            )}
                        </div>
                    )}
            </div>
        </div>
    )
}

export {Project}
