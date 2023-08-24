import { translation } from "../context/LangContext";

export const STORE_KEY = 'fortune';
export const ROTATION_TIME = 2000;
export const DEFAULT_SPINNER_ITEMS: IPlayer[] = [
    { id: '-1', color: '#119911', text: translation.tr('spinner-default-1') },
    { id: '-2', color: '#cc1111', text: translation.tr('spinner-default-2') }
];
