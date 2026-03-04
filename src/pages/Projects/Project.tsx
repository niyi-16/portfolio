import {useState, useEffect} from 'react'
import {useForm} from 'react-hook-form'

import './Projects.scss'
import ProjectCard from "../../ui/ProjectCard/ProjectCard.tsx";
import ProjectModal from "../../ui/ProjectCard/ProjectModal.tsx";
import type {Project} from "../../model/Project.ts";

function Project() {

    const [content, setContent] = useState("")
    const [modalOpen, setModalOpen] = useState(false)
    const {register, handleSubmit} = useForm();
    const [projects, setProjects] = useState([])

    useEffect(() => {
        const getProjects = async () => {
            const response = await fetch("http://localhost:3000/sq/projects")
            return response.json()
        }

        getProjects().then((data) => {
            setProjects(data)
        })
    }, [])

    const handleSearch = (e: any) => {
        // e.preventDefault()
        console.log(e)
    }
    return (

        <div className={"project-page"}>
            <div className={"filter-container"}>
                <form method="post" onSubmit={handleSubmit(handleSearch)} className={"filter-form"}>
                    <input type="text"
                           placeholder="Search Projects"
                           {...register("search")}
                           value={content} onChange={(e:any)=>setContent(e.target.value)}/>
                    <button type={"submit"}>Filter</button>
                </form>
            </div>
            <div className={"project-container"}>
                {
                    projects.map((project: Project) =>
                        <>
                            <ProjectCard key={project._id}
                                         name={project.name}
                                         short_desc={project.short_desc}
                                         stack={project.stack}
                                         links={project.links}
                                         images={project.images}
                                         onClick={()=> setModalOpen(true)}
                            />

                            {/*TOdo: fix modal*/}
                            <ProjectModal project = {project} onOpenChange={setModalOpen} open={modalOpen}/>
                        </>
                    )}

                {/*<p>On blood</p>*/}

            </div>
        </div>
    )
}

export default Project
