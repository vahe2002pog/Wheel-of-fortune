import React, { useCallback, ChangeEvent, KeyboardEvent, ClipboardEvent, useState, useEffect } from 'react';
import { debounce } from '../helpers/debounce';

interface IProps {
    item: IPlayer;
    disabled: boolean;
    onChange: (item: IPlayer) => void;
    hideAction?: boolean;
    actionIcon?: string;
    actionTitle?: string;
    onActionClick?: (item: IPlayer) => void;
    onComplete: (item: IPlayer) => void;
    onPaste?: (item: IPlayer, text: string) => boolean;
}

export default function Editor(props: IProps) {

    const { item, onChange: onChangeProps, onComplete, onPaste } = props;

    const [value, setValue] = useState(props.item.text || '');

    const changeText = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        if (item.text !== event.target.value) {
            onChangeProps({
                ...item,
                text: event.target.value
            });
        }
    }, [onChangeProps, item]);

    const onChangeDebounce = useCallback(debounce(changeText, 500), [changeText]);

    const onChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
        onChangeDebounce(event);
    }, [onChangeDebounce, setValue]);

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

    useEffect(() => setValue(item.text), [item, setValue]);

    const onPasteHandler = useCallback((event: ClipboardEvent<HTMLInputElement>) => {
        const pastString = event.clipboardData.getData('text/plain');
        return onPaste?.(item, pastString);
    }, [onPaste, item]);

    return (
        <div className="player-item tw-w-full tw-relative" >
            <input
                id={`input-${props.item.id}`}
                className="editor-input tw-w-full"
                maxLength={50}
                type="text"
                disabled={props.disabled}
                value={value}
                onChange={onChange}
                onKeyDown={onKeyDown}
                onPaste={onPasteHandler}
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
