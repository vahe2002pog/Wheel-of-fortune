import React from "react";
import Editor from "./editor";

interface IProps {
    items: IPlayer[];
    disabled: boolean;
    onItemChange: (item: IPlayer) => void;
}

export default function List(props: IProps) {
    return (
        <div className="player-list">
            {
                props.items.map((item) => {
                    return (
                        <Editor
                            key={item.id}
                            item={item}
                            disabled={props.disabled}
                            onChange={props.onItemChange}
                        />
                    );
                })
            }
        </div>
    );
}
