import Skills from '../../ui/Skills/Skills.tsx'
import Experience from '../../ui/Experience/Experience.tsx'
import ProjectCard from "../../ui/ProjectCard/ProjectCard.tsx"
import ProjectModal from "../../ui/ProjectCard/ProjectModal.tsx";
import { useState } from "react";



const sampleProject = {
  name: "Wiz Light Changer",
  short_desc: "Small web interface to change lights according to the music",
  stack: ["Java", "Javascript", "Python"],
  links: {
    github: "https://www.example.com",
    website: "https://www.example.com",
    demo: "https://www.example.com",
  },
  images: {
    default: "https://picsum.photos/id/239/536/354",
  },
  architecture: {
    frontend: ["React", "Tailwind"],
    backend: ["Node.js", "Express"],
    other: ["Docker"],
  },
  features: ["Real-time color sync", "Beat detection", "Custom presets"],
  challenges: {
    "challenges.brief": "Syncing light changes with audio in real-time.",
    "challenges.problem": "Latency between beat detection and API calls to Wiz bulbs.",
    "challenges.solution": "Implemented a predictive buffer that pre-schedules color changes.",
  },
  keywords: ["IoT", "music", "smart-home"],
  lessons: ["WebSocket is faster than REST for real-time control", "Color theory matters for mood lighting"],
};

function App() {
      const [modalOpen, setModalOpen] = useState(false);

    return (
        <div className="min-h-screen bg-background text-foreground">
            {/* Quote */}
            <div className="mx-auto max-w-4xl px-6 pt-12">
                <blockquote
                    className="mx-auto w-fit border-l-2 border-primary pl-4 text-sm italic text-muted-foreground">
                    &ldquo;lorem ipsum dolor sit amet, consectetur adipiscing elit.&rdquo;
                </blockquote>
            </div>

            {/* About Me */}
            <section className="mx-auto max-w-2xl px-6 py-10 text-center">
                <h1 className="mb-4 text-3xl font-bold tracking-tight">About me</h1>
                <p className="text-sm leading-relaxed text-muted-foreground text-justify">
                    Meet Dasil, the future software programmer and data analyst extraordinaire! With a passion
                    for all things tech-related, Dasil dreams of developing cutting-edge software that will
                    change the world. Whether it's crunching data to uncover insights or building programs from
                    scratch, Dasil is always up for a challenge. In fact, their idea of a fun Friday night is
                    staying up late, tinkering with code and experimenting with new tools. But don't let all the
                    tech talk fool you – Dasil has a wicked sense of humor and loves nothing more than cracking
                    jokes and making their friends laugh. So watch out, world – Dasil is coming for you, armed
                    with a keyboard and a whole lot of brainpower!
                </p>
            </section>

            {/* Two-column grid */}
            <div className="mx-auto max-w-5xl px-6 pb-16 grid gap-12 md:grid-cols-2">
                <aside>
                    <h2 className="mb-4 text-xl font-semibold underline underline-offset-4 decoration-primary">
                        Education &amp; Work
                    </h2>
                    <Experience/>
                </aside>

                <aside>
                    <h2 className="mb-4 text-xl font-semibold underline underline-offset-4 decoration-primary">
                        Skills
                    </h2>
                    <Skills/>
                </aside>
            </div>

            {/* Projects */}
            <section className="mx-auto max-w-5xl px-6 pb-20">
                <h2 className="mb-6 text-xl font-semibold underline underline-offset-4 decoration-primary">
                    Recent projects
                </h2>
                <div className="flex flex-wrap gap-6">
                    <ProjectCard
                        name={sampleProject.name}
                        short_desc={sampleProject.short_desc}
                        stack={sampleProject.stack}
                        links={sampleProject.links}
                        images={sampleProject.images}
                        onClick={() => setModalOpen(true)}
                    />
                </div>
            </section>

            <ProjectModal open={modalOpen} onOpenChange={setModalOpen} project={sampleProject}/>

        </div>
    )
}

export default App
