import './Experience.scss'
import {useEffect, useState} from "react";

function Experience() {

    const [experience, setExperience] = useState<[]>([])


    useEffect(() => {

        const getEducationHistory = async () => {

            const educationHistory = await fetch("http://localhost:3000/sq/education")

            const data = await educationHistory

            if (data.ok) {
                setExperience(await data.json())
            }
        }
        getEducationHistory()
    }, [])


    return (

        <>
            {/*Exprience is empty*/}
            {experience.length === 0 &&
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

            {
                experience.length > 1 && (
                    <>
                        {console.log(experience)}
                        {experience.map((item) =>

                            <div key={item}>
                                <p className="grid-details">{item["school"]}</p>
                                <p>{item}</p>
                            </div>


                        )}
                    </>
                )
            }
        </>
    )
}

export default Experience