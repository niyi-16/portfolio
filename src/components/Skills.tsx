import {svg} from "../../icons.tsx";
import {isMobile} from "../lib/utils.ts";

function Skills() {

    const skills: Record<string, string[]> = {
        "Tools & Platforms": ["Git", "Linux", "Docker", "Azure", "AWS"],
        "Web-Frameworks": ["Angular", "React", ".NET", "SpringBoot"],
        "Programming Languages": ["Java","Kotlin", "Python","C#", "SQL", "PHP", "TypeScript"],
        // "Data Analytics": ["Linear Algebra", "R", "Data Calculus", "Microsoft Excel"],
        "Databases": ["MySQL", "MSSQL", "MongoDB", "PostgreSQL"],
    }

    return (
            <div className={"space-y-6"}>
                    {/*Skill Class*/}
                    {Object.entries(skills).map(([category, item]: [string, string[]]) =>
                        <div key={category}>
                            <h3 className={"text-sm font-semibold uppercase tracking-wider text-primary mb-3"}>{category}</h3>
                            <div className={"flex flex-wrap gap-2"}>
                                {/*Skill items*/}

                                {item.map((skill: string) =>
                                    <span key={skill}
                                        className={"rounded-xl border border-border bg-secondary px-4 py-2 text-sm" +
                                        " text-foreground transition-colors hover:bg-primary hover:text-primary-foreground"}>
                                        {skill}
                                    </span>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

function Skills2() {

    const skills: Record<string, string[]> = {
        "Tools & Platforms": ["Git", "Linux", "Docker", "Azure", "AWS"],
        "Web-Frameworks": ["Angular", "React", ".NET", "SpringBoot"],
        "Programming Languages": ["Java", "Kotlin", "Python", "C#", "PHP", "TypeScript"],
        // "Data Analytics": ["Linear Algebra", "R", "Data Calculus", "Microsoft Excel"],
        "Databases": ["MySQL", "MSSQL", "MongoDB", "PostgreSQL"],
        "ignore": ["Arch", "Ubuntu"]
    }


    const allSkills = Object.entries(skills)
        .flatMap(([_, items]: [string, string[]]) => items);

    return (
        <div className="relative overflow-hidden w-full">
            <div className="flex w-max animate-scroll gap-3 hover:animate-none">

                {/* First Set */}
                {allSkills.filter(skill => skill.toLowerCase() !== "linux")
                    .map((skill: string, i: number) => (
                    <div key={`${skill}-first-${i}`}
                         className=" whitespace-nowrap px-4 py-2 text-md flex flex-col items-center
                         gap-2 text-foreground transition-colors hover:bg-secondary/50">
                        <span>
                            {svg({icon: skill.toLowerCase(), size: isMobile() ? 50 : 100, color: ""})}
                        </span>
                        <span>{skill}</span>
                    </div>

                ))}

                {/* Duplicate Set */}
                {allSkills.filter(skill => skill.toLowerCase() !== "linux")
                    .map((skill: string, i: number) => (
                    <div key={`${skill}-first-${i}`}
                         className=" whitespace-nowrap px-4 py-2 text-md flex flex-col items-center
                         gap-2 text-foreground transition-colors hover:bg-secondary/50">
                        <span>
                            {svg({icon: skill.toLowerCase(), size: isMobile() ? 50 : 100, color: ""})}
                        </span>
                        <span>{skill}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export {Skills, Skills2}