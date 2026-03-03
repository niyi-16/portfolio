import './ContactCard.scss'
import type {Contact} from "../../model/Contact.ts";

function ContactCard(props:Contact) {

    return (
        <>
            <div key={props.id} className={"contact-card"}>
                <a href={props.url} target="_blank">
                    <div>
                        <img src={props.logo}/>
                        <h2>{props.name}</h2>
                    </div>
                </a>
            </div>
        </>
    )
}

export default ContactCard