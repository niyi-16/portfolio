import {useState, useEffect} from 'react'
import {useForm} from 'react-hook-form'

import './Projects.scss'
import ProjectCard from "../../ui/ProjectCard/ProjectCard";

function Project() {

    const [content, setContent] = useState("")
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
                    projects.map((project: any) =>
                        <ProjectCard key={project._id} {...project}/>
                    )}

                {/*<p>On blood</p>*/}

            </div>
        </div>
    )
}

export default Project
