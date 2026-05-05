type TimelineProps = {
    date: string,
    title: string,
    description: string,
    type?: string
}

function Timeline({timeline}: { timeline: TimelineProps[] }) {
    // const dotColor = {
    //     success: "border-green-500",
    //     warning: "border-yellow-500",
    //     error: "border-red-500",
    //     default: "border-blue-500",
    // }[item.type ?? "default"];

    return (
        <div className="relative ml-4">
            {/* Vertical line */}
            <div className="absolute left-0 top-0 h-full w-0.5 bg-gray-200/10"/>
            <div className="flex flex-col-reverse gap-1">
                {timeline.map((item, index) => (
                    <div key={index} className="relative pl-8">
                        {/* Date */}
                        <div className="absolute -left-5 top-1.5 text-xs">
                            {item.date}
                        </div>

                        {/* Title */}
                        <h3 className="mt-0.5 -ml-2 text-sm font-semibold text-accent">
                            {item.title}
                        </h3>

                        {/* Description */}
                        <p className="mt-1 text-sm leading-relaxed text-gray-500">
                            <li>{item.description}</li>
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export {Timeline}