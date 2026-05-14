import React from "react";
import { ChevronDown } from "lucide-react";

function ScrollArea({children, className}: {children: React.ReactNode, className?: string}) {

    return (
        <div className={`scroll-area overflow-y-auto ${className ?? ''}`}>
            {children}
        </div>
    )
}

// @ts-ignore
function Section({title, children, titleStyle, onClick}: { title: string | React.ReactNode; children: React.ReactNode, titleStyle?: string, onClick?: () => void}) {

    const  childrenArray = React.Children.toArray(children);
    const append = childrenArray.find((child: any) => child.type === Section.Append);
    const rest = childrenArray.find((child: any) => child.type !== Section.Append);

    return (
        <div className={`space-y-2`}>
            <h4 className={`uppercase tracking-wider font-semibold ${titleStyle ?? 'text-muted-foreground text-sm'}`}>
                {title}
            </h4>
            {append}
            {rest}
        </div>
    );
}
Section.Append = ({children}: {children: React.ReactNode}) => {
    return (<>{children}</>);
}


const CollapsibleSection = ({ title, children, onClick, watcher }: { title: string; children: React.ReactNode; onClick?: () => void; watcher: boolean }) => (
    <Section title={
        <div className="flex items-center gap-2 cursor-pointer select-none" onClick={() =>onClick && onClick()}>
            <span>{title}</span>
            <ChevronDown className={`h-3.5 w-3.5 text-muted-foreground transition-transform duration-200 ${watcher ? "rotate-180" : ""}`} />
        </div>
    }>
        <Expandable open={watcher}>
            {children}
        </Expandable>
    </Section>
);

// @ts-ignore
function Expandable({title, children, open}: {title?: string, children: React.ReactNode, open: boolean}) {
    return (
        <div className={`${open ? '' : 'hidden'}`}>
            {children}
        </div>
    );
}


export {ScrollArea, Section, Expandable, CollapsibleSection}