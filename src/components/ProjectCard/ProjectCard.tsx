import './ProjectCard.scss'
import {svg, icons} from "../../../icons.tsx"
import { type ProjectMini } from "../../types/ProjectType.ts";



function ProjectCard({project, onClick, onHover}: { project: ProjectMini, onClick: () => void, onHover?: () => void}) {
    const {name, short_desc, stack, links, images} = project;
    const cover = images?.default
    const linksSafe = links || {};
    const link_list = Object.keys(linksSafe);

    return (
        //@ts-ignore
        <article className="project-card" onClick={onClick} style={{ cursor: onClick ? "pointer" : undefined }}
                 onMouseEnter={onHover}
        >
            <div className="project-card__media">
                {cover ? (
        //@ts-ignore
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
                    {link_list.filter(l => l !== "none").map((link, index) => (
                        <a className="project-card__icon-link" key={index} href={linksSafe[link]} target="_blank">
                            {svg({ icon: link, size: 24, color: "" }) ??
                                <img src={icons[link]} alt={`${link} icon`} width={24} height={24}/>
                            }
                        </a>
                    ))}
                </div>

            </div>
        </article>
    )
}

export default ProjectCard