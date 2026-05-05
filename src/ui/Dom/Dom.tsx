import React from "react";
function ScrollArea({children, className}: {children: React.ReactNode, className?: string}) {

    return (
        <div className={`scroll-area overflow-y-auto ${className ?? ''}`}>
            {children}
        </div>
    )
}

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

// @ts-ignore
function Expandable({title, children, open}: {title?: string, children: React.ReactNode, open: boolean}) {
    return (
        <div className={`${open ? '' : 'hidden'}`}>
            {children}
        </div>
    );
}


export {ScrollArea, Section, Expandable}