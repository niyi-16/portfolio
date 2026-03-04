export type Project = {
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
        "default"?: string
    },
    "keywords"?: string[],
    "lessons"?: string[],
    "links"?: Record<string, string>
    "name": string,
    "overview"?: {},
    "short_desc": string,
    "stack": string[]
}
