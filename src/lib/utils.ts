import {type ClassValue, clsx} from "clsx";
import {twMerge} from "tailwind-merge";
import Cookie from "js-cookie";
import {API_TRACKER} from "../../env.ts";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}


export function checkForSession(): string | null {
    return sessionStorage.getItem("session");
}

export function checkForVisitorId(): string | undefined {
    return Cookie.get("visitor");
}

export async function generateSessionandVisitorId() {
    const tracker = captureRef()
    return await fetch(API_TRACKER, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            path: window.location.pathname,
            referrer: document.referrer,
            whereFrom: tracker,
            screen: {
                width: window.screen.width,
                height: window.screen.height
            },
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        })
    }).then(res => res.json()).then(data => {
        sessionStorage.setItem("session", data.session_id)
        Cookie.set("visitor", data.visitorId, {expires: 365})
    })
}

export async function startSession() {
    const tracker = captureRef()
    await fetch(API_TRACKER + "/add", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            visitor_id: checkForVisitorId(),
            whereFrom: tracker
        })
    }).then(res => res.json()).then(data => {
        console.log(data)
        sessionStorage.setItem("session", data.session_id)
    })
}
export async function logEvent(event_type: string, event_value: string, additional?:{event_parent?: string, target?: string}) {
    return await fetch(API_TRACKER + "/log", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + checkForSession()
        },
        body: JSON.stringify({
            event_type: event_type,
            event_value: event_value,
            event_parent: additional?.event_parent,
            target: additional?.target,
            visitor_id: checkForVisitorId()
        })
    }).then(res => res.json())
}

export function endSession() {
    const sessionId = checkForSession();
    if (sessionId) {
        const url = API_TRACKER + "/end";
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + sessionId
            },
            body: JSON.stringify({visitor_id: checkForVisitorId()}),
            keepalive: true
        });
    }
}

export function captureRef() {
    const urlParams = new URLSearchParams(window.location.search);
    const ref = urlParams.get('ref');

    if (ref) {
        localStorage.setItem('ref', ref);
        urlParams.delete('ref');
        const newUrl = window.location.pathname + (urlParams.toString() ? '?' + urlParams.toString() : '');
        window.history.replaceState({}, '', newUrl);
    }
    return ref;
}