import {useState, useEffect} from 'react'
import {useForm} from 'react-hook-form'

import './Projects.scss'
import {API_URL, PROJECTS} from "../../../env.ts"
import ProjectCard from "../../ui/ProjectCard/ProjectCard.tsx";
import ProjectModal from "../../ui/ProjectCard/ProjectModal.tsx";
import type {ProjectType} from "../../model/ProjectType.ts";

function Project() {

    // @ts-ignore
    const [temp, settemp] = useState([])
    // @ts-ignore
    const [content, setContent] = useState(undefined)
    // @ts-ignore
    const [modalOpen, setModalOpen] = useState(false)
    // @ts-ignore
    const {register, handleSubmit} = useForm();
    const [projects, setProjects] = useState<ProjectType[]>([])
    const [selectedProject, setSelectedProject] = useState<ProjectType | null>(null)

    useEffect(() => {
        const getProjects = async () => {
            const response = await fetch(API_URL + PROJECTS)
            return response.json()
        }

        getProjects().then((data) => {
            setProjects(data)
        })
    }, [])

    const handleSearch = (e: any) => {
        const value = e.target.value.toLowerCase();

        if (value.length > 3) {
            const filtered = projects.filter(project => {
                const searchable = [
                    ...(project.keywords || []),
                    ...(project.stack || [])
                ];

                return searchable.some(item =>
                    item.toLowerCase().includes(value)
                );
            });
            console.log(filtered)
            setProjects(filtered)
            // setFilter(filtered)
        }

    }
    return (

        <div className={"project-page"}>
            <div className={"filter-container"}>
                    <input type="text"
                           placeholder="Search Projects"
                           className={"filter-form"}
                           {...register("search")}
                           value={content} onChange={handleSearch}
                    />


            </div>
            <div className={"project-container"}>
                {
                    projects.map((project: ProjectType) =>
                        <>
                            <ProjectCard key={project._id}
                                         name={project.name}
                                         short_desc={project.short_desc}
                                         stack={project.stack}
                                         links={project.links}
                                         images={project.images}
                                         onClick={()=> setSelectedProject(project)}
                            />

                            {/*TOdo: fix modal*/}
                            {selectedProject && (
                                <ProjectModal project = {selectedProject} onOpenChange={(open:unknown) => {
                                    if (!open) setSelectedProject(null)
                                }} open={!!selectedProject}/>
                            )}
                        </>
                    )}
            </div>
        </div>
    )
}

export {Project}
