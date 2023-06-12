import { createPlayer } from "./player";

function getParameterByName(name: string): string {
    const url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url);
    if (!results || !results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

export function readFromParams() {
    const playersStr = getParameterByName('list');

    const players = playersStr !== null ? playersStr.split('$_$').filter(Boolean).map((text) => {
        return createPlayer({text});
    }) : [];

    players.push(createPlayer());

    const desPlayersStr = getParameterByName('des');
    const defeatPlayers = desPlayersStr !== null ? desPlayersStr.split('$_$').filter(Boolean).map((text) => {
        return createPlayer({text});
    }) : [];

    const checkedParams = getParameterByName('checked');
    const defeatMode = checkedParams ? checkedParams === 'true' : true;

    return { players, defeatPlayers, defeatMode };
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
