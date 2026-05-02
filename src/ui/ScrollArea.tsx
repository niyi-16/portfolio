function ScrollArea({children, className}: {children: React.ReactNode, className?: string}) {

    return (
        <div className={`scroll-area overflow-y-auto ${className ?? ''}`}>
            {children}
        </div>
    )
}

export default ScrollArea