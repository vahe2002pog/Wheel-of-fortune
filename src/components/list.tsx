import React from "react";
import Editor from "./editor";

interface IProps {
    id?: string;
    items: IPlayer[];
    disabled: boolean;
    onItemChange: (item: IPlayer) => void;
    hideLastAction?: boolean;
    actionIcon?: string;
    actionTitle?: string;
    onActionClick?: (item: IPlayer) => void;
    onComplete: (item: IPlayer) => void;
    onPaste?: (item: IPlayer, text: string) => boolean;
}

export default function List(props: IProps) {
    return (
        <div className="player-list" id={props.id}>
            {
                props.items.map((item, index) => {
                    return (
                        <Editor
                            key={item.id}
                            item={item}
                            disabled={props.disabled}
                            hideAction={ props.hideLastAction && index === props.items.length - 1}
                            onChange={props.onItemChange}
                            actionIcon={props.actionIcon}
                            actionTitle={props.actionTitle}
                            onActionClick={props.onActionClick}
                            onComplete={props.onComplete}
                            onPaste={props.onPaste}
                        />
                    );
                })
            }
        </div>
    );
}
