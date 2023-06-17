import React from "react";

interface IProps {
    text: string;
}

export default function Message(props: IProps) {
    return (
        <div className="message tw-absolute" >
            {
                props.text
            }
        </div>
    );
}
