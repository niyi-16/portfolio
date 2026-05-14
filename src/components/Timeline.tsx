type TimelineItem = {
    date: string;
    title: string;
    description: string;
    type?: "feature" | "fix" | "refactor" | "idea" | "milestone" | string;
};

const typeConfig: Record<string, { color: string; icon: string }> = {
    milestone: { color: "bg-amber-500", icon: "◆" },
    feature: { color: "bg-emerald-500", icon: "+" },
    fix: { color: "bg-red-400", icon: "⚡" },
    refactor: { color: "bg-blue-400", icon: "↻" },
    idea: { color: "bg-purple-400", icon: "✦" },
};

function Timeline({ timeline, compact = false }: { timeline: TimelineItem[]; compact?: boolean }) {
    const sorted = [...timeline].filter(t => t && t.date).reverse();

    if (sorted.length === 0) return null;

    return (
        <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-1.75 top-2 bottom-2 w-px bg-border/40" />

            <div className="flex flex-col gap-0.5">
                {sorted.map((item, index) => {
                    const cfg = typeConfig[item.type ?? ""] ?? { color: "bg-muted-foreground/60", icon: "•" };

                    return (
                        <div key={index} className="relative pl-7 py-1.5 group">
                            {/* Dot */}
                            <div className={`absolute left-0.75 top-2.75 w-2.25 h-2.25 rounded-full ${cfg.color} ring-2 ring-background transition-transform group-hover:scale-125`} />

                            {/* Date badge */}
                            <div className="flex flex-row items-center gap-2 mb-0.5">
                                <span className={`${compact ? 'text-[10px]' : 'text-xs'} font-mono text-muted-foreground/70`}>
                                    {item.date}
                                </span>
                                {item.type && (
                                    <span className={`${compact ? 'text-[9px] px-1' : 'text-[11px] px-1.5'} py-0.5 text-muted-foreground capitalize border border-border/20`}>
                                        {item.type}
                                    </span>
                                )}
                            </div>

                            {/* Title */}
                            <h4 className={`${compact ? 'text-xs' : 'text-sm'} font-semibold text-foreground/90 leading-tight`}>
                                {item.title}
                            </h4>

                            {/* Description */}
                            {item.description && (
                                <p className={`${compact ? 'text-[11px]' : 'text-xs'} text-muted-foreground/70 leading-relaxed mt-0.5`}>
                                    {item.description}
                                </p>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export { Timeline };