import {icons, svg} from "../../../icons.tsx";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { API_URL, PROJECTS } from "../../../env.ts";
import type { ProjectType } from "../../model/ProjectType.ts";
import { ArrowLeft } from "lucide-react";
import ImageCarousel from "../../ui/Carousel/ImageCarousel.tsx";

function Section({title, children}: { title: string; children: React.ReactNode }) {
    return (
        <div className="space-y-2">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                {title}
            </h4>
            {children}
        </div>
    );
}

function Details() {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const [project, setProject] = useState<ProjectType | null>(location.state?.project || null);
    const [loading, setLoading] = useState(!project);

    useEffect(() => {
        if (id) {
            const fetchProject = async () => {
                try {
                    const response = await fetch(`${API_URL}${PROJECTS}?project_id=${id}`);
                    const data = await response.json();
                    setProject(data);
                } catch (error) {
                    console.error("Failed to fetch project details:", error);
                } finally {
                    setLoading(false);
                }
            };
            fetchProject();
        }
    }, []);

    if (loading) return <div className="p-6 text-center">Loading...</div>;
    if (!project) return <div className="p-6 text-center">Project not found.</div>;

    const {name, overview, stack, links, images, architecture, challenges, features, keywords, lessons} = project;
    const cover = images?.default || "";
    const showcase = images?.showcase 
        ? [{ src: cover, alt: `${name} cover`, caption: "" }, ...images.showcase.map(img => ({ src: img, alt: name, caption: "" }))] 
        : cover ? [{ src: cover, alt: `${name} cover`, caption: "" }] : [];

    const linksSafe = links || {};
    const linkList = Object.keys(linksSafe);
    const archItems = [
        ...(architecture?.frontend?.length ? [{label: "Frontend", items: architecture.frontend}] : []),
        ...(architecture?.backend?.length ? [{label: "Backend", items: architecture.backend}] : []),
        ...(architecture?.other?.length ? [{label: "Other", items: architecture.other}] : []),
    ];
    const challengeBrief = challenges?.brief;
    const challengeProblem = challenges?.problem;
    const challengeSolution = challenges?.solution;
    const hasChallenges = challengeBrief || challengeProblem || challengeSolution;

    // @ts-ignore
    return (
        <div className="min-h-screen bg-[hsl(232,20%,8%)] text-foreground">
            <div className="max-w-2xl mx-auto pb-10">
                <button 
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 p-6 text-muted-foreground hover:text-foreground transition-colors"
                >
                    <ArrowLeft size={20} />
                    <span>Back to Projects</span>
                </button>

                <div className="border border-border/40 bg-[hsl(232,20%,8%)] overflow-hidden rounded-lg shadow-xl">
                    {/* Cover */}
                    {cover && (
                        <div className="w-full aspect-video overflow-hidden">
                            {showcase &&  <ImageCarousel images={showcase} />}
                        </div>
                    )}
                    <div className="p-6 space-y-6">
                        {/* Header */}
                        <div className="space-y-3">
                            <div className="flex items-start justify-between gap-4">
                                <h2 className="text-2xl font-bold">{name}</h2>
                                {linkList.length > 0 && (
                                    <div className="flex gap-1.5 shrink-0">
                                        {linkList.map((link, index) => (
                                            <a
                                                key={index}
                                                href={linksSafe[link]}
                                                target="_blank"
                                                rel="noreferrer"
                                                aria-label={link}
                                                title={link}
                                                className="flex items-center justify-center w-8 h-8 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors"
                                            >
                                                {svg({icon: link, size: 24}) ??
                                                    <img src={icons[link]} alt={`${link} icon`} width={24} height={24}/>
                                                }
                                            </a>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <p className="text-base text-muted-foreground">
                                {overview?.summary}
                            </p>
                        </div>
                        {/* Stack */}
                        {stack?.length > 0 && (
                            <Section title="Tech Stack">
                                <div className="flex flex-wrap gap-2">
                                    {stack.map((t:string) => (
                                        <span
                                            key={t}
                                            className="px-3 py-1.5 rounded-full text-sm bg-accent/30 border border-border/50 text-foreground/90">
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </Section>
                        )}
                        {/* Architecture */}
                        {archItems.length > 0 && (
                            <Section title="Architecture">
                                <div className="grid gap-3 sm:grid-cols-3">
                                    {archItems.map(({label, items}) => (
                                        <div key={label} className="space-y-1.5">
                                            <p className="text-xs font-medium text-muted-foreground">{label}</p>
                                            <div className="flex flex-wrap gap-1.5">
                                                {items.map((item:string) => (
                                                    <span key={item}
                                                          className="px-2 py-1 text-xs rounded bg-accent/20 text-foreground/80">
                                                      {item}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </Section>
                        )}
                        {/* Features */}
                        {features && features.length > 0 && (
                            <Section title="Features">
                                <ul className="list-disc list-inside space-y-1 text-sm text-foreground/80">
                                    {features.map((f:string, i:number) => (
                                        <li key={i}>{f}</li>
                                    ))}
                                </ul>
                            </Section>
                        )}
                        {/* Challenges */}
                        {hasChallenges && (
                            <Section title="Challenges">
                                <div className="space-y-3 text-sm text-foreground/80">
                                    {challengeBrief && <p>{challengeBrief}</p>}
                                    {challengeProblem && (
                                        <div>
                                            <p className="text-xs font-medium text-muted-foreground mb-1">Problem</p>
                                            <p>{challengeProblem}</p>
                                        </div>
                                    )}
                                    {challengeSolution && (
                                        <div>
                                            <p className="text-xs font-medium text-muted-foreground mb-1">Solution</p>
                                            <p>{challengeSolution}</p>
                                        </div>
                                    )}
                                </div>
                            </Section>
                        )}
                        {/* Lessons */}
                        {lessons && lessons.length > 0 && (
                            <Section title="Lessons Learned">
                                <ul className="list-disc list-inside space-y-1 text-sm text-foreground/80">
                                    {lessons.map((l:string, i:number) => (
                                        <li key={i}>{l}</li>
                                    ))}
                                </ul>
                            </Section>
                        )}
                        {/* Keywords */}
                        {keywords && keywords.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 pt-2 border-t border-border/30">
                                {keywords.map((k:string) => (
                                    <span key={k} className="text-xs text-muted-foreground">
                                      #{k}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Details;