import { useState, useEffect } from 'react'
import { isTouchDevise } from '../helpers/utils';
export function useKeyboardOpen() {

    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {

        function detectBlur(event: Event) {
            activeElementChanged();
        }

        function activeElementChanged() {
            let element = document.activeElement as HTMLInputElement;

            if (element?.tagName === 'INPUT' && element?.type === 'text') {
                setIsOpen(true);
                console.log('keyboardOpened');
            } else {
                setIsOpen(false);
                console.log('keyboardClosed');
            }
        }

        function detectFocus(event: Event) {
            activeElementChanged();
        }

        if (isTouchDevise()) {
            // @ts-ignore
            window.addEventListener ? window.addEventListener('focus', detectFocus, true) : window.attachEvent('onfocusout', detectFocus);
            // @ts-ignore
            window.addEventListener ? window.addEventListener('blur', detectBlur, true) : window.attachEvent('onblur', detectBlur);

            return () => {
                // @ts-ignore
                window.removeEventListener ? window.removeEventListener('focus', detectFocus, true) : window.detachEvent('onfocusout', detectFocus);
                // @ts-ignore
                window.removeEventListener ? window.removeEventListener('blur', detectBlur, true) : window.detachEvent('onblur', detectBlur);
            };
        }
    }, [])

    return isOpen;
}