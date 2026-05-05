export type ProjectType = {
    "_id": string,
    "architecture": {
        "frontend": string[],
        "backend": string[],
        "other": string[]
    },
    "challenges"?: {

        statement: string,
        items: {
            "brief": string,
            "problem": string,
            "solution": string
        }[]
    },
    "features"?: string[],
    "images"?: {
        "default"?: string,
        "showcase"?: string[]
    },
    "keywords"?: string[],
    "lessons"?: string[],
    "links"?: Record<string, string>
    "name": string,
    "overview"?: Record<string, string>
    "short_desc": string,
    "stack": string[]
}

export type ProjectMini = Pick<ProjectType,
     "name" | "images" | "keywords" | "links" | "stack" | "short_desc">

export type ProjectTypeExtended = ProjectType & {
    timeline: {
        date: string,
        title: string,
        description: string,
        type: "feature" | "fix" | "refactor" | "idea" | "milestone"
    }[],

    roadmap: {
        title: string,
        description: string,
        status: "planned" | "in-progress" | "completed"
    }[],

    process: {
        planning?: {p: string, img: string}[],
        design?: {p: string, img: string}[],
        implementation?: string,
        iteration?: string
    },

    decisions: {
        title: string,
        context: string,
        decision: string,
        tradeoffs?: string
    }[],

    artifacts: {
        type: "design" | "diagram" | "doc" | "screenshot",
        title: string,
        url: string,
        description?: string
    }[],

    metrics?: {
        label: string,
        value: string | number
    }[],

    status?: "active" | "archived" | "in-progress"

}