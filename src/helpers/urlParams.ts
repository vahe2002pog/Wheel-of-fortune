import { collector } from "./collector";
import { createPlayer } from "./player";

function getParameterByName(name: string): string {
    const url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url);
    if (!results || !results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
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
    const res = [];
    if (defeatMode === false) {
        res.push(`checked=${defeatMode}`);
    }

    const list = players.map((item) => item.text).filter(Boolean).join('$_$');
    if (list) {
        res.push(`list=${list}`);
    }

    const des = defeatPlayers.map((item) => item.text).filter(Boolean).join('$_$');
    if (des) {
        res.push(`des=${des}`);
    }

    return res.length ? `?${res.join('&')}` : '/';
}

export const updateUrlPartial = collector(({list, des, checked}: {list?: IPlayer[], des?: IPlayer[], checked?: boolean}): void => {
    const players = list || readPlayerFromParams('list');
    const defeatPlayers = des || readPlayerFromParams('des');
    const defeatMode = checked ?? readDefeatModeFromParams();
    const newState = convertToUrl(players, defeatPlayers, defeatMode);
    const hasChange = window.location.search !== newState;
    if (hasChange) {
        window.history.pushState({ list, des }, '', newState);
    }
}, 40);
