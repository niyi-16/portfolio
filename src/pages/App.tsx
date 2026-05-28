import {Skills2} from '../components/Skills.tsx'
import {Experience2} from '../components/Experience.tsx'
import ProjectCard from "../components/ProjectCard/ProjectCard.tsx"
import ProjectModal from "../components/ProjectCard/ProjectModal.tsx";
import {useState, useEffect} from "react";
import {API_URL, PROJECTS} from "../../env.ts";
import type {ProjectType} from "../types/ProjectType.ts";
import HeroSplit from "../components/Hero.tsx";
import {Link} from "react-router-dom";

import {
    checkForSession,
    checkForVisitorId,
    endSession,
    generateSessionandVisitorId, isMobile,
    startSession
} from "../lib/utils.ts";
import {useLoad} from "../context/LoadingContext.tsx";


function App() {
    const [modalOpen, setModalOpen] = useState({state: false, project: {}});
    const [recentProject, setRecentProject] = useState<ProjectType[]>([]);
    const {setLoading} = useLoad();

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
            generateSessionandVisitorId();
        }

        else if (typeof checkForVisitorId() === "string" && checkForSession() === null) {
            startSession();
        }

        const getProjects = async () => {
            try {
                const response = await fetch(API_URL + PROJECTS + `?recents=${1}`)
                const data = await response.json()
                setRecentProject(data)
            } catch (error) {
                console.error("Failed to fetch projects:", error)
            } finally {
                setLoading(false)
            }
        }

        getProjects()

        return () => {
            window.removeEventListener("beforeunload", handleUnload);
            window.removeEventListener("visibilitychange", handleVisibilityChange);
        }
    }, [setLoading])

    // @ts-ignore
    return (
        <div className="min-h-screen bg-background text-foreground">
            {/* About Me */}
            <HeroSplit/>

            <div className={"mx-auto max-w-5xl px-6" + (isMobile() ? " pb-8" : " pb-16")}>
                <section>
                    <h2 className={"mb-4 font-semibold underline underline-offset-4 decoration-primary "
                    + (isMobile() ? "text-[1.2rem]" : "text-xl")}>
                       Tools & Platforms I am familiar with
                    </h2>
                    <Skills2/>
                </section>
            </div>

            {/* Experience & Education */}
            <div className="mx-auto max-w-5xl px-6 pb-16">
                <h2 className="mb-4 text-xl font-semibold underline underline-offset-4 decoration-primary">
                    My Experience & Education
                </h2>
                <Experience2/>
            </div>

            {/* Projects */}
            {recentProject && recentProject.length > 0 && (
                <>
                    <section className="mx-auto max-w-6xl px-8 pb-20">
                        <div className={"flex justify-between items-center mb-1 p-1"}>
                            <h2 className="text-xl font-semibold underline underline-offset-4 decoration-primary"> Recent
                                Projects</h2>
                            <Link to="/projects" className={"text-primary hover:text-primary/80"}>
                                <h2 className={"text-xl font-semibold underline underline-offset-4 decoration-primary"}> See
                                    more</h2>
                            </Link>
                        </div>
                        <div className="p-4 flex gap-6 overflow-x-scroll" style={{scrollbarWidth: "thin", scrollbarColor: "#888 rgba(0, 0, 0, 0.1)"}}>
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
