import { collector } from './collector';
import { createPlayer } from './player';

function getParameterByName(name: string): string {
    const url = new URL(window.location.href);
    try {
        return decodeURIComponent(url.searchParams.get(name) || '');
    } catch (e) {
        console.error(e);
        return '';
    }
}

export function readPlayerFromParams(paramName: string): IPlayer[] {
    const playersStr = getParameterByName(paramName);

    return playersStr !== null ? playersStr.split('$_$').filter(Boolean).map((text) => {
        return createPlayer({text});
    }) : [];
}

export function readDefeatModeFromParams(): boolean {
    const checkedParams = getParameterByName('checked');
    return checkedParams ? checkedParams === 'true' : true;
}

export function convertToUrl(players: IPlayer[], defeatPlayers: IPlayer[], defeatMode: boolean): string {
    const url = new URL(window.location.href);
    url.searchParams.delete('checked');
    url.searchParams.delete('list');
    url.searchParams.delete('des');

    if (defeatMode === false) {
        url.searchParams.set('checked', String(defeatMode));
    }

    const list = players.map((item) => item.text).filter(Boolean).join('$_$');
    if (list) {
        url.searchParams.set('list', list);
    }

    const des = defeatPlayers.map((item) => item.text).filter(Boolean).join('$_$');
    if (des) {
        url.searchParams.set('des', des);
    }

    return url.href.replaceAll('+', ' ');
}

export const updateUrlPartial = collector(({list, des, checked}: {list?: IPlayer[], des?: IPlayer[], checked?: boolean}): void => {
    const players = list || readPlayerFromParams('list');
    const defeatPlayers = des || readPlayerFromParams('des');
    const defeatMode = checked ?? readDefeatModeFromParams();
    const newState = convertToUrl(players, defeatPlayers, defeatMode);
    const hasChange = new URL(window.location.href).href !== new URL(newState).href;
    if (hasChange) {
        window.history.pushState({ list, des }, '', newState);
    }
}, 40);
