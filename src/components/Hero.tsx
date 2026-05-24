import {Icon, svgPath} from "../../icons.tsx";
import {Terminal, Database, Cloud } from "lucide-react";
import type {Contact} from "../types/Contact.ts";
import {isEmpty, isMobile, logEvent} from "../lib/utils.ts";

const HeroSplit = () => {
    const bio = {
        intro: "Recent NSCC Graduate with previous studies in Computer Science at Dalhousie University." +
            " I build scalable and maintainable software systems across the full stack, with experience developing backend services, APIs, databases, and cloud-deployed applications.",

        interests: "My primary focus is backend engineering. I enjoy designing efficient architectures, optimizing data flow, and building software that is reliable, extensible, and aligned with business and user needs.",

        goals: "I’m currently seeking opportunities where I can continue strengthening my software development skills, deliver impactful solutions, and grow into technical leadership roles over time.",
    };
    const self = "hero";
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
            url: "mailto:dasil.adam@outlook.com",
            logo: svgPath.email
        },
        // {
        //     id: 4,
        //     name: "Resume",
        //     url: "https://dasil-image-bucket.s3.us-east-2.amazonaws.com/docs/Dasil_Adam_Resume.pdf",
        //     logo: svgPath.document
        // }

    ]

    const highlights = [
        { icon: Terminal, label: "Backend Engineering" },
        { icon: Database, label: "Data Analytics" },
        { icon: Cloud, label: "Cloud Development" },
    ]

    return (
        <section className="mx-auto max-w-5xl px-6 pt-16">
            <div className="grid items-start gap-12 md:grid-rows-[1fr_1fr] justify-items-center">
                {/* Left: identity */}
                <div className="flex flex-col items-center gap-6 ">
                    <div className="justify-items-center">
                        <h1 className="text-7xl font-bold tracking-tight">
                            Dasil<span className="text-primary">.</span>
                        </h1>
                        <p className="mt-1 text-2xl font-medium text-primary">
                            {["Developer", "Builder", "Problem Solver"]
                                .filter(_ => isEmpty(_)).join(" · ")}
                        </p>
                        <p className={"mt-1 text-1xl font-medium"}>Junior Developer interested in system communication, data interpretation, and thoughtful engineering.</p>
                    </div>
                    <div className="flex gap-3 justify-center">
                        {socialLinks.map((s) => (
                            <a
                                key={s.id}
                                href={s.url}
                                target={"_blank"}
                                onClick={async () => {
                                    await logEvent("click", `clicked on ${s.name} hero link`, {event_parent: self, target: s.name});
                                    window.open(s.url, "_blank", "noopener,noreferrer");
                                }}
                                className="flex items-center justify-center rounded-full border border-border p-2.5 text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                            >
                                {/*svg*/}
                                {/*@ts-ignore*/}
                                {<Icon icon={s.logo.icon} size={30} className={"text-primary"}/>}
                            </a>
                        ))}
                    </div>

                    <div className="flex flex-wrap gap-2 justify-center">
                        {highlights.map((h) => (
                            <span
                                key={h.label}
                                className={"inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1" +
                                    "text-muted-foreground " + (!isMobile() ? "text-lg" : "text-[12pt]")}
                            >
                                {/*svg*/}
                                {<h.icon  size={!isMobile() ? 24 : 18} className="text-primary"/>}
                                {h.label}
                            </span>

                        ))}
                    </div>
                </div>

                {/* Right: bio */}
                <div className={!isMobile() ? "space-y-4 *:leading-tight" : "*:text-[12pt] *:mb-2"}>
                    <p className="hover:text-primary text-xl leading-relaxed text-foreground/90">{bio.intro}</p>
                    <p className="hover:text-primary text-xl leading-relaxed text-foreground/90">{bio.interests}</p>
                    <p className="hover:text-primary text-xl leading-relaxed text-foreground/90">{bio.goals}</p>
                </div>
            </div>
        </section>
    );
}

export default HeroSplit;