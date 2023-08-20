import { isTouchDevice, isLocalHost, loadScript, isPrivate } from './utils';

export function initApplication() {
    document.body.classList.add(isTouchDevice() ? 'touch-device' : 'cursor-device');
    if (!isLocalHost() && !isPrivate()) {
        // init Yandex metrika
        loadScript('/ym.js');
        // init Google analytics
        loadScript('https://www.googletagmanager.com/gtag/js?id=G-XRGPJFV616').then((loaded: boolean) => {
            if (loaded) {
                loadScript('/googletagmanager.js');
            }
        });
    }

    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js?v=1')
            .then((reg) => {
                console.log('Registration succeeded. Scope is ' + reg.scope);
            }).catch((error) => {
                console.log('Registration failed with ' + error);
            });
    }

}
