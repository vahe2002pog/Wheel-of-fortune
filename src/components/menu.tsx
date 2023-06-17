import React, { useMemo, useCallback } from "react";
import List from "./list";
import Defeat from "./defeat";
import rmIcon from '../img/rm.svg';
import arrowUpIcon from '../img/arrow-up.svg';
import { createPlayer, focusNext } from "../helpers/player";


interface IProps {
    players: IPlayer[];
    defeatPlayers: IPlayer[];
    defeatMode: boolean;
    disabled: boolean;
    onDefeatChange: (defeatMode: boolean) => void;
    onPlayerChange: (item: IPlayer) => void;
    onDefeatPlayerChange: (item: IPlayer) => void;
    onRemovePlayer: (item: IPlayer) => void;
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

    const focusPlayer = useCallback((item: IPlayer) => focusNext('players', item), []);
    const focusDefeatPlayer = useCallback((item: IPlayer) => focusNext('defeatPlayers', item), []);

    return (
        <div className="menu tw-flex-1 tw-overflow-y-scroll">
            <Defeat defeatMode={props.defeatMode} disabled={props.disabled} onChange={props.onDefeatChange} />

            <h2 className="menu-caption" >Игроки</h2>

            <List
                id="players"
                items={players}
                disabled={props.disabled}
                onItemChange={props.onPlayerChange}
                hideLastAction={true}
                actionIcon={rmIcon}
                actionTitle="Удалить"
                onActionClick={props.onRemovePlayer}
                onComplete={focusPlayer}
            />

            {
                props.defeatPlayers.length ? <h3 className="menu-caption">Выбившие</h3> : null
            }

            {
                props.defeatPlayers.length ? <List
                    id="defeatPlayers"
                    items={props.defeatPlayers}
                    disabled={props.disabled}
                    onItemChange={props.onDefeatPlayerChange}
                    actionIcon={arrowUpIcon}
                    actionTitle="Вернуть"
                    onActionClick={props.onRemoveDefeatPlayer}
                    onComplete={focusDefeatPlayer}
                /> : null
            }
        </div>
    );
}
