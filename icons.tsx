import {BASE} from "./env.ts";

const rootPath = "https://dasil-image-bucket.s3.us-east-2.amazonaws.com/png/"

const icons: Record<string, string> = {
    "github": rootPath + "github.png",
    "email": rootPath + "email_logo.png",
    "linkedin": rootPath + "linkedin_logo.png",
    "website": rootPath + "web.png",
    "demo": rootPath + "web.png",
}

const svgPath: Record<string, string> ={
    "github": `${BASE}/github.svg#Dribbble-Light-Preview`,
    "linkedin": `${BASE}/linkedin.svg#linkedin`,
    "website": `${BASE}/web.svg#web`,
    "demo": `${BASE}/web.svg#web`,
    "email": `${BASE}/email.svg#email`,
}
const Icon = ({ icon, size = 24, className = "" }: { icon:string, size?: number, className?: string }) => (
    <svg
        width={size}
        height={size}
        className={className}
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
    >
        <use href={icon}></use>
    </svg>
);

const svg=  (icon:string, size:number, className:string) => {
    if (!svgPath[icon]) return null;
    return <Icon icon={svgPath[icon]} size={size} className={className} />
}

export {icons, svg, svgPath}