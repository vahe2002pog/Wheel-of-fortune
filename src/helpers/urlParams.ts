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
    const checkedParams = getParameterByName('elim') || getParameterByName('checked');
    return checkedParams ? checkedParams === 'true' : true;
}

export function readLegendFromParams(): string {
    return getParameterByName('legend') || '';
}

function convertToUrl(players: IPlayer[], outPlayers: IPlayer[], defeatMode: boolean, legend: string): string {
    const url = new URL(window.location.href);
    url.searchParams.delete('checked');
    url.searchParams.delete('elim');
    url.searchParams.delete('list');
    url.searchParams.delete('items');
    url.searchParams.delete('des');
    url.searchParams.delete('out');
    url.searchParams.delete('legend');

    if (defeatMode === false) {
        url.searchParams.set('elim', String(defeatMode));
    }

    if (legend) {
        url.searchParams.set('legend', legend);
    }

    const items = players.map((item) => item.text).filter(Boolean).join('$_$');
    if (items) {
        url.searchParams.set('items', items);
    }

    const out = outPlayers.map((item) => item.text).filter(Boolean).join('$_$');
    if (out) {
        url.searchParams.set('out', out);
    }

    return url.href.replaceAll('+', ' ');
}

export const updateUrlPartial = collector(({items, list, out, des, elim, legend}: {items?: IPlayer[], list?: IPlayer[], out?: IPlayer[], des?: IPlayer[], elim?: boolean, legend?: string}): void => {
    const players = items ? items : list?.length ? list : readPlayerFromParams('items');
    const outPlayers = out ? out : des?.length ? des : readPlayerFromParams('out');
    const defeatMode = elim ?? readDefeatModeFromParams();
    const legendRes = legend ?? readLegendFromParams();
    const newState = convertToUrl(players, outPlayers, defeatMode, legendRes);
    const hasChange = new URL(window.location.href).href !== new URL(newState).href;
    if (hasChange) {
        window.history.pushState({ items, out }, '', newState);
    }
}, 40);
