import { isTouchDevise } from "./utils";

export function initApplication() {
    document.body.classList.add(isTouchDevise() ? 'touch-devise' : 'cursor-devise');
}
