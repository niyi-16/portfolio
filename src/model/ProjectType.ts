export type ProjectType = {
    "_id": string,
    "architecture": {
        "frontend": string[],
        "backend": string[],
        "other": string[]
    },
    "challenges"?: {
        "brief": string,
        "problem": string,
        "solution": string
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
