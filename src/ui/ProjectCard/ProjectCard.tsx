import './ProjectCard.scss'
// import { Link} from "react-router-dom"
import {icons} from "../../../icons.ts"

type ProjectCardProps = {
    name: string
    short_desc: string
    stack: string[]
    links?: Record<string, string>,
    images?:Record<string, string>,
    onClick: () => void
}

function ProjectCard({images, stack, links, name, short_desc, onClick}: ProjectCardProps) {
    const cover = images?.default
    const link_list = Object.keys(links as Record<string, string>)

    return (
        // @ts-ignore
        <article className="project-card" onClick={onClick} style={{ cursor: onClick ? "pointer" : undefined }}>
            <div className="project-card__media">
                {cover ? (
                    <img className="project-card__image" src={cover} alt={`${name} cover`} loading="lazy"/>
                ) : (
                    <div className="project-card__placeholder" aria-hidden="true"/>
                )}
            </div>

            <div className="project-card__body">

                <h3 className="project-card__title">{name}</h3>

                <div className="project-card__tech" aria-label="Tech stack">
                    {stack?.map((t) => (
                        <span key={t} className="project-card__techItem">
                            {t}
                        </span>
                    ))}
                </div>

                <p className="project-card__description">{short_desc}</p>

                <a className="project-card__link" href={"/details"} target="_blank" rel="noreferrer">
                    View project
                </a>

                <div className={"project-card__footer"} >
                    {link_list.map((link:string, index) => (
                        // @ts-ignore
                        <a className={"project-card__icon-link"} key={index} href={link_list[link]} target="_blank">
                            <img src={icons[link]} alt={`${link} icon`} width={24} height={24}/>
                        </a>
                    ))}
                </div>

            </div>
        </article>
    )
}

export default ProjectCard