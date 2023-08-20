import { useState, useEffect } from 'react'
import { isTouchDevice } from '../helpers/utils';
import { debounce } from '../helpers/debounce';
export function useKeyboardOpen() {

    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {

        const setOpenDebounce = debounce((val: boolean) => {
            setIsOpen(val);
        }, 50);

        const activeElementChanged = () => {
            let element = document.activeElement as HTMLInputElement;
            setOpenDebounce(element?.tagName === 'INPUT' && element?.type === 'text');
        }

        if (isTouchDevice()) {
            window.addEventListener ? window.addEventListener('focus', activeElementChanged, true) :
                // @ts-ignore
                window.attachEvent('onfocusout', activeElementChanged);
            window.addEventListener ? window.addEventListener('blur', activeElementChanged, true) :
                // @ts-ignore
                window.attachEvent('onblur', activeElementChanged);

            return () => {
                window.removeEventListener ? window.removeEventListener('focus', activeElementChanged, true) :
                    // @ts-ignore
                    window.detachEvent('onfocusout', activeElementChanged);
                window.removeEventListener ? window.removeEventListener('blur', activeElementChanged, true) :
                    // @ts-ignore
                    window.detachEvent('onblur', activeElementChanged);
            };
        }
    }, []);

    return isOpen;
}