import Cookies from "universal-cookie"
import CONSTANTS from "@/constants/constants.json";

const { COOKIE_OPTIONS, COOKIE_DEFAULTS, VERSION } = CONSTANTS
const cookies = new Cookies(null, COOKIE_OPTIONS);

export default function resetCookiesIfVersionNumberChanged() {
    if (cookies.get('version') === VERSION) return

    console.log('Version number changed. Resetting cookies.')
    console.log("document.cookie before reset:", document.cookie);
    for (const key in COOKIE_DEFAULTS) {
        cookies.remove(key)
        const value = COOKIE_DEFAULTS[key as keyof typeof COOKIE_DEFAULTS]
        cookies.set(key, value)
    }
    cookies.set('version', VERSION)
    console.log("document.cookie after reset:", document.cookie);
}