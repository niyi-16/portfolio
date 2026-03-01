import './ProjectCard.scss'
import { Link} from "react-router-dom"
import {icons} from "../../assets/png/icons"

type ProjectCardProps = {
    name: string
    short_desc: string
    stack: string[]
    links?: { [key: string]: string }
    images: { [key: string]: string }
}

function ProjectCard({images, stack, links, name, short_desc}: ProjectCardProps) {
    const cover = images?.default
    const link_list = Object.keys(links)

    return (
        <article className="project-card">
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

                <Link className="project-card__link" href={"/details"} target="_blank" rel="noreferrer">
                    View project
                </Link>

                <div className={"project-card__footer"} >
                    {link_list.map((link) => (
                        <a className={"project-card__icon-link"}>
                            <img src={icons[link]} alt={`${link} icon`} width={24} height={24}/>
                        </a>
                    ))}
                </div>

            </div>
        </article>
    )
}

export default ProjectCard