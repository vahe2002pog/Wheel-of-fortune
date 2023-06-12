import React, { useId, ChangeEvent } from "react";

interface IProps {
    defeatMode: boolean;
    disabled: boolean;
    onChange: (defeatMode: boolean) => void;
}

export default function Defeat(props: IProps) {
    const id = useId();
    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        props.onChange(event.target.checked);
    };

    return (
        <div className="tw-flex tw-justify-center tw-items-center">
            <input type="checkbox" id={id} disabled={props.disabled} checked={props.defeatMode} onChange={onChange} />
            <label htmlFor={id} style={{ marginLeft: "8px" }}>На выбивание</label>
        </div>
    );
}
