import './Skills.scss';

function Skills() {

    const skills: Record<string, string[]> = {
        "Programming": ["HTML", "CSS", "JavaScript", "Java", "Python", "C#", "SQL"],
        "Data Analytics": ["Linear Algebra", "R", "Data Calculus", "Microsoft Excel"],
        "Others": ["Windows Management", "Git", "Linux"],
    }

    const keysforskills = Object.keys(skills)


    return (
        <>
            <div className={"skill-grid"}>

                    {/*Skill Class*/}
                    {keysforskills.map(key =>
                        <>
                            <h3>{key}</h3>
                            <div className={"skill-class"}>
                                {/*Skill items*/}

                                {(skills[key]).map((skill: string) =>
                                    <div><p>{skill}</p></div>
                                )}
                            </div>
                        </>
                    )}


            </div>
        </>
    )

}

export default Skills