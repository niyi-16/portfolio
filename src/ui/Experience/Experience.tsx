import {useEffect, useState} from "react";
import type {Education} from "../../model/Education.ts";
import type {ExperienceType} from "../../model/ExperienceType.ts";
import {Badge} from "../loveable/badge.tsx";
import {GraduationCap, Briefcase, MapPin, Calendar, ChevronDown} from "lucide-react";
import {API_URL, EDUCATION, EXPERIENCE} from "../../../env.ts";

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
            {/*Exprience is empty*/}
            {education.length === 0 &&
                <>
                    <p className="grid-details">For the most part i grew up in Nigeria which is where I had my primary
                        and
                        Secondary education.
                        I attended <a href="https://jcbestschoolsinternational.com/" target="_blank">JC-Best
                            International</a> for my
                        highschool with a concetration in commerce & accounting and gradated as one of the top 10
                        students from
                        my class of 2019.
                    </p>
                    <p className="grid-details">I was scheduled to come to canada to further knowledge at Dalhousie for
                        Economics, but then covid hit
                        and was forced to take a gap years which i used to reevaluate my career
                        choices.&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                        After lots of career counceling and personal choices I deceided to lean towards computer
                        science.
                    </p>
                    <p className="grid-details">After a lot of self study and research i built up my skills by learning
                        various
                        syntaxes, algorithms
                        , and languages. Then in 2024, I deceided to further my education at <a
                            href="https://www.nscc.ca/default.aspx">NSCC</a> where
                        I now Study <a
                            href="https://www.nscc.ca/programs-and-courses/programs/plandescr.aspx?prg=ITPR&pln=ITPROGRAM">IT
                            Programming.</a>
                    </p>
                </>
            }

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

    return (
        <div
            className="group flex items-center gap-3 rounded-2xl border border-border bg-card px-4 py-2.5 transition-all hover:border-primary/40 hover:shadow-md hover:shadow-primary/5">
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
                    className={`text-[10px] ${statusColor(education.status)}`}
                    content={education.status}
                />
                <span className="hidden text-[11px] text-muted-foreground lg:inline">
          {formatDate(education.start_date)} – {formatDate(education.end_date)}
        </span>
            </div>
        </div>
    )
}

function MiniExperience({experience}: { experience: ExperienceType }) {
    const [open, setOpen] = useState(false);

    return (
        <div className={`cursor-pointer rounded-2xl border border-border bg-card transition-all hover:border-primary/40 
                        hover:shadow-md hover:shadow-primary/5`}
             onClick={() => setOpen(!open)}>
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
                               className="bg-primary/20 text-primary border-primary/30 text-[10px]"
                               content="Current"
                        />)}
                    <span className="hidden text-[11px] text-muted-foreground lg:inline">
                        {formatDate(experience.start_date)} – {formatDate(experience.end_date)}
                    </span>
                    <ChevronDown
                        className={`h-3.5 w-3.5 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`}
                    />
                </div>
            </div>

            {/* Expanded detail */}
            {open && (
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
                        <p className="text-sm leading-relaxed text-muted-foreground">
                            {experience.summary}
                        </p>
                    )}

                    {experience.responsibilities.length > 0 && (
                        <ul className="list-disc space-y-1 pl-4 text-sm text-muted-foreground">
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
            )}
        </div>
    );
}

export default Experience