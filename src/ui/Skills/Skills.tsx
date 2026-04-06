function Skills() {

    const skills: Record<string, string[]> = {
        "Tools & Platforms": ["Git", "Linux", "Docker", "Azure", "AWS"],
        "Web-Frameworks": ["Angular", "React", ".NET", "SpringBoot"],
        "Programming Languages": ["Java","Kotlin", "Python","C#", "SQL", "PHP", "TypeScript"],
        // "Data Analytics": ["Linear Algebra", "R", "Data Calculus", "Microsoft Excel"],
        "Databases": ["MySQL", "MSSQL", "MongoDB", "PostgresSQL"],
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

export default Skills