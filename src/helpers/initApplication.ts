import { isTouchDevise, isLocalHost } from "./utils";

export function initApplication() {
    document.body.classList.add(isTouchDevise() ? 'touch-devise' : 'cursor-devise');
    if (!isLocalHost()) {
        const ymScript = document.createElement('script');
        ymScript.src = '/ym.js';
        document.body.append(ymScript);
    }
}
