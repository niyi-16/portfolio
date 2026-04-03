import {BASE} from "./env.ts";

const rootPath = "https://dasil-image-bucket.s3.us-east-2.amazonaws.com/png/"

const icons: Record<string, string> = {
    "github": rootPath + "github.png",
    "email": rootPath + "email_logo.png",
    "linkedin": rootPath + "linkedin_logo.png",
    "website": rootPath + "web.png",
    "demo": rootPath + "web.png",
}

export type IconType = {
    icon: string,
    size?: number,
    className?: string
    defaultColor?: string
}
const svgPath: Record<string, IconType> ={
    "github":  {
        icon: `${BASE}/github.svg#Dribbble-Light-Preview`,
        defaultColor: "#ffffff",
    },
    "linkedin":{
        icon: `${BASE}/linkedin.svg#linkedin`,
    },
    "website": {
        icon: `${BASE}/web.svg#web`,
    },
    "demo":    {
        icon: `${BASE}/web.svg#web`,
    },
    "email":   {
        icon: `${BASE}/email.svg#email`,
    },
    "document": {
        icon: `${BASE}/document.svg#document`,
    },
    "terminal": {
        icon: `${BASE}/terminal.svg#terminal`,
    },
    "database": {
        icon: `${BASE}/database.svg#database`,
    },
    "cloud":    {
        icon: `${BASE}/cloud.svg#cloud`,
    },
}
const Icon = ({ icon, size, color, className}: { icon:string, size?: number, color?: string, className?: string }) => (
    <svg
        width={size}
        height={size}
        className={className}
        style={{color: color}}
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
    >
        <use href={icon}></use>
    </svg>
);

const svg=  ({ icon, size, color, className}: { icon:string, size?: number, color?: string, className?: string }) => {
    if (!svgPath[icon]) return null;
    if (className) return <Icon icon={svgPath[icon].icon} size={svgPath[icon].size ?? size} className={className} />
    return <Icon icon={svgPath[icon].icon} size={svgPath[icon].size ?? size} color={svgPath[icon].defaultColor ?? color} />
}

export {icons, svg, svgPath ,Icon}