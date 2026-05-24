import {useEffect, useState} from "react";
import type {Education} from "../types/Education.ts";
import type {ExperienceType} from "../types/ExperienceType.ts";
import {Badge} from "./Badge.tsx";
import {GraduationCap, Briefcase, MapPin, Calendar, ChevronDown} from "lucide-react";
import {API_URL, EDUCATION, EXPERIENCE} from "../../env.ts";
import {Expandable} from "./Dom.tsx";
import {logEvent} from "../lib/utils.ts";

function Experience() {

    const [education, setEducation] = useState<[]>([])
    const [experience, setExperience] = useState<[]>([])


    //Education
    useEffect(() => {
        const getEducationHistory = async () => {
            const educationHistory = await fetch(API_URL + EDUCATION)
            return await educationHistory.json()
        }
        getEducationHistory().then((data) => {
            setEducation(data)
        })
    }, [])

    //ExperienceType
    useEffect(() => {
        const getExperience = async () => {
            const experience = await fetch(API_URL + EXPERIENCE)
            return await experience.json()
        }
        getExperience().then((data) => {
            setExperience(data)
        })
    }, []);

    return (
        <div className={"space-y-6"}>

            {/* Education */}

            {education.length > 1 && (
                <div className="space-y-2">
                    <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                        Education
                    </h3>
                    <div className="space-y-2">
                        {education.map((item: Education) => (
                            <MiniEducation key={item._id} education={item}/>
                        ))}
                    </div>
                </div>
            )}

            {/* ExperienceType */}
            {experience.length > 0 && (
                <div className="space-y-2">
                    <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                        Experience
                    </h3>
                    <div className="space-y-2">
                        {experience.map((item: ExperienceType) => (
                            <MiniExperience key={item._id} experience={item}/>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

function Experience2() {

    const [education, setEducation] = useState<[]>([])
    const [experience, setExperience] = useState<[]>([])


    //Education
    useEffect(() => {
        const getEducationHistory = async () => {
            const educationHistory = await fetch(API_URL + EDUCATION)
            return await educationHistory.json()
        }
        getEducationHistory().then((data) => {
            setEducation(data)
        })
    }, [])

    //ExperienceType
    useEffect(() => {
        const getExperience = async () => {
            const experience = await fetch(API_URL + EXPERIENCE)
            return await experience.json()
        }
        getExperience().then((data) => {
            setExperience(data)
        })
    }, []);

    const groupByYear = (items: (Education | ExperienceType)[]) => {
        const groups: { [key: string]: (Education | ExperienceType)[] } = {};
        items.forEach(item => {
            const date = item.end_date ? new Date(item.end_date) : new Date();
            const year = date.getFullYear();
            if (!groups[year]) groups[year] = [];
            groups[year].push(item);
        });
        return Object.entries(groups).sort((a, b) => parseInt(b[0]) - parseInt(a[0]));
    };

    const groupedEducation = groupByYear(education);
    const groupedExperience = groupByYear(experience);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative">
            {/* Timeline center line for desktop */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2 z-0" />

            {/* Education */}
            <div className="space-y-8 relative z-10">
                <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground border-b border-border pb-2 bg-background">
                    Education
                </h3>
                <div className="space-y-8">
                    {groupedEducation.map(([year, items]) => (
                        <div key={year} className="space-y-4">
                            <div className="flex items-center gap-2">
                                <div className="h-px flex-1 bg-border/50" />
                                <span className="text-[20px] font-bold text-muted-foreground/60 uppercase tracking-tighter bg-muted/30 px-2 py-0.5 rounded">
                                    {year}
                                </span>
                                <div className="h-px flex-1 bg-border/50" />
                            </div>
                            <div className="space-y-4">
                                {items.map((item) => (
                                    <MiniEducation key={item._id} education={item as Education}/>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Experience */}
            <div className="space-y-8 relative z-10">
                <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground border-b border-border pb-2 bg-background">
                    Experience
                </h3>
                <div className="space-y-8">
                    {groupedExperience.map(([year, items]) => (
                        <div key={year} className="space-y-4">
                            <div className="flex items-center gap-2">
                                <div className="h-px flex-1 bg-border/50" />
                                <span className="text-[20px] font-bold text-muted-foreground/60 uppercase tracking-tighter bg-muted/30 px-2 py-0.5 rounded">
                                    {year}
                                </span>
                                <div className="h-px flex-1 bg-border/50" />
                            </div>
                            <div className="space-y-4">
                                {items.map((item) => (
                                    <MiniExperience key={item._id} experience={item as ExperienceType}/>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}


function formatDate(dateStr: string | null): string {
    if (!dateStr) return "Present";
    const date = new Date(dateStr);
    date.setDate(date.getDate() + 1)
    return date.toLocaleDateString("en-CA", {year: "numeric", month: "short"});
}

function statusColor(status: string) {
    switch (status) {
        case "In Progress":
            return "bg-primary/20 text-primary border-primary/30";
        case "Halted":
            return "bg-muted text-muted-foreground border-border";
        case "Completed":
            return "bg-accent/20 text-accent-foreground border-accent/30";
        default:
            return "bg-muted text-muted-foreground border-border";
    }
}

const MiniEducation = ({education}: { education: Education }) => {
    const __self = "education";

    return (
        <div className="group flex items-center gap-3 rounded-2xl border border-border bg-card px-4 py-2.5
        transition-all hover:border-primary/40 hover:shadow-md hover:shadow-primary/5"
        onClick={async () => {
            await logEvent("click", `Tried to click ${education.institution}`, {event_parent: __self, target: education.institution})

        }}
        >
            <GraduationCap className="h-4 w-4 shrink-0 text-primary"/>
            <div className="flex flex-col flex-1 items-start overflow-hidden">
                <span className="truncate text-sm font-medium text-foreground">
                  {education.program}
                </span>
                <span className="hidden text-xs text-muted-foreground sm:inline">
                    {education.institution}
                </span>
            </div>
            <div className="flex shrink-0 items-center gap-2">
                <Badge
                    variant="outline"
                    className={`text-[14px] ${statusColor(education.status)}`}
                    content={education.status}
                    style={education.status === "null" ? {opacity: 0} : undefined}
                />
                <span className="hidden text-[14px] text-muted-foreground lg:inline">
          {formatDate(education.start_date)} – {formatDate(education.end_date)}
        </span>
            </div>
        </div>
    )
}

function MiniExperience({experience}: { experience: ExperienceType }) {
    const [open, setOpen] = useState(false);
    const __self = "experience";

    return (
        <div className={`cursor-pointer rounded-2xl border border-border bg-card transition-all hover:border-primary/40 
                        hover:shadow-md hover:shadow-primary/5`}
             onClick={async () => {
                 setOpen(!open)
                 await logEvent("click", `${open ? "Closed" : "Opened"} ${experience.title}`, {event_parent: __self, target: experience.title})
             }}>
            {/* Pill header */}
            <div className="flex items-center gap-3 px-4 py-2.5">
                <Briefcase className="h-4 w-4 shrink-0 text-primary"/>
                <div className="flex flex-col flex-1 items-start overflow-hidden">
                    <span className="truncate text-sm font-medium text-foreground">
                        {experience.title}
                    </span>
                    <span className="hidden text-xs text-muted-foreground sm:inline">
                        {experience.company}
                    </span>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                    {experience.current && (
                        <Badge variant="outline"
                               className="bg-primary/20 text-primary border-primary/30 text-[14px]"
                               content="Current"
                        />)}
                    <span className="hidden text-[14px] text-muted-foreground lg:inline">
                        {formatDate(experience.start_date)} – {formatDate(experience.end_date)}
                    </span>
                    <ChevronDown
                        className={`h-3.5 w-3.5 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`}
                    />
                </div>
            </div>

            {/* Expanded detail */}
            {
                <Expandable open={open}>

                    <div className="border-t border-border px-5 pb-4 pt-3 space-y-3">
                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3"/>
                            {experience.location.province}, {experience.location.country}
                        </span>
                            <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3"/>
                                {formatDate(experience.start_date)} – {formatDate(experience.end_date)}
                        </span>
                            <span className="capitalize">{experience.employment_type}</span>
                        </div>

                        {experience.summary && (
                            <p className=" leading-relaxed text-primary">
                                {experience.summary}
                            </p>
                        )}

                        {experience.responsibilities.length > 0 && (
                            <ul className="list-disc space-y-1 pl-4  text-muted-foreground">
                                {experience.responsibilities.map((r, i) => (
                                    <li key={i}>{r}</li>
                                ))}
                            </ul>
                        )}

                        {experience.skills.length > 0 && (
                            <div className="flex flex-wrap gap-1.5">
                                {experience.skills.map((skill) => (
                                    <Badge key={skill} variant="secondary" className="text-[10px]">
                                        {skill}
                                    </Badge>
                                ))}
                            </div>
                        )}
                    </div>
                </Expandable>
            }
        </div>
    );
}

export {Experience, Experience2}