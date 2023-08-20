import React, { useMemo, useCallback } from 'react';
import List from './list';
import Defeat from './defeat';
import rmIcon from '../img/rm.svg';
import arrowUpIcon from '../img/arrow-up.svg';
import { createPlayer, focusNext } from '../helpers/player';
import { useTranslation } from '../hook/useTranslation';
import { useClipboard } from '../hook/useClipboard';
import Icon from './icon';
import { Text } from './text';

interface IProps {
    players: IPlayer[];
    defeatPlayers: IPlayer[];
    defeatMode: boolean;
    disabled: boolean;
    onDefeatChange: (defeatMode: boolean) => void;
    onPlayerChange: (item: IPlayer) => void;
    onDefeatPlayerChange: (item: IPlayer) => void;
    onRemovePlayer: (item: IPlayer) => void;
    onClearPlayers: () => void;
    onClearDefeatPlayers: () => void;
    onBackDefeatPlayers: () => void;
    onBackDefeatPlayer: (item: IPlayer) => void;
    onRemoveDefeatPlayer: (item: IPlayer) => void;
}

export default function Menu(props: IProps) {

    const players = useMemo(() => {
        const items = [...props.players];
        if (!items[items.length - 1] || items[items.length - 1].text) {
            items.push(createPlayer());
        }
        return items;
    }, [props.players]);

    const { paste } = useClipboard();
    const { tr } = useTranslation();

    const focusPlayer = useCallback((item: IPlayer) => focusNext('players', item), []);
    const focusDefeatPlayer = useCallback((item: IPlayer) => focusNext('defeatPlayers', item), []);

    const playersActions = useMemo((): IAction[] => {
        return [{
            id: 'remove',
            title: tr('menu.remove'),
            icon: rmIcon,
            handler: props.onRemovePlayer
        }]
    }, [tr, props.onRemovePlayer])

    const defeatPlayersActions = useMemo((): IAction[] => {
        return [{
            id: 'back',
            title: tr('menu.back'),
            icon: arrowUpIcon,
            handler: props.onBackDefeatPlayer
        }, {
            id: 'remove',
            title: tr('menu.remove'),
            icon: rmIcon,
            handler: props.onRemoveDefeatPlayer
        }]
    }, [tr, props.onRemoveDefeatPlayer, props.onBackDefeatPlayer]);

    return (
        <div className="menu tw-flex-1 tw-overflow-y-scroll">
            <div className="menu-content-center">
                <Defeat defeatMode={props.defeatMode} disabled={props.disabled} onChange={props.onDefeatChange} />

                <div className="menu-caption tw-flex tw-justify-between tw-items-baseline">
                    <h2>{tr('menu.players')}</h2>
                    {
                        props.players.length ? <Text onClick={props.onClearPlayers} text={tr('menu.clear')} disabled={props.disabled} /> : null
                    }
                </div>

                <List
                    id="players"
                    items={players}
                    disabled={props.disabled}
                    onItemChange={props.onPlayerChange}
                    hideLastAction={true}
                    actions={playersActions}
                    onComplete={focusPlayer}
                    onPaste={paste}
                />

                {
                    props.defeatPlayers.length ? <div className="menu-caption tw-flex tw-justify-between tw-items-baseline">
                        <h3>{tr('menu.defeat-players')}</h3>
                        <div className="tw-flex">
                            <Icon
                                src={arrowUpIcon}
                                className="menu-back-button"
                                alt={tr('menu.backAll')}
                                size="16px"
                                disabled={props.disabled}
                                onClick={props.onBackDefeatPlayers}
                            />
                            <Text text={tr('menu.clear')} onClick={props.onClearDefeatPlayers} disabled={props.disabled} />
                        </div>
                    </div> : null
                }

                {
                    props.defeatPlayers.length ? <List
                        id="defeatPlayers"
                        items={props.defeatPlayers}
                        disabled={props.disabled}
                        onItemChange={props.onDefeatPlayerChange}
                        actions={defeatPlayersActions}
                        onComplete={focusDefeatPlayer}
                    /> : null
                }
            </div>
        </div>
    );
}
