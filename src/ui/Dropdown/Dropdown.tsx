import { useState } from 'react';
import './Dropdown.scss';
import type {Contact} from "../../model/Contact.ts";

const Dropdown = ({main, content, className}: {main: string, content: Contact[], className: string}) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div
            className={`dropdown-container ${className}`}
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
        >
            <div className="dropdown-main">{main}</div>

            {isOpen && (
                <div className="dropdown-menu">
                    {content.map((item:Contact) => (
                        <a key={item.id} href={item.url} className="dropdown-item" target="_blank">
                            {/*@ts-ignore*/}
                            <img src={item.logo?.icon} alt={`${item.name} icon`} width={24} height={24}/>
                            <span>&nbsp; {item.name}</span>
                        </a>
                    ))}
                </div>
            )}
        </div>
    )
}


export {Dropdown}