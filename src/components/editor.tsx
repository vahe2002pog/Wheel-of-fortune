import React, { useCallback, ChangeEvent } from "react";
import { debounce } from "../helpers/debounce";

interface IProps {
    item: IPlayer;
    disabled: boolean;
    onChange: (item: IPlayer) => void;
    hideAction?: boolean;
    actionIcon?: string;
    actionTitle?: string;
    onActionClick?: (item: IPlayer) => void;
}

export default function Editor(props: IProps) {

    const onChange = useCallback(debounce((event: ChangeEvent<HTMLInputElement>) => {
        props.onChange({
            ...props.item,
            text: event.target.value
        });
    }, 500), []);

    return (
        <div className="player-item tw-w-full tw-relative" >
            <input
                className="editor-input tw-w-full"
                maxLength={50}
                type="text"
                defaultValue={props.item.text}
                disabled={props.disabled}
                onChange={onChange}
            />

            {
                props.onActionClick && props.actionIcon && !props.disabled && !props.hideAction ?
                    <img
                        src={props.actionIcon}
                        className="editor-action tw-cursor-pointer tw-absolute"
                        alt="action"
                        width="16px"
                        height="16px"
                        title={props.actionTitle}
                        onClick={() => props.onActionClick?.(props.item)}
                        /> :
                    null
            }

        </div>
    );
}
