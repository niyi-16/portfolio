import ContactCard from "../../ui/ContactCard/ContactCard.tsx";
import type {Contact} from "../../model/Contact.interface.ts";
export function Contact() {

    const platforms:Contact[] = [
        {
            id: 1,
            name: "LinkedIn",
            url: "https://www.linkedin.com/in/dasil-adam-2000/",
            logo: "src/assets/png/linkedin_logo.png"
        },
        {
            id: 2,
            name: "Github",
            url: "https://github.com/niyi-16",
            logo: "src/assets/png/github.png"
        },
        {
            id: 3,
            name: "Instagram",
            url: "www.instagram.com/",
            logo: "src/assets/png/instagram_logo.png"
        }
    ]
    return (
        <>
            <h1>Some Of the best ways to reach me</h1>

            {
                platforms.map((platform) =>
                    <ContactCard
                        key={platform.id}
                        {...platform}
                    />
                )}
        </>
    )
}

