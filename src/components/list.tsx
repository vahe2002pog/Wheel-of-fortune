import React, { useContext } from "react";
import Editor from "./editor";
import EditorNew from "./editorNew";
import { SettingsContext } from "../context/SettingsContext";

interface IProps {
    id?: string;
    items: IPlayer[];
    disabled: boolean;
    onItemChange: (item: IPlayer) => void;
    onItemsChange: (items: IPlayer[]) => void;
    hideLastAction?: boolean;
    actions: IAction[];
    indexVisible?: boolean;
    onComplete: (item: IPlayer) => void;
    onPaste?: (item: IPlayer, text: string) => boolean;
}

export default function List(props: IProps) {
    const {newEditor} = useContext(SettingsContext);
    return (
        <div className="player-list tw-grid" id={props.id}>
            {
                newEditor ? <EditorNew
                    items={props.items}
                    disabled={props.disabled}
                    actions={props.actions}
                    onChange={props.onItemsChange}
                    indexVisible={props.indexVisible}
                 /> :
                props.items.map((item, index) => {
                    return (
                        <Editor
                            key={item.id}
                            index={index + 1}
                            item={item}
                            disabled={props.disabled}
                            actions={ props.hideLastAction && index === props.items.length - 1 ? [] : props.actions}
                            onChange={props.onItemChange}
                            onComplete={props.onComplete}
                            onPaste={props.onPaste}
                            indexVisible={props.indexVisible}
                        />
                    );
                })
            }
        </div>
    );
}
