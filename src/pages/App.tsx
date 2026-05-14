import Skills from '../components/Skills.tsx'
import Experience from '../components/Experience.tsx'
import ProjectCard from "../components/ProjectCard/ProjectCard.tsx"
import ProjectModal from "../components/ProjectCard/ProjectModal.tsx";
import {useState, useEffect} from "react";
import {API_URL, PROJECTS} from "../../env.ts";
import type {ProjectType} from "../types/ProjectType.ts";
import HeroSplit from "../components/Hero.tsx";
import {Link} from "react-router-dom";

import {
    captureRef,
    checkForSession,
    checkForVisitorId,
    endSession,
    generateSessionandVisitorId,
    startSession
} from "../lib/utils.ts";


function App() {
    const [modalOpen, setModalOpen] = useState({state: false, project: {}});
    const [recentProject, setRecentProject] = useState<ProjectType[]>([]);

    useEffect(() => {
        const handleUnload = () => {
            endSession();
        };

        const handleVisibilityChange = () => {
            if (document.visibilityState === "hidden") {
                endSession();
            }
        };

        window.addEventListener("beforeunload", handleUnload);
        window.addEventListener("visibilitychange", handleVisibilityChange);

        if (checkForVisitorId() === undefined && checkForSession() === null){
            generateSessionandVisitorId().then(r => console.log(r));
        }

        else if (typeof checkForVisitorId() === "string" && checkForSession() === null) {
            startSession();
        }

        const getProjects = async () => {
            // setLoading(true)
            const response = await fetch(API_URL + PROJECTS + `?recents=${1}`)
            return response.json()
        }

        getProjects().then((data) => {
            setRecentProject(data)
            // setLoading(false)
        })

        return () => {
            window.removeEventListener("beforeunload", handleUnload);
            window.removeEventListener("visibilitychange", handleVisibilityChange);
        }
    }, [])

    // @ts-ignore
    return (
        <div className="min-h-screen bg-background text-foreground">
            {/* About Me */}
            <HeroSplit/>

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
                        <div className={"flex justify-between items-center mb-12"}>
                            <h2 className="mb-6 text-xl font-semibold underline underline-offset-4 decoration-primary"> Recent
                                Projects</h2>
                            <Link to="/projects" className={"text-primary hover:text-primary/80"}>
                                <h2 className={"mb-6 text-xl font-semibold underline underline-offset-4 decoration-primary"}> See
                                    more</h2>
                            </Link>
                        </div>
                        <div className="flex gap-6 overflow-x-scroll">
                            {recentProject.map(sampleProject => (
                                <ProjectCard
                                    project={sampleProject}
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
