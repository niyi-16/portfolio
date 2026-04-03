import {Icon, svgPath} from "../../../icons.tsx";
import {Terminal, Database, Cloud } from "lucide-react";
import type {Contact} from "../../model/Contact.ts";

const HeroSplit = () => {
  /*  const bio = {
        intro: "Hi, I'm Dasil, a passionate developer and builder with a knack for crafting elegant and efficient solutions. With a strong foundation in web development, I thrive on turning ideas into reality through code.",
        interests: "I'm always on the lookout for new challenges and opportunities to learn and grow. My interests include web development, software engineering, and problem-solving.",
        goals: "My goal is to create innovative and user-friendly solutions that make a positive impact on the world. I'm committed to continuous learning and staying at the forefront of technology trends."
    }*/

    const bio = {
        intro: "Hey, I'm Dasil, a soon-to-be graduate of the IT Programming program at NSCC, with earlier studies in Computer Science at Dalhousie. I enjoy building systems that are both practical and well structured, whether that means designing backend services, working across the full stack, or deploying applications to the cloud.",
        interests: "My main interests lie in backend engineering and data analytics, where I enjoy thinking about how systems interact, how data flows, and how software can be designed to scale and evolve over time.",
        goals: "Long term, I hope to grow into leadership roles such as project or engineering management once I've gained enough experience building and working on complex systems. Until then, I'm focused on learning, building meaningful tools, and collaborating with people who enjoy solving challenging problems.",
    };
    const socialLinks: Contact[] = [
        {
            id: 1,
            name: "LinkedIn",
            url: "https://www.linkedin.com/in/dasil-adam",
            logo: svgPath.linkedin
        },
        {
            id: 2,
            name: "Github",
            url: "https://github.com/niyi-16",
            logo: svgPath.github
        },
        {
            id: 3,
            name: "Email",
            url: "mailto:dasil.adam@gmail.com",
            logo: svgPath.email
        },

    ]

    const highlights = [
        { icon: Terminal, label: "Backend Engineering" },
        { icon: Database, label: "Data Analytics" },
        { icon: Cloud, label: "Cloud Deployment" },
    ]

    return (
        <section className="mx-auto max-w-5xl px-6 py-16">
            <div className="grid items-start gap-12 md:grid-cols-[1fr_1.4fr]">
                {/* Left: identity */}
                <div className="flex flex-col items-center md:items-start gap-6">
                    <div className="text-center md:text-left">
                        <h1 className="text-4xl font-bold tracking-tight">
                            Dasil<span className="text-primary">.</span>
                        </h1>
                        <p className="mt-1 text-sm font-medium text-primary">
                            Developer · Builder · Problem Solver
                        </p>
                        <p className={"mt-1 text-sm font-medium"}>Full-Stack Developer interested in systems, data, and thoughtful engineering.</p>
                    </div>
                    <div className="flex gap-3">
                        {socialLinks.map((s) => (
                            <a
                                key={s.id}
                                href={s.url}
                                className="flex items-center justify-center rounded-full border border-border p-2.5 text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                            >
                                {/*svg*/}
                                {<Icon icon={s.logo.icon} size={24} className={"text-primary"}/>}
                            </a>
                        ))}
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {highlights.map((h) => (
                            <span
                                key={h.label}
                                className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-xs text-muted-foreground"
                            >
                                {/*svg*/}
                                {<h.icon  size={12} className="text-primary"/>}
                                {h.label}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Right: bio */}
                <div className="space-y-4">
                    <p className="text-sm leading-relaxed text-foreground/90">{bio.intro}</p>
                    <p className="text-sm leading-relaxed text-muted-foreground">{bio.interests}</p>
                    <p className="text-sm leading-relaxed text-muted-foreground">{bio.goals}</p>
                </div>
            </div>
        </section>
    );
}

export default HeroSplit;