import {icons, svg} from "../../../icons.tsx";
import ImageCarousel from "../Carousel/ImageCarousel.tsx";
import {Expandable, Section} from "../Dom/Dom.tsx";
import type {ProjectType, ProjectTypeExtended} from "../../model/ProjectType.ts";
import {ChevronDown} from "lucide-react";
import {useState} from "react";

function BigDisplay({project}: { project: ProjectTypeExtended }) {
    if (!project) return null;
    const {name, overview, stack, links, images, architecture, challenges, keywords, process} = project;
    const cover = images?.default;
    const showcase = images?.showcase ? [{src: cover, alt: `${name} cover`}, ...images.showcase] : cover ? [{
        src: cover,
        alt: `${name} cover`
    }] : [];

    const linksSafe = links || {};
    const linkList = Object.keys(linksSafe);
    const archItems = [
        ...(architecture?.frontend?.length ? [{label: "Frontend", items: architecture.frontend}] : []),
        ...(architecture?.backend?.length ? [{label: "Backend", items: architecture.backend}] : []),
        ...(architecture?.other?.length ? [{label: "Other", items: architecture.other}] : []),
    ];

    const challengeStatement = challenges?.statement;
    const challengeItems = challenges?.items || [];
    const hasChallenges = !!(challengeStatement || challengeItems.length > 0);
    const [tracker, setTracker] = useState({
        planning: true,
        design: true,
        development: true,
        testing: true,
        deployment: true,
        maintenance: true,
    });
    return (
        <div>
            <section className="w-full rounded-t-lg p-6">
                {/* Cover */}
                {cover && (
                    <div className="w-7/9 mx-auto aspect-video overflow-hidden rounded-t-lg bg-black/20">
                        {showcase && <ImageCarousel images={showcase}/>}
                    </div>
                )}
                <div className="p-3 space-y-6">
                    {/* Header */}
                    <section className="space-y-3">
                        <div className="flex items-start justify-between">

                            {/*Name and stack*/}
                            <div className="flex flex-wrap items-baseline gap-2">
                                <h1 className="text-2xl font-bold">{name}</h1>
                                {stack?.length > 0 && (
                                    <div className="flex gap-1">
                                        {stack.map((t: string, i: number) => (
                                            <span key={t} className="text-[15px] text-accent">
                                                {t} {(i < stack.length - 1) && <g className="text-muted-foreground">&bull;</g> }
                                             </span>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {linkList.length > 0 && (
                                <div className="flex gap-1.5 shrink-0">
                                    {linkList.map((link, index) => {
                                        return (
                                            <div
                                                key={index}
                                                aria-label={link}
                                                title={link}
                                                className="flex items-center justify-center w-8 h-8 rounded-md text-muted-foreground hover:text-foreground hover:scale-115 transition-all duration-250 ease-in-out"
                                            >
                                                <a className={"project-card__icon-link"} key={index}
                                                   href={linksSafe[link]} target="_blank">
                                                    {svg({icon: link, size: 24}) ??
                                                        <img src={icons[link]} alt={`${link} icon`} width={24}
                                                             height={24}/>
                                                    }
                                                </a>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                        <section className="text-base text-muted-foreground">
                            {overview?.summary}
                        </section>
                    </section>


                    {/* Architecture */}
                    {archItems.length > 0 && (
                        <Section title="Architecture">
                            <div className="grid gap-3 sm:grid-cols-3">
                                {archItems.map(({label, items}) => (
                                    <div key={label}
                                         className="space-y-1.5 p-3 rounded-lg bg-accent/10 border border-border/20">
                                        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground/80">{label}</p>
                                        <div className="flex flex-wrap gap-2">
                                            {items.map((item: string) => (
                                                <span key={item}
                                                      className="px-2 py-1 text-xs font-medium rounded bg-accent/30 text-foreground/90 border border-border/30">
                                                  {item}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Section>
                    )}

                    {/*NEW CONTENT*/}

                    {/*Process*/}
                    {
                        process && (
                            <Section title="The Development Process" titleStyle="{}">
                                <div className="space-y-3 text-sm text-foreground/80 transition-all duration-200 ease-in-out" >

                                    {/*Planning Section*/}
                                    {process.planning &&
                                        <Section title={
                                            <div className="flex items-center gap-2 cursor-pointer" onClick={() => {setTracker({...tracker, planning: !tracker.planning})}}>
                                                <span>Planning</span>
                                                <ChevronDown className={`h-3.5 w-3.5 text-muted-foreground transition-transform 
                                                    ${tracker.planning ? "rotate-180" : ""}`}/>
                                            </div>
                                        }>
                                            <Expandable open={tracker.planning} >

                                            {process.planning.filter(plan => plan).map( (plan, index) =>
                                                <div className="" key={index}>
                                                {plan.p && <p className={"text-lg text-foreground/80"}>{plan.p}</p>}
                                                {plan.img && <img src={plan.img} alt={"plan-"+index} className={"aspect-video object-cover rounded-lg shadow-md"}/>}
                                            </div>

                                            )}
                                            </Expandable>
                                    </Section>
                                    }

                                    {/*Design Section*/}
                                    {process.design &&
                                        <Section title={
                                            <div className="flex items-center gap-2 cursor-pointer" onClick={() => {setTracker({...tracker, design: !tracker.design})}}>
                                                <span>Design</span>
                                                <ChevronDown className={`h-3.5 w-3.5 text-muted-foreground transition-transform 
                                                    ${tracker.design ? "rotate-180" : ""}`}/>
                                            </div>
                                        }>
                                            <Expandable open={tracker.design} >

                                                {process.design.filter(design => design).map( (design, index) =>
                                                    <div className="" key={index}>
                                                        {design.p && <p className={"text-lg text-foreground/80"}>{design.p}</p>}
                                                        {design.img && <img src={design.img} alt={"plan-"+index} className={"aspect-video object-cover rounded-lg shadow-md"}/>}
                                                    </div>

                                                )}
                                            </Expandable>
                                        </Section>
                                    }
                                </div>
                            </Section>
                        )
                    }

                    {/*NEW CONTENT*/}

                    {/* Challenges */}
                    {hasChallenges && (
                        <Section title="Challenges">
                            <div className="space-y-3 text-sm text-foreground/80">
                                {challengeStatement && <p>{challengeStatement}</p>}
                                {challengeItems.length > 0 && challengeItems.map((item, index: number) => (
                                    <div key={index} className="space-y-3">
                                        {Object.entries(item).map(([key, value]) => (
                                            value && (
                                                <div key={key}>
                                                    <p className="text-xs font-medium text-muted-foreground mb-1 capitalize">{key}</p>
                                                    <p>{value}</p>
                                                </div>
                                            )
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </Section>
                    )}

                    {/* Keywords */}
                    {keywords && keywords.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-2 border-t border-border/30">
                            {keywords.map((k: string) => (
                                <span key={k} className="text-xs text-muted-foreground">
                                    #{k}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}

export default BigDisplay;