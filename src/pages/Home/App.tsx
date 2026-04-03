import Skills from '../../ui/Skills/Skills.tsx'
import Experience from '../../ui/Experience/Experience.tsx'
import ProjectCard from "../../ui/ProjectCard/ProjectCard.tsx"
import ProjectModal from "../../ui/ProjectCard/ProjectModal.tsx";
import {useState, useEffect} from "react";
import {API_URL, PROJECTS} from "../../../env.ts";
import type {ProjectType} from "../../model/ProjectType.ts";
import HeroSplit from "../../ui/loveable/Hero.tsx";


function App() {
    const [modalOpen, setModalOpen] = useState({state: false, project: {}});
    const [recentProject, setRecentProject] = useState<ProjectType[]>([]);

    useEffect(() => {
        const getProjects = async () => {
            // setLoading(true)
            const response = await fetch(API_URL + PROJECTS + `?recents=${1}`)
            return response.json()
        }

        getProjects().then((data) => {
            setRecentProject(data)
            // setLoading(false)
        })
    }, [])

    // @ts-ignore
    return (
        <div className="min-h-screen bg-background text-foreground">
            {/* About Me */}
            <HeroSplit />

            {/* Two-column grid */}
            <div className="mx-auto max-w-5xl px-6 pb-16 grid gap-12 md:grid-cols-2">
                <aside>
                    <h2 className="mb-4 text-xl font-semibold underline underline-offset-4 decoration-primary">
                        {/*Education &amp; Work*/}
                    </h2>
                    <Experience/>
                </aside>

                <aside>
                    <h2 className="mb-4 text-xl font-semibold underline underline-offset-4 decoration-primary">
                        {/*Skills*/}
                    </h2>
                    <Skills/>
                </aside>
            </div>

            {/* Projects */}
            {recentProject && recentProject.length > 0 && (
                <>
                    <section className="mx-auto max-w-5xl px-6 pb-20">
                        <h2 className="mb-6 text-xl font-semibold underline underline-offset-4 decoration-primary">
                            My Recent Works...
                        </h2>
                        <div className="flex gap-6 overflow-x-scroll">
                            {recentProject.map(sampleProject => (
                                <ProjectCard
                                    key={sampleProject._id}
                                    name={sampleProject.name}
                                    short_desc={sampleProject.short_desc}
                                    stack={sampleProject.stack}
                                    links={sampleProject.links}
                                    images={sampleProject.images}
                                    onClick={() => setModalOpen({state: true, project: sampleProject})}
                                />
                            ))}
                        </div>
                    </section>
                    <ProjectModal open={modalOpen.state} onOpenChange={setModalOpen} project={modalOpen.project}/>
                </>
            )}
        </div>
    )
}

export default App
