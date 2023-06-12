import React, { useCallback, ChangeEvent, KeyboardEvent } from "react";
import { debounce } from "../helpers/debounce";

interface IProps {
    item: IPlayer;
    disabled: boolean;
    onChange: (item: IPlayer) => void;
    hideAction?: boolean;
    actionIcon?: string;
    actionTitle?: string;
    onActionClick?: (item: IPlayer) => void;
    onComplete: (item: IPlayer) => void;
}

export default function Editor(props: IProps) {

    const { item, onChange: onChangeProps, onComplete } = props;

    const changeText = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        if (item.text !== event.target.value) {
            onChangeProps({
                ...item,
                text: event.target.value
            });
        }
    }, [onChangeProps, item]);

    const onChangeDebounce = useCallback(debounce(changeText, 500), [changeText]);

    const onKeyDown = useCallback((event: KeyboardEvent<HTMLInputElement>) => {
        if (event.code === 'Enter' || event.code === 'NumpadEnter') {
            const changeEvent = event as unknown as ChangeEvent<HTMLInputElement>;
            changeText(changeEvent);
            onComplete({
                ...item,
                text: changeEvent.target.value
            });
            return false;
        }
    }, [item, changeText, onComplete]);

    return (
        <div className="player-item tw-w-full tw-relative" >
            <input
                id={`input-${props.item.id}`}
                className="editor-input tw-w-full"
                maxLength={50}
                type="text"
                defaultValue={props.item.text}
                disabled={props.disabled}
                onChange={onChangeDebounce}
                onKeyDown={onKeyDown}
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
