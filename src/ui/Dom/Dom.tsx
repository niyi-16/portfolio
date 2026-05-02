function ScrollArea({children, className}: {children: React.ReactNode, className?: string}) {

    return (
        <div className={`scroll-area overflow-y-auto ${className ?? ''}`}>
            {children}
        </div>
    )
}

function Section({title, children}: { title: string | React.ReactNode; children: React.ReactNode }) {
    return (
        <div className="space-y-2">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                {title}
            </h4>
            {children}
        </div>
    );
}
// @ts-ignore
function Expandable({title, children, open}: {title?: string, children: React.ReactNode, open: boolean}) {
    return (
        <div className={`${open ? '' : 'hidden'}`}>
            {children}
        </div>
    );
}


export {ScrollArea, Section, Expandable}