import React from "react";
import List from "./list";
import Defeat from "./defeat";

interface IProps {
    players: IPlayer[];
    defeatPlayers: IPlayer[];
    defeatMode: boolean;
    disabled: boolean;
    onDefeatChange: (defeatMode: boolean) => void;
    onPlayerChange: (item: IPlayer) => void;
    onDefeatPlayerChange: (item: IPlayer) => void;
}

export default function Menu(props: IProps) {
    return (
        <div className="menu tw-flex-1">
            <Defeat defeatMode={props.defeatMode} disabled={props.disabled} onChange={props.onDefeatChange} />

            <h2>Игроки</h2>

            <List items={props.players} disabled={props.disabled} onItemChange={props.onPlayerChange}/>

            {
                props.defeatPlayers.length ? <h2>Выбившие</h2> : null
            }

            <List items={props.defeatPlayers} disabled={props.disabled} onItemChange={props.onDefeatPlayerChange}/>
        </div>
    );
}
