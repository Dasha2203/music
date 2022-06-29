import {PATTERN_EMAIL} from "../../constantes/patterns";

export default (email: string) => {
    if (!email.trim()) return 'Enter your email'
    if (!email.match(PATTERN_EMAIL)) return 'Invalid email'
    return true
}