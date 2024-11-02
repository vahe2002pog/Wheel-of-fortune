import { getStoreValue } from '../hook/useLocalStorage';
import { dayOfYear, loadScript } from './utils';

export class Snow {
    snowAvailable: boolean;
    private _loadRun: boolean = false;

    constructor() {
        const day = dayOfYear();
        this.snowAvailable = day > 350 || day < 15;
        if (getStoreValue('snow', true)) {
            this.load();
        }
    }

    load(): void {
        if (this.snowAvailable && !this._loadRun) {
            this._loadRun = true;
            loadScript('https://gagikpog.ru/data/libs/snow.js');
        }
    }

    toggle(value: boolean): void {
        if (this.snowAvailable) {
            if (!this._loadRun) {
                this.load();
            } else {
                const node: HTMLDivElement | null = document.querySelector('#particles-js');
                if (node) {
                    node.style.display = value ? 'block' : 'none';
                }
            }
        }
    }
}
