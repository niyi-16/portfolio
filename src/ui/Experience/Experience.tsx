import './Experience.scss'
import {useEffect, useState} from "react";
import type {Education} from "../../model/Education.ts";
import type {Experience} from "../../model/Experience.ts";

function Experience() {

    const [education, setEducation] = useState<[]>([])
    const [experience, setExperience] = useState<[]>([])


    //Education
    useEffect(() => {
        const getEducationHistory = async () => {
            const educationHistory = await fetch("http://localhost:3000/sq/education")
            return await educationHistory.json()
        }
        getEducationHistory().then((data) => {
            setEducation(data)
        })
    }, [])

    //Experience
    useEffect(() => {
        const getExperience = async () => {
            const experience = await fetch("http://localhost:3000/sq/experience")
            return await experience.json()
        }
        getExperience().then((data) => {
            setExperience(data)
        })
    }, []);

    return (
        <div className={"flex-column h-100"}>
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

            {education.length > 1 && (
                <div id={"Education"} className={"mb-10"}>
                    {education.map((item: Education) => (
                            <MiniEducation key={item._id} education={item}/>
                        )
                    )}
                </div>
            )}

            {experience.length > 1 && (
                <div className={"Experience"}>
                    {experience.map((item: Experience) =>
                        <MiniExperience key={item._id} experience={item}/>
                    )}
                </div>
            )}
        </div>
    )
}

const MiniEducation = ({education: education}: Education) => {
    const startDate = () => {
        const date = new Date(education.start_date)
        return date.toLocaleDateString('en-CA', {year: 'numeric', month: 'long'})
    }
    const endDate = () => {
        const date = new Date(education.end_date)
        return date.toLocaleDateString('en-CA', {year: 'numeric', month: 'long'})
    }

    return (
        <div className={"w-4/5 rounded-lg shadow-blue-200 shadow-sm"}>
            <div className={"grid grid-cols-2 grid-rows-1"}>
                <p className={"col-start-1 font-bold"}>{education.program}</p>
                <p className={"col-start-2 text-red-500 text-end"}>{startDate()} - {endDate()}</p>
                <p className={"row-start-2 col-span-2"}>{education.institution}, {education.location.city}, {education.location.province}</p>
            </div>
        </div>
    )
}


const MiniExperience = ({experience: experience}: Experience) => {
    const startDate = () => {
        const date = new Date(experience.start_date)
        return date.toLocaleDateString('en-CA', {year: 'numeric', month: 'long'})
    }
    const endDate = () => {
        const date = new Date(experience.end_date)
        return date.toLocaleDateString('en-CA', {year: 'numeric', month: 'long'})
    }

    return (
        <div className={"w-4/5 rounded-lg shadow-blue-200 shadow-sm"}>
                <div className={"grid grid-cols-2 grid-rows-1"}>
                    <p className={"col-start-1 font-bold"}>{experience.title}</p>
                    <p className={"col-start-2 text-amber-900 text-end"}>{startDate()} - {endDate()}</p>
                    <p className={"row-start-2 col-span-2 "}>{experience.company}, {experience.location.province}</p>
                </div>
        </div>
    )
}
export default Experience