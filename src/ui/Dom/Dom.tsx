function ScrollArea({children, className}: {children: React.ReactNode, className?: string}) {

    return (
        <div className={`scroll-area overflow-y-auto ${className ?? ''}`}>
            {children}
        </div>
    )
}

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


export {ScrollArea, Section}