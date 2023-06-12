import React, { useCallback, ChangeEvent } from "react";
import { debounce } from "../helpers/debounce";

interface IProps {
    item: IPlayer;
    disabled: boolean;
    onChange: (item: IPlayer) => void;
}

export default function Editor(props: IProps) {

    const onChange = useCallback(debounce((event: ChangeEvent<HTMLInputElement>) => {
        props.onChange({
            ...props.item,
            text: event.target.value
        });
    }, 500), []);

    return (
        <div className="player-item tw-w-full" >
            <input
                className="tw-w-full"
                maxLength={50}
                type="text"
                defaultValue={props.item.text}
                disabled={props.disabled}
                onChange={onChange}

            />
            <span className="inputButton cross"></span>
        </div>
    );
}
