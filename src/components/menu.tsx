import React, { useMemo, useCallback } from "react";
import List from "./list";
import Defeat from "./defeat";
import rmIcon from '../img/rm.svg';
import arrowUpIcon from '../img/arrow-up.svg';
import { createPlayer, focusNext } from "../helpers/player";
import { useTranslation } from 'react-i18next';

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
    onPaste?: (item: IPlayer, text: string) => boolean;
}

export default function Menu(props: IProps) {

    const players = useMemo(() => {
        const items = [...props.players];
        if (!items[items.length - 1] || items[items.length - 1].text) {
            items.push(createPlayer());
        }
        return items;
    }, [props.players]);

    const { t } = useTranslation();

    const focusPlayer = useCallback((item: IPlayer) => focusNext('players', item), []);
    const focusDefeatPlayer = useCallback((item: IPlayer) => focusNext('defeatPlayers', item), []);

    const playersActions = useMemo((): IAction[] => {
        return [{
            id: 'remove',
            title: t('menu.remove'),
            icon: rmIcon,
            handler: props.onRemovePlayer
        }]
    }, [t, props.onRemovePlayer])

    const defeatPlayersActions = useMemo((): IAction[] => {
        return [{
            id: 'back',
            title: t('menu.back'),
            icon: arrowUpIcon,
            handler: props.onBackDefeatPlayer
        }, {
            id: 'remove',
            title: t('menu.remove'),
            icon: rmIcon,
            handler: props.onRemoveDefeatPlayer
        }]
    }, [t, props.onRemoveDefeatPlayer, props.onBackDefeatPlayer]);


    return (
        <div className="menu tw-flex-1 tw-overflow-y-scroll">
            <div className="menu-content-center">
                <Defeat defeatMode={props.defeatMode} disabled={props.disabled} onChange={props.onDefeatChange} />

                <div className="menu-caption tw-flex tw-justify-between tw-items-baseline">
                    <h2>{t('menu.players')}</h2>
                    {
                        props.players.length ? <div onClick={props.onClearPlayers} className="tw-cursor-pointer noselect">{t('menu.clear')}</div> : null
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
                    onPaste={props.onPaste}
                />

                {
                    props.defeatPlayers.length ? <div className="menu-caption tw-flex tw-justify-between tw-items-baseline">
                        <h3>{t('menu.defeat-players')}</h3>
                        <div className="tw-flex">
                            <img
                                src={arrowUpIcon}
                                className="menu-back-button tw-cursor-pointer"
                                alt="action"
                                width="16px"
                                height="16px"
                                title={t('menu.backAll')}
                                onClick={() => props.onBackDefeatPlayers?.()}
                            />
                            <div onClick={props.onClearDefeatPlayers} className="tw-cursor-pointer noselect">{t('menu.clear')}</div>
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
